import React, { useState, useEffect } from 'react';
import { ResultData, InternalAd } from '../types.ts';
import { encodeObjectToBase64 } from '../utils/helpers.ts';
import Button from '../components/Button.tsx';
import Card from '../components/Card.tsx';
import BackButton from '../components/BackButton.tsx';
import InternalAdBanner from '../components/InternalAdBanner.tsx';

// FIX: Changed props to align with usage in App.tsx, enabling result code generation.
interface PartnerFinishViewProps {
  resultData: ResultData;
  onBackToHome: () => void;
  onResultCodeGenerated: (code: string) => void;
  internalAd?: InternalAd;
}

const PartnerFinishView: React.FC<PartnerFinishViewProps> = ({ resultData, onBackToHome, onResultCodeGenerated, internalAd }) => {
  const [resultCode, setResultCode] = useState<string | null>(null);
  const [copied, setCopied] = useState<boolean>(false);

  useEffect(() => {
    const generateCode = async () => {
      try {
        // Exclude transient state from the encoded data
        const { isSecondAttempt, ...dataToEncode } = resultData;
        const encodedData = await encodeObjectToBase64(dataToEncode);
        setResultCode(encodedData);
        onResultCodeGenerated(encodedData);
      } catch (error) {
        console.error("Error encoding result data:", error);
        setResultCode("Error: Could not generate code.");
      }
    };
    generateCode();
  }, [resultData, onResultCodeGenerated]);

  const handleCopy = () => {
    if (resultCode) {
      navigator.clipboard.writeText(resultCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="space-y-6">
      <Card className="text-center relative pt-12">
        <BackButton onClick={onBackToHome} />
        <h2 className="text-2xl font-bold mb-4">✅ All Done! Here are your results.</h2>
        <p className="text-gray-600 mb-6">
          Copy the special code below. Both you and your partner can use this code on the home page anytime to view your compatibility results.
        </p>

        <div className="bg-rose-50 border-2 border-dashed border-rose-200 rounded-lg p-4 mb-6">
          <p className="text-gray-500 text-sm mb-2">Your Unique Result Code</p>
          <textarea
            readOnly
            className="w-full h-24 p-2 font-mono text-xs text-gray-600 bg-transparent border-none focus:ring-0 resize-none text-center"
            value={resultCode || 'Generating...'}
          />
        </div>
        
        <div className="space-y-2">
            <Button onClick={handleCopy} disabled={!resultCode || resultCode.startsWith('Error')}>
            {copied ? 'Copied to Clipboard!' : 'Copy Result Code'}
            </Button>
            <Button onClick={onBackToHome} variant="secondary">
                Back to Home
            </Button>
        </div>
      </Card>
      
      <InternalAdBanner ad={internalAd} />
    </div>
  );
};

export default PartnerFinishView;
