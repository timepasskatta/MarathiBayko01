
import React, { useState, useEffect } from 'react';
// FIX: Corrected import path for types.
import { Profile, Answers, Question, QuizTemplate, SessionData } from '../types';
import { generateId, encodeObjectToBase64 } from '../utils/helpers';
import Button from '../components/Button';
import Card from '../components/Card';

interface ShareAndPublishViewProps {
  creatorProfile: Profile | null;
  creatorAnswers: Answers;
  questionsUsed: Question[];
  onSessionCreated: (sessionData: SessionData) => void;
  setQuizTemplates: React.Dispatch<React.SetStateAction<QuizTemplate[]>>;
}

const ShareAndPublishView: React.FC<ShareAndPublishViewProps> = ({ creatorProfile, creatorAnswers, questionsUsed, onSessionCreated, setQuizTemplates }) => {
  const [invitationCode, setInvitationCode] = useState<string | null>(null);
  const [copied, setCopied] = useState<boolean>(false);
  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');


  useEffect(() => {
    if (creatorProfile) {
      const sessionData: SessionData = {
        creatorProfile,
        creatorAnswers,
        questionsUsed,
        // HACK: Using default analysis for this component as template info is not available.
        analysisConfig: { range0_25: '', range26_50: '', range51_75: '', range76_100: '' },
      };

      const generateCode = async () => {
        const encoded = await encodeObjectToBase64(sessionData);
        setInvitationCode(encoded);
        onSessionCreated(sessionData);
      };
      
      generateCode();
    }
  }, [creatorProfile, creatorAnswers, questionsUsed, onSessionCreated]);

  const handleCopy = () => {
    if (invitationCode) {
      navigator.clipboard.writeText(invitationCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handlePublish = () => {
      if (!title || !description) {
          alert("Please provide a title and description to publish your quiz.");
          return;
      }
      if(creatorProfile) {
        const newTemplate: QuizTemplate = {
            id: generateId(),
            title,
            description,
            creatorName: creatorProfile.name,
            questions: questionsUsed,
            isPublic: false, // Must be approved by admin first
            isOfficial: false,
            createdAt: new Date().toISOString(),
            status: 'pending', // Set status to pending for admin review
            // FIX: Added missing imageUrl property to match QuizTemplate type.
            imageUrl: '',
            // FIX: Added missing analysisConfig property to match QuizTemplate type.
            analysisConfig: { range0_25: '', range26_50: '', range51_75: '', range76_100: '' },
        };
        setQuizTemplates(prev => [...prev, newTemplate]);
        alert("Your quiz has been submitted for review by an admin!");
      }
  }

  if (!creatorProfile || !invitationCode) {
    return <Card><p>Generating your invitation code...</p></Card>;
  }

  return (
    <Card className="text-center">
      <h2 className="text-2xl font-bold mb-4">Your Room is Ready!</h2>
      <p className="text-gray-600 mb-6">
        Share this invitation code with your partner. They can enter it on the home page to join.
      </p>

      <div className="bg-rose-50 border-2 border-dashed border-rose-200 rounded-lg p-4 mb-6">
        <p className="text-gray-500 text-sm mb-2">Your Invitation Code</p>
        <textarea
          readOnly
          value={invitationCode}
          className="w-full h-24 p-2 font-mono text-xs text-center bg-transparent border-none resize-none focus:ring-0"
        />
      </div>
      
      <Button onClick={handleCopy}>
        {copied ? 'Copied!' : 'Copy Invitation Code'}
      </Button>

      <div className="mt-8 pt-6 border-t border-gray-200 text-left">
          <h3 className="text-xl font-bold mb-4">📣 Publish Your Quiz?</h3>
          <p className="text-gray-500 mb-4 text-sm">Make your quiz public so others can take it from the home page feed.</p>
          
          <div className="space-y-4">
              <input type="text" placeholder="Quiz Title (e.g., 'For Movie Lovers')" value={title} onChange={e => setTitle(e.target.value)} className="w-full p-2 border rounded"/>
              <textarea placeholder="Short Description" value={description} onChange={e => setDescription(e.target.value)} rows={2} className="w-full p-2 border rounded"></textarea>
              <Button onClick={handlePublish} variant="secondary" disabled={!title || !description}>Publish to Public Feed</Button>
          </div>
      </div>
    </Card>
  );
};

export default ShareAndPublishView;
