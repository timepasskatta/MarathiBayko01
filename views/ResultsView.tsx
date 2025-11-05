import React, { useMemo } from 'react';
import { ResultData, InternalAd } from '../types';
import Button from '../components/Button';
import Card from '../components/Card';
import CircularProgressBar from '../components/CircularProgressBar';
import Confetti from '../components/Confetti';
import InternalAdBanner from '../components/InternalAdBanner';

interface ResultsViewProps {
  resultData: ResultData;
  onBackToHome: () => void;
  internalAdConfig: Record<string, InternalAd>;
}

const ResultsView: React.FC<ResultsViewProps> = ({ resultData, onBackToHome, internalAdConfig }) => {
  const {
    creatorProfile,
    partnerProfile,
    creatorAnswers,
    partnerAnswers,
    questionsUsed,
    analysisConfig,
    isSecondAttempt,
  } = resultData;

  const { score, matches, total, analysisText } = useMemo(() => {
    const activeQuestions = questionsUsed.filter(q => q.active);
    let matchCount = 0;
    
    activeQuestions.forEach(q => {
      if (creatorAnswers[q.id] && creatorAnswers[q.id] === partnerAnswers[q.id]) {
        matchCount++;
      }
    });

    const totalQuestions = activeQuestions.length;
    const compatibilityScore = totalQuestions > 0 ? Math.round((matchCount / totalQuestions) * 100) : 0;
    
    let text = "Here's how you matched!";
    if (analysisConfig) {
        if (compatibilityScore <= 25) text = analysisConfig.range0_25;
        else if (compatibilityScore <= 50) text = analysisConfig.range26_50;
        else if (compatibilityScore <= 75) text = analysisConfig.range51_75;
        else text = analysisConfig.range76_100;
    }

    return {
      score: compatibilityScore,
      matches: matchCount,
      total: totalQuestions,
      analysisText: text || "It's great to see your results!",
    };
  }, [resultData]);

  const showConfetti = score > 75;

  return (
    <div className="space-y-6">
      {showConfetti && <Confetti />}
      <Card className="text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-2">Compatibility Result</h2>
        <p className="text-lg text-gray-600 mb-6">{creatorProfile.name} & {partnerProfile.name}</p>
        
        {isSecondAttempt && (
            <div className="p-3 mb-4 bg-yellow-100 border border-yellow-300 text-yellow-800 rounded-lg text-sm">
                <strong>Warning:</strong> This result has been viewed before. This might be a second attempt after seeing the answers.
            </div>
        )}

        <CircularProgressBar progress={score} />
        
        <p className="text-lg font-semibold mt-4">You matched on {matches} out of {total} questions.</p>
        <p className="text-gray-600 mt-4 max-w-lg mx-auto italic">"{analysisText}"</p>
      </Card>
      
      <InternalAdBanner ad={internalAdConfig['results']} />

      <Card>
        <h3 className="text-xl font-bold text-center mb-6">Your Thoughts About Each Other</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="p-4 rounded-lg bg-rose-50 border border-rose-200">
            <p className="font-bold text-pink-600 mb-2">{creatorProfile.name}'s thoughts on {partnerProfile.name}:</p>
            <p className="text-gray-700 mb-2"><strong>A wonderful quality:</strong> {creatorProfile.goodThingAboutPartner}</p>
            <p className="text-gray-700"><strong>A suggestion for growth:</strong> {creatorProfile.partnerImprovement}</p>
          </div>
           <div className="p-4 rounded-lg bg-rose-50 border border-rose-200">
            <p className="font-bold text-pink-600 mb-2">{partnerProfile.name}'s thoughts on {creatorProfile.name}:</p>
            <p className="text-gray-700 mb-2"><strong>A wonderful quality:</strong> {partnerProfile.goodThingAboutPartner}</p>
            <p className="text-gray-700"><strong>A suggestion for growth:</strong> {partnerProfile.partnerImprovement}</p>
          </div>
        </div>
      </Card>

      <Card>
        <h3 className="text-xl font-bold text-center mb-6">Answer Breakdown</h3>
        <div className="space-y-4">
          {questionsUsed.filter(q => q.active).map((question, index) => {
            const creatorAnswer = creatorAnswers[question.id];
            const partnerAnswer = partnerAnswers[question.id];
            const isMatch = creatorAnswer === partnerAnswer;

            return (
              <div key={question.id} className="p-4 border rounded-lg bg-gray-50">
                <p className="font-semibold text-gray-800 mb-3">Q{index + 1}: {question.text}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2 text-sm">
                  <div className={`p-2 rounded-md ${isMatch ? 'bg-green-100' : 'bg-red-100'}`}>
                    <p className="font-bold text-gray-700">{creatorProfile.name}'s Answer:</p>
                    <p className="text-gray-600">{creatorAnswer || 'No answer'}</p>
                  </div>
                  <div className={`p-2 rounded-md ${isMatch ? 'bg-green-100' : 'bg-red-100'}`}>
                    <p className="font-bold text-gray-700">{partnerProfile.name}'s Guess:</p>
                    <p className="text-gray-600">{partnerAnswer || 'No answer'}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      <div className="text-center">
          <Button onClick={onBackToHome} variant="secondary">Create a New Quiz</Button>
      </div>
    </div>
  );
};

export default ResultsView;
