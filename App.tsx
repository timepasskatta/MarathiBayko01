
import React, { useState, useEffect } from 'react';
import { useLocalStorage } from './hooks/useLocalStorage';
import { officialTemplates as initialOfficialTemplates } from './data/officialTemplates';
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
import QuestionChoiceView from './views/QuestionChoiceView';
import CustomQuestionEditorView from './views/CustomQuestionEditorView';
import QuestionnaireView from './views/QuestionnaireView';
import ShareAndPublishView from './views/ShareAndPublishView';
import PartnerFinishView from './views/PartnerFinishView';
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
    <p>Invitation codes contain compressed quiz data and are shared directly by you, peer-to-peer. They are not stored by us. Our AdSense and Internal Ad features operate under their respective privacy policies.</p>
`;
const defaultTermsContent = `
    <p>By using Marathi Bayko, you agree to our terms. This is a fun application meant for entertainment. The results are not a substitute for professional relationship advice. You are responsible for the content you create and share. Please be respectful and enjoy connecting with your loved ones!</p>
`;

const App: React.FC = () => {
  // State Management
  const [appState, setAppState] = useState<AppState>({ view: 'home' });
  const [questionsToUse, setQuestionsToUse] = useState<Question[]>([]);
  const [activeTemplate, setActiveTemplate] = useState<QuizTemplate | null>(null);
  const [creatorProfile, setCreatorProfile] = useState<Profile | null>(null);
  const [creatorAnswers, setCreatorAnswers] = useState<Answers>({});
  const [sessionData, setSessionData] = useState<SessionData | null>(null);
  const [resultData, setResultData] = useState<ResultData | null>(null);
  const [quizOrigin, setQuizOrigin] = useState<'standard' | 'custom' | 'template' | null>(null);
  
  // Persisted State
  const [adSenseConfig, setAdSenseConfig] = useLocalStorage<AdSenseConfig>('adsense-config', { enabled: true, clientId: 'ca-pub-YOUR_CLIENT_ID', adSlotId: 'YOUR_AD_SLOT_ID', verificationCode: '' });
  const [internalAdConfig, setInternalAdConfig] = useLocalStorage<Record<string, InternalAd>>('internal-ad-config', {});
  const [staticPages, setStaticPages] = useLocalStorage<Record<string, string>>('static-pages-content', {
    about: defaultAboutContent,
    contact: defaultContactContent,
    privacy: defaultPrivacyContent,
    terms: defaultTermsContent
  });
  const [siteImages, setSiteImages] = useLocalStorage<SiteImagesConfig>('site-images-config', {
    createQuiz: 'https://i.postimg.cc/Mps3pbNt/100071928-1.jpg',
    joinQuiz: 'https://i.postimg.cc/vBn0XRBk/100071928-2.jpg',
  });
  const [viewedResultCodes, setViewedResultCodes] = useLocalStorage<Record<string, boolean>>('viewed-result-codes', {});


  // --- Dynamic Head Scripts ---
  useEffect(() => {
    // AdSense Script
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
    // AdSense Verification Meta Tag
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


  // --- Navigation and State Handlers ---
  const goToHome = () => {
    // Reset volatile state
    setCreatorProfile(null);
    setCreatorAnswers({});
    setSessionData(null);
    setResultData(null);
    setQuestionsToUse([]);
    setActiveTemplate(null);
    setQuizOrigin(null);
    setAppState({ view: 'home' });
  };
  
  const handleCodeSubmit = async (code: string): Promise<{error?: string}> => {
    try {
      // First, try to decode as ResultData
      const result = await decodeBase64ToObject<ResultData>(code);
      if (validateResultData(result)) {
        if (viewedResultCodes[code]) {
          result.isSecondAttempt = true;
        }
        setViewedResultCodes(prev => ({ ...prev, [code]: true }));
        handleViewResults(result);
        return {};
      }
    } catch (e) {
      // Not a result code, or invalid. Let's try as SessionData.
    }

    try {
      // Try to decode as SessionData (invitation)
      const session = await decodeBase64ToObject<SessionData>(code);
      if (validateSessionData(session)) {
        handleJoinQuiz(session);
        return {};
      }
    } catch (e) {
      // Still failed.
    }
    
    return { error: 'Invalid or corrupted code. Please check and try again.' };
  };

  // Creator Flow
  const handleStartCreator = () => {
    setQuizOrigin('custom'); // Assume custom until they choose
    setAppState({ view: 'creator_profile_setup' });
  };
  const handleCreatorProfileSave = (profile: Profile) => {
    setCreatorProfile(profile);
    if(quizOrigin === 'template') {
        setAppState({ view: 'creator_questionnaire' });
    } else {
        setAppState({ view: 'question_choice' });
    }
  };
  const handleSelectStandardQuestions = () => {
    const standardQuiz = initialOfficialTemplates.find(t => t.id === 'official-standard');
    if (standardQuiz) {
      setQuestionsToUse(standardQuiz.questions);
      setActiveTemplate(standardQuiz);
      setQuizOrigin('standard');
      setAppState({ view: 'creator_questionnaire' });
    } else {
      alert("Standard quiz not found!");
    }
  };
   const handleSelectCustomQuestions = () => {
    setQuizOrigin('custom');
    setAppState({ view: 'custom_question_editor' });
   };
   const handleCustomQuestionsFinish = (questions: Question[]) => {
    setQuestionsToUse(questions);
    const standardTemplateForAnalysis = initialOfficialTemplates.find(t => t.id === 'official-standard');
    setActiveTemplate(standardTemplateForAnalysis || null);
    setAppState({ view: 'creator_questionnaire' });
   };
  const handleCreatorQuestionnaireComplete = (answers: Answers) => {
    setCreatorAnswers(answers);
    setAppState({ view: 'share' });
  };
  
  // Partner Flow
  const handleJoinQuiz = (session: SessionData) => {
    setSessionData(session);
    setActiveTemplate(initialOfficialTemplates.find(t => t.title === session.quizTitle) || null);
    setAppState({ view: 'partner_profile_setup' });
  };
  const handlePartnerProfileSave = (profile: Profile) => {
    if (sessionData) {
      setResultData({
          ...sessionData,
          partnerProfile: profile,
          partnerAnswers: {}, // Initialize partner answers
      });
      setAppState({ view: 'partner_questionnaire' });
    }
  };
  const handlePartnerQuestionnaireComplete = (answers: Answers) => {
    if (resultData) {
      const finalResultData = { ...resultData, partnerAnswers: answers };
      setResultData(finalResultData);
      setAppState({ view: 'partner_finish', resultData: finalResultData });
    }
  };

  const handleResultCodeGenerated = (code: string) => {
    setViewedResultCodes(prev => ({ ...prev, [code]: true }));
  };

  // Template Flow
  const handleStartFromTemplate = (template: QuizTemplate) => {
    setQuestionsToUse(template.questions);
    setActiveTemplate(template);
    setQuizOrigin('template');
    setAppState({ view: 'creator_profile_setup' });
  };

  // Results Flow
  const handleViewResults = (data: ResultData) => {
    setResultData(data);
    setAppState({ view: 'results' });
  };
  
  // Admin Flow
  const handleAdminLogin = () => setAppState({ view: 'admin_login' });
  const handleLoginSuccess = () => setAppState({ view: 'admin_dashboard' });
  
  // Static Page Flow
  const handleViewStaticPage = (page: 'about' | 'contact' | 'privacy' | 'terms') => {
      setAppState({ view: 'static_page', page });
  };

  // --- View Rendering ---
  const renderContent = () => {
    switch (appState.view) {
      case 'home':
        return <HomeView onStartCreator={handleStartCreator} onStartFromTemplate={handleStartFromTemplate} onCodeSubmit={handleCodeSubmit} siteImages={siteImages} />;
      
      // Creator Flow
      case 'creator_profile_setup':
        return <ProfileSetupView userType="Creator" onSave={handleCreatorProfileSave} onBack={goToHome} activeTemplate={activeTemplate} />;
      case 'question_choice':
        return <QuestionChoiceView onSelectStandard={handleSelectStandardQuestions} onSelectCustom={handleSelectCustomQuestions} onBack={() => setAppState({ view: 'creator_profile_setup'})} />;
      case 'custom_question_editor':
        return <CustomQuestionEditorView onFinish={handleCustomQuestionsFinish} onBack={() => setAppState({ view: 'question_choice' })} />;
      case 'creator_questionnaire':
        const handleCreatorQuestionnaireBack = () => {
          if (quizOrigin === 'template') {
            goToHome();
          } else { // standard or custom
            setAppState({ view: 'question_choice' });
          }
        };
        return <QuestionnaireView userType="Creator" questions={questionsToUse} onComplete={handleCreatorQuestionnaireComplete} onBack={handleCreatorQuestionnaireBack} activeTemplate={activeTemplate} internalAd={internalAdConfig['questionnaire']} />;
      case 'share':
        if (!creatorProfile || !activeTemplate) return <p>Error: Creator profile or template not found.</p>;
        return <ShareAndPublishView creatorProfile={creatorProfile} creatorAnswers={creatorAnswers} questionsUsed={questionsToUse} onBack={() => setAppState({ view: 'creator_questionnaire'})} internalAd={internalAdConfig['share']} activeTemplate={activeTemplate}/>;

      // Partner Flow
      case 'partner_profile_setup':
        return <ProfileSetupView userType="Partner" onSave={handlePartnerProfileSave} onBack={goToHome} activeTemplate={activeTemplate} creatorName={sessionData?.creatorProfile.name} />;
      case 'partner_questionnaire':
        if (!sessionData) return <p>Error: Session data not found.</p>;
        return <QuestionnaireView userType="Partner" questions={sessionData.questionsUsed} onComplete={handlePartnerQuestionnaireComplete} onBack={() => setAppState({ view: 'partner_profile_setup'})} activeTemplate={activeTemplate} internalAd={internalAdConfig['questionnaire']} />;
      case 'partner_finish':
        if (!appState.resultData) return <p>Error: Result data not found.</p>;
        return <PartnerFinishView resultData={appState.resultData} onBackToHome={goToHome} onViewResults={handleViewResults} onResultCodeGenerated={handleResultCodeGenerated} />;

      // Results
      case 'results':
        if (!resultData) return <p>Error: Result data not found.</p>;
        return <ResultsView resultData={resultData} onBackToHome={goToHome} internalAdConfig={internalAdConfig} />;

      // Admin
      case 'admin_login':
        return <AdminLoginView onLoginSuccess={handleLoginSuccess} onBack={goToHome} />;
      case 'admin_dashboard':
        return <AdminDashboardView adSenseConfig={adSenseConfig} setAdSenseConfig={setAdSenseConfig} internalAdConfig={internalAdConfig} setInternalAdConfig={setInternalAdConfig} staticPages={staticPages} setStaticPages={setStaticPages} siteImages={siteImages} setSiteImages={setSiteImages} onLogout={goToHome} />;

      // Static Pages
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
        return <div onClick={goToHome}>Unknown state. Click to go home.</div>;
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
                    <a href="#admin" onClick={(e) => { e.preventDefault(); handleAdminLogin(); }} className="hover:text-pink-600 hover:underline">Admin</a>
                </div>
                <div className="mb-6">
                  <button 
                    onClick={goToHome} 
                    className="bg-pink-500 text-white rounded-full w-14 h-14 flex items-center justify-center mx-auto shadow-lg hover:bg-pink-600 transform hover:scale-110 transition-transform duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 focus:ring-offset-rose-50"
                    aria-label="Go to Home"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      {/* FIX: Completed truncated SVG path data. */}
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2l-7 7-7-7m14 0V4a1 1 0 00-1-1h-3" />
                    </svg>
                  </button>
                </div>
             </footer>
        </div>
    </div>
  );
};

// FIX: Added missing default export for the App component.
export default App;
