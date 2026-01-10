import React, { useState, useEffect } from 'react';
import { Scenario, Skill } from '../types';

interface MiniGameLogicProps {
  scenario: Scenario;
  onComplete: (success: boolean) => void;
  skill: Skill | null; 
}

const GRID_SIZE = 3;

const MiniGameLogic: React.FC<MiniGameLogicProps> = ({ scenario, onComplete, skill }) => {
  const [grid, setGrid] = useState<boolean[][]>([]);
  const [timeLeft, setTimeLeft] = useState(60); 
  const [moves, setMoves] = useState(0);
  const [gameActive, setGameActive] = useState(false);
  const [hintRevealed, setHintRevealed] = useState(false);

  useEffect(() => {
    initGame();
  }, []);

  useEffect(() => {
    if (!gameActive) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setGameActive(false);
          onComplete(false); // Time run out
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [gameActive]);

  const initGame = () => {
    const newGrid = Array(GRID_SIZE).fill(null).map(() => Array(GRID_SIZE).fill(true));
    
    // Scramble logic
    const difficulty = scenario.difficultyLevel || 1;
    const scrambles = difficulty * 5 + 2;
    scramble(newGrid, scrambles);

    setGrid(newGrid);
    setGameActive(true);
  };

  const scramble = (newGrid: boolean[][], count: number) => {
    const toggle = (g: boolean[][], r: number, c: number) => {
      g[r][c] = !g[r][c];
      if (r > 0) g[r-1][c] = !g[r-1][c];
      if (r < GRID_SIZE - 1) g[r+1][c] = !g[r+1][c];
      if (c > 0) g[r][c-1] = !g[r][c-1];
      if (c < GRID_SIZE - 1) g[r][c+1] = !g[r][c+1];
    };

    let lastR = -1;
    let lastC = -1;
    for (let i = 0; i < count; i++) {
        let r, c;
        do {
            r = Math.floor(Math.random() * GRID_SIZE);
            c = Math.floor(Math.random() * GRID_SIZE);
        } while (r === lastR && c === lastC);
        toggle(newGrid, r, c);
        lastR = r;
        lastC = c;
    }
  }

  const handleCellClick = (row: number, col: number) => {
    if (!gameActive) return;

    setMoves(prev => prev + 1);

    setGrid(prevGrid => {
      const newGrid = prevGrid.map(row => [...row]);
      
      newGrid[row][col] = !newGrid[row][col];
      if (row > 0) newGrid[row-1][col] = !newGrid[row-1][col];
      if (row < GRID_SIZE - 1) newGrid[row+1][col] = !newGrid[row+1][col];
      if (col > 0) newGrid[row][col-1] = !newGrid[row][col-1];
      if (col < GRID_SIZE - 1) newGrid[row][col+1] = !newGrid[row][col+1];

      const allGreen = newGrid.every(r => r.every(cell => cell === true));
      if (allGreen) {
        setGameActive(false);
        setTimeout(() => onComplete(true), 500);
      }

      return newGrid;
    });
  };

  const handleAutoFix = () => {
      if (!gameActive) return;
      setHintRevealed(true);
      
      // Auto-win logic
      setGrid(prev => prev.map(row => row.map(() => true))); // All true (Green)
      setGameActive(false);
      
      setTimeout(() => onComplete(true), 1500);
  };

  const canUseHint = skill?.id === 'DEBUGGER' || skill?.id === 'COFFEE' || skill?.id === 'RUBBER_DUCK';

  if (grid.length === 0) return <div>Lade Logik-Kern...</div>;

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex justify-between w-full max-w-xs mb-4 font-vt323 text-xl">
        <span className="text-yellow-400">KOMPILIERZEIT: {timeLeft}s</span>
        <span className="text-blue-400">REFAKTORIERUNGEN: {moves}</span>
      </div>

      <div className="relative">
          {/* Schematic Labels */}
          <div className="absolute -top-6 left-0 w-full text-center text-gray-500 font-mono text-xs">DOMAIN-MODELL EBENE</div>
          
          <div className="grid grid-cols-3 gap-3 p-4 bg-gray-900 border-4 border-gray-600 rounded-lg shadow-2xl mb-8">
            {grid.map((row, rowIndex) => (
            row.map((isActive, colIndex) => (
                <button
                key={`${rowIndex}-${colIndex}`}
                onClick={() => handleCellClick(rowIndex, colIndex)}
                className={`
                    w-20 h-20 md:w-24 md:h-24 rounded-md border-2 transition-all duration-300 relative overflow-hidden group flex flex-col items-center justify-center
                    ${isActive 
                    ? 'bg-green-900/60 border-green-500 shadow-[0_0_10px_rgba(34,197,94,0.4)]' 
                    : 'bg-red-900/60 border-red-500 shadow-[0_0_10px_rgba(239,68,68,0.4)]'
                    }
                `}
                >
                <div className={`text-2xl mb-1 ${isActive ? 'text-green-300' : 'text-red-300'}`}>
                    {rowIndex === 1 && colIndex === 1 ? 'KERN' : 'KNOTEN'}
                </div>
                <span className={`text-xs font-mono ${isActive ? 'text-green-200' : 'text-red-200'}`}>
                    {isActive ? 'AUSGERICHTET' : 'DEFEKT'}
                </span>
                </button>
            ))
            ))}
          </div>
      </div>

      {canUseHint && !hintRevealed && (
          <button 
            onClick={handleAutoFix}
            className="mb-4 px-4 py-2 bg-green-900 border border-green-400 text-green-300 font-press-start text-xs rounded shadow-[0_0_10px_rgba(74,222,128,0.5)] hover:bg-green-800 animate-pulse"
          >
            {skill.icon} DEBUGGER STARTEN (AUTO-FIX)
          </button>
      )}

      {hintRevealed && (
          <div className="mb-4 text-green-400 font-mono bg-black/80 p-2 border border-green-700 rounded animate-pulse">
            {'>> AUTOMATISCHES REFACTORING LÄUFT... ALIGNMENT ERZWUNGEN.'}
          </div>
      )}

      <div className="mt-2 font-vt323 text-gray-300 text-center max-w-md bg-black/50 p-4 rounded border border-gray-700">
        <p className="text-lg text-green-400 mb-1">AUFGABE:</p>
        Verbinde <span className="text-white">User</span> und <span className="text-white">Rolle</span>.
        Alle Knoten müssen <span className="text-green-400">GRÜN</span> sein, damit das Domain-Modell kompiliert.
      </div>
    </div>
  );
};

export default MiniGameLogic;