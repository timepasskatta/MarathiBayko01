
import React, { useState, useEffect } from 'react';
import { AppState, Profile, Answers, Question, SessionData, ResultData, AdSenseConfig, InternalAd, SiteImagesConfig, QuizTemplate } from './types.ts';
import { useLocalStorage } from './hooks/useLocalStorage.ts';
import { decodeBase64ToObject, validateSessionData, validateResultData } from './utils/helpers.ts';
import { initialQuestions } from './data/questions.ts';
import { officialTemplates } from './data/officialTemplates.ts';

// Views
import HomeView from './views/HomeView.tsx';
import ProfileSetupView from './views/ProfileSetupView.tsx';
import QuestionChoiceView from './views/QuestionChoiceView.tsx';
import CustomQuestionEditorView from './views/CustomQuestionEditorView.tsx';
import QuestionnaireView from './views/QuestionnaireView.tsx';
import ShareAndPublishView from './views/ShareAndPublishView.tsx';
import PartnerFinishView from './views/PartnerFinishView.tsx';
import ResultsView from './views/ResultsView.tsx';
import AdminLoginView from './views/AdminLoginView.tsx';
import AdminDashboardView from './views/AdminDashboardView.tsx';
import StaticPageView from './views/StaticPageView.tsx';

// Components
import AdBanner from './components/AdBanner.tsx';
import InternalAdBanner from './components/InternalAdBanner.tsx';

// Default configurations
const DEFAULT_ADSENSE_CONFIG: AdSenseConfig = {
  enabled: false,
  clientId: 'ca-pub-YOUR_CLIENT_ID',
  adSlotId: 'YOUR_AD_SLOT_ID',
  verificationCode: ''
};

const DEFAULT_INTERNAL_AD_CONFIG: Record<string, InternalAd> = {
  home: { enabled: false, imageUrl: '', redirectUrl: '', title: '' },
  questionnaire: { enabled: false, imageUrl: '', redirectUrl: '', title: '' },
  share: { enabled: false, imageUrl: '', redirectUrl: '', title: '' },
  results: { enabled: false, imageUrl: '', redirectUrl: '', title: '' },
};

const DEFAULT_SITE_IMAGES: SiteImagesConfig = {
    createQuiz: 'https://i.postimg.cc/Mps3pbNt/100071928-1.jpg' // Your requested image
};

const DEFAULT_STATIC_PAGES: Record<string, string> = {
    about: '<h1>About Us</h1><p>Welcome to Marathi Bayko, the ultimate relationship compatibility checker! Our mission is to help couples, friends, and family members connect on a deeper level through fun and insightful quizzes.</p>',
    contact: '<h1>Contact Us</h1><p>Have questions or feedback? We\'d love to hear from you! Please reach out to us at <strong>contact@marathibayko.app</strong>.</p>',
    privacy: '<h1>Privacy Policy</h1><p>Your privacy is important to us. This application is designed to be completely serverless. All data is encoded in shared links and not stored on any server by us.</p>',
    terms: '<h1>Terms of Service</h1><p>By using our service, you agree to these terms. This is a fun application meant for entertainment. The results are not a substitute for professional relationship advice.</p>',
};

