import React from 'react';
import Card from '../components/Card';
import Button from '../components/Button';

interface ModeSelectionViewProps {
  onCreator: () => void;
  onPartner: () => void;
  onBack: () => void;
}

const ModeSelectionView: React.FC<ModeSelectionViewProps> = ({ onCreator, onPartner, onBack }) => {
  return (
    <Card className="text-center">
        <button onClick={onBack} className="text-sm text-pink-600 hover:underline mb-4 absolute top-6 left-6">
            &larr; Back
        </button>
      <h2 className="text-2xl font-bold mb-6">How are you joining?</h2>
      <div className="space-y-4">
        <div className="border border-rose-200 p-4 rounded-lg">
            <h3 className="text-xl font-semibold text-pink-600">Create a Quiz</h3>
            <p className="text-gray-500 mb-4 text-sm">Create a new quiz for your partner to take.</p>
            <Button onClick={onCreator}>I'm creating the quiz</Button>
        </div>
         <div className="border border-rose-200 p-4 rounded-lg">
            <h3 className="text-xl font-semibold text-pink-600">Join a Quiz</h3>
            <p className="text-gray-500 mb-4 text-sm">Enter an invitation code to join a quiz created by your partner.</p>
            <Button onClick={onPartner} variant="secondary">I'm joining with a code</Button>
        </div>
      </div>
    </Card>
  );
};

export default ModeSelectionView;
