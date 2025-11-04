
import React, { useState, useCallback, useEffect } from 'react';
import { initialQuestions } from './data/questions';
import { officialTemplates } from './data/officialTemplates'; // Import new templates
import { useLocalStorage } from './hooks/useLocalStorage';
import { Question, Profile, Answers, QuizTemplate, SessionData, PageContent, View, AdSenseConfig, ResultData } from './types';

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
  aboutUs: `
## About Marathi Bayko

Welcome to **Marathi Bayko – Real Relationship Partner Checker**!

We believe that understanding your partner is the key to a strong and happy relationship. Our fun and engaging quizzes are designed to help you discover more about each other in a lighthearted way. Whether you're a new couple, best friends, or have been married for years, our app provides a unique way to test your bond and learn something new.

Our mission is to bring couples closer together through shared experiences and laughter. Create your own custom quiz or try one of our popular templates to see how well you really know your partner!
  `,
  contactUs: `
## Contact Us

We'd love to hear from you! If you have any questions, feedback, or suggestions, please don't hesitate to reach out.

**Email:** contact@marathibayko.com

We are a small team dedicated to improving this platform. Your feedback is valuable to us and helps us make the app better for everyone. We aim to respond to all inquiries within 48 hours.
  `,
  privacyPolicy: `
## Privacy Policy

**Last updated:** July 22, 2024

Your privacy is important to us. This Privacy Policy explains how we collect, use, and share information when you use our website.

**1. Information We Collect**
- **Quiz Data:** All quiz questions, answers, and profile information you provide are stored locally in your browser's localStorage. We do not have a server, and this data is not transmitted to us or any third party.
- **Published Quizzes:** If you choose to publish a quiz, the quiz title, description, questions, and your creator name will be stored in localStorage and visible to other users. Your personal answers are NOT published.
- **Usage Data:** We do not use any analytics tools to track your personal usage.

**2. How We Use Your Information**
- The data is used solely to operate the core functionality of the app, such as generating invitation codes and calculating results.

**3. Third-Party Services**
- **Google AdSense:** We use Google AdSense to display ads on our site. Google may use cookies to serve ads based on a user's prior visits to our website or other websites. You can opt out of personalized advertising by visiting Google's Ad Settings.

**4. Data Security**
- Since all sensitive data is stored on your device, you have control over it. Clearing your browser's cache and storage will remove all your data from our application.

**5. Changes to This Policy**
- We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.
  `,
  termsAndConditions: `
## Terms and Conditions

**Last updated:** July 22, 2024

Please read these terms and conditions carefully before using Our Service.

**1. Acknowledgment**
By accessing or using the Service, you agree to be bound by these Terms and Conditions. If you disagree with any part of the terms, then you may not access the Service.

**2. User-Generated Content**
- You are solely responsible for the content you create, including custom quizzes. You agree not to create content that is unlawful, offensive, or otherwise objectionable.
- By publishing a quiz, you grant us a non-exclusive, worldwide, royalty-free license to display that quiz content to other users of the Service.

**3. Prohibited Uses**
You agree not to use the Service for any unlawful purpose or to solicit others to perform or participate in any unlawful acts.

**4. Disclaimer of Warranties**
The Service is provided on an "AS IS" and "AS AVAILABLE" basis. We do not warrant that the service will be uninterrupted, secure, or error-free.

**5. Limitation of Liability**
In no event shall Marathi Bayko, nor its directors or employees, be liable for any indirect, incidental, special, consequential or punitive damages resulting from your access to or use of, or inability to access or use, the Service.

**6. Governing Law**
These Terms shall be governed and construed in accordance with the laws of India, without regard to its conflict of law provisions.
  `,
};

const initialAdSenseConfig: AdSenseConfig = {
    clientId: 'ca-pub-YOUR_CLIENT_ID',
    adSlotId: 'YOUR_AD_SLOT_ID',
};

