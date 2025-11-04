import React, { useState } from 'react';
import { QuizTemplate, SessionData, AdSenseConfig, ResultData } from '../types';
import Button from '../components/Button';
import Card from '../components/Card';
import AdBanner from '../components/AdBanner';

interface HomeViewProps {
  quizTemplates: QuizTemplate[];
  onStartCreator: () => void;
  onStartFromTemplate: (template: QuizTemplate) => void;
  onJoinQuiz: (session: SessionData) => void;
  onAdminLogin: () => void;
  adsEnabled: boolean;
  adSenseConfig: AdSenseConfig;
  onViewResults: (data: ResultData) => void;
}

const HomeView: React.FC<HomeViewProps> = ({ quizTemplates, onStartCreator, onStartFromTemplate, onJoinQuiz, onAdminLogin, adsEnabled, adSenseConfig, onViewResults }) => {
  const [invitationCode, setInvitationCode] = useState('');
  const [joinError, setJoinError] = useState('');
  const [resultCode, setResultCode] = useState('');
  const [resultError, setResultError] = useState('');

  const handleJoin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!invitationCode.trim()) {
      setJoinError('Please enter an invitation code.');
      return;
    }
    const sessionDataString = localStorage.getItem(`session-${invitationCode.toUpperCase()}`);
    if (sessionDataString) {
      try {
        const sessionData = JSON.parse(sessionDataString) as SessionData;
        onJoinQuiz(sessionData);
      } catch (error) {
        setJoinError('Invalid session data. Please check the code.');
      }
    } else {
      setJoinError('Invitation code not found. Please check the code and try again.');
    }
  };

  const handleViewResultsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!resultCode.trim()) {
      setResultError('Please enter a result code.');
      return;
    }
    try {
      const decodedString = atob(resultCode);
      const resultData = JSON.parse(decodedString) as ResultData;
      // Basic validation to ensure it's the right data structure
      if (resultData.creatorProfile && resultData.partnerAnswers && resultData.questionsUsed) {
        onViewResults(resultData);
      } else {
        throw new Error("Invalid data structure in result code.");
      }
    } catch (error) {
      console.error("Failed to parse result code:", error);
      setResultError('Invalid or corrupted result code. Please check and try again.');
    }
  };
  
  const officialTemplates = quizTemplates.filter(t => t.isPublic && t.isOfficial);
  const communityTemplates = quizTemplates.filter(t => t.isPublic && !t.isOfficial);
  const hasPublicQuizzes = officialTemplates.length > 0 || communityTemplates.length > 0;

  return (
    <div className="space-y-8">

      {hasPublicQuizzes ? (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-center text-gray-800">Start with a Popular Quiz</h2>
          {officialTemplates.length > 0 && (
              <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-center text-pink-600">🏆 Official Quizzes 🏆</h3>
                  {officialTemplates.map(template => (
                      <Card key={template.id} className="hover:shadow-xl transition-shadow border-2 border-pink-200">
                         <div className="flex flex-col sm:flex-row justify-between items-center sm:items-start text-center sm:text-left gap-4">
                              <div>
                                  <h4 className="font-bold text-lg text-pink-700">{template.title}</h4>
                                  <p className="text-sm text-gray-500 mb-2">by {template.creatorName}</p>
                                  <p className="text-gray-600">{template.description}</p>
                              </div>
                              <Button onClick={() => onStartFromTemplate(template)} className="w-full sm:w-auto flex-shrink-0" variant="secondary">
                                  Use Template
                              </Button>
                          </div>
                      </Card>
                  ))}
              </div>
          )}
          {communityTemplates.length > 0 && (
              <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-center text-gray-700">Community Quizzes</h3>
                  {communityTemplates.map(template => (
                      <Card key={template.id} className="hover:shadow-xl transition-shadow">
                          <div className="flex flex-col sm:flex-row justify-between items-center sm:items-start text-center sm:text-left gap-4">
                              <div>
                                  <h4 className="font-bold text-lg text-gray-800">{template.title}</h4>
                                  <p className="text-sm text-gray-500 mb-2">by {template.creatorName}</p>
                                  <p className="text-gray-600">{template.description}</p>
                              </div>
                              <Button onClick={() => onStartFromTemplate(template)} className="w-full sm:w-auto flex-shrink-0" variant="secondary">
                                  Use Template
                              </Button>
                          </div>
                      </Card>
                  ))}
              </div>
          )}
        </div>
      ) : (
        <Card className="text-center border-2 border-dashed border-rose-200 bg-rose-50">
            <h2 className="text-xl font-bold text-gray-700 mb-2">🔍 Public Quiz Feed</h2>
            <p className="text-gray-500">
                "Official" and "Community" quizzes will appear here once the admin creates them.
            </p>
        </Card>
      )}

      <Card className="text-center">
        <h2 className="text-2xl font-bold mb-2">Or, Create Your Own</h2>
        <p className="text-gray-500 mb-4">Find out how well your partner knows you with a fun, personalized quiz.</p>
        <Button onClick={onStartCreator}>Start a New Quiz</Button>
      </Card>
      
      {adsEnabled && <AdBanner clientId={adSenseConfig.clientId} adSlotId={adSenseConfig.adSlotId} />}

      <Card>
        <h2 className="text-2xl font-bold text-center mb-6">Already have a code?</h2>
        <div className="grid md:grid-cols-2 gap-8 md:gap-6">
          
          {/* Join a Quiz */}
          <div className="space-y-4 text-center">
            <h3 className="text-xl font-semibold text-pink-600">Join a Quiz</h3>
            <form onSubmit={handleJoin} className="flex flex-col gap-2">
              <input
                type="text"
                placeholder="Enter Invitation Code"
                value={invitationCode}
                onChange={(e) => {
                  setInvitationCode(e.target.value.toUpperCase());
                  setJoinError('');
                }}
                className="flex-grow mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-pink-500 focus:border-pink-500 text-center font-mono tracking-widest"
              />
              <Button type="submit" variant="secondary">Join</Button>
            </form>
            {joinError && <p className="text-red-500 text-sm mt-2 text-center">{joinError}</p>}
          </div>

          {/* View Results */}
          <div className="space-y-4 text-center border-t md:border-t-0 md:border-l border-gray-200 pt-8 md:pt-0 md:pl-6">
            <h3 className="text-xl font-semibold text-pink-600">View Results</h3>
            <form onSubmit={handleViewResultsSubmit} className="flex flex-col gap-2">
              <input
                type="text"
                placeholder="Enter Result Code"
                value={resultCode}
                onChange={(e) => {
                  setResultCode(e.target.value);
                  setResultError('');
                }}
                className="flex-grow mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-pink-500 focus:border-pink-500 text-center font-mono"
              />
              <Button type="submit" variant="secondary">View</Button>
            </form>
            {resultError && <p className="text-red-500 text-sm mt-2 text-center">{resultError}</p>}
          </div>
        </div>
      </Card>

      <div className="text-center pt-4">
          <button onClick={onAdminLogin} className="text-sm text-gray-400 hover:text-pink-600 hover:underline">Admin Panel</button>
      </div>
    </div>
  );
};

export default HomeView;