import React, { useState } from 'react';
import { QuizTemplate, AdSenseConfig, InternalAd, Question, SiteImagesConfig } from '../types';
import { officialTemplates } from '../data/officialTemplates';
import Button from '../components/Button';
import Card from '../components/Card';

interface AdminDashboardViewProps {
  adSenseConfig: AdSenseConfig;
  setAdSenseConfig: React.Dispatch<React.SetStateAction<AdSenseConfig>>;
  internalAdConfig: Record<string, InternalAd>;
  setInternalAdConfig: React.Dispatch<React.SetStateAction<Record<string, InternalAd>>>;
  staticPages: Record<string, string>;
  setStaticPages: React.Dispatch<React.SetStateAction<Record<string, string>>>;
  siteImages: SiteImagesConfig;
  setSiteImages: React.Dispatch<React.SetStateAction<SiteImagesConfig>>;
  onLogout: () => void;
}

const AdminDashboardView: React.FC<AdminDashboardViewProps> = ({
  adSenseConfig,
  setAdSenseConfig,
  internalAdConfig,
  setInternalAdConfig,
  staticPages,
  setStaticPages,
  siteImages,
  setSiteImages,
  onLogout
}) => {
    const [activeTab, setActiveTab] = useState('templates');
    const [isEditorOpen, setIsEditorOpen] = useState(false);
    const [editingTemplate, setEditingTemplate] = useState<QuizTemplate | null>(null);
    const [templates, setTemplates] = useState<QuizTemplate[]>(officialTemplates);
    const [isExportModalOpen, setIsExportModalOpen] = useState(false);
    const [generatedCode, setGeneratedCode] = useState('');
    
    // States for editing configs
    const [currentAdSenseConfig, setCurrentAdSenseConfig] = useState(adSenseConfig);
    const [currentInternalAdConfig, setCurrentInternalAdConfig] = useState(internalAdConfig);
    const [currentStaticPages, setCurrentStaticPages] = useState(staticPages);
    const [currentSiteImages, setCurrentSiteImages] = useState(siteImages);
    
    // Handlers for template management
    const openEditor = (template: QuizTemplate | null) => {
      if (template) {
        setEditingTemplate(JSON.parse(JSON.stringify(template))); // Deep copy
      } else {
        setEditingTemplate({
          id: `custom-${Date.now()}`,
          title: '', description: '', creatorName: 'Marathi Bayko',
          questions: [], isPublic: true, isOfficial: true, createdAt: new Date().toISOString(),
          status: 'approved', imageUrl: '',
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
    
    // Handlers for config saving and code generation
    const handleGenerateCode = () => {
        setAdSenseConfig(currentAdSenseConfig);
        setInternalAdConfig(currentInternalAdConfig);
        setStaticPages(currentStaticPages);
        setSiteImages(currentSiteImages);

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
    
    const renderTemplates = () => (
        <Card>
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold">Manage Quiz Templates ({templates.length})</h3>
                <Button onClick={() => openEditor(null)} className="w-auto">Create New Template</Button>
            </div>
            <div className="space-y-4">
                {templates.map(template => (
                    <div key={template.id} className="p-4 border rounded-lg bg-gray-50 space-y-2">
                        <p><strong>Title:</strong> {template.title}</p>
                        <p className="text-sm"><strong>ID:</strong> {template.id}</p>
                        <div className="flex flex-wrap gap-2 mt-2">
                            <Button onClick={() => openEditor(template)} variant="secondary" className="text-sm py-1 px-2 w-auto">Edit</Button>
                            <Button onClick={() => handleTemplateDelete(template.id)} variant="secondary" className="text-sm py-1 px-2 w-auto bg-red-500 hover:bg-red-600 border-red-500 text-white">Delete</Button>
                        </div>
                    </div>
                ))}
            </div>
        </Card>
    );
    
    const renderAdSenseConfig = () => (
            <Card>
                <h3 className="text-xl font-bold mb-4">Google AdSense Settings</h3>
                <div className="space-y-4">
                    <div><label className="flex items-center"><input type="checkbox" checked={currentAdSenseConfig.enabled} onChange={e => setCurrentAdSenseConfig({...currentAdSenseConfig, enabled: e.target.checked})} className="mr-2 h-4 w-4 rounded border-gray-300 text-pink-600 focus:ring-pink-500" />Enable AdSense</label></div>
                    <div><label className="block text-sm font-medium text-gray-700">Client ID</label><input type="text" value={currentAdSenseConfig.clientId} onChange={e => setCurrentAdSenseConfig({...currentAdSenseConfig, clientId: e.target.value})} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm" /></div>
                    <div><label className="block text-sm font-medium text-gray-700">Ad Slot ID</label><input type="text" value={currentAdSenseConfig.adSlotId} onChange={e => setCurrentAdSenseConfig({...currentAdSenseConfig, adSlotId: e.target.value})} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm" /></div>
                    <div><label className="block text-sm font-medium text-gray-700">Verification Code</label><input type="text" placeholder="Enter content from meta tag" value={currentAdSenseConfig.verificationCode} onChange={e => setCurrentAdSenseConfig({...currentAdSenseConfig, verificationCode: e.target.value})} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm" /></div>
                </div>
            </Card>
    );
    
    const renderInternalAdsConfig = () => {
        const adSlots = ['home', 'questionnaire', 'share', 'results'];
        return (
            <Card>
                <h3 className="text-xl font-bold mb-4">Internal Ads Settings</h3>
                <div className="space-y-6">
                    {adSlots.map(slot => (
                        <div key={slot} className="p-4 border rounded-lg"><h4 className="font-semibold capitalize text-gray-800">{slot} Page Ad</h4><div className="space-y-2 mt-2">
                            <label className="flex items-center"><input type="checkbox" checked={currentInternalAdConfig[slot]?.enabled || false} onChange={e => setCurrentInternalAdConfig({...currentInternalAdConfig, [slot]: {...(currentInternalAdConfig[slot] || { enabled: false, imageUrl: '', redirectUrl: '', title: '' }), enabled: e.target.checked}})} className="mr-2 h-4 w-4 rounded border-gray-300 text-pink-600 focus:ring-pink-500" />Enable Ad</label>
                            <div><label className="block text-sm font-medium text-gray-700">Image URL</label><input type="text" value={currentInternalAdConfig[slot]?.imageUrl || ''} onChange={e => setCurrentInternalAdConfig({...currentInternalAdConfig, [slot]: {...(currentInternalAdConfig[slot] || { enabled: false, imageUrl: '', redirectUrl: '', title: '' }), imageUrl: e.target.value}})} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm" /></div>
                            <div><label className="block text-sm font-medium text-gray-700">Redirect URL</label><input type="text" value={currentInternalAdConfig[slot]?.redirectUrl || ''} onChange={e => setCurrentInternalAdConfig({...currentInternalAdConfig, [slot]: {...(currentInternalAdConfig[slot] || { enabled: false, imageUrl: '', redirectUrl: '', title: '' }), redirectUrl: e.target.value}})} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm" /></div>
                        </div></div>
                    ))}
                </div>
            </Card>
        );
    };

    const renderStaticPages = () => {
        const pages = ['about', 'contact', 'privacy', 'terms'];
        return (
            <Card>
                 <h3 className="text-xl font-bold mb-4">Static Pages Content</h3>
                 <div className="space-y-6">{pages.map(page => (<div key={page}><label className="block text-sm font-medium capitalize font-bold text-gray-700">{page} Page (HTML)</label><textarea value={currentStaticPages[page] || ''} onChange={e => setCurrentStaticPages({...currentStaticPages, [page]: e.target.value})} rows={8} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm font-mono text-sm"/></div>))}<Button onClick={() => setStaticPages(currentStaticPages)}>Save Static Pages</Button></div>
            </Card>
        );
    };
    
    const renderThemeConfig = () => (
         <Card>
            <h3 className="text-xl font-bold mb-4">Theme Settings</h3>
             <div className="space-y-4">
                <div><label className="block text-sm font-medium text-gray-700">'Create Quiz' Card Image URL</label><input type="text" value={currentSiteImages.createQuiz} onChange={e => setCurrentSiteImages({...currentSiteImages, createQuiz: e.target.value})} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm" /></div>
                <div><label className="block text-sm font-medium text-gray-700">'Got a Code?' Card Image URL</label><input type="text" value={currentSiteImages.joinQuiz} onChange={e => setCurrentSiteImages({...currentSiteImages, joinQuiz: e.target.value})} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm" /></div>
            </div>
        </Card>
    );
    
    return (
        <div className="space-y-6">
            <Card>
                <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-bold">Admin Dashboard</h2>
                    <Button onClick={onLogout} variant="secondary" className="w-auto px-4 py-2 text-sm">Logout</Button>
                </div>
                <div className="flex space-x-1 sm:space-x-2 border-b mt-4 overflow-x-auto">
                    <TabButton name="templates" label="Manage Quizzes" />
                    <TabButton name="theme" label="Theme" />
                    <TabButton name="adsense" label="AdSense" />
                    <TabButton name="internal_ads" label="Internal Ads" />
                    <TabButton name="static_pages" label="Static Pages" />
                </div>
            </Card>
            
            {activeTab === 'templates' && renderTemplates()}
            {activeTab === 'theme' && renderThemeConfig()}
            {activeTab === 'adsense' && renderAdSenseConfig()}
            {activeTab === 'internal_ads' && renderInternalAdsConfig()}
            {activeTab === 'static_pages' && renderStaticPages()}
            
            <div className="sticky bottom-4 z-40">
                <Card className="shadow-2xl">
                    <Button onClick={handleGenerateCode} className="w-full">Save Changes & Generate Code</Button>
                </Card>
            </div>
            
            {isEditorOpen && editingTemplate && (
                <QuizEditorModal template={editingTemplate} setTemplate={setEditingTemplate} onClose={() => setIsEditorOpen(false)} onSave={handleSaveTemplate} />
            )}
            {isExportModalOpen && (
                <ExportModal code={generatedCode} onClose={() => setIsExportModalOpen(false)} />
            )}
        </div>
    );

    function TabButton({ name, label }: { name: string, label: string }) {
        return (<button onClick={() => setActiveTab(name)} className={`px-3 sm:px-4 py-2 -mb-px border-b-2 text-sm sm:text-base whitespace-nowrap ${activeTab === name ? 'border-pink-500 text-pink-600 font-semibold' : 'border-transparent text-gray-500 hover:text-gray-700'}`}>{label}</button>);
    }
};

interface QuizEditorModalProps { template: QuizTemplate; setTemplate: React.Dispatch<React.SetStateAction<QuizTemplate | null>>; onClose: () => void; onSave: () => void; }
const QuizEditorModal: React.FC<QuizEditorModalProps> = ({ template, setTemplate, onClose, onSave }) => {
    if (!template) return null;
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setTemplate(p => p ? { ...p, [e.target.name]: e.target.value } : null);
    const handleAnalysisChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => setTemplate(p => p ? { ...p, analysisConfig: { ...p.analysisConfig, [e.target.name]: e.target.value }} : null);
    const handleQuestionChange = (qIndex: number, text: string) => setTemplate(p => p ? { ...p, questions: p.questions.map((q, i) => i === qIndex ? {...q, text} : q) } : null);
    const handleOptionChange = (qIndex: number, oIndex: number, value: string) => setTemplate(p => p ? { ...p, questions: p.questions.map((q, i) => i === qIndex ? {...q, options: q.options.map((opt, oi) => oi === oIndex ? value : opt)} : q) } : null);
    const addQuestion = () => setTemplate(p => p ? { ...p, questions: [...(p.questions || []), {id: Date.now(), category: 'Admin', text: '', options: ['', '', '', ''], active: true}] } : null);
    const removeQuestion = (qIndex: number) => setTemplate(p => p ? { ...p, questions: (p.questions || []).filter((_, i) => i !== qIndex) } : null);

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"><Card className="w-full max-w-3xl max-h-[90vh] flex flex-col">
            <h3 className="text-xl font-bold mb-4">{template.id.startsWith('custom-') ? 'Create New Quiz' : 'Edit Quiz'}</h3>
            <div className="flex-grow overflow-y-auto space-y-4 pr-2">
                <input type="text" name="title" value={template.title || ''} onChange={handleInputChange} placeholder="Quiz Title" className="w-full p-2 border rounded"/>
                <textarea name="description" value={template.description || ''} onChange={handleInputChange} placeholder="Description" rows={2} className="w-full p-2 border rounded"/>
                <input type="text" name="imageUrl" value={template.imageUrl || ''} onChange={handleInputChange} placeholder="Thumbnail Image URL" className="w-full p-2 border rounded"/>
                
                <div className="space-y-4"><h4 className="font-semibold mt-4">Questions</h4>
                    {(template.questions || []).map((q, qIndex) => (
                        <div key={q.id || qIndex} className="p-4 border rounded bg-rose-50 relative">
                            <p className="font-bold mb-2 text-gray-700">Question {qIndex + 1}</p>
                            <textarea value={q.text} onChange={e => handleQuestionChange(qIndex, e.target.value)} placeholder="Question text" rows={2} className="w-full p-2 border rounded mb-2"/>
                            <div className="grid grid-cols-2 gap-2">{(q.options || ['', '', '', '']).map((opt, oIndex) => (<input key={oIndex} type="text" value={opt} placeholder={`Option ${oIndex + 1}`} onChange={e => handleOptionChange(qIndex, oIndex, e.target.value)} className="w-full p-2 border rounded"/>))}</div>
                            <button onClick={() => removeQuestion(qIndex)} className="absolute top-2 right-2 text-red-500 hover:text-red-700 p-1 rounded-full"><svg xmlns="http://www.w.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm4 0a1 1 0 012 0v6a1 1 0 11-2 0V8z" clipRule="evenodd" /></svg></button>
                        </div>
                    ))}<Button onClick={addQuestion} variant="secondary">Add Question</Button>
                </div>

                <div className="space-y-2"><h4 className="font-semibold mt-4">Result Analysis Text</h4>
                    <AnalysisTextArea name="range0_25" label="Score 0-25%" value={template.analysisConfig?.range0_25 || ''} onChange={handleAnalysisChange} />
                    <AnalysisTextArea name="range26_50" label="Score 26-50%" value={template.analysisConfig?.range26_50 || ''} onChange={handleAnalysisChange} />
                    <AnalysisTextArea name="range51_75" label="Score 51-75%" value={template.analysisConfig?.range51_75 || ''} onChange={handleAnalysisChange} />
                    <AnalysisTextArea name="range76_100" label="Score 76-100%" value={template.analysisConfig?.range76_100 || ''} onChange={handleAnalysisChange} />
                </div>
            </div>
            <div className="mt-6 flex gap-2"><Button onClick={onClose} variant="secondary">Cancel</Button><Button onClick={onSave}>Save Template</Button></div>
        </Card></div>
    );
};
const AnalysisTextArea: React.FC<{name: string, label: string, value: string, onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void}> = ({ name, label, value, onChange }) => (<div><label className="block text-sm font-medium text-gray-700">{label}</label><textarea name={name} value={value} onChange={onChange} rows={3} className="w-full p-2 border rounded mt-1"/></div>);

const ExportModal: React.FC<{ code: string; onClose: () => void; }> = ({ code, onClose }) => {
    const [copied, setCopied] = useState(false);
    const handleCopy = () => {
        navigator.clipboard.writeText(code);
        setCopied(true);
    };
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"><Card className="w-full max-w-2xl flex flex-col">
            <h3 className="text-xl font-bold mb-4">Update Your Quiz Templates</h3>
            <div className="text-sm space-y-2 mb-4"><p>Your changes have been saved and converted into code. Follow these steps to make your changes live:</p>
                <ol className="list-decimal list-inside space-y-1">
                    <li>Click the 'Copy Code' button below.</li>
                    <li>Go to your project's code on GitHub.</li>
                    <li>Open the file: <code className="bg-rose-100 text-rose-800 px-1 rounded text-xs">/data/officialTemplates.ts</code></li>
                    <li>Delete all the old code in that file and paste this new code.</li>
                    <li>Commit your changes. Your site will redeploy with the new content!</li>
                </ol>
            </div>
            <textarea readOnly value={code} className="w-full h-60 p-2 border rounded font-mono text-xs bg-gray-50"/>
            <div className="mt-4 flex gap-2"><Button onClick={onClose} variant="secondary">Close</Button><Button onClick={handleCopy}>{copied ? 'Copied!' : 'Copy Code'}</Button></div>
        </Card></div>
    );
};


export default AdminDashboardView;