const App: React.FC = () => {
  const [view, setView] = useState<View>('home');
  
  const [quizTemplates, setQuizTemplates] = useLocalStorage<QuizTemplate[]>('quiz-templates', []);
  const [pageContent, setPageContent] = useLocalStorage<PageContent>('site-pages', initialPageContent);
  const [adsEnabled, setAdsEnabled] = useLocalStorage<boolean>('ads-enabled', true);
  const [adSenseConfig, setAdSenseConfig] = useLocalStorage<AdSenseConfig>('adsense-config', initialAdSenseConfig);

  const [questionsToUse, setQuestionsToUse] = useState<Question[]>([]);
  
  const [creatorProfile, setCreatorProfile] = useState<Profile | null>(null);
  const [partnerProfile, setPartnerProfile] = useState<Profile | null>(null);
  
  const [creatorAnswers, setCreatorAnswers] = useState<Answers>({});
  const [partnerAnswers, setPartnerAnswers] = useState<Answers>({});

  const [currentSessionData, setCurrentSessionData] = useState<SessionData | null>(null);
  
  useEffect(() => {
    // On first load, check and add any missing official templates.
    setQuizTemplates(prevTemplates => {
      const existingTemplateIds = new Set(prevTemplates.map(t => t.id));
      const templatesToAdd: QuizTemplate[] = [];

      // Combine standard quiz and new official templates into one list
      const allOfficialTemplates = [
        {
          id: 'standard-quiz-001',
          title: 'Standard Compatibility Quiz',
          description: 'The official set of 25 questions to test your bond.',
          creatorName: 'Marathi Bayko Team',
          questions: initialQuestions,
          isPublic: true,
          isOfficial: true,
          createdAt: new Date().toISOString(),
          status: 'approved' as const,
        },
        ...officialTemplates
      ];

      // Check for and add any missing official templates
      allOfficialTemplates.forEach(newTemplate => {
        if (!existingTemplateIds.has(newTemplate.id)) {
          templatesToAdd.push(newTemplate);
        }
      });

      // If there are new templates to add, update the state
      if (templatesToAdd.length > 0) {
        return [...prevTemplates, ...templatesToAdd];
      }

      // Otherwise, return the previous state to avoid unnecessary re-renders
      return prevTemplates;
    });
  }, []); // Runs only once on app startup


  useEffect(() => {
    // Dynamically inject the AdSense script if it's enabled and a valid client ID is provided
    if (adsEnabled && adSenseConfig.clientId && !adSenseConfig.clientId.includes('YOUR_CLIENT_ID')) {
      const scriptId = 'adsense-script';
      if (document.getElementById(scriptId)) return; // Avoid re-injecting

      const script = document.createElement('script');
      script.id = scriptId;
      script.async = true;
      script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adSenseConfig.clientId}`;
      script.crossOrigin = 'anonymous';
      document.head.appendChild(script);
    }
  }, [adsEnabled, adSenseConfig.clientId]);


  const resetState = useCallback(() => {
    setView('home');
    setQuestionsToUse([]);
    setCreatorProfile(null);
    setPartnerProfile(null);
    setCreatorAnswers({});
    setPartnerAnswers({});
    setCurrentSessionData(null);
  }, []);

  useEffect(() => {
    // This effect acts as a guard to prevent the app from being in an invalid state.
    // If a user refreshes on a page that requires previous steps, it safely redirects them home.
    const requiresCreatorProfile: View[] = ['questionChoice', 'customQuestionEditor', 'creatorQuestionnaire', 'share'];
    const requiresPartnerProfile: View[] = ['partnerQuestionnaire', 'results'];
    
    if (requiresCreatorProfile.includes(view) && !creatorProfile) {
      console.warn(`State invalid for view "${view}". Creator profile missing. Resetting.`);
      resetState();
      return;
    }
    
    if (requiresPartnerProfile.includes(view)) {
        if (!creatorProfile || !creatorAnswers) {
            console.warn(`State invalid for view "${view}". Creator data missing. Resetting.`);
            resetState();
            return;
        }
        if (view === 'results' && (!partnerProfile || !partnerAnswers)) {
            console.warn(`State invalid for view "${view}". Partner data missing. Resetting.`);
            resetState();
            return;
        }
    }
  }, [view, creatorProfile, partnerProfile, creatorAnswers, partnerAnswers, resetState]);


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
    const standardQuiz = quizTemplates.find(t => t.id === 'standard-quiz-001');
    if (standardQuiz) {
        setQuestionsToUse(standardQuiz.questions);
        setView('creatorQuestionnaire');
    } else {
        // Fallback in case it hasn't been created yet
        setQuestionsToUse(initialQuestions.filter(q => q.active));
        setView('creatorQuestionnaire');
    }
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

  const handleSessionCreated = useCallback((session: SessionData) => {
      setCurrentSessionData(session);
  }, []);

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
  
  const handleViewResults = (data: ResultData) => {
    setCreatorProfile(data.creatorProfile);
    setPartnerProfile(data.partnerProfile);
    setCreatorAnswers(data.creatorAnswers);
    setPartnerAnswers(data.partnerAnswers);
    setQuestionsToUse(data.questionsUsed);
    setView('results');
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
        if (!creatorProfile || !creatorAnswers) return <p>Loading...</p>;
        // Fix: Corrected typo from 'questionsUsed' to 'questionsToUse'.
        return <ShareAndPublishView creatorProfile={creatorProfile} creatorAnswers={creatorAnswers} questionsUsed={questionsToUse} onSessionCreated={handleSessionCreated} setQuizTemplates={setQuizTemplates} onBack={() => setView('creatorQuestionnaire')} />;
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
        return <AdminDashboardView quizTemplates={quizTemplates} setQuizTemplates={setQuizTemplates} onLogout={resetState} pageContent={pageContent} setPageContent={setPageContent} adsEnabled={adsEnabled} setAdsEnabled={setAdsEnabled} adSenseConfig={adSenseConfig} setAdSenseConfig={setAdSenseConfig} />;
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
        return <HomeView quizTemplates={quizTemplates} onStartCreator={handleStartCreator} onStartFromTemplate={handleStartFromTemplate} onJoinQuiz={handleJoinQuiz} onAdminLogin={() => setView('adminLogin')} adsEnabled={adsEnabled} adSenseConfig={adSenseConfig} onViewResults={handleViewResults} />;
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
        <div className="flex justify-center items-center gap-4 mb-4">
            <button onClick={resetState} className="hover:text-pink-600 hover:underline font-semibold">Home</button>
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
