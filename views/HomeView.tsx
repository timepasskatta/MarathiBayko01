import React from 'react';
import { QuizTemplate, SiteImagesConfig } from '../types';
import Card from '../components/Card';
import Button from '../components/Button';
import { officialTemplates } from '../data/officialTemplates';

interface HomeViewProps {
  onStartCreator: (template: QuizTemplate) => void;
  siteImages: SiteImagesConfig;
}

const HomeView: React.FC<HomeViewProps> = ({ onStartCreator, siteImages }) => {

  const TemplateCard: React.FC<{ template: QuizTemplate, isPrimary?: boolean }> = ({ template, isPrimary = false }) => (
    <Card 
      onClick={() => onStartCreator(template)}
      className="group hover:shadow-xl transition-shadow flex flex-col p-0 overflow-hidden cursor-pointer"
    >
      {template.imageUrl && (
        <div className="overflow-hidden">
          <img 
            src={template.imageUrl}
            alt={`${template.title} thumbnail`}
            className="w-full aspect-[16/9] object-cover transition-transform duration-300 group-hover:scale-105"
            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
          />
        </div>
      )}
      <div className="p-4 flex flex-col flex-grow text-center">
        <h4 className={`font-bold text-lg ${isPrimary ? 'text-pink-600' : 'text-gray-800'}`}>{template.title}</h4>
        {isPrimary && <p className="text-gray-500 text-sm mb-2">{template.creatorName}</p>}
        <p className="text-sm text-gray-600 flex-grow mb-4">{template.description}</p>
        <Button 
          variant={isPrimary ? 'primary' : 'secondary'}
          className="w-full mt-auto"
        >
          {isPrimary ? 'Start Creating' : 'Start Quiz'}
        </Button>
      </div>
    </Card>
  );

  const createYourOwnTemplate = {
      id: 'custom-quiz',
      title: 'Create Your Own Quiz',
      description: 'Design a personalized quiz with your own questions for a truly unique compatibility test.',
      creatorName: 'You',
      questions: [],
      isPublic: false,
      isOfficial: true,
      createdAt: new Date().toISOString(),
      status: 'approved',
      imageUrl: siteImages.createQuiz,
      analysisConfig: officialTemplates.find(t=>t.id === 'official-standard')?.analysisConfig || { range0_25:'', range26_50:'', range51_75:'', range76_100:'' }
  } as QuizTemplate

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-800">Choose a Quiz</h2>
        <p className="text-gray-500 mt-2">Select a pre-made quiz to explore your relationship, or create your own for a personal touch.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <TemplateCard template={createYourOwnTemplate} isPrimary={true}/>
        {officialTemplates.map(template => (
          <TemplateCard key={template.id} template={template} />
        ))}
      </div>
    </div>
  );
};

export default HomeView;