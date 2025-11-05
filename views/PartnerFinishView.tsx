import React, { useState, useEffect } from 'react';
import { ResultData } from '../types';
import Button from '../components/Button';
import Card from '../components/Card';
import BackButton from '../components/BackButton';
import { encodeObjectToBase64 } from '../utils/helpers';

interface PartnerFinishViewProps {
  resultData: ResultData;
  onBackToHome: () => void;
  onViewResults: (resultData: ResultData) => void;
  onResultCodeGenerated: (code: string) => void;
}

const PartnerFinishView: React.FC<PartnerFinishViewProps> = ({ resultData, onBackToHome, onViewResults, onResultCodeGenerated }) => {
  const [resultCode, setResultCode] = useState<string | null>(null);
  const [copied, setCopied] = useState<boolean>(false);

  useEffect(() => {
    const generateCode = async () => {
      try {
        const encodedData = await encodeObjectToBase64(resultData);
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
    <Card className="text-center relative">
      <BackButton onClick={onBackToHome} />
      <h2 className="text-2xl font-bold mb-4">🎉 You're All Done!</h2>
      <p className="text-gray-600 mb-6">
        **Step 1:** Copy the Result Code below and send it back to your partner. This is your sealed answer sheet!
      </p>

      <div className="bg-rose-50 border-2 border-dashed border-rose-200 rounded-lg p-4 mb-6">
        <p className="text-gray-500 text-sm mb-2">Your Final Result Code</p>
        {resultCode ? (
            <textarea
            readOnly
            className="w-full h-24 p-2 font-mono text-xs text-gray-600 bg-transparent border-none focus:ring-0 resize-none text-center"
            value={resultCode}
          />
        ) : (
            <p className="text-center animate-pulse">Generating your result code...</p>
        )}
      </div>
      
      <Button onClick={handleCopy} disabled={!resultCode}>
        {copied ? 'Copied!' : 'Copy Result Code'}
      </Button>

       <div className="mt-8 pt-6 border-t border-gray-200">
        <p className="text-gray-600 mb-4">
          **Step 2:** After you've sent the code, you can see the detailed breakdown for yourself.
        </p>
        <Button onClick={() => onViewResults(resultData)} variant="secondary">See Detailed Results</Button>
      </div>
    </Card>
  );
};

export default PartnerFinishView;
