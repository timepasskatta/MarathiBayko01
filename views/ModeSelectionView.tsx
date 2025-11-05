
import React from 'react';
import { QuizTemplate, Question } from '../types';
import Card from '../components/Card';
import Button from '../components/Button';
import BackButton from '../components/BackButton';

interface ModeSelectionViewProps {
  onSelectTemplate: (template: QuizTemplate) => void;
  templates: QuizTemplate[];
  onBack: () => void;
}

const createCustomTemplate = (): QuizTemplate => ({
    id: 'custom',
    title: 'Custom Quiz',
    description: 'A quiz made by you!',
    creatorName: '',
    questions: [],
    isPublic: false,
    isOfficial: false,
    createdAt: new Date().toISOString(),
    status: 'approved',
    imageUrl: '',
    analysisConfig: {
      range0_25: "It seems like there are quite a few differences in your perspectives. This is a great opportunity to start some interesting conversations and learn more about each other's worlds!",
      range26_50: "You two have some common ground, but also areas where you see things differently. Exploring these differences can be a fun adventure and a way to grow even closer.",
      range51_75: "You're on the same wavelength most of the time! You have a solid foundation of understanding. The few differences you have can add a little spice to your relationship.",
      range76_100: "Wow, it's like you can read each other's minds! Your connection is incredibly strong. You share a deep understanding that is truly special.",
    }
});


const ModeSelectionView: React.FC<ModeSelectionViewProps> = ({ onSelectTemplate, templates, onBack }) => {
  const official = templates.filter(t => t.isOfficial && t.status === 'approved');
  const community = templates.filter(t => !t.isOfficial && t.status === 'approved');
  
  return (
    <Card className="relative pt-12">
      <BackButton onClick={onBack} />
      <h2 className="text-2xl font-bold text-center mb-6">Choose Your Quiz</h2>

      <div className="space-y-6 max-h-[70vh] overflow-y-auto pr-2">
        <div>
          <h3 className="text-xl font-semibold text-pink-600 mb-3 border-b-2 border-rose-200 pb-2">Official Quizzes</h3>
          <div className="space-y-3">
            {official.map(template => (
              <Card key={template.id} onClick={() => onSelectTemplate(template)} className="cursor-pointer hover:shadow-xl hover:border-pink-300 border-2 border-transparent transition-shadow">
                <h4 className="font-bold text-gray-800">{template.title}</h4>
                <p className="text-sm text-gray-500">{template.description}</p>
              </Card>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-pink-600 mb-3 border-b-2 border-rose-200 pb-2">Community Quizzes</h3>
          {community.length > 0 ? (
            <div className="space-y-3">
              {community.map(template => (
                 <Card key={template.id} onClick={() => onSelectTemplate(template)} className="cursor-pointer hover:shadow-xl hover:border-pink-300 border-2 border-transparent transition-shadow">
                  <h4 className="font-bold text-gray-800">{template.title}</h4>
                  <p className="text-sm text-gray-500 italic">"{template.description}"</p>
                  <p className="text-xs text-right text-gray-400 mt-2">- by {template.creatorName}</p>
                </Card>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-500 text-center py-4">No community quizzes yet. Create one and publish it!</p>
          )}
        </div>
        
        <div>
          <h3 className="text-xl font-semibold text-pink-600 mb-3 border-b-2 border-rose-200 pb-2">Create Your Own</h3>
           <Card onClick={() => onSelectTemplate(createCustomTemplate())} className="cursor-pointer hover:shadow-xl hover:border-pink-300 border-2 border-transparent transition-shadow">
              <h4 className="font-bold text-gray-800">Custom Quiz Builder</h4>
              <p className="text-sm text-gray-500">Write your own questions for a truly personal experience.</p>
            </Card>
        </div>
      </div>
    </Card>
  );
};

export default ModeSelectionView;
