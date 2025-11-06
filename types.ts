export interface Question {
  id: number;
  category: string;
  text: string;
  options: string[];
  active: boolean;
}

export interface Profile {
  name: string;
  age: number;
  gender: string;
  relationshipType: string;
  goodThingAboutPartner: string;
  partnerImprovement: string;
}

export type Answers = {
  [questionId: number]: string;
};

export interface QuizTemplate {
    id: string;
    title: string;
    description: string;
    creatorName: string;
    questions: Question[];
    isPublic: boolean;
    isOfficial: boolean;
    createdAt: string;
    status: 'pending' | 'approved' | 'rejected';
    imageUrl: string;
    analysisConfig: {
      range0_25: string;
      range26_50: string;
      range51_75: string;
      range76_100: string;
    };
}

export interface SessionData {
  creatorProfile: Profile;
  creatorAnswers: Answers;
  questionsUsed: Question[];
  quizTitle: string;
  analysisConfig: QuizTemplate['analysisConfig'];
}

export interface ResultData extends SessionData {
  partnerProfile: Profile;
  partnerAnswers: Answers;
  isSecondAttempt?: boolean;
}

export type AppState =
  | { view: 'home' }
  | { view: 'creator_profile_setup' }
  | { view: 'creator_questionnaire', creatorProfile: Profile }
  | { view: 'share', sessionData: SessionData }
  | { view: 'partner_profile_setup', sessionData: SessionData }
  | { view: 'partner_questionnaire', sessionData: SessionData, partnerProfile: Profile }
  | { view: 'results', resultData: ResultData }
  | { view: 'admin_login' }
  | { view: 'admin_dashboard' }
  | { view: 'static_page'; page: 'about' | 'contact' | 'privacy' | 'terms' };

export interface AdSenseConfig {
    enabled: boolean;
    clientId: string;
    adSlotId: string;
    verificationCode: string;
}

export interface InternalAd {
    enabled: boolean;
    imageUrl: string;
    redirectUrl: string;
    title: string;
    aspectRatio?: '16:9' | '1:1';
    description?: string;
}

export interface SiteImagesConfig {
  createQuiz: string;
}