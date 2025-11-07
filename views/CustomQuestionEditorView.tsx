import React, { useState } from 'react';
import { Question, Profile } from '../types.ts';
import Button from '../components/Button.tsx';
import Card from '../components/Card.tsx';
import BackButton from '../components/BackButton.tsx';

interface CustomQuestionEditorViewProps {
  onFinish: (questions: Question[]) => void;
  onBack: () => void;
}

const createEmptyQuestion = (): Question => ({
  id: Date.now() + Math.floor(Math.random() * 1000),
  text: '',
  category: 'Custom',
  options: ['', '', '', ''],
  active: true,
});


const CustomQuestionEditorView: React.FC<CustomQuestionEditorViewProps> = ({ onFinish, onBack }) => {
  const [questions, setQuestions] = useState<Question[]>([createEmptyQuestion()]);

  const updateQuestionText = (index: number, value: string) => {
    const newQuestions = [...questions];
    newQuestions[index].text = value;
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
      <p className="text-center text-gray-500 mb-6">Add as many questions as you like. We recommend at least 5 for a good quiz!</p>
      
      <div className="space-y-4 max-h-[50vh] overflow-y-auto pr-2">
        {questions.map((q, qIndex) => (
          <div key={q.id} className="p-4 border rounded-lg bg-rose-50 relative">
            <p className="font-bold mb-2 text-gray-700">Question {qIndex + 1}</p>
            <textarea
              value={q.text}
              onChange={e => updateQuestionText(qIndex, e.target.value)}
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
                    className="absolute top-2 right-2 text-red-500 hover:text-red-700 p-1 rounded-full"
                    aria-label="Remove question"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm4 0a1 1 0 012 0v6a1 1 0 11-2 0V8z" clipRule="evenodd" />
                  </svg>
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