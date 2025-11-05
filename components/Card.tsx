
import React from 'react';

// FIX: Extended props with React.HTMLAttributes to allow passing standard div attributes like onClick.
interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({ children, className = '', ...props }) => {
  return (
    <div className={`bg-white rounded-xl shadow-lg p-6 md:p-8 ${className}`} {...props}>
      {children}
    </div>
  );
};

export default Card;
