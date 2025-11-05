import React, { useState } from 'react';
import { QuizTemplate, SiteImagesConfig } from '../types';
import Button from '../components/Button';
import Card from '../components/Card';
import { officialTemplates } from '../data/officialTemplates';

interface HomeViewProps {
  onStartCreator: () => void;
  onStartFromTemplate: (template: QuizTemplate) => void;
  onCodeSubmit: (code: string) => Promise<{error?: string}>;
  siteImages: SiteImagesConfig;
}

const HomeView: React.FC<HomeViewProps> = ({ onStartCreator, onStartFromTemplate, onCodeSubmit, siteImages }) => {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim()) {
      setError('Please enter a code.');
      return;
    }
    const result = await onCodeSubmit(code);
    if(result.error) {
        setError(result.error);
    }
  };

  return (
    <div className="space-y-8">
      
      {/* Primary Actions */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="group hover:shadow-xl transition-shadow flex flex-col p-0 overflow-hidden" onClick={onStartCreator}>
          {siteImages.createQuiz && (
            <div className="overflow-hidden">
              <img src={siteImages.createQuiz} alt="Create a Quiz" className="w-full aspect-[16/9] object-cover transition-transform duration-300 group-hover:scale-105" />
            </div>
          )}
          <div className="p-4 flex flex-col flex-grow">
            <h2 className="text-xl font-bold mb-2">1. Create a New Quiz</h2>
            <p className="text-gray-500 mb-4 flex-grow">Create a personalized quiz and get a code to share with your partner.</p>
            <Button className="w-full mt-auto">Start Creating</Button>
          </div>
        </Card>
        <Card className="flex flex-col p-0 overflow-hidden">
          {siteImages.joinQuiz && (
            <div className="overflow-hidden">
                <img src={siteImages.joinQuiz} alt="Join a Quiz" className="w-full aspect-[16/9] object-cover" />
            </div>
           )}
           <div className="p-4 flex flex-col flex-grow">
              <h2 className="text-xl font-bold mb-2">2. Got a Code?</h2>
              <p className="text-gray-500 mb-4 flex-grow">Enter an Invitation or Result code here.</p>
              <form onSubmit={handleSubmit} className="flex flex-col gap-2 mt-auto">
                <input
                  type="text"
                  placeholder="Enter Code"
                  value={code}
                  onChange={(e) => { setCode(e.target.value); setError(''); }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-pink-500 focus:border-pink-500 text-center font-mono tracking-widest"
                />
                <Button type="submit" variant="secondary">Submit Code</Button>
              </form>
              {error && <p className="text-red-500 text-sm mt-2 text-center">{error}</p>}
           </div>
        </Card>
      </div>
      
      {/* Pre-made Quizzes */}
      <div className="space-y-6">
          <h2 className="text-2xl font-bold text-center text-gray-800 pt-4">Or, Start with a Popular Quiz</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {officialTemplates.filter(t => t.status === 'approved').map(template => (
                 <Card key={template.id} className="group hover:shadow-xl transition-shadow flex flex-col p-0 overflow-hidden">
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
                      <p className="text-sm text-gray-500 mb-2">by {template.creatorName}</p>
                      <p className="text-gray-600 flex-grow">{template.description}</p>
                      <Button onClick={() => onStartFromTemplate(template)} className="w-full mt-4" variant="secondary">
                        Use Template
                      </Button>
                    </div>
                </Card>
            ))}
          </div>
      </div>
    </div>
  );
};

export default HomeView;
