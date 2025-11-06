
import React, { useMemo } from 'react';
// FIX: Added .ts extension to fix module resolution issue.
import { ResultData, InternalAd } from '../types.ts';
// FIX: Added .tsx extension to fix module resolution issue.
import Button from '../components/Button.tsx';
// FIX: Added .tsx extension to fix module resolution issue.
import Card from '../components/Card.tsx';
// FIX: Added .tsx extension to fix module resolution issue.
import CircularProgressBar from '../components/CircularProgressBar.tsx';
// FIX: Added .tsx extension to fix module resolution issue.
import Confetti from '../components/Confetti.tsx';
// FIX: Added .tsx extension to fix module resolution issue.
import InternalAdBanner from '../components/InternalAdBanner.tsx';

interface ResultsViewProps {
  resultData: ResultData;
  onBackToHome: () => void;
  internalAdConfig: Record<string, InternalAd>;
}

const ResultsView: React.FC<ResultsViewProps> = ({ resultData, onBackToHome, internalAdConfig }) => {
  const { creatorProfile, partnerProfile, creatorAnswers, partnerAnswers, questionsUsed, analysisConfig, isSecondAttempt } = resultData;
  
  const score = useMemo(() => {
    const totalQuestions = questionsUsed.length;
    if (totalQuestions === 0) return 0;

    let matchedAnswers = 0;
    questionsUsed.forEach(q => {
      if (creatorAnswers[q.id] && partnerAnswers[q.id] && creatorAnswers[q.id] === partnerAnswers[q.id]) {
        matchedAnswers++;
      }
    });
    return (matchedAnswers / totalQuestions) * 100;
  }, [creatorAnswers, partnerAnswers, questionsUsed]);

  const analysisText = useMemo(() => {
    if (score <= 25) return analysisConfig.range0_25;
    if (score <= 50) return analysisConfig.range26_50;
    if (score <= 75) return analysisConfig.range51_75;
    return analysisConfig.range76_100;
  }, [score, analysisConfig]);

  return (
    <div className="space-y-6">
      {score > 75 && !isSecondAttempt && <Confetti />}
      <Card className="text-center">
        <h2 className="text-3xl font-bold text-pink-600 mb-2">Your Compatibility Score</h2>
        <p className="text-gray-500 mb-6">{creatorProfile.name} &amp; {partnerProfile.name}</p>
        
        <div className="my-8">
            <CircularProgressBar progress={score} />
        </div>
        
        <p className="text-lg text-gray-700 italic px-4">{analysisText}</p>
        {isSecondAttempt && (
            <p className="mt-4 text-sm text-amber-600 bg-amber-100 p-2 rounded-md">Note: This result link has been viewed before.</p>
        )}
      </Card>
      
      <InternalAdBanner ad={internalAdConfig['results']} />

      <Card>
        <h3 className="text-xl font-bold text-center mb-6">Sweet Words</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-center">
            <div className="bg-rose-50 p-4 rounded-lg">
                <p className="font-semibold text-pink-600">{creatorProfile.name} said about {partnerProfile.name}:</p>
                <p className="mt-2 italic">"{creatorProfile.goodThingAboutPartner}"</p>
            </div>
             <div className="bg-rose-50 p-4 rounded-lg">
                <p className="font-semibold text-pink-600">{partnerProfile.name} said about {creatorProfile.name}:</p>
                <p className="mt-2 italic">"{partnerProfile.goodThingAboutPartner}"</p>
            </div>
        </div>
      </Card>

      <Card>
        <h3 className="text-xl font-bold text-center mb-6">Answer Breakdown</h3>
        <ul className="space-y-4">
          {questionsUsed.map((q, index) => {
            const creatorAns = creatorAnswers[q.id];
            const partnerAns = partnerAnswers[q.id];
            const isMatch = creatorAns === partnerAns;

            return (
              <li key={q.id} className="p-4 bg-rose-50 rounded-lg">
                <p className="font-semibold text-gray-800 mb-3">{index + 1}. {q.text}</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 text-sm">
                  <div className="flex items-center">
                     <span className="font-bold w-24">{creatorProfile.name}:</span>
                     <span>{creatorAns || 'No answer'}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="font-bold w-24">{partnerProfile.name}:</span>
                    <span className={`flex items-center ${isMatch ? 'text-green-600' : 'text-red-500'}`}>
                        {partnerAns || 'No answer'}
                        {isMatch ? 
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg> :
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
                        }
                    </span>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </Card>
      
      <div className="text-center">
        <Button onClick={onBackToHome} variant="secondary">Create a New Quiz</Button>
      </div>
    </div>
  );
};

export default ResultsView;
