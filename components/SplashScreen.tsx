
import React, { useState, useEffect } from 'react';

const SplashScreen: React.FC = () => {
  const [stage, setStage] = useState('entering');

  useEffect(() => {
    const timer1 = setTimeout(() => setStage('visible'), 100); // Start animation
    const timer2 = setTimeout(() => setStage('exiting'), 2500); // Start fade out
    
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  const getTransitionClasses = () => {
    switch (stage) {
      case 'entering':
        return 'opacity-0 scale-125';
      case 'visible':
        return 'opacity-100 scale-100';
      case 'exiting':
        return 'opacity-0';
      default:
        return 'opacity-0';
    }
  };

  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center z-[9999]">
      <h1
        className={`font-black text-white select-none transition-all duration-1000 ease-in-out ${getTransitionClasses()}`}
        style={{
          fontSize: 'clamp(100px, 18vw, 320px)',
          fontWeight: 900,
          letterSpacing: 'clamp(10px, 2vw, 30px)',
        }}
      >
        BLACK
      </h1>
    </div>
  );
};

export default SplashScreen;
   