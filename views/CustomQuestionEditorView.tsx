import React, { useState } from 'react';
import { Question } from '../types';
import Button from '../components/Button';
import Card from '../components/Card';
import BackButton from '../components/BackButton';

interface CustomQuestionEditorViewProps {
  onFinish: (questions: Question[]) => void;
  onBack: () => void;
}

const createEmptyQuestion = (): Question => ({
  id: Date.now() + Math.floor(Math.random() * 1000), // More unique than Date.now() alone
  text: '',
  category: 'Custom',
  options: ['', '', '', ''],
  active: true,
});


const CustomQuestionEditorView: React.FC<CustomQuestionEditorViewProps> = ({ onFinish, onBack }) => {
  const [questions, setQuestions] = useState<Question[]>([createEmptyQuestion()]);

  const updateQuestion = (index: number, field: keyof Question, value: any) => {
    const newQuestions = [...questions];
    (newQuestions[index] as any)[field] = value;
    setQuestions(newQuestions);
  };
  
  const updateOption = (qIndex: number, oIndex: number, value: string) => {
    const newQuestions = [...questions];
    newQuestions[qIndex].options[oIndex] = value;
    setQuestions(newQuestions);
  };

  const addQuestion = () => {
    setQuestions([...questions, createEmptyQuestion()]);
  };

  const removeQuestion = (index: number) => {
    if (questions.length > 1) {
      setQuestions(questions.filter((_, i) => i !== index));
    } else {
      alert("You must have at least one question.");
    }
  };

  const handleFinish = () => {
    for (const q of questions) {
      if (!q.text.trim() || q.options.some(opt => !opt.trim())) {
        alert('Please make sure all questions and options are filled out.');
        return;
      }
    }
    onFinish(questions);
  };

  return (
    <Card className="relative pt-12">
      <BackButton onClick={onBack} />
      <h2 className="text-2xl font-bold text-center mb-4">Create Your Custom Quiz</h2>
      <p className="text-center text-gray-500 mb-6">Add at least 3 questions for a good result.</p>
      
      <div className="space-y-4 max-h-[50vh] overflow-y-auto pr-2">
        {questions.map((q, qIndex) => (
          <div key={q.id} className="p-4 border rounded-lg bg-rose-50 relative">
            <p className="font-bold mb-2 text-gray-700">Question {qIndex + 1}</p>
            <textarea
              value={q.text}
              onChange={e => updateQuestion(qIndex, 'text', e.target.value)}
              placeholder="Your question text..."
              rows={2}
              className="w-full p-2 border rounded mb-2"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {q.options.map((opt, oIndex) => (
                <input
                    key={oIndex}
                    type="text"
                    value={opt}
                    placeholder={`Option ${oIndex + 1}`}
                    onChange={e => updateOption(qIndex, oIndex, e.target.value)}
                    className="w-full p-2 border rounded"
                />
                ))}
            </div>
             {questions.length > 1 && (
                <button 
                    onClick={() => removeQuestion(qIndex)} 
                    className="absolute top-2 right-2 text-red-500 hover:text-red-700 font-bold text-2xl"
                    aria-label="Remove question"
                >
                &times;
                </button>
             )}
          </div>
        ))}
      </div>
      
      <div className="mt-6 flex flex-col md:flex-row gap-2">
        <Button onClick={addQuestion} variant="secondary">Add Another Question</Button>
        <Button onClick={handleFinish} disabled={questions.length < 1}>Done & Continue</Button>
      </div>
    </Card>
  );
};

export default CustomQuestionEditorView;