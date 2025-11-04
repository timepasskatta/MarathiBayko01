import React, { useState } from 'react';
import { QuizTemplate, PageContent, Question } from '../types';
import { generateId } from '../utils/helpers';
import Card from '../components/Card';
import Button from '../components/Button';

interface AdminDashboardViewProps {
  quizTemplates: QuizTemplate[];
  setQuizTemplates: React.Dispatch<React.SetStateAction<QuizTemplate[]>>;
  pageContent: PageContent;
  setPageContent: React.Dispatch<React.SetStateAction<PageContent>>;
  adsEnabled: boolean;
  setAdsEnabled: React.Dispatch<React.SetStateAction<boolean>>;
  onLogout: () => void;
}

const emptyQuestion: Question = { id: 1, text: '', category: 'Official', options: ['', '', '', ''], active: true };

const AdminDashboardView: React.FC<AdminDashboardViewProps> = ({ quizTemplates, setQuizTemplates, pageContent, setPageContent, adsEnabled, setAdsEnabled, onLogout }) => {
  
  const [localPageContent, setLocalPageContent] = useState(pageContent);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newQuiz, setNewQuiz] = useState({ title: '', description: '', questions: [{...emptyQuestion}] });

  const togglePublic = (id: string) => {
    setQuizTemplates(prev => prev.map(t => t.id === id ? { ...t, isPublic: !t.isPublic } : t));
  };
  
  const toggleOfficial = (id: string) => {
    setQuizTemplates(prev => prev.map(t => t.id === id ? { ...t, isOfficial: !t.isOfficial } : t));
  };

  const deleteTemplate = (id: string) => {
    if (window.confirm('Are you sure you want to delete this template?')) {
      setQuizTemplates(prev => prev.filter(t => t.id !== id));
    }
  };
  
  const handlePageContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setLocalPageContent({...localPageContent, [e.target.name]: e.target.value });
  };
  
  const savePageContent = () => {
      setPageContent(localPageContent);
      alert('Page content saved!');
  };

  const handleNewQuizChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setNewQuiz({...newQuiz, [e.target.name]: e.target.value});
  };

  const handleQuestionChange = (qIndex: number, text: string) => {
    const questions = [...newQuiz.questions];
    questions[qIndex].text = text;
    setNewQuiz({...newQuiz, questions});
  };
  
  const handleOptionChange = (qIndex: number, oIndex: number, text: string) => {
    const questions = [...newQuiz.questions];
    questions[qIndex].options[oIndex] = text;
    setNewQuiz({...newQuiz, questions});
  };
  
  const addQuestion = () => {
    const questions = [...newQuiz.questions, {...emptyQuestion, id: newQuiz.questions.length + 1}];
    setNewQuiz({...newQuiz, questions});
  };
  
  const saveNewQuiz = () => {
    const finalQuiz: QuizTemplate = {
      id: generateId(),
      title: newQuiz.title,
      description: newQuiz.description,
      creatorName: 'Admin',
      questions: newQuiz.questions,
      isPublic: true,
      isOfficial: true,
      createdAt: new Date().toISOString()
    };
    setQuizTemplates(prev => [...prev, finalQuiz]);
    setShowCreateForm(false);
    setNewQuiz({ title: '', description: '', questions: [{...emptyQuestion}] });
  };

  return (
    <div className="space-y-6">
      <Card>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Admin Dashboard</h2>
          <Button onClick={onLogout} variant="secondary" className="w-auto">Logout</Button>
        </div>
      </Card>

      {/* Site Settings */}
      <Card>
          <h3 className="text-xl font-bold mb-4">Site Settings</h3>
          <div className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
              <p>Display Ads</p>
              <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" checked={adsEnabled} onChange={() => setAdsEnabled(p => !p)} className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-pink-300 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-pink-600"></div>
              </label>
          </div>
      </Card>

      {/* Manage Public Templates */}
      <Card>
        <h3 className="text-xl font-bold mb-4">Manage Public Quizzes</h3>
        <Button onClick={() => setShowCreateForm(!showCreateForm)}>
          {showCreateForm ? 'Cancel' : 'Create New Official Quiz'}
        </Button>
        
        {showCreateForm && (
          <div className="mt-4 p-4 border rounded-lg bg-rose-50 space-y-4">
            <h4 className="font-bold">New Official Quiz</h4>
            <input type="text" name="title" value={newQuiz.title} onChange={handleNewQuizChange} placeholder="Quiz Title" className="w-full p-2 border rounded" />
            <textarea name="description" value={newQuiz.description} onChange={handleNewQuizChange} placeholder="Quiz Description" className="w-full p-2 border rounded" />
            {newQuiz.questions.map((q, qIndex) => (
              <div key={qIndex} className="p-2 border rounded bg-white">
                <input value={q.text} onChange={(e) => handleQuestionChange(qIndex, e.target.value)} placeholder={`Question ${qIndex + 1}`} className="w-full p-1 border rounded mb-2 font-semibold" />
                <div className="grid grid-cols-2 gap-2">
                  {q.options.map((opt, oIndex) => (
                    <input key={oIndex} value={opt} onChange={(e) => handleOptionChange(qIndex, oIndex, e.target.value)} placeholder={`Option ${oIndex + 1}`} className="w-full p-1 border rounded" />
                  ))}
                </div>
              </div>
            ))}
            <div className="flex gap-2">
              <Button onClick={addQuestion} variant="secondary">Add Question</Button>
              <Button onClick={saveNewQuiz}>Save Quiz</Button>
            </div>
          </div>
        )}

        <div className="space-y-4 mt-4">
          {quizTemplates.length > 0 ? quizTemplates.map(template => (
            <div key={template.id} className="p-4 border rounded-lg bg-gray-50">
              <h4 className="font-bold">{template.title} <span className="text-sm font-normal text-gray-500">by {template.creatorName}</span></h4>
              <p className="text-sm text-gray-600">{template.description}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                <Button onClick={() => togglePublic(template.id)} className={`w-auto text-xs py-1 px-2 ${template.isPublic ? 'bg-green-500' : 'bg-gray-400'}`}>
                  {template.isPublic ? 'Public' : 'Private'}
                </Button>
                <Button onClick={() => toggleOfficial(template.id)} className={`w-auto text-xs py-1 px-2 ${template.isOfficial ? 'bg-blue-500' : 'bg-gray-400'}`}>
                  {template.isOfficial ? 'Official' : 'Unofficial'}
                </Button>
                <Button onClick={() => deleteTemplate(template.id)} className="w-auto text-xs py-1 px-2 bg-red-500 hover:bg-red-600">
                  Delete
                </Button>
              </div>
            </div>
          )) : <p className="text-center text-gray-500 mt-4">No public templates have been created yet.</p>}
        </div>
      </Card>
      
      {/* Manage Site Pages */}
      <Card>
        <h3 className="text-xl font-bold mb-4">Manage Site Pages</h3>
        <div className="space-y-4">
            <div>
                <label className="font-semibold">About Us</label>
                <textarea name="aboutUs" value={localPageContent.aboutUs} onChange={handlePageContentChange} rows={4} className="w-full p-2 border rounded mt-1"/>
            </div>
            <div>
                <label className="font-semibold">Contact Us</label>
                <textarea name="contactUs" value={localPageContent.contactUs} onChange={handlePageContentChange} rows={4} className="w-full p-2 border rounded mt-1"/>
            </div>
            <div>
                <label className="font-semibold">Privacy Policy</label>
                <textarea name="privacyPolicy" value={localPageContent.privacyPolicy} onChange={handlePageContentChange} rows={4} className="w-full p-2 border rounded mt-1"/>
            </div>
            <div>
                <label className="font-semibold">Terms & Conditions</label>
                <textarea name="termsAndConditions" value={localPageContent.termsAndConditions} onChange={handlePageContentChange} rows={4} className="w-full p-2 border rounded mt-1"/>
            </div>
            <Button onClick={savePageContent}>Save Page Content</Button>
        </div>
      </Card>
    </div>
  );
};

export default AdminDashboardView;