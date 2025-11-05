
import React, { useState } from 'react';
import { useLocalStorage } from './hooks/useLocalStorage';
import { initialQuestions } from './data/questions';
import { officialTemplates as initialOfficialTemplates } from './data/officialTemplates';
import { Question, Profile, Answers, AppState, SessionData, QuizTemplate, ResultData, AdSenseConfig, InternalAd } from './types';

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

const App: React.FC = () => {
  // State Management
  const [appState, setAppState] = useState<AppState>({ view: 'home' });
  const [questionsToUse, setQuestionsToUse] = useState<Question[]>([]);
  const [creatorProfile, setCreatorProfile] = useState<Profile | null>(null);
  const [creatorAnswers, setCreatorAnswers] = useState<Answers>({});
  const [sessionData, setSessionData] = useState<SessionData | null>(null);
  const [resultData, setResultData] = useState<ResultData | null>(null);
  
  // Persisted State
  const [quizTemplates, setQuizTemplates] = useLocalStorage<QuizTemplate[]>('quiz-templates', initialOfficialTemplates);
  const [adSenseConfig, setAdSenseConfig] = useLocalStorage<AdSenseConfig>('adsense-config', { enabled: false, clientId: '', adSlotId: '' });
  const [internalAd, setInternalAd] = useLocalStorage<InternalAd>('internal-ad-config', { enabled: false, imageUrl: '', redirectUrl: ''});


  // --- Navigation and State Handlers ---
  const goToHome = () => setAppState({ view: 'home' });
  
  // Creator Flow
  const handleStartCreator = () => setAppState({ view: 'creator_profile_setup' });
  const handleCreatorProfileSave = (profile: Profile) => {
    setCreatorProfile(profile);
    setAppState({ view: 'question_choice' });
  };
  const handleSelectStandardQuestions = () => {
    setQuestionsToUse(initialQuestions);
    setAppState({ view: 'creator_questionnaire' });
  };
   const handleSelectCustomQuestions = () => setAppState({ view: 'custom_question_editor' });
   const handleCustomQuestionsFinish = (questions: Question[]) => {
    setQuestionsToUse(questions);
    setAppState({ view: 'creator_questionnaire' });
   };
  const handleCreatorQuestionnaireComplete = (answers: Answers) => {
    setCreatorAnswers(answers);
    setAppState({ view: 'share' });
  };
  const handleSessionCreated = (session: SessionData) => {
    // The session code is now generated inside ShareAndPublishView
    // This handler might be used for other logic if needed in the future
  };
  
  // Partner Flow
  const handleJoinQuiz = (session: SessionData) => {
    setSessionData(session);
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
      setResultData({ ...resultData, partnerAnswers: answers });
      setAppState({ view: 'partner_finish' });
    }
  };

  // Template Flow
  const handleStartFromTemplate = (template: QuizTemplate) => {
    setQuestionsToUse(template.questions);
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
  const handleAdminLogout = () => goToHome();

  // --- View Rendering ---
  const renderContent = () => {
    switch (appState.view) {
      case 'home':
        return <HomeView quizTemplates={quizTemplates} onStartCreator={handleStartCreator} onStartFromTemplate={handleStartFromTemplate} onJoinQuiz={handleJoinQuiz} onAdminLogin={handleAdminLogin} onViewResults={handleViewResults} adsEnabled={adSenseConfig.enabled} adSenseConfig={adSenseConfig} internalAd={internalAd}/>;
      
      // Creator Flow
      case 'creator_profile_setup':
        return <ProfileSetupView userType="Creator" onSave={handleCreatorProfileSave} onBack={goToHome} />;
      case 'question_choice':
        return <QuestionChoiceView onSelectStandard={handleSelectStandardQuestions} onSelectCustom={handleSelectCustomQuestions} onBack={() => setAppState({ view: 'creator_profile_setup' })} />;
      case 'custom_question_editor':
        return <CustomQuestionEditorView onFinish={handleCustomQuestionsFinish} onBack={() => setAppState({ view: 'question_choice' })} />;
      case 'creator_questionnaire':
        return <QuestionnaireView userType="Creator" questions={questionsToUse} onComplete={handleCreatorQuestionnaireComplete} onBack={() => setAppState({ view: 'question_choice' })}/>;
      case 'share':
        if (!creatorProfile) return <p>Error: Creator profile not found.</p>;
        return <ShareAndPublishView creatorProfile={creatorProfile} creatorAnswers={creatorAnswers} questionsUsed={questionsToUse} onSessionCreated={handleSessionCreated} setQuizTemplates={setQuizTemplates} onBack={() => setAppState({ view: 'creator_questionnaire'})} internalAd={internalAd}/>;

      // Partner Flow
      case 'partner_profile_setup':
        return <ProfileSetupView userType="Partner" onSave={handlePartnerProfileSave} onBack={goToHome} />;
      case 'partner_questionnaire':
        if (!sessionData) return <p>Error: Session data not found.</p>;
        return <QuestionnaireView userType="Partner" questions={sessionData.questionsUsed} onComplete={handlePartnerQuestionnaireComplete} onBack={() => setAppState({ view: 'partner_profile_setup'})}/>;
      case 'partner_finish':
        if (!resultData) return <p>Error: Result data not found.</p>;
        return <PartnerFinishView resultData={resultData} onBackToHome={goToHome} />;

      // Results
      case 'results':
        if (!resultData) return <p>Error: Result data not found.</p>;
        return <ResultsView resultData={resultData} onBackToHome={goToHome} />;

      // Admin
      case 'admin_login':
        return <AdminLoginView onLoginSuccess={handleLoginSuccess} onBack={goToHome} />;
      case 'admin_dashboard':
        return <AdminDashboardView templates={quizTemplates} setTemplates={setQuizTemplates} adSenseConfig={adSenseConfig} setAdSenseConfig={setAdSenseConfig} internalAd={internalAd} setInternalAd={setInternalAd} onLogout={handleAdminLogout} />;

      default:
        return <div>Unknown state</div>;
    }
  };

  return (
    <div className="bg-rose-50 min-h-screen font-sans text-gray-800">
        <div className="container mx-auto p-4 md:p-8 max-w-2xl">
            <header className="text-center mb-8">
                <h1 className="text-4xl md:text-5xl font-bold text-pink-600 tracking-tight">Couple Compatibility</h1>
                <p className="text-gray-500 mt-2">Discover how well you and your partner know each other.</p>
            </header>
            <main>
                {renderContent()}
            </main>
             <footer className="text-center mt-8 text-sm text-gray-400">
                <p>&copy; {new Date().getFullYear()} Couple Compatibility Quiz. All Rights Reserved.</p>
            </footer>
        </div>
    </div>
  );
};

export default App;
