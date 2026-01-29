import React, { useState, useEffect } from 'react';
import { Scenario, Skill } from '../types';
import { useTranslation, formatMessage } from '../translations';
import { useSkillTranslation } from '../translations/helpers';

interface MiniGameDecipherProps {
  scenario: Scenario;
  skill: Skill | null;
  onComplete: (success: boolean, hpPenalty?: number) => void;
}

interface Letter {
  id: string;
  char: string;
  state: 'POOL' | 'SLOT';
}

const MiniGameDecipher: React.FC<MiniGameDecipherProps> = ({ scenario, skill, onComplete }) => {
  const { t } = useTranslation();
  const skillTranslation = useSkillTranslation(skill?.id ?? '');
  const skillName = skill ? (skillTranslation.name || skill.name) : '';
  const targetWord = scenario.targetWord || "PASSWORD";
  const [letters, setLetters] = useState<Letter[]>([]);
  const [currentGuess, setCurrentGuess] = useState<Letter[]>([]);
  const [timeLeft, setTimeLeft] = useState(30);
  const [gameStatus, setGameStatus] = useState<'PLAYING' | 'WON' | 'LOST'>('PLAYING');
  const [skillUsed, setSkillUsed] = useState(false);

  useEffect(() => {
    initializeGame();
  }, [scenario]);

  useEffect(() => {
    if (gameStatus !== 'PLAYING') return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          handleLose();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [gameStatus]);

  const initializeGame = () => {
    // Create letter objects
    const chars = targetWord.split('');
    const newLetters = chars.map((char, index) => ({
      id: `${char}-${index}`,
      char: char,
      state: 'POOL' as const
    }));

    // Shuffle
    for (let i = newLetters.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newLetters[i], newLetters[j]] = [newLetters[j], newLetters[i]];
    }

    setLetters(newLetters);
    setCurrentGuess([]);
  };

  const handleLetterClick = (letter: Letter) => {
    if (gameStatus !== 'PLAYING') return;

    if (letter.state === 'POOL') {
      // Move to slot
      const updatedLetter = { ...letter, state: 'SLOT' as const };
      
      // Update letters in pool
      setLetters(prev => prev.map(l => l.id === letter.id ? updatedLetter : l));
      
      // Add to guess
      const newGuess = [...currentGuess, updatedLetter];
      setCurrentGuess(newGuess);

      // Check win
      if (newGuess.length === targetWord.length) {
        const formedWord = newGuess.map(l => l.char).join('');
        if (formedWord === targetWord) {
          handleWin();
        }
      }
    } else {
      // Move back to pool (remove from guess)
      const updatedLetter = { ...letter, state: 'POOL' as const };
      
      setLetters(prev => prev.map(l => l.id === letter.id ? updatedLetter : l));
      setCurrentGuess(prev => prev.filter(l => l.id !== letter.id));
    }
  };

  const handleWin = (hpPenalty = 0) => {
    setGameStatus('WON');
    setTimeout(() => onComplete(true, hpPenalty), 1000);
  };

  const handleLose = () => {
    setGameStatus('LOST');
    setTimeout(() => onComplete(false), 1000);
  };

  const activateSkill = () => {
    if (skillUsed || !skill) return;
    setSkillUsed(true);

    if (skill.id === 'OVERCLOCK') {
        setTimeLeft(prev => prev + 15);
    } 
    else if (skill.id === 'SUDO_FORCE') {
        handleWin(10);
    }
    else if (skill.id === 'DEBUGGER') {
        // Auto-fill first 3 missing letters
        const currentLength = currentGuess.length;
        const missingCount = targetWord.length - currentLength;
        const toReveal = Math.min(3, missingCount);
        
        // Find correct next letters from targetWord
        const neededChars = targetWord.substring(currentLength, currentLength + toReveal).split('');
        
        // Find these chars in the pool and simulate clicks
        const chars = targetWord.split('');
        const newLetters = [...letters]; // Clone state
        
        // Mark all as pool first
        newLetters.forEach(l => l.state = 'POOL');
        
        const newGuess: Letter[] = [];
        
        // For each char we want to reveal
        for (let i = 0; i < toReveal; i++) {
             const charToFind = chars[i];
             // Find a letter in pool that matches this char
             const found = newLetters.find(l => l.char === charToFind && l.state === 'POOL');
             if (found) {
                 found.state = 'SLOT';
                 newGuess.push(found);
             }
        }
        
        setLetters(newLetters);
        setCurrentGuess(newGuess);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full">
       <div className="flex justify-between w-full max-w-md mb-6 font-vt323 text-2xl border-b border-gray-700 pb-2">
        <span className={`${timeLeft < 10 ? 'text-red-500 animate-pulse' : 'text-blue-400'}`}>
            {t.miniGames.decipher.time} {timeLeft}s
        </span>
        <span className="text-gray-400">{t.miniGames.decipher.length} {targetWord.length}</span>
      </div>

      {/* Slots Area */}
      <div className="flex gap-2 mb-8 h-16 bg-gray-900/50 p-4 rounded border-2 border-gray-700 min-w-[300px] justify-center items-center">
        {Array.from({ length: targetWord.length }).map((_, index) => {
          const letter = currentGuess[index];
          return (
            <div 
              key={index}
              onClick={() => letter && handleLetterClick(letter)}
              className={`
                w-10 h-12 flex items-center justify-center text-3xl font-vt323 border-b-4 rounded cursor-pointer transition-all
                ${letter 
                    ? 'border-blue-500 text-blue-100 bg-blue-900/30' 
                    : 'border-gray-600 text-transparent bg-gray-800/30'
                }
                ${gameStatus === 'WON' ? 'border-green-500 text-green-400' : ''}
                ${gameStatus === 'LOST' ? 'border-red-500 text-red-400' : ''}
              `}
            >
              {letter ? letter.char : '_'}
            </div>
          );
        })}
      </div>

      {/* Letter Pool */}
      <div className="flex flex-wrap gap-3 justify-center max-w-lg mb-8">
        {letters.map((letter) => (
          <button
            key={letter.id}
            onClick={() => handleLetterClick(letter)}
            disabled={letter.state === 'SLOT' || gameStatus !== 'PLAYING'}
            className={`
              w-12 h-12 flex items-center justify-center text-2xl font-press-start rounded shadow-lg transition-all duration-200
              ${letter.state === 'SLOT' 
                ? 'opacity-0 scale-50' 
                : 'bg-gray-800 text-yellow-400 border-2 border-yellow-600 hover:scale-110 hover:bg-gray-700'
              }
            `}
          >
            {letter.char}
          </button>
        ))}
      </div>

      {/* Skill Bar */}
      {skill && !skillUsed && gameStatus === 'PLAYING' && (
        <button 
            onClick={activateSkill}
            className={`
                flex items-center gap-3 px-6 py-3 rounded-full border-2 shadow-[0_0_15px_rgba(0,0,0,0.5)] transition-all transform hover:scale-105 active:scale-95
                ${skill.color} text-white font-bold font-mono tracking-widest
            `}
        >
            <span className="text-2xl">{skill.icon}</span>
            <span>{formatMessage(t.miniGames.decipher.activateSkill, { skill: skillName.toUpperCase() })}</span>
        </button>
      )}

      {skillUsed && (
          <div className="text-gray-500 font-mono text-sm mt-2">{t.miniGames.decipher.skillModuleEmpty}</div>
      )}

      <div className="mt-6 font-vt323 text-gray-400 text-center">
        <p className="text-xl">{t.miniGames.decipher.decryptPassword}</p>
      </div>
    </div>
  );
};

export default MiniGameDecipher;
