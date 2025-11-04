import React from 'react';
import Card from '../components/Card';
import Button from '../components/Button';
import BackButton from '../components/BackButton';

interface QuestionChoiceViewProps {
  onSelectStandard: () => void;
  onSelectCustom: () => void;
  onBack: () => void;
}

const QuestionChoiceView: React.FC<QuestionChoiceViewProps> = ({ onSelectStandard, onSelectCustom, onBack }) => {
  return (
    <Card className="text-center relative pt-12">
      <BackButton onClick={onBack} />
      <h2 className="text-2xl font-bold mb-6">Choose Your Questions</h2>
      <div className="space-y-4">
        <div className="border border-rose-200 p-4 rounded-lg">
          <h3 className="text-xl font-semibold text-pink-600">Use Standard Questions</h3>
          <p className="text-gray-500 mb-4 text-sm">Start quickly with our expertly crafted set of compatibility questions.</p>
          <Button onClick={onSelectStandard}>Use Standard Set</Button>
        </div>
        <div className="border border-rose-200 p-4 rounded-lg">
          <h3 className="text-xl font-semibold text-pink-600">Create a Custom Quiz</h3>
          <p className="text-gray-500 mb-4 text-sm">Write your own questions to create a truly personal experience.</p>
          <Button onClick={onSelectCustom} variant="secondary">Create My Own</Button>
        </div>
      </div>
    </Card>
  );
};

export default QuestionChoiceView;