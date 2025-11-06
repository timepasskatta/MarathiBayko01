import React from 'react';
// FIX: Added .tsx extension to fix module resolution issue.
import Card from '../components/Card.tsx';
// FIX: Added .tsx extension to fix module resolution issue.
import Button from '../components/Button.tsx';
// FIX: Added .tsx extension to fix module resolution issue.
import BackButton from '../components/BackButton.tsx';
// FIX: Added .ts extension to fix module resolution issue.
import { officialTemplates } from '../data/officialTemplates.ts';

interface ModeSelectionViewProps {
  onSelectTemplate: (templateId: string) => void;
  onBack: () => void;
}

const ModeSelectionView: React.FC<ModeSelectionViewProps> = ({ onSelectTemplate, onBack }) => {
  return (
    <Card className="relative pt-12">
      <BackButton onClick={onBack} />
      <h2 className="text-2xl font-bold text-center mb-2">Choose a Quiz Type</h2>
      <p className="text-center text-gray-500 mb-6">Select a template to get started.</p>
      <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
        {officialTemplates.map(template => (
          <div key={template.id} className="border border-rose-200 p-4 rounded-lg flex items-center gap-4">
            <img src={template.imageUrl} alt={template.title} className="w-16 h-16 rounded-md object-cover" />
            <div className="flex-1">
                <h3 className="font-semibold text-pink-600">{template.title}</h3>
                <p className="text-sm text-gray-500">{template.description}</p>
            </div>
            <Button onClick={() => onSelectTemplate(template.id)} className="w-auto px-4 py-2 text-sm !font-semibold">
                Select
            </Button>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default ModeSelectionView;
