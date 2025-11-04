export interface Question {
  id: number;
  category: string;
  text: string;
  options: string[];
  active: boolean;
}

export interface Answers {
  [questionId: number]: string;
}

export interface Profile {
  name: string;
  gender: 'Male' | 'Female' | 'Other';
  age: number;
  relationshipType: 'Wife' | 'Husband' | 'Girlfriend' | 'Boyfriend' | 'Crush' | 'Friend' | 'Fiance';
  bio: string;
  favMarathiWord: string;
}

export interface QuizTemplate {
  id: string;
  title: string;
  description: string;
  creatorName: string;
  questions: Question[];
  isPublic: boolean;
  isOfficial: boolean;
  createdAt: string;
}

export interface SessionData {
  creatorProfile: Profile;
  creatorAnswers: Answers;
  questionsUsed: Question[];
}

export interface ResultData {
  creatorProfile: Profile;
  partnerProfile: Profile;
  creatorAnswers: Answers;
  partnerAnswers: Answers;
  questionsUsed: Question[];
}

export type View = 
  | 'home' 
  | 'creatorProfileSetup' 
  | 'partnerProfileSetup' 
  | 'questionChoice' 
  | 'customQuestionEditor'
  | 'creatorQuestionnaire' 
  | 'partnerQuestionnaire'
  | 'share' 
  | 'results'
  | 'adminLogin'
  | 'adminDashboard'
  | 'aboutUs'
  | 'contactUs'
  | 'privacyPolicy'
  | 'termsAndConditions';

export interface PageContent {
    aboutUs: string;
    contactUs: string;
    privacyPolicy: string;
    termsAndConditions: string;
}

export interface AdSenseConfig {
  clientId: string;
  adSlotId: string;
}