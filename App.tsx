import React, { useState, useEffect } from 'react';
import { useLocalStorage } from './hooks/useLocalStorage';
import { officialTemplates } from './data/officialTemplates';
import { 
    Question, 
    Profile, 
    Answers, 
    AppState, 
    SessionData, 
    QuizTemplate, 
    ResultData, 
    AdSenseConfig, 
    InternalAd,
    SiteImagesConfig
} from './types';
import { decodeBase64ToObject, validateSessionData, validateResultData } from './utils/helpers';

// Views
import HomeView from './views/HomeView';
import ProfileSetupView from './views/ProfileSetupView';
import QuestionnaireView from './views/QuestionnaireView';
import ShareAndPublishView from './views/ShareAndPublishView';
import ResultsView from './views/ResultsView';
import AdminLoginView from './views/AdminLoginView';
import AdminDashboardView from './views/AdminDashboardView';
import StaticPageView from './views/StaticPageView';

// Default static page content
const defaultAboutContent = `
    <p>Welcome to Marathi Bayko, the ultimate relationship compatibility checker! Our mission is to help couples, friends, and family members connect on a deeper level through fun and insightful quizzes.</p>
    <p>Whether you're starting a new relationship, celebrating years together, or just want to understand your partner better, our quizzes are designed to spark meaningful conversations and bring you closer together. Create your own personalized quiz or try one of our expertly crafted templates!</p>
`;
const defaultContactContent = `<p>Have questions or feedback? We'd love to hear from you! Please reach out to us at <strong>contact@marathibayko.app</strong> (example email).</p>`;
const defaultPrivacyContent = `
    <p>Your privacy is important to us. This application is designed to be completely serverless. All data, including your profile information and quiz answers, is stored exclusively on your local device's browser storage (LocalStorage). We do not collect, store, or share any of your personal data on any servers.</p>
    <p>Invitation links contain compressed quiz data and are shared directly by you, peer-to-peer. They are not stored by us. Our AdSense and Internal Ad features operate under their respective privacy policies.</p>
`;
const defaultTermsContent = `
    <p>By using Marathi Bayko, you agree to our terms. This is a fun application meant for entertainment. The results are not a substitute for professional relationship advice. You are responsible for the content you create and share. Please be respectful and enjoy connecting with your loved ones!</p>
`;

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>({ view: 'home' });
  const [activeTemplate, setActiveTemplate] = useState<QuizTemplate | null>(null);
  
  const [adSenseConfig, setAdSenseConfig] = useLocalStorage<AdSenseConfig>('adsense-config', { enabled: false, clientId: 'ca-pub-YOUR_CLIENT_ID', adSlotId: 'YOUR_AD_SLOT_ID', verificationCode: '' });
  const [internalAdConfig, setInternalAdConfig] = useLocalStorage<Record<string, InternalAd>>('internal-ad-config', {
    home_top_1x1: { enabled: false, imageUrl: '', redirectUrl: '', title: 'Home Ad (1:1)', aspectRatio: '1:1' },
    share_bottom_1x1: { enabled: false, imageUrl: '', redirectUrl: '', title: 'Share Page Ad (1:1)', aspectRatio: '1:1' },
    results_middle_1x1: { enabled: false, imageUrl: '', redirectUrl: '', title: 'Results Page Ad (1:1)', aspectRatio: '1:1' },
  });
  const [staticPages, setStaticPages] = useLocalStorage<Record<string, string>>('static-pages-content', {
    about: defaultAboutContent,
    contact: defaultContactContent,
    privacy: defaultPrivacyContent,
    terms: defaultTermsContent
  });
  const [siteImages, setSiteImages] = useLocalStorage<SiteImagesConfig>('site-images-config', {
      createQuiz: 'https://i.postimg.cc/Mps3pbNt/100071928-1.jpg'
  });

  const handleHashChange = async () => {
    const hash = window.location.hash;
    if (hash.startsWith('#/session/')) {
        const data = hash.replace('#/session/', '');
        try {
            const sessionData = await decodeBase64ToObject<SessionData>(data);
            if (validateSessionData(sessionData)) {
                setAppState({ view: 'partner_profile_setup', sessionData });
            } else {
                throw new Error("Invalid session data structure.");
            }
        } catch (error) {
            console.error("Error decoding session data:", error);
            alert("The invitation link is invalid or corrupted. Please ask for a new one.");
            goToHome();
        }
    } else if (hash.startsWith('#/result/')) {
        const data = hash.replace('#/result/', '');
        try {
            const resultData = await decodeBase64ToObject<ResultData>(data);
            if (validateResultData(resultData)) {
                setAppState({ view: 'results', resultData });
            } else {
                throw new Error("Invalid result data structure.");
            }
        } catch (error) {
            console.error("Error decoding result data:", error);
            alert("The result link is invalid or corrupted.");
            goToHome();
        }
    } else {
        // Only reset to home if there is a hash that is not a session or result link
        if (hash && hash !== '#') {
            goToHome();
        }
    }
  };

  useEffect(() => {
    window.addEventListener('hashchange', handleHashChange);
    handleHashChange(); // Check hash on initial load
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  useEffect(() => {
    if (adSenseConfig.enabled && adSenseConfig.clientId && !adSenseConfig.clientId.includes('YOUR_CLIENT_ID')) {
        const script = document.createElement('script');
        script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adSenseConfig.clientId}`;
        script.async = true;
        script.crossOrigin = 'anonymous';
        document.head.appendChild(script);
        return () => { document.head.removeChild(script); };
    }
  }, [adSenseConfig.enabled, adSenseConfig.clientId]);
  
  useEffect(() => {
    const existingTag = document.querySelector('meta[name="google-adsense-account"]');
    if (adSenseConfig.verificationCode) {
      if (existingTag) {
        existingTag.setAttribute('content', adSenseConfig.verificationCode);
      } else {
        const meta = document.createElement('meta');
        meta.name = 'google-adsense-account';
        meta.content = adSenseConfig.verificationCode;
        document.head.appendChild(meta);
      }
    } else {
      if(existingTag) {
        document.head.removeChild(existingTag);
      }
    }
  }, [adSenseConfig.verificationCode]);

  const goToHome = () => {
    setActiveTemplate(null);
    window.location.hash = '';
    setAppState({ view: 'home' });
  };
  
  const handleStartCreator = (template: QuizTemplate) => {
    setActiveTemplate(template);
    setAppState({ view: 'creator_profile_setup' });
  };

  const handleCreatorProfileSave = (profile: Profile) => {
    setAppState({ view: 'creator_questionnaire', creatorProfile: profile });
  };

  const handleCreatorQuestionnaireComplete = (answers: Answers) => {
    if (appState.view === 'creator_questionnaire' && activeTemplate) {
      setAppState({ view: 'share', sessionData: {
          creatorProfile: appState.creatorProfile,
          creatorAnswers: answers,
          questionsUsed: activeTemplate.questions,
          quizTitle: activeTemplate.title,
          analysisConfig: activeTemplate.analysisConfig,
      }});
    }
  };
  
  const handlePartnerProfileSave = (profile: Profile) => {
    if (appState.view === 'partner_profile_setup') {
      setAppState({ view: 'partner_questionnaire', sessionData: appState.sessionData, partnerProfile: profile });
    }
  };

  const handlePartnerQuestionnaireComplete = (answers: Answers) => {
    if (appState.view === 'partner_questionnaire') {
        const finalResultData: ResultData = {
            ...appState.sessionData,
            partnerProfile: appState.partnerProfile,
            partnerAnswers: answers,
        };
        // Removed the intermediate "PartnerFinishView" to simplify the flow
        window.location.hash = `#`; // Clear session hash
        setAppState({ view: 'results', resultData: finalResultData });
    }
  };

  const handleViewStaticPage = (page: 'about' | 'contact' | 'privacy' | 'terms') => {
      setAppState({ view: 'static_page', page });
  };
  
  const handleAdminClick = () => setAppState({ view: 'admin_login' });

  const renderContent = () => {
    switch (appState.view) {
      case 'home':
        return <HomeView onStartCreator={handleStartCreator} siteImages={siteImages} />;
      
      case 'creator_profile_setup':
        return <ProfileSetupView userType="Creator" onSave={handleCreatorProfileSave} onBack={goToHome} activeTemplate={activeTemplate} />;
      
      case 'creator_questionnaire':
        return <QuestionnaireView userType="Creator" questions={activeTemplate!.questions} onComplete={handleCreatorQuestionnaireComplete} onBack={() => setAppState({ view: 'creator_profile_setup' })} activeTemplate={activeTemplate} />;
      
      case 'share':
        return <ShareAndPublishView sessionData={appState.sessionData} onBack={() => setAppState({ view: 'creator_questionnaire', creatorProfile: appState.sessionData.creatorProfile })} internalAd={internalAdConfig['share_bottom_1x1']} />;

      case 'partner_profile_setup':
        return <ProfileSetupView userType="Partner" onSave={handlePartnerProfileSave} onBack={goToHome} activeTemplate={{ title: appState.sessionData.quizTitle } as QuizTemplate} />;
      
      case 'partner_questionnaire':
        return <QuestionnaireView userType="Partner" questions={appState.sessionData.questionsUsed} onComplete={handlePartnerQuestionnaireComplete} onBack={() => setAppState({ view: 'partner_profile_setup', sessionData: appState.sessionData })} activeTemplate={{ title: appState.sessionData.quizTitle } as QuizTemplate} />;
      
      case 'results':
        return <ResultsView resultData={appState.resultData} onBackToHome={goToHome} internalAdConfig={internalAdConfig} adSenseConfig={adSenseConfig} />;

      case 'admin_login':
        return <AdminLoginView onLoginSuccess={() => setAppState({ view: 'admin_dashboard' })} onBack={goToHome} />;
      
      case 'admin_dashboard':
        return <AdminDashboardView adSenseConfig={adSenseConfig} setAdSenseConfig={setAdSenseConfig} internalAdConfig={internalAdConfig} setInternalAdConfig={setInternalAdConfig} staticPages={staticPages} setStaticPages={setStaticPages} siteImages={siteImages} setSiteImages={setSiteImages} onLogout={goToHome} />;
      
      case 'static_page':
        let title = '';
        switch(appState.page) {
            case 'about': title = 'About Us'; break;
            case 'contact': title = 'Contact Us'; break;
            case 'privacy': title = 'Privacy Policy'; break;
            case 'terms': title = 'Terms & Conditions'; break;
        }
        return <StaticPageView title={title} content={<div dangerouslySetInnerHTML={{ __html: staticPages[appState.page] || ''}} />} onBack={goToHome} />

      default:
        return <div onClick={goToHome}>Loading or invalid state... Click to go home.</div>;
    }
  };

  return (
    <div className="bg-rose-50 min-h-screen font-sans text-gray-800">
        <div className="container mx-auto p-4 md:p-8 max-w-2xl">
            <header className="text-center mb-8 cursor-pointer" onClick={goToHome}>
                <h1 className="text-4xl md:text-5xl font-bold text-pink-600 tracking-tight">Marathi Bayko</h1>
                <p className="text-gray-500 mt-2">How well do you know your partner?</p>
            </header>
            <main>
                {renderContent()}
            </main>
             <footer className="text-center mt-12 text-sm text-gray-400">
                <div className="flex justify-center gap-4 mb-4">
                    <button onClick={() => handleViewStaticPage('about')} className="hover:text-pink-600 hover:underline">About</button>
                    <button onClick={() => handleViewStaticPage('contact')} className="hover:text-pink-600 hover:underline">Contact</button>
                    <button onClick={() => handleViewStaticPage('privacy')} className="hover:text-pink-600 hover:underline">Privacy</button>
                    <button onClick={() => handleViewStaticPage('terms')} className="hover:text-pink-600 hover:underline">Terms</button>
                    <button onClick={handleAdminClick} className="hover:text-pink-600 hover:underline">Admin</button>
                </div>
                <div className="mb-6">
                  <button 
                    onClick={goToHome} 
                    className="bg-pink-500 text-white rounded-full w-14 h-14 flex items-center justify-center mx-auto shadow-lg hover:bg-pink-600 transform hover:scale-110 transition-transform duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 focus:ring-offset-rose-50"
                    aria-label="Go to Home"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                  </button>
                </div>
                <p>&copy; {new Date().getFullYear()} Marathi Bayko. All Rights Reserved.</p>
            </footer>
        </div>
    </div>
  );
};

export default App;