
import React from 'react';
// FIX: Added .tsx extension to fix module resolution issue.
import Card from '../components/Card.tsx';
// FIX: Added .tsx extension to fix module resolution issue.
import Button from '../components/Button.tsx';
// FIX: Added .tsx extension to fix module resolution issue.
import BackButton from '../components/BackButton.tsx';

interface StaticPageViewProps {
  title: string;
  content: React.ReactNode;
  onBack: () => void;
}

const StaticPageView: React.FC<StaticPageViewProps> = ({ title, content, onBack }) => {
  return (
    <Card className="relative pt-12">
      <BackButton onClick={onBack} />
      <h2 className="text-2xl font-bold text-center mb-6">{title}</h2>
      <div className="prose prose-pink max-w-none text-gray-700 px-4">{content}</div>
    </Card>
  );
};

export default StaticPageView;