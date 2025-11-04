import React, { useState } from 'react';
import Button from '../components/Button';
import Card from '../components/Card';
import BackButton from '../components/BackButton';

interface AdminLoginViewProps {
  onLoginSuccess: () => void;
  onBack: () => void;
}

const AdminLoginView: React.FC<AdminLoginViewProps> = ({ onLoginSuccess, onBack }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Use environment variables for credentials with a fallback for local dev
    const adminUser = process.env.ADMIN_USERNAME || 'admin';
    const adminPass = process.env.ADMIN_PASSWORD || 'Vaibhavvaibhav@3601';

    if (username === adminUser && password === adminPass) {
      onLoginSuccess();
    } else {
      setError('Invalid credentials.');
    }
  };

  return (
    <Card className="relative pt-12">
      <BackButton onClick={onBack} />
      <h2 className="text-2xl font-bold text-center mb-6">Admin Login</h2>
      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <label htmlFor="username-input" className="block text-sm font-medium text-gray-700">Username</label>
          <input
            type="text"
            id="username-input"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-pink-500 focus:border-pink-500"
          />
        </div>
        <div>
          <label htmlFor="password-input" className="block text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            id="password-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-pink-500 focus:border-pink-500"
          />
        </div>
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        <div className="pt-4 space-y-2">
            <Button type="submit">Login</Button>
        </div>
      </form>
    </Card>
  );
};

export default AdminLoginView;