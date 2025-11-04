
import React, { useEffect, useState } from 'react';
import { Profile, Answers, Question } from '../types';
import Card from '../components/Card';
import Button from '../components/Button';
import CircularProgressBar from '../components/CircularProgressBar';
import Confetti from '../components/Confetti';
// Fix: Import GoogleGenAI according to guidelines
import { GoogleGenAI } from '@google/genai';

interface ResultsViewProps {
  creatorProfile: Profile;
  partnerProfile: Profile;
  creatorAnswers: Answers;
  partnerAnswers: Answers;
  questionsUsed: Question[];
  onRestart: () => void;
}

interface ComparisonResult {
  question: Question;
  creatorAnswer: string;
  partnerAnswer: string;
  isMatch: boolean;
}

const ResultsView: React.FC<ResultsViewProps> = ({
  creatorProfile,
  partnerProfile,
  creatorAnswers,
  partnerAnswers,
  questionsUsed,
  onRestart,
}) => {
  const [score, setScore] = useState(0);
  const [comparison, setComparison] = useState<ComparisonResult[]>([]);
  const [analysis, setAnalysis] = useState('');
  const [isLoadingAnalysis, setIsLoadingAnalysis] = useState(true);

  useEffect(() => {
    const calculateResults = () => {
      let correctAnswers = 0;
      const detailedComparison: ComparisonResult[] = [];

      questionsUsed.forEach(question => {
        const creatorAnswer = creatorAnswers[question.id];
        const partnerAnswer = partnerAnswers[question.id];
        const isMatch = creatorAnswer === partnerAnswer;

        if (isMatch) {
          correctAnswers++;
        }

        detailedComparison.push({
          question,
          creatorAnswer,
          partnerAnswer,
          isMatch,
        });
      });

      const finalScore = (correctAnswers / questionsUsed.length) * 100;
      setScore(finalScore);
      setComparison(detailedComparison);
    };

    calculateResults();
  }, [creatorAnswers, partnerAnswers, questionsUsed]);

  useEffect(() => {
    if (comparison.length > 0) {
      const fetchAnalysis = async () => {
        setIsLoadingAnalysis(true);
        try {
          // Fix: Always use new GoogleGenAI({apiKey: process.env.API_KEY});
          const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

          const prompt = `You are a relationship compatibility expert. Based on the following quiz data, provide a fun, insightful, and positive compatibility analysis in Marathi English (Manglish). The quiz was created by ${creatorProfile.name} to see how well ${partnerProfile.name} knows them.

Creator's Profile:
Name: ${creatorProfile.name}
Gender: ${creatorProfile.gender}
Age: ${creatorProfile.age}
Relationship: ${creatorProfile.relationshipType} with ${partnerProfile.name}
Bio: ${creatorProfile.bio}
Favorite Marathi Word for Love: ${creatorProfile.favMarathiWord}

Partner's Profile:
Name: ${partnerProfile.name}
Gender: ${partnerProfile.gender}
Age: ${partnerProfile.age}

Here are the questions, ${creatorProfile.name}'s answers, and ${partnerProfile.name}'s guesses:
${comparison.map(c => `Q: ${c.question.text}\n${creatorProfile.name}'s Answer: ${c.creatorAnswer}\n${partnerProfile.name}'s Guess: ${c.partnerAnswer}\nMatch: ${c.isMatch ? 'Yes' : 'No'}\n`).join('\n')}

The total compatibility score is ${score.toFixed(0)}%.

Now, write a summary analysis. Start with a catchy headline. Then, have a section for "What Matched Well" and "Where You Differ". Keep the tone light, encouraging, and celebratory. Use some Marathi words where appropriate, like 'Ekdam mast!', 'Aga bai!', 'Sundar jodi'. The analysis should be around 150-200 words. Focus on celebrating the connection and suggesting that differences are just opportunities to learn more about each other. Do not output JSON.`;

          // Fix: Use ai.models.generateContent for text generation
          const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
          });
          
          // Fix: Extract text from response using the .text property
          setAnalysis(response.text);
        } catch (error) {
          console.error("Error fetching analysis:", error);
          setAnalysis("Could not generate analysis at this time. But your score speaks for itself!");
        } finally {
          setIsLoadingAnalysis(false);
        }
      };

      fetchAnalysis();
    }
  }, [comparison, score, creatorProfile, partnerProfile]);

  return (
    <div className="space-y-6">
      {score > 70 && <Confetti />}
      <Card className="text-center">
        <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-red-500 mb-2">
          Compatibility Results
        </h2>
        <p className="text-gray-600 mb-6 text-lg">
          {creatorProfile.name} & {partnerProfile.name}
        </p>
        <CircularProgressBar progress={score} />
      </Card>

      <Card>
        <h3 className="text-xl font-bold mb-4 text-center">✨ AI-Powered Analysis ✨</h3>
        {isLoadingAnalysis ? (
          <div className="text-center p-4">
            <p className="text-gray-500 animate-pulse">Generating your compatibility report...</p>
          </div>
        ) : (
          <div className="prose prose-pink max-w-none text-gray-700 whitespace-pre-wrap">{analysis}</div>
        )}
      </Card>

      <Card>
        <h3 className="text-xl font-bold mb-4">Detailed Breakdown</h3>
        <div className="space-y-4">
          {comparison.map(c => (
            <div key={c.question.id} className={`p-4 rounded-lg border-l-4 ${c.isMatch ? 'bg-green-50 border-green-500' : 'bg-red-50 border-red-500'}`}>
              <p className="font-semibold text-gray-800">{c.question.text}</p>
              <div className="mt-2 text-sm">
                <p>
                  <span className="font-medium">{creatorProfile.name}'s answer:</span>{' '}
                  <span className="text-gray-600">{c.creatorAnswer}</span>
                </p>
                <p>
                  <span className="font-medium">{partnerProfile.name}'s guess:</span>{' '}
                  <span className={`${c.isMatch ? 'text-green-700' : 'text-red-700'} font-semibold`}>
                    {c.partnerAnswer} {c.isMatch ? '✓' : '✗'}
                  </span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Button onClick={onRestart}>Create a New Quiz</Button>
    </div>
  );
};

export default ResultsView;
