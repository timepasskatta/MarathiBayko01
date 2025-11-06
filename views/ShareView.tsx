import React from 'react';
// FIX: Added .tsx extension to fix module resolution issue.
import Card from '../components/Card.tsx';
// FIX: Added .tsx extension to fix module resolution issue.
import Button from '../components/Button.tsx';

interface ShareViewProps {
  shareUrl: string;
  onRestart: () => void;
}

const ShareView: React.FC<ShareViewProps> = ({ shareUrl, onRestart }) => {
    const [copied, setCopied] = React.useState(false);

    const copyToClipboard = () => {
        navigator.clipboard.writeText(shareUrl).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
        });
    };

    return (
        <Card className="text-center">
        <h2 className="text-2xl font-bold mb-4">Share with your partner!</h2>
        <input
            type="text"
            readOnly
            value={shareUrl}
            className="w-full p-2 border rounded bg-gray-100 text-center mb-4"
        />
        <Button onClick={copyToClipboard}>{copied ? 'Copied!' : 'Copy Link'}</Button>
        <Button onClick={onRestart} variant="secondary" className="mt-4">
            Start Over
        </Button>
        </Card>
    );
};

export default ShareView;
