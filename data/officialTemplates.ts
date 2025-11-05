
import { QuizTemplate } from '../types';
import { initialQuestions } from './questions';

export const officialTemplates: QuizTemplate[] = [
  {
    id: 'official-1',
    title: 'The Ultimate Compatibility Test',
    description: 'A comprehensive quiz to explore every facet of your relationship, from lifestyle choices to deep personal values.',
    creatorName: 'CoupleConnect',
    questions: initialQuestions,
    isPublic: true,
    isOfficial: true,
    createdAt: new Date().toISOString(),
    status: 'approved',
    imageUrl: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=1932&auto=format&fit=crop',
  },
  {
    id: 'official-2',
    title: 'Quick & Fun Partner Check-in',
    description: 'A lighthearted and fun quiz to see how well you know your partner\'s current habits and preferences.',
    creatorName: 'CoupleConnect',
    questions: initialQuestions.filter(q => q.category === 'Habits & Lifestyle' || q.category === 'Personality & Nature').slice(0, 10),
    isPublic: true,
    isOfficial: true,
    createdAt: new Date().toISOString(),
    status: 'approved',
    imageUrl: 'https://images.unsplash.com/photo-1508026347535-642197f254f1?q=80&w=1770&auto=format&fit=crop',
  },
];
