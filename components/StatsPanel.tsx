import React from 'react';
import { Character, Skill, Act, ItemInventory } from '../types';
import { useTranslation } from '../translations';
import { useSkillTranslation } from '../translations/helpers';

interface StatsPanelProps {
  character: Character;
  skill: Skill | null;
  slaTime: number;
  teamMorale: number;
  ticketQuality: number;
  currentAct: Act;
  gameStatus: 'active' | 'won' | 'lost';
  itemInventory?: ItemInventory;
}

const StatsPanel: React.FC<StatsPanelProps> = ({ 
  character, 
  skill,
  slaTime, 
  teamMorale, 
  ticketQuality,
  currentAct,
  gameStatus,
  itemInventory = {}
}) => {
  const { t } = useTranslation();
  const skillTranslation = useSkillTranslation(skill?.id ?? '');
  const skillName = skill ? (skillTranslation.name || skill.name) : '';
  const skillDescription = skill ? (skillTranslation.description || skill.description) : '';
  
  // Get item count for equipped skill
  const equippedItemCount = skill ? (itemInventory[skill.id] || 0) : 0;
  
  // Helper for progress bars
  const renderBar = (label: string, value: number, colorClass: string, statusText: string | null = null) => (
    <div className="mb-1 sm:mb-2 group">
        <div className="flex justify-between text-[10px] sm:text-xs font-vt323 mb-0.5 sm:mb-1 text-gray-300">
            <div className="flex items-center gap-1 sm:gap-2">
                <span>{label}</span>
                {statusText && (
                    <span className={`px-1 py-0.5 rounded text-[8px] sm:text-[10px] tracking-wider font-bold transition-colors duration-300 ${
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
        <div className="w-full h-2 sm:h-4 bg-gray-900 border border-gray-600 rounded overflow-hidden relative shadow-inner">
            {/* Retro grid pattern overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.5)_1px,transparent_1px)] bg-[size:10%_100%] z-10 pointer-events-none opacity-30"></div>
            
            <div 
                className={`h-full transition-all duration-700 ease-out ${colorClass} relative z-0 flex items-center justify-end pr-1`}
                style={{ width: `${Math.max(0, Math.min(100, value))}%` }}
            >
                {/* Shine effect */}
                <div className="absolute top-0 left-0 w-full h-[1px] sm:h-[2px] bg-white/30"></div>
            </div>
        </div>
    </div>
  );

  // Dynamic SLA Logic
  const getSLAConfig = (val: number) => {
    if (val <= 0) return { color: "bg-gray-700", text: t.stats.violated };
    if (val < 33) return { color: "bg-red-600 shadow-[0_0_10px_#ef4444]", text: t.stats.critical };
    if (val < 66) return { color: "bg-yellow-500 shadow-[0_0_10px_#eab308]", text: t.stats.warning };
    return { color: "bg-green-500 shadow-[0_0_10px_#22c55e]", text: t.stats.safe };
  };

  const slaConfig = getSLAConfig(slaTime);

  return (
    <div className={`border sm:border-2 p-2 sm:p-4 bg-gray-900/95 backdrop-blur rounded flex flex-col sm:flex-row gap-2 sm:gap-6 items-start sm:items-center justify-between ${character.themeColor} shadow-[0_0_20px_rgba(0,0,0,0.5)] transition-colors duration-500`}>
      
      {/* Character Info - Compact on mobile */}
      <div className="flex items-center gap-2 sm:gap-4 min-w-0 sm:min-w-[200px] w-full sm:w-auto">
        <div className="text-2xl sm:text-5xl filter drop-shadow-[0_0_8px_currentColor] animate-pulse transition-transform hover:scale-110 duration-300 cursor-help flex-shrink-0" title={character.specialAbility}>
            {character.portraitEmoji}
        </div>
        <div className="min-w-0 flex-1 sm:flex-initial">
            <h3 className="text-xs sm:text-lg font-bold font-press-start uppercase tracking-widest leading-snug truncate">{character.name}</h3>
            <p className="text-[10px] sm:text-xs opacity-80 font-vt323 mt-0.5 sm:mt-1 text-yellow-200 truncate">{character.role}</p>
        </div>
        
        {/* Mobile: Show item inline */}
        <div className="flex sm:hidden items-center gap-1 bg-black/40 px-2 py-1 rounded border border-gray-600 flex-shrink-0">
            {skill ? (
                <div className="flex items-center gap-1">
                    <span className="text-sm text-yellow-400" title={skillDescription}>
                        {skill.icon}
                    </span>
                    <span className="text-[10px] text-gray-400 font-mono">x{equippedItemCount}</span>
                </div>
            ) : (
                <span className="text-[10px] text-gray-600">-</span>
            )}
        </div>
      </div>

      {/* Stats Grid - Full width on mobile */}
      <div className="flex-grow w-full grid grid-cols-3 sm:grid-cols-3 gap-1 sm:gap-4">
        {renderBar(t.stats.sla, slaTime, slaConfig.color, slaConfig.text)}
        {renderBar(t.stats.morale, teamMorale, "bg-gradient-to-r from-red-600 to-blue-500")}
        {renderBar(t.stats.quality, ticketQuality, "bg-gradient-to-r from-yellow-600 to-yellow-300")}
      </div>

      {/* Act Info & Inventory - Hidden on mobile, shown on desktop */}
      <div className="hidden md:flex flex-col items-end gap-2 min-w-[150px] border-l border-gray-700 pl-4">
        <div className="font-vt323 text-right">
            <div className="text-xl text-green-400 mb-1 drop-shadow-[0_0_5px_rgba(74,222,128,0.5)]">{currentAct.split(':')[0]}</div>
            <div className={`text-xs uppercase tracking-widest ${gameStatus === 'active' ? 'text-gray-400' : gameStatus === 'won' ? 'text-green-400' : 'text-red-500'}`}>
                {t.stats.statusLabel}: {gameStatus}
            </div>
        </div>

        {/* Active Skill Display */}
        <div className="flex items-center gap-2 bg-black/40 px-2 py-1 rounded border border-gray-600">
            <span className="text-xs text-gray-500 font-vt323">{t.stats.itemLabel}:</span>
            {skill ? (
                <div className="flex items-center gap-1">
                    <span className="text-sm text-yellow-400 font-bold flex items-center gap-1" title={skillDescription}>
                        {skill.icon} <span className="hidden lg:inline">{skillName}</span>
                    </span>
                    <span className={`text-xs font-mono ${equippedItemCount === 0 ? 'text-red-400' : 'text-gray-400'}`}>
                        x{equippedItemCount}
                    </span>
                </div>
            ) : (
                <span className="text-xs text-gray-600 italic">{t.stats.none}</span>
            )}
        </div>
      </div>
    </div>
  );
};

export default StatsPanel;
