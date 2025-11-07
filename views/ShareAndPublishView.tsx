import React, { useState, useEffect } from 'react';
import { SessionData, InternalAd, Question } from '../types.ts';
import { encodeObjectToBase64 } from '../utils/helpers.ts';
import Button from '../components/Button.tsx';
import Card from '../components/Card.tsx';
import BackButton from '../components/BackButton.tsx';
import InternalAdBanner from '../components/InternalAdBanner.tsx';

interface ShareAndPublishViewProps {
  sessionData: SessionData;
  onBack: () => void;
  internalAd?: InternalAd;
}

type EncodableSessionData = Omit<SessionData, 'questionsUsed'> & { questionsUsed?: Question[] };

const ShareAndPublishView: React.FC<ShareAndPublishViewProps> = ({ sessionData, onBack, internalAd }) => {
  const [invitationLink, setInvitationLink] = useState<string | null>(null);
  const [copied, setCopied] = useState<boolean>(false);

  useEffect(() => {
      const generateLink = async () => {
        try {
          const payload: EncodableSessionData = { ...sessionData };

          // If it's an official quiz (identified by templateId),
          // we don't need to include the bulky questions array to shorten the link.
          if (payload.templateId) {
            delete payload.questionsUsed;
          }

          const encodedData = await encodeObjectToBase64(payload);
          const link = `${window.location.origin}${window.location.pathname}#/session/${encodedData}`;
          setInvitationLink(link);
        } catch (error) {
            console.error("Error encoding session data:", error);
            setInvitationLink("Error: Could not generate link.");
        }
      };
      generateLink();
  }, [sessionData]);

  const handleCopy = () => {
    if (invitationLink) {
      navigator.clipboard.writeText(invitationLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="space-y-6">
      <Card className="text-center relative pt-12">
        <BackButton onClick={onBack} />
        <h2 className="text-2xl font-bold mb-4">✅ Your Quiz is Ready!</h2>
        <p className="text-gray-600 mb-6">
          Copy this Magic Link and share it with your partner. That's it!
        </p>

        <div className="bg-rose-50 border-2 border-dashed border-rose-200 rounded-lg p-4 mb-6">
          <p className="text-gray-500 text-sm mb-2">Your Magic Invitation Link</p>
          <textarea
            readOnly
            className="w-full h-32 sm:h-24 p-2 font-mono text-xs text-gray-600 bg-transparent border-none focus:ring-0 resize-none text-center"
            value={invitationLink || 'Generating...'}
          />
        </div>
        
        <Button onClick={handleCopy} disabled={!invitationLink || invitationLink.startsWith('Error')}>
          {copied ? 'Copied to Clipboard!' : 'Copy Magic Link'}
        </Button>
        <p className="text-xs text-gray-400 mt-4">Pro Tip: After your partner completes the quiz, ask them to send you a screenshot of the results page!</p>

      </Card>
      
      <InternalAdBanner ad={internalAd} />
    </div>
  );
};

export default ShareAndPublishView;
