
import React, { useState, useEffect } from 'react';
import { Profile, Answers, Question, SessionData, AnalysisConfig } from '../types';
import { encodeObjectToBase64 } from '../utils/helpers';
import Button from '../components/Button';
import Card from '../components/Card';
import BackButton from '../components/BackButton';

interface ShareViewProps {
  creatorProfile: Profile | null;
  creatorAnswers: Answers;
  questionsUsed: Question[];
  analysisConfig: AnalysisConfig;
  onBack: () => void;
}

const ShareView: React.FC<ShareViewProps> = ({ creatorProfile, creatorAnswers, questionsUsed, analysisConfig, onBack }) => {
  const [invitationCode, setInvitationCode] = useState<string | null>(null);
  const [copied, setCopied] = useState<boolean>(false);
  
  useEffect(() => {
    if (creatorProfile) {
      const sessionData: SessionData = {
        creatorProfile,
        creatorAnswers,
        questionsUsed,
        analysisConfig,
      };

      const generateCode = async () => {
        try {
          const encodedData = await encodeObjectToBase64(sessionData);
          setInvitationCode(encodedData);
        } catch (error) {
            console.error("Error encoding session data:", error);
            setInvitationCode("Error: Could not generate code.");
        }
      };
      
      generateCode();
    }
  }, [creatorProfile, creatorAnswers, questionsUsed, analysisConfig]);

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
  );
};

export default ShareView;
