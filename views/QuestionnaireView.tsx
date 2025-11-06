import React, { useState } from 'react';
import { Question, Answers, QuizTemplate } from '../types';
import Card from '../components/Card';
import ProgressBar from '../components/ProgressBar';
import BackButton from '../components/BackButton';
import Button from '../components/Button';

interface QuestionnaireViewProps {
  userType: 'Creator' | 'Partner';
  questions: Question[];
  onComplete: (answers: Answers) => void;
  onBack: () => void;
  activeTemplate: QuizTemplate | null;
}

const QuestionnaireView: React.FC<QuestionnaireViewProps> = ({ userType, questions, onComplete, onBack, activeTemplate }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [error, setError] = useState('');

  const activeQuestions = questions.filter(q => q.active);
  const currentQuestion = activeQuestions[currentQuestionIndex];
  const selectedAnswer = answers[currentQuestion?.id];

  const handleSelectAnswer = (option: string) => {
    if (!currentQuestion) return;
    setAnswers({ ...answers, [currentQuestion.id]: option });
    setError('');
  };

  const handleNext = () => {
    if (!selectedAnswer) {
      setError('Please select an answer to continue.');
      return;
    }
    if (currentQuestionIndex < activeQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      onComplete(answers);
    }
  };

  if (!currentQuestion) {
    return <Card><p>No active questions available.</p></Card>;
  }

  return (
    <Card className="relative pt-32">
        <div className="absolute top-6 left-6 right-6">
            <BackButton onClick={onBack} />
            <div className="text-center">
                <p className="text-sm font-bold uppercase text-pink-500 tracking-wider">Playing Quiz</p>
                <h2 className="text-xl font-bold text-gray-800 truncate">{activeTemplate?.title}</h2>
            </div>
            <div className="mt-4">
                <ProgressBar current={currentQuestionIndex + 1} total={activeQuestions.length} />
                <p className="text-center text-sm text-gray-500 mt-2">
                    Question {currentQuestionIndex + 1} of {activeQuestions.length} ({userType})
                </p>
            </div>
        </div>
        
        <h3 className="text-xl md:text-2xl font-bold text-center mb-6 min-h-[6rem] flex items-center justify-center">
            {currentQuestion.text}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {currentQuestion.options.map((option, index) => (
            <button
                key={index}
                onClick={() => handleSelectAnswer(option)}
                className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-200 ${
                selectedAnswer === option
                    ? 'bg-pink-500 border-pink-500 text-white shadow-lg scale-105'
                    : 'bg-white border-rose-200 hover:bg-rose-100 hover:border-pink-300'
                }`}
            >
                {option}
            </button>
            ))}
        </div>
        {error && <p className="text-red-500 text-sm mt-4 text-center">{error}</p>}
        <div className="mt-8">
            <Button onClick={handleNext} disabled={!selectedAnswer}>
                {currentQuestionIndex < activeQuestions.length - 1 ? 'Next' : 'Finish'}
            </Button>
        </div>
    </Card>
  );
};

export default QuestionnaireView;