import React, { useState } from 'react';
import { Question, Answers, QuizTemplate, InternalAd } from '../types';
import Button from '../components/Button';
import Card from '../components/Card';
import ProgressBar from '../components/ProgressBar';
import BackButton from '../components/BackButton';
import InternalAdBanner from '../components/InternalAdBanner';

interface QuestionnaireViewProps {
  questions: Question[];
  onComplete: (answers: Answers) => void;
  userType: 'Creator' | 'Partner';
  onBack: () => void;
  internalAd?: InternalAd;
  activeTemplate: QuizTemplate | null;
}

const QuestionnaireView: React.FC<QuestionnaireViewProps> = ({ questions, onComplete, userType, onBack, internalAd, activeTemplate }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [error, setError] = useState('');
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);

  const activeQuestions = questions.filter(q => q.active);
  const currentQuestion = activeQuestions[currentQuestionIndex];

  const handleSelectAnswer = (option: string) => {
    if (!currentQuestion) return;
    setSelectedAnswer(option);
    setError('');
  };

  const handleNext = () => {
    if (!selectedAnswer) {
      setError('Please select an answer to continue.');
      return;
    }
    const newAnswers = { ...answers, [currentQuestion.id]: selectedAnswer };
    setAnswers(newAnswers);
    setSelectedAnswer(null); // Reset for next question

    if (currentQuestionIndex < activeQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      onComplete(newAnswers);
    }
  };
  
  if (!currentQuestion) {
    return <Card><p>No active questions available.</p></Card>;
  }

  return (
    <div className="space-y-6">
        <Card className="relative pt-32">
            <BackButton onClick={onBack} />
            <div className="absolute top-6 left-1/2 -translate-x-1/2 w-full px-8 text-center">
                {activeTemplate && (
                    <>
                        <p className="text-sm text-gray-500">PLAYING QUIZ</p>
                        <p className="font-bold text-pink-600 truncate">{activeTemplate.title}</p>
                    </>
                )}
                <div className="w-full max-w-xs mx-auto mt-2">
                  <ProgressBar current={currentQuestionIndex + 1} total={activeQuestions.length} />
                  <p className="text-center text-sm text-gray-500 mt-1">
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
                <Button onClick={handleNext} disabled={selectedAnswer === null}>
                    {currentQuestionIndex < activeQuestions.length - 1 ? 'Next' : (userType === 'Partner' ? 'Finish & See Results' : 'Finish Quiz')}
                </Button>
            </div>
        </Card>
        <InternalAdBanner ad={internalAd} />
    </div>
  );
};

export default QuestionnaireView;
