import React from 'react';
import { QuizTemplate, SiteImagesConfig } from '../types.ts';
import { officialTemplates } from '../data/officialTemplates.ts';
import Button from '../components/Button.tsx';
import Card from '../components/Card.tsx';

interface HomeViewProps {
  onStartCreator: (template?: QuizTemplate) => void;
  siteImages: SiteImagesConfig;
}

const HomeView: React.FC<HomeViewProps> = ({ onStartCreator, siteImages }) => {

  const TemplateCard: React.FC<{ template: QuizTemplate, isAction?: boolean }> = ({ template, isAction = false }) => (
    <Card className="group hover:shadow-xl transition-shadow flex flex-col p-0 overflow-hidden">
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
      <div className="p-4 flex flex-col flex-grow">
        <h4 className={`font-bold text-lg ${template.isOfficial ? 'text-pink-700' : 'text-gray-800'}`}>{template.title}</h4>
        { !isAction && <p className="text-sm text-gray-500 mb-2">by {template.creatorName}</p> }
        <p className="text-gray-600 flex-grow">{template.description}</p>
        <Button 
            onClick={() => onStartCreator(isAction ? undefined : template)} 
            className="w-full mt-4" 
            variant={isAction ? 'primary' : 'secondary'}
        >
          {isAction ? "Start Creating" : "Start Quiz"}
        </Button>
      </div>
    </Card>
  );

  return (
    <div className="space-y-8">
        <Card className="text-center">
            <h2 className="text-3xl font-bold text-gray-800">Choose a Quiz</h2>
            <p className="text-gray-500 mt-2">Select a pre-made quiz to explore your relationship, or create your own for a personal touch.</p>
        </Card>
        
        <div className="grid md:grid-cols-2 gap-6">
            <TemplateCard template={{
                id: 'custom-creator',
                title: 'Create Your Own Quiz',
                description: 'Design a personalized quiz with your own questions for a truly unique compatibility test.',
                imageUrl: siteImages.createQuiz,
                isOfficial: true,
                questions: [],
                creatorName: '',
                isPublic: false,
                createdAt: '',
                status: 'approved',
                analysisConfig: officialTemplates[0].analysisConfig,
            }} isAction={true} />
            
            {officialTemplates.map(template => <TemplateCard key={template.id} template={template} />)}
        </div>
    </div>
  );
};

export default HomeView;
