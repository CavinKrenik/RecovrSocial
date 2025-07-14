import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ size = 'md', showText = true, className = '' }) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16'
  };

  return (
    <div className={`flex items-center space-x-3 ${className}`}>
      <img 
        src="https://d64gsuwffb70l.cloudfront.net/68473fd6c864303e0d0d208e_1751972796317_8ffb3fa4.png" 
        alt="Recovr Logo" 
        className={sizeClasses[size]}
      />
      {showText && (
        <span className="text-white font-bold text-xl">Recovr</span>
      )}
    </div>
  );
};

export default Logo;