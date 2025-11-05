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
  | { view: 'question_choice' }
  | { view: 'custom_question_editor' }
  | { view: 'creator_questionnaire' }
  | { view: 'share' }
  | { view: 'partner_profile_setup' }
  | { view: 'partner_questionnaire' }
  | { view: 'partner_finish'; resultData: ResultData }
  | { view: 'results' }
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
}

export interface SiteImagesConfig {
  createQuiz: string;
  joinQuiz: string;
}
