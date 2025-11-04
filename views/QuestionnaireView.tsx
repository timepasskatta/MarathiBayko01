import React, { useState } from 'react';
import { Question, Answers } from '../types';
import Button from '../components/Button';
import Card from '../components/Card';
import ProgressBar from '../components/ProgressBar';
import BackButton from '../components/BackButton';

interface QuestionnaireViewProps {
  questions: Question[];
  onFinish: (answers: Answers) => void;
  onBack?: () => void;
}

const QuestionnaireView: React.FC<QuestionnaireViewProps> = ({ questions, onFinish, onBack }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});

  const currentQuestion = questions[currentQuestionIndex];

  const handleAnswerSelect = (option: string) => {
    setAnswers({ ...answers, [currentQuestion.id]: option });
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };
  
  const handleFinish = () => {
      onFinish(answers);
  }

  const answeredCount = Object.keys(answers).filter(key => answers[parseInt(key)]).length;
  const isCreator = !onBack; // A simple heuristic: partner questionnaire doesn't have a back button in this flow

  return (
    <Card className="relative pt-12">
      {onBack && <BackButton onClick={onBack} />}
      <div className="mb-4">
        <p className="text-center text-sm font-semibold text-pink-600 mb-1">
          {isCreator ? "You're the Partner!" : "You're the Creator!"}
        </p>
        <p className="text-center text-sm text-gray-500 mb-2">
          {isCreator ? "Guess your partner's answers to these questions." : "Answer these questions about yourself. Your partner will try to guess your answers."}
        </p>
        <p className="text-center text-sm text-gray-500 mb-2">
          Question {currentQuestionIndex + 1} of {questions.length}
        </p>
        <ProgressBar current={answeredCount} total={questions.length} />
      </div>

      <div className="text-center">
        <span className="inline-block bg-rose-100 text-rose-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded-full mb-4">
          {currentQuestion.category}
        </span>
        <h3 className="text-xl md:text-2xl font-semibold mb-6 min-h-[56px]">{currentQuestion.text}</h3>
      </div>

      <div className="space-y-3">
        {currentQuestion.options.map((option, index) => (
          <label
            key={index}
            className={`block w-full text-left p-4 border rounded-lg cursor-pointer transition-all duration-200 ${
              answers[currentQuestion.id] === option
                ? 'bg-pink-500 border-pink-500 text-white shadow-lg'
                : 'bg-white border-gray-200 hover:bg-rose-50'
            }`}
          >
            <input
              type="radio"
              name={`question-${currentQuestion.id}`}
              value={option}
              checked={answers[currentQuestion.id] === option}
              onChange={() => handleAnswerSelect(option)}
              className="sr-only"
            />
            {option}
          </label>
        ))}
      </div>
      
      <div className="mt-8 flex justify-between items-center space-x-4">
        <Button onClick={handlePrev} disabled={currentQuestionIndex === 0} variant="secondary" className="w-1/3 disabled:opacity-50">
          Previous
        </Button>
        {currentQuestionIndex < questions.length - 1 ? (
          <Button onClick={handleNext} disabled={!answers[currentQuestion.id]} className="w-2/3 disabled:opacity-50">
            Next
          </Button>
        ) : (
          <Button onClick={handleFinish} disabled={answeredCount < questions.length} className="w-2/3 disabled:opacity-50">
            Finish & Save ({answeredCount}/{questions.length})
          </Button>
        )}
      </div>
    </Card>
  );
};

export default QuestionnaireView;