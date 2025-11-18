import { QuizTemplate } from '../types.ts';
import { initialQuestions } from './questions.ts';

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
      }
    ],
    "isPublic": true,
    "isOfficial": true,
    "createdAt": "2025-11-18T01:22:13.472Z",
    "status": "approved",
    "imageUrl": "https://i.postimg.cc/3wcqnCZG/1000719284.jpg",
    "language": "english",
    "keywords": [
      "standard",
      "comprehensive",
      "relationship",
      "test",
      "compatibility"
    ],
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
    "createdAt": "2025-11-18T01:22:13.472Z",
    "status": "approved",
    "imageUrl": "https://i.postimg.cc/FRrp4fsk/100071916.jpg",
    "language": "english",
    "keywords": [
      "girlfriend",
      "boyfriend",
      "gf",
      "bf",
      "dating",
      "couple",
      "romantic"
    ],
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
      }
    ],
    "isPublic": true,
    "isOfficial": true,
    "createdAt": "2025-11-18T01:22:13.472Z",
    "status": "approved",
    "imageUrl": "https://i.postimg.cc/pXwBdcXw/100071916-1.jpg",
    "language": "english",
    "keywords": [
      "husband",
      "wife",
      "married",
      "couple",
      "lifelong",
      "spouse"
    ],
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
    "createdAt": "2025-11-18T01:22:13.472Z",
    "status": "approved",
    "imageUrl": "https://i.postimg.cc/Z5fKc2v4/100071917.jpg",
    "language": "english",
    "keywords": [
      "friends",
      "bestie",
      "friendship",
      "bff"
    ],
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
    "createdAt": "2025-11-18T01:22:13.472Z",
    "status": "approved",
    "imageUrl": "https://i.postimg.cc/7Y8VHQ6y/100071918.jpg",
    "language": "english",
    "keywords": [
      "siblings",
      "brother",
      "sister",
      "family"
    ],
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
    "createdAt": "2025-11-18T01:22:13.472Z",
    "status": "approved",
    "imageUrl": "https://i.postimg.cc/2y8ChxjN/100071918-1.jpg",
    "language": "english",
    "keywords": [
      "crush",
      "love",
      "secret",
      "admirer",
      "romantic"
    ],
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
    "createdAt": "2025-11-18T01:22:13.472Z",
    "status": "approved",
    "imageUrl": "https://i.postimg.cc/y8XBQ5JH/100071919-2.jpg",
    "language": "english",
    "keywords": [
      "character",
      "verification",
      "values",
      "principles",
      "ethics"
    ],
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
    "createdAt": "2025-11-18T01:22:13.472Z",
    "status": "approved",
    "imageUrl": "https://i.postimg.cc/KzpHp7rT/100071919.jpg",
    "language": "english",
    "keywords": [
      "loyalty",
      "trust",
      "commitment",
      "honesty",
      "relationship"
    ],
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
    "createdAt": "2025-11-18T01:22:13.472Z",
    "status": "approved",
    "imageUrl": "https://i.postimg.cc/v8jKWzmR/100071919-1.jpg",
    "language": "english",
    "keywords": [
      "teacher",
      "student",
      "education",
      "school",
      "rapport"
    ],
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
    "createdAt": "2025-11-18T01:22:13.472Z",
    "status": "approved",
    "imageUrl": "https://i.postimg.cc/mDqG1Wnv/100071923-2.jpg",
    "language": "english",
    "keywords": [
      "employee",
      "manager",
      "work",
      "office",
      "team",
      "synergy"
    ],
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
    "createdAt": "2025-11-18T01:22:13.472Z",
    "status": "approved",
    "imageUrl": "https://i.postimg.cc/NGWNyjdd/100071923-1.jpg",
    "language": "english",
    "keywords": [
      "iq",
      "check",
      "fun",
      "tricky",
      "sherlock",
      "brain"
    ],
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
    "createdAt": "2025-11-18T01:22:13.472Z",
    "status": "approved",
    "imageUrl": "https://i.postimg.cc/0j6pk7gR/100071923.jpg",
    "language": "english",
    "keywords": [
      "honesty",
      "loyalty",
      "couple",
      "trust",
      "commitment",
      "relationship"
    ],
    "analysisConfig": {
      "range0_25": "It seems like there are quite a few differences in your perspectives. This is a great opportunity to start some interesting conversations and learn more about each other's worlds!",
      "range26_50": "You two have some common ground, but also areas where you see things differently. Exploring these differences can be a fun adventure and a way to grow even closer.",
      "range51_75": "You're on the same wavelength most of the time! You have a solid foundation of understanding. The few differences you have can add a little spice to your relationship.",
      "range76_100": "Wow, it's like you can read each other's minds! Your connection is incredibly strong. You share a deep understanding that is truly special."
    }
  },
  {
    "id": "official-standard-mr",
    "title": "तुमच्यातले समान गुण ओळखा (in Marathi)",
    "description": "तुमच्या नात्याच्या प्रत्येक बाजूचा शोध घेण्यासाठी एक भारी क्विझ, तुमच्यातल्या समानता ओळ्खण्या साठी आत्ताच भविष्य जुळतंय का ते चेक करा . ",
    "creatorName": "Marathi Bayko",
    "questions": [
      {
        "id": 1,
        "category": "Personality & Nature",
        "text": "तुम्ही निर्णय कसे घेता?\n",
        "options": [
          " अंदाजाने ",
          "लॉजिक वापरून",
          "मोठ्यांच्या सल्याने ",
          "भावना द्वारे"
        ],
        "active": true
      },
      {
        "id": 2,
        "category": "Personality & Nature",
        "text": "नात्यात तुम्ही सर्वात जास्त काय महत्त्वाचे मानता ?",
        "options": [
          "विश्वास ",
          "संवाद ",
          "स्थिरता",
          "भांडण ",
          "प्रेम "
        ],
        "active": true
      },
      {
        "id": 3,
        "category": "Personality & Nature",
        "text": "⁠राग आल्यावर तुमची प्रतिक्रिया काय असते ?",
        "options": [
          "चिडचिड करणे ",
          "दूर जाणे ",
          "शांत राहणे",
          "राग काढून टाकणं "
        ],
        "active": true
      },
      {
        "id": 4,
        "category": "Personality & Nature",
        "text": "⁠रिकाम्या वेळात तुम्ही काय करायला आवडते ? ",
        "options": [
          " मित्रांसोबत वेळ घालवणे",
          "एकटे राहणे",
          " चित्रपट/हॉबी",
          " फिरायला जाणे "
        ],
        "active": true
      },
      {
        "id": 5,
        "category": "Personality & Nature",
        "text": "⁠तुम्हाला कोणत्या प्रकारचा पार्टनर आकर्षित करतो ?",
        "options": [
          " मॅच्युअर व शांत",
          "मजेशीर ",
          " समजून घेणारा",
          "अंबेशियस "
        ],
        "active": true
      },
      {
        "id": 6,
        "category": "Habits & Lifestyle",
        "text": " तुमची बोलण्याची स्टाइल कशी आहे ?",
        "options": [
          "थेट आणि स्पष्ट",
          " शांतपणे",
          "जशास तसे ",
          "वरील सर्व (परिस्थितीनुसार)"
        ],
        "active": true
      },
      {
        "id": 7,
        "category": "Habits & Lifestyle",
        "text": "तुम्हाला किती वेळा बाहेर जायला आवडते?",
        "options": [
          "जवळजवळ प्रत्येक आठवड्यात",
          "महिन्यातून काही वेळा",
          "महिन्यातून एकदा पुरेसे आहे",
          "मला घरी राहणे पसंत आहे"
        ],
        "active": true
      },
      {
        "id": 8,
        "category": "Habits & Lifestyle",
        "text": "तुमची आदर्श सुट्टी कोणती आहे?",
        "options": [
          "एक आरामदायी समुद्रकिनाऱ्यावरील सुट्टी",
          "ट्रेकिंग/खेळांसह एक साहसी सहल",
          "नवीन शहर आणि त्याची संस्कृती शोधणे",
          "घरी राहून आराम करणे"
        ],
        "active": true
      },
      {
        "id": 9,
        "category": "Habits & Lifestyle",
        "text": "तुमच्यासाठी स्वच्छता किती महत्त्वाची आहे?",
        "options": [
          "खूप महत्त्वाचे, मला गोष्टी व्यवस्थित आवडतात",
          "थोडं महत्त्वाचं, पण थोडा पसारा चालेल",
          "फार महत्त्वाचे नाही",
          "मी ह्या गोष्टीचा कधी विचारच नाही केला"
        ],
        "active": true
      },
      {
        "id": 10,
        "category": "Habits & Lifestyle",
        "text": "जेव्हा खाण्याचा विषय येतो, तेव्हा तुम्ही कसे असता?",
        "options": [
          "नवीन गोष्टी ट्राय करायला आवडतात (foodie) ",
          "फास्ट फूड बाहेरील खाणे खूप आवडते ",
          "आरोग्यदायी खायला आवडते ",
          "घरचे बनवलेलं जास्त आवडत "
        ],
        "active": true
      },
      {
        "id": 11,
        "category": "Emotions & Love Language",
        "text": "तुम्ही प्रामुख्याने प्रेम आणि आपुलकी कशी व्यक्त करता?",
        "options": [
          "पुष्टीकरण आणि कौतुकाच्या शब्दांद्वारे",
          "एकत्र दर्जेदार वेळ घालवून",
          "चांगली भेटवस्तू देऊन ",
          "शारीरिक स्पर्शाद्वारे (मिठी, इत्यादी)",
          "सेवा कार्याद्वारे (त्यांच्यासाठी काहीतरी करून)"
        ],
        "active": true
      },
      {
        "id": 12,
        "category": "Emotions & Love Language",
        "text": "भांडणाच्या वेळी, तुम्ही काय करणे पसंत करता?",
        "options": [
          "ताबडतोब बोलून ते सोडवणे",
          "विश्रांती घेऊन शांत झाल्यावर बोलणे",
          "माझा मुद्दा समजावण्यासाठी मजकूर पाठवणे",
          "थोड्या वेळासाठी शांत राहणे"
        ],
        "active": true
      },
      {
        "id": 13,
        "category": "Emotions & Love Language",
        "text": "तुम्हाला माफी कशी स्वीकारायला आवडते?",
        "options": [
          "एक प्रामाणिक \"सॉरी\" पुरेसे आहे",
          "मला वर्तनात बदल पाहण्याची गरज आहे",
          "काय झाले याबद्दल मनापासून संभाषण",
          "भेटवस्तू किंवा उपकारासारखा हावभाव"
        ],
        "active": true
      },
      {
        "id": 14,
        "category": "Emotions & Love Language",
        "text": "तुम्हाला सर्वात जास्त कौतुक झाल्यासारखे केव्हा वाटते?",
        "options": [
          "जेव्हा माझ्या प्रयत्नांची तोंडी कबुली दिली जाते",
          "जेव्हा कोणी माझ्यासाठी काहीतरी विचारपूर्वक करते",
          "जेव्हा मला आश्चर्यकारक भेटवस्तू मिळते",
          "जेव्हा कोणी माझ्यासोबत अखंड वेळ घालवते"
        ],
        "active": true
      },
      {
        "id": 15,
        "category": "Emotions & Love Language",
        "text": "तुम्ही तुमच्या भावनांबद्दल किती मोकळे आहात?",
        "options": [
          "खूप मोकळा, एक उघडे पुस्तक",
          "मी ज्या लोकांवर विश्वास ठेवतो त्यांच्याशी शेअर करतो",
          "मला सहसा जास्त कोणाला share करायला आवडत नाही ",
          "मला मोकळे होण्यासाठी वेळ लागतो"
        ],
        "active": true
      },
      {
        "id": 17,
        "category": "Values & Family",
        "text": "भविष्यासाठी तुमची आदर्श कौटुंबिक रचना कोणती आहे?",
        "options": [
          "संयुक्त कुटुंबात राहणे",
          "विभक्त कुटुंबात राहणे, पण पालकांच्या जवळ",
          "विभक्त कुटुंबात राहणे, स्वतंत्रपणे",
          "मी याचा विचार केलेला नाही"
        ],
        "active": true
      },
      {
        "id": 18,
        "category": "Values & Family",
        "text": "तुम्ही नात्यातील पैशाकडे कसे पाहता?",
        "options": [
          "आर्थिक व्यवहार पूर्णपणे सामायिक केले पाहिजेत",
          "आपण आपले आर्थिक व्यवहार वेगळे ठेवले पाहिजेत",
          "दोन्हीचे मिश्रण - काही सामायिक, काही वेगळे",
          "जो कोणी यात चांगला असेल त्याने ते व्यवस्थापित केले पाहिजे"
        ],
        "active": true
      },
      {
        "id": 20,
        "category": "Values & Family",
        "text": "तुम्ही सुट्ट्या आणि सण कसे घालवणे पसंत करता?",
        "options": [
          "सहकुटुंब ",
          "मित्रांसोबत ",
          "एकांतात ",
          "यापैकी नाही "
        ],
        "active": true
      }
    ],
    "isPublic": true,
    "isOfficial": true,
    "createdAt": "2025-11-18T01:22:13.472Z",
    "status": "approved",
    "imageUrl": "https://i.postimg.cc/3wcqnCZG/1000719284.jpg",
    "language": "marathi",
    "keywords": [
      "standard",
      "comprehensive",
      "relationship",
      "test",
      "compatibility",
      "मानक",
      "सुसंगतता",
      "चाचणी"
    ],
    "analysisConfig": {
      "range0_25": "असे दिसते की एकमेकांबद्दल शोधण्यासारख्या बऱ्याच गोष्टी आहेत! प्रत्येक जुळणारे उत्तर एका नवीन संभाषणाचे दार आहे. शोध सुरू करा!",
      "range26_50": "तुमच्यात साम्य आणि फरकांचे चांगले मिश्रण आहे. हेच एका नात्याला रोमांचक बनवते! एकत्र शिकण्याची आणि वाढण्याची ही एक उत्तम संधी आहे.",
      "range51_75": "तुम्ही दोघे नक्कीच ताळमेळात आहात! तुमचे नाते मजबूत आहे आणि तुम्ही एकमेकांना चांगले समजता. हे सुंदर बंधन असेच जपत रहा.",
      "range76_100": "अविश्वसनीय! तुमची एकमेकांबद्दलची समज खूप खोल आहे. असे मजबूत नाते क्वचितच दिसते. तुम्ही खऱ्या अर्थाने एक ‘पॉवर कपल’ आहात!"
    }
  },
  {
    "id": "official-gf-bf-mr",
    "title": "प्रेयसी / प्रियकर साठी (in Marathi)",
    "description": "प्रेयसी आणि प्रियकरांसाठी त्यांचे नाते तपासण्यासाठी एक मजेदार आणि रोमँटिक क्विझ.",
    "creatorName": "Marathi Bayko",
    "questions": [
      {
        "id": 1,
        "category": "Personality & Nature",
        "text": "तुम्ही रागावल्यावर सहसा कशी प्रतिक्रिया देता?",
        "options": [
          "शांत आणि दूर होता",
          "ते उघडपणे व्यक्त करून चर्चा करता",
          "स्वतःला इतर कामांमध्ये विचलित करण्याचा प्रयत्न करता",
          "शांत होण्यासाठी थोडा वेळ एकटे राहता"
        ],
        "active": true
      },
      {
        "id": 2,
        "category": "Personality & Nature",
        "text": "तुम्ही अधिक अंतर्मुखी आहात की बहिर्मुखी?",
        "options": [
          "पूर्णपणे अंतर्मुखी",
          "बहुतेक अंतर्मुखी",
          "दोन्हीचे मिश्रण (अँबिवर्ट)",
          "बहुतेक बहिर्मुखी",
          "पूर्णपणे बहिर्मुखी"
        ],
        "active": true
      },
      {
        "id": 3,
        "category": "Personality & Nature",
        "text": "तुम्ही तणाव कसा हाताळता?",
        "options": [
          "मित्र/कुटुंबाशी बोलता",
          "व्यायाम किंवा शारीरिक हालचाल करता",
          "छंदांमध्ये रमता",
          "एकटे हाताळणे पसंत करता"
        ],
        "active": true
      },
      {
        "id": 4,
        "category": "Personality & Nature",
        "text": "निर्णय घेताना, तुम्ही प्रामुख्याने कशावर अवलंबून असता?",
        "options": [
          "तर्क आणि तथ्य",
          "अंतर्ज्ञान आणि मनाचा कौल",
          "इतरांचा सल्ला",
          "मागील अनुभव"
        ],
        "active": true
      },
      {
        "id": 5,
        "category": "Personality & Nature",
        "text": "तुम्ही नियोजक आहात की उत्स्फूर्त?",
        "options": [
          "मी प्रत्येक गोष्टीचे तपशीलवार नियोजन करतो",
          "माझ्याकडे एक ढोबळ योजना असते",
          "मी बहुतेक प्रवाहाबरोबर जातो",
          "मी पूर्णपणे उत्स्फूर्त आहे"
        ],
        "active": true
      },
      {
        "id": 6,
        "category": "Habits & Lifestyle",
        "text": "तुम्ही सकाळी लवकर उठणारे आहात की रात्री जागणारे?",
        "options": [
          "सकाळी लवकर उठणारा - सकाळ आवडते",
          "रात्री जागणार - रात्री सर्वात जास्त उत्पादक",
          "लवचिक, दिवसावर अवलंबून",
          "दोन्ही नाही, मला फक्त जास्त झोप हवी आहे!"
        ],
        "active": true
      },
      {
        "id": 7,
        "category": "Habits & Lifestyle",
        "text": "तुम्हाला किती वेळा बाहेर जायला आवडते?",
        "options": [
          "जवळजवळ प्रत्येक आठवड्यात",
          "महिन्यातून काही वेळा",
          "महिन्यातून एकदा पुरेसे आहे",
          "मी घरी राहणे पसंत करतो"
        ],
        "active": true
      },
      {
        "id": 8,
        "category": "Habits & Lifestyle",
        "text": "तुमची आदर्श सुट्टी कोणती आहे?",
        "options": [
          "एक आरामदायी समुद्रकिनाऱ्यावरील सुट्टी",
          "ट्रेकिंग/खेळांसह एक साहसी सहल",
          "नवीन शहर आणि त्याची संस्कृती शोधणे",
          "घरी राहून आराम करणे"
        ],
        "active": true
      },
      {
        "id": 9,
        "category": "Habits & Lifestyle",
        "text": "तुमच्यासाठी स्वच्छता आणि संघटना किती महत्त्वाची आहे?",
        "options": [
          "खूप महत्त्वाचे, मला गोष्टी व्यवस्थित आवडतात",
          "थोडं महत्त्वाचं, पण थोडा पसारा चालेल",
          "फार महत्त्वाचे नाही",
          "मी संघटित गोंधळात जास्त काम करतो"
        ],
        "active": true
      },
      {
        "id": 10,
        "category": "Habits & Lifestyle",
        "text": "जेव्हा खाण्याचा विषय येतो, तेव्हा तुम्ही कसे असता?",
        "options": [
          "एक साहसी खाणारा, नवीन गोष्टी ट्राय करायला आवडतात",
          "कम्फर्ट फूड आणि क्लासिक्सने आनंदी",
          "एक आरोग्यदायी खाणारा",
          "थोडा चोखंदळ"
        ],
        "active": true
      },
      {
        "id": 11,
        "category": "Emotions & Love Language",
        "text": "तुम्ही प्रामुख्याने प्रेम आणि आपुलकी कशी व्यक्त करता?",
        "options": [
          "पुष्टीकरण आणि कौतुकाच्या शब्दांद्वारे",
          "एकत्र दर्जेदार वेळ घालवून",
          "विचारपूर्वक भेटवस्तू देऊन",
          "शारीरिक स्पर्शाद्वारे (मिठी, इत्यादी)",
          "सेवा कार्याद्वारे (त्यांच्यासाठी काहीतरी करून)"
        ],
        "active": true
      },
      {
        "id": 12,
        "category": "Emotions & Love Language",
        "text": "भांडणाच्या वेळी, तुम्ही काय करणे पसंत करता?",
        "options": [
          "ताबडतोब बोलून ते सोडवणे",
          "विश्रांती घेऊन शांत झाल्यावर बोलणे",
          "माझा मुद्दा समजावण्यासाठी मजकूर पाठवणे",
          "थोड्या वेळासाठी शांत राहणे"
        ],
        "active": true
      },
      {
        "id": 13,
        "category": "Emotions & Love Language",
        "text": "तुम्हाला माफी कशी स्वीकारायला आवडते?",
        "options": [
          "एक प्रामाणिक \"सॉरी\" पुरेसे आहे",
          "मला वर्तनात बदल पाहण्याची गरज आहे",
          "काय झाले याबद्दल मनापासून संभाषण",
          "भेटवस्तू किंवा उपकारासारखा हावभाव"
        ],
        "active": true
      },
      {
        "id": 14,
        "category": "Emotions & Love Language",
        "text": "तुम्हाला सर्वात जास्त कौतुक झाल्यासारखे केव्हा वाटते?",
        "options": [
          "जेव्हा माझ्या प्रयत्नांची तोंडी कबुली दिली जाते",
          "जेव्हा कोणी माझ्यासाठी काहीतरी विचारपूर्वक करते",
          "जेव्हा मला आश्चर्यकारक भेटवस्तू मिळते",
          "जेव्हा कोणी माझ्यासोबत अखंड वेळ घालवते"
        ],
        "active": true
      },
      {
        "id": 15,
        "category": "Emotions & Love Language",
        "text": "तुम्ही तुमच्या भावनांबद्दल किती मोकळे आहात?",
        "options": [
          "खूप मोकळा, एक उघडे पुस्तक",
          "मी ज्या लोकांवर विश्वास ठेवतो त्यांच्याशी शेअर करतो",
          "मी माझ्या भावना स्वतःकडे ठेवतो",
          "मला मोकळे होण्यासाठी वेळ लागतो"
        ],
        "active": true
      }
    ],
    "isPublic": true,
    "isOfficial": true,
    "createdAt": "2025-11-18T01:22:13.472Z",
    "status": "approved",
    "imageUrl": "https://i.postimg.cc/FRrp4fsk/100071916.jpg",
    "language": "marathi",
    "keywords": [
      "girlfriend",
      "boyfriend",
      "gf",
      "bf",
      "dating",
      "couple",
      "romantic",
      "प्रेयसी",
      "प्रियकर"
    ],
    "analysisConfig": {
      "range0_25": "असे दिसते की तुमच्या दृष्टिकोनात बरेच फरक आहेत. काही मनोरंजक संभाषणे सुरू करण्याची आणि एकमेकांच्या जगाबद्दल अधिक जाणून घेण्याची ही एक उत्तम संधी आहे!",
      "range26_50": "तुमच्यात काही साम्य आहे, परंतु अशी क्षेत्रे देखील आहेत जिथे तुम्ही गोष्टी वेगळ्या प्रकारे पाहता. हे फरक शोधणे एक मजेदार साहस आणि एकत्र वाढण्याचा एक मार्ग असू शकतो.",
      "range51_75": "तुम्ही बहुतेक वेळा एकाच विचारांचे असता! तुमच्यात समजुतीचा एक भक्कम पाया आहे. तुमच्यातील काही फरक तुमच्या नात्यात थोडी रंगत आणू शकतात.",
      "range76_100": "व्वा, जणू काही तुम्ही एकमेकांचे मन वाचू शकता! तुमचे नाते अविश्वसनीयपणे मजबूत आहे. तुम्ही एक खोल समज शेअर करता जी खरोखरच खास आहे."
    }
  },
  {
    "id": "official-husband-wife-mr",
    "title": "पती / पत्नी साठी (in Marathi)",
    "description": "विवाहित जोडप्यांसाठी एकमेकांना पुन्हा शोधण्यासाठी आणि त्यांचे आयुष्यभराचे बंधन अधिक मजबूत करण्यासाठी एक खोल क्विझ.",
    "creatorName": "Marathi Bayko",
    "questions": [
      {
        "id": 1,
        "category": "Personality & Nature",
        "text": "तुम्ही रागावल्यावर सहसा कशी प्रतिक्रिया देता?",
        "options": [
          "शांत आणि दूरस्थ होता",
          "ते उघडपणे व्यक्त करून चर्चा करता",
          "स्वतःला इतर कामांमध्ये विचलित करण्याचा प्रयत्न करता",
          "शांत होण्यासाठी थोडा वेळ एकटे राहता"
        ],
        "active": true
      },
      {
        "id": 2,
        "category": "Personality & Nature",
        "text": "तुम्ही अधिक अंतर्मुखी आहात की बहिर्मुखी?",
        "options": [
          "पूर्णपणे अंतर्मुखी",
          "बहुतेक अंतर्मुखी",
          "दोन्हीचे मिश्रण (अँबिवर्ट)",
          "बहुतेक बहिर्मुखी",
          "पूर्णपणे बहिर्मुखी"
        ],
        "active": true
      },
      {
        "id": 3,
        "category": "Personality & Nature",
        "text": "तुम्ही तणाव कसा हाताळता?",
        "options": [
          "मित्र/कुटुंबाशी बोलता",
          "व्यायाम किंवा शारीरिक हालचाल करता",
          "छंदांमध्ये रमता",
          "एकटे हाताळणे पसंत करता"
        ],
        "active": true
      },
      {
        "id": 4,
        "category": "Personality & Nature",
        "text": "निर्णय घेताना, तुम्ही प्रामुख्याने कशावर अवलंबून असता?",
        "options": [
          "तर्क आणि तथ्य",
          "अंतर्ज्ञान आणि मनाचा कौल",
          "इतरांचा सल्ला",
          "मागील अनुभव"
        ],
        "active": true
      },
      {
        "id": 5,
        "category": "Personality & Nature",
        "text": "तुम्ही नियोजक आहात की उत्स्फूर्त?",
        "options": [
          "मी प्रत्येक गोष्टीचे तपशीलवार नियोजन करतो",
          "माझ्याकडे एक ढोबळ योजना असते",
          "मी बहुतेक प्रवाहाबरोबर जातो",
          "मी पूर्णपणे उत्स्फूर्त आहे"
        ],
        "active": true
      },
      {
        "id": 6,
        "category": "Habits & Lifestyle",
        "text": "तुम्ही सकाळी लवकर उठणारे आहात की रात्री जागणारे?",
        "options": [
          "सकाळी लवकर उठणारा - सकाळ आवडते",
          "रात्री जागणार - रात्री सर्वात जास्त उत्पादक",
          "लवचिक, दिवसावर अवलंबून",
          "दोन्ही नाही, मला फक्त जास्त झोप हवी आहे!"
        ],
        "active": true
      },
      {
        "id": 7,
        "category": "Habits & Lifestyle",
        "text": "तुम्हाला किती वेळा बाहेर जायला आवडते?",
        "options": [
          "जवळजवळ प्रत्येक आठवड्यात",
          "महिन्यातून काही वेळा",
          "महिन्यातून एकदा पुरेसे आहे",
          "मी घरी राहणे पसंत करतो"
        ],
        "active": true
      },
      {
        "id": 8,
        "category": "Habits & Lifestyle",
        "text": "तुमची आदर्श सुट्टी कोणती आहे?",
        "options": [
          "एक आरामदायी समुद्रकिनाऱ्यावरील सुट्टी",
          "ट्रेकिंग/खेळांसह एक साहसी सहल",
          "नवीन शहर आणि त्याची संस्कृती शोधणे",
          "घरी राहून आराम करणे"
        ],
        "active": true
      },
      {
        "id": 9,
        "category": "Habits & Lifestyle",
        "text": "तुमच्यासाठी स्वच्छता आणि संघटना किती महत्त्वाची आहे?",
        "options": [
          "खूप महत्त्वाचे, मला गोष्टी व्यवस्थित आवडतात",
          "थोडं महत्त्वाचं, पण थोडा पसारा चालेल",
          "फार महत्त्वाचे नाही",
          "मी संघटित गोंधळात जास्त काम करतो"
        ],
        "active": true
      },
      {
        "id": 10,
        "category": "Habits & Lifestyle",
        "text": "जेव्हा खाण्याचा विषय येतो, तेव्हा तुम्ही कसे असता?",
        "options": [
          "एक साहसी खाणारा, नवीन गोष्टी ट्राय करायला आवडतात",
          "कम्फर्ट फूड आणि क्लासिक्सने आनंदी",
          "एक आरोग्यदायी खाणारा",
          "थोडा चोखंदळ"
        ],
        "active": true
      },
      {
        "id": 11,
        "category": "Emotions & Love Language",
        "text": "तुम्ही प्रामुख्याने प्रेम आणि आपुलकी कशी व्यक्त करता?",
        "options": [
          "पुष्टीकरण आणि कौतुकाच्या शब्दांद्वारे",
          "एकत्र दर्जेदार वेळ घालवून",
          "विचारपूर्वक भेटवस्तू देऊन",
          "शारीरिक स्पर्शाद्वारे (मिठी, इत्यादी)",
          "सेवा कार्याद्वारे (त्यांच्यासाठी काहीतरी करून)"
        ],
        "active": true
      },
      {
        "id": 12,
        "category": "Emotions & Love Language",
        "text": "भांडणाच्या वेळी, तुम्ही काय करणे पसंत करता?",
        "options": [
          "ताबडतोब बोलून ते सोडवणे",
          "विश्रांती घेऊन शांत झाल्यावर बोलणे",
          "माझा मुद्दा समजावण्यासाठी मजकूर पाठवणे",
          "थोड्या वेळासाठी शांत राहणे"
        ],
        "active": true
      },
      {
        "id": 13,
        "category": "Emotions & Love Language",
        "text": "तुम्हाला माफी कशी स्वीकारायला आवडते?",
        "options": [
          "एक प्रामाणिक \"सॉरी\" पुरेसे आहे",
          "मला वर्तनात बदल पाहण्याची गरज आहे",
          "काय झाले याबद्दल मनापासून संभाषण",
          "भेटवस्तू किंवा उपकारासारखा हावभाव"
        ],
        "active": true
      },
      {
        "id": 14,
        "category": "Emotions & Love Language",
        "text": "तुम्हाला सर्वात जास्त कौतुक झाल्यासारखे केव्हा वाटते?",
        "options": [
          "जेव्हा माझ्या प्रयत्नांची तोंडी कबुली दिली जाते",
          "जेव्हा कोणी माझ्यासाठी काहीतरी विचारपूर्वक करते",
          "जेव्हा मला आश्चर्यकारक भेटवस्तू मिळते",
          "जेव्हा कोणी माझ्यासोबत अखंड वेळ घालवते"
        ],
        "active": true
      },
      {
        "id": 15,
        "category": "Emotions & Love Language",
        "text": "तुम्ही तुमच्या भावनांबद्दल किती मोकळे आहात?",
        "options": [
          "खूप मोकळा, एक उघडे पुस्तक",
          "मी ज्या लोकांवर विश्वास ठेवतो त्यांच्याशी शेअर करतो",
          "मी माझ्या भावना स्वतःकडे ठेवतो",
          "मला मोकळे होण्यासाठी वेळ लागतो"
        ],
        "active": true
      },
      {
        "id": 16,
        "category": "Values & Family",
        "text": "मोठ्या आयुष्याच्या निर्णयात तुमच्या कुटुंबाची संमती किती महत्त्वाची आहे?",
        "options": [
          "अत्यंत महत्त्वाचे, त्यांचे मत अंतिम आहे",
          "खूप महत्त्वाचे, मी नेहमी त्याचा विचार करतो",
          "थोडं महत्त्वाचं, पण अंतिम निर्णय मीच घेतो",
          "महत्वाचे नाही, माझे आयुष्य माझे आहे"
        ],
        "active": true
      }
    ],
    "isPublic": true,
    "isOfficial": true,
    "createdAt": "2025-11-18T01:22:13.472Z",
    "status": "approved",
    "imageUrl": "https://i.postimg.cc/pXwBdcXw/100071916-1.jpg",
    "language": "marathi",
    "keywords": [
      "husband",
      "wife",
      "married",
      "couple",
      "spouse",
      "पती",
      "पत्नी",
      "विवाहित"
    ],
    "analysisConfig": {
      "range0_25": "असे दिसते की तुमच्या दृष्टिकोनात बरेच फरक आहेत. काही मनोरंजक संभाषणे सुरू करण्याची आणि एकमेकांच्या जगाबद्दल अधिक जाणून घेण्याची ही एक उत्तम संधी आहे!",
      "range26_50": "तुमच्यात काही साम्य आहे, परंतु अशी क्षेत्रे देखील आहेत जिथे तुम्ही गोष्टी वेगळ्या प्रकारे पाहता. हे फरक शोधणे एक मजेदार साहस आणि एकत्र वाढण्याचा एक मार्ग असू शकतो.",
      "range51_75": "तुम्ही बहुतेक वेळा एकाच विचारांचे असता! तुमच्यात समजुतीचा एक भक्कम पाया आहे. तुमच्यातील काही फरक तुमच्या नात्यात थोडी रंगत आणू शकतात.",
      "range76_100": "व्वा, जणू काही तुम्ही एकमेकांचे मन वाचू शकता! तुमचे नाते अविश्वसनीयपणे मजबूत आहे. तुम्ही एक खोल समज शेअर करता जी खरोखरच खास आहे."
    }
  },
  {
    "id": "official-friends-mr",
    "title": "मित्रांसाठी (in Marathi)",
    "description": "तुम्ही तुमच्या जिवलग मित्राला किती चांगले ओळखता? तुमची मैत्री तपासण्यासाठी आणि काही हसरे क्षण शेअर करण्यासाठी एक परिपूर्ण क्विझ.",
    "creatorName": "Marathi Bayko",
    "questions": [
      {
        "id": 1,
        "category": "Personality & Nature",
        "text": "तुम्ही रागावल्यावर सहसा कशी प्रतिक्रिया देता?",
        "options": [
          "शांत आणि दूरस्थ होता",
          "ते उघडपणे व्यक्त करून चर्चा करता",
          "स्वतःला इतर कामांमध्ये विचलित करण्याचा प्रयत्न करता",
          "शांत होण्यासाठी थोडा वेळ एकटे राहता"
        ],
        "active": true
      },
      {
        "id": 2,
        "category": "Personality & Nature",
        "text": "तुम्ही अधिक अंतर्मुखी आहात की बहिर्मुखी?",
        "options": [
          "पूर्णपणे अंतर्मुखी",
          "बहुतेक अंतर्मुखी",
          "दोन्हीचे मिश्रण (अँबिवर्ट)",
          "बहुतेक बहिर्मुखी",
          "पूर्णपणे बहिर्मुखी"
        ],
        "active": true
      },
      {
        "id": 3,
        "category": "Personality & Nature",
        "text": "तुम्ही तणाव कसा हाताळता?",
        "options": [
          "मित्र/कुटुंबाशी बोलता",
          "व्यायाम किंवा शारीरिक हालचाल करता",
          "छंदांमध्ये रमता",
          "एकटे हाताळणे पसंत करता"
        ],
        "active": true
      },
      {
        "id": 4,
        "category": "Personality & Nature",
        "text": "निर्णय घेताना, तुम्ही प्रामुख्याने कशावर अवलंबून असता?",
        "options": [
          "तर्क आणि तथ्य",
          "अंतर्ज्ञान आणि मनाचा कौल",
          "इतरांचा सल्ला",
          "मागील अनुभव"
        ],
        "active": true
      },
      {
        "id": 5,
        "category": "Personality & Nature",
        "text": "तुम्ही नियोजक आहात की उत्स्फूर्त?",
        "options": [
          "मी प्रत्येक गोष्टीचे तपशीलवार नियोजन करतो",
          "माझ्याकडे एक ढोबळ योजना असते",
          "मी बहुतेक प्रवाहाबरोबर जातो",
          "मी पूर्णपणे उत्स्फूर्त आहे"
        ],
        "active": true
      },
      {
        "id": 6,
        "category": "Habits & Lifestyle",
        "text": "तुम्ही सकाळी लवकर उठणारे आहात की रात्री जागणारे?",
        "options": [
          "सकाळी लवकर उठणारा - सकाळ आवडते",
          "रात्री जागणार - रात्री सर्वात जास्त उत्पादक",
          "लवचिक, दिवसावर अवलंबून",
          "दोन्ही नाही, मला फक्त जास्त झोप हवी आहे!"
        ],
        "active": true
      },
      {
        "id": 7,
        "category": "Habits & Lifestyle",
        "text": "तुम्हाला किती वेळा बाहेर जायला आवडते?",
        "options": [
          "जवळजवळ प्रत्येक आठवड्यात",
          "महिन्यातून काही वेळा",
          "महिन्यातून एकदा पुरेसे आहे",
          "मी घरी राहणे पसंत करतो"
        ],
        "active": true
      },
      {
        "id": 8,
        "category": "Habits & Lifestyle",
        "text": "तुमची आदर्श सुट्टी कोणती आहे?",
        "options": [
          "एक आरामदायी समुद्रकिनाऱ्यावरील सुट्टी",
          "ट्रेकिंग/खेळांसह एक साहसी सहल",
          "नवीन शहर आणि त्याची संस्कृती शोधणे",
          "घरी राहून आराम करणे"
        ],
        "active": true
      },
      {
        "id": 9,
        "category": "Habits & Lifestyle",
        "text": "तुमच्यासाठी स्वच्छता आणि संघटना किती महत्त्वाची आहे?",
        "options": [
          "खूप महत्त्वाचे, मला गोष्टी व्यवस्थित आवडतात",
          "थोडं महत्त्वाचं, पण थोडा पसारा चालेल",
          "फार महत्त्वाचे नाही",
          "मी संघटित गोंधळात जास्त काम करतो"
        ],
        "active": true
      },
      {
        "id": 10,
        "category": "Habits & Lifestyle",
        "text": "जेव्हा खाण्याचा विषय येतो, तेव्हा तुम्ही कसे असता?",
        "options": [
          "एक साहसी खाणारा, नवीन गोष्टी ट्राय करायला आवडतात",
          "कम्फर्ट फूड आणि क्लासिक्सने आनंदी",
          "एक आरोग्यदायी खाणारा",
          "थोडा चोखंदळ"
        ],
        "active": true
      }
    ],
    "isPublic": true,
    "isOfficial": true,
    "createdAt": "2025-11-18T01:22:13.472Z",
    "status": "approved",
    "imageUrl": "https://i.postimg.cc/Z5fKc2v4/100071917.jpg",
    "language": "marathi",
    "keywords": [
      "friends",
      "bestie",
      "friendship",
      "bff",
      "मित्र",
      "मैत्री"
    ],
    "analysisConfig": {
      "range0_25": "असे दिसते की तुमच्या दृष्टिकोनात बरेच फरक आहेत. काही मनोरंजक संभाषणे सुरू करण्याची आणि एकमेकांच्या जगाबद्दल अधिक जाणून घेण्याची ही एक उत्तम संधी आहे!",
      "range26_50": "तुमच्यात काही साम्य आहे, परंतु अशी क्षेत्रे देखील आहेत जिथे तुम्ही गोष्टी वेगळ्या प्रकारे पाहता. हे फरक शोधणे एक मजेदार साहस आणि एकत्र वाढण्याचा एक मार्ग असू शकतो.",
      "range51_75": "तुम्ही बहुतेक वेळा एकाच विचारांचे असता! तुमच्यात समजुतीचा एक भक्कम पाया आहे. तुमच्यातील काही फरक तुमच्या नात्यात थोडी रंगत आणू शकतात.",
      "range76_100": "व्वा, जणू काही तुम्ही एकमेकांचे मन वाचू शकता! तुमचे नाते अविश्वसनीयपणे मजबूत आहे. तुम्ही एक खोल समज शेअर करता जी खरोखरच खास आहे."
    }
  },
  {
    "id": "official-siblings-mr",
    "title": "भावंडांसाठी (in Marathi)",
    "description": "तुम्ही एकत्र मोठे झालात, पण आता तुम्ही एकमेकांना खरोखर किती चांगले ओळखता? शोधा!",
    "creatorName": "Marathi Bayko",
    "questions": [
      {
        "id": 6,
        "category": "Habits & Lifestyle",
        "text": "तुम्ही सकाळी लवकर उठणारे आहात की रात्री जागणारे?",
        "options": [
          "सकाळी लवकर उठणारा - सकाळ आवडते",
          "रात्री जागणार - रात्री सर्वात जास्त उत्पादक",
          "लवचिक, दिवसावर अवलंबून",
          "दोन्ही नाही, मला फक्त जास्त झोप हवी आहे!"
        ],
        "active": true
      },
      {
        "id": 7,
        "category": "Habits & Lifestyle",
        "text": "तुम्हाला किती वेळा बाहेर जायला आवडते?",
        "options": [
          "जवळजवळ प्रत्येक आठवड्यात",
          "महिन्यातून काही वेळा",
          "महिन्यातून एकदा पुरेसे आहे",
          "मी घरी राहणे पसंत करतो"
        ],
        "active": true
      },
      {
        "id": 8,
        "category": "Habits & Lifestyle",
        "text": "तुमची आदर्श सुट्टी कोणती आहे?",
        "options": [
          "एक आरामदायी समुद्रकिनाऱ्यावरील सुट्टी",
          "ट्रेकिंग/खेळांसह एक साहसी सहल",
          "नवीन शहर आणि त्याची संस्कृती शोधणे",
          "घरी राहून आराम करणे"
        ],
        "active": true
      },
      {
        "id": 9,
        "category": "Habits & Lifestyle",
        "text": "तुमच्यासाठी स्वच्छता आणि संघटना किती महत्त्वाची आहे?",
        "options": [
          "खूप महत्त्वाचे, मला गोष्टी व्यवस्थित आवडतात",
          "थोडं महत्त्वाचं, पण थोडा पसारा चालेल",
          "फार महत्त्वाचे नाही",
          "मी संघटित गोंधळात जास्त काम करतो"
        ],
        "active": true
      },
      {
        "id": 10,
        "category": "Habits & Lifestyle",
        "text": "जेव्हा खाण्याचा विषय येतो, तेव्हा तुम्ही कसे असता?",
        "options": [
          "एक साहसी खाणारा, नवीन गोष्टी ट्राय करायला आवडतात",
          "कम्फर्ट फूड आणि क्लासिक्सने आनंदी",
          "एक आरोग्यदायी खाणारा",
          "थोडा चोखंदळ"
        ],
        "active": true
      },
      {
        "id": 11,
        "category": "Emotions & Love Language",
        "text": "तुम्ही प्रामुख्याने प्रेम आणि आपुलकी कशी व्यक्त करता?",
        "options": [
          "पुष्टीकरण आणि कौतुकाच्या शब्दांद्वारे",
          "एकत्र दर्जेदार वेळ घालवून",
          "विचारपूर्वक भेटवस्तू देऊन",
          "शारीरिक स्पर्शाद्वारे (मिठी, इत्यादी)",
          "सेवा कार्याद्वारे (त्यांच्यासाठी काहीतरी करून)"
        ],
        "active": true
      },
      {
        "id": 12,
        "category": "Emotions & Love Language",
        "text": "भांडणाच्या वेळी, तुम्ही काय करणे पसंत करता?",
        "options": [
          "ताबडतोब बोलून ते सोडवणे",
          "विश्रांती घेऊन शांत झाल्यावर बोलणे",
          "माझा मुद्दा समजावण्यासाठी मजकूर पाठवणे",
          "थोड्या वेळासाठी शांत राहणे"
        ],
        "active": true
      },
      {
        "id": 13,
        "category": "Emotions & Love Language",
        "text": "तुम्हाला माफी कशी स्वीकारायला आवडते?",
        "options": [
          "एक प्रामाणिक \"सॉरी\" पुरेसे आहे",
          "मला वर्तनात बदल पाहण्याची गरज आहे",
          "काय झाले याबद्दल मनापासून संभाषण",
          "भेटवस्तू किंवा उपकारासारखा हावभाव"
        ],
        "active": true
      },
      {
        "id": 14,
        "category": "Emotions & Love Language",
        "text": "तुम्हाला सर्वात जास्त कौतुक झाल्यासारखे केव्हा वाटते?",
        "options": [
          "जेव्हा माझ्या प्रयत्नांची तोंडी कबुली दिली जाते",
          "जेव्हा कोणी माझ्यासाठी काहीतरी विचारपूर्वक करते",
          "जेव्हा मला आश्चर्यकारक भेटवस्तू मिळते",
          "जेव्हा कोणी माझ्यासोबत अखंड वेळ घालवते"
        ],
        "active": true
      },
      {
        "id": 15,
        "category": "Emotions & Love Language",
        "text": "तुम्ही तुमच्या भावनांबद्दल किती मोकळे आहात?",
        "options": [
          "खूप मोकळा, एक उघडे पुस्तक",
          "मी ज्या लोकांवर विश्वास ठेवतो त्यांच्याशी शेअर करतो",
          "मी माझ्या भावना स्वतःकडे ठेवतो",
          "मला मोकळे होण्यासाठी वेळ लागतो"
        ],
        "active": true
      },
      {
        "id": 16,
        "category": "Values & Family",
        "text": "मोठ्या आयुष्याच्या निर्णयात तुमच्या कुटुंबाची संमती किती महत्त्वाची आहे?",
        "options": [
          "अत्यंत महत्त्वाचे, त्यांचे मत अंतिम आहे",
          "खूप महत्त्वाचे, मी नेहमी त्याचा विचार करतो",
          "थोडं महत्त्वाचं, पण अंतिम निर्णय मीच घेतो",
          "महत्वाचे नाही, माझे आयुष्य माझे आहे"
        ],
        "active": true
      },
      {
        "id": 17,
        "category": "Values & Family",
        "text": "भविष्यासाठी तुमची आदर्श कौटुंबिक रचना कोणती आहे?",
        "options": [
          "संयुक्त कुटुंबात राहणे",
          "विभक्त कुटुंबात राहणे, पण पालकांच्या जवळ",
          "विभक्त कुटुंबात राहणे, स्वतंत्रपणे",
          "मी याचा विचार केलेला नाही"
        ],
        "active": true
      },
      {
        "id": 18,
        "category": "Values & Family",
        "text": "तुम्ही नात्यातील पैशाकडे कसे पाहता?",
        "options": [
          "आर्थिक व्यवहार पूर्णपणे सामायिक केले पाहिजेत",
          "आपण आपले आर्थिक व्यवहार वेगळे ठेवले पाहिजेत",
          "दोन्हीचे मिश्रण - काही सामायिक, काही वेगळे",
          "जो कोणी यात चांगला असेल त्याने ते व्यवस्थापित केले पाहिजे"
        ],
        "active": true
      },
      {
        "id": 19,
        "category": "Values & Family",
        "text": "तुमच्या आयुष्यात धर्म किंवा अध्यात्मची काय भूमिका आहे?",
        "options": [
          "एक खूप मध्यवर्ती आणि मार्गदर्शक भूमिका",
          "हे माझ्या संस्कृती आणि परंपरांचा भाग आहे",
          "मी आध्यात्मिक आहे पण धार्मिक नाही",
          "ते महत्त्वपूर्ण भूमिका बजावत नाही"
        ],
        "active": true
      },
      {
        "id": 20,
        "category": "Values & Family",
        "text": "तुम्ही सुट्ट्या आणि सण कसे घालवणे पसंत करता?",
        "options": [
          "मोठ्या कौटुंबिक मेळाव्यासह",
          "जवळच्या कुटुंबातील/मित्रांच्या लहान गटासह",
          "स्वतःसाठी/माझ्या जोडीदारासह एक शांत दिवस म्हणून",
          "नवीन ठिकाणी प्रवास करणे"
        ],
        "active": true
      }
    ],
    "isPublic": true,
    "isOfficial": true,
    "createdAt": "2025-11-18T01:22:13.472Z",
    "status": "approved",
    "imageUrl": "https://i.postimg.cc/7Y8VHQ6y/100071918.jpg",
    "language": "marathi",
    "keywords": [
      "siblings",
      "brother",
      "sister",
      "family",
      "भावंड",
      "भाऊ",
      "बहीण"
    ],
    "analysisConfig": {
      "range0_25": "असे दिसते की तुमच्या दृष्टिकोनात बरेच फरक आहेत. काही मनोरंजक संभाषणे सुरू करण्याची आणि एकमेकांच्या जगाबद्दल अधिक जाणून घेण्याची ही एक उत्तम संधी आहे!",
      "range26_50": "तुमच्यात काही साम्य आहे, परंतु अशी क्षेत्रे देखील आहेत जिथे तुम्ही गोष्टी वेगळ्या प्रकारे पाहता. हे फरक शोधणे एक मजेदार साहस आणि एकत्र वाढण्याचा एक मार्ग असू शकतो.",
      "range51_75": "तुम्ही बहुतेक वेळा एकाच विचारांचे असता! तुमच्यात समजुतीचा एक भक्कम पाया आहे. तुमच्यातील काही फरक तुमच्या नात्यात थोडी रंगत आणू शकतात.",
      "range76_100": "व्वा, जणू काही तुम्ही एकमेकांचे मन वाचू शकता! तुमचे नाते अविश्वसनीयपणे मजबूत आहे. तुम्ही एक खोल समज शेअर करता जी खरोखरच खास आहे."
    }
  },
  {
    "id": "official-crush-mr",
    "title": "तुमच्या क्रशसाठी (in Marathi)",
    "description": "तुम्ही आणि तुमचा क्रश एक जुळणारे जोडपे आहात का हे जाणून घेऊ इच्छिता? तुमच्याबद्दल ही क्विझ तयार करा आणि ते कसे उत्तर देतात ते पहा!",
    "creatorName": "Marathi Bayko",
    "questions": [
      {
        "id": 11,
        "category": "Emotions & Love Language",
        "text": "तुम्ही प्रामुख्याने प्रेम आणि आपुलकी कशी व्यक्त करता?",
        "options": [
          "पुष्टीकरण आणि कौतुकाच्या शब्दांद्वारे",
          "एकत्र दर्जेदार वेळ घालवून",
          "विचारपूर्वक भेटवस्तू देऊन",
          "शारीरिक स्पर्शाद्वारे (मिठी, इत्यादी)",
          "सेवा कार्याद्वारे (त्यांच्यासाठी काहीतरी करून)"
        ],
        "active": true
      },
      {
        "id": 12,
        "category": "Emotions & Love Language",
        "text": "भांडणाच्या वेळी, तुम्ही काय करणे पसंत करता?",
        "options": [
          "ताबडतोब बोलून ते सोडवणे",
          "विश्रांती घेऊन शांत झाल्यावर बोलणे",
          "माझा मुद्दा समजावण्यासाठी मजकूर पाठवणे",
          "थोड्या वेळासाठी शांत राहणे"
        ],
        "active": true
      },
      {
        "id": 13,
        "category": "Emotions & Love Language",
        "text": "तुम्हाला माफी कशी स्वीकारायला आवडते?",
        "options": [
          "एक प्रामाणिक \"सॉरी\" पुरेसे आहे",
          "मला वर्तनात बदल पाहण्याची गरज आहे",
          "काय झाले याबद्दल मनापासून संभाषण",
          "भेटवस्तू किंवा उपकारासारखा हावभाव"
        ],
        "active": true
      },
      {
        "id": 14,
        "category": "Emotions & Love Language",
        "text": "तुम्हाला सर्वात जास्त कौतुक झाल्यासारखे केव्हा वाटते?",
        "options": [
          "जेव्हा माझ्या प्रयत्नांची तोंडी कबुली दिली जाते",
          "जेव्हा कोणी माझ्यासाठी काहीतरी विचारपूर्वक करते",
          "जेव्हा मला आश्चर्यकारक भेटवस्तू मिळते",
          "जेव्हा कोणी माझ्यासोबत अखंड वेळ घालवते"
        ],
        "active": true
      },
      {
        "id": 15,
        "category": "Emotions & Love Language",
        "text": "तुम्ही तुमच्या भावनांबद्दल किती मोकळे आहात?",
        "options": [
          "खूप मोकळा, एक उघडे पुस्तक",
          "मी ज्या लोकांवर विश्वास ठेवतो त्यांच्याशी शेअर करतो",
          "मी माझ्या भावना स्वतःकडे ठेवतो",
          "मला मोकळे होण्यासाठी वेळ लागतो"
        ],
        "active": true
      },
      {
        "id": 16,
        "category": "Values & Family",
        "text": "मोठ्या आयुष्याच्या निर्णयात तुमच्या कुटुंबाची संमती किती महत्त्वाची आहे?",
        "options": [
          "अत्यंत महत्त्वाचे, त्यांचे मत अंतिम आहे",
          "खूप महत्त्वाचे, मी नेहमी त्याचा विचार करतो",
          "थोडं महत्त्वाचं, पण अंतिम निर्णय मीच घेतो",
          "महत्वाचे नाही, माझे आयुष्य माझे आहे"
        ],
        "active": true
      },
      {
        "id": 17,
        "category": "Values & Family",
        "text": "भविष्यासाठी तुमची आदर्श कौटुंबिक रचना कोणती आहे?",
        "options": [
          "संयुक्त कुटुंबात राहणे",
          "विभक्त कुटुंबात राहणे, पण पालकांच्या जवळ",
          "विभक्त कुटुंबात राहणे, स्वतंत्रपणे",
          "मी याचा विचार केलेला नाही"
        ],
        "active": true
      },
      {
        "id": 18,
        "category": "Values & Family",
        "text": "तुम्ही नात्यातील पैशाकडे कसे पाहता?",
        "options": [
          "आर्थिक व्यवहार पूर्णपणे सामायिक केले पाहिजेत",
          "आपण आपले आर्थिक व्यवहार वेगळे ठेवले पाहिजेत",
          "दोन्हीचे मिश्रण - काही सामायिक, काही वेगळे",
          "जो कोणी यात चांगला असेल त्याने ते व्यवस्थापित केले पाहिजे"
        ],
        "active": true
      },
      {
        "id": 19,
        "category": "Values & Family",
        "text": "तुमच्या आयुष्यात धर्म किंवा अध्यात्मची काय भूमिका आहे?",
        "options": [
          "एक खूप मध्यवर्ती आणि मार्गदर्शक भूमिका",
          "हे माझ्या संस्कृती आणि परंपरांचा भाग आहे",
          "मी आध्यात्मिक आहे पण धार्मिक नाही",
          "ते महत्त्वपूर्ण भूमिका बजावत नाही"
        ],
        "active": true
      },
      {
        "id": 20,
        "category": "Values & Family",
        "text": "तुम्ही सुट्ट्या आणि सण कसे घालवणे पसंत करता?",
        "options": [
          "मोठ्या कौटुंबिक मेळाव्यासह",
          "जवळच्या कुटुंबातील/मित्रांच्या लहान गटासह",
          "स्वतःसाठी/माझ्या जोडीदारासह एक शांत दिवस म्हणून",
          "नवीन ठिकाणी प्रवास करणे"
        ],
        "active": true
      },
      {
        "id": 21,
        "category": "Future & Goals",
        "text": "तुम्ही ५ वर्षांनी स्वतःला कुठे पाहता?",
        "options": [
          "करिअर वाढीवर लक्ष केंद्रित केलेले",
          "कुटुंबासह स्थायिक झालेले",
          "जगभर प्रवास करत असलेले",
          "वैयक्तिक आणि व्यावसायिक जीवनाचा समतोल"
        ],
        "active": true
      },
      {
        "id": 22,
        "category": "Future & Goals",
        "text": "तुमच्या आयुष्यातील सध्याचे सर्वोच्च प्राधान्य काय आहे?",
        "options": [
          "करिअर",
          "नाते/प्रेम",
          "कुटुंब",
          "वैयक्तिक वाढ आणि आरोग्य"
        ],
        "active": true
      },
      {
        "id": 23,
        "category": "Future & Goals",
        "text": "तुम्हाला भविष्यात मुले होण्याची इच्छा आहे का?",
        "options": [
          "होय, नक्कीच",
          "कदाचित, मी त्यासाठी तयार आहे",
          "नाही, मला मुले नको आहेत",
          "मला अजून खात्री नाही"
        ],
        "active": true
      },
      {
        "id": 24,
        "category": "Future & Goals",
        "text": "एका मोठ्या संधीसाठी दुसऱ्या शहरात जाण्याबद्दल तुम्हाला कसे वाटते?",
        "options": [
          "बिलकुल, मला साहस आवडेल",
          "माझा जोडीदार सहमत असेल तर मी विचार करेन",
          "मी माझ्या सध्याच्या शहरात राहणे पसंत करेन",
          "फक्त जर ते अत्यंत आवश्यक असेल तर"
        ],
        "active": true
      },
      {
        "id": 25,
        "category": "Future & Goals",
        "text": "तुमच्यासाठी \"यश\" म्हणजे काय?",
        "options": [
          "आर्थिक संपत्ती आणि स्थैर्य",
          "एक परिपूर्ण करिअर आणि ओळख",
          "मजबूत नातेसंबंध आणि एक आनंदी कुटुंब",
          "माझ्या स्वतःच्या अटींवर आयुष्य जगण्याचे स्वातंत्र्य"
        ],
        "active": true
      }
    ],
    "isPublic": true,
    "isOfficial": true,
    "createdAt": "2025-11-18T01:22:13.472Z",
    "status": "approved",
    "imageUrl": "https://i.postimg.cc/2y8ChxjN/100071918-1.jpg",
    "language": "marathi",
    "keywords": [
      "crush",
      "love",
      "secret",
      "admirer",
      "romantic",
      "क्रश",
      "प्रेम"
    ],
    "analysisConfig": {
      "range0_25": "असे दिसते की तुमच्या दृष्टिकोनात बरेच फरक आहेत. काही मनोरंजक संभाषणे सुरू करण्याची आणि एकमेकांच्या जगाबद्दल अधिक जाणून घेण्याची ही एक उत्तम संधी आहे!",
      "range26_50": "तुमच्यात काही साम्य आहे, परंतु अशी क्षेत्रे देखील आहेत जिथे तुम्ही गोष्टी वेगळ्या प्रकारे पाहता. हे फरक शोधणे एक मजेदार साहस आणि एकत्र वाढण्याचा एक मार्ग असू शकतो.",
      "range51_75": "तुम्ही बहुतेक वेळा एकाच विचारांचे असता! तुमच्यात समजुतीचा एक भक्कम पाया आहे. तुमच्यातील काही फरक तुमच्या नात्यात थोडी रंगत आणू शकतात.",
      "range76_100": "व्वा, जणू काही तुम्ही एकमेकांचे मन वाचू शकता! तुमचे नाते अविश्वसनीयपणे मजबूत आहे. तुम्ही एक खोल समज शेअर करता जी खरोखरच खास आहे."
    }
  },
  {
    "id": "official-character-verification-mr",
    "title": "चारित्र्य पडताळणी (in Marathi)",
    "description": "ही क्विझ मूल्ये आणि तत्त्वांवर लक्ष केंद्रित करते. तुमची पात्रे किती जुळतात ते पहा.",
    "creatorName": "Marathi Bayko",
    "questions": [
      {
        "id": 1,
        "category": "Personality & Nature",
        "text": "तुम्ही रागावल्यावर सहसा कशी प्रतिक्रिया देता?",
        "options": [
          "शांत आणि दूरस्थ होता",
          "ते उघडपणे व्यक्त करून चर्चा करता",
          "स्वतःला इतर कामांमध्ये विचलित करण्याचा प्रयत्न करता",
          "शांत होण्यासाठी थोडा वेळ एकटे राहता"
        ],
        "active": true
      },
      {
        "id": 2,
        "category": "Personality & Nature",
        "text": "तुम्ही अधिक अंतर्मुखी आहात की बहिर्मुखी?",
        "options": [
          "पूर्णपणे अंतर्मुखी",
          "बहुतेक अंतर्मुखी",
          "दोन्हीचे मिश्रण (अँबिवर्ट)",
          "बहुतेक बहिर्मुखी",
          "पूर्णपणे बहिर्मुखी"
        ],
        "active": true
      },
      {
        "id": 3,
        "category": "Personality & Nature",
        "text": "तुम्ही तणाव कसा हाताळता?",
        "options": [
          "मित्र/कुटुंबाशी बोलता",
          "व्यायाम किंवा शारीरिक हालचाल करता",
          "छंदांमध्ये रमता",
          "एकटे हाताळणे पसंत करता"
        ],
        "active": true
      },
      {
        "id": 4,
        "category": "Personality & Nature",
        "text": "निर्णय घेताना, तुम्ही प्रामुख्याने कशावर अवलंबून असता?",
        "options": [
          "तर्क आणि तथ्य",
          "अंतर्ज्ञान आणि मनाचा कौल",
          "इतरांचा सल्ला",
          "मागील अनुभव"
        ],
        "active": true
      },
      {
        "id": 5,
        "category": "Personality & Nature",
        "text": "तुम्ही नियोजक आहात की उत्स्फूर्त?",
        "options": [
          "मी प्रत्येक गोष्टीचे तपशीलवार नियोजन करतो",
          "माझ्याकडे एक ढोबळ योजना असते",
          "मी बहुतेक प्रवाहाबरोबर जातो",
          "मी पूर्णपणे उत्स्फूर्त आहे"
        ],
        "active": true
      },
      {
        "id": 16,
        "category": "Values & Family",
        "text": "मोठ्या आयुष्याच्या निर्णयात तुमच्या कुटुंबाची संमती किती महत्त्वाची आहे?",
        "options": [
          "अत्यंत महत्त्वाचे, त्यांचे मत अंतिम आहे",
          "खूप महत्त्वाचे, मी नेहमी त्याचा विचार करतो",
          "थोडं महत्त्वाचं, पण अंतिम निर्णय मीच घेतो",
          "महत्वाचे नाही, माझे आयुष्य माझे आहे"
        ],
        "active": true
      },
      {
        "id": 17,
        "category": "Values & Family",
        "text": "भविष्यासाठी तुमची आदर्श कौटुंबिक रचना कोणती आहे?",
        "options": [
          "संयुक्त कुटुंबात राहणे",
          "विभक्त कुटुंबात राहणे, पण पालकांच्या जवळ",
          "विभक्त कुटुंबात राहणे, स्वतंत्रपणे",
          "मी याचा विचार केलेला नाही"
        ],
        "active": true
      },
      {
        "id": 18,
        "category": "Values & Family",
        "text": "तुम्ही नात्यातील पैशाकडे कसे पाहता?",
        "options": [
          "आर्थिक व्यवहार पूर्णपणे सामायिक केले पाहिजेत",
          "आपण आपले आर्थिक व्यवहार वेगळे ठेवले पाहिजेत",
          "दोन्हीचे मिश्रण - काही सामायिक, काही वेगळे",
          "जो कोणी यात चांगला असेल त्याने ते व्यवस्थापित केले पाहिजे"
        ],
        "active": true
      },
      {
        "id": 19,
        "category": "Values & Family",
        "text": "तुमच्या आयुष्यात धर्म किंवा अध्यात्मची काय भूमिका आहे?",
        "options": [
          "एक खूप मध्यवर्ती आणि मार्गदर्शक भूमिका",
          "हे माझ्या संस्कृती आणि परंपरांचा भाग आहे",
          "मी आध्यात्मिक आहे पण धार्मिक नाही",
          "ते महत्त्वपूर्ण भूमिका बजावत नाही"
        ],
        "active": true
      },
      {
        "id": 20,
        "category": "Values & Family",
        "text": "तुम्ही सुट्ट्या आणि सण कसे घालवणे पसंत करता?",
        "options": [
          "मोठ्या कौटुंबिक मेळाव्यासह",
          "जवळच्या कुटुंबातील/मित्रांच्या लहान गटासह",
          "स्वतःसाठी/माझ्या जोडीदारासह एक शांत दिवस म्हणून",
          "नवीन ठिकाणी प्रवास करणे"
        ],
        "active": true
      }
    ],
    "isPublic": true,
    "isOfficial": true,
    "createdAt": "2025-11-18T01:22:13.472Z",
    "status": "approved",
    "imageUrl": "https://i.postimg.cc/y8XBQ5JH/100071919-2.jpg",
    "language": "marathi",
    "keywords": [
      "character",
      "verification",
      "values",
      "principles",
      "ethics",
      "चारित्र्य",
      "पडताळणी"
    ],
    "analysisConfig": {
      "range0_25": "असे दिसते की तुमच्या दृष्टिकोनात बरेच फरक आहेत. काही मनोरंजक संभाषणे सुरू करण्याची आणि एकमेकांच्या जगाबद्दल अधिक जाणून घेण्याची ही एक उत्तम संधी आहे!",
      "range26_50": "तुमच्यात काही साम्य आहे, परंतु अशी क्षेत्रे देखील आहेत जिथे तुम्ही गोष्टी वेगळ्या प्रकारे पाहता. हे फरक शोधणे एक मजेदार साहस आणि एकत्र वाढण्याचा एक मार्ग असू शकतो.",
      "range51_75": "तुम्ही बहुतेक वेळा एकाच विचारांचे असता! तुमच्यात समजुतीचा एक भक्कम पाया आहे. तुमच्यातील काही फरक तुमच्या नात्यात थोडी रंगत आणू शकतात.",
      "range76_100": "व्वा, जणू काही तुम्ही एकमेकांचे मन वाचू शकता! तुमचे नाते अविश्वसनीयपणे मजबूत आहे. तुम्ही एक खोल समज शेअर करता जी खरोखरच खास आहे."
    }
  },
  {
    "id": "official-loyalty-check-mr",
    "title": "निष्ठा तपासणी (in Marathi)",
    "description": "नात्यातील विश्वास, वचनबद्धता आणि निष्ठेवर लक्ष केंद्रित करणारी क्विझ. काळजीपूर्वक हाताळा!",
    "creatorName": "Marathi Bayko",
    "questions": [
      {
        "id": 11,
        "category": "Emotions & Love Language",
        "text": "तुम्ही प्रामुख्याने प्रेम आणि आपुलकी कशी व्यक्त करता?",
        "options": [
          "पुष्टीकरण आणि कौतुकाच्या शब्दांद्वारे",
          "एकत्र दर्जेदार वेळ घालवून",
          "विचारपूर्वक भेटवस्तू देऊन",
          "शारीरिक स्पर्शाद्वारे (मिठी, इत्यादी)",
          "सेवा कार्याद्वारे (त्यांच्यासाठी काहीतरी करून)"
        ],
        "active": true
      },
      {
        "id": 12,
        "category": "Emotions & Love Language",
        "text": "भांडणाच्या वेळी, तुम्ही काय करणे पसंत करता?",
        "options": [
          "ताबडतोब बोलून ते सोडवणे",
          "विश्रांती घेऊन शांत झाल्यावर बोलणे",
          "माझा मुद्दा समजावण्यासाठी मजकूर पाठवणे",
          "थोड्या वेळासाठी शांत राहणे"
        ],
        "active": true
      },
      {
        "id": 13,
        "category": "Emotions & Love Language",
        "text": "तुम्हाला माफी कशी स्वीकारायला आवडते?",
        "options": [
          "एक प्रामाणिक \"सॉरी\" पुरेसे आहे",
          "मला वर्तनात बदल पाहण्याची गरज आहे",
          "काय झाले याबद्दल मनापासून संभाषण",
          "भेटवस्तू किंवा उपकारासारखा हावभाव"
        ],
        "active": true
      },
      {
        "id": 14,
        "category": "Emotions & Love Language",
        "text": "तुम्हाला सर्वात जास्त कौतुक झाल्यासारखे केव्हा वाटते?",
        "options": [
          "जेव्हा माझ्या प्रयत्नांची तोंडी कबुली दिली जाते",
          "जेव्हा कोणी माझ्यासाठी काहीतरी विचारपूर्वक करते",
          "जेव्हा मला आश्चर्यकारक भेटवस्तू मिळते",
          "जेव्हा कोणी माझ्यासोबत अखंड वेळ घालवते"
        ],
        "active": true
      },
      {
        "id": 15,
        "category": "Emotions & Love Language",
        "text": "तुम्ही तुमच्या भावनांबद्दल किती मोकळे आहात?",
        "options": [
          "खूप मोकळा, एक उघडे पुस्तक",
          "मी ज्या लोकांवर विश्वास ठेवतो त्यांच्याशी शेअर करतो",
          "मी माझ्या भावना स्वतःकडे ठेवतो",
          "मला मोकळे होण्यासाठी वेळ लागतो"
        ],
        "active": true
      },
      {
        "id": 16,
        "category": "Values & Family",
        "text": "मोठ्या आयुष्याच्या निर्णयात तुमच्या कुटुंबाची संमती किती महत्त्वाची आहे?",
        "options": [
          "अत्यंत महत्त्वाचे, त्यांचे मत अंतिम आहे",
          "खूप महत्त्वाचे, मी नेहमी त्याचा विचार करतो",
          "थोडं महत्त्वाचं, पण अंतिम निर्णय मीच घेतो",
          "महत्वाचे नाही, माझे आयुष्य माझे आहे"
        ],
        "active": true
      },
      {
        "id": 17,
        "category": "Values & Family",
        "text": "भविष्यासाठी तुमची आदर्श कौटुंबिक रचना कोणती आहे?",
        "options": [
          "संयुक्त कुटुंबात राहणे",
          "विभक्त कुटुंबात राहणे, पण पालकांच्या जवळ",
          "विभक्त कुटुंबात राहणे, स्वतंत्रपणे",
          "मी याचा विचार केलेला नाही"
        ],
        "active": true
      },
      {
        "id": 18,
        "category": "Values & Family",
        "text": "तुम्ही नात्यातील पैशाकडे कसे पाहता?",
        "options": [
          "आर्थिक व्यवहार पूर्णपणे सामायिक केले पाहिजेत",
          "आपण आपले आर्थिक व्यवहार वेगळे ठेवले पाहिजेत",
          "दोन्हीचे मिश्रण - काही सामायिक, काही वेगळे",
          "जो कोणी यात चांगला असेल त्याने ते व्यवस्थापित केले पाहिजे"
        ],
        "active": true
      },
      {
        "id": 19,
        "category": "Values & Family",
        "text": "तुमच्या आयुष्यात धर्म किंवा अध्यात्मची काय भूमिका आहे?",
        "options": [
          "एक खूप मध्यवर्ती आणि मार्गदर्शक भूमिका",
          "हे माझ्या संस्कृती आणि परंपरांचा भाग आहे",
          "मी आध्यात्मिक आहे पण धार्मिक नाही",
          "ते महत्त्वपूर्ण भूमिका बजावत नाही"
        ],
        "active": true
      },
      {
        "id": 20,
        "category": "Values & Family",
        "text": "तुम्ही सुट्ट्या आणि सण कसे घालवणे पसंत करता?",
        "options": [
          "मोठ्या कौटुंबिक मेळाव्यासह",
          "जवळच्या कुटुंबातील/मित्रांच्या लहान गटासह",
          "स्वतःसाठी/माझ्या जोडीदारासह एक शांत दिवस म्हणून",
          "नवीन ठिकाणी प्रवास करणे"
        ],
        "active": true
      }
    ],
    "isPublic": true,
    "isOfficial": true,
    "createdAt": "2025-11-18T01:22:13.472Z",
    "status": "approved",
    "imageUrl": "https://i.postimg.cc/KzpHp7rT/100071919.jpg",
    "language": "marathi",
    "keywords": [
      "loyalty",
      "trust",
      "commitment",
      "honesty",
      "relationship",
      "निष्ठा",
      "विश्वास",
      "वचनबद्धता"
    ],
    "analysisConfig": {
      "range0_25": "असे दिसते की तुमच्या दृष्टिकोनात बरेच फरक आहेत. काही मनोरंजक संभाषणे सुरू करण्याची आणि एकमेकांच्या जगाबद्दल अधिक जाणून घेण्याची ही एक उत्तम संधी आहे!",
      "range26_50": "तुमच्यात काही साम्य आहे, परंतु अशी क्षेत्रे देखील आहेत जिथे तुम्ही गोष्टी वेगळ्या प्रकारे पाहता. हे फरक शोधणे एक मजेदार साहस आणि एकत्र वाढण्याचा एक मार्ग असू शकतो.",
      "range51_75": "तुम्ही बहुतेक वेळा एकाच विचारांचे असता! तुमच्यात समजुतीचा एक भक्कम पाया आहे. तुमच्यातील काही फरक तुमच्या नात्यात थोडी रंगत आणू शकतात.",
      "range76_100": "व्वा, जणू काही तुम्ही एकमेकांचे मन वाचू शकता! तुमचे नाते अविश्वसनीयपणे मजबूत आहे. तुम्ही एक खोल समज शेअर करता जी खरोखरच खास आहे."
    }
  },
  {
    "id": "official-teacher-student-mr",
    "title": "शिक्षक आणि विद्यार्थ्यांसाठी (in Marathi)",
    "description": "शिक्षक आणि विद्यार्थ्यांमध्ये चांगली समज आणि नातेसंबंध निर्माण करण्यासाठी एक मैत्रीपूर्ण क्विझ.",
    "creatorName": "Marathi Bayko",
    "questions": [
      {
        "id": 1,
        "category": "Personality & Nature",
        "text": "तुम्ही रागावल्यावर सहसा कशी प्रतिक्रिया देता?",
        "options": [
          "शांत आणि दूरस्थ होता",
          "ते उघडपणे व्यक्त करून चर्चा करता",
          "स्वतःला इतर कामांमध्ये विचलित करण्याचा प्रयत्न करता",
          "शांत होण्यासाठी थोडा वेळ एकटे राहता"
        ],
        "active": true
      },
      {
        "id": 2,
        "category": "Personality & Nature",
        "text": "तुम्ही अधिक अंतर्मुखी आहात की बहिर्मुखी?",
        "options": [
          "पूर्णपणे अंतर्मुखी",
          "बहुतेक अंतर्मुखी",
          "दोन्हीचे मिश्रण (अँबिवर्ट)",
          "बहुतेक बहिर्मुखी",
          "पूर्णपणे बहिर्मुखी"
        ],
        "active": true
      },
      {
        "id": 3,
        "category": "Personality & Nature",
        "text": "तुम्ही तणाव कसा हाताळता?",
        "options": [
          "मित्र/कुटुंबाशी बोलता",
          "व्यायाम किंवा शारीरिक हालचाल करता",
          "छंदांमध्ये रमता",
          "एकटे हाताळणे पसंत करता"
        ],
        "active": true
      },
      {
        "id": 4,
        "category": "Personality & Nature",
        "text": "निर्णय घेताना, तुम्ही प्रामुख्याने कशावर अवलंबून असता?",
        "options": [
          "तर्क आणि तथ्य",
          "अंतर्ज्ञान आणि मनाचा कौल",
          "इतरांचा सल्ला",
          "मागील अनुभव"
        ],
        "active": true
      },
      {
        "id": 5,
        "category": "Personality & Nature",
        "text": "तुम्ही नियोजक आहात की उत्स्फूर्त?",
        "options": [
          "मी प्रत्येक गोष्टीचे तपशीलवार नियोजन करतो",
          "माझ्याकडे एक ढोबळ योजना असते",
          "मी बहुतेक प्रवाहाबरोबर जातो",
          "मी पूर्णपणे उत्स्फूर्त आहे"
        ],
        "active": true
      },
      {
        "id": 21,
        "category": "Future & Goals",
        "text": "तुम्ही ५ वर्षांनी स्वतःला कुठे पाहता?",
        "options": [
          "करिअर वाढीवर लक्ष केंद्रित केलेले",
          "कुटुंबासह स्थायिक झालेले",
          "जगभर प्रवास करत असलेले",
          "वैयक्तिक आणि व्यावसायिक जीवनाचा समतोल"
        ],
        "active": true
      },
      {
        "id": 22,
        "category": "Future & Goals",
        "text": "तुमच्या आयुष्यातील सध्याचे सर्वोच्च प्राधान्य काय आहे?",
        "options": [
          "करिअर",
          "नाते/प्रेम",
          "कुटुंब",
          "वैयक्तिक वाढ आणि आरोग्य"
        ],
        "active": true
      },
      {
        "id": 23,
        "category": "Future & Goals",
        "text": "तुम्हाला भविष्यात मुले होण्याची इच्छा आहे का?",
        "options": [
          "होय, नक्कीच",
          "कदाचित, मी त्यासाठी तयार आहे",
          "नाही, मला मुले नको आहेत",
          "मला अजून खात्री नाही"
        ],
        "active": true
      },
      {
        "id": 24,
        "category": "Future & Goals",
        "text": "एका मोठ्या संधीसाठी दुसऱ्या शहरात जाण्याबद्दल तुम्हाला कसे वाटते?",
        "options": [
          "बिलकुल, मला साहस आवडेल",
          "माझा जोडीदार सहमत असेल तर मी विचार करेन",
          "मी माझ्या सध्याच्या शहरात राहणे पसंत करेन",
          "फक्त जर ते अत्यंत आवश्यक असेल तर"
        ],
        "active": true
      },
      {
        "id": 25,
        "category": "Future & Goals",
        "text": "तुमच्यासाठी \"यश\" म्हणजे काय?",
        "options": [
          "आर्थिक संपत्ती आणि स्थैर्य",
          "एक परिपूर्ण करिअर आणि ओळख",
          "मजबूत नातेसंबंध आणि एक आनंदी कुटुंब",
          "माझ्या स्वतःच्या अटींवर आयुष्य जगण्याचे स्वातंत्र्य"
        ],
        "active": true
      }
    ],
    "isPublic": true,
    "isOfficial": true,
    "createdAt": "2025-11-18T01:22:13.472Z",
    "status": "approved",
    "imageUrl": "https://i.postimg.cc/v8jKWzmR/100071919-1.jpg",
    "language": "marathi",
    "keywords": [
      "teacher",
      "student",
      "education",
      "school",
      "rapport",
      "शिक्षक",
      "विद्यार्थी"
    ],
    "analysisConfig": {
      "range0_25": "असे दिसते की तुमच्या दृष्टिकोनात बरेच फरक आहेत. काही मनोरंजक संभाषणे सुरू करण्याची आणि एकमेकांच्या जगाबद्दल अधिक जाणून घेण्याची ही एक उत्तम संधी आहे!",
      "range26_50": "तुमच्यात काही साम्य आहे, परंतु अशी क्षेत्रे देखील आहेत जिथे तुम्ही गोष्टी वेगळ्या प्रकारे पाहता. हे फरक शोधणे एक मजेदार साहस आणि एकत्र वाढण्याचा एक मार्ग असू शकतो.",
      "range51_75": "तुम्ही बहुतेक वेळा एकाच विचारांचे असता! तुमच्यात समजुतीचा एक भक्कम पाया आहे. तुमच्यातील काही फरक तुमच्या नात्यात थोडी रंगत आणू शकतात.",
      "range76_100": "व्वा, जणू काही तुम्ही एकमेकांचे मन वाचू शकता! तुमचे नाते अविश्वसनीयपणे मजबूत आहे. तुम्ही एक खोल समज शेअर करता जी खरोखरच खास आहे."
    }
  },
  {
    "id": "official-employee-manager-mr",
    "title": "कर्मचारी आणि व्यवस्थापकांसाठी (in Marathi)",
    "description": "कामाच्या ठिकाणी समन्वय सुधारा! कामाची शैली आणि प्राधान्ये अधिक चांगल्या प्रकारे समजून घेण्यासाठी एक क्विझ.",
    "creatorName": "Marathi Bayko",
    "questions": [
      {
        "id": 1,
        "category": "Personality & Nature",
        "text": "तुम्ही रागावल्यावर सहसा कशी प्रतिक्रिया देता?",
        "options": [
          "शांत आणि दूरस्थ होता",
          "ते उघडपणे व्यक्त करून चर्चा करता",
          "स्वतःला इतर कामांमध्ये विचलित करण्याचा प्रयत्न करता",
          "शांत होण्यासाठी थोडा वेळ एकटे राहता"
        ],
        "active": true
      },
      {
        "id": 2,
        "category": "Personality & Nature",
        "text": "तुम्ही अधिक अंतर्मुखी आहात की बहिर्मुखी?",
        "options": [
          "पूर्णपणे अंतर्मुखी",
          "बहुतेक अंतर्मुखी",
          "दोन्हीचे मिश्रण (अँबिवर्ट)",
          "बहुतेक बहिर्मुखी",
          "पूर्णपणे बहिर्मुखी"
        ],
        "active": true
      },
      {
        "id": 3,
        "category": "Personality & Nature",
        "text": "तुम्ही तणाव कसा हाताळता?",
        "options": [
          "मित्र/कुटुंबाशी बोलता",
          "व्यायाम किंवा शारीरिक हालचाल करता",
          "छंदांमध्ये रमता",
          "एकटे हाताळणे पसंत करता"
        ],
        "active": true
      },
      {
        "id": 4,
        "category": "Personality & Nature",
        "text": "निर्णय घेताना, तुम्ही प्रामुख्याने कशावर अवलंबून असता?",
        "options": [
          "तर्क आणि तथ्य",
          "अंतर्ज्ञान आणि मनाचा कौल",
          "इतरांचा सल्ला",
          "मागील अनुभव"
        ],
        "active": true
      },
      {
        "id": 5,
        "category": "Personality & Nature",
        "text": "तुम्ही नियोजक आहात की उत्स्फूर्त?",
        "options": [
          "मी प्रत्येक गोष्टीचे तपशीलवार नियोजन करतो",
          "माझ्याकडे एक ढोबळ योजना असते",
          "मी बहुतेक प्रवाहाबरोबर जातो",
          "मी पूर्णपणे उत्स्फूर्त आहे"
        ],
        "active": true
      },
      {
        "id": 21,
        "category": "Future & Goals",
        "text": "तुम्ही ५ वर्षांनी स्वतःला कुठे पाहता?",
        "options": [
          "करिअर वाढीवर लक्ष केंद्रित केलेले",
          "कुटुंबासह स्थायिक झालेले",
          "जगभर प्रवास करत असलेले",
          "वैयक्तिक आणि व्यावसायिक जीवनाचा समतोल"
        ],
        "active": true
      },
      {
        "id": 22,
        "category": "Future & Goals",
        "text": "तुमच्या आयुष्यातील सध्याचे सर्वोच्च प्राधान्य काय आहे?",
        "options": [
          "करिअर",
          "नाते/प्रेम",
          "कुटुंब",
          "वैयक्तिक वाढ आणि आरोग्य"
        ],
        "active": true
      },
      {
        "id": 23,
        "category": "Future & Goals",
        "text": "तुम्हाला भविष्यात मुले होण्याची इच्छा आहे का?",
        "options": [
          "होय, नक्कीच",
          "कदाचित, मी त्यासाठी तयार आहे",
          "नाही, मला मुले नको आहेत",
          "मला अजून खात्री नाही"
        ],
        "active": true
      },
      {
        "id": 24,
        "category": "Future & Goals",
        "text": "एका मोठ्या संधीसाठी दुसऱ्या शहरात जाण्याबद्दल तुम्हाला कसे वाटते?",
        "options": [
          "बिलकुल, मला साहस आवडेल",
          "माझा जोडीदार सहमत असेल तर मी विचार करेन",
          "मी माझ्या सध्याच्या शहरात राहणे पसंत करेन",
          "फक्त जर ते अत्यंत आवश्यक असेल तर"
        ],
        "active": true
      },
      {
        "id": 25,
        "category": "Future & Goals",
        "text": "तुमच्यासाठी \"यश\" म्हणजे काय?",
        "options": [
          "आर्थिक संपत्ती आणि स्थैर्य",
          "एक परिपूर्ण करिअर आणि ओळख",
          "मजबूत नातेसंबंध आणि एक आनंदी कुटुंब",
          "माझ्या स्वतःच्या अटींवर आयुष्य जगण्याचे स्वातंत्र्य"
        ],
        "active": true
      }
    ],
    "isPublic": true,
    "isOfficial": true,
    "createdAt": "2025-11-18T01:22:13.472Z",
    "status": "approved",
    "imageUrl": "https://i.postimg.cc/mDqG1Wnv/100071923-2.jpg",
    "language": "marathi",
    "keywords": [
      "employee",
      "manager",
      "work",
      "office",
      "team",
      "synergy",
      "कर्मचारी",
      "व्यवस्थापक"
    ],
    "analysisConfig": {
      "range0_25": "असे दिसते की तुमच्या दृष्टिकोनात बरेच फरक आहेत. काही मनोरंजक संभाषणे सुरू करण्याची आणि एकमेकांच्या जगाबद्दल अधिक जाणून घेण्याची ही एक उत्तम संधी आहे!",
      "range26_50": "तुमच्यात काही साम्य आहे, परंतु अशी क्षेत्रे देखील आहेत जिथे तुम्ही गोष्टी वेगळ्या प्रकारे पाहता. हे फरक शोधणे एक मजेदार साहस आणि एकत्र वाढण्याचा एक मार्ग असू शकतो.",
      "range51_75": "तुम्ही बहुतेक वेळा एकाच विचारांचे असता! तुमच्यात समजुतीचा एक भक्कम पाया आहे. तुमच्यातील काही फरक तुमच्या नात्यात थोडी रंगत आणू शकतात.",
      "range76_100": "व्वा, जणू काही तुम्ही एकमेकांचे मन वाचू शकता! तुमचे नाते अविश्वसनीयपणे मजबूत आहे. तुम्ही एक खोल समज शेअर करता जी खरोखरच खास आहे."
    }
  },
  {
    "id": "official-iq-check-mr",
    "title": "IQ तपासणी (फक्त मनोरंजनासाठी!) (in Marathi)",
    "description": "जोडीतील शेरलॉक कोण आहे हे पाहण्यासाठी काही अवघड प्रश्नांसह एक हलकी-फुलकी क्विझ!",
    "creatorName": "Marathi Bayko",
    "questions": [
      {
        "id": 1,
        "category": "Personality & Nature",
        "text": "तुम्ही रागावल्यावर सहसा कशी प्रतिक्रिया देता?",
        "options": [
          "शांत आणि दूरस्थ होता",
          "ते उघडपणे व्यक्त करून चर्चा करता",
          "स्वतःला इतर कामांमध्ये विचलित करण्याचा प्रयत्न करता",
          "शांत होण्यासाठी थोडा वेळ एकटे राहता"
        ],
        "active": true
      },
      {
        "id": 2,
        "category": "Personality & Nature",
        "text": "तुम्ही अधिक अंतर्मुखी आहात की बहिर्मुखी?",
        "options": [
          "पूर्णपणे अंतर्मुखी",
          "बहुतेक अंतर्मुखी",
          "दोन्हीचे मिश्रण (अँबिवर्ट)",
          "बहुतेक बहिर्मुखी",
          "पूर्णपणे बहिर्मुखी"
        ],
        "active": true
      },
      {
        "id": 3,
        "category": "Personality & Nature",
        "text": "तुम्ही तणाव कसा हाताळता?",
        "options": [
          "मित्र/कुटुंबाशी बोलता",
          "व्यायाम किंवा शारीरिक हालचाल करता",
          "छंदांमध्ये रमता",
          "एकटे हाताळणे पसंत करता"
        ],
        "active": true
      },
      {
        "id": 4,
        "category": "Personality & Nature",
        "text": "निर्णय घेताना, तुम्ही प्रामुख्याने कशावर अवलंबून असता?",
        "options": [
          "तर्क आणि तथ्य",
          "अंतर्ज्ञान आणि मनाचा कौल",
          "इतरांचा सल्ला",
          "मागील अनुभव"
        ],
        "active": true
      },
      {
        "id": 5,
        "category": "Personality & Nature",
        "text": "तुम्ही नियोजक आहात की उत्स्फूर्त?",
        "options": [
          "मी प्रत्येक गोष्टीचे तपशीलवार नियोजन करतो",
          "माझ्याकडे एक ढोबळ योजना असते",
          "मी बहुतेक प्रवाहाबरोबर जातो",
          "मी पूर्णपणे उत्स्फूर्त आहे"
        ],
        "active": true
      },
      {
        "id": 6,
        "category": "Habits & Lifestyle",
        "text": "तुम्ही सकाळी लवकर उठणारे आहात की रात्री जागणारे?",
        "options": [
          "सकाळी लवकर उठणारा - सकाळ आवडते",
          "रात्री जागणार - रात्री सर्वात जास्त उत्पादक",
          "लवचिक, दिवसावर अवलंबून",
          "दोन्ही नाही, मला फक्त जास्त झोप हवी आहे!"
        ],
        "active": true
      },
      {
        "id": 7,
        "category": "Habits & Lifestyle",
        "text": "तुम्हाला किती वेळा बाहेर जायला आवडते?",
        "options": [
          "जवळजवळ प्रत्येक आठवड्यात",
          "महिन्यातून काही वेळा",
          "महिन्यातून एकदा पुरेसे आहे",
          "मी घरी राहणे पसंत करतो"
        ],
        "active": true
      },
      {
        "id": 8,
        "category": "Habits & Lifestyle",
        "text": "तुमची आदर्श सुट्टी कोणती आहे?",
        "options": [
          "एक आरामदायी समुद्रकिनाऱ्यावरील सुट्टी",
          "ट्रेकिंग/खेळांसह एक साहसी सहल",
          "नवीन शहर आणि त्याची संस्कृती शोधणे",
          "घरी राहून आराम करणे"
        ],
        "active": true
      },
      {
        "id": 9,
        "category": "Habits & Lifestyle",
        "text": "तुमच्यासाठी स्वच्छता आणि संघटना किती महत्त्वाची आहे?",
        "options": [
          "खूप महत्त्वाचे, मला गोष्टी व्यवस्थित आवडतात",
          "थोडं महत्त्वाचं, पण थोडा पसारा चालेल",
          "फार महत्त्वाचे नाही",
          "मी संघटित गोंधळात जास्त काम करतो"
        ],
        "active": true
      },
      {
        "id": 10,
        "category": "Habits & Lifestyle",
        "text": "जेव्हा खाण्याचा विषय येतो, तेव्हा तुम्ही कसे असता?",
        "options": [
          "एक साहसी खाणारा, नवीन गोष्टी ट्राय करायला आवडतात",
          "कम्फर्ट फूड आणि क्लासिक्सने आनंदी",
          "एक आरोग्यदायी खाणारा",
          "थोडा चोखंदळ"
        ],
        "active": true
      }
    ],
    "isPublic": true,
    "isOfficial": true,
    "createdAt": "2025-11-18T01:22:13.472Z",
    "status": "approved",
    "imageUrl": "https://i.postimg.cc/NGWNyjdd/100071923-1.jpg",
    "language": "marathi",
    "keywords": [
      "iq",
      "check",
      "fun",
      "tricky",
      "sherlock",
      "brain",
      "iq",
      "तपासणी",
      "मनोरंजन"
    ],
    "analysisConfig": {
      "range0_25": "असे दिसते की तुमच्या दृष्टिकोनात बरेच फरक आहेत. काही मनोरंजक संभाषणे सुरू करण्याची आणि एकमेकांच्या जगाबद्दल अधिक जाणून घेण्याची ही एक उत्तम संधी आहे!",
      "range26_50": "तुमच्यात काही साम्य आहे, परंतु अशी क्षेत्रे देखील आहेत जिथे तुम्ही गोष्टी वेगळ्या प्रकारे पाहता. हे फरक शोधणे एक मजेदार साहस आणि एकत्र वाढण्याचा एक मार्ग असू शकतो.",
      "range51_75": "तुम्ही बहुतेक वेळा एकाच विचारांचे असता! तुमच्यात समजुतीचा एक भक्कम पाया आहे. तुमच्यातील काही फरक तुमच्या नात्यात थोडी रंगत आणू शकतात.",
      "range76_100": "व्वा, जणू काही तुम्ही एकमेकांचे मन वाचू शकता! तुमचे नाते अविश्वसनीयपणे मजबूत आहे. तुम्ही एक खोल समज शेअर करता जी खरोखरच खास आहे."
    }
  },
  {
    "id": "official-honesty-loyalty-check-mr",
    "title": "जोडप्यांची प्रामाणिकपणा आणि निष्ठा तपासणी (in Marathi)",
    "description": "जोडप्यांसाठी त्यांच्या विश्वासाचा आणि वचनबद्धतेचा पाया शोधण्यासाठी एक गंभीर क्विझ.",
    "creatorName": "Marathi Bayko",
    "questions": [
      {
        "id": 11,
        "category": "Emotions & Love Language",
        "text": "तुम्ही प्रामुख्याने प्रेम आणि आपुलकी कशी व्यक्त करता?",
        "options": [
          "पुष्टीकरण आणि कौतुकाच्या शब्दांद्वारे",
          "एकत्र दर्जेदार वेळ घालवून",
          "विचारपूर्वक भेटवस्तू देऊन",
          "शारीरिक स्पर्शाद्वारे (मिठी, इत्यादी)",
          "सेवा कार्याद्वारे (त्यांच्यासाठी काहीतरी करून)"
        ],
        "active": true
      },
      {
        "id": 12,
        "category": "Emotions & Love Language",
        "text": "भांडणाच्या वेळी, तुम्ही काय करणे पसंत करता?",
        "options": [
          "ताबडतोब बोलून ते सोडवणे",
          "विश्रांती घेऊन शांत झाल्यावर बोलणे",
          "माझा मुद्दा समजावण्यासाठी मजकूर पाठवणे",
          "थोड्या वेळासाठी शांत राहणे"
        ],
        "active": true
      },
      {
        "id": 13,
        "category": "Emotions & Love Language",
        "text": "तुम्हाला माफी कशी स्वीकारायला आवडते?",
        "options": [
          "एक प्रामाणिक \"सॉरी\" पुरेसे आहे",
          "मला वर्तनात बदल पाहण्याची गरज आहे",
          "काय झाले याबद्दल मनापासून संभाषण",
          "भेटवस्तू किंवा उपकारासारखा हावभाव"
        ],
        "active": true
      },
      {
        "id": 14,
        "category": "Emotions & Love Language",
        "text": "तुम्हाला सर्वात जास्त कौतुक झाल्यासारखे केव्हा वाटते?",
        "options": [
          "जेव्हा माझ्या प्रयत्नांची तोंडी कबुली दिली जाते",
          "जेव्हा कोणी माझ्यासाठी काहीतरी विचारपूर्वक करते",
          "जेव्हा मला आश्चर्यकारक भेटवस्तू मिळते",
          "जेव्हा कोणी माझ्यासोबत अखंड वेळ घालवते"
        ],
        "active": true
      },
      {
        "id": 15,
        "category": "Emotions & Love Language",
        "text": "तुम्ही तुमच्या भावनांबद्दल किती मोकळे आहात?",
        "options": [
          "खूप मोकळा, एक उघडे पुस्तक",
          "मी ज्या लोकांवर विश्वास ठेवतो त्यांच्याशी शेअर करतो",
          "मी माझ्या भावना स्वतःकडे ठेवतो",
          "मला मोकळे होण्यासाठी वेळ लागतो"
        ],
        "active": true
      },
      {
        "id": 16,
        "category": "Values & Family",
        "text": "मोठ्या आयुष्याच्या निर्णयात तुमच्या कुटुंबाची संमती किती महत्त्वाची आहे?",
        "options": [
          "अत्यंत महत्त्वाचे, त्यांचे मत अंतिम आहे",
          "खूप महत्त्वाचे, मी नेहमी त्याचा विचार करतो",
          "थोडं महत्त्वाचं, पण अंतिम निर्णय मीच घेतो",
          "महत्वाचे नाही, माझे आयुष्य माझे आहे"
        ],
        "active": true
      },
      {
        "id": 17,
        "category": "Values & Family",
        "text": "भविष्यासाठी तुमची आदर्श कौटुंबिक रचना कोणती आहे?",
        "options": [
          "संयुक्त कुटुंबात राहणे",
          "विभक्त कुटुंबात राहणे, पण पालकांच्या जवळ",
          "विभक्त कुटुंबात राहणे, स्वतंत्रपणे",
          "मी याचा विचार केलेला नाही"
        ],
        "active": true
      },
      {
        "id": 18,
        "category": "Values & Family",
        "text": "तुम्ही नात्यातील पैशाकडे कसे पाहता?",
        "options": [
          "आर्थिक व्यवहार पूर्णपणे सामायिक केले पाहिजेत",
          "आपण आपले आर्थिक व्यवहार वेगळे ठेवले पाहिजेत",
          "दोन्हीचे मिश्रण - काही सामायिक, काही वेगळे",
          "जो कोणी यात चांगला असेल त्याने ते व्यवस्थापित केले पाहिजे"
        ],
        "active": true
      },
      {
        "id": 19,
        "category": "Values & Family",
        "text": "तुमच्या आयुष्यात धर्म किंवा अध्यात्मची काय भूमिका आहे?",
        "options": [
          "एक खूप मध्यवर्ती आणि मार्गदर्शक भूमिका",
          "हे माझ्या संस्कृती आणि परंपरांचा भाग आहे",
          "मी आध्यात्मिक आहे पण धार्मिक नाही",
          "ते महत्त्वपूर्ण भूमिका बजावत नाही"
        ],
        "active": true
      },
      {
        "id": 20,
        "category": "Values & Family",
        "text": "तुम्ही सुट्ट्या आणि सण कसे घालवणे पसंत करता?",
        "options": [
          "मोठ्या कौटुंबिक मेळाव्यासह",
          "जवळच्या कुटुंबातील/मित्रांच्या लहान गटासह",
          "स्वतःसाठी/माझ्या जोडीदारासह एक शांत दिवस म्हणून",
          "नवीन ठिकाणी प्रवास करणे"
        ],
        "active": true
      }
    ],
    "isPublic": true,
    "isOfficial": true,
    "createdAt": "2025-11-18T01:22:13.472Z",
    "status": "approved",
    "imageUrl": "https://i.postimg.cc/0j6pk7gR/100071923.jpg",
    "language": "marathi",
    "keywords": [
      "honesty",
      "loyalty",
      "couple",
      "trust",
      "commitment",
      "relationship",
      "प्रामाणिकपणा",
      "निष्ठा",
      "जोडपे"
    ],
    "analysisConfig": {
      "range0_25": "असे दिसते की तुमच्या दृष्टिकोनात बरेच फरक आहेत. काही मनोरंजक संभाषणे सुरू करण्याची आणि एकमेकांच्या जगाबद्दल अधिक जाणून घेण्याची ही एक उत्तम संधी आहे!",
      "range26_50": "तुमच्यात काही साम्य आहे, परंतु अशी क्षेत्रे देखील आहेत जिथे तुम्ही गोष्टी वेगळ्या प्रकारे पाहता. हे फरक शोधणे एक मजेदार साहस आणि एकत्र वाढण्याचा एक मार्ग असू शकतो.",
      "range51_75": "तुम्ही बहुतेक वेळा एकाच विचारांचे असता! तुमच्यात समजुतीचा एक भक्कम पाया आहे. तुमच्यातील काही फरक तुमच्या नात्यात थोडी रंगत आणू शकतात.",
      "range76_100": "व्वा, जणू काही तुम्ही एकमेकांचे मन वाचू शकता! तुमचे नाते अविश्वसनीयपणे मजबूत आहे. तुम्ही एक खोल समज शेअर करता जी खरोखरच खास आहे."
    }
  }
];
