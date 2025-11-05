
export interface Profile {
  name: string;
  gender: 'Male' | 'Female' | 'Other';
  age: number;
  relationshipType: 'Wife' | 'Husband' | 'Girlfriend' | 'Boyfriend' | 'Crush' | 'Friend' | 'Fiance';
  bio: string;
  favMarathiWord: string;
}

export interface Question {
  id: number | string;
  category: string;
  text: string;
  options: string[];
  active: boolean;
}

export type Answers = Record<Question['id'], string>;

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
    imageUrl?: string;
}

export interface AdSenseConfig {
    enabled: boolean;
    clientId: string;
    adSlotId: string;
}

export interface InternalAd {
    enabled: boolean;
    imageUrl: string;
    redirectUrl: string;
}

export type AppView = 
  | 'home'
  | 'creator_profile_setup'
  | 'question_choice'
  | 'custom_question_editor'
  | 'creator_questionnaire'
  | 'share'
  | 'partner_profile_setup'
  | 'partner_questionnaire'
  | 'partner_finish'
  | 'results'
  | 'admin_login'
  | 'admin_dashboard';

export interface AppState {
    view: AppView;
}
