import React from 'react';
import { MapLocation, Character, Act } from '../types';
import { MAP_LOCATIONS } from '../constants';

interface HawkinsMapProps {
  playerName: string;
  character: Character;
  unlockedLocationIds: string[];
  currentAct: Act;
  onSelectLocation: (location: MapLocation) => void;
}

const HawkinsMap: React.FC<HawkinsMapProps> = ({ playerName, character, unlockedLocationIds, currentAct, onSelectLocation }) => {
  
  const isUnlocked = (loc: MapLocation) => {
      if (loc.requiredAct && loc.requiredAct !== currentAct) return false;
      return unlockedLocationIds.includes(loc.id);
  };

  const getActHint = () => {
      if (currentAct === Act.ACT_1_TICKET) return "ZIEL: TRIAGE IN DER STARCOURT MALL";
      if (currentAct === Act.ACT_2_PERSPECTIVE) return "ZIEL: TRAINING AN DER HAWKINS HIGH";
      if (currentAct === Act.ACT_3_BOSS) return "ZIEL: KONFRONTATION IM HAWKINS LAB";
      return "";
  };

  return (
    <div className="w-full min-h-full flex flex-col items-center justify-center p-2 sm:p-4 relative z-20 overflow-y-auto">
      <div className="text-center mb-4 sm:mb-6 bg-black/70 p-3 sm:p-4 rounded-lg border border-red-900/50 backdrop-blur-sm animate-fade-in-up shadow-[0_0_20px_rgba(220,38,38,0.3)]">
        <h2 
            data-text="EINSATZKARTE"
            className="text-2xl sm:text-4xl md:text-5xl stranger-heading tracking-widest mb-2"
        >
            EINSATZKARTE
        </h2>
        <p className="font-vt323 text-base sm:text-xl text-yellow-400 mb-2 blink">
            {getActHint()}
        </p>
        <p className="font-vt323 text-sm sm:text-lg text-gray-300">
            AGENT: <span className="text-blue-400 uppercase">{playerName || 'UNBEKANNT'}</span> | 
            ROLLE: <span className={`${character.themeColor.split(' ')[0]} uppercase`}>{character.name}</span>
        </p>
      </div>

      {/* Mobile: List View */}
      <div className="sm:hidden w-full max-w-md space-y-3 px-2">
        {MAP_LOCATIONS.map((loc) => {
          const unlocked = isUnlocked(loc);
          return (
            <button
              key={loc.id}
              onClick={() => unlocked && onSelectLocation(loc)}
              disabled={!unlocked}
              className={`
                w-full p-4 rounded-lg border-2 transition-all flex items-center gap-4
                ${unlocked 
                  ? (loc.type === 'DANGER' ? 'bg-red-900/30 border-red-500 text-red-400' : 
                     loc.type === 'SAFE' ? 'bg-green-900/30 border-green-500 text-green-400' : 
                     'bg-blue-900/30 border-blue-500 text-blue-400')
                  : 'bg-gray-900/50 border-gray-700 text-gray-500 opacity-50'}
                ${unlocked ? 'active:scale-95' : 'cursor-not-allowed'}
              `}
            >
              <div className={`
                w-10 h-10 rounded-full border-2 flex items-center justify-center
                ${unlocked 
                  ? (loc.type === 'DANGER' ? 'bg-red-900 border-red-500 animate-pulse' : 
                     loc.type === 'SAFE' ? 'bg-green-900 border-green-500 animate-pulse' : 
                     'bg-blue-900 border-blue-500 animate-pulse')
                  : 'bg-gray-800 border-gray-600'}
              `}>
                {unlocked ? <div className="w-2 h-2 bg-white rounded-full"></div> : <span>🔒</span>}
              </div>
              <div className="flex-1 text-left">
                <div className="font-press-start text-xs sm:text-sm">{loc.name}</div>
                {unlocked && (
                  <div className="font-vt323 text-sm text-gray-400 mt-1">{loc.description}</div>
                )}
              </div>
              {unlocked && (
                <span className="text-2xl">→</span>
              )}
            </button>
          );
        })}
      </div>

      {/* Desktop: Map View */}
      <div className="hidden sm:block relative w-full max-w-4xl aspect-[16/9] bg-[#0f1014] border-4 border-gray-800 rounded-xl shadow-2xl overflow-hidden group">
        
        {/* Map Background Grid */}
        <div className="absolute inset-0 opacity-20 pointer-events-none" 
             style={{ 
                 backgroundImage: 'linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)', 
                 backgroundSize: '40px 40px' 
             }}>
        </div>

        {/* Connection Lines (SVG) */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-50">
            <line x1="50%" y1="55%" x2="20%" y2="35%" stroke="#4b5563" strokeWidth="2" strokeDasharray="5,5" className={unlockedLocationIds.includes('SCHOOL') ? 'stroke-blue-500 opacity-100' : 'opacity-20'} />
            <line x1="20%" y1="35%" x2="80%" y2="25%" stroke="#4b5563" strokeWidth="2" strokeDasharray="5,5" className={unlockedLocationIds.includes('LAB') ? 'stroke-red-500 opacity-100' : 'opacity-20'} />
        </svg>

        {/* Locations */}
        {MAP_LOCATIONS.map((loc) => {
            const unlocked = isUnlocked(loc);
            return (
                <button
                    key={loc.id}
                    onClick={() => unlocked && onSelectLocation(loc)}
                    disabled={!unlocked}
                    className={`
                        absolute transform -translate-x-1/2 -translate-y-1/2 group/pin transition-all duration-300
                        flex flex-col items-center
                        ${unlocked ? 'hover:scale-110 cursor-pointer' : 'opacity-40 cursor-not-allowed grayscale'}
                    `}
                    style={{ left: `${loc.coords.x}%`, top: `${loc.coords.y}%` }}
                >
                    {/* Pin Icon */}
                    <div className={`
                        w-8 h-8 rounded-full border-2 mb-2 flex items-center justify-center transition-all
                        ${unlocked 
                            ? (loc.type === 'DANGER' ? 'bg-red-900 border-red-500 text-red-500 shadow-[0_0_15px_currentColor] animate-pulse' : 
                               loc.type === 'SAFE' ? 'bg-green-900 border-green-500 text-green-500 shadow-[0_0_15px_currentColor] animate-pulse' : 
                               'bg-blue-900 border-blue-500 text-blue-500 shadow-[0_0_15px_currentColor] animate-pulse')
                            : 'bg-gray-800 border-gray-600 text-gray-500'}
                    `}>
                        {unlocked ? <div className="w-2 h-2 bg-white rounded-full"></div> : <span>🔒</span>}
                    </div>

                    {/* Label */}
                    <div className={`
                        bg-black/80 border px-3 py-1 rounded text-center whitespace-nowrap
                        ${unlocked ? 'border-gray-700 opacity-80 group-hover/pin:opacity-100' : 'border-gray-800 opacity-30'}
                    `}>
                        <div className={`font-press-start text-[10px] ${
                            unlocked ? (loc.type === 'DANGER' ? 'text-red-400' : 
                            loc.type === 'SAFE' ? 'text-green-400' : 'text-blue-400') : 'text-gray-500'
                        }`}>
                            {loc.name}
                        </div>
                        {unlocked && (
                            <div className="font-vt323 text-gray-400 text-xs hidden group-hover/pin:block">
                                {loc.description}
                            </div>
                        )}
                    </div>
                </button>
            );
        })}

        {/* Upside Down Particles */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
             <div className="absolute top-[80%] left-[70%] w-40 h-40 bg-red-900/20 rounded-full blur-3xl animate-pulse"></div>
        </div>

      </div>
    </div>
  );
};

export default HawkinsMap;