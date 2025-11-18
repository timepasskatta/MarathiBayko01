import React, { useMemo } from 'react';

interface CircularProgressBarProps {
  progress: number;
  size?: number;
  strokeWidth?: number;
}

const CircularProgressBar: React.FC<CircularProgressBarProps> = ({
  progress,
  size = 150,
  strokeWidth = 10,
}) => {
  const center = size / 2;
  const radius = center - strokeWidth / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  const colorClass = useMemo(() => {
    if (progress <= 40) return 'text-red-500';
    if (progress <= 70) return 'text-amber-500';
    return 'text-pink-500';
  }, [progress]);

  return (
    <div
      className="relative inline-flex items-center justify-center"
      role="progressbar"
      aria-label="Compatibility score"
      aria-valuenow={Math.round(progress)}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <svg width={size} height={size} className="transform -rotate-90">
        <circle
          cx={center}
          cy={center}
          r={radius}
          strokeWidth={strokeWidth}
          className="text-rose-200"
          stroke="currentColor"
          fill="transparent"
        />
        <circle
          cx={center}
          cy={center}
          r={radius}
          strokeWidth={strokeWidth}
          className={colorClass}
          stroke="currentColor"
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          style={{ transition: 'stroke-dashoffset 0.5s ease-out' }}
        />
      </svg>
      <span className={`absolute text-3xl font-bold ${colorClass}`} aria-hidden="true">{`${Math.round(progress)}%`}</span>
    </div>
  );
};

export default CircularProgressBar;