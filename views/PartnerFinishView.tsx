
import React from 'react';
// FIX: Added .ts extension to fix module resolution issue.
import { ResultData } from '../types.ts';
// FIX: Added .ts extension to fix module resolution issue.
import { encodeObjectToBase64 } from '../utils/helpers.ts';
// FIX: Added .tsx extension to fix module resolution issue.
import Card from '../components/Card.tsx';
// FIX: Added .tsx extension to fix module resolution issue.
import Button from '../components/Button.tsx';
// FIX: Added .tsx extension to fix module resolution issue.
import Confetti from '../components/Confetti.tsx';

interface PartnerFinishViewProps {
  resultData: ResultData;
  onResultCodeGenerated: (code: string) => void;
}

const PartnerFinishView: React.FC<PartnerFinishViewProps> = ({ resultData, onResultCodeGenerated }) => {
  
  const handleShowResults = () => {
    try {
      const code = encodeObjectToBase64(resultData);
      onResultCodeGenerated(code);
    } catch (error) {
      console.error("Failed to generate result code:", error);
      alert("There was an error generating the results link. Please try again.");
    }
  };

  return (
    <>
      <Confetti />
      <Card className="text-center">
        <h2 className="text-3xl font-bold text-pink-600 mb-4">You've finished!</h2>
        <p className="text-gray-600 mb-2">Thank you for taking the time to answer the questions.</p>
        <p className="text-gray-600 mb-8">Click the button below to see how well you and {resultData.creatorProfile.name} know each other!</p>
        
        <div className="animate-pulse">
            <Button onClick={handleShowResults}>
                See Your Results!
            </Button>
        </div>
      </Card>
    </>
  );
};

export default PartnerFinishView;
