import React from 'react';
import Card from '../components/Card';
import Button from '../components/Button';
import BackButton from '../components/BackButton';

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