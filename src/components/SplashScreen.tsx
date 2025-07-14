import React, { useState, useEffect } from 'react';

interface SplashScreenProps {
  onComplete: () => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete }) => {
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    // Show welcome message after brief delay
    const messageTimer = setTimeout(() => {
      setShowMessage(true);
    }, 500);

    // Navigate to main app after 3 seconds
    const navigationTimer = setTimeout(() => {
      onComplete();
    }, 3500);

    return () => {
      clearTimeout(messageTimer);
      clearTimeout(navigationTimer);
    };
  }, [onComplete]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-teal-800 flex items-center justify-center">
      <div className="text-center">
        <div className="mb-8">
          <img 
            src="https://d64gsuwffb70l.cloudfront.net/68473fd6c864303e0d0d208e_1751972796317_8ffb3fa4.png" 
            alt="Recovr Logo" 
            className="w-32 h-32 mx-auto mb-6 opacity-0 animate-fade-in"
          />
        </div>
        {showMessage && (
          <h1 className="text-4xl font-bold text-white opacity-0 animate-fade-in-delay">
            Welcome to your recovery journey...
          </h1>
        )}
      </div>
    </div>
  );
};

export default SplashScreen;