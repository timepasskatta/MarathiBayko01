import { QuizTemplate } from '@/types';
import { initialQuestions } from './questions';

const defaultAnalysis = {
    range0_25: "It seems like there are quite a few differences in your perspectives. This is a great opportunity to start some interesting conversations and learn more about each other's worlds!",
    range26_50: "You two have some common ground, but also areas where you see things differently. Exploring these differences can be a fun adventure and a way to grow even closer.",
    range51_75: "You're on the same wavelength most of the time! You have a solid foundation of understanding. The few differences you have can add a little spice to your relationship.",
    range76_100: "Wow, it's like you can read each other's minds! Your connection is incredibly strong. You share a deep understanding that is truly special.",
};

export const officialTemplates: QuizTemplate[] = [
  {
    "id": "official-standard",
    "title": "The Standard Compatibility Test",
    "description": "A comprehensive quiz to explore every facet of your relationship, from lifestyle choices to deep personal values.",
    "creatorName": "Marathi Bayko",
    "questions": [
      {
        "id": 1,
        "category": "Personality & Nature",
        "text": "How do you usually react when you’re angry?",
        "options": [
          "Become silent and distant",
          "Express it openly and talk it out",
          "Try to distract myself with other activities",
          "Need some time alone to cool down"
        ],
        "active": true
      },
      {
        "id": 2,
        "category": "Personality & Nature",
        "text": "Are you more of an introvert or an extrovert?",
        "options": [
          "Strongly introvert",
          "Mostly introvert",
          "A mix of both (ambivert)",
          "Mostly extrovert",
          "Strongly extrovert"
        ],
        "active": true
      },
      {
        "id": 3,
        "category": "Personality & Nature",
        "text": "How do you handle stress?",
        "options": [
          "Talk to friends/family",
          "Exercise or physical activity",
          "Indulge in hobbies",
          "Prefer to handle it alone"
        ],
        "active": true
      },
      {
        "id": 4,
        "category": "Personality & Nature",
        "text": "When making a decision, you primarily rely on:",
        "options": [
          "Logic and facts",
          "Gut feeling and intuition",
          "Advice from others",
          "Past experiences"
        ],
        "active": true
      },
      {
        "id": 5,
        "category": "Personality & Nature",
        "text": "Are you a planner or spontaneous?",
        "options": [
          "I plan everything in detail",
          "I have a rough plan",
          "I mostly go with the flow",
          "I am completely spontaneous"
        ],
        "active": true
      },
      {
        "id": 6,
        "category": "Habits & Lifestyle",
        "text": "Are you an early bird or a night owl?",
        "options": [
          "Early bird - Love the mornings",
          "Night owl - Most productive at night",
          "Flexible, depends on the day",
          "Neither, I just want more sleep!"
        ],
        "active": true
      },
      {
        "id": 7,
        "category": "Habits & Lifestyle",
        "text": "How often do you like to go out?",
        "options": [
          "Almost every weekend",
          "A few times a month",
          "Once a month is enough",
          "I prefer staying in"
        ],
        "active": true
      },
      {
        "id": 8,
        "category": "Habits & Lifestyle",
        "text": "Your ideal vacation is:",
        "options": [
          "A relaxing beach holiday",
          "An adventurous trip with hiking/sports",
          "Exploring a new city and its culture",
          "Staying home and chilling"
        ],
        "active": true
      },
      {
        "id": 9,
        "category": "Habits & Lifestyle",
        "text": "How important is cleanliness and organization to you?",
        "options": [
          "Very important, I like things tidy",
          "Somewhat important, but a little mess is okay",
          "Not very important",
          "I thrive in organized chaos"
        ],
        "active": true
      },
      {
        "id": 10,
        "category": "Habits & Lifestyle",
        "text": "When it comes to food, you are:",
        "options": [
          "An adventurous eater, love trying new things",
          "Happy with comfort food and classics",
          "A healthy eater",
          "Somewhat picky"
        ],
        "active": true
      },
      {
        "id": 11,
        "category": "Emotions & Love Language",
        "text": "How do you primarily express love and affection?",
        "options": [
          "Through words of affirmation and compliments",
          "By spending quality time together",
          "By giving thoughtful gifts",
          "Through physical touch (hugs, etc.)",
          "Through acts of service (doing things for them)"
        ],
        "active": true
      },
      {
        "id": 12,
        "category": "Emotions & Love Language",
        "text": "During a fight, you prefer to:",
        "options": [
          "Talk and resolve it immediately",
          "Take a break and talk when calm",
          "Send a text to explain my point of view",
          "Stay silent for a while"
        ],
        "active": true
      },
      {
        "id": 13,
        "category": "Emotions & Love Language",
        "text": "How do you prefer to receive an apology?",
        "options": [
          "A sincere \"sorry\" is enough",
          "I need to see a change in behavior",
          "A heartfelt conversation about what happened",
          "A gesture like a gift or favor"
        ],
        "active": true
      },
      {
        "id": 14,
        "category": "Emotions & Love Language",
        "text": "What makes you feel most appreciated?",
        "options": [
          "When my efforts are verbally acknowledged",
          "When someone does something thoughtful for me",
          "When I get a surprise gift",
          "When someone spends uninterrupted time with me"
        ],
        "active": true
      },
      {
        "id": 15,
        "category": "Emotions & Love Language",
        "text": "How open are you with your feelings?",
        "options": [
          "Very open, an open book",
          "I share with people I trust",
          "I tend to keep my feelings to myself",
          "It takes time for me to open up"
        ],
        "active": true
      },
      {
        "id": 16,
        "category": "Values & Family",
        "text": "How important is your family's approval in major life decisions?",
        "options": [
          "Extremely important, their opinion is final",
          "Very important, I always consider it",
          "Somewhat important, but I make the final call",
          "Not important, my life is my own"
        ],
        "active": true
      },
      {
        "id": 17,
        "category": "Values & Family",
        "text": "Your ideal family structure for the future is:",
        "options": [
          "Living in a joint family",
          "Living in a nuclear family, but close to parents",
          "Living in a nuclear family, independently",
          "I haven't thought about it"
        ],
        "active": true
      },
      {
        "id": 18,
        "category": "Values & Family",
        "text": "How do you view money in a relationship?",
        "options": [
          "Finances should be completely shared",
          "We should keep our finances separate",
          "A mix of both - some shared, some separate",
          "It should be managed by whoever is better at it"
        ],
        "active": true
      },
      {
        "id": 19,
        "category": "Values & Family",
        "text": "What role does religion or spirituality play in your life?",
        "options": [
          "A very central and guiding role",
          "It's part of my culture and traditions",
          "I am spiritual but not religious",
          "It doesn't play a significant role"
        ],
        "active": true
      },
      {
        "id": 20,
        "category": "Values & Family",
        "text": "How do you prefer to spend holidays and festivals?",
        "options": [
          "With a large family gathering",
          "With a small group of close family/friends",
          "As a quiet day for myself/with my partner",
          "Traveling to a new place"
        ],
        "active": true
      },
      {
        "id": 21,
        "category": "Future & Goals",
        "text": "Where do you see yourself in 5 years?",
        "options": [
          "Focused on career growth",
          "Settled down with family",
          "Traveling the world",
          "A balance of personal and professional life"
        ],
        "active": true
      },
      {
        "id": 22,
        "category": "Future & Goals",
        "text": "What is your current top priority in life?",
        "options": [
          "Career",
          "Relationship / Love",
          "Family",
          "Personal Growth & Health"
        ],
        "active": true
      },
      {
        "id": 23,
        "category": "Future & Goals",
        "text": "Are you interested in having children in the future?",
        "options": [
          "Yes, definitely",
          "Maybe, I'm open to it",
          "No, I prefer not to have children",
          "I'm not sure yet"
        ],
        "active": true
      },
      {
        "id": 24,
        "category": "Future & Goals",
        "text": "How do you feel about moving to a different city for a great opportunity?",
        "options": [
          "Absolutely, I'd love the adventure",
          "I would consider it if my partner agrees",
          "I would prefer to stay in my current city",
          "Only if it's absolutely necessary"
        ],
        "active": true
      },
      {
        "id": 25,
        "category": "Future & Goals",
        "text": "What does \"success\" mean to you?",
        "options": [
          "Financial wealth and stability",
          "A fulfilling career and recognition",
          "Strong relationships and a happy family",
          "Freedom to live life on my own terms"
        ],
        "active": true
      }
    ],
    "isPublic": true,
    "isOfficial": true,
    "createdAt": "2025-11-05T15:31:00.956Z",
    "status": "approved",
    "imageUrl": "",
    "analysisConfig": {
      "range0_25": "Looks like there's a universe of things to discover about each other! Every mismatched answer is a doorway to a new conversation. Start exploring!",
      "range26_50": "You've got a good mix of similarities and differences. This is what makes a relationship exciting! It's a great chance to learn and grow together.",
      "range51_75": "You two are definitely in sync! You have a strong connection and understand each other well. Keep nurturing this beautiful bond.",
      "range76_100": "Incredible! Your understanding of each other is profound. It's rare to see such a strong connection. You are a true power couple!"
    }
  },
  {
    "id": "official-gf-bf",
    "title": "For GF / BF",
    "description": "A fun and romantic quiz specially designed for girlfriends and boyfriends to check their connection.",
    "creatorName": "Marathi Bayko",
    "questions": [
      {
        "id": 1,
        "category": "Personality & Nature",
        "text": "How do you usually react when you’re angry?",
        "options": [
          "Become silent and distant",
          "Express it openly and talk it out",
          "Try to distract myself with other activities",
          "Need some time alone to cool down"
        ],
        "active": true
      },
      {
        "id": 2,
        "category": "Personality & Nature",
        "text": "Are you more of an introvert or an extrovert?",
        "options": [
          "Strongly introvert",
          "Mostly introvert",
          "A mix of both (ambivert)",
          "Mostly extrovert",
          "Strongly extrovert"
        ],
        "active": true
      },
      {
        "id": 3,
        "category": "Personality & Nature",
        "text": "How do you handle stress?",
        "options": [
          "Talk to friends/family",
          "Exercise or physical activity",
          "Indulge in hobbies",
          "Prefer to handle it alone"
        ],
        "active": true
      },
      {
        "id": 4,
        "category": "Personality & Nature",
        "text": "When making a decision, you primarily rely on:",
        "options": [
          "Logic and facts",
          "Gut feeling and intuition",
          "Advice from others",
          "Past experiences"
        ],
        "active": true
      },
      {
        "id": 5,
        "category": "Personality & Nature",
        "text": "Are you a planner or spontaneous?",
        "options": [
          "I plan everything in detail",
          "I have a rough plan",
          "I mostly go with the flow",
          "I am completely spontaneous"
        ],
        "active": true
      },
      {
        "id": 6,
        "category": "Habits & Lifestyle",
        "text": "Are you an early bird or a night owl?",
        "options": [
          "Early bird - Love the mornings",
          "Night owl - Most productive at night",
          "Flexible, depends on the day",
          "Neither, I just want more sleep!"
        ],
        "active": true
      },
      {
        "id": 7,
        "category": "Habits & Lifestyle",
        "text": "How often do you like to go out?",
        "options": [
          "Almost every weekend",
          "A few times a month",
          "Once a month is enough",
          "I prefer staying in"
        ],
        "active": true
      },
      {
        "id": 8,
        "category": "Habits & Lifestyle",
        "text": "Your ideal vacation is:",
        "options": [
          "A relaxing beach holiday",
          "An adventurous trip with hiking/sports",
          "Exploring a new city and its culture",
          "Staying home and chilling"
        ],
        "active": true
      },
      {
        "id": 9,
        "category": "Habits & Lifestyle",
        "text": "How important is cleanliness and organization to you?",
        "options": [
          "Very important, I like things tidy",
          "Somewhat important, but a little mess is okay",
          "Not very important",
          "I thrive in organized chaos"
        ],
        "active": true
      },
      {
        "id": 10,
        "category": "Habits & Lifestyle",
        "text": "When it comes to food, you are:",
        "options": [
          "An adventurous eater, love trying new things",
          "Happy with comfort food and classics",
          "A healthy eater",
          "Somewhat picky"
        ],
        "active": true
      },
      {
        "id": 11,
        "category": "Emotions & Love Language",
        "text": "How do you primarily express love and affection?",
        "options": [
          "Through words of affirmation and compliments",
          "By spending quality time together",
          "By giving thoughtful gifts",
          "Through physical touch (hugs, etc.)",
          "Through acts of service (doing things for them)"
        ],
        "active": true
      },
      {
        "id": 12,
        "category": "Emotions & Love Language",
        "text": "During a fight, you prefer to:",
        "options": [
          "Talk and resolve it immediately",
          "Take a break and talk when calm",
          "Send a text to explain my point of view",
          "Stay silent for a while"
        ],
        "active": true
      },
      {
        "id": 13,
        "category": "Emotions & Love Language",
        "text": "How do you prefer to receive an apology?",
        "options": [
          "A sincere \"sorry\" is enough",
          "I need to see a change in behavior",
          "A heartfelt conversation about what happened",
          "A gesture like a gift or favor"
        ],
        "active": true
      },
      {
        "id": 14,
        "category": "Emotions & Love Language",
        "text": "What makes you feel most appreciated?",
        "options": [
          "When my efforts are verbally acknowledged",
          "When someone does something thoughtful for me",
          "When I get a surprise gift",
          "When someone spends uninterrupted time with me"
        ],
        "active": true
      },
      {
        "id": 15,
        "category": "Emotions & Love Language",
        "text": "How open are you with your feelings?",
        "options": [
          "Very open, an open book",
          "I share with people I trust",
          "I tend to keep my feelings to myself",
          "It takes time for me to open up"
        ],
        "active": true
      }
    ],
    "isPublic": true,
    "isOfficial": true,
    "createdAt": "2025-11-05T15:31:00.956Z",
    "status": "approved",
    "imageUrl": "https://ibb.co/MkPLk374",
    "analysisConfig": {
      "range0_25": "It seems like there are quite a few differences in your perspectives. This is a great opportunity to start some interesting conversations and learn more about each other's worlds!",
      "range26_50": "You two have some common ground, but also areas where you see things differently. Exploring these differences can be a fun adventure and a way to grow even closer.",
      "range51_75": "You're on the same wavelength most of the time! You have a solid foundation of understanding. The few differences you have can add a little spice to your relationship.",
      "range76_100": "Wow, it's like you can read each other's minds! Your connection is incredibly strong. You share a deep understanding that is truly special."
    }
  },
  {
    "id": "official-husband-wife",
    "title": "For Husband / Wife",
    "description": "A deeper quiz for married couples to rediscover each other and strengthen their lifelong bond.",
    "creatorName": "Marathi Bayko",
    "questions": [
      {
        "id": 1,
        "category": "Personality & Nature",
        "text": "How do you usually react when you’re angry?",
        "options": [
          "Become silent and distant",
          "Express it openly and talk it out",
          "Try to distract myself with other activities",
          "Need some time alone to cool down"
        ],
        "active": true
      },
      {
        "id": 2,
        "category": "Personality & Nature",
        "text": "Are you more of an introvert or an extrovert?",
        "options": [
          "Strongly introvert",
          "Mostly introvert",
          "A mix of both (ambivert)",
          "Mostly extrovert",
          "Strongly extrovert"
        ],
        "active": true
      },
      {
        "id": 3,
        "category": "Personality & Nature",
        "text": "How do you handle stress?",
        "options": [
          "Talk to friends/family",
          "Exercise or physical activity",
          "Indulge in hobbies",
          "Prefer to handle it alone"
        ],
        "active": true
      },
      {
        "id": 4,
        "category": "Personality & Nature",
        "text": "When making a decision, you primarily rely on:",
        "options": [
          "Logic and facts",
          "Gut feeling and intuition",
          "Advice from others",
          "Past experiences"
        ],
        "active": true
      },
      {
        "id": 5,
        "category": "Personality & Nature",
        "text": "Are you a planner or spontaneous?",
        "options": [
          "I plan everything in detail",
          "I have a rough plan",
          "I mostly go with the flow",
          "I am completely spontaneous"
        ],
        "active": true
      },
      {
        "id": 6,
        "category": "Habits & Lifestyle",
        "text": "Are you an early bird or a night owl?",
        "options": [
          "Early bird - Love the mornings",
          "Night owl - Most productive at night",
          "Flexible, depends on the day",
          "Neither, I just want more sleep!"
        ],
        "active": true
      },
      {
        "id": 7,
        "category": "Habits & Lifestyle",
        "text": "How often do you like to go out?",
        "options": [
          "Almost every weekend",
          "A few times a month",
          "Once a month is enough",
          "I prefer staying in"
        ],
        "active": true
      },
      {
        "id": 8,
        "category": "Habits & Lifestyle",
        "text": "Your ideal vacation is:",
        "options": [
          "A relaxing beach holiday",
          "An adventurous trip with hiking/sports",
          "Exploring a new city and its culture",
          "Staying home and chilling"
        ],
        "active": true
      },
      {
        "id": 9,
        "category": "Habits & Lifestyle",
        "text": "How important is cleanliness and organization to you?",
        "options": [
          "Very important, I like things tidy",
          "Somewhat important, but a little mess is okay",
          "Not very important",
          "I thrive in organized chaos"
        ],
        "active": true
      },
      {
        "id": 10,
        "category": "Habits & Lifestyle",
        "text": "When it comes to food, you are:",
        "options": [
          "An adventurous eater, love trying new things",
          "Happy with comfort food and classics",
          "A healthy eater",
          "Somewhat picky"
        ],
        "active": true
      },
      {
        "id": 11,
        "category": "Emotions & Love Language",
        "text": "How do you primarily express love and affection?",
        "options": [
          "Through words of affirmation and compliments",
          "By spending quality time together",
          "By giving thoughtful gifts",
          "Through physical touch (hugs, etc.)",
          "Through acts of service (doing things for them)"
        ],
        "active": true
      },
      {
        "id": 12,
        "category": "Emotions & Love Language",
        "text": "During a fight, you prefer to:",
        "options": [
          "Talk and resolve it immediately",
          "Take a break and talk when calm",
          "Send a text to explain my point of view",
          "Stay silent for a while"
        ],
        "active": true
      },
      {
        "id": 13,
        "category": "Emotions & Love Language",
        "text": "How do you prefer to receive an apology?",
        "options": [
          "A sincere \"sorry\" is enough",
          "I need to see a change in behavior",
          "A heartfelt conversation about what happened",
          "A gesture like a gift or favor"
        ],
        "active": true
      },
      {
        "id": 14,
        "category": "Emotions & Love Language",
        "text": "What makes you feel most appreciated?",
        "options": [
          "When my efforts are verbally acknowledged",
          "When someone does something thoughtful for me",
          "When I get a surprise gift",
          "When someone spends uninterrupted time with me"
        ],
        "active": true
      },
      {
        "id": 15,
        "category": "Emotions & Love Language",
        "text": "How open are you with your feelings?",
        "options": [
          "Very open, an open book",
          "I share with people I trust",
          "I tend to keep my feelings to myself",
          "It takes time for me to open up"
        ],
        "active": true
      },
      {
        "id": 16,
        "category": "Values & Family",
        "text": "How important is your family's approval in major life decisions?",
        "options": [
          "Extremely important, their opinion is final",
          "Very important, I always consider it",
          "Somewhat important, but I make the final call",
          "Not important, my life is my own"
        ],
        "active": true
      },
      {
        "id": 17,
        "category": "Values & Family",
        "text": "Your ideal family structure for the future is:",
        "options": [
          "Living in a joint family",
          "Living in a nuclear family, but close to parents",
          "Living in a nuclear family, independently",
          "I haven't thought about it"
        ],
        "active": true
      },
      {
        "id": 18,
        "category": "Values & Family",
        "text": "How do you view money in a relationship?",
        "options": [
          "Finances should be completely shared",
          "We should keep our finances separate",
          "A mix of both - some shared, some separate",
          "It should be managed by whoever is better at it"
        ],
        "active": true
      },
      {
        "id": 19,
        "category": "Values & Family",
        "text": "What role does religion or spirituality play in your life?",
        "options": [
          "A very central and guiding role",
          "It's part of my culture and traditions",
          "I am spiritual but not religious",
          "It doesn't play a significant role"
        ],
        "active": true
      },
      {
        "id": 20,
        "category": "Values & Family",
        "text": "How do you prefer to spend holidays and festivals?",
        "options": [
          "With a large family gathering",
          "With a small group of close family/friends",
          "As a quiet day for myself/with my partner",
          "Traveling to a new place"
        ],
        "active": true
      },
      {
        "id": 21,
        "category": "Future & Goals",
        "text": "Where do you see yourself in 5 years?",
        "options": [
          "Focused on career growth",
          "Settled down with family",
          "Traveling the world",
          "A balance of personal and professional life"
        ],
        "active": true
      },
      {
        "id": 22,
        "category": "Future & Goals",
        "text": "What is your current top priority in life?",
        "options": [
          "Career",
          "Relationship / Love",
          "Family",
          "Personal Growth & Health"
        ],
        "active": true
      },
      {
        "id": 23,
        "category": "Future & Goals",
        "text": "Are you interested in having children in the future?",
        "options": [
          "Yes, definitely",
          "Maybe, I'm open to it",
          "No, I prefer not to have children",
          "I'm not sure yet"
        ],
        "active": true
      },
      {
        "id": 24,
        "category": "Future & Goals",
        "text": "How do you feel about moving to a different city for a great opportunity?",
        "options": [
          "Absolutely, I'd love the adventure",
          "I would consider it if my partner agrees",
          "I would prefer to stay in my current city",
          "Only if it's absolutely necessary"
        ],
        "active": true
      },
      {
        "id": 25,
        "category": "Future & Goals",
        "text": "What does \"success\" mean to you?",
        "options": [
          "Financial wealth and stability",
          "A fulfilling career and recognition",
          "Strong relationships and a happy family",
          "Freedom to live life on my own terms"
        ],
        "active": true
      }
    ],
    "isPublic": true,
    "isOfficial": true,
    "createdAt": "2025-11-05T15:31:00.956Z",
    "status": "approved",
    "imageUrl": "",
    "analysisConfig": {
      "range0_25": "It seems like there are quite a few differences in your perspectives. This is a great opportunity to start some interesting conversations and learn more about each other's worlds!",
      "range26_50": "You two have some common ground, but also areas where you see things differently. Exploring these differences can be a fun adventure and a way to grow even closer.",
      "range51_75": "You're on the same wavelength most of the time! You have a solid foundation of understanding. The few differences you have can add a little spice to your relationship.",
      "range76_100": "Wow, it's like you can read each other's minds! Your connection is incredibly strong. You share a deep understanding that is truly special."
    }
  },
  {
    "id": "official-friends",
    "title": "For Friends",
    "description": "How well do you know your bestie? A perfect quiz to test your friendship and share some laughs.",
    "creatorName": "Marathi Bayko",
    "questions": [
      {
        "id": 1,
        "category": "Personality & Nature",
        "text": "How do you usually react when you’re angry?",
        "options": [
          "Become silent and distant",
          "Express it openly and talk it out",
          "Try to distract myself with other activities",
          "Need some time alone to cool down"
        ],
        "active": true
      },
      {
        "id": 2,
        "category": "Personality & Nature",
        "text": "Are you more of an introvert or an extrovert?",
        "options": [
          "Strongly introvert",
          "Mostly introvert",
          "A mix of both (ambivert)",
          "Mostly extrovert",
          "Strongly extrovert"
        ],
        "active": true
      },
      {
        "id": 3,
        "category": "Personality & Nature",
        "text": "How do you handle stress?",
        "options": [
          "Talk to friends/family",
          "Exercise or physical activity",
          "Indulge in hobbies",
          "Prefer to handle it alone"
        ],
        "active": true
      },
      {
        "id": 4,
        "category": "Personality & Nature",
        "text": "When making a decision, you primarily rely on:",
        "options": [
          "Logic and facts",
          "Gut feeling and intuition",
          "Advice from others",
          "Past experiences"
        ],
        "active": true
      },
      {
        "id": 5,
        "category": "Personality & Nature",
        "text": "Are you a planner or spontaneous?",
        "options": [
          "I plan everything in detail",
          "I have a rough plan",
          "I mostly go with the flow",
          "I am completely spontaneous"
        ],
        "active": true
      },
      {
        "id": 6,
        "category": "Habits & Lifestyle",
        "text": "Are you an early bird or a night owl?",
        "options": [
          "Early bird - Love the mornings",
          "Night owl - Most productive at night",
          "Flexible, depends on the day",
          "Neither, I just want more sleep!"
        ],
        "active": true
      },
      {
        "id": 7,
        "category": "Habits & Lifestyle",
        "text": "How often do you like to go out?",
        "options": [
          "Almost every weekend",
          "A few times a month",
          "Once a month is enough",
          "I prefer staying in"
        ],
        "active": true
      },
      {
        "id": 8,
        "category": "Habits & Lifestyle",
        "text": "Your ideal vacation is:",
        "options": [
          "A relaxing beach holiday",
          "An adventurous trip with hiking/sports",
          "Exploring a new city and its culture",
          "Staying home and chilling"
        ],
        "active": true
      },
      {
        "id": 9,
        "category": "Habits & Lifestyle",
        "text": "How important is cleanliness and organization to you?",
        "options": [
          "Very important, I like things tidy",
          "Somewhat important, but a little mess is okay",
          "Not very important",
          "I thrive in organized chaos"
        ],
        "active": true
      },
      {
        "id": 10,
        "category": "Habits & Lifestyle",
        "text": "When it comes to food, you are:",
        "options": [
          "An adventurous eater, love trying new things",
          "Happy with comfort food and classics",
          "A healthy eater",
          "Somewhat picky"
        ],
        "active": true
      }
    ],
    "isPublic": true,
    "isOfficial": true,
    "createdAt": "2025-11-05T15:31:00.956Z",
    "status": "approved",
    "imageUrl": "",
    "analysisConfig": {
      "range0_25": "It seems like there are quite a few differences in your perspectives. This is a great opportunity to start some interesting conversations and learn more about each other's worlds!",
      "range26_50": "You two have some common ground, but also areas where you see things differently. Exploring these differences can be a fun adventure and a way to grow even closer.",
      "range51_75": "You're on the same wavelength most of the time! You have a solid foundation of understanding. The few differences you have can add a little spice to your relationship.",
      "range76_100": "Wow, it's like you can read each other's minds! Your connection is incredibly strong. You share a deep understanding that is truly special."
    }
  },
  {
    "id": "official-siblings",
    "title": "For Siblings",
    "description": "You grew up together, but how well do you really know each other now? Find out!",
    "creatorName": "Marathi Bayko",
    "questions": [
      {
        "id": 6,
        "category": "Habits & Lifestyle",
        "text": "Are you an early bird or a night owl?",
        "options": [
          "Early bird - Love the mornings",
          "Night owl - Most productive at night",
          "Flexible, depends on the day",
          "Neither, I just want more sleep!"
        ],
        "active": true
      },
      {
        "id": 7,
        "category": "Habits & Lifestyle",
        "text": "How often do you like to go out?",
        "options": [
          "Almost every weekend",
          "A few times a month",
          "Once a month is enough",
          "I prefer staying in"
        ],
        "active": true
      },
      {
        "id": 8,
        "category": "Habits & Lifestyle",
        "text": "Your ideal vacation is:",
        "options": [
          "A relaxing beach holiday",
          "An adventurous trip with hiking/sports",
          "Exploring a new city and its culture",
          "Staying home and chilling"
        ],
        "active": true
      },
      {
        "id": 9,
        "category": "Habits & Lifestyle",
        "text": "How important is cleanliness and organization to you?",
        "options": [
          "Very important, I like things tidy",
          "Somewhat important, but a little mess is okay",
          "Not very important",
          "I thrive in organized chaos"
        ],
        "active": true
      },
      {
        "id": 10,
        "category": "Habits & Lifestyle",
        "text": "When it comes to food, you are:",
        "options": [
          "An adventurous eater, love trying new things",
          "Happy with comfort food and classics",
          "A healthy eater",
          "Somewhat picky"
        ],
        "active": true
      },
      {
        "id": 11,
        "category": "Emotions & Love Language",
        "text": "How do you primarily express love and affection?",
        "options": [
          "Through words of affirmation and compliments",
          "By spending quality time together",
          "By giving thoughtful gifts",
          "Through physical touch (hugs, etc.)",
          "Through acts of service (doing things for them)"
        ],
        "active": true
      },
      {
        "id": 12,
        "category": "Emotions & Love Language",
        "text": "During a fight, you prefer to:",
        "options": [
          "Talk and resolve it immediately",
          "Take a break and talk when calm",
          "Send a text to explain my point of view",
          "Stay silent for a while"
        ],
        "active": true
      },
      {
        "id": 13,
        "category": "Emotions & Love Language",
        "text": "How do you prefer to receive an apology?",
        "options": [
          "A sincere \"sorry\" is enough",
          "I need to see a change in behavior",
          "A heartfelt conversation about what happened",
          "A gesture like a gift or favor"
        ],
        "active": true
      },
      {
        "id": 14,
        "category": "Emotions & Love Language",
        "text": "What makes you feel most appreciated?",
        "options": [
          "When my efforts are verbally acknowledged",
          "When someone does something thoughtful for me",
          "When I get a surprise gift",
          "When someone spends uninterrupted time with me"
        ],
        "active": true
      },
      {
        "id": 15,
        "category": "Emotions & Love Language",
        "text": "How open are you with your feelings?",
        "options": [
          "Very open, an open book",
          "I share with people I trust",
          "I tend to keep my feelings to myself",
          "It takes time for me to open up"
        ],
        "active": true
      },
      {
        "id": 16,
        "category": "Values & Family",
        "text": "How important is your family's approval in major life decisions?",
        "options": [
          "Extremely important, their opinion is final",
          "Very important, I always consider it",
          "Somewhat important, but I make the final call",
          "Not important, my life is my own"
        ],
        "active": true
      },
      {
        "id": 17,
        "category": "Values & Family",
        "text": "Your ideal family structure for the future is:",
        "options": [
          "Living in a joint family",
          "Living in a nuclear family, but close to parents",
          "Living in a nuclear family, independently",
          "I haven't thought about it"
        ],
        "active": true
      },
      {
        "id": 18,
        "category": "Values & Family",
        "text": "How do you view money in a relationship?",
        "options": [
          "Finances should be completely shared",
          "We should keep our finances separate",
          "A mix of both - some shared, some separate",
          "It should be managed by whoever is better at it"
        ],
        "active": true
      },
      {
        "id": 19,
        "category": "Values & Family",
        "text": "What role does religion or spirituality play in your life?",
        "options": [
          "A very central and guiding role",
          "It's part of my culture and traditions",
          "I am spiritual but not religious",
          "It doesn't play a significant role"
        ],
        "active": true
      },
      {
        "id": 20,
        "category": "Values & Family",
        "text": "How do you prefer to spend holidays and festivals?",
        "options": [
          "With a large family gathering",
          "With a small group of close family/friends",
          "As a quiet day for myself/with my partner",
          "Traveling to a new place"
        ],
        "active": true
      }
    ],
    "isPublic": true,
    "isOfficial": true,
    "createdAt": "2025-11-05T15:31:00.956Z",
    "status": "approved",
    "imageUrl": "",
    "analysisConfig": {
      "range0_25": "It seems like there are quite a few differences in your perspectives. This is a great opportunity to start some interesting conversations and learn more about each other's worlds!",
      "range26_50": "You two have some common ground, but also areas where you see things differently. Exploring these differences can be a fun adventure and a way to grow even closer.",
      "range51_75": "You're on the same wavelength most of the time! You have a solid foundation of understanding. The few differences you have can add a little spice to your relationship.",
      "range76_100": "Wow, it's like you can read each other's minds! Your connection is incredibly strong. You share a deep understanding that is truly special."
    }
  },
  {
    "id": "official-crush",
    "title": "For Your Crush",
    "description": "Want to know if you and your crush are a match? Create this quiz about you and see how they answer!",
    "creatorName": "Marathi Bayko",
    "questions": [
      {
        "id": 11,
        "category": "Emotions & Love Language",
        "text": "How do you primarily express love and affection?",
        "options": [
          "Through words of affirmation and compliments",
          "By spending quality time together",
          "By giving thoughtful gifts",
          "Through physical touch (hugs, etc.)",
          "Through acts of service (doing things for them)"
        ],
        "active": true
      },
      {
        "id": 12,
        "category": "Emotions & Love Language",
        "text": "During a fight, you prefer to:",
        "options": [
          "Talk and resolve it immediately",
          "Take a break and talk when calm",
          "Send a text to explain my point of view",
          "Stay silent for a while"
        ],
        "active": true
      },
      {
        "id": 13,
        "category": "Emotions & Love Language",
        "text": "How do you prefer to receive an apology?",
        "options": [
          "A sincere \"sorry\" is enough",
          "I need to see a change in behavior",
          "A heartfelt conversation about what happened",
          "A gesture like a gift or favor"
        ],
        "active": true
      },
      {
        "id": 14,
        "category": "Emotions & Love Language",
        "text": "What makes you feel most appreciated?",
        "options": [
          "When my efforts are verbally acknowledged",
          "When someone does something thoughtful for me",
          "When I get a surprise gift",
          "When someone spends uninterrupted time with me"
        ],
        "active": true
      },
      {
        "id": 15,
        "category": "Emotions & Love Language",
        "text": "How open are you with your feelings?",
        "options": [
          "Very open, an open book",
          "I share with people I trust",
          "I tend to keep my feelings to myself",
          "It takes time for me to open up"
        ],
        "active": true
      },
      {
        "id": 16,
        "category": "Values & Family",
        "text": "How important is your family's approval in major life decisions?",
        "options": [
          "Extremely important, their opinion is final",
          "Very important, I always consider it",
          "Somewhat important, but I make the final call",
          "Not important, my life is my own"
        ],
        "active": true
      },
      {
        "id": 17,
        "category": "Values & Family",
        "text": "Your ideal family structure for the future is:",
        "options": [
          "Living in a joint family",
          "Living in a nuclear family, but close to parents",
          "Living in a nuclear family, independently",
          "I haven't thought about it"
        ],
        "active": true
      },
      {
        "id": 18,
        "category": "Values & Family",
        "text": "How do you view money in a relationship?",
        "options": [
          "Finances should be completely shared",
          "We should keep our finances separate",
          "A mix of both - some shared, some separate",
          "It should be managed by whoever is better at it"
        ],
        "active": true
      },
      {
        "id": 19,
        "category": "Values & Family",
        "text": "What role does religion or spirituality play in your life?",
        "options": [
          "A very central and guiding role",
          "It's part of my culture and traditions",
          "I am spiritual but not religious",
          "It doesn't play a significant role"
        ],
        "active": true
      },
      {
        "id": 20,
        "category": "Values & Family",
        "text": "How do you prefer to spend holidays and festivals?",
        "options": [
          "With a large family gathering",
          "With a small group of close family/friends",
          "As a quiet day for myself/with my partner",
          "Traveling to a new place"
        ],
        "active": true
      },
      {
        "id": 21,
        "category": "Future & Goals",
        "text": "Where do you see yourself in 5 years?",
        "options": [
          "Focused on career growth",
          "Settled down with family",
          "Traveling the world",
          "A balance of personal and professional life"
        ],
        "active": true
      },
      {
        "id": 22,
        "category": "Future & Goals",
        "text": "What is your current top priority in life?",
        "options": [
          "Career",
          "Relationship / Love",
          "Family",
          "Personal Growth & Health"
        ],
        "active": true
      },
      {
        "id": 23,
        "category": "Future & Goals",
        "text": "Are you interested in having children in the future?",
        "options": [
          "Yes, definitely",
          "Maybe, I'm open to it",
          "No, I prefer not to have children",
          "I'm not sure yet"
        ],
        "active": true
      },
      {
        "id": 24,
        "category": "Future & Goals",
        "text": "How do you feel about moving to a different city for a great opportunity?",
        "options": [
          "Absolutely, I'd love the adventure",
          "I would consider it if my partner agrees",
          "I would prefer to stay in my current city",
          "Only if it's absolutely necessary"
        ],
        "active": true
      },
      {
        "id": 25,
        "category": "Future & Goals",
        "text": "What does \"success\" mean to you?",
        "options": [
          "Financial wealth and stability",
          "A fulfilling career and recognition",
          "Strong relationships and a happy family",
          "Freedom to live life on my own terms"
        ],
        "active": true
      }
    ],
    "isPublic": true,
    "isOfficial": true,
    "createdAt": "2025-11-05T15:31:00.956Z",
    "status": "approved",
    "imageUrl": "",
    "analysisConfig": {
      "range0_25": "It seems like there are quite a few differences in your perspectives. This is a great opportunity to start some interesting conversations and learn more about each other's worlds!",
      "range26_50": "You two have some common ground, but also areas where you see things differently. Exploring these differences can be a fun adventure and a way to grow even closer.",
      "range51_75": "You're on the same wavelength most of the time! You have a solid foundation of understanding. The few differences you have can add a little spice to your relationship.",
      "range76_100": "Wow, it's like you can read each other's minds! Your connection is incredibly strong. You share a deep understanding that is truly special."
    }
  },
  {
    "id": "official-character-verification",
    "title": "Character Verification",
    "description": "This quiz focuses on values and principles. See how aligned your characters are.",
    "creatorName": "Marathi Bayko",
    "questions": [
      {
        "id": 1,
        "category": "Personality & Nature",
        "text": "How do you usually react when you’re angry?",
        "options": [
          "Become silent and distant",
          "Express it openly and talk it out",
          "Try to distract myself with other activities",
          "Need some time alone to cool down"
        ],
        "active": true
      },
      {
        "id": 2,
        "category": "Personality & Nature",
        "text": "Are you more of an introvert or an extrovert?",
        "options": [
          "Strongly introvert",
          "Mostly introvert",
          "A mix of both (ambivert)",
          "Mostly extrovert",
          "Strongly extrovert"
        ],
        "active": true
      },
      {
        "id": 3,
        "category": "Personality & Nature",
        "text": "How do you handle stress?",
        "options": [
          "Talk to friends/family",
          "Exercise or physical activity",
          "Indulge in hobbies",
          "Prefer to handle it alone"
        ],
        "active": true
      },
      {
        "id": 4,
        "category": "Personality & Nature",
        "text": "When making a decision, you primarily rely on:",
        "options": [
          "Logic and facts",
          "Gut feeling and intuition",
          "Advice from others",
          "Past experiences"
        ],
        "active": true
      },
      {
        "id": 5,
        "category": "Personality & Nature",
        "text": "Are you a planner or spontaneous?",
        "options": [
          "I plan everything in detail",
          "I have a rough plan",
          "I mostly go with the flow",
          "I am completely spontaneous"
        ],
        "active": true
      },
      {
        "id": 16,
        "category": "Values & Family",
        "text": "How important is your family's approval in major life decisions?",
        "options": [
          "Extremely important, their opinion is final",
          "Very important, I always consider it",
          "Somewhat important, but I make the final call",
          "Not important, my life is my own"
        ],
        "active": true
      },
      {
        "id": 17,
        "category": "Values & Family",
        "text": "Your ideal family structure for the future is:",
        "options": [
          "Living in a joint family",
          "Living in a nuclear family, but close to parents",
          "Living in a nuclear family, independently",
          "I haven't thought about it"
        ],
        "active": true
      },
      {
        "id": 18,
        "category": "Values & Family",
        "text": "How do you view money in a relationship?",
        "options": [
          "Finances should be completely shared",
          "We should keep our finances separate",
          "A mix of both - some shared, some separate",
          "It should be managed by whoever is better at it"
        ],
        "active": true
      },
      {
        "id": 19,
        "category": "Values & Family",
        "text": "What role does religion or spirituality play in your life?",
        "options": [
          "A very central and guiding role",
          "It's part of my culture and traditions",
          "I am spiritual but not religious",
          "It doesn't play a significant role"
        ],
        "active": true
      },
      {
        "id": 20,
        "category": "Values & Family",
        "text": "How do you prefer to spend holidays and festivals?",
        "options": [
          "With a large family gathering",
          "With a small group of close family/friends",
          "As a quiet day for myself/with my partner",
          "Traveling to a new place"
        ],
        "active": true
      }
    ],
    "isPublic": true,
    "isOfficial": true,
    "createdAt": "2025-11-05T15:31:00.956Z",
    "status": "approved",
    "imageUrl": "",
    "analysisConfig": {
      "range0_25": "It seems like there are quite a few differences in your perspectives. This is a great opportunity to start some interesting conversations and learn more about each other's worlds!",
      "range26_50": "You two have some common ground, but also areas where you see things differently. Exploring these differences can be a fun adventure and a way to grow even closer.",
      "range51_75": "You're on the same wavelength most of the time! You have a solid foundation of understanding. The few differences you have can add a little spice to your relationship.",
      "range76_100": "Wow, it's like you can read each other's minds! Your connection is incredibly strong. You share a deep understanding that is truly special."
    }
  },
  {
    "id": "official-loyalty-check",
    "title": "Loyalty Check",
    "description": "A quiz focused on trust, commitment, and loyalty in a relationship. Handle with care!",
    "creatorName": "Marathi Bayko",
    "questions": [
      {
        "id": 11,
        "category": "Emotions & Love Language",
        "text": "How do you primarily express love and affection?",
        "options": [
          "Through words of affirmation and compliments",
          "By spending quality time together",
          "By giving thoughtful gifts",
          "Through physical touch (hugs, etc.)",
          "Through acts of service (doing things for them)"
        ],
        "active": true
      },
      {
        "id": 12,
        "category": "Emotions & Love Language",
        "text": "During a fight, you prefer to:",
        "options": [
          "Talk and resolve it immediately",
          "Take a break and talk when calm",
          "Send a text to explain my point of view",
          "Stay silent for a while"
        ],
        "active": true
      },
      {
        "id": 13,
        "category": "Emotions & Love Language",
        "text": "How do you prefer to receive an apology?",
        "options": [
          "A sincere \"sorry\" is enough",
          "I need to see a change in behavior",
          "A heartfelt conversation about what happened",
          "A gesture like a gift or favor"
        ],
        "active": true
      },
      {
        "id": 14,
        "category": "Emotions & Love Language",
        "text": "What makes you feel most appreciated?",
        "options": [
          "When my efforts are verbally acknowledged",
          "When someone does something thoughtful for me",
          "When I get a surprise gift",
          "When someone spends uninterrupted time with me"
        ],
        "active": true
      },
      {
        "id": 15,
        "category": "Emotions & Love Language",
        "text": "How open are you with your feelings?",
        "options": [
          "Very open, an open book",
          "I share with people I trust",
          "I tend to keep my feelings to myself",
          "It takes time for me to open up"
        ],
        "active": true
      },
      {
        "id": 16,
        "category": "Values & Family",
        "text": "How important is your family's approval in major life decisions?",
        "options": [
          "Extremely important, their opinion is final",
          "Very important, I always consider it",
          "Somewhat important, but I make the final call",
          "Not important, my life is my own"
        ],
        "active": true
      },
      {
        "id": 17,
        "category": "Values & Family",
        "text": "Your ideal family structure for the future is:",
        "options": [
          "Living in a joint family",
          "Living in a nuclear family, but close to parents",
          "Living in a nuclear family, independently",
          "I haven't thought about it"
        ],
        "active": true
      },
      {
        "id": 18,
        "category": "Values & Family",
        "text": "How do you view money in a relationship?",
        "options": [
          "Finances should be completely shared",
          "We should keep our finances separate",
          "A mix of both - some shared, some separate",
          "It should be managed by whoever is better at it"
        ],
        "active": true
      },
      {
        "id": 19,
        "category": "Values & Family",
        "text": "What role does religion or spirituality play in your life?",
        "options": [
          "A very central and guiding role",
          "It's part of my culture and traditions",
          "I am spiritual but not religious",
          "It doesn't play a significant role"
        ],
        "active": true
      },
      {
        "id": 20,
        "category": "Values & Family",
        "text": "How do you prefer to spend holidays and festivals?",
        "options": [
          "With a large family gathering",
          "With a small group of close family/friends",
          "As a quiet day for myself/with my partner",
          "Traveling to a new place"
        ],
        "active": true
      }
    ],
    "isPublic": true,
    "isOfficial": true,
    "createdAt": "2025-11-05T15:31:00.956Z",
    "status": "approved",
    "imageUrl": "",
    "analysisConfig": {
      "range0_25": "It seems like there are quite a few differences in your perspectives. This is a great opportunity to start some interesting conversations and learn more about each other's worlds!",
      "range26_50": "You two have some common ground, but also areas where you see things differently. Exploring these differences can be a fun adventure and a way to grow even closer.",
      "range51_75": "You're on the same wavelength most of the time! You have a solid foundation of understanding. The few differences you have can add a little spice to your relationship.",
      "range76_100": "Wow, it's like you can read each other's minds! Your connection is incredibly strong. You share a deep understanding that is truly special."
    }
  },
  {
    "id": "official-teacher-student",
    "title": "For Teacher & Student",
    "description": "A friendly quiz to build a better understanding and rapport between teachers and students.",
    "creatorName": "Marathi Bayko",
    "questions": [
      {
        "id": 1,
        "category": "Personality & Nature",
        "text": "How do you usually react when you’re angry?",
        "options": [
          "Become silent and distant",
          "Express it openly and talk it out",
          "Try to distract myself with other activities",
          "Need some time alone to cool down"
        ],
        "active": true
      },
      {
        "id": 2,
        "category": "Personality & Nature",
        "text": "Are you more of an introvert or an extrovert?",
        "options": [
          "Strongly introvert",
          "Mostly introvert",
          "A mix of both (ambivert)",
          "Mostly extrovert",
          "Strongly extrovert"
        ],
        "active": true
      },
      {
        "id": 3,
        "category": "Personality & Nature",
        "text": "How do you handle stress?",
        "options": [
          "Talk to friends/family",
          "Exercise or physical activity",
          "Indulge in hobbies",
          "Prefer to handle it alone"
        ],
        "active": true
      },
      {
        "id": 4,
        "category": "Personality & Nature",
        "text": "When making a decision, you primarily rely on:",
        "options": [
          "Logic and facts",
          "Gut feeling and intuition",
          "Advice from others",
          "Past experiences"
        ],
        "active": true
      },
      {
        "id": 5,
        "category": "Personality & Nature",
        "text": "Are you a planner or spontaneous?",
        "options": [
          "I plan everything in detail",
          "I have a rough plan",
          "I mostly go with the flow",
          "I am completely spontaneous"
        ],
        "active": true
      },
      {
        "id": 21,
        "category": "Future & Goals",
        "text": "Where do you see yourself in 5 years?",
        "options": [
          "Focused on career growth",
          "Settled down with family",
          "Traveling the world",
          "A balance of personal and professional life"
        ],
        "active": true
      },
      {
        "id": 22,
        "category": "Future & Goals",
        "text": "What is your current top priority in life?",
        "options": [
          "Career",
          "Relationship / Love",
          "Family",
          "Personal Growth & Health"
        ],
        "active": true
      },
      {
        "id": 23,
        "category": "Future & Goals",
        "text": "Are you interested in having children in the future?",
        "options": [
          "Yes, definitely",
          "Maybe, I'm open to it",
          "No, I prefer not to have children",
          "I'm not sure yet"
        ],
        "active": true
      },
      {
        "id": 24,
        "category": "Future & Goals",
        "text": "How do you feel about moving to a different city for a great opportunity?",
        "options": [
          "Absolutely, I'd love the adventure",
          "I would consider it if my partner agrees",
          "I would prefer to stay in my current city",
          "Only if it's absolutely necessary"
        ],
        "active": true
      },
      {
        "id": 25,
        "category": "Future & Goals",
        "text": "What does \"success\" mean to you?",
        "options": [
          "Financial wealth and stability",
          "A fulfilling career and recognition",
          "Strong relationships and a happy family",
          "Freedom to live life on my own terms"
        ],
        "active": true
      }
    ],
    "isPublic": true,
    "isOfficial": true,
    "createdAt": "2025-11-05T15:31:00.956Z",
    "status": "approved",
    "imageUrl": "",
    "analysisConfig": {
      "range0_25": "It seems like there are quite a few differences in your perspectives. This is a great opportunity to start some interesting conversations and learn more about each other's worlds!",
      "range26_50": "You two have some common ground, but also areas where you see things differently. Exploring these differences can be a fun adventure and a way to grow even closer.",
      "range51_75": "You're on the same wavelength most of the time! You have a solid foundation of understanding. The few differences you have can add a little spice to your relationship.",
      "range76_100": "Wow, it's like you can read each other's minds! Your connection is incredibly strong. You share a deep understanding that is truly special."
    }
  },
  {
    "id": "official-employee-manager",
    "title": "For Employee & Manager",
    "description": "Improve workplace synergy! A quiz to understand work styles and preferences better.",
    "creatorName": "Marathi Bayko",
    "questions": [
      {
        "id": 1,
        "category": "Personality & Nature",
        "text": "How do you usually react when you’re angry?",
        "options": [
          "Become silent and distant",
          "Express it openly and talk it out",
          "Try to distract myself with other activities",
          "Need some time alone to cool down"
        ],
        "active": true
      },
      {
        "id": 2,
        "category": "Personality & Nature",
        "text": "Are you more of an introvert or an extrovert?",
        "options": [
          "Strongly introvert",
          "Mostly introvert",
          "A mix of both (ambivert)",
          "Mostly extrovert",
          "Strongly extrovert"
        ],
        "active": true
      },
      {
        "id": 3,
        "category": "Personality & Nature",
        "text": "How do you handle stress?",
        "options": [
          "Talk to friends/family",
          "Exercise or physical activity",
          "Indulge in hobbies",
          "Prefer to handle it alone"
        ],
        "active": true
      },
      {
        "id": 4,
        "category": "Personality & Nature",
        "text": "When making a decision, you primarily rely on:",
        "options": [
          "Logic and facts",
          "Gut feeling and intuition",
          "Advice from others",
          "Past experiences"
        ],
        "active": true
      },
      {
        "id": 5,
        "category": "Personality & Nature",
        "text": "Are you a planner or spontaneous?",
        "options": [
          "I plan everything in detail",
          "I have a rough plan",
          "I mostly go with the flow",
          "I am completely spontaneous"
        ],
        "active": true
      },
      {
        "id": 21,
        "category": "Future & Goals",
        "text": "Where do you see yourself in 5 years?",
        "options": [
          "Focused on career growth",
          "Settled down with family",
          "Traveling the world",
          "A balance of personal and professional life"
        ],
        "active": true
      },
      {
        "id": 22,
        "category": "Future & Goals",
        "text": "What is your current top priority in life?",
        "options": [
          "Career",
          "Relationship / Love",
          "Family",
          "Personal Growth & Health"
        ],
        "active": true
      },
      {
        "id": 23,
        "category": "Future & Goals",
        "text": "Are you interested in having children in the future?",
        "options": [
          "Yes, definitely",
          "Maybe, I'm open to it",
          "No, I prefer not to have children",
          "I'm not sure yet"
        ],
        "active": true
      },
      {
        "id": 24,
        "category": "Future & Goals",
        "text": "How do you feel about moving to a different city for a great opportunity?",
        "options": [
          "Absolutely, I'd love the adventure",
          "I would consider it if my partner agrees",
          "I would prefer to stay in my current city",
          "Only if it's absolutely necessary"
        ],
        "active": true
      },
      {
        "id": 25,
        "category": "Future & Goals",
        "text": "What does \"success\" mean to you?",
        "options": [
          "Financial wealth and stability",
          "A fulfilling career and recognition",
          "Strong relationships and a happy family",
          "Freedom to live life on my own terms"
        ],
        "active": true
      }
    ],
    "isPublic": true,
    "isOfficial": true,
    "createdAt": "2025-11-05T15:31:00.956Z",
    "status": "approved",
    "imageUrl": "",
    "analysisConfig": {
      "range0_25": "It seems like there are quite a few differences in your perspectives. This is a great opportunity to start some interesting conversations and learn more about each other's worlds!",
      "range26_50": "You two have some common ground, but also areas where you see things differently. Exploring these differences can be a fun adventure and a way to grow even closer.",
      "range51_75": "You're on the same wavelength most of the time! You have a solid foundation of understanding. The few differences you have can add a little spice to your relationship.",
      "range76_100": "Wow, it's like you can read each other's minds! Your connection is incredibly strong. You share a deep understanding that is truly special."
    }
  },
  {
    "id": "official-iq-check",
    "title": "IQ Check (Just for Fun!)",
    "description": "A light-hearted quiz with some tricky questions to see who is the Sherlock of the pair!",
    "creatorName": "Marathi Bayko",
    "questions": [
      {
        "id": 1,
        "category": "Personality & Nature",
        "text": "How do you usually react when you’re angry?",
        "options": [
          "Become silent and distant",
          "Express it openly and talk it out",
          "Try to distract myself with other activities",
          "Need some time alone to cool down"
        ],
        "active": true
      },
      {
        "id": 2,
        "category": "Personality & Nature",
        "text": "Are you more of an introvert or an extrovert?",
        "options": [
          "Strongly introvert",
          "Mostly introvert",
          "A mix of both (ambivert)",
          "Mostly extrovert",
          "Strongly extrovert"
        ],
        "active": true
      },
      {
        "id": 3,
        "category": "Personality & Nature",
        "text": "How do you handle stress?",
        "options": [
          "Talk to friends/family",
          "Exercise or physical activity",
          "Indulge in hobbies",
          "Prefer to handle it alone"
        ],
        "active": true
      },
      {
        "id": 4,
        "category": "Personality & Nature",
        "text": "When making a decision, you primarily rely on:",
        "options": [
          "Logic and facts",
          "Gut feeling and intuition",
          "Advice from others",
          "Past experiences"
        ],
        "active": true
      },
      {
        "id": 5,
        "category": "Personality & Nature",
        "text": "Are you a planner or spontaneous?",
        "options": [
          "I plan everything in detail",
          "I have a rough plan",
          "I mostly go with the flow",
          "I am completely spontaneous"
        ],
        "active": true
      },
      {
        "id": 6,
        "category": "Habits & Lifestyle",
        "text": "Are you an early bird or a night owl?",
        "options": [
          "Early bird - Love the mornings",
          "Night owl - Most productive at night",
          "Flexible, depends on the day",
          "Neither, I just want more sleep!"
        ],
        "active": true
      },
      {
        "id": 7,
        "category": "Habits & Lifestyle",
        "text": "How often do you like to go out?",
        "options": [
          "Almost every weekend",
          "A few times a month",
          "Once a month is enough",
          "I prefer staying in"
        ],
        "active": true
      },
      {
        "id": 8,
        "category": "Habits & Lifestyle",
        "text": "Your ideal vacation is:",
        "options": [
          "A relaxing beach holiday",
          "An adventurous trip with hiking/sports",
          "Exploring a new city and its culture",
          "Staying home and chilling"
        ],
        "active": true
      },
      {
        "id": 9,
        "category": "Habits & Lifestyle",
        "text": "How important is cleanliness and organization to you?",
        "options": [
          "Very important, I like things tidy",
          "Somewhat important, but a little mess is okay",
          "Not very important",
          "I thrive in organized chaos"
        ],
        "active": true
      },
      {
        "id": 10,
        "category": "Habits & Lifestyle",
        "text": "When it comes to food, you are:",
        "options": [
          "An adventurous eater, love trying new things",
          "Happy with comfort food and classics",
          "A healthy eater",
          "Somewhat picky"
        ],
        "active": true
      }
    ],
    "isPublic": true,
    "isOfficial": true,
    "createdAt": "2025-11-05T15:31:00.956Z",
    "status": "approved",
    "imageUrl": "",
    "analysisConfig": {
      "range0_25": "It seems like there are quite a few differences in your perspectives. This is a great opportunity to start some interesting conversations and learn more about each other's worlds!",
      "range26_50": "You two have some common ground, but also areas where you see things differently. Exploring these differences can be a fun adventure and a way to grow even closer.",
      "range51_75": "You're on the same wavelength most of the time! You have a solid foundation of understanding. The few differences you have can add a little spice to your relationship.",
      "range76_100": "Wow, it's like you can read each other's minds! Your connection is incredibly strong. You share a deep understanding that is truly special."
    }
  },
  {
    "id": "official-honesty-loyalty-check",
    "title": "Couples Honesty & Loyalty Check",
    "description": "A serious quiz for couples to explore the foundations of their trust and commitment.",
    "creatorName": "Marathi Bayko",
    "questions": [
      {
        "id": 11,
        "category": "Emotions & Love Language",
        "text": "How do you primarily express love and affection?",
        "options": [
          "Through words of affirmation and compliments",
          "By spending quality time together",
          "By giving thoughtful gifts",
          "Through physical touch (hugs, etc.)",
          "Through acts of service (doing things for them)"
        ],
        "active": true
      },
      {
        "id": 12,
        "category": "Emotions & Love Language",
        "text": "During a fight, you prefer to:",
        "options": [
          "Talk and resolve it immediately",
          "Take a break and talk when calm",
          "Send a text to explain my point of view",
          "Stay silent for a while"
        ],
        "active": true
      },
      {
        "id": 13,
        "category": "Emotions & Love Language",
        "text": "How do you prefer to receive an apology?",
        "options": [
          "A sincere \"sorry\" is enough",
          "I need to see a change in behavior",
          "A heartfelt conversation about what happened",
          "A gesture like a gift or favor"
        ],
        "active": true
      },
      {
        "id": 14,
        "category": "Emotions & Love Language",
        "text": "What makes you feel most appreciated?",
        "options": [
          "When my efforts are verbally acknowledged",
          "When someone does something thoughtful for me",
          "When I get a surprise gift",
          "When someone spends uninterrupted time with me"
        ],
        "active": true
      },
      {
        "id": 15,
        "category": "Emotions & Love Language",
        "text": "How open are you with your feelings?",
        "options": [
          "Very open, an open book",
          "I share with people I trust",
          "I tend to keep my feelings to myself",
          "It takes time for me to open up"
        ],
        "active": true
      },
      {
        "id": 16,
        "category": "Values & Family",
        "text": "How important is your family's approval in major life decisions?",
        "options": [
          "Extremely important, their opinion is final",
          "Very important, I always consider it",
          "Somewhat important, but I make the final call",
          "Not important, my life is my own"
        ],
        "active": true
      },
      {
        "id": 17,
        "category": "Values & Family",
        "text": "Your ideal family structure for the future is:",
        "options": [
          "Living in a joint family",
          "Living in a nuclear family, but close to parents",
          "Living in a nuclear family, independently",
          "I haven't thought about it"
        ],
        "active": true
      },
      {
        "id": 18,
        "category": "Values & Family",
        "text": "How do you view money in a relationship?",
        "options": [
          "Finances should be completely shared",
          "We should keep our finances separate",
          "A mix of both - some shared, some separate",
          "It should be managed by whoever is better at it"
        ],
        "active": true
      },
      {
        "id": 19,
        "category": "Values & Family",
        "text": "What role does religion or spirituality play in your life?",
        "options": [
          "A very central and guiding role",
          "It's part of my culture and traditions",
          "I am spiritual but not religious",
          "It doesn't play a significant role"
        ],
        "active": true
      },
      {
        "id": 20,
        "category": "Values & Family",
        "text": "How do you prefer to spend holidays and festivals?",
        "options": [
          "With a large family gathering",
          "With a small group of close family/friends",
          "As a quiet day for myself/with my partner",
          "Traveling to a new place"
        ],
        "active": true
      }
    ],
    "isPublic": true,
    "isOfficial": true,
    "createdAt": "2025-11-05T15:31:00.956Z",
    "status": "approved",
    "imageUrl": "",
    "analysisConfig": {
      "range0_25": "It seems like there are quite a few differences in your perspectives. This is a great opportunity to start some interesting conversations and learn more about each other's worlds!",
      "range26_50": "You two have some common ground, but also areas where you see things differently. Exploring these differences can be a fun adventure and a way to grow even closer.",
      "range51_75": "You're on the same wavelength most of the time! You have a solid foundation of understanding. The few differences you have can add a little spice to your relationship.",
      "range76_100": "Wow, it's like you can read each other's minds! Your connection is incredibly strong. You share a deep understanding that is truly special."
    }
  }
];
