import React, { useState } from 'react';
import { QuizTemplate, AdSenseConfig, InternalAd, Question, AnalysisConfig } from '../types';
import Button from '../components/Button';
import Card from '../components/Card';
import { officialTemplates } from '../data/officialTemplates';

interface AdminDashboardViewProps {
  adSenseConfig: AdSenseConfig;
  setAdSenseConfig: React.Dispatch<React.SetStateAction<AdSenseConfig>>;
  internalAds: Record<string, InternalAd>;
  setInternalAds: React.Dispatch<React.SetStateAction<Record<string, InternalAd>>>;
  onLogout: () => void;
  staticPages: Record<string, string>;
  setStaticPages: React.Dispatch<React.SetStateAction<Record<string, string>>>;
}

const AdminDashboardView: React.FC<AdminDashboardViewProps> = ({
  adSenseConfig,
  setAdSenseConfig,
  internalAds,
  setInternalAds,
  onLogout,
  staticPages,
  setStaticPages,
}) => {
    const [activeTab, setActiveTab] = useState('templates');
    const [isEditorOpen, setIsEditorOpen] = useState(false);
    const [isExportModalOpen, setIsExportModalOpen] = useState(false);
    const [generatedCode, setGeneratedCode] = useState('');

    const [templates, setTemplates] = useState<QuizTemplate[]>(officialTemplates);
    
    const [editingTemplate, setEditingTemplate] = useState<QuizTemplate | null>(null);
    
    const [currentAdSenseConfig, setCurrentAdSenseConfig] = useState(adSenseConfig);
    const [currentInternalAds, setCurrentInternalAds] = useState(internalAds);
    const [currentStaticPages, setCurrentStaticPages] = useState(staticPages);
    
    const openEditor = (template: QuizTemplate | null) => {
      if (template) {
        setEditingTemplate(JSON.parse(JSON.stringify(template)));
      } else {
        setEditingTemplate({
          id: `new-${Date.now()}`,
          title: '',
          description: '',
          creatorName: 'Marathi Bayko',
          questions: [],
          isPublic: true,
          isOfficial: true,
          createdAt: new Date().toISOString(),
          status: 'approved',
          imageUrl: '',
          analysisConfig: { range0_25: '', range26_50: '', range51_75: '', range76_100: '' }
        });
      }
      setIsEditorOpen(true);
    };

    const handleSaveTemplate = () => {
      if (editingTemplate) {
        setTemplates(prev => {
          const exists = prev.some(t => t.id === editingTemplate.id);
          if (exists) {
            return prev.map(t => t.id === editingTemplate.id ? editingTemplate : t);
          } else {
            return [...prev, editingTemplate];
          }
        });
        setIsEditorOpen(false);
        setEditingTemplate(null);
      }
    };
    
    const handleTemplateDelete = (id: string) => {
        if (window.confirm('Are you sure you want to delete this template permanently?')) {
            setTemplates(templates.filter(t => t.id !== id));
        }
    };
    
    const handleGenerateCode = () => {
      const code = `import { QuizTemplate } from '../types';
import { initialQuestions } from './questions';

const defaultAnalysis = {
    range0_25: "It seems like there are quite a few differences in your perspectives. This is a great opportunity to start some interesting conversations and learn more about each other's worlds!",
    range26_50: "You two have some common ground, but also areas where you see things differently. Exploring these differences can be a fun adventure and a way to grow even closer.",
    range51_75: "You're on the same wavelength most of the time! You have a solid foundation of understanding. The few differences you have can add a little spice to your relationship.",
    range76_100: "Wow, it's like you can read each other's minds! Your connection is incredibly strong. You share a deep understanding that is truly special.",
};

export const officialTemplates: QuizTemplate[] = ${JSON.stringify(templates, null, 2)};
`;
      setGeneratedCode(code);
      setIsExportModalOpen(true);
    };

    const copyGeneratedCode = () => {
      navigator.clipboard.writeText(generatedCode);
      alert('Code copied to clipboard!');
    };

    const handleAdSenseSave = () => setAdSenseConfig(currentAdSenseConfig);
    const handleInternalAdsSave = () => setInternalAds(currentInternalAds);
    const handleStaticPagesSave = () => setStaticPages(currentStaticPages);
    
    const renderTemplates = () => (
      <Card>
        <h3 className="text-xl font-bold mb-2">Manage Quiz Templates</h3>
        <p className="text-sm text-gray-500 mb-4">Edit templates here. When you're done, click 'Save & Generate Code' to get the updated file content to redeploy your site.</p>
        <div className="flex justify-between items-center mb-4">
            <Button onClick={() => openEditor(null)} className="w-auto">Create New Template</Button>
            <Button onClick={handleGenerateCode} className="w-auto bg-green-600 hover:bg-green-700 focus:ring-green-500">Save Changes & Generate Code</Button>
        </div>
        <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
            {templates.map(template => (
                <div key={template.id} className="p-4 border rounded-lg bg-gray-50 flex justify-between items-center">
                    <div>
                        <p><strong>Title:</strong> {template.title || 'Untitled'}</p>
                        <p className="text-sm text-gray-500">{template.questions?.length || 0} Questions</p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        <Button onClick={() => openEditor(template)} variant="secondary" className="text-sm py-1 px-2 w-auto">Edit</Button>
                        <Button onClick={() => handleTemplateDelete(template.id)} variant="secondary" className="text-sm py-1 px-2 w-auto bg-red-500 hover:bg-red-600 border-red-500 text-white">Delete</Button>
                    </div>
                </div>
            ))}
        </div>
      </Card>
    );
    
    const renderAdSenseConfig = () => {
        return (
            <Card>
                <h3 className="text-xl font-bold mb-4">Google AdSense Settings</h3>
                <div className="space-y-4">
                    <label className="flex items-center"><input type="checkbox" checked={currentAdSenseConfig.enabled} onChange={e => setCurrentAdSenseConfig({...currentAdSenseConfig, enabled: e.target.checked})} className="mr-2 h-4 w-4 rounded border-gray-300 text-pink-600 focus:ring-pink-500" />Enable AdSense</label>
                    <div><label className="block text-sm font-medium text-gray-700">Client ID</label><input type="text" value={currentAdSenseConfig.clientId} onChange={e => setCurrentAdSenseConfig({...currentAdSenseConfig, clientId: e.target.value})} className="mt-1 block w-full px-3 py-2 border rounded-md" /></div>
                    <div><label className="block text-sm font-medium text-gray-700">Ad Slot ID</label><input type="text" value={currentAdSenseConfig.adSlotId} onChange={e => setCurrentAdSenseConfig({...currentAdSenseConfig, adSlotId: e.target.value})} className="mt-1 block w-full px-3 py-2 border rounded-md" /></div>
                    <div><label className="block text-sm font-medium text-gray-700">Verification Code</label><input type="text" placeholder="content value from meta tag" value={currentAdSenseConfig.verificationCode} onChange={e => setCurrentAdSenseConfig({...currentAdSenseConfig, verificationCode: e.target.value})} className="mt-1 block w-full px-3 py-2 border rounded-md" /></div>
                    <Button onClick={handleAdSenseSave}>Save AdSense Settings</Button>
                </div>
            </Card>
        );
    };
    
    const renderInternalAdsConfig = () => {
        const adSlots = ['home', 'questionnaire', 'share', 'results'];
        return (
            <Card>
                <h3 className="text-xl font-bold mb-4">Internal Ads Settings</h3>
                <div className="space-y-6">
                    {adSlots.map(slot => (
                        <div key={slot} className="p-4 border rounded-lg">
                            <h4 className="font-semibold capitalize text-gray-800">{currentInternalAds[slot]?.title || slot} Page Ad</h4>
                            <div className="space-y-2 mt-2">
                                <label className="flex items-center"><input type="checkbox" checked={currentInternalAds[slot]?.enabled || false} onChange={e => setCurrentInternalAds({...currentInternalAds, [slot]: {...(currentInternalAds[slot] || { enabled: false, imageUrl: '', redirectUrl: '', title: slot }), enabled: e.target.checked}})} className="mr-2 h-4 w-4 rounded" />Enable Ad</label>
                                <div><label className="block text-sm font-medium">Image URL (from ImgBB)</label><input type="text" value={currentInternalAds[slot]?.imageUrl || ''} onChange={e => setCurrentInternalAds({...currentInternalAds, [slot]: {...(currentInternalAds[slot] || { enabled: false, imageUrl: '', redirectUrl: '', title: slot }), imageUrl: e.target.value}})} className="mt-1 block w-full p-2 border rounded-md" /></div>
                                <div><label className="block text-sm font-medium">Redirect URL</label><input type="text" value={currentInternalAds[slot]?.redirectUrl || ''} onChange={e => setCurrentInternalAds({...currentInternalAds, [slot]: {...(currentInternalAds[slot] || { enabled: false, imageUrl: '', redirectUrl: '', title: slot }), redirectUrl: e.target.value}})} className="mt-1 block w-full p-2 border rounded-md" /></div>
                            </div>
                        </div>
                    ))}
                    <Button onClick={handleInternalAdsSave}>Save Internal Ad Settings</Button>
                </div>
            </Card>
        );
    };

    const renderStaticPages = () => {
        const pages = ['about', 'contact', 'privacy', 'terms'];
        return (
            <Card>
                 <h3 className="text-xl font-bold mb-4">Static Pages Content</h3>
                 <div className="space-y-6">
                    {pages.map(page => (<div key={page}><label className="block text-sm font-medium capitalize font-bold text-gray-700">{page} Page (HTML allowed)</label><textarea value={currentStaticPages[page] || ''} onChange={e => setCurrentStaticPages({...currentStaticPages, [page]: e.target.value})} rows={8} className="mt-1 block w-full p-2 border rounded-md font-mono text-sm"/></div>))}
                    <Button onClick={handleStaticPagesSave}>Save Static Pages</Button>
                 </div>
            </Card>
        );
    };
    
    return (
        <div className="space-y-6">
            <Card><div className="flex justify-between items-center"><h2 className="text-2xl font-bold">Admin Dashboard</h2><Button onClick={onLogout} variant="secondary" className="w-auto px-4 py-2 text-sm">Logout</Button></div><div className="flex space-x-1 sm:space-x-2 border-b mt-4 overflow-x-auto"><TabButton name="templates" label="Manage Quizzes" /><TabButton name="ads" label="Ad Settings" /><TabButton name="pages" label="Static Pages" /></div></Card>
            {activeTab === 'templates' && renderTemplates()}
            {activeTab === 'ads' && <div className="space-y-6">{renderAdSenseConfig()}{renderInternalAdsConfig()}</div>}
            {activeTab === 'pages' && renderStaticPages()}
            {isEditorOpen && <QuizEditorModal template={editingTemplate!} setTemplate={setEditingTemplate} onClose={() => setIsEditorOpen(false)} onSave={handleSaveTemplate} />}
            {isExportModalOpen && <ExportCodeModal code={generatedCode} onCopy={copyGeneratedCode} onClose={() => setIsExportModalOpen(false)} />}
        </div>
    );

    function TabButton({ name, label }: { name: string, label: string }) { return (<button onClick={() => setActiveTab(name)} className={`px-3 sm:px-4 py-2 -mb-px border-b-2 text-sm sm:text-base whitespace-nowrap ${activeTab === name ? 'border-pink-500 text-pink-600 font-semibold' : 'border-transparent text-gray-500 hover:text-gray-700'}`}>{label}</button>); }
};

