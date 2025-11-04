import React, { useState, useCallback } from 'react';
import { initialQuestions } from './data/questions';
import { useLocalStorage } from './hooks/useLocalStorage';
import { Question, Profile, Answers, QuizTemplate, SessionData, PageContent, View } from './types';

// Views
import HomeView from './views/HomeView';
import ProfileSetupView from './views/ProfileSetupView';
import QuestionChoiceView from './views/QuestionChoiceView';
import CustomQuestionEditorView from './views/CustomQuestionEditorView';
import QuestionnaireView from './views/QuestionnaireView';
import ShareAndPublishView from './views/ShareAndPublishView';
import ResultsView from './views/ResultsView';
import AdminLoginView from './views/AdminLoginView';
import AdminDashboardView from './views/AdminDashboardView';
import StaticPageView from './views/StaticPageView';

const initialPageContent: PageContent = {
  aboutUs: 'Welcome to Marathi Bayko! Edit this content in the admin panel.',
  contactUs: 'You can reach us at... Edit this content in the admin panel.',
  privacyPolicy: 'Your privacy is important to us... Edit this content in the admin panel.',
  termsAndConditions: 'By using this site, you agree to... Edit this content in the admin panel.',
};

const App: React.FC = () => {
  const [view, setView] = useState<View>('home');
  
  const [quizTemplates, setQuizTemplates] = useLocalStorage<QuizTemplate[]>('quiz-templates', []);
  const [pageContent, setPageContent] = useLocalStorage<PageContent>('site-pages', initialPageContent);
  const [adsEnabled, setAdsEnabled] = useLocalStorage<boolean>('ads-enabled', true);

  const [questionsToUse, setQuestionsToUse] = useState<Question[]>([]);
  
  const [creatorProfile, setCreatorProfile] = useState<Profile | null>(null);
  const [partnerProfile, setPartnerProfile] = useState<Profile | null>(null);
  
  const [creatorAnswers, setCreatorAnswers] = useState<Answers>({});
  const [partnerAnswers, setPartnerAnswers] = useState<Answers>({});

  const [currentSessionData, setCurrentSessionData] = useState<SessionData | null>(null);

  const resetState = useCallback(() => {
    setView('home');
    setQuestionsToUse([]);
    setCreatorProfile(null);
    setPartnerProfile(null);
    setCreatorAnswers({});
    setPartnerAnswers({});
    setCurrentSessionData(null);
  }, []);

  const handleStartCreator = () => setView('creatorProfileSetup');
  
  const handleStartFromTemplate = (template: QuizTemplate) => {
    setQuestionsToUse(template.questions);
    setView('creatorProfileSetup');
  };

  const handleJoinQuiz = (session: SessionData) => {
    setCurrentSessionData(session);
    setCreatorProfile(session.creatorProfile);
    setCreatorAnswers(session.creatorAnswers);
    setQuestionsToUse(session.questionsUsed);
    setView('partnerProfileSetup');
  };

  const handleSaveCreatorProfile = (profile: Profile) => {
    setCreatorProfile(profile);
    if(questionsToUse.length > 0) {
        setView('creatorQuestionnaire');
    } else {
        setView('questionChoice');
    }
  };

  const handleSelectStandardQuestions = () => {
    setQuestionsToUse(initialQuestions.filter(q => q.active));
    setView('creatorQuestionnaire');
  };

  const handleSelectCustomQuestions = () => {
    setView('customQuestionEditor');
  };

  const handleFinishCustomQuestions = (questions: Question[]) => {
    setQuestionsToUse(questions);
    setView('creatorQuestionnaire');
  }

  const handleFinishCreatorQuestionnaire = (answers: Answers) => {
    setCreatorAnswers(answers);
    setView('share');
  };

  const handleSessionCreated = (session: SessionData) => {
      setCurrentSessionData(session);
  };

  const handleSavePartnerProfile = (profile: Profile) => {
    setPartnerProfile(profile);
    setView('partnerQuestionnaire');
  };
  
  const handleFinishPartnerQuestionnaire = (answers: Answers) => {
    setPartnerAnswers(answers);
    setView('results');
  };
  
  const handleNavigateToPage = (page: View) => {
    setView(page);
  };

  const renderView = () => {
    switch (view) {
      case 'creatorProfileSetup':
        return <ProfileSetupView userType="Creator" onSave={handleSaveCreatorProfile} onBack={resetState} />;
      case 'questionChoice':
        return <QuestionChoiceView onSelectStandard={handleSelectStandardQuestions} onSelectCustom={handleSelectCustomQuestions} onBack={() => setView('creatorProfileSetup')} />;
      case 'customQuestionEditor':
        return <CustomQuestionEditorView onFinish={handleFinishCustomQuestions} onBack={() => setView('questionChoice')} />;
      case 'creatorQuestionnaire':
        return <QuestionnaireView questions={questionsToUse} onFinish={handleFinishCreatorQuestionnaire} onBack={() => setView(questionsToUse.some(q=>q.category === 'Custom') ? 'customQuestionEditor' : 'questionChoice')} />;
      case 'share':
        if (!creatorProfile || !creatorAnswers) return <p>Error: Missing data for sharing.</p>;
        return <ShareAndPublishView creatorProfile={creatorProfile} creatorAnswers={creatorAnswers} questionsUsed={questionsToUse} onSessionCreated={handleSessionCreated} setQuizTemplates={setQuizTemplates} />;
      case 'partnerProfileSetup':
        return <ProfileSetupView userType="Partner" onSave={handleSavePartnerProfile} onBack={resetState} />;
      case 'partnerQuestionnaire':
        return <QuestionnaireView questions={questionsToUse} onFinish={handleFinishPartnerQuestionnaire} />;
      case 'results':
        if (!creatorProfile || !partnerProfile || !creatorAnswers || !partnerAnswers) return <p>Loading results...</p>;
        return <ResultsView creatorProfile={creatorProfile} partnerProfile={partnerProfile} creatorAnswers={creatorAnswers} partnerAnswers={partnerAnswers} questionsUsed={questionsToUse} onRestart={resetState} />;
      case 'adminLogin':
        return <AdminLoginView onLoginSuccess={() => setView('adminDashboard')} onBack={resetState} />
      case 'adminDashboard':
        return <AdminDashboardView quizTemplates={quizTemplates} setQuizTemplates={setQuizTemplates} onLogout={resetState} pageContent={pageContent} setPageContent={setPageContent} adsEnabled={adsEnabled} setAdsEnabled={setAdsEnabled} />;
      case 'aboutUs':
        return <StaticPageView title="About Us" content={pageContent.aboutUs} onBack={resetState} />
      case 'contactUs':
        return <StaticPageView title="Contact Us" content={pageContent.contactUs} onBack={resetState} />
      case 'privacyPolicy':
        return <StaticPageView title="Privacy Policy" content={pageContent.privacyPolicy} onBack={resetState} />
      case 'termsAndConditions':
        return <StaticPageView title="Terms & Conditions" content={pageContent.termsAndConditions} onBack={resetState} />
      case 'home':
      default:
        return <HomeView quizTemplates={quizTemplates} onStartCreator={handleStartCreator} onStartFromTemplate={handleStartFromTemplate} onJoinQuiz={handleJoinQuiz} onAdminLogin={() => setView('adminLogin')} adsEnabled={adsEnabled} />;
    }
  };

  return (
    <div className="bg-rose-50 min-h-screen font-sans text-gray-800 flex flex-col">
      <header className="py-4">
        <h1 className="text-3xl font-bold text-center text-pink-600 cursor-pointer" onClick={resetState}>
          Marathi Bayko
        </h1>
        <p className="text-center text-gray-500">How well do you know your partner?</p>
      </header>
      <main className="max-w-2xl mx-auto p-4 flex-grow w-full">
        {renderView()}
      </main>
      <footer className="py-6 text-center text-gray-500 text-sm">
        <div className="flex justify-center gap-4 mb-4">
            <button onClick={() => handleNavigateToPage('aboutUs')} className="hover:text-pink-600 hover:underline">About Us</button>
            <button onClick={() => handleNavigateToPage('contactUs')} className="hover:text-pink-600 hover:underline">Contact Us</button>
            <button onClick={() => handleNavigateToPage('privacyPolicy')} className="hover:text-pink-600 hover:underline">Privacy Policy</button>
            <button onClick={() => handleNavigateToPage('termsAndConditions')} className="hover:text-pink-600 hover:underline">Terms</button>
        </div>
        <p>&copy; {new Date().getFullYear()} MarathiBayko.com - A fun project for couples.</p>
      </footer>
    </div>
  );
};

export default App;