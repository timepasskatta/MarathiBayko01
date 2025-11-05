
import React, { useState, useEffect } from 'react';
import { GoogleGenAI } from '@google/genai';
import { ResultData } from '../types';
import Card from '../components/Card';
import Button from '../components/Button';
import BackButton from '../components/BackButton';
import CircularProgressBar from '../components/CircularProgressBar';
import Confetti from '../components/Confetti';

interface ResultsViewProps {
  resultData: ResultData;
  onBackToHome: () => void;
}

const ResultsView: React.FC<ResultsViewProps> = ({ resultData, onBackToHome }) => {
  const [analysis, setAnalysis] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [compatibilityScore, setCompatibilityScore] = useState(0);

  useEffect(() => {
    const calculateScoreAndGenerateAnalysis = async () => {
      if (!process.env.API_KEY) {
        setError("API key is not configured. Please contact the administrator.");
        setIsLoading(false);
        return;
      }
      
      setIsLoading(true);
      setError('');

      // Calculate compatibility score
      let matches = 0;
      resultData.questionsUsed.forEach(q => {
        if (resultData.creatorAnswers[q.id] === resultData.partnerAnswers[q.id]) {
          matches++;
        }
      });
      const score = resultData.questionsUsed.length > 0 ? (matches / resultData.questionsUsed.length) * 100 : 0;
      setCompatibilityScore(score);

      // Generate analysis with Gemini
      try {
        // FIX: Initialize GoogleGenAI with apiKey object
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        const prompt = createPrompt(resultData, score);
        
        // FIX: Use ai.models.generateContent
        const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: prompt,
        });
        
        // FIX: Access text directly from response
        setAnalysis(response.text);

      } catch (e: any) {
        console.error("Error generating analysis:", e);
        setError("Failed to generate the compatibility analysis. The AI model might be busy. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    calculateScoreAndGenerateAnalysis();
  }, [resultData]);

  const createPrompt = (data: ResultData, score: number): string => {
    const { creatorProfile, partnerProfile, creatorAnswers, partnerAnswers, questionsUsed } = data;
    let qaBlock = '';
    questionsUsed.forEach(q => {
      qaBlock += `
        Question: ${q.text}
        - ${creatorProfile.name}'s Answer: ${creatorAnswers[q.id]}
        - ${partnerProfile.name}'s Answer: ${partnerAnswers[q.id]}
        - Match: ${creatorAnswers[q.id] === partnerAnswers[q.id] ? 'Yes' : 'No'}
      `;
    });

    return `
      Act as a friendly and insightful relationship compatibility expert.
      Analyze the following quiz results for a couple, ${creatorProfile.name} and ${partnerProfile.name}.
      Their overall compatibility score is ${score.toFixed(0)}%.

      Their profiles:
      - ${creatorProfile.name}: ${creatorProfile.age} year old ${creatorProfile.gender}, who sees their relationship as '${creatorProfile.relationshipType}'.
      - ${partnerProfile.name}: ${partnerProfile.age} year old ${partnerProfile.gender}, who sees their relationship as '${partnerProfile.relationshipType}'.
      
      Here are their answers to the questions:
      ${qaBlock}

      Based on this data, provide a comprehensive, positive, and encouraging compatibility analysis.
      - Start with a warm and congratulatory opening.
      - Provide a summary of their compatibility based on the score.
      - Identify 2-3 key areas where they are strongly aligned and explain why this is a good foundation.
      - Identify 1-2 areas where their answers differ. Frame these not as conflicts, but as opportunities for growth, conversation, and learning about each other. Provide gentle advice on how they can approach these differences.
      - Conclude with an uplifting and optimistic message about their journey together.
      - The tone should be very supportive, gentle, and positive. Avoid any negative or alarming language.
      - Format the output in Markdown for easy reading, using headings and bullet points.
    `;
  };
  
  const renderAnalysis = () => {
    if (isLoading) {
        return <div className="text-center p-8"><p className="animate-pulse">Our AI is analyzing your results...</p></div>;
    }
    if (error) {
        return <div className="text-center p-8 text-red-500">{error}</div>;
    }
    // A simple markdown-to-HTML renderer
    const formattedAnalysis = analysis
        .replace(/### (.*)/g, '<h3 class="text-xl font-bold mt-4 mb-2">$1</h3>')
        .replace(/## (.*)/g, '<h2 class="text-2xl font-bold mt-6 mb-3">$1</h2>')
        .replace(/\* \s*(.*)/g, '<li class="ml-5 list-disc">$1</li>')
        .replace(/\n/g, '<br />');

    return <div className="prose prose-pink max-w-none" dangerouslySetInnerHTML={{ __html: formattedAnalysis }} />;
  };


  return (
    <div className="space-y-6">
      {compatibilityScore > 75 && <Confetti />}
      <Card className="relative">
        <BackButton onClick={onBackToHome} />
        <div className="text-center">
            <h2 className="text-3xl font-bold mb-2">Your Compatibility Report</h2>
            <p className="text-gray-500">For {resultData.creatorProfile.name} & {resultData.partnerProfile.name}</p>
        </div>
      </Card>

      <Card className="text-center">
        <h3 className="text-xl font-semibold mb-4">Overall Score</h3>
        <CircularProgressBar progress={compatibilityScore} />
      </Card>

      <Card>
        <h3 className="text-2xl font-bold text-center mb-4">AI-Powered Analysis</h3>
        {renderAnalysis()}
      </Card>

      <div className="text-center">
        <Button onClick={onBackToHome} variant="secondary">Create a New Quiz</Button>
      </div>
    </div>
  );
};

export default ResultsView;
