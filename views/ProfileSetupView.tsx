import React, { useState } from 'react';
import { Profile } from '../types';
import Button from '../components/Button';
import Card from '../components/Card';
import BackButton from '../components/BackButton';

interface ProfileSetupViewProps {
  userType: 'Creator' | 'Partner';
  onSave: (profile: Profile) => void;
  onBack?: () => void;
}

const ProfileSetupView: React.FC<ProfileSetupViewProps> = ({ userType, onSave, onBack }) => {
  const [profile, setProfile] = useState<Profile>({
    name: '',
    gender: 'Female',
    age: 18,
    relationshipType: 'Friend',
    bio: '',
    favMarathiWord: '',
  });
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile.name || !profile.age || !profile.relationshipType) {
      setError('Please fill in all required fields.');
      return;
    }
    setError('');
    onSave(profile);
  };

  return (
    <Card className="relative pt-12">
      {onBack && <BackButton onClick={onBack} />}
      <h2 className="text-2xl font-bold text-center mb-6">Create Your Profile ({userType})</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name*</label>
          <input
            type="text"
            id="name"
            name="name"
            value={profile.name}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-pink-500 focus:border-pink-500"
            required
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="age" className="block text-sm font-medium text-gray-700">Age*</label>
            <input
              type="number"
              id="age"
              name="age"
              value={profile.age}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-pink-500 focus:border-pink-500"
              required
              min="16"
              max="100"
            />
          </div>
          <div>
            <label htmlFor="gender" className="block text-sm font-medium text-gray-700">Gender*</label>
            <select
              id="gender"
              name="gender"
              value={profile.gender}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-pink-500 focus:border-pink-500"
            >
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>
          </div>
        </div>
        <div>
          <label htmlFor="relationshipType" className="block text-sm font-medium text-gray-700">Relationship Type*</label>
          <select
            id="relationshipType"
            name="relationshipType"
            value={profile.relationshipType}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-pink-500 focus:border-pink-500"
          >
            <option>Wife</option>
            <option>Husband</option>
            <option>Girlfriend</option>
            <option>Boyfriend</option>
            <option>Crush</option>
            <option>Friend</option>
            <option>Fiance</option>
          </select>
        </div>
        <div>
          <label htmlFor="bio" className="block text-sm font-medium text-gray-700">About me in one line (Optional)</label>
          <textarea
            id="bio"
            name="bio"
            rows={2}
            value={profile.bio}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-pink-500 focus:border-pink-500"
          ></textarea>
        </div>
         <div>
          <label htmlFor="favMarathiWord" className="block text-sm font-medium text-gray-700">Favourite Marathi word for love (Optional)</label>
          <input
            type="text"
            id="favMarathiWord"
            name="favMarathiWord"
            value={profile.favMarathiWord}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-pink-500 focus:border-pink-500"
          />
        </div>
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        <div className="pt-4">
          <Button type="submit">Save & Continue</Button>
        </div>
      </form>
    </Card>
  );
};

export default ProfileSetupView;