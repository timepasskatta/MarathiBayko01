import React, { useState } from 'react';
import { Profile, QuizTemplate } from '../types';
import Button from '../components/Button';
import Card from '../components/Card';
import BackButton from '../components/BackButton';

interface ProfileSetupViewProps {
  userType: 'Creator' | 'Partner';
  onSave: (profile: Profile) => void;
  onBack: () => void;
  activeTemplate: QuizTemplate | null;
}

const ProfileSetupView: React.FC<ProfileSetupViewProps> = ({ userType, onSave, onBack, activeTemplate }) => {
  const [profile, setProfile] = useState<Omit<Profile, 'relationshipType'>>({
      name: '',
      age: 18,
      gender: '',
      goodThingAboutPartner: '',
      partnerImprovement: '',
  });
  const [relationshipType, setRelationshipType] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (profile.name.trim() === '' || !relationshipType || !profile.gender || profile.age < 1) {
      setError('Please fill out all the fields correctly.');
      return;
    }
     if (profile.goodThingAboutPartner.trim() === '' || profile.partnerImprovement.trim() === '') {
      setError('Please share your thoughts about your partner.');
      return;
    }
    onSave({ ...profile, relationshipType });
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const { name, value } = e.target;
      setProfile(prev => ({ ...prev, [name]: name === 'age' ? parseInt(value) || 0 : value }));
      setError('');
  }

  return (
    <Card className="text-center relative pt-24">
      <BackButton onClick={onBack} />
      {activeTemplate && (
        <div className="absolute top-6 left-1/2 -translate-x-1/2 w-full px-8">
            <p className="text-sm text-gray-500">PLAYING QUIZ</p>
            <p className="font-bold text-pink-600 truncate">{activeTemplate.title}</p>
        </div>
      )}
      <h2 className="text-2xl font-bold mb-2">About You & Your Partner</h2>
      <p className="text-gray-500 mb-6">{userType === 'Creator' ? "First, tell us a bit about yourself and your partner." : "Great! Now, tell us about yourself and the creator."}</p>
      
      <form onSubmit={handleSubmit} className="space-y-4 text-left">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Your Name</label>
                <input type="text" id="name" name="name" value={profile.name} onChange={handleInputChange} className="mt-1 w-full p-2 border rounded-md" required/>
            </div>
            <div>
                <label htmlFor="age" className="block text-sm font-medium text-gray-700">Your Age</label>
                <input type="number" id="age" name="age" value={profile.age || ''} onChange={handleInputChange} className="mt-1 w-full p-2 border rounded-md" min="1" required/>
            </div>
             <div>
                <label htmlFor="gender" className="block text-sm font-medium text-gray-700">Your Gender</label>
                <select id="gender" name="gender" value={profile.gender} onChange={handleInputChange} className="mt-1 w-full p-2 border rounded-md" required>
                    <option value="" disabled>Select...</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                </select>
            </div>
             <div>
                <label htmlFor="relationshipType" className="block text-sm font-medium text-gray-700">Relationship Type</label>
                <select id="relationshipType" name="relationshipType" value={relationshipType} onChange={(e) => setRelationshipType(e.target.value)} className="mt-1 w-full p-2 border rounded-md" required>
                    <option value="" disabled>Select...</option>
                    <option value="Girlfriend/Boyfriend">Girlfriend/Boyfriend</option>
                    <option value="Husband/Wife">Husband/Wife</option>
                    <option value="Friends">Friends</option>
                    <option value="Siblings">Siblings</option>
                    <option value="Crush">Crush</option>
                    <option value="Colleagues">Colleagues</option>
                    <option value="Other">Other</option>
                </select>
            </div>
        </div>
        
        <div>
            <label htmlFor="goodThingAboutPartner" className="block text-sm font-medium text-gray-700">A wonderful quality I see in my partner:</label>
            <textarea id="goodThingAboutPartner" name="goodThingAboutPartner" rows={3} value={profile.goodThingAboutPartner} onChange={handleInputChange} className="mt-1 w-full p-2 border rounded-md" required />
        </div>
        <div>
            <label htmlFor="partnerImprovement" className="block text-sm font-medium text-gray-700">A small suggestion for our growth together:</label>
            <textarea id="partnerImprovement" name="partnerImprovement" rows={3} value={profile.partnerImprovement} onChange={handleInputChange} className="mt-1 w-full p-2 border rounded-md" required />
        </div>
        
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        <div className="pt-2">
            <Button type="submit">Save and Continue</Button>
        </div>
      </form>
    </Card>
  );
};

export default ProfileSetupView;
