
import React, { useState } from 'react';
// FIX: Changed import path to be relative.
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
  const [invitationCode, setInvitationCode] = useState('');
  const [joinError, setJoinError] = useState('');
  const [resultCode, setResultCode] = useState('');
  const [resultError, setResultError] = useState('');

  const handleCodeSubmit = async <TData,>(
    e: React.FormEvent,
    code: string,
    setError: React.Dispatch<React.SetStateAction<string>>,
    onSuccess: (data: TData) => void,
    errorMessages: { empty: string; invalid: string; },
    validationFn: (data: any) => data is TData
  ) => {
    e.preventDefault();
    if (!code.trim()) {
      setError(errorMessages.empty);
      return;
    }
    try {
      const decodedData = await decodeBase64ToObject<TData>(code);
      if (validationFn(decodedData)) {
        onSuccess(decodedData);
      } else {
        throw new Error("Invalid data structure in code.");
      }
    } catch (error) {
      console.error("Failed to parse code:", error);
      setError(errorMessages.invalid);
    }
  };

  const officialTemplates = quizTemplates.filter(t => t.isPublic && t.isOfficial && t.status === 'approved');
  const communityTemplates = quizTemplates.filter(t => t.isPublic && !t.isOfficial && t.status === 'approved');

  const TemplateCard: React.FC<{ template: QuizTemplate }> = ({ template }) => (
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
  );

  return (
    <div className="space-y-8">
      
      <InternalAdBanner ad={internalAd} />

      {/* Primary Actions */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="text-center p-6 flex flex-col items-center justify-center">
          <h2 className="text-2xl font-bold mb-2">1. Create a New Quiz</h2>
          <p className="text-gray-500 mb-4 flex-grow">Create a personalized quiz and get a code to share with your partner.</p>
          <Button onClick={onStartCreator} className="w-full">Start Creating</Button>
        </Card>
        <Card className="text-center p-6 flex flex-col">
          <h2 className="text-2xl font-bold mb-2">2. Join a Quiz</h2>
          <p className="text-gray-500 mb-4 flex-grow">Got a code from your partner? Enter it here to start the quiz.</p>
          <form onSubmit={(e) => handleCodeSubmit(e, invitationCode, setJoinError, onJoinQuiz, { empty: 'Please enter the code from your partner.', invalid: 'Invalid or corrupted invitation code. Please check and try again.' }, validateSessionData)} className="flex flex-col gap-2">
            <input
              type="text"
              placeholder="Enter Invitation Code"
              value={invitationCode}
              onChange={(e) => { setInvitationCode(e.target.value); setJoinError(''); }}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-pink-500 focus:border-pink-500 text-center font-mono tracking-widest"
            />
            <Button type="submit" variant="secondary">Join Quiz</Button>
          </form>
          {joinError && <p className="text-red-500 text-sm mt-2 text-center">{joinError}</p>}
        </Card>
      </div>

      <Card>
        <h2 className="text-2xl font-bold text-center mb-4">3. View Your Results</h2>
        <p className="text-gray-500 mb-6 text-center">After your partner finishes, they'll get a 'Result Code'. Enter it here to see your compatibility report!</p>
        <form onSubmit={(e) => handleCodeSubmit(e, resultCode, setResultError, onViewResults, { empty: 'Please enter a result code.', invalid: 'Invalid or corrupted result code. Please check and try again.'}, validateResultData)} className="max-w-md mx-auto flex flex-col gap-2">
            <input
              type="text"
              placeholder="Enter Result Code"
              value={resultCode}
              onChange={(e) => { setResultCode(e.target.value); setResultError(''); }}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-pink-500 focus:border-pink-500 text-center font-mono"
            />
            <Button type="submit" variant="secondary">View My Results</Button>
        </form>
        {resultError && <p className="text-red-500 text-sm mt-2 text-center">{resultError}</p>}
      </Card>
      
      {adsEnabled && <AdBanner clientId={adSenseConfig.clientId} adSlotId={adSenseConfig.adSlotId} />}

      {/* Pre-made Quizzes */}
      <div className="space-y-6">
          <h2 className="text-2xl font-bold text-center text-gray-800 pt-4">Or, Start with a Popular Quiz</h2>
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

      <div className="text-center pt-4">
          <button onClick={onAdminLogin} className="text-sm text-gray-400 hover:text-pink-600 hover:underline">Admin Panel</button>
      </div>
    </div>
  );
};

export default HomeView;
