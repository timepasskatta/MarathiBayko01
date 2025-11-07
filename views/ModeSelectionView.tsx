import React from 'react';
import { QuizTemplate } from '../types.ts';
import Card from '../components/Card.tsx';
import Button from '../components/Button.tsx';

interface ModeSelectionViewProps {
  officialTemplates: QuizTemplate[];
  onSelectTemplate: (template: QuizTemplate) => void;
  onSelectCustom: () => void;
  onBack: () => void;
}

const ModeSelectionView: React.FC<ModeSelectionViewProps> = ({ officialTemplates, onSelectTemplate, onSelectCustom, onBack }) => {
  return (
    <Card>
      <button onClick={onBack} className="text-sm text-pink-600 hover:underline mb-4">&larr; Back to Home</button>
      <h2 className="text-2xl font-bold mb-6 text-center">Choose a Quiz</h2>
      <div className="space-y-4">
        <div className="border border-rose-200 p-4 rounded-lg text-center">
            <h3 className="text-xl font-semibold text-pink-600">Create Your Own Quiz</h3>
            <p className="text-gray-500 my-2 text-sm">Design a personalized quiz with your own questions for a truly unique compatibility test.</p>
            <Button onClick={onSelectCustom}>Start Creating</Button>
        </div>
        <h3 className="text-xl font-semibold text-center pt-4">Or Use a Template</h3>
        {officialTemplates.map((template) => (
          <div key={template.id} className="border border-rose-200 p-4 rounded-lg">
            <h4 className="font-bold text-lg">{template.title}</h4>
            <p className="text-gray-500 mb-2 text-sm">by {template.creatorName}</p>
            <p className="text-gray-600">{template.description}</p>
            <Button onClick={() => onSelectTemplate(template)} variant="secondary" className="mt-4">
              Use this Template
            </Button>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default ModeSelectionView;
