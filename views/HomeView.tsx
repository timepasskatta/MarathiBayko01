
import React from 'react';
// FIX: Added .ts extension to fix module resolution issue.
import { QuizTemplate, SiteImagesConfig } from '../types.ts';
// FIX: Added .ts extension to fix module resolution issue.
import { officialTemplates } from '../data/officialTemplates.ts';
// FIX: Added .tsx extension to fix module resolution issue.
import Card from '../components/Card.tsx';
// FIX: Added .tsx extension to fix module resolution issue.
import Button from '../components/Button.tsx';

interface HomeViewProps {
  onStartCreator: (template: QuizTemplate) => void;
  siteImages: SiteImagesConfig;
}

const HomeView: React.FC<HomeViewProps> = ({ onStartCreator, siteImages }) => {
  const createYourOwnTemplate: QuizTemplate = {
    id: 'action-create',
    title: 'Create Your Own Quiz',
    description: 'Design a personalized quiz with your own questions for a truly unique compatibility test.',
    imageUrl: siteImages.createQuiz,
    creatorName: 'You!',
    isPublic: false,
    isOfficial: false,
    status: 'approved',
    createdAt: new Date().toISOString(),
    questions: [],
    analysisConfig: {
      range0_25: "It seems like there are quite a few differences in your perspectives.",
      range26_50: "You two have some common ground, but also areas where you see things differently.",
      range51_75: "You're on the same wavelength most of the time!",
      range76_100: "Wow, it's like you can read each other's minds!",
    }
  };

  const templatesToDisplay = [createYourOwnTemplate, ...officialTemplates];

  return (
    <div className="text-center">
      <h2 className="text-3xl font-bold mb-4">Choose a Quiz</h2>
      <p className="text-gray-600 mb-8 max-w-xl mx-auto">Select a pre-made quiz to explore your relationship, or create your own for a personal touch.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {templatesToDisplay.map((template) => (
          <Card 
            key={template.id} 
            className="flex flex-col text-center cursor-pointer transform hover:scale-105 transition-transform duration-300"
            onClick={() => onStartCreator(template)}
          >
            <img src={template.imageUrl} alt={template.title} className="rounded-lg w-full h-40 object-cover mb-4" />
            <div className="flex-grow flex flex-col">
              <h3 className="text-lg font-bold text-pink-600">{template.title}</h3>
              <p className="text-sm text-gray-500 flex-grow mt-2">{template.description}</p>
              {template.id === 'action-create' ? (
                <div className="mt-4">
                  <Button>Start Creating</Button>
                </div>
              ) : (
                <div className="mt-4">
                  <Button variant="secondary">Start Quiz</Button>
                </div>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default HomeView;