const QuizEditorModal: React.FC<{template: QuizTemplate, setTemplate: React.Dispatch<React.SetStateAction<QuizTemplate | null>>, onClose: () => void, onSave: () => void}> = ({ template, setTemplate, onClose, onSave }) => {
    if (!template) return null;
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setTemplate(p => p ? { ...p, [e.target.name]: e.target.value } : null);
    const handleAnalysisChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => setTemplate(p => p ? { ...p, analysisConfig: { ...p.analysisConfig, [e.target.name]: e.target.value }} : null);
    const handleQuestionChange = (qIndex: number, text: string) => setTemplate(p => !p ? null : { ...p, questions: p.questions.map((q, i) => i === qIndex ? {...q, text} : q) });
    const handleOptionChange = (qIndex: number, oIndex: number, value: string) => setTemplate(p => !p ? null : { ...p, questions: p.questions.map((q, i) => i === qIndex ? {...q, options: q.options.map((opt, oi) => oi === oIndex ? value : opt)} : q) });
    const addQuestion = () => setTemplate(p => !p ? null : { ...p, questions: [...(p.questions || []), {id: Date.now(), category: 'Admin', text: '', options: ['', '', '', ''], active: true}] });
    const removeQuestion = (qIndex: number) => setTemplate(p => !p ? null : { ...p, questions: (p.questions || []).filter((_, i) => i !== qIndex) });
    return (<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"><Card className="w-full max-w-3xl max-h-[90vh] flex flex-col"><h3 className="text-xl font-bold mb-4">{template.id.startsWith('new-') ? 'Create New Quiz' : 'Edit Quiz'}</h3><div className="flex-grow overflow-y-auto space-y-4 pr-2"><input type="text" name="title" value={template.title || ''} onChange={handleInputChange} placeholder="Quiz Title" className="w-full p-2 border rounded"/><textarea name="description" value={template.description || ''} onChange={handleInputChange} placeholder="Description" rows={2} className="w-full p-2 border rounded"/><input type="text" name="imageUrl" value={template.imageUrl || ''} onChange={handleInputChange} placeholder="Thumbnail Image URL" className="w-full p-2 border rounded"/><div className="space-y-4"><h4 className="font-semibold mt-4">Questions</h4>{(template.questions || []).map((q, qIndex) => (<div key={q.id || qIndex} className="p-4 border rounded bg-rose-50 relative"><p className="font-bold mb-2 text-gray-700">Q {qIndex + 1}</p><textarea value={q.text} onChange={e => handleQuestionChange(qIndex, e.target.value)} placeholder="Question text" rows={2} className="w-full p-2 border rounded mb-2"/><div className="grid grid-cols-2 gap-2">{(q.options || ['', '', '', '']).map((opt, oIndex) => (<input key={oIndex} type="text" value={opt} placeholder={`Option ${oIndex + 1}`} onChange={e => handleOptionChange(qIndex, oIndex, e.target.value)} className="w-full p-2 border rounded"/>))}</div><button onClick={() => removeQuestion(qIndex)} className="absolute top-2 right-2 text-red-500 hover:text-red-700 p-1 rounded-full"><svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm4 0a1 1 0 012 0v6a1 1 0 11-2 0V8z" clipRule="evenodd" /></svg></button></div>))}<Button onClick={addQuestion} variant="secondary">Add Question</Button></div><div className="space-y-2"><h4 className="font-semibold mt-4">Result Analysis Text</h4><AnalysisTextArea name="range0_25" label="Score 0-25%" value={template.analysisConfig?.range0_25 || ''} onChange={handleAnalysisChange} /><AnalysisTextArea name="range26_50" label="Score 26-50%" value={template.analysisConfig?.range26_50 || ''} onChange={handleAnalysisChange} /><AnalysisTextArea name="range51_75" label="Score 51-75%" value={template.analysisConfig?.range51_75 || ''} onChange={handleAnalysisChange} /><AnalysisTextArea name="range76_100" label="Score 76-100%" value={template.analysisConfig?.range76_100 || ''} onChange={handleAnalysisChange} /></div></div><div className="mt-6 flex gap-2"><Button onClick={onClose} variant="secondary">Cancel</Button><Button onClick={onSave}>Save Template</Button></div></Card></div>);
};
const AnalysisTextArea: React.FC<{name: string, label: string, value: string, onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void}> = ({ name, label, value, onChange }) => (<div><label className="block text-sm font-medium text-gray-700">{label}</label><textarea name={name} value={value} onChange={onChange} rows={3} className="w-full p-2 border rounded mt-1"/></div>);

const ExportCodeModal: React.FC<{code: string, onCopy: () => void, onClose: () => void}> = ({ code, onCopy, onClose }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <Card className="w-full max-w-2xl max-h-[90vh] flex flex-col">
            <h3 className="text-xl font-bold mb-4">Generated Template Code</h3>
            <p className="text-sm text-gray-600 mb-2">1. Click 'Copy Code'.</p>
            <p className="text-sm text-gray-600 mb-4">2. Go to your project, open the <code className="bg-rose-100 text-pink-700 p-1 rounded text-xs">data/officialTemplates.ts</code> file, delete all its content, and paste this new code.</p>
            <textarea readOnly value={code} className="w-full flex-grow p-2 border rounded bg-gray-50 font-mono text-xs"/>
            <div className="mt-6 flex gap-2">
                <Button onClick={onClose} variant="secondary">Close</Button>
                <Button onClick={onCopy}>Copy Code</Button>
            </div>
        </Card>
    </div>
);

export default AdminDashboardView;