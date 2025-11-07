import React, { useState } from 'react';
import { SessionData, QuizTemplate } from '../types.ts';
import { encodeObjectToBase64 } from '../utils/helpers.ts';
import Button from '../components/Button.tsx';
import Card from '../components/Card.tsx';

interface ShareViewProps {
  sessionData: SessionData;
  quizTitle: string;
  onBack: () => void;
}

const ShareView: React.FC<ShareViewProps> = ({ sessionData, quizTitle, onBack }) => {
  const [copied, setCopied] = useState(false);
  
  const handleCopy = () => {
    const fullLink = `${window.location.origin}${window.location.pathname}#/session/${sessionData}`;
    navigator.clipboard.writeText(fullLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Card>
      <button onClick={onBack} className="text-sm text-pink-600 hover:underline mb-4">&larr; Back</button>
      <h2 className="text-2xl font-bold text-center mb-4">Share Your Quiz!</h2>
      <p className="text-gray-600 text-center mb-6">
        Copy the link below and send it to your partner to start the quiz.
      </p>

      <div className="bg-rose-50 border-2 border-dashed border-rose-200 rounded-lg p-4 mb-6">
        <p className="text-gray-500 text-sm mb-2 text-center">Your Unique Quiz Link</p>
        <textarea
          readOnly
          value={`${window.location.origin}${window.location.pathname}#/session/${sessionData}`}
          className="w-full h-24 p-2 font-mono text-xs text-center bg-transparent border-none resize-none focus:ring-0"
        />
      </div>
      
      <Button onClick={handleCopy}>
        {copied ? 'Copied!' : 'Copy Link'}
      </Button>
    </Card>
  );
};

export default ShareView;