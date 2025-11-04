import React, { useState, useEffect, useRef } from 'react';
import { Profile, Answers, Question, QuizTemplate, SessionData } from '../types';
import { generateId, encodeObjectToBase64 } from '../utils/helpers';
import Button from '../components/Button';
import Card from '../components/Card';
import BackButton from '../components/BackButton';

interface ShareAndPublishViewProps {
  creatorProfile: Profile | null;
  creatorAnswers: Answers;
  questionsUsed: Question[];
  onSessionCreated: (session: SessionData) => void;
  setQuizTemplates: React.Dispatch<React.SetStateAction<QuizTemplate[]>>;
  onBack: () => void;
}

const ShareAndPublishView: React.FC<ShareAndPublishViewProps> = ({ creatorProfile, creatorAnswers, questionsUsed, onSessionCreated, setQuizTemplates, onBack }) => {
  const [invitationCode, setInvitationCode] = useState<string | null>(null);
  const [copied, setCopied] = useState<boolean>(false);
  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isPublished, setIsPublished] = useState(false);
  
  const sessionCreatedRef = useRef(false);

  useEffect(() => {
    if (creatorProfile && !sessionCreatedRef.current) {
      sessionCreatedRef.current = true;
      
      const sessionData: SessionData = {
        creatorProfile,
        creatorAnswers,
        questionsUsed,
      };

      try {
        const encodedData = encodeObjectToBase64(sessionData);
        setInvitationCode(encodedData);
        onSessionCreated(sessionData);
      } catch (error) {
          console.error("Error encoding session data:", error);
          setInvitationCode("Error: Could not generate code.");
      }
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
            isPublic: true,
            isOfficial: false,
            createdAt: new Date().toISOString(),
        };
        setQuizTemplates(prev => [...prev, newTemplate]);
        setIsPublished(true);
        alert("Your quiz has been published to the public feed!");
      }
  }

  if (!creatorProfile || !invitationCode) {
    return <Card><p className="text-center animate-pulse">Generating your invitation code...</p></Card>;
  }

  return (
    <div className="space-y-6">
      <Card className="text-center relative pt-12">
        <BackButton onClick={onBack} />
        <h2 className="text-2xl font-bold mb-4">✅ Your Quiz is Ready!</h2>
        <p className="text-gray-600 mb-6">
          Now, copy the special code below and send it to your partner. They'll use it on the home page to start the quiz.
        </p>

        <div className="bg-rose-50 border-2 border-dashed border-rose-200 rounded-lg p-4 mb-6">
          <p className="text-gray-500 text-sm mb-2">Your Unique Invitation Code</p>
          <textarea
            readOnly
            className="w-full h-24 p-2 font-mono text-xs text-gray-600 bg-transparent border-none focus:ring-0 resize-none text-center"
            value={invitationCode}
          />
        </div>
        
        <Button onClick={handleCopy}>
          {copied ? 'Copied to Clipboard!' : 'Copy Invitation Code'}
        </Button>
      </Card>

      <Card className="text-left">
          <h3 className="text-xl font-bold mb-4">📣 Optional: Publish Your Quiz?</h3>
          <p className="text-gray-500 mb-4 text-sm">
              Want to let others play your quiz? Give it a title and description to add it to the public 'Community Quizzes' list on the home page.
              <br/>
              <strong>Note:</strong> Your answers will be used as the 'correct' answers for the public.
          </p>
          
          <div className="space-y-4">
              <input type="text" placeholder="Quiz Title (e.g., 'For Movie Lovers')" value={title} onChange={e => setTitle(e.target.value)} className="w-full p-2 border rounded"/>
              <textarea placeholder="Short Description" value={description} onChange={e => setDescription(e.target.value)} rows={2} className="w-full p-2 border rounded"></textarea>
              <Button onClick={handlePublish} variant="secondary" disabled={!title || !description || isPublished}>
                {isPublished ? 'Published to Community!' : 'Publish to Public Feed'}
              </Button>
          </div>
      </Card>
    </div>
  );
};

export default ShareAndPublishView;