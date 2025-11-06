import React, { useState } from 'react';
import { QuizTemplate, SiteImagesConfig, InternalAd } from '../types.ts';
import Button from '../components/Button.tsx';
import Card from '../components/Card.tsx';
import InternalAdBanner from '../components/InternalAdBanner.tsx';

interface HomeViewProps {
  quizTemplates: QuizTemplate[];
  siteImages: SiteImagesConfig;
  onStartCreator: () => void;
  onStartFromTemplate: (template: QuizTemplate) => void;
  onCodeSubmit: (code: string) => void;
  internalAd?: InternalAd;
}

const HomeView: React.FC<HomeViewProps> = ({ quizTemplates, siteImages, onStartCreator, onStartFromTemplate, onCodeSubmit, internalAd }) => {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim()) {
      setError('Please enter a code.');
      return;
    }
    onCodeSubmit(code.trim());
  };

  const officialTemplates = quizTemplates.filter(t => t.isPublic && t.isOfficial && t.status === 'approved');
  const communityTemplates = quizTemplates.filter(t => t.isPublic && !t.isOfficial && t.status === 'approved');
  
  const ActionCard: React.FC<{ title: string; description: string; imageUrl: string; onClick?: () => void; children?: React.ReactNode }> = ({ title, description, imageUrl, onClick, children }) => (
    <Card className="group hover:shadow-xl transition-shadow flex flex-col p-0 overflow-hidden">
      {imageUrl && (
        <div className="overflow-hidden">
          <img 
            src={imageUrl}
            alt={`${title} thumbnail`}
            className="w-full aspect-[16/9] object-cover transition-transform duration-300 group-hover:scale-105"
            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
          />
        </div>
      )}
      <div className="p-4 flex flex-col flex-grow">
        <h3 className={`font-bold text-lg text-gray-800`}>{title}</h3>
        {description && <p className="text-gray-600 flex-grow mt-1">{description}</p>}
        {onClick && <Button onClick={onClick} className="w-full mt-4">Start</Button>}
        {children}
      </div>
    </Card>
  );

  return (
    <div className="space-y-8">
      
      <InternalAdBanner ad={internalAd} />

      {/* Primary Actions */}
      <div className="grid md:grid-cols-2 gap-6">
        <ActionCard title="1. Create a New Quiz" description="Create a personalized quiz and get a code to share with your partner." imageUrl={siteImages.createQuiz} onClick={onStartCreator} />
        <ActionCard title="2. Got a Code?" description="Enter an Invitation or Result code here." imageUrl={siteImages.joinQuiz}>
            <form onSubmit={handleSubmit} className="flex flex-col gap-2 mt-4">
                <input
                  type="text"
                  placeholder="Enter Code..."
                  value={code}
                  onChange={(e) => { setCode(e.target.value); setError(''); }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-pink-500 focus:border-pink-500 text-center font-mono tracking-widest"
                />
                <Button type="submit" variant="secondary">Submit Code</Button>
            </form>
            {error && <p className="text-red-500 text-sm mt-2 text-center">{error}</p>}
        </ActionCard>
      </div>
      
      {/* Pre-made Quizzes */}
      <div className="space-y-6">
          <h2 className="text-2xl font-bold text-center text-gray-800 pt-4">Or, Start with a Popular Quiz</h2>
          {officialTemplates.length > 0 && (
              <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-center text-pink-600">🏆 Official Quizzes 🏆</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    {officialTemplates.map(template => (
                        <ActionCard key={template.id} title={template.title} description={template.description} imageUrl={template.imageUrl} onClick={() => onStartFromTemplate(template)}/>
                    ))}
                  </div>
              </div>
          )}
          {communityTemplates.length > 0 && (
              <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-center text-gray-700">Community Quizzes</h3>
                   <div className="grid md:grid-cols-2 gap-6">
                    {communityTemplates.map(template => (
                        <ActionCard key={template.id} title={template.title} description={template.description} imageUrl={template.imageUrl} onClick={() => onStartFromTemplate(template)}/>
                    ))}
                  </div>
              </div>
          )}
        </div>
    </div>
  );
};

export default HomeView;
