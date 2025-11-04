import React, { useState } from 'react';
import { QuizTemplate, SessionData } from '../types';
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
}

const HomeView: React.FC<HomeViewProps> = ({ quizTemplates, onStartCreator, onStartFromTemplate, onJoinQuiz, onAdminLogin, adsEnabled }) => {
  const [invitationCode, setInvitationCode] = useState('');
  const [joinError, setJoinError] = useState('');

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
  
  const officialTemplates = quizTemplates.filter(t => t.isPublic && t.isOfficial);
  const communityTemplates = quizTemplates.filter(t => t.isPublic && !t.isOfficial);

  return (
    <div className="space-y-8">
      <Card className="text-center">
        <h2 className="text-2xl font-bold mb-2">Create Your Own Quiz</h2>
        <p className="text-gray-500 mb-4">Find out how well your partner knows you with a fun, personalized quiz.</p>
        <Button onClick={onStartCreator}>Start a New Quiz</Button>
      </Card>
      
      <Card>
        <h2 className="text-2xl font-bold text-center mb-4">Join a Quiz</h2>
        <form onSubmit={handleJoin} className="flex flex-col sm:flex-row gap-2">
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
          <Button type="submit" variant="secondary" className="sm:w-auto">Join</Button>
        </form>
        {joinError && <p className="text-red-500 text-sm mt-2 text-center">{joinError}</p>}
      </Card>

      {adsEnabled && <AdBanner />}
      
      {officialTemplates.length > 0 && (
          <div className="space-y-4">
              <h2 className="text-xl font-bold text-center text-gray-700">🏆 Official Quizzes 🏆</h2>
              {officialTemplates.map(template => (
                  <Card key={template.id} className="hover:shadow-xl transition-shadow border-2 border-pink-200">
                     <div className="flex justify-between items-start">
                          <div>
                              <h3 className="font-bold text-lg text-pink-600">{template.title}</h3>
                              <p className="text-sm text-gray-500 mb-2">by {template.creatorName}</p>
                              <p className="text-gray-600">{template.description}</p>
                          </div>
                          <Button onClick={() => onStartFromTemplate(template)} className="w-auto ml-4" variant="secondary">
                              Use Template
                          </Button>
                      </div>
                  </Card>
              ))}
          </div>
      )}

      {communityTemplates.length > 0 && (
          <div className="space-y-4">
              <h2 className="text-xl font-bold text-center text-gray-700">Community Quizzes</h2>
              {communityTemplates.map(template => (
                  <Card key={template.id} className="hover:shadow-xl transition-shadow">
                      <div className="flex justify-between items-start">
                          <div>
                              <h3 className="font-bold text-lg text-pink-600">{template.title}</h3>
                              <p className="text-sm text-gray-500 mb-2">by {template.creatorName}</p>
                              <p className="text-gray-600">{template.description}</p>
                          </div>
                          <Button onClick={() => onStartFromTemplate(template)} className="w-auto ml-4" variant="secondary">
                              Use Template
                          </Button>
                      </div>
                  </Card>
              ))}
          </div>
      )}

      <div className="text-center pt-4">
          <button onClick={onAdminLogin} className="text-sm text-gray-400 hover:text-pink-600 hover:underline">Admin Panel</button>
      </div>
    </div>
  );
};

export default HomeView;