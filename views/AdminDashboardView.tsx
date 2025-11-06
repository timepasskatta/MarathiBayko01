import React, { useState } from 'react';
import { QuizTemplate, AdSenseConfig, InternalAd, SiteImagesConfig, Question } from '../types';
import Button from '../components/Button';
import Card from '../components/Card';
import { officialTemplates } from '../data/officialTemplates';

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
  onLogout,
}) => {
    const [activeTab, setActiveTab] = useState('publish');
    const [isEditorOpen, setIsEditorOpen] = useState(false);
    const [editingTemplate, setEditingTemplate] = useState<QuizTemplate | null>(null);
    const [templates, setTemplates] = useState<QuizTemplate[]>(officialTemplates);
    const [generatedCode, setGeneratedCode] = useState<string | null>(null);

    const openEditor = (template: QuizTemplate | null) => {
      if (template) {
        setEditingTemplate(JSON.parse(JSON.stringify(template)));
      } else {
        setEditingTemplate({
          id: `custom-${Date.now()}`,
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
    
    const formatCode = (obj: any) => {
      let jsonString = JSON.stringify(obj, null, 2);
      // Add more specific formatting if needed
      return jsonString;
    };

    const handleGenerateCode = () => {
        const header = `import { QuizTemplate } from '../types';\nimport { initialQuestions } from './questions';\n\nconst defaultAnalysis = {\n    range0_25: "It seems like there are quite a few differences in your perspectives. This is a great opportunity to start some interesting conversations and learn more about each other's worlds!",\n    range26_50: "You two have some common ground, but also areas where you see things differently. Exploring these differences can be a fun adventure and a way to grow even closer.",\n    range51_75: "You're on the same wavelength most of the time! You have a solid foundation of understanding. The few differences you have can add a little spice to your relationship.",\n    range76_100: "Wow, it's like you can read each other's minds! Your connection is incredibly strong. You share a deep understanding that is truly special.",\n};\n\nexport const officialTemplates: QuizTemplate[] = `;
        
        // A simple way to represent the questions array in the output
        const templatesWithQuestionVars = templates.map(t => {
            if (t.id === 'official-standard') {
                return { ...t, questions: 'initialQuestions' };
            }
            // Add more complex logic here if other templates use subsets of initialQuestions
            return t;
        });

        let code = header + formatCode(templatesWithQuestionVars) + ';\n';
        // Replace stringified question variables with the actual variable names
        code = code.replace(/"questions": "initialQuestions"/g, '"questions": initialQuestions');
        
        setGeneratedCode(code);
    };

    const TemplateSection: React.FC<{title: string, templates: QuizTemplate[], onEdit: (t: QuizTemplate)=>void, onDelete: (id: string)=>void}> = ({title, templates, onEdit, onDelete}) => (
         <Card>
            <h3 className="text-xl font-bold mb-4">{title} ({templates.length})</h3>
            {templates.length === 0 ? <p className="text-gray-500">No templates here.</p> : (
                <div className="space-y-4">
                    {templates.map(template => (
                        <div key={template.id} className="p-4 border rounded-lg bg-gray-50 space-y-2">
                            <p><strong>Title:</strong> {template.title}</p>
                            <div className="flex flex-wrap gap-2 mt-2">
                                <Button onClick={() => onEdit(template)} variant="secondary" className="text-sm py-1 px-2 w-auto">Edit</Button>
                                <Button onClick={() => onDelete(template.id)} variant="secondary" className="text-sm py-1 px-2 w-auto bg-red-500 hover:bg-red-600 border-red-500 text-white">Delete</Button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </Card>
    );

    return (
        <div className="space-y-6">
            <Card>
                <div className="flex justify-between items-center flex-wrap gap-4">
                    <h2 className="text-2xl font-bold">Admin Dashboard</h2>
                    <Button onClick={onLogout} variant="secondary" className="w-auto px-4 py-2 text-sm">Logout</Button>
                </div>
                <div className="flex space-x-1 sm:space-x-2 border-b mt-4 overflow-x-auto">
                    <TabButton name="publish" label="Publish Changes" />
                    <TabButton name="templates" label="Manage Quizzes" />
                    <TabButton name="adsense" label="AdSense" />
                    <TabButton name="internal_ads" label="Internal Ads" />
                    <TabButton name="theme" label="Theme" />
                    <TabButton name="static_pages" label="Static Pages" />
                </div>
            </Card>
            
            {activeTab === 'publish' && (
              <Card>
                <h3 className="text-xl font-bold mb-2">Publish Your Changes</h3>
                <p className="text-gray-500 mb-4">After you have saved all your changes in the other tabs, click the button below to generate the final code. You will need to copy this code and replace the content of the `data/officialTemplates.ts` file in your GitHub project to make the changes live.</p>
                <Button onClick={handleGenerateCode}>Save Changes & Generate Code</Button>
              </Card>
            )}

            {activeTab === 'templates' && (
                <div className="space-y-6">
                    <div className="text-right">
                        <Button onClick={() => openEditor(null)} className="w-auto">Create New Template</Button>
                    </div>
                    <TemplateSection title="All Quiz Templates" templates={templates} onEdit={openEditor} onDelete={handleTemplateDelete} />
                </div>
            )}

            {activeTab === 'adsense' && <ConfigSaver settingKey="adsense-config" initialValue={adSenseConfig}><AdSenseConfigUI /></ConfigSaver>}
            {activeTab === 'internal_ads' && <ConfigSaver settingKey="internal-ad-config" initialValue={internalAdConfig}><InternalAdsConfigUI /></ConfigSaver>}
            {activeTab === 'theme' && <ConfigSaver settingKey="site-images-config" initialValue={siteImages}><ThemeConfigUI /></ConfigSaver>}
            {activeTab === 'static_pages' && <ConfigSaver settingKey="static-pages-content" initialValue={staticPages}><StaticPagesUI /></ConfigSaver>}
            
            {isEditorOpen && editingTemplate && (
                <QuizEditorModal
                    template={editingTemplate}
                    setTemplate={setEditingTemplate}
                    onClose={() => setIsEditorOpen(false)}
                    onSave={handleSaveTemplate}
                />
            )}
            {generatedCode && <GeneratedCodeModal code={generatedCode} onClose={() => setGeneratedCode(null)} />}
        </div>
    );

    function TabButton({ name, label }: { name: string, label: string }) {
        return (
            <button
                onClick={() => setActiveTab(name)}
                className={`px-3 sm:px-4 py-2 -mb-px border-b-2 text-sm sm:text-base whitespace-nowrap ${activeTab === name ? 'border-pink-500 text-pink-600 font-semibold' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
            >
                {label}
            </button>
        );
    }
};

// --- Config Section UIs ---

// FIX: Made config and setConfig props optional and added a guard clause to handle them being injected by the parent.
const AdSenseConfigUI: React.FC<{config?: AdSenseConfig, setConfig?: (c: AdSenseConfig)=>void}> = ({ config, setConfig }) => {
    if (!config || !setConfig) return null;
    return (
        <div className="space-y-4">
            <label className="flex items-center">
                <input type="checkbox" checked={config.enabled} onChange={e => setConfig({...config, enabled: e.target.checked})} className="mr-2 h-4 w-4" />
                Enable AdSense
            </label>
            <div>
                <label className="block text-sm font-medium">Client ID (ca-pub-xxxx)</label>
                <input type="text" value={config.clientId} onChange={e => setConfig({...config, clientId: e.target.value})} className="mt-1 w-full p-2 border rounded-md" />
            </div>
            <div>
                <label className="block text-sm font-medium">Ad Slot ID</label>
                <input type="text" value={config.adSlotId} onChange={e => setConfig({...config, adSlotId: e.target.value})} className="mt-1 w-full p-2 border rounded-md" />
            </div>
            <div>
                <label className="block text-sm font-medium">AdSense Verification Code</label>
                <input type="text" value={config.verificationCode} onChange={e => setConfig({...config, verificationCode: e.target.value})} className="mt-1 w-full p-2 border rounded-md" />
            </div>
        </div>
    );
};

// FIX: Made config and setConfig props optional and added a guard clause to handle them being injected by the parent.
const InternalAdsConfigUI: React.FC<{config?: Record<string, InternalAd>, setConfig?: (c: Record<string, InternalAd>)=>void}> = ({ config, setConfig }) => {
    if (!config || !setConfig) return null;
    const handleInternalAdChange = (key: string, e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, value, type } = e.target;
      const isChecked = (e.target as HTMLInputElement).checked;
      setConfig({
        ...config,
        [key]: {
          ...(config[key] || {enabled: false, imageUrl: '', redirectUrl: '', title: '', aspectRatio: '16:9'}),
          [name]: type === 'checkbox' ? isChecked : value,
        },
      });
    };
    return (
        <div className="space-y-6">
          {Object.entries(config).map(([key, ad]) => (
            <div key={key} className="p-4 border rounded-lg">
              <h4 className="font-semibold mb-2">{ad.title}</h4>
              <div className="space-y-4">
                <label className="flex items-center">
                  <input type="checkbox" name="enabled" checked={ad.enabled} onChange={(e) => handleInternalAdChange(key, e)} className="mr-2 h-4 w-4" />
                  Enable Ad
                </label>
                <div>
                    <label className="block text-sm font-medium">Image URL</label>
                    <input type="text" name="imageUrl" value={ad.imageUrl} onChange={(e) => handleInternalAdChange(key, e)} className="mt-1 w-full p-2 border rounded-md" />
                </div>
                 <div>
                    <label className="block text-sm font-medium">Redirect URL</label>
                    <input type="text" name="redirectUrl" value={ad.redirectUrl} onChange={(e) => handleInternalAdChange(key, e)} className="mt-1 w-full p-2 border rounded-md" />
                </div>
              </div>
            </div>
          ))}
        </div>
    );
};

// FIX: Made config and setConfig props optional and added a guard clause to handle them being injected by the parent.
const ThemeConfigUI: React.FC<{config?: SiteImagesConfig, setConfig?: (c: SiteImagesConfig)=>void}> = ({ config, setConfig }) => {
    if (!config || !setConfig) return null;
    return (
    <div className="space-y-4">
        <div>
            <label className="block text-sm font-medium">'Create Your Own Quiz' Image URL</label>
            <input type="text" value={config.createQuiz} onChange={e => setConfig({...config, createQuiz: e.target.value})} className="mt-1 w-full p-2 border rounded-md" />
        </div>
    </div>
    );
};

// FIX: Made config and setConfig props optional and added a guard clause to handle them being injected by the parent.
const StaticPagesUI: React.FC<{config?: Record<string, string>, setConfig?: (c: Record<string, string>)=>void}> = ({ config, setConfig }) => {
    if (!config || !setConfig) return null;
    return (
     <div className="space-y-6">
        {Object.entries(config).map(([key, content]) => (
        <div key={key}>
            <label className="block text-sm font-medium capitalize">{key} Page (HTML allowed)</label>
            <textarea
            value={content}
            onChange={(e) => setConfig({...config, [key]: e.target.value})}
            rows={8}
            className="mt-1 w-full p-2 border rounded-md font-mono text-sm"
            />
        </div>
        ))}
    </div>
    );
};


// FIX: Updated the type of 'children' to be more specific, which resolves the React.cloneElement type error.
// --- Generic component to wrap config sections with a save button ---
const ConfigSaver: React.FC<{ settingKey: string; initialValue: any; children: React.ReactElement<{ config?: any; setConfig?: (c: any) => void; }> }> = ({ settingKey, initialValue, children }) => {
    const [config, setConfig] = useState(initialValue);
    
    const saveConfig = () => {
        localStorage.setItem(settingKey, JSON.stringify(config));
        alert('Settings saved! Click "Publish Changes" later to generate final code.');
        // This is a bit of a hack to let App.tsx know things changed. A proper state manager (Redux, Context) would be better.
        window.dispatchEvent(new Event('storage'));
    };
    
    return (
        <Card>
            {React.cloneElement(children, { config, setConfig })}
            <div className="mt-6">
                <Button onClick={saveConfig}>Save This Section</Button>
            </div>
        </Card>
    );
};


// --- Modal Components ---

interface QuizEditorModalProps {
    template: QuizTemplate;
    setTemplate: React.Dispatch<React.SetStateAction<QuizTemplate | null>>;
    onClose: () => void;
    onSave: () => void;
}

const QuizEditorModal: React.FC<QuizEditorModalProps> = ({ template, setTemplate, onClose, onSave }) => {
    
    if (!template) return null;
    
    const t = template; // shorthand

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setTemplate(prev => prev ? { ...prev, [name]: value } : null);
    };

    const handleAnalysisChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setTemplate(prev => prev ? { ...prev, analysisConfig: { ...(prev.analysisConfig), [name]: value }} : null);
    };

    const handleQuestionChange = (qIndex: number, text: string) => {
        setTemplate(prev => {
            if (!prev) return null;
            const newQuestions = [...prev.questions];
            newQuestions[qIndex].text = text;
            return { ...prev, questions: newQuestions };
        });
    };

    const handleOptionChange = (qIndex: number, oIndex: number, value: string) => {
        setTemplate(prev => {
            if (!prev) return null;
            const newQuestions = [...prev.questions];
            newQuestions[qIndex].options[oIndex] = value;
            return { ...prev, questions: newQuestions };
        });
    };
    
    const addQuestion = () => {
        setTemplate(prev => {
            if (!prev) return null;
            const newQuestion: Question = {
                id: Date.now(),
                category: 'Admin',
                text: '',
                options: ['', '', '', ''],
                active: true
            };
            return { ...prev, questions: [...(prev.questions || []), newQuestion] };
        });
    };

    const removeQuestion = (qIndex: number) => {
        setTemplate(prev => {
            if (!prev) return null;
            return { ...prev, questions: (prev.questions || []).filter((_, index) => index !== qIndex) };
        });
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <Card className="w-full max-w-3xl max-h-[90vh] flex flex-col">
                <h3 className="text-xl font-bold mb-4 text-left">{t.id.startsWith('custom-') ? 'Create New Quiz Template' : 'Edit Quiz Template'}</h3>
                <div className="flex-grow overflow-y-auto space-y-4 pr-2 text-left">
                    <input type="text" name="title" value={t.title || ''} onChange={handleInputChange} placeholder="Quiz Title" className="w-full p-2 border rounded"/>
                    <textarea name="description" value={t.description || ''} onChange={handleInputChange} placeholder="Description" rows={2} className="w-full p-2 border rounded"/>
                    <input type="text" name="imageUrl" value={t.imageUrl || ''} onChange={handleInputChange} placeholder="Thumbnail Image URL" className="w-full p-2 border rounded"/>
                    
                    <div className="space-y-4">
                        <h4 className="font-semibold mt-4">Questions</h4>
                        {(t.questions || []).map((q, qIndex) => (
                            <div key={q.id || qIndex} className="p-4 border rounded bg-rose-50 relative">
                                <p className="font-bold mb-2 text-gray-700">Question {qIndex + 1}</p>
                                <textarea value={q.text} onChange={e => handleQuestionChange(qIndex, e.target.value)} placeholder="Question text" rows={2} className="w-full p-2 border rounded mb-2"/>
                                <div className="grid grid-cols-2 gap-2">
                                    {(q.options || ['', '', '', '']).map((opt, oIndex) => (
                                        <input key={oIndex} type="text" value={opt} placeholder={`Option ${oIndex + 1}`} onChange={e => handleOptionChange(qIndex, oIndex, e.target.value)} className="w-full p-2 border rounded"/>
                                    ))}
                                </div>
                                <button onClick={() => removeQuestion(qIndex)} className="absolute top-2 right-2 text-red-500 hover:text-red-700 p-1 rounded-full" aria-label="Delete Question">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm4 0a1 1 0 012 0v6a1 1 0 11-2 0V8z" clipRule="evenodd" /></svg>
                                </button>
                            </div>
                        ))}
                         <Button onClick={addQuestion} variant="secondary">Add Question</Button>
                    </div>

                    <div className="space-y-2">
                        <h4 className="font-semibold mt-4">Result Analysis Text</h4>
                        <AnalysisTextArea name="range0_25" label="Score 0-25%" value={t.analysisConfig?.range0_25 || ''} onChange={handleAnalysisChange} />
                        <AnalysisTextArea name="range26_50" label="Score 26-50%" value={t.analysisConfig?.range26_50 || ''} onChange={handleAnalysisChange} />
                        <AnalysisTextArea name="range51_75" label="Score 51-75%" value={t.analysisConfig?.range51_75 || ''} onChange={handleAnalysisChange} />
                        <AnalysisTextArea name="range76_100" label="Score 76-100%" value={t.analysisConfig?.range76_100 || ''} onChange={handleAnalysisChange} />
                    </div>
                </div>
                <div className="mt-6 flex gap-2">
                    <Button onClick={onClose} variant="secondary">Cancel</Button>
                    <Button onClick={onSave}>Save Template</Button>
                </div>
            </Card>
        </div>
    );
};

const GeneratedCodeModal: React.FC<{code: string, onClose: ()=>void}> = ({ code, onClose }) => {
  const [copied, setCopied] = useState(false);
  
  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <Card className="w-full max-w-3xl max-h-[90vh] flex flex-col">
            <h3 className="text-xl font-bold mb-2 text-left">Generated Code for `officialTemplates.ts`</h3>
            <div className="text-left text-sm text-gray-500 mb-4">
                <p><strong>Step 1:</strong> Click 'Copy Code'.</p>
                <p><strong>Step 2:</strong> Go to your GitHub project and open the `data/officialTemplates.ts` file.</p>
                <p><strong>Step 3:</strong> Delete all the old code in that file and paste this new code.</p>
                <p><strong>Step 4:</strong> Save the file and redeploy your site to make the changes live.</p>
            </div>
            <textarea readOnly value={code} className="w-full flex-grow border rounded bg-gray-50 font-mono text-xs p-2"/>
            <div className="mt-6 flex gap-2">
                <Button onClick={onClose} variant="secondary">Close</Button>
                <Button onClick={handleCopy}>{copied ? 'Copied!' : 'Copy Code'}</Button>
            </div>
        </Card>
    </div>
  );
};

const AnalysisTextArea: React.FC<{name: string, label: string, value: string, onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void}> = ({ name, label, value, onChange }) => (
    <div>
        <label className="block text-sm font-medium text-gray-700">{label}</label>
        <textarea name={name} value={value} onChange={onChange} rows={3} className="w-full p-2 border rounded mt-1 text-left"/>
    </div>
);


export default AdminDashboardView;