import React from 'react';
import { InternalAd } from '../types.ts';
import Card from './Card.tsx';

interface InternalAdBannerProps {
  ad?: InternalAd;
}

const InternalAdBanner: React.FC<InternalAdBannerProps> = ({ ad }) => {
  if (!ad || !ad.enabled || !ad.imageUrl) {
    return null;
  }

  const aspectClass = ad.aspectRatio === '1:1' ? 'md:w-32 h-32' : 'md:w-48 h-32';

  return (
    <a href={ad.redirectUrl} target="_blank" rel="noopener noreferrer" className="block my-4 no-underline">
      <Card className="!p-0 overflow-hidden flex flex-col md:flex-row items-center hover:shadow-xl transition-shadow">
        <img src={ad.imageUrl} alt={ad.title} className={`w-full ${aspectClass} object-cover flex-shrink-0`} />
        <div className="p-4 text-left">
          <p className="text-xs font-bold text-pink-500">SPONSORED</p>
          <h4 className="font-bold text-gray-800">{ad.title}</h4>
          {ad.description && <p className="text-sm text-gray-600">{ad.description}</p>}
        </div>
      </Card>
    </a>
  );
};

export default InternalAdBanner;