function App() {
  const [appState, setAppState] = useState<AppState>({ view: 'home' });
  const [activeTemplate, setActiveTemplate] = useState<QuizTemplate | null>(null);

  const [creatorProfile, setCreatorProfile] = useState<Profile | null>(null);
  const [customQuestions, setCustomQuestions] = useState<Question[] | null>(null);

  const [isAdminLoggedIn, setIsAdminLoggedIn] = useLocalStorage('isAdminLoggedIn-v2', false);
  const [adSenseConfig, setAdSenseConfig] = useLocalStorage<AdSenseConfig>('adSenseConfig-v2', DEFAULT_ADSENSE_CONFIG);
  const [internalAdConfig, setInternalAdConfig] = useLocalStorage<Record<string, InternalAd>>('internalAdConfig-v2', DEFAULT_INTERNAL_AD_CONFIG);
  const [siteImages, setSiteImages] = useLocalStorage<SiteImagesConfig>('siteImagesConfig-v2', DEFAULT_SITE_IMAGES);
  const [staticPages, setStaticPages] = useLocalStorage<Record<string, string>>('staticPagesContent-v2', DEFAULT_STATIC_PAGES);
  const [usedInvitationCodes, setUsedInvitationCodes] = useLocalStorage<Record<string, boolean>>('usedInvitationCodes-v2', {});

  useEffect(() => {
    // URL-based routing
    const handleUrlChange = async () => {
      const hash = window.location.hash;
      
      if (hash.startsWith('#/session/')) {
        const encodedData = hash.substring('#/session/'.length);

        if (usedInvitationCodes[encodedData]) {
          alert("This invitation code has already been used. Please ask your partner for a new one.");
          window.location.hash = '';
          return;
        }

        try {
          const sessionData = await decodeBase64ToObject<SessionData>(encodedData);
          if (validateSessionData(sessionData)) {
            setAppState({ view: 'partner_profile_setup', sessionData });
          } else {
            throw new Error("Invalid session data");
          }
        } catch (error) {
          console.error("Failed to decode session data:", error);
          alert("The quiz link is invalid or corrupted. Please ask your partner for a new link.");
          window.location.hash = '';
        }
      } else if (hash.startsWith('#/result/')) {
        const encodedData = hash.substring('#/result/'.length);
        try {
          const resultData = await decodeBase64ToObject<ResultData>(encodedData);
          if (validateResultData(resultData)) {
             const viewedResults = JSON.parse(localStorage.getItem('viewedResults-v2') || '{}');
              if (viewedResults[encodedData]) {
                  resultData.isSecondAttempt = true;
              }
              setAppState({ view: 'results', resultData });
          } else {
            throw new Error("Invalid result data");
          }
        } catch (error) {
          console.error("Failed to decode result data:", error);
          alert("The result link is invalid or corrupted.");
          window.location.hash = '';
        }
      } else if (hash === '#/admin') {
        setAppState(isAdminLoggedIn ? { view: 'admin_dashboard' } : { view: 'admin_login' });
      } else if (hash.startsWith('#/page/')) {
        const page = hash.substring('#/page/'.length) as 'about' | 'contact' | 'privacy' | 'terms';
        if (['about', 'contact', 'privacy', 'terms'].includes(page)) {
            setAppState({ view: 'static_page', page });
        } else {
            window.location.hash = '';
        }
      } else {
        if (appState.view !== 'home') {
          setAppState({ view: 'home' });
        }
      }
    };

    handleUrlChange();
    window.addEventListener('hashchange', handleUrlChange);
    return () => window.removeEventListener('hashchange', handleUrlChange);
  }, [isAdminLoggedIn]);
  
  const resetToHome = () => {
      setCreatorProfile(null);
      setCustomQuestions(null);
      setActiveTemplate(null);
      window.location.hash = '';
      setAppState({ view: 'home' });
  };

  const handleStartCreator = (template: QuizTemplate) => {
    setActiveTemplate(template);
    setAppState(template.id === 'action-create' ? { view: 'question_choice' } : { view: 'creator_profile_setup' });
  };

  const handleCreatorProfileSave = (profile: Profile) => {
    setCreatorProfile(profile);
    setAppState({ view: 'creator_questionnaire' });
  };
  
  const handleCreatorQuestionnaireComplete = (answers: Answers) => {
    if (creatorProfile && activeTemplate) {
      const sessionData: SessionData = {
        creatorProfile,
        creatorAnswers: answers,
        questionsUsed: customQuestions || activeTemplate.questions,
        analysisConfig: activeTemplate.analysisConfig,
        quizTitle: activeTemplate.title
      };
      setAppState({ view: 'share', sessionData });
    }
  };

  const handlePartnerQuestionnaireComplete = (partnerAnswers: Answers, sessionData: SessionData, partnerProfile: Profile) => {
    const resultData: ResultData = { ...sessionData, partnerProfile, partnerAnswers };
    const hash = window.location.hash;
    const encodedData = hash.substring('#/session/'.length);
    setUsedInvitationCodes(prev => ({ ...prev, [encodedData]: true }));
    setAppState({ view: 'partner_finish', resultData });
  };
  
  const handleResultCodeGenerated = (code: string) => {
    const viewedResults = JSON.parse(localStorage.getItem('viewedResults-v2') || '{}');
    viewedResults[code] = true;
    localStorage.setItem('viewedResults-v2', JSON.stringify(viewedResults));
    window.location.hash = `#/result/${code}`;
  };

  const renderContent = () => {
    switch (appState.view) {
      case 'home':
        return <HomeView onStartCreator={handleStartCreator} siteImages={siteImages} />;

      case 'creator_profile_setup':
        return <ProfileSetupView userType="Creator" onSave={handleCreatorProfileSave} onBack={resetToHome} activeTemplate={activeTemplate} />;
      
      case 'question_choice':
        return <QuestionChoiceView onSelectStandard={() => {
            const standardTemplate = officialTemplates.find(t => t.id === 'official-standard')!;
            const templateForCustom = {...standardTemplate, id: 'custom', title: 'Your Custom Quiz', description: 'A quiz created by you.'};
            setActiveTemplate(templateForCustom);
            setCustomQuestions(initialQuestions);
            setAppState({ view: 'creator_profile_setup' });
          }}
          onSelectCustom={() => setAppState({ view: 'custom_question_editor' })} onBack={resetToHome}
        />;
      
      case 'custom_question_editor':
        return <CustomQuestionEditorView onFinish={(questions) => {
            const standardTemplate = officialTemplates.find(t => t.id === 'official-standard')!;
            const templateForCustom = {...standardTemplate, id: 'custom', title: 'Your Custom Quiz', description: 'A quiz created by you.'};
            setActiveTemplate(templateForCustom);
            setCustomQuestions(questions);
            setAppState({ view: 'creator_profile_setup' });
          }}
          onBack={() => setAppState({ view: 'question_choice' })}
        />;

      case 'creator_questionnaire':
        const questionsForCreator = customQuestions || activeTemplate?.questions;
        if (!questionsForCreator) return <p>Error: No questions found.</p>;
        return <QuestionnaireView questions={questionsForCreator} onComplete={handleCreatorQuestionnaireComplete} userType="Creator" onBack={() => setAppState({ view: 'creator_profile_setup' })} activeTemplate={activeTemplate} internalAd={internalAdConfig['questionnaire']}/>;

      case 'share':
        return <ShareAndPublishView sessionData={appState.sessionData} onBack={resetToHome} internalAd={internalAdConfig['share']} />;

      case 'partner_profile_setup':
        // FIX: Cast to unknown first to satisfy TypeScript when creating a partial QuizTemplate. The view only requires `title` and `analysisConfig` from the template.
        return <ProfileSetupView userType="Partner" onSave={(partnerProfile) => setAppState({ view: 'partner_questionnaire', sessionData: appState.sessionData, partnerProfile })} onBack={resetToHome} activeTemplate={{...appState.sessionData.analysisConfig, title: appState.sessionData.quizTitle} as unknown as QuizTemplate} />;
      
      case 'partner_questionnaire':
          // FIX: Cast to unknown first to satisfy TypeScript when creating a partial QuizTemplate. The view only requires `title` from the template.
          return <QuestionnaireView questions={appState.sessionData.questionsUsed} onComplete={(answers) => handlePartnerQuestionnaireComplete(answers, appState.sessionData, appState.partnerProfile)} userType="Partner" onBack={() => setAppState({ view: 'partner_profile_setup', sessionData: appState.sessionData })} activeTemplate={{...appState.sessionData.analysisConfig, title: appState.sessionData.quizTitle} as unknown as QuizTemplate} internalAd={internalAdConfig['questionnaire']}/>;

      case 'partner_finish':
          return <PartnerFinishView resultData={appState.resultData} onResultCodeGenerated={handleResultCodeGenerated} />;

      case 'results':
        return <ResultsView resultData={appState.resultData} onBackToHome={resetToHome} internalAdConfig={internalAdConfig} />;
      
      case 'admin_login':
          return <AdminLoginView onLoginSuccess={() => { setIsAdminLoggedIn(true); window.location.hash = '#/admin'; }} onBack={resetToHome} />;

      case 'admin_dashboard':
          if (!isAdminLoggedIn) { setAppState({ view: 'admin_login' }); return null; }
          // FIX: Pass the imported `officialTemplates` to the `AdminDashboardView` to satisfy the `templates` prop requirement.
          return <AdminDashboardView templates={officialTemplates} adSenseConfig={adSenseConfig} setAdSenseConfig={setAdSenseConfig} internalAdConfig={internalAdConfig} setInternalAdConfig={setInternalAdConfig} siteImages={siteImages} setSiteImages={setSiteImages} staticPages={staticPages} setStaticPages={setStaticPages} onLogout={() => { setIsAdminLoggedIn(false); resetToHome(); }}/>;
          
      case 'static_page':
          const pageKey = appState.page;
          return <StaticPageView title={pageKey.charAt(0).toUpperCase() + pageKey.slice(1).replace('_', ' ')} content={<div dangerouslySetInnerHTML={{ __html: staticPages[pageKey] || '' }} />} onBack={resetToHome} />;

      default:
        return <HomeView onStartCreator={handleStartCreator} siteImages={siteImages} />;
    }
  };
  
  const openStaticPage = (page: 'about' | 'contact' | 'privacy' | 'terms') => window.location.hash = `#/page/${page}`;

  return (
    <div className="bg-rose-50 min-h-screen font-sans text-gray-800 flex flex-col">
       <header className="text-center pt-8 cursor-pointer" onClick={resetToHome}>
          <h1 className="text-4xl md:text-5xl font-bold text-pink-600 tracking-tight">Marathi Bayko</h1>
          <p className="text-gray-500 mt-2">How well do you know your partner?</p>
      </header>
      <main className="flex-grow">
        <div className="container mx-auto p-4 max-w-2xl">
          {renderContent()}
        </div>
      </main>
      <footer className="w-full text-center py-6 text-sm text-gray-500">
        <div className="container mx-auto max-w-2xl px-4">
            <div className="flex justify-center items-center space-x-4 mb-4">
                <button onClick={() => openStaticPage('about')} className="hover:text-pink-600">About</button>
                <button onClick={() => openStaticPage('contact')} className="hover:text-pink-600">Contact</button>
                <button onClick={() => openStaticPage('privacy')} className="hover:text-pink-600">Privacy</button>
                <button onClick={() => openStaticPage('terms')} className="hover:text-pink-600">Terms</button>
                <button onClick={() => window.location.hash = '#/admin'} className="hover:text-pink-600">Admin</button>
            </div>
             <div className="mb-6">
                  <button onClick={resetToHome} className="bg-pink-500 text-white rounded-full w-14 h-14 flex items-center justify-center mx-auto shadow-lg hover:bg-pink-600 transform hover:scale-110 transition-transform duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 focus:ring-offset-rose-50" aria-label="Go to Home">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                  </button>
                </div>
            <p>&copy; {new Date().getFullYear()} Marathi Bayko. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
