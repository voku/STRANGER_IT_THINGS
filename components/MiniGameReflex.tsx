import React, { useState, useEffect, useRef } from 'react';
import { Scenario } from '../types';

interface MiniGameReflexProps {
  scenario: Scenario;
  onComplete: (success: boolean) => void;
}

interface Target {
  id: number;
  x: number;
  y: number;
  type: 'GLITCH' | 'DEMOBAT';
}

const MiniGameReflex: React.FC<MiniGameReflexProps> = ({ scenario, onComplete }) => {
  const [targets, setTargets] = useState<Target[]>([]);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(10); // 10 seconds to survive/win
  const [gameActive, setGameActive] = useState(true);
  
  const targetIdRef = useRef(0);
  const difficulty = scenario.difficultyLevel || 1;
  const targetScore = 5 + (difficulty * 2);
  const spawnRate = 1000 - (difficulty * 200);

  // Timer
  useEffect(() => {
    if (!gameActive) return;
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          setGameActive(false);
          // If time runs out, check if score met
          if (score >= targetScore) {
             onComplete(true);
          } else {
             onComplete(false);
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [gameActive, score, targetScore, onComplete]);

  // Spawner
  useEffect(() => {
    if (!gameActive) return;
    const spawner = setInterval(() => {
      if (targets.length < 5) {
        const id = targetIdRef.current++;
        const x = Math.random() * 80; // keep within 80% to avoid edge clipping
        const y = Math.random() * 80;
        setTargets(prev => [...prev, { id, x, y, type: Math.random() > 0.5 ? 'GLITCH' : 'DEMOBAT' }]);
      }
    }, spawnRate);

    return () => clearInterval(spawner);
  }, [gameActive, targets.length, spawnRate]);

  const handleHit = (id: number) => {
    setTargets(prev => prev.filter(t => t.id !== id));
    setScore(prev => {
        const newScore = prev + 1;
        // Instant win if score reached? No, survive timer logic or speed run?
        // Let's do speed run: if you clear enough fast, you win.
        if (newScore >= targetScore) {
            setGameActive(false);
            onComplete(true);
        }
        return newScore;
    });
  };

  return (
    <div className="flex flex-col items-center w-full h-[300px] relative bg-black border border-green-900 rounded overflow-hidden cursor-crosshair">
      
      {/* HUD */}
      <div className="absolute top-2 left-0 w-full flex justify-between px-4 z-10 pointer-events-none">
        <span className="font-vt323 text-xl text-red-500">ZEIT: {timeLeft}s</span>
        <span className="font-vt323 text-xl text-green-500">BEDROHUNGEN BESEITIGT: {score}/{targetScore}</span>
      </div>

      {/* Grid Background */}
      <div className="absolute inset-0 opacity-20" 
           style={{ backgroundImage: 'linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)', backgroundSize: '20px 20px' }}>
      </div>

      {/* Targets */}
      {targets.map(target => (
        <button
          key={target.id}
          onClick={(e) => {
              e.stopPropagation();
              handleHit(target.id);
          }}
          className="absolute transform -translate-x-1/2 -translate-y-1/2 hover:scale-110 active:scale-90 transition-transform"
          style={{ left: `${target.x + 10}%`, top: `${target.y + 10}%` }}
        >
          <div className={`text-4xl filter drop-shadow-[0_0_10px_rgba(255,255,255,0.8)] ${target.type === 'GLITCH' ? 'animate-pulse' : 'animate-bounce'}`}>
            {target.type === 'GLITCH' ? '👾' : '🦇'}
          </div>
        </button>
      ))}
      
      {/* Start Overlay */}
      {timeLeft === 10 && score === 0 && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <span className="text-4xl text-white font-vt323 opacity-50">ZIELE KLICKEN!</span>
          </div>
      )}
    </div>
  );
};

export default MiniGameReflex;