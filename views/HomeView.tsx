import React, { useState } from 'react';
import { QuizTemplate, SiteImagesConfig } from '../types.ts';
import { officialTemplates } from '../data/officialTemplates.ts';
import Button from '../components/Button.tsx';
import Card from '../components/Card.tsx';

interface HomeViewProps {
  onStartCreator: (template?: QuizTemplate) => void;
  siteImages: SiteImagesConfig;
}

const TemplateCard: React.FC<{ template: QuizTemplate, isAction?: boolean, onStart: (t?: QuizTemplate) => void }> = ({ template, isAction = false, onStart }) => (
  <Card className="group hover:shadow-xl transition-shadow flex flex-col p-0 overflow-hidden">
    {template.imageUrl && (
      <div className="overflow-hidden">
        <img 
          src={template.imageUrl}
          alt={`${template.title} thumbnail`}
          className="w-full aspect-[16/9] object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
    )}
    <div className="p-4 flex flex-col flex-grow">
      <h4 className={`font-bold text-lg ${template.isOfficial ? 'text-pink-700' : 'text-gray-800'}`}>{template.title}</h4>
      { !isAction && <p className="text-sm text-gray-500 mb-2">by {template.creatorName}</p> }
      <p className="text-gray-600 flex-grow">{template.description}</p>
      <Button 
          onClick={() => onStart(isAction ? undefined : template)} 
          className="w-full mt-4" 
          variant={isAction ? 'primary' : 'secondary'}
      >
        {isAction ? "Start Creating" : "Start Quiz"}
      </Button>
    </div>
  </Card>
);

const HomeView: React.FC<HomeViewProps> = ({ onStartCreator, siteImages }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState<'all' | 'english' | 'marathi' | 'hindi'>('all');

  const quickSearchTerms = ['husband wife', 'crush', 'gf bf', 'friends', 'brother sister'];

  const filteredTemplates = officialTemplates.filter(template => {
      const language = template.language || 'english';
      const matchesLanguage = selectedLanguage === 'all' || language === selectedLanguage;

      if (searchTerm.trim() === '') {
        return matchesLanguage;
      }
      
      const searchKeywords = searchTerm.toLowerCase().split(' ').filter(k => k.length > 0);
      
      const searchableText = [
          template.title,
          template.description,
          ...(template.keywords || [])
      ].join(' ').toLowerCase();
      
      const matchesSearch = searchKeywords.every(keyword => searchableText.includes(keyword));
      
      return matchesLanguage && matchesSearch;
  });

  // Safety fallback for image URL in case LocalStorage data is incomplete
  const createQuizImage = siteImages?.createQuiz || 'https://i.postimg.cc/Mps3pbNt/100071928-1.jpg';

  return (
    <div className="space-y-8">
        <Card className="text-center">
            <h2 className="text-3xl font-bold text-gray-800">Choose a Quiz</h2>
            <p className="text-gray-500 mt-2">Select a pre-made quiz to explore your relationship, or create your own for a personal touch.</p>

            <div className="mt-6 space-y-4">
                <div className="relative">
                    <input 
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search for any quiz..."
                        className="w-full p-3 pl-10 border-2 border-rose-200 rounded-lg focus:ring-pink-500 focus:border-pink-500 transition-colors"
                    />
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                    </svg>
                </div>

                <div className="flex flex-wrap justify-center gap-2">
                    {quickSearchTerms.map(term => (
                        <button 
                            key={term}
                            onClick={() => setSearchTerm(term)}
                            className="px-3 py-1 text-sm capitalize bg-rose-100 text-rose-700 rounded-full hover:bg-rose-200 transition-colors"
                        >
                            {term}
                        </button>
                    ))}
                </div>
                
                <div className="flex justify-center bg-rose-100 p-1 rounded-lg space-x-1">
                    {(['all', 'english', 'marathi', 'hindi'] as const).map(lang => (
                        <button
                            key={lang}
                            onClick={() => setSelectedLanguage(lang)}
                            className={`w-full px-3 py-2 text-sm font-semibold rounded-md transition-all duration-200 ${selectedLanguage === lang ? 'bg-white text-pink-600 shadow' : 'text-gray-500 hover:bg-rose-200/50'}`}
                        >
                            {lang.charAt(0).toUpperCase() + lang.slice(1)}
                        </button>
                    ))}
                </div>
            </div>
        </Card>
        
        <div className="grid md:grid-cols-2 gap-6">
            <TemplateCard 
                template={{
                    id: 'custom-creator',
                    title: 'Create Your Own Quiz',
                    description: 'Design a personalized quiz with your own questions for a truly unique compatibility test.',
                    imageUrl: createQuizImage,
                    isOfficial: true,
                    questions: [],
                    creatorName: '',
                    isPublic: false,
                    createdAt: '',
                    status: 'approved',
                    language: 'english',
                    analysisConfig: officialTemplates[0].analysisConfig,
                }} 
                isAction={true} 
                onStart={onStartCreator}
            />
            
            {filteredTemplates.length > 0 ? (
                filteredTemplates.map(template => (
                    <TemplateCard 
                        key={template.id} 
                        template={template} 
                        onStart={onStartCreator} 
                    />
                ))
            ) : (
                 <Card className="text-center md:col-start-1 md:col-span-2">
                    <p className="text-lg font-semibold text-gray-700">No Quizzes Found</p>
                    <p className="text-gray-500 mt-1">Try adjusting your search or language filter.</p>
                </Card>
            )}
        </div>
    </div>
  );
};

export default HomeView;