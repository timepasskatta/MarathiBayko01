import React from 'react';
import Card from '../components/Card.tsx';
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
            <h1 className="text-3xl font-bold mb-6 text-center">{title}</h1>
            <div className="prose max-w-none text-left">
                {content}
            </div>
        </Card>
    );
};

export default StaticPageView;