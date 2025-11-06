
import React, { useState } from 'react';
// FIX: Added .ts extension to fix module resolution issue.
import { AdSenseConfig, InternalAd, QuizTemplate, SiteImagesConfig } from '../types.ts';
// FIX: Added .tsx extension to fix module resolution issue.
import Button from '../components/Button.tsx';
// FIX: Added .tsx extension to fix module resolution issue.
import Card from '../components/Card.tsx';

type Tab = 'adsense' | 'internal_ads' | 'images' | 'pages' | 'templates';

interface AdminDashboardViewProps {
  templates: QuizTemplate[];
  adSenseConfig: AdSenseConfig;
  setAdSenseConfig: React.Dispatch<React.SetStateAction<AdSenseConfig>>;
  internalAdConfig: Record<string, InternalAd>;
  setInternalAdConfig: React.Dispatch<React.SetStateAction<Record<string, InternalAd>>>;
  siteImages: SiteImagesConfig;
  setSiteImages: React.Dispatch<React.SetStateAction<SiteImagesConfig>>;
  staticPages: Record<string, string>;
  setStaticPages: React.Dispatch<React.SetStateAction<Record<string, string>>>;
  onLogout: () => void;
}

const AdminDashboardView: React.FC<AdminDashboardViewProps> = ({
  templates,
  adSenseConfig, setAdSenseConfig,
  internalAdConfig, setInternalAdConfig,
  siteImages, setSiteImages,
  staticPages, setStaticPages,
  onLogout
}) => {
  const [activeTab, setActiveTab] = useState<Tab>('adsense');
  const [localAdSense, setLocalAdSense] = useState(adSenseConfig);
  const [localInternalAds, setLocalInternalAds] = useState(internalAdConfig);
  const [localSiteImages, setLocalSiteImages] = useState(siteImages);
  const [localStaticPages, setLocalStaticPages] = useState(staticPages);

  const handleSave = () => {
    setAdSenseConfig(localAdSense);
    setInternalAdConfig(localInternalAds);
    setSiteImages(localSiteImages);
    setStaticPages(localStaticPages);
    alert('Settings saved successfully!');
  };
  
  const handleInternalAdChange = (page: string, field: keyof InternalAd, value: string | boolean) => {
      setLocalInternalAds(prev => ({
          ...prev,
          [page]: {
              ...prev[page],
              [field]: value
          }
      }))
  }
  
  const renderTabContent = () => {
    switch (activeTab) {
      case 'adsense':
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">AdSense Configuration</h3>
            <div>
              <label className="flex items-center">
                <input type="checkbox" checked={localAdSense.enabled} onChange={e => setLocalAdSense({...localAdSense, enabled: e.target.checked})} className="mr-2"/>
                Enable AdSense
              </label>
            </div>
            <div>
              <label className="block text-sm font-medium">Client ID (ca-pub-xxx)</label>
              <input type="text" value={localAdSense.clientId} onChange={e => setLocalAdSense({...localAdSense, clientId: e.target.value})} className="w-full p-2 border rounded-md"/>
            </div>
            <div>
              <label className="block text-sm font-medium">Ad Slot ID</label>
              <input type="text" value={localAdSense.adSlotId} onChange={e => setLocalAdSense({...localAdSense, adSlotId: e.target.value})} className="w-full p-2 border rounded-md"/>
            </div>
             <div>
              <label className="block text-sm font-medium">Verification Code (for ads.txt)</label>
              <textarea value={localAdSense.verificationCode} onChange={e => setLocalAdSense({...localAdSense, verificationCode: e.target.value})} className="w-full p-2 border rounded-md" rows={3}/>
            </div>
          </div>
        );
      case 'internal_ads':
        return (
            <div>
                <h3 className="text-xl font-semibold mb-4">Internal Ads Configuration</h3>
                <div className="space-y-6">
                    {Object.keys(localInternalAds).map(page => (
                        <div key={page} className="p-4 border rounded-lg bg-rose-50">
                             <h4 className="font-bold capitalize text-lg mb-2">{page} Page Ad</h4>
                             <div className="space-y-2">
                                <label className="flex items-center">
                                    <input type="checkbox" checked={localInternalAds[page].enabled} onChange={e => handleInternalAdChange(page, 'enabled', e.target.checked)} className="mr-2"/>
                                    Enable Ad on this page
                                </label>
                                <div>
                                    <label className="block text-sm font-medium">Image URL</label>
                                    <input type="text" value={localInternalAds[page].imageUrl} onChange={e => handleInternalAdChange(page, 'imageUrl', e.target.value)} className="w-full p-2 border rounded-md"/>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium">Redirect URL</label>
                                    <input type="text" value={localInternalAds[page].redirectUrl} onChange={e => handleInternalAdChange(page, 'redirectUrl', e.target.value)} className="w-full p-2 border rounded-md"/>
                                </div>
                             </div>
                        </div>
                    ))}
                </div>
            </div>
        );
      case 'images':
         return (
            <div>
                <h3 className="text-xl font-semibold mb-4">Site Images</h3>
                 <div>
                    <label className="block text-sm font-medium">"Create Your Own Quiz" Card Image URL</label>
                    <input type="text" value={localSiteImages.createQuiz} onChange={e => setLocalSiteImages({...localSiteImages, createQuiz: e.target.value})} className="w-full p-2 border rounded-md"/>
                </div>
            </div>
         );
      case 'pages':
         return (
            <div>
                <h3 className="text-xl font-semibold mb-4">Static Page Content (HTML allowed)</h3>
                <div className="space-y-4">
                     {Object.keys(localStaticPages).map(page => (
                        <div key={page}>
                            <label className="block text-sm font-medium capitalize">{page} Page Content</label>
                            <textarea value={localStaticPages[page]} onChange={e => setLocalStaticPages(prev => ({...prev, [page]: e.target.value}))} className="w-full p-2 border rounded-md" rows={6}/>
                        </div>
                     ))}
                </div>
            </div>
         );
      case 'templates':
        return (
            <div>
                <h3 className="text-xl font-semibold mb-4">Official Quiz Templates</h3>
                <p className="text-sm text-gray-500 mb-4">These are the built-in templates. To edit them, you need to modify the code in `data/officialTemplates.ts`.</p>
                <ul className="space-y-2">
                    {templates.map(t => (
                        <li key={t.id} className="p-2 border rounded-md bg-gray-50">
                            <p className="font-bold">{t.title}</p>
                            <p className="text-xs text-gray-600">{t.questions.length} questions</p>
                        </li>
                    ))}
                </ul>
            </div>
        );
      default:
        return null;
    }
  };

  const TabButton = ({ tab, label }: { tab: Tab; label: string }) => (
    <button
      onClick={() => setActiveTab(tab)}
      className={`px-4 py-2 rounded-md text-sm font-medium ${activeTab === tab ? 'bg-pink-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
    >
      {label}
    </button>
  );

  return (
    <Card>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Admin Dashboard</h2>
        <Button onClick={onLogout} variant="secondary" className="w-auto">Logout</Button>
      </div>
      
      <div className="flex space-x-2 border-b mb-6 pb-2 overflow-x-auto">
        <TabButton tab="adsense" label="AdSense" />
        <TabButton tab="internal_ads" label="Internal Ads" />
        <TabButton tab="images" label="Images" />
        <TabButton tab="pages" label="Pages" />
        <TabButton tab="templates" label="Templates" />
      </div>

      <div className="min-h-[40vh]">
        {renderTabContent()}
      </div>

      <div className="mt-8 border-t pt-4">
        <Button onClick={handleSave}>Save All Changes</Button>
      </div>
    </Card>
  );
};

export default AdminDashboardView;
