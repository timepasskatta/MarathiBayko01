import React, { useState } from 'react';
import { Question, Answers, QuizTemplate, InternalAd } from '../types.ts';
import Button from '../components/Button.tsx';
import Card from '../components/Card.tsx';
import ProgressBar from '../components/ProgressBar.tsx';
import BackButton from '../components/BackButton.tsx';
import InternalAdBanner from '../components/InternalAdBanner.tsx';

interface QuestionnaireViewProps {
  questions: Question[];
  onComplete: (answers: Answers) => void;
  userType: 'Creator' | 'Partner';
  onBack: () => void;
  activeTemplate: QuizTemplate | null;
  internalAd?: InternalAd;
}

const QuestionnaireView: React.FC<QuestionnaireViewProps> = ({ questions, onComplete, userType, onBack, activeTemplate, internalAd }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  
  const activeQuestions = questions.filter(q => q.active);
  const currentQuestion = activeQuestions[currentQuestionIndex];
  const selectedAnswer = answers[currentQuestion?.id];

  const handleSelectAnswer = (option: string) => {
    if (!currentQuestion) return;
    setAnswers({ ...answers, [currentQuestion.id]: option });
  };

  const handleNext = () => {
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
    <div className="space-y-6">
        <Card className="relative pt-32">
            <div className="absolute top-6 left-1/2 -translate-x-1/2 w-[90%] space-y-3">
                <BackButton onClick={onBack} />
                {activeTemplate?.title && (
                  <div className="text-center">
                    <p className="text-sm font-semibold text-pink-500">PLAYING QUIZ</p>
                    <h3 className="text-lg font-bold">{activeTemplate.title}</h3>
                  </div>
                )}
                <ProgressBar current={currentQuestionIndex + 1} total={activeQuestions.length} />
                <p className="text-center text-sm text-gray-500">
                  Question {currentQuestionIndex + 1} of {activeQuestions.length} ({userType})
                </p>
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
            <div className="mt-8">
                <Button onClick={handleNext} disabled={!selectedAnswer}>
                    {currentQuestionIndex < activeQuestions.length - 1 ? 'Next' : (userType === 'Partner' ? 'Finish & See Results' : 'Finish Quiz')}
                </Button>
            </div>
        </Card>
        <InternalAdBanner ad={internalAd} />
    </div>
  );
};

export default QuestionnaireView;
