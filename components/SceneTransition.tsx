import React from 'react';

interface SceneTransitionProps {
  title: string;
  subtitle?: string;
  stage: 'IN' | 'INTERSTITIAL' | 'OUT';
}

const SceneTransition: React.FC<SceneTransitionProps> = ({ title, subtitle, stage }) => {
  // Determine opacity based on stage
  const getOpacity = () => {
    switch (stage) {
      case 'IN':
        return 'opacity-0 animate-fade-in';
      case 'INTERSTITIAL':
        return 'opacity-100';
      case 'OUT':
        return 'opacity-0 animate-fade-out';
      default:
        return 'opacity-100';
    }
  };

  return (
    <div className={`fixed inset-0 z-50 bg-black flex flex-col items-center justify-center pointer-events-none transition-opacity duration-1000 ${getOpacity()}`}>
      <div className="animate-chapter-zoom flex flex-col items-center justify-center w-full px-4">
        {subtitle && (
          <p className="font-stranger text-red-800 text-lg md:text-2xl tracking-[0.3em] text-center uppercase mb-4 opacity-80">
            {subtitle}
          </p>
        )}
        <h2 
          className="font-stranger text-red-600 text-5xl md:text-8xl tracking-tighter text-center uppercase stranger-title leading-none" 
          data-text={title}
        >
          {title}
        </h2>
        
        {/* Decorative divider often seen in the show's title cards */}
        <div className="w-24 h-1 bg-red-900/50 mt-8 shadow-[0_0_10px_red]"></div>
      </div>
    </div>
  );
};

export default SceneTransition;