import React, { useEffect } from 'react';
import Card from '../components/Card.tsx';
import Button from '../components/Button.tsx';
import { ResultData } from '../types.ts';

interface PartnerFinishViewProps {
  resultData: ResultData;
  onViewResults: (resultData: ResultData) => void;
  onBackToHome: () => void;
}

const PartnerFinishView: React.FC<PartnerFinishViewProps> = ({ resultData, onViewResults, onBackToHome }) => {

  useEffect(() => {
    // Automatically move to results after a short delay
    const timer = setTimeout(() => {
      onViewResults(resultData);
    }, 1500);

    return () => clearTimeout(timer);
  }, [resultData, onViewResults]);

  return (
    <Card className="text-center">
      <h2 className="text-2xl font-bold mb-4">🎉 You're All Done!</h2>
      <p className="text-gray-600 mb-6 animate-pulse">
        Calculating your compatibility... Get ready for the results!
      </p>
       <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-pink-500 mx-auto"></div>
    </Card>
  );
};

export default PartnerFinishView;
