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
      setJoinError('Please enter the code from your partner.');
      return;
    }
    try {
      // The invitation code now contains the entire session data, encoded in Base64.
      const decodedString = atob(invitationCode);
      const sessionData = JSON.parse(decodedString) as SessionData;
      // Basic validation
      if (sessionData.creatorProfile && sessionData.creatorAnswers && sessionData.questionsUsed) {
        onJoinQuiz(sessionData);
      } else {
        throw new Error("Invalid data structure in invitation code.");
      }
    } catch (error) {
      console.error("Failed to parse invitation code:", error);
      setJoinError('Invalid or corrupted invitation code. Please check and try again.');
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
      // Basic validation
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

  return (
    <div className="space-y-8">
      
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
          <form onSubmit={handleJoin} className="flex flex-col gap-2">
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
        <form onSubmit={handleViewResultsSubmit} className="max-w-md mx-auto flex flex-col gap-2">
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

      <div className="text-center pt-4">
          <button onClick={onAdminLogin} className="text-sm text-gray-400 hover:text-pink-600 hover:underline">Admin Panel</button>
      </div>
    </div>
  );
};

export default HomeView;