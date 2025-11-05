
import React, { useState } from 'react';
import { Profile } from '../types';
import Button from '../components/Button';
import Card from '../components/Card';
import BackButton from '../components/BackButton';

interface ProfileSetupViewProps {
  userType: 'Creator' | 'Partner';
  onSave: (profile: Profile) => void;
  onBack: () => void;
}

const ProfileSetupView: React.FC<ProfileSetupViewProps> = ({ userType, onSave, onBack }) => {
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() === '') {
      setError('Please enter your name.');
      return;
    }
    onSave({ name });
  };

  return (
    <Card className="text-center relative pt-12">
      <BackButton onClick={onBack} />
      <h2 className="text-2xl font-bold mb-2">Welcome, {userType}!</h2>
      <p className="text-gray-500 mb-6">Let's get started by creating your profile.</p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name-input" className="block text-sm font-medium text-gray-700 text-left">
            Your Name
          </label>
          <input
            type="text"
            id="name-input"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setError('');
            }}
            placeholder={userType === 'Creator' ? 'e.g., Vaibhav' : 'e.g., Aishwarya'}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-pink-500 focus:border-pink-500"
          />
        </div>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <div className="pt-2">
            <Button type="submit">Save and Continue</Button>
        </div>
      </form>
    </Card>
  );
};

export default ProfileSetupView;
