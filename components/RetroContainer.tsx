import React from 'react';

interface RetroContainerProps {
  children: React.ReactNode;
  className?: string;
}

const RetroContainer: React.FC<RetroContainerProps> = ({ children, className = '' }) => {
  // Generate random spores
  const spores = Array.from({ length: 20 }).map((_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    animationDelay: `-${Math.random() * 20}s`,
    animationDuration: `${15 + Math.random() * 15}s`,
    size: `${2 + Math.random() * 4}px`
  }));

  return (
    <div className={`relative w-full min-h-screen bg-[#09090b] overflow-hidden flex flex-col ${className}`}>
      {/* Floating Spores (Upside Down Effect) */}
      <div className="spore-container">
        {spores.map(spore => (
          <div 
            key={spore.id}
            className="spore"
            style={{
              left: spore.left,
              width: spore.size,
              height: spore.size,
              animationDelay: spore.animationDelay,
              animationDuration: spore.animationDuration
            }}
          />
        ))}
      </div>

      {/* Subtle Scanline Effect */}
      <div className="absolute inset-0 pointer-events-none z-50 scanlines opacity-[0.05]"></div>
      
      {/* Vignette */}
      <div className="absolute inset-0 pointer-events-none z-40 bg-[radial-gradient(circle_at_center,transparent_50%,rgba(0,0,0,0.6)_100%)]"></div>
      
      {/* Background Gradient (Dark Blue/Purple Haze) */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-slate-900 via-[#0f172a] to-black opacity-80 z-0"></div>

      <div className="relative z-10 w-full h-full flex flex-col flex-grow">
        {children}
      </div>
    </div>
  );
};

export default RetroContainer;