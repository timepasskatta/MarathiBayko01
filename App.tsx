import React, { useState, useEffect } from 'react';
import {
  AppState,
  Profile,
  Answers,
  Question,
  ResultData,
  QuizTemplate,
  AdSenseConfig,
  InternalAd,
  SessionData
} from './types';
import { useLocalStorage } from './hooks/useLocalStorage';
import { officialTemplates as initialOfficialTemplates } from './data/officialTemplates';
// FIX: Added import for initial questions to be used as a fallback.
import { initialQuestions } from './data/questions';
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
import { decodeBase64ToObject, validateResultData, validateSessionData } from './utils/helpers';

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
  const [appState, setAppState] = useState<AppState>({ view: 'home' });

  // Quiz flow state
  const [creatorProfile, setCreatorProfile] = useState<Profile | null>(null);
  // FIX: Added state for partner's profile and answers to manage the partner quiz flow.
  const [partnerProfile, setPartnerProfile] = useState<Profile | null>(null);
  const [creatorAnswers, setCreatorAnswers] = useState<Answers>({});
  const [partnerAnswers, setPartnerAnswers] = useState<Answers>({});
  const [questionsUsed, setQuestionsUsed] = useState<Question[]>([]);
  const [activeTemplate, setActiveTemplate] = useState<QuizTemplate | null>(null);
  const [resultData, setResultData] = useState<ResultData | null>(null);
  const [quizSource, setQuizSource] = useState<'home_template' | 'scratch' | null>(null);

  // Persisted data
  const [viewedResultCodes, setViewedResultCodes] = useLocalStorage<Record<string, boolean>>('viewed-codes', {});
  const [communityTemplates, setCommunityTemplates] = useLocalStorage<QuizTemplate[]>('community-templates', []);

  // Admin and config state
  const [adSenseConfig, setAdSenseConfig] = useLocalStorage<AdSenseConfig>('adsense-config', {
    enabled: false,
    clientId: 'YOUR_CLIENT_ID',
    adSlotId: 'YOUR_AD_SLOT_ID',
    verificationCode: ''
  });
  const [internalAds, setInternalAds] = useLocalStorage<Record<string, InternalAd>>('internal-ads', {
    home: { enabled: false, imageUrl: '', redirectUrl: '', title: 'Home Page Ad' },
    questionnaire: { enabled: false, imageUrl: '', redirectUrl: '', title: 'Questionnaire Ad' },
    share: { enabled: false, imageUrl: '', redirectUrl: '', title: 'Share Page Ad' },
    results: { enabled: false, imageUrl: '', redirectUrl: '', title: 'Results Page Ad' }
  });
  const [staticPages, setStaticPages] = useLocalStorage<Record<string, string>>('static-pages', {
    about: defaultAboutContent,
    contact: defaultContactContent,
    privacy: defaultPrivacyContent,
    terms: defaultTermsContent,
  });
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useLocalStorage<boolean>('admin-logged-in', false);

  useEffect(() => {
    if (adSenseConfig.enabled && adSenseConfig.verificationCode) {
        const meta = document.createElement('meta');
        meta.name = "google-adsense-account";
        meta.content = adSenseConfig.verificationCode;
        document.head.appendChild(meta);
        return () => { document.head.removeChild(meta); }
    }
  }, [adSenseConfig.enabled, adSenseConfig.verificationCode]);

  useEffect(() => {
    if (adSenseConfig.enabled && adSenseConfig.clientId && !adSenseConfig.clientId.includes('YOUR_CLIENT_ID')) {
        const script = document.createElement('script');
        script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adSenseConfig.clientId}`;
        script.async = true;
        script.crossOrigin = "anonymous";
        document.head.appendChild(script);
        return () => {
            const existingScript = document.querySelector(`script[src*="${adSenseConfig.clientId}"]`);
            if (existingScript) { document.head.removeChild(existingScript); }
        }
    }
  }, [adSenseConfig.enabled, adSenseConfig.clientId]);


  const resetQuizState = () => {
    setCreatorProfile(null);
    setPartnerProfile(null);
    setCreatorAnswers({});
    setPartnerAnswers({});
    setQuestionsUsed([]);
    setActiveTemplate(null);
    setResultData(null);
    setQuizSource(null);
  };

  const goHome = () => {
    resetQuizState();
    setAppState({ view: 'home' });
  };
  
  const handleCodeSubmit = async (code: string): Promise<{success: boolean, message?: string}> => {
    try {
      const decoded = await decodeBase64ToObject<any>(code.trim());
      if (validateResultData(decoded)) {
        const isSecondAttempt = !!viewedResultCodes[code];
        if (!isSecondAttempt) {
            // This is the first time the creator is viewing it. We don't mark it yet.
            // The mark happens when the PARTNER generates the code.
        }
        const result: ResultData = { ...decoded, isSecondAttempt };
        setResultData(result);
        setAppState({ view: 'results' });
        return { success: true };
      }
      if (validateSessionData(decoded)) {
        resetQuizState();
        const session = decoded as SessionData;
        setActiveTemplate({ 
          id: 'from-code', title: 'Quiz from Partner', description: `A quiz by ${session.creatorProfile.name}`,
          creatorName: session.creatorProfile.name, questions: session.questionsUsed, isPublic: false,
          isOfficial: false, createdAt: new Date().toISOString(), status: 'pending', imageUrl: '',
          analysisConfig: session.analysisConfig
        });
        setQuestionsUsed(session.questionsUsed);
        setCreatorProfile(session.creatorProfile);
        setCreatorAnswers(session.creatorAnswers);
        setAppState({ view: 'partner_profile_setup' });
        return { success: true };
      }
      return { success: false, message: 'Invalid or corrupted code.' };
    } catch (error) {
      console.error("Code decoding error:", error);
      return { success: false, message: 'The code seems to be invalid.' };
    }
  };


  const handleStartCreator = () => {
    resetQuizState();
    setQuizSource('scratch');
    setAppState({ view: 'creator_profile_setup' });
  };

  const handleStartFromTemplate = (template: QuizTemplate) => {
    resetQuizState();
    setQuizSource('home_template');
    setActiveTemplate(template);
    setQuestionsUsed(template.questions);
    setAppState({ view: 'creator_profile_setup' });
  };
  
  const handleResultCodeGenerated = (code: string) => {
    if (!viewedResultCodes[code]) {
      setViewedResultCodes(prev => ({ ...prev, [code]: true }));
    }
  };

  // FIX: This function was incomplete, causing a syntax error. Completed the logic to navigate to the correct next step.
  const handleSaveCreatorProfile = (profile: Profile) => {
    setCreatorProfile(profile);
    if (quizSource === 'home_template') {
      setAppState({ view: 'creator_questionnaire' });
    } else {
      setAppState({ view: 'question_choice' });
    }
  };

  // FIX: Added handler functions to manage UI flow and state changes for different views.
  const handleSavePartnerProfile = (profile: Profile) => {
    setPartnerProfile(profile);
    setAppState({ view: 'partner_questionnaire' });
  };
  
  const handleSelectStandardQuestions = () => {
    const standardTemplate = initialOfficialTemplates.find(t => t.id === 'official-standard');
    if (standardTemplate) {
        setActiveTemplate(standardTemplate);
        setQuestionsUsed(standardTemplate.questions);
        setAppState({ view: 'creator_questionnaire' });
    } else {
        setQuestionsUsed(initialQuestions);
        setActiveTemplate({
            id: 'custom-fallback',
            title: `Standard Quiz`,
            description: 'A comprehensive quiz.',
            creatorName: 'Marathi Bayko',
            questions: initialQuestions,
            isPublic: false,
            isOfficial: false,
            createdAt: new Date().toISOString(),
            status: 'pending',
            imageUrl: '',
            analysisConfig: {
                range0_25: "It seems like there are quite a few differences in your perspectives.",
                range26_50: "You have some common ground.",
                range51_75: "You're on the same wavelength!",
                range76_100: "It's like you can read each other's minds!",
            }
        });
        setAppState({ view: 'creator_questionnaire' });
    }
  };

  const handleSelectCustomQuestions = () => {
    setAppState({ view: 'custom_question_editor' });
  };
  
  const handleFinishCustomQuestions = (questions: Question[]) => {
    setQuestionsUsed(questions);
    if(creatorProfile){
        setActiveTemplate({
            id: 'custom',
            title: `A quiz by ${creatorProfile.name}`,
            description: 'A custom quiz.',
            creatorName: creatorProfile.name,
            questions: questions,
            isPublic: false,
            isOfficial: false,
            createdAt: new Date().toISOString(),
            status: 'pending',
            imageUrl: '',
            analysisConfig: {
                range0_25: "It seems like there are quite a few differences in your perspectives.",
                range26_50: "You have some common ground.",
                range51_75: "You're on the same wavelength!",
                range76_100: "It's like you can read each other's minds!",
            }
        });
    }
    setAppState({ view: 'creator_questionnaire' });
  };

  const handleCompleteCreatorQuestionnaire = (answers: Answers) => {
    setCreatorAnswers(answers);
    setAppState({ view: 'share' });
  };

  const handleCompletePartnerQuestionnaire = (answers: Answers) => {
    setPartnerAnswers(answers);
    if (creatorProfile && partnerProfile && creatorAnswers && questionsUsed && activeTemplate) {
      const finalResultData: ResultData = {
        creatorProfile,
        partnerProfile,
        creatorAnswers,
        partnerAnswers: answers,
        questionsUsed,
        analysisConfig: activeTemplate.analysisConfig
      };
      setResultData(finalResultData);
      setAppState({ view: 'partner_finish', resultData: finalResultData });
    } else {
        goHome();
    }
  };

  const handleViewResults = (data: ResultData) => {
    setResultData(data);
    setAppState({ view: 'results' });
  };
  
  const handleAdminLoginSuccess = () => {
    setIsAdminLoggedIn(true);
    setAppState({ view: 'admin_dashboard' });
  };

  const handleAdminLogout = () => {
    setIsAdminLoggedIn(false);
    goHome();
  };

  const renderCurrentView = () => {
    switch (appState.view) {
      case 'home':
        return <HomeView 
          quizTemplates={[...initialOfficialTemplates, ...communityTemplates]} 
          onStartCreator={handleStartCreator} 
          onStartFromTemplate={handleStartFromTemplate}
          onCodeSubmit={handleCodeSubmit}
          adsEnabled={adSenseConfig.enabled}
          adSenseConfig={adSenseConfig}
          internalAd={internalAds['home']}
        />;
      case 'creator_profile_setup':
        return <ProfileSetupView 
          userType="Creator" 
          onSave={handleSaveCreatorProfile}
          onBack={goHome}
          activeTemplate={activeTemplate}
        />;
      case 'partner_profile_setup':
        return <ProfileSetupView 
          userType="Partner" 
          onSave={handleSavePartnerProfile}
          onBack={goHome}
          activeTemplate={activeTemplate}
        />;
      case 'question_choice':
        return <QuestionChoiceView
          onSelectStandard={handleSelectStandardQuestions}
          onSelectCustom={handleSelectCustomQuestions}
          onBack={() => setAppState({ view: 'creator_profile_setup' })}
        />;
      case 'custom_question_editor':
        return <CustomQuestionEditorView
          onFinish={handleFinishCustomQuestions}
          onBack={() => setAppState({ view: 'question_choice' })}
        />;
      case 'creator_questionnaire':
        return <QuestionnaireView
          questions={questionsUsed}
          onComplete={handleCompleteCreatorQuestionnaire}
          userType="Creator"
          onBack={() => quizSource === 'home_template' ? setAppState({ view: 'creator_profile_setup' }) : setAppState({ view: 'question_choice'})}
          activeTemplate={activeTemplate}
          internalAd={internalAds['questionnaire']}
        />;
      case 'partner_questionnaire':
        return <QuestionnaireView
          questions={questionsUsed}
          onComplete={handleCompletePartnerQuestionnaire}
          userType="Partner"
          onBack={() => setAppState({ view: 'partner_profile_setup' })}
          activeTemplate={activeTemplate}
          internalAd={internalAds['questionnaire']}
        />;
      case 'share':
        return <ShareAndPublishView
          creatorProfile={creatorProfile}
          creatorAnswers={creatorAnswers}
          questionsUsed={questionsUsed}
          setQuizTemplates={setCommunityTemplates}
          onBack={() => setAppState({ view: 'creator_questionnaire' })}
          internalAd={internalAds['share']}
          activeTemplate={activeTemplate}
        />;
      case 'partner_finish':
        return <PartnerFinishView
          resultData={appState.resultData}
          onBackToHome={goHome}
          onViewResults={handleViewResults}
          onResultCodeGenerated={handleResultCodeGenerated}
        />;
      case 'results':
        if (!resultData) { goHome(); return null; }
        return <ResultsView
          resultData={resultData}
          onBackToHome={goHome}
          internalAdConfig={internalAds}
        />;
      case 'admin_login':
        return <AdminLoginView
          onLoginSuccess={handleAdminLoginSuccess}
          onBack={goHome}
        />;
      case 'admin_dashboard':
        if (!isAdminLoggedIn) { goHome(); return null; }
        return <AdminDashboardView
          adSenseConfig={adSenseConfig}
          setAdSenseConfig={setAdSenseConfig}
          internalAds={internalAds}
          setInternalAds={setInternalAds}
          onLogout={handleAdminLogout}
          staticPages={staticPages}
          setStaticPages={setStaticPages}
        />;
      case 'static_page':
        const pageKey = appState.page;
        const pageContent = staticPages[pageKey];
        const titleMap = {
          about: "About Us",
          contact: "Contact Us",
          privacy: "Privacy Policy",
          terms: "Terms of Service"
        };
        return <StaticPageView
          title={titleMap[pageKey]}
          content={<div dangerouslySetInnerHTML={{ __html: pageContent }} />}
          onBack={goHome}
        />;
      default:
        return <HomeView 
          quizTemplates={[...initialOfficialTemplates, ...communityTemplates]} 
          onStartCreator={handleStartCreator} 
          onStartFromTemplate={handleStartFromTemplate}
          onCodeSubmit={handleCodeSubmit}
          adsEnabled={adSenseConfig.enabled}
          adSenseConfig={adSenseConfig}
          internalAd={internalAds['home']}
        />;
    }
  };
  
  // FIX: Added the main JSX return for the component, which was missing. This resolves the React.FC type error.
  return (
    <div className="bg-rose-50 min-h-screen font-sans text-gray-800">
      <div className="container mx-auto p-4 md:p-8 max-w-3xl">
        <header className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-pink-600 cursor-pointer" onClick={goHome}>
            Marathi Bayko
          </h1>
          <p className="text-gray-500">The Ultimate Relationship Quiz</p>
        </header>
        <main>
          {renderCurrentView()}
        </main>
        <footer className="text-center mt-8 text-sm text-gray-400">
          <div className="flex justify-center flex-wrap gap-x-4 gap-y-2">
              <button onClick={() => setAppState({ view: 'static_page', page: 'about' })} className="cursor-pointer hover:text-pink-500">About</button>
              <button onClick={() => setAppState({ view: 'static_page', page: 'contact' })} className="cursor-pointer hover:text-pink-500">Contact</button>
              <button onClick={() => setAppState({ view: 'static_page', page: 'privacy' })} className="cursor-pointer hover:text-pink-500">Privacy Policy</button>
              <button onClick={() => setAppState({ view: 'static_page', page: 'terms' })} className="cursor-pointer hover:text-pink-500">Terms of Service</button>
              <button onClick={() => setAppState({ view: 'admin_login' })} className="cursor-pointer hover:text-pink-500">Admin</button>
          </div>
          <p className="mt-2">&copy; {new Date().getFullYear()} Marathi Bayko. All Rights Reserved.</p>
        </footer>
      </div>
    </div>
  );
};

// FIX: Added the missing default export for the App component.
export default App;