import React, { useState, useEffect } from 'react';
import { SessionData, InternalAd } from '../types';
import { encodeObjectToBase64 } from '../utils/helpers';
import Card from '../components/Card';
import Button from '../components/Button';
import BackButton from '../components/BackButton';
import InternalAdBanner from '../components/InternalAdBanner';

interface ShareAndPublishViewProps {
  sessionData: SessionData;
  onBack: () => void;
  internalAd?: InternalAd;
}

const ShareAndPublishView: React.FC<ShareAndPublishViewProps> = ({ sessionData, onBack, internalAd }) => {
  const [shareLink, setShareLink] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    const generateLink = async () => {
      try {
        const encodedData = await encodeObjectToBase64(sessionData);
        const link = `${window.location.origin}${window.location.pathname}#/session/${encodedData}`;
        setShareLink(link);
      } catch (error) {
        console.error("Failed to generate share link:", error);
        setShareLink("Error generating link. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };
    generateLink();
  }, [sessionData]);

  const handleCopy = () => {
    navigator.clipboard.writeText(shareLink).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    });
  };

  return (
    <div className="space-y-6">
      <Card className="relative pt-12 text-center">
        <BackButton onClick={onBack} />
        <h2 className="text-2xl font-bold mb-4">✅ Your Quiz is Ready!</h2>
        <p className="text-gray-600 mb-6">
          Now, copy the special link below and send it to your partner. They'll use it to start the quiz.
        </p>

        <div className="bg-rose-50 border-2 border-dashed border-rose-200 rounded-lg p-4 mb-6">
          <p className="text-gray-500 text-sm mb-2">Your Magic Invitation Link</p>
          <textarea
            readOnly
            className="w-full h-32 sm:h-24 p-2 font-mono text-xs text-gray-600 bg-transparent border-none focus:ring-0 resize-none text-center"
            value={isLoading ? 'Generating your link...' : shareLink}
          />
        </div>
        
        <Button onClick={handleCopy} disabled={isLoading || !shareLink}>
          {isCopied ? 'Copied to Clipboard!' : 'Copy Magic Link'}
        </Button>
         <p className="text-xs text-gray-400 mt-4">
            Pro Tip: After your partner completes the quiz, ask them to send you a screenshot of the results page!
        </p>
      </Card>
      
      <InternalAdBanner ad={internalAd} />
    </div>
  );
};

export default ShareAndPublishView;