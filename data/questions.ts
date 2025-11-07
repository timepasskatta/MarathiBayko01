import { Question } from '../types.ts';

export const initialQuestions: Question[] = [
  // Personality & Nature
  {
    id: 1,
    category: 'Personality & Nature',
    text: 'How do you usually react when you’re angry?',
    options: ['Become silent and distant', 'Express it openly and talk it out', 'Try to distract myself with other activities', 'Need some time alone to cool down'],
    active: true,
  },
  {
    id: 2,
    category: 'Personality & Nature',
    text: 'Are you more of an introvert or an extrovert?',
    options: ['Strongly introvert', 'Mostly introvert', 'A mix of both (ambivert)', 'Mostly extrovert', 'Strongly extrovert'],
    active: true,
  },
  {
    id: 3,
    category: 'Personality & Nature',
    text: 'How do you handle stress?',
    options: ['Talk to friends/family', 'Exercise or physical activity', 'Indulge in hobbies', 'Prefer to handle it alone'],
    active: true,
  },
  {
    id: 4,
    category: 'Personality & Nature',
    text: 'When making a decision, you primarily rely on:',
    options: ['Logic and facts', 'Gut feeling and intuition', 'Advice from others', 'Past experiences'],
    active: true,
  },
  {
    id: 5,
    category: 'Personality & Nature',
    text: 'Are you a planner or spontaneous?',
    options: ['I plan everything in detail', 'I have a rough plan', 'I mostly go with the flow', 'I am completely spontaneous'],
    active: true,
  },

  // Habits & Lifestyle
  {
    id: 6,
    category: 'Habits & Lifestyle',
    text: 'Are you an early bird or a night owl?',
    options: ['Early bird - Love the mornings', 'Night owl - Most productive at night', 'Flexible, depends on the day', 'Neither, I just want more sleep!'],
    active: true,
  },
  {
    id: 7,
    category: 'Habits & Lifestyle',
    text: 'How often do you like to go out?',
    options: ['Almost every weekend', 'A few times a month', 'Once a month is enough', 'I prefer staying in'],
    active: true,
  },
  {
    id: 8,
    category: 'Habits & Lifestyle',
    text: 'Your ideal vacation is:',
    options: ['A relaxing beach holiday', 'An adventurous trip with hiking/sports', 'Exploring a new city and its culture', 'Staying home and chilling'],
    active: true,
  },
  {
    id: 9,
    category: 'Habits & Lifestyle',
    text: 'How important is cleanliness and organization to you?',
    options: ['Very important, I like things tidy', 'Somewhat important, but a little mess is okay', 'Not very important', 'I thrive in organized chaos'],
    active: true,
  },
  {
    id: 10,
    category: 'Habits & Lifestyle',
    text: 'When it comes to food, you are:',
    options: ['An adventurous eater, love trying new things', 'Happy with comfort food and classics', 'A healthy eater', 'Somewhat picky'],
    active: true,
  },
  
  // Emotions & Love Language
  {
    id: 11,
    category: 'Emotions & Love Language',
    text: 'How do you primarily express love and affection?',
    options: ['Through words of affirmation and compliments', 'By spending quality time together', 'By giving thoughtful gifts', 'Through physical touch (hugs, etc.)', 'Through acts of service (doing things for them)'],
    active: true,
  },
  {
    id: 12,
    category: 'Emotions & Love Language',
    text: 'During a fight, you prefer to:',
    options: ['Talk and resolve it immediately', 'Take a break and talk when calm', 'Send a text to explain my point of view', 'Stay silent for a while'],
    active: true,
  },
  {
    id: 13,
    category: 'Emotions & Love Language',
    text: 'How do you prefer to receive an apology?',
    options: ['A sincere "sorry" is enough', 'I need to see a change in behavior', 'A heartfelt conversation about what happened', 'A gesture like a gift or favor'],
    active: true,
  },
  {
    id: 14,
    category: 'Emotions & Love Language',
    text: 'What makes you feel most appreciated?',
    options: ['When my efforts are verbally acknowledged', 'When someone does something thoughtful for me', 'When I get a surprise gift', 'When someone spends uninterrupted time with me'],
    active: true,
  },
   {
    id: 15,
    category: 'Emotions & Love Language',
    text: 'How open are you with your feelings?',
    options: ['Very open, an open book', 'I share with people I trust', 'I tend to keep my feelings to myself', 'It takes time for me to open up'],
    active: true,
  },

  // Values & Family
  {
    id: 16,
    category: 'Values & Family',
    text: 'How important is your family\'s approval in major life decisions?',
    options: ['Extremely important, their opinion is final', 'Very important, I always consider it', 'Somewhat important, but I make the final call', 'Not important, my life is my own'],
    active: true,
  },
  {
    id: 17,
    category: 'Values & Family',
    text: 'Your ideal family structure for the future is:',
    options: ['Living in a joint family', 'Living in a nuclear family, but close to parents', 'Living in a nuclear family, independently', 'I haven\'t thought about it'],
    active: true,
  },
  {
    id: 18,
    category: 'Values & Family',
    text: 'How do you view money in a relationship?',
    options: ['Finances should be completely shared', 'We should keep our finances separate', 'A mix of both - some shared, some separate', 'It should be managed by whoever is better at it'],
    active: true,
  },
  {
    id: 19,
    category: 'Values & Family',
    text: 'What role does religion or spirituality play in your life?',
    options: ['A very central and guiding role', 'It\'s part of my culture and traditions', 'I am spiritual but not religious', 'It doesn\'t play a significant role'],
    active: true,
  },
  {
    id: 20,
    category: 'Values & Family',
    text: 'How do you prefer to spend holidays and festivals?',
    options: ['With a large family gathering', 'With a small group of close family/friends', 'As a quiet day for myself/with my partner', 'Traveling to a new place'],
    active: true,
  },

  // Future & Goals
  {
    id: 21,
    category: 'Future & Goals',
    text: 'Where do you see yourself in 5 years?',
    options: ['Focused on career growth', 'Settled down with family', 'Traveling the world', 'A balance of personal and professional life'],
    active: true,
  },
  {
    id: 22,
    category: 'Future & Goals',
    text: 'What is your current top priority in life?',
    options: ['Career', 'Relationship / Love', 'Family', 'Personal Growth & Health'],
    active: true,
  },
  {
    id: 23,
    category: 'Future & Goals',
    text: 'Are you interested in having children in the future?',
    options: ['Yes, definitely', 'Maybe, I\'m open to it', 'No, I prefer not to have children', 'I\'m not sure yet'],
    active: true,
  },
  {
    id: 24,
    category: 'Future & Goals',
    text: 'How do you feel about moving to a different city for a great opportunity?',
    options: ['Absolutely, I\'d love the adventure', 'I would consider it if my partner agrees', 'I would prefer to stay in my current city', 'Only if it\'s absolutely necessary'],
    active: true,
  },
   {
    id: 25,
    category: 'Future & Goals',
    text: 'What does "success" mean to you?',
    options: ['Financial wealth and stability', 'A fulfilling career and recognition', 'Strong relationships and a happy family', 'Freedom to live life on my own terms'],
    active: true,
  },
];
