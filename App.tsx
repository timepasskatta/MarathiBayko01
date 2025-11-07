import React, { useState, useEffect } from 'react';
import { useLocalStorage } from './hooks/useLocalStorage.ts';
import { initialQuestions } from './data/questions.ts';
import { officialTemplates } from './data/officialTemplates.ts';
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
} from './types.ts';
import { decodeBase64ToObject, validateSessionData, validateResultData } from './utils/helpers.ts';


// Views
import HomeView from './views/HomeView.tsx';
import ProfileSetupView from './views/ProfileSetupView.tsx';
import CustomQuestionEditorView from './views/CustomQuestionEditorView.tsx';
import QuestionnaireView from './views/QuestionnaireView.tsx';
import ShareAndPublishView from './views/ShareAndPublishView.tsx';
import ResultsView from './views/ResultsView.tsx';
import AdminLoginView from './views/AdminLoginView.tsx';
import AdminDashboardView from './views/AdminDashboardView.tsx';
import StaticPageView from './views/StaticPageView.tsx';

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
  // State Management
  const [appState, setAppState] = useState<AppState>({ view: 'home' });
  const [questionsToUse, setQuestionsToUse] = useState<Question[]>([]);
  const [activeTemplate, setActiveTemplate] = useState<QuizTemplate | null>(null);
  
  // Persisted State
  const [adSenseConfig, setAdSenseConfig] = useLocalStorage<AdSenseConfig>('adsense-config', { enabled: false, clientId: '', adSlotId: '', verificationCode: '' });
  const [internalAdConfig, setInternalAdConfig] = useLocalStorage<Record<string, InternalAd>>('internal-ad-config', {
      home_top: { enabled: false, imageUrl: '', redirectUrl: '', title: '', description: '', aspectRatio: '1:1' },
      share_page: { enabled: false, imageUrl: '', redirectUrl: '', title: '', description: '', aspectRatio: '1:1' },
      results_page: { enabled: false, imageUrl: '', redirectUrl: '', title: '', description: '', aspectRatio: '1:1' },
  });
   const [siteImages, setSiteImages] = useLocalStorage<SiteImagesConfig>('site-images-config', {
        createQuiz: 'https://i.postimg.cc/Mps3pbNt/100071928-1.jpg'
    });

  const [staticPages, setStaticPages] = useLocalStorage<Record<string, string>>('static-pages-content', {
    about: defaultAboutContent,
    contact: defaultContactContent,
    privacy: defaultPrivacyContent,
    terms: defaultTermsContent
  });

  // --- App Initialization & Routing ---
  useEffect(() => {
    const handleHashChange = async () => {
        const hash = window.location.hash;
        if (hash.startsWith('#/session/')) {
            const data = hash.substring('#/session/'.length);
            try {
                const decodedPayload = await decodeBase64ToObject<any>(data);

                // Reconstruct the full session data
                let session: SessionData;

                if (decodedPayload.templateId) {
                    // Smart link: find template and add questions
                    const template = officialTemplates.find(t => t.id === decodedPayload.templateId);
                    if (!template) {
                        throw new Error(`Official quiz template '${decodedPayload.templateId}' not found.`);
                    }
                    session = {
                        ...decodedPayload,
                        questionsUsed: template.questions,
                    };
                } else {
                    // Legacy/Custom link: questions are already included
                    session = decodedPayload as SessionData;
                }

                if (validateSessionData(session)) {
                    setAppState({ view: 'partner_profile_setup', sessionData: session });
                } else {
                    alert('Invalid or corrupted quiz link.');
                    goToHome();
                }
            } catch (e) {
                console.error("Error decoding session link:", e);
                alert('Invalid or corrupted quiz link.');
                goToHome();
            }
        } else if (hash.startsWith('#/result/')) {
            const data = hash.substring('#/result/'.length);
            try {
                const result = await decodeBase64ToObject<ResultData>(data);
                if (validateResultData(result)) {
                     setAppState({ view: 'results', resultData: result });
                } else {
                    alert('Invalid or corrupted result link.');
                    goToHome();
                }
            } catch (e) {
                console.error("Error decoding result link:", e);
                alert('Invalid or corrupted result link.');
                goToHome();
            }
        }
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange(); // Check hash on initial load

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);


  // --- Dynamic Head Scripts ---
  useEffect(() => {
    if (adSenseConfig.enabled && adSenseConfig.clientId) {
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
    } else if (existingTag) {
      document.head.removeChild(existingTag);
    }
  }, [adSenseConfig.verificationCode]);


  // --- Navigation and State Handlers ---
  const goToHome = () => {
    window.location.hash = '';
    setAppState({ view: 'home' });
  };
  
  // Creator Flow
   const handleStartCreator = (template?: QuizTemplate) => {
    if(template){
      setActiveTemplate(template);
      setQuestionsToUse(template.questions);
    } else {
      // Logic for "Create Your Own"
      const ownQuizTemplate: QuizTemplate = {
        id: 'custom',
        title: 'Your Custom Quiz',
        description: '',
        creatorName: '',
        isOfficial: false,
        isPublic: false,
        status: 'approved',
        createdAt: new Date().toISOString(),
        imageUrl: '',
        questions: [],
        analysisConfig: officialTemplates[0].analysisConfig,
      };
      setActiveTemplate(ownQuizTemplate);
      setQuestionsToUse([]);
    }
    setAppState({ view: 'creator_profile_setup' });
  };

  const handleCreatorProfileSave = (profile: Profile) => {
    const updatedTemplate = { ...activeTemplate!, creatorName: profile.name };
    setActiveTemplate(updatedTemplate);
    // FIX: Correctly route to question editor for custom quizzes
    if (activeTemplate?.id === 'custom') {
      setAppState({ view: 'custom_question_editor', creatorProfile: profile });
    } else {
      setAppState({ view: 'creator_questionnaire', creatorProfile: profile });
    }
  };

  const handleCustomQuestionsFinish = (questions: Question[], profile: Profile) => {
    setQuestionsToUse(questions);
    const updatedTemplate = { ...activeTemplate!, questions };
    setActiveTemplate(updatedTemplate);
    setAppState({ view: 'creator_questionnaire', creatorProfile: profile });
  };

  const handleCreatorQuestionnaireComplete = (answers: Answers, profile: Profile) => {
    const sessionData: SessionData = {
      creatorProfile: profile,
      creatorAnswers: answers,
      questionsUsed: questionsToUse,
      analysisConfig: activeTemplate!.analysisConfig,
      quizTitle: activeTemplate!.title,
      templateId: activeTemplate?.isOfficial ? activeTemplate.id : undefined,
    };
    setAppState({ view: 'share', sessionData });
  };
  
  // Partner Flow
  const handlePartnerProfileSave = (profile: Profile, session: SessionData) => {
    setAppState({ view: 'partner_questionnaire', sessionData: session, partnerProfile: profile });
  };
  const handlePartnerQuestionnaireComplete = (answers: Answers, session: SessionData, partnerProfile: Profile) => {
    const finalResultData: ResultData = { 
        ...session, 
        partnerProfile, 
        partnerAnswers: answers 
    };
    setAppState({ view: 'results', resultData: finalResultData });
  };

  // Admin Flow
  const handleAdminLogin = () => {
    window.location.hash = 'admin';
    setAppState({ view: 'admin_login' });
  };
  const handleLoginSuccess = () => setAppState({ view: 'admin_dashboard' });
  
  // Static Page Flow
  const handleViewStaticPage = (page: 'about' | 'contact' | 'privacy' | 'terms') => {
      setAppState({ view: 'static_page', page });
  };

  // --- View Rendering ---
  const renderContent = () => {
    switch (appState.view) {
      case 'home':
        return <HomeView onStartCreator={handleStartCreator} siteImages={siteImages} />;
      
      // Creator Flow
      case 'creator_profile_setup':
        return <ProfileSetupView userType="Creator" onSave={handleCreatorProfileSave} onBack={goToHome} activeTemplate={activeTemplate} />;
      case 'custom_question_editor':
        return <CustomQuestionEditorView onFinish={(questions) => handleCustomQuestionsFinish(questions, appState.creatorProfile)} onBack={() => setAppState({ view: 'creator_profile_setup' })} />;
      case 'creator_questionnaire':
         return <QuestionnaireView userType="Creator" questions={questionsToUse} onComplete={(answers) => handleCreatorQuestionnaireComplete(answers, appState.creatorProfile)} onBack={() => setAppState({ view: 'creator_profile_setup' })} activeTemplate={activeTemplate} creatorProfile={appState.creatorProfile} />;
      case 'share':
        return <ShareAndPublishView sessionData={appState.sessionData} onBack={() => setAppState({ view: 'creator_questionnaire', creatorProfile: appState.sessionData.creatorProfile })} internalAd={internalAdConfig['share_page']} />;

      // Partner Flow
      case 'partner_profile_setup':
        return <ProfileSetupView userType="Partner" onSave={(profile) => handlePartnerProfileSave(profile, appState.sessionData)} onBack={goToHome} activeTemplate={{id: 'session-quiz', title: appState.sessionData.quizTitle, description: '', creatorName: appState.sessionData.creatorProfile.name, questions: appState.sessionData.questionsUsed, isPublic: false, isOfficial: false, createdAt: new Date().toISOString(), status: 'approved', imageUrl: '', analysisConfig: appState.sessionData.analysisConfig}} />;
      case 'partner_questionnaire':
        return <QuestionnaireView userType="Partner" questions={appState.sessionData.questionsUsed} onComplete={(answers) => handlePartnerQuestionnaireComplete(answers, appState.sessionData, appState.partnerProfile)} onBack={() => setAppState({ view: 'partner_profile_setup', sessionData: appState.sessionData})} activeTemplate={{id: 'session-quiz', title: appState.sessionData.quizTitle, description: '', creatorName: appState.sessionData.creatorProfile.name, questions: appState.sessionData.questionsUsed, isPublic: false, isOfficial: false, createdAt: new Date().toISOString(), status: 'approved', imageUrl: '', analysisConfig: appState.sessionData.analysisConfig}} creatorProfile={appState.partnerProfile} />;

      // Results
      case 'results':
        return <ResultsView resultData={appState.resultData} onBackToHome={goToHome} adSenseConfig={adSenseConfig} internalAd={internalAdConfig['results_page']} />;

      // Admin
      case 'admin_login':
        return <AdminLoginView onLoginSuccess={handleLoginSuccess} onBack={goToHome} />;
      case 'admin_dashboard':
        return <AdminDashboardView adSenseConfig={adSenseConfig} setAdSenseConfig={setAdSenseConfig} internalAdConfig={internalAdConfig} setInternalAdConfig={setInternalAdConfig} staticPages={staticPages} setStaticPages={setStaticPages} siteImages={siteImages} setSiteImages={setSiteImages} onLogout={goToHome} />;

      // Static Pages
      case 'static_page':
        return <StaticPageView title={appState.page.charAt(0).toUpperCase() + appState.page.slice(1)} content={<div dangerouslySetInnerHTML={{ __html: staticPages[appState.page] || ''}} />} onBack={goToHome} />

      default:
        return <HomeView onStartCreator={handleStartCreator} siteImages={siteImages} />;
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
                <div className="flex justify-center flex-wrap gap-4 mb-4">
                    <button onClick={() => handleViewStaticPage('about')} className="hover:text-pink-600 hover:underline">About</button>
                    <button onClick={() => handleViewStaticPage('contact')} className="hover:text-pink-600 hover:underline">Contact</button>
                    <button onClick={() => handleViewStaticPage('privacy')} className="hover:text-pink-600 hover:underline">Privacy</button>
                    <button onClick={() => handleViewStaticPage('terms')} className="hover:text-pink-600 hover:underline">Terms</button>
                     <button onClick={handleAdminLogin} className="hover:text-pink-600 hover:underline">Admin</button>
                </div>
                <div className="mb-6">
                  <button 
                    onClick={goToHome} 
                    className="bg-pink-500 text-white rounded-full w-14 h-14 flex items-center justify-center mx-auto shadow-lg hover:bg-pink-600 transform hover:scale-110 transition-transform duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 focus:ring-offset-rose-50"
                    aria-label="Go to Home"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
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
