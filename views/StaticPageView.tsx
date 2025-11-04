import React from 'react';
import Card from '../components/Card';
import Button from '../components/Button';

interface StaticPageViewProps {
  title: string;
  content: React.ReactNode;
  onBack: () => void;
}

const StaticPageView: React.FC<StaticPageViewProps> = ({ title, content, onBack }) => {
  return (
    <Card>
      <div className="relative p-4">
        <button onClick={onBack} className="text-sm text-pink-600 hover:underline mb-4 absolute top-0 left-0">
          &larr; Back
        </button>
        <h2 className="text-2xl font-bold text-center mb-6 pt-4">{title}</h2>
        <div className="prose prose-pink max-w-none text-gray-700">{content}</div>
        <div className="mt-8 text-center">
            <Button onClick={onBack} variant="secondary" className="max-w-xs">Go Back</Button>
        </div>
      </div>
    </Card>
  );
};

export default StaticPageView;
