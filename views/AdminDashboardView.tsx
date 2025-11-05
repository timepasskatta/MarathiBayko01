
import React from 'react';
import { QuizTemplate, AdSenseConfig, InternalAd } from '../types';
import Card from '../components/Card';
import Button from '../components/Button';

interface AdminDashboardViewProps {
  templates: QuizTemplate[];
  setTemplates: React.Dispatch<React.SetStateAction<QuizTemplate[]>>;
  adSenseConfig: AdSenseConfig;
  setAdSenseConfig: React.Dispatch<React.SetStateAction<AdSenseConfig>>;
  internalAd: InternalAd;
  setInternalAd: React.Dispatch<React.SetStateAction<InternalAd>>;
  onLogout: () => void;
}

const AdminDashboardView: React.FC<AdminDashboardViewProps> = ({ templates, setTemplates, adSenseConfig, setAdSenseConfig, internalAd, setInternalAd, onLogout }) => {
  
  const handleTemplateStatusChange = (id: string, status: 'approved' | 'rejected') => {
    setTemplates(prev => prev.map(t => (t.id === id ? { ...t, status, isPublic: status === 'approved' } : t)));
  };

  const handleTemplateDelete = (id: string) => {
    if (window.confirm("Are you sure you want to permanently delete this template?")) {
        setTemplates(prev => prev.filter(t => t.id !== id));
    }
  };

  const handleAdSenseChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setAdSenseConfig(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value,
    }));
  };
  
  const handleInternalAdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setInternalAd(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const pendingTemplates = templates.filter(t => t.status === 'pending');
  const approvedTemplates = templates.filter(t => t.status === 'approved');
  const rejectedTemplates = templates.filter(t => t.status === 'rejected');

  return (
    <div className="space-y-6">
        <Card>
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Admin Dashboard</h2>
                <Button onClick={onLogout} variant="secondary" className="w-auto">Logout</Button>
            </div>
        </Card>

        <Card>
            <h3 className="text-xl font-bold mb-4">Ad Management</h3>
            <div className="space-y-4">
                {/* AdSense Config */}
                <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold text-lg mb-2">Google AdSense</h4>
                    <label className="flex items-center gap-2">
                        <input type="checkbox" name="enabled" checked={adSenseConfig.enabled} onChange={handleAdSenseChange} />
                        Enable AdSense
                    </label>
                    <div className="space-y-2 mt-2">
                        <input type="text" name="clientId" placeholder="AdSense Client ID (ca-pub-...)" value={adSenseConfig.clientId} onChange={handleAdSenseChange} className="w-full p-2 border rounded" disabled={!adSenseConfig.enabled} />
                        <input type="text" name="adSlotId" placeholder="AdSense Slot ID" value={adSenseConfig.adSlotId} onChange={handleAdSenseChange} className="w-full p-2 border rounded" disabled={!adSenseConfig.enabled}/>
                    </div>
                </div>
                {/* Internal Ad Config */}
                 <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold text-lg mb-2">Internal Ad</h4>
                    <label className="flex items-center gap-2">
                        <input type="checkbox" name="enabled" checked={internalAd.enabled} onChange={handleInternalAdChange} />
                        Enable Internal Ad
                    </label>
                    <div className="space-y-2 mt-2">
                        <input type="text" name="imageUrl" placeholder="Image URL" value={internalAd.imageUrl} onChange={handleInternalAdChange} className="w-full p-2 border rounded" disabled={!internalAd.enabled} />
                        <input type="text" name="redirectUrl" placeholder="Redirect URL" value={internalAd.redirectUrl} onChange={handleInternalAdChange} className="w-full p-2 border rounded" disabled={!internalAd.enabled}/>
                    </div>
                </div>
            </div>
        </Card>

        <Card>
            <h3 className="text-xl font-bold mb-4">Pending Submissions ({pendingTemplates.length})</h3>
            <div className="space-y-2">
                {pendingTemplates.length > 0 ? pendingTemplates.map(t => (
                    <div key={t.id} className="p-3 border rounded-md flex justify-between items-center bg-yellow-50">
                        <div>
                            <p className="font-bold">{t.title}</p>
                            <p className="text-sm text-gray-600">{t.description} (by {t.creatorName})</p>
                        </div>
                        <div className="flex gap-2">
                            <Button className="w-auto text-sm py-1 px-3" onClick={() => handleTemplateStatusChange(t.id, 'approved')}>Approve</Button>
                            <Button className="w-auto text-sm py-1 px-3" variant="secondary" onClick={() => handleTemplateStatusChange(t.id, 'rejected')}>Reject</Button>
                        </div>
                    </div>
                )) : <p>No pending submissions.</p>}
            </div>
        </Card>

        {/* You could add sections for approved/rejected templates here if needed */}

    </div>
  );
};

export default AdminDashboardView;
