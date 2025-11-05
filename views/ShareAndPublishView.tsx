import React, { useState, useEffect } from 'react';
import { Profile, Answers, Question, QuizTemplate, SessionData, InternalAd } from '../types';
import { encodeObjectToBase64 } from '../utils/helpers';
import Button from '../components/Button';
import Card from '../components/Card';
import BackButton from '../components/BackButton';
import InternalAdBanner from '../components/InternalAdBanner';

interface ShareAndPublishViewProps {
  creatorProfile: Profile;
  creatorAnswers: Answers;
  questionsUsed: Question[];
  onBack: () => void;
  internalAd?: InternalAd;
  activeTemplate: QuizTemplate;
}

const ShareAndPublishView: React.FC<ShareAndPublishViewProps> = ({ creatorProfile, creatorAnswers, questionsUsed, onBack, internalAd, activeTemplate }) => {
  const [invitationCode, setInvitationCode] = useState<string | null>(null);
  const [copied, setCopied] = useState<boolean>(false);
  
  useEffect(() => {
    if (creatorProfile && activeTemplate) {
      const sessionData: SessionData = {
        creatorProfile,
        creatorAnswers,
        questionsUsed,
        analysisConfig: activeTemplate.analysisConfig,
        quizTitle: activeTemplate.title,
      };

      const generateCode = async () => {
        try {
          const sanitizedData = JSON.parse(JSON.stringify(sessionData));
          const encodedData = await encodeObjectToBase64(sanitizedData);
          setInvitationCode(encodedData);
        } catch (error) {
            console.error("Error encoding session data:", error);
            setInvitationCode("Error: Could not generate code.");
        }
      };
      
      generateCode();
    }
  }, [creatorProfile, creatorAnswers, questionsUsed, activeTemplate]);

  const handleCopy = () => {
    if (invitationCode) {
      navigator.clipboard.writeText(invitationCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

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
      
      <InternalAdBanner ad={internalAd} />
    </div>
  );
};

export default ShareAndPublishView;