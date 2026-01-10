import React from 'react';
import { Character, Skill, Act } from '../types';

interface StatsPanelProps {
  character: Character;
  skill: Skill | null;
  slaTime: number;
  teamMorale: number;
  ticketQuality: number;
  currentAct: Act;
  gameStatus: 'active' | 'won' | 'lost';
}

const StatsPanel: React.FC<StatsPanelProps> = ({ 
  character, 
  skill,
  slaTime, 
  teamMorale, 
  ticketQuality,
  currentAct,
  gameStatus
}) => {
  
  // Helper for progress bars
  const renderBar = (label: string, value: number, colorClass: string, statusText: string | null = null) => (
    <div className="mb-2 group">
        <div className="flex justify-between text-xs font-vt323 mb-1 text-gray-300">
            <div className="flex items-center gap-2">
                <span>{label}</span>
                {statusText && (
                    <span className={`px-1.5 py-0.5 rounded text-[10px] tracking-wider font-bold transition-colors duration-300 ${
                        value < 33 ? 'bg-red-900/80 text-red-100 animate-pulse border border-red-500 shadow-[0_0_5px_red]' : 
                        value < 66 ? 'bg-yellow-900/80 text-yellow-100 border border-yellow-500' : 
                        'bg-green-900/80 text-green-100 border border-green-500'
                    }`}>
                        {statusText}
                    </span>
                )}
            </div>
            <span className={`transition-all duration-300 ${value < 20 ? 'text-red-500 font-bold animate-pulse' : 'text-gray-300'}`}>
                {Math.round(value)}%
            </span>
        </div>
        <div className="w-full h-4 bg-gray-900 border border-gray-600 rounded overflow-hidden relative shadow-inner">
            {/* Retro grid pattern overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.5)_1px,transparent_1px)] bg-[size:10%_100%] z-10 pointer-events-none opacity-30"></div>
            
            <div 
                className={`h-full transition-all duration-700 ease-out ${colorClass} relative z-0 flex items-center justify-end pr-1`}
                style={{ width: `${Math.max(0, Math.min(100, value))}%` }}
            >
                {/* Shine effect */}
                <div className="absolute top-0 left-0 w-full h-[2px] bg-white/30"></div>
            </div>
        </div>
    </div>
  );

  // Dynamic SLA Logic
  const getSLAConfig = (val: number) => {
    if (val <= 0) return { color: "bg-gray-700", text: "VERLETZT" };
    if (val < 33) return { color: "bg-red-600 shadow-[0_0_10px_#ef4444]", text: "KRITISCH" };
    if (val < 66) return { color: "bg-yellow-500 shadow-[0_0_10px_#eab308]", text: "WARNUNG" };
    return { color: "bg-green-500 shadow-[0_0_10px_#22c55e]", text: "SICHER" };
  };

  const slaConfig = getSLAConfig(slaTime);

  return (
    <div className={`border-2 p-4 bg-gray-900/95 backdrop-blur rounded flex flex-col md:flex-row gap-6 items-center justify-between ${character.themeColor} shadow-[0_0_20px_rgba(0,0,0,0.5)] transition-colors duration-500`}>
      
      {/* Character Info */}
      <div className="flex items-center gap-4 min-w-[200px]">
        <div className="text-5xl filter drop-shadow-[0_0_8px_currentColor] animate-pulse transition-transform hover:scale-110 duration-300 cursor-help" title={character.specialAbility}>
            {character.portraitEmoji}
        </div>
        <div>
            <h3 className="text-lg font-bold font-press-start uppercase tracking-widest leading-snug">{character.name}</h3>
            <p className="text-xs opacity-80 font-vt323 mt-1 text-yellow-200">{character.role}</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="flex-grow w-full grid grid-cols-1 md:grid-cols-3 gap-4">
        {renderBar("SLA BUFFER", slaTime, slaConfig.color, slaConfig.text)}
        {renderBar("TEAM MORAL", teamMorale, "bg-gradient-to-r from-red-600 to-blue-500")}
        {renderBar("TICKET QUALITÄT", ticketQuality, "bg-gradient-to-r from-yellow-600 to-yellow-300")}
      </div>

      {/* Act Info & Inventory */}
      <div className="flex flex-col items-end gap-2 min-w-[150px] border-l border-gray-700 pl-4 hidden md:flex">
        <div className="font-vt323 text-right">
            <div className="text-xl text-green-400 mb-1 drop-shadow-[0_0_5px_rgba(74,222,128,0.5)]">{currentAct.split(':')[0]}</div>
            <div className={`text-xs uppercase tracking-widest ${gameStatus === 'active' ? 'text-gray-400' : gameStatus === 'won' ? 'text-green-400' : 'text-red-500'}`}>
                Status: {gameStatus}
            </div>
        </div>

        {/* Active Skill Display */}
        <div className="flex items-center gap-2 bg-black/40 px-2 py-1 rounded border border-gray-600">
            <span className="text-xs text-gray-500 font-vt323">ITEM:</span>
            {skill ? (
                <span className="text-sm text-yellow-400 font-bold flex items-center gap-1" title={skill.description}>
                    {skill.icon} <span className="hidden lg:inline">{skill.name}</span>
                </span>
            ) : (
                <span className="text-xs text-gray-600 italic">KEINS</span>
            )}
        </div>
      </div>
    </div>
  );
};

export default StatsPanel;