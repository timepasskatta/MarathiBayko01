
import React, { useState, useEffect } from 'react';
import { SessionData, InternalAd } from '../types.ts';
import { encodeObjectToBase64 } from '../utils/helpers.ts';
import Card from '../components/Card.tsx';
import Button from '../components/Button.tsx';
import BackButton from '../components/BackButton.tsx';
import InternalAdBanner from '../components/InternalAdBanner.tsx';

interface ShareAndPublishViewProps {
  sessionData: SessionData;
  onBackToHome: () => void;
  internalAd?: InternalAd;
}

const ShareAndPublishView: React.FC<ShareAndPublishViewProps> = ({ sessionData, onBackToHome, internalAd }) => {
  const [shareLink, setShareLink] = useState('');
  const [copySuccess, setCopySuccess] = useState('');

  useEffect(() => {
    const code = encodeObjectToBase64(sessionData);
    const link = `${window.location.origin}${window.location.pathname}?quiz=${code}`;
    setShareLink(link);
  }, [sessionData]);

  const handleCopy = () => {
    navigator.clipboard.writeText(shareLink);
    setCopySuccess('Link copied to clipboard!');
    setTimeout(() => setCopySuccess(''), 2000);
  };

  return (
    <div className="space-y-6">
      <Card className="relative pt-12 text-center">
        <BackButton onClick={onBackToHome} />
        <h2 className="text-2xl font-bold mb-2">You're All Set!</h2>
        <p className="text-gray-500 mb-6">Now, share this link with your partner so they can answer the questions.</p>
        
        <div className="bg-rose-50 p-4 rounded-lg">
          <input
            type="text"
            readOnly
            value={shareLink}
            className="w-full p-2 border rounded-md text-center text-gray-600 bg-white"
          />
        </div>

        <div className="mt-4">
          <Button onClick={handleCopy}>
            {copySuccess ? 'Copied!' : 'Copy Link'}
          </Button>
        </div>
        {copySuccess && <p className="text-green-500 text-sm mt-2">{copySuccess}</p>}
      </Card>
      <InternalAdBanner ad={internalAd} />
      <div className="text-center">
          <Button onClick={onBackToHome} variant="secondary">Back to Home</Button>
      </div>
    </div>
  );
};

export default ShareAndPublishView;
