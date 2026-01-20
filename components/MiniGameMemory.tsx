import React, { useState, useEffect } from 'react';
import { Scenario } from '../types';
import { useTranslation } from '../translations';

interface MiniGameMemoryProps {
  scenario: Scenario;
  onComplete: (success: boolean) => void;
}

const COLORS = ['bg-red-500', 'bg-blue-500', 'bg-green-500', 'bg-yellow-500'];
const GRID_SIZE = 4; // 2x2 grid

const MiniGameMemory: React.FC<MiniGameMemoryProps> = ({ scenario, onComplete }) => {
  const { t } = useTranslation();
  const [sequence, setSequence] = useState<number[]>([]);
  const [playerInput, setPlayerInput] = useState<number[]>([]);
  const [isPlayingSequence, setIsPlayingSequence] = useState(false);
  const [activeLight, setActiveLight] = useState<number | null>(null);
  const [message, setMessage] = useState("Beobachte das Muster...");
  
  // Difficulty determines sequence length
  const targetLength = (scenario.difficultyLevel || 1) + 2; 

  // Start game on mount
  useEffect(() => {
    startRound();
  }, []);

  const startRound = () => {
    setPlayerInput([]);
    setIsPlayingSequence(true);
    setMessage("EMPFANGE DATEN...");
    
    const newStep = Math.floor(Math.random() * GRID_SIZE);
    setSequence(prev => [...prev, newStep]);
  };

  useEffect(() => {
    if (sequence.length > 0 && isPlayingSequence) {
      playSequence();
    }
  }, [sequence, isPlayingSequence]);

  const playSequence = async () => {
    for (let i = 0; i < sequence.length; i++) {
      await new Promise(r => setTimeout(r, 500));
      setActiveLight(sequence[i]);
      await new Promise(r => setTimeout(r, 500));
      setActiveLight(null);
    }
    setIsPlayingSequence(false);
    setMessage("SEQUENZ WIEDERHOLEN");
  };

  const handleClick = (index: number) => {
    if (isPlayingSequence) return;

    // Flash the light briefly on click
    setActiveLight(index);
    setTimeout(() => setActiveLight(null), 200);

    const newInput = [...playerInput, index];
    setPlayerInput(newInput);

    // Check correctness immediately
    if (newInput[newInput.length - 1] !== sequence[newInput.length - 1]) {
      setMessage(t.miniGames.memory.error);
      setTimeout(() => onComplete(false), 1000);
      return;
    }

    // Check if round complete
    if (newInput.length === sequence.length) {
      if (sequence.length === targetLength) {
        setMessage("PATCH HOCHGELADEN");
        setTimeout(() => onComplete(true), 1000);
      } else {
        setMessage("GUT. ERWEITERE...");
        setTimeout(() => startRound(), 1000);
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="font-vt323 text-2xl text-yellow-400 mb-4 animate-pulse">{message}</div>
      <div className="grid grid-cols-2 gap-4 bg-gray-800 p-6 rounded-xl border-4 border-gray-600">
        {Array.from({ length: GRID_SIZE }).map((_, i) => (
          <button
            key={i}
            onClick={() => handleClick(i)}
            disabled={isPlayingSequence}
            className={`
              w-24 h-24 rounded-full border-4 transition-all duration-100 shadow-[0_0_15px_rgba(0,0,0,0.5)]
              ${activeLight === i ? `${COLORS[i]} scale-110 shadow-[0_0_30px_currentColor] brightness-150` : 'bg-gray-700 border-gray-900 opacity-50'}
              hover:opacity-100
            `}
          />
        ))}
      </div>
      <div className="mt-4 font-mono text-gray-500 text-sm">
        SEQUENZ: {sequence.length} / {targetLength}
      </div>
    </div>
  );
};

export default MiniGameMemory;