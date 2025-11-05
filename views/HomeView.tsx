import React, { useState } from 'react';
import { QuizTemplate, SessionData, AdSenseConfig, ResultData, InternalAd } from '../types';
import Button from '../components/Button';
import Card from '../components/Card';
import AdBanner from '../components/AdBanner';
import { decodeBase64ToObject, validateSessionData, validateResultData } from '../utils/helpers';
import InternalAdBanner from '../components/InternalAdBanner';

interface HomeViewProps {
  quizTemplates: QuizTemplate[];
  onStartCreator: () => void;
  onStartFromTemplate: (template: QuizTemplate) => void;
  onJoinQuiz: (session: SessionData) => void;
  onAdminLogin: () => void;
  adsEnabled: boolean;
  adSenseConfig: AdSenseConfig;
  onViewResults: (data: ResultData) => void;
  internalAd?: InternalAd;
}

const HomeView: React.FC<HomeViewProps> = ({ quizTemplates, onStartCreator, onStartFromTemplate, onJoinQuiz, onAdminLogin, adsEnabled, adSenseConfig, onViewResults, internalAd }) => {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');

  const handleCodeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim()) {
      setError('Please enter a code.');
      return;
    }
    try {
      // First, try to decode as ResultData
      const decodedResult = await decodeBase64ToObject<ResultData>(code);
      if (validateResultData(decodedResult)) {
        onViewResults(decodedResult);
        return;
      }
    } catch (e) {
      // Not a valid ResultData, proceed to check if it's SessionData
    }

    try {
      // Then, try to decode as SessionData
      const decodedSession = await decodeBase64ToObject<SessionData>(code);
      if (validateSessionData(decodedSession)) {
        onJoinQuiz(decodedSession);
        return;
      }
    } catch (e) {
        // Not a valid SessionData either
    }

    setError('Invalid or corrupted code. Please check and try again.');
  };

  const officialTemplates = quizTemplates.filter(t => t.isPublic && t.isOfficial && t.status === 'approved');
  const communityTemplates = quizTemplates.filter(t => t.isPublic && !t.isOfficial && t.status === 'approved');

  const TemplateCard: React.FC<{ template: QuizTemplate }> = ({ template }) => (
    <Card key={template.id} className="group hover:shadow-xl transition-shadow flex flex-col p-0 overflow-hidden cursor-pointer" onClick={() => onStartFromTemplate(template)}>
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
        <button className="w-full mt-4 text-pink-600 font-semibold">
          Start Quiz &rarr;
        </button>
      </div>
    </Card>
  );

  return (
    <div className="space-y-8">
      
      <InternalAdBanner ad={internalAd} />

      {/* Primary Actions */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="text-center p-6 flex flex-col items-center justify-center">
          <h2 className="text-2xl font-bold mb-2">1. Create a Quiz</h2>
          <p className="text-gray-500 mb-4 flex-grow">Create a personalized quiz and get a code to share with your partner.</p>
          <Button onClick={onStartCreator} className="w-full">Start Creating</Button>
        </Card>

        <Card className="text-center p-6 flex flex-col">
          <h2 className="text-2xl font-bold mb-2">2. Got a Code?</h2>
          <p className="text-gray-500 mb-4 flex-grow">Enter an Invitation or Result code here to continue.</p>
          <form onSubmit={handleCodeSubmit} className="flex flex-col gap-2">
            <textarea
              value={code}
              onChange={(e) => { setCode(e.target.value); setError(''); }}
              placeholder="Paste your code here"
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-pink-500 focus:border-pink-500 font-mono text-sm text-center"
            />
            <Button type="submit" variant="secondary">Submit Code</Button>
          </form>
          {error && <p className="text-red-500 text-sm mt-2 text-center">{error}</p>}
        </Card>
      </div>
      
      {adsEnabled && <AdBanner clientId={adSenseConfig.clientId} adSlotId={adSenseConfig.adSlotId} />}

      {/* Pre-made Quizzes */}
      <div className="space-y-6">
          <h2 className="text-2xl font-bold text-center text-gray-800 pt-4">...Or Use a Template</h2>
          {officialTemplates.length > 0 && (
              <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-center text-pink-600">🏆 Official Quizzes 🏆</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    {officialTemplates.map(template => <TemplateCard key={template.id} template={template} />)}
                  </div>
              </div>
          )}
          {communityTemplates.length > 0 && (
              <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-center text-gray-700">Community Quizzes</h3>
                   <div className="grid md:grid-cols-2 gap-6">
                    {communityTemplates.map(template => <TemplateCard key={template.id} template={template} />)}
                  </div>
              </div>
          )}
        </div>
    </div>
  );
};

export default HomeView;
