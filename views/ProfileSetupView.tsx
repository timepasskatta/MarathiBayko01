import React, { useState } from 'react';
import { Profile, QuizTemplate } from '../types';
import Card from '../components/Card';
import Button from '../components/Button';
import BackButton from '../components/BackButton';

interface ProfileSetupViewProps {
  userType: 'Creator' | 'Partner';
  onSave: (profile: Profile) => void;
  onBack: () => void;
  activeTemplate: QuizTemplate | null;
}

const ProfileSetupView: React.FC<ProfileSetupViewProps> = ({ userType, onSave, onBack, activeTemplate }) => {
  const [profile, setProfile] = useState<Profile>({
    name: '',
    age: 25,
    gender: 'Female',
    relationshipType: 'Dating',
    goodThingAboutPartner: '',
    partnerImprovement: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: name === 'age' ? parseInt(value, 10) : value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (profile.name.trim() === '') {
        alert('Please enter your name.');
        return;
    }
    onSave(profile);
  };

  return (
    <Card className="relative pt-12">
      <BackButton onClick={onBack} />
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-pink-600">{activeTemplate?.title}</h2>
        <p className="text-gray-500 mt-2">
            {userType === 'Creator' 
                ? "First, let's create your profile." 
                : 'Great! Now, tell us about yourself and the creator.'}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Your Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={profile.name}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-pink-500 focus:border-pink-500"
            required
          />
        </div>
        <div>
            <label htmlFor="age" className="block text-sm font-medium text-gray-700">Your Age</label>
            <input type="number" id="age" name="age" value={profile.age} onChange={handleChange} className="mt-1 w-full p-2 border rounded-md" required/>
        </div>
        <div>
            <label htmlFor="gender" className="block text-sm font-medium text-gray-700">Your Gender</label>
            <select id="gender" name="gender" value={profile.gender} onChange={handleChange} className="mt-1 w-full p-2 border rounded-md" required>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
            </select>
        </div>
        <div>
            <label htmlFor="relationshipType" className="block text-sm font-medium text-gray-700">Relationship Type</label>
            <select id="relationshipType" name="relationshipType" value={profile.relationshipType} onChange={handleChange} className="mt-1 w-full p-2 border rounded-md" required>
                <option value="Dating">Dating</option>
                <option value="Married">Married</option>
                <option value="Friends">Friends</option>
                <option value="Siblings">Siblings</option>
                <option value="Crush">Crush</option>
                <option value="Other">Other</option>
            </select>
        </div>
        <div>
            <label htmlFor="goodThingAboutPartner" className="block text-sm font-medium text-gray-700">A wonderful quality I see in my partner:</label>
            <textarea id="goodThingAboutPartner" name="goodThingAboutPartner" rows={3} value={profile.goodThingAboutPartner} onChange={handleChange} className="mt-1 w-full p-2 border rounded-md" required />
        </div>
        <div>
            <label htmlFor="partnerImprovement" className="block text-sm font-medium text-gray-700">A small suggestion for our growth together:</label>
            <textarea id="partnerImprovement" name="partnerImprovement" rows={3} value={profile.partnerImprovement} onChange={handleChange} className="mt-1 w-full p-2 border rounded-md" required />
        </div>
        
        <Button type="submit">
          Save and Start Quiz
        </Button>
      </form>
    </Card>
  );
};

export default ProfileSetupView;