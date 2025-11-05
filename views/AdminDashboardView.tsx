// FIX: Implemented the AdminDashboardView component to manage quiz templates, ad configurations, and static pages.
import React, { useState } from 'react';
import { QuizTemplate, AdSenseConfig, InternalAd } from '../types';
import Button from '../components/Button';
import Card from '../components/Card';

interface AdminDashboardViewProps {
  templates: QuizTemplate[];
  setTemplates: React.Dispatch<React.SetStateAction<QuizTemplate[]>>;
  adSenseConfig: AdSenseConfig;
  setAdSenseConfig: React.Dispatch<React.SetStateAction<AdSenseConfig>>;
  internalAdConfig: Record<string, InternalAd>;
  setInternalAdConfig: React.Dispatch<React.SetStateAction<Record<string, InternalAd>>>;
  staticPages: Record<string, string>;
  setStaticPages: React.Dispatch<React.SetStateAction<Record<string, string>>>;
  onLogout: () => void;
}

const AdminDashboardView: React.FC<AdminDashboardViewProps> = ({
  templates,
  setTemplates,
  adSenseConfig,
  setAdSenseConfig,
  internalAdConfig,
  setInternalAdConfig,
  staticPages,
  setStaticPages,
  onLogout
}) => {
    const [activeTab, setActiveTab] = useState('templates');
    
    // States for editing configs
    const [currentAdSenseConfig, setCurrentAdSenseConfig] = useState(adSenseConfig);
    const [currentInternalAdConfig, setCurrentInternalAdConfig] = useState(internalAdConfig);
    const [currentStaticPages, setCurrentStaticPages] = useState(staticPages);
    
    // Handlers for template management
    const handleTemplateStatusChange = (id: string, status: 'approved' | 'rejected') => {
        setTemplates(templates.map(t => t.id === id ? { ...t, status, isPublic: status === 'approved' } : t));
    };
    
    const handleTemplateDelete = (id: string) => {
        if (window.confirm('Are you sure you want to delete this template permanently?')) {
            setTemplates(templates.filter(t => t.id !== id));
        }
    };
    
    // Handlers for config saving
    const handleAdSenseSave = () => {
        setAdSenseConfig(currentAdSenseConfig);
        alert('AdSense settings saved!');
    };
    
    const handleInternalAdsSave = () => {
        setInternalAdConfig(currentInternalAdConfig);
        alert('Internal Ad settings saved!');
    };

    const handleStaticPagesSave = () => {
        setStaticPages(currentStaticPages);
        alert('Static pages saved!');
    }

    const renderTemplates = () => {
        const pendingTemplates = templates.filter(t => t.status === 'pending');
        const approvedTemplates = templates.filter(t => t.status === 'approved');
        const rejectedTemplates = templates.filter(t => t.status === 'rejected');

        return (
            <div className="space-y-6">
                <TemplateSection title="Pending Review" templates={pendingTemplates} />
                <TemplateSection title="Approved & Public" templates={approvedTemplates} />
                <TemplateSection title="Rejected" templates={rejectedTemplates} />
            </div>
        );
    };
    
    const TemplateSection: React.FC<{title: string, templates: QuizTemplate[]}> = ({title, templates}) => {
        if (templates.length === 0) {
            return (
                <Card>
                    <h3 className="text-xl font-bold mb-4">{title} (0)</h3>
                    <p className="text-gray-500">No templates in this category.</p>
                </Card>
            );
        }
        
        return (
            <Card>
                <h3 className="text-xl font-bold mb-4">{title} ({templates.length})</h3>
                <div className="space-y-4">
                    {templates.map(template => (
                        <div key={template.id} className="p-4 border rounded-lg bg-gray-50 space-y-2">
                            <p><strong>Title:</strong> {template.title}</p>
                            <p><strong>Creator:</strong> {template.creatorName}</p>
                            <p><strong>Description:</strong> {template.description}</p>
                            <p><strong>Questions:</strong> {template.questions.length}</p>
                            <div className="flex flex-wrap gap-2 mt-2">
                                {template.status !== 'approved' && (
                                    <Button onClick={() => handleTemplateStatusChange(template.id, 'approved')} variant="secondary" className="text-sm py-1 px-2 w-auto">Approve</Button>
                                )}
                                {template.status !== 'rejected' && (
                                    <Button onClick={() => handleTemplateStatusChange(template.id, 'rejected')} variant="secondary" className="text-sm py-1 px-2 w-auto bg-yellow-500 hover:bg-yellow-600 border-yellow-500 text-white">Reject</Button>
                                )}
                                <Button onClick={() => handleTemplateDelete(template.id)} variant="secondary" className="text-sm py-1 px-2 w-auto bg-red-500 hover:bg-red-600 border-red-500 text-white">Delete</Button>
                            </div>
                        </div>
                    ))}
                </div>
            </Card>
        );
    }
    
    const renderAdSenseConfig = () => {
        return (
            <Card>
                <h3 className="text-xl font-bold mb-4">Google AdSense Settings</h3>
                <div className="space-y-4">
                    <div>
                        <label className="flex items-center">
                            <input type="checkbox" checked={currentAdSenseConfig.enabled} onChange={e => setCurrentAdSenseConfig({...currentAdSenseConfig, enabled: e.target.checked})} className="mr-2 h-4 w-4 rounded border-gray-300 text-pink-600 focus:ring-pink-500" />
                            Enable AdSense
                        </label>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Client ID (e.g., ca-pub-xxxxxxxxxxxxxxxx)</label>
                        <input type="text" value={currentAdSenseConfig.clientId} onChange={e => setCurrentAdSenseConfig({...currentAdSenseConfig, clientId: e.target.value})} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-pink-500 focus:border-pink-500" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Ad Slot ID</label>
                        <input type="text" value={currentAdSenseConfig.adSlotId} onChange={e => setCurrentAdSenseConfig({...currentAdSenseConfig, adSlotId: e.target.value})} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-pink-500 focus:border-pink-500" />
                    </div>
                     <div>
                        <label className="block text-sm font-medium text-gray-700">Verification Code (for meta tag)</label>
                        <input type="text" value={currentAdSenseConfig.verificationCode} onChange={e => setCurrentAdSenseConfig({...currentAdSenseConfig, verificationCode: e.target.value})} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-pink-500 focus:border-pink-500" />
                    </div>
                    <Button onClick={handleAdSenseSave}>Save AdSense Settings</Button>
                </div>
            </Card>
        );
    };
    
    const renderInternalAdsConfig = () => {
        const adSlots = ['home', 'share', 'results'];
        return (
            <Card>
                <h3 className="text-xl font-bold mb-4">Internal Ads Settings</h3>
                <div className="space-y-6">
                    {adSlots.map(slot => (
                        <div key={slot} className="p-4 border rounded-lg">
                            <h4 className="font-semibold capitalize text-gray-800">{slot} Page Ad</h4>
                            <div className="space-y-2 mt-2">
                                <label className="flex items-center">
                                    <input type="checkbox" checked={currentInternalAdConfig[slot]?.enabled || false} onChange={e => setCurrentInternalAdConfig({...currentInternalAdConfig, [slot]: {...currentInternalAdConfig[slot], enabled: e.target.checked}})} className="mr-2 h-4 w-4 rounded border-gray-300 text-pink-600 focus:ring-pink-500" />
                                    Enable Ad on this page
                                </label>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Image URL</label>
                                    <input type="text" value={currentInternalAdConfig[slot]?.imageUrl || ''} onChange={e => setCurrentInternalAdConfig({...currentInternalAdConfig, [slot]: {...currentInternalAdConfig[slot], imageUrl: e.target.value}})} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-pink-500 focus:border-pink-500" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Redirect URL</label>
                                    <input type="text" value={currentInternalAdConfig[slot]?.redirectUrl || ''} onChange={e => setCurrentInternalAdConfig({...currentInternalAdConfig, [slot]: {...currentInternalAdConfig[slot], redirectUrl: e.target.value}})} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-pink-500 focus:border-pink-500" />
                                </div>
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
                    {pages.map(page => (
                        <div key={page}>
                            <label className="block text-sm font-medium capitalize font-bold text-gray-700">{page} Page (HTML allowed)</label>
                            <textarea
                                value={currentStaticPages[page] || ''}
                                onChange={e => setCurrentStaticPages({...currentStaticPages, [page]: e.target.value})}
                                rows={8}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-pink-500 focus:border-pink-500 font-mono text-sm"
                            />
                        </div>
                    ))}
                    <Button onClick={handleStaticPagesSave}>Save Static Pages</Button>
                 </div>
            </Card>
        );
    };

    const renderContent = () => {
        switch (activeTab) {
            case 'templates':
                return renderTemplates();
            case 'adsense':
                return renderAdSenseConfig();
            case 'internal_ads':
                return renderInternalAdsConfig();
            case 'static_pages':
                return renderStaticPages();
            default:
                return null;
        }
    };
    
    return (
        <div className="space-y-6">
            <Card>
                <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-bold">Admin Dashboard</h2>
                    <Button onClick={onLogout} variant="secondary" className="w-auto px-4 py-2 text-sm">Logout</Button>
                </div>
                <div className="flex space-x-1 sm:space-x-2 border-b mt-4 overflow-x-auto">
                    <TabButton name="templates" label="Quiz Templates" />
                    <TabButton name="adsense" label="AdSense" />
                    <TabButton name="internal_ads" label="Internal Ads" />
                    <TabButton name="static_pages" label="Static Pages" />
                </div>
            </Card>
            <div>
                {renderContent()}
            </div>
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

export default AdminDashboardView;
