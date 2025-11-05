
import React from 'react';
// FIX: Added .ts extension to the import path for 'types' to resolve module loading errors.
import { InternalAd } from '../types.ts';

interface InternalAdBannerProps {
  ad?: InternalAd;
  className?: string;
}

const InternalAdBanner: React.FC<InternalAdBannerProps> = ({ ad, className = '' }) => {
  if (!ad || !ad.enabled || !ad.imageUrl || !ad.redirectUrl) {
    return null; // Render nothing if the ad is disabled or not fully configured
  }

  return (
    <div className={`my-4 text-center ${className}`}>
      <a href={ad.redirectUrl} target="_blank" rel="noopener noreferrer" className="block">
        <img
          src={ad.imageUrl}
          alt="Advertisement"
          className="w-full h-auto object-contain rounded-lg shadow-md hover:shadow-lg transition-shadow"
        />
      </a>
    </div>
  );
};

export default InternalAdBanner;