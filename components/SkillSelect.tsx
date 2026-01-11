import React from 'react';
import { Skill, Act, ItemInventory } from '../types';
import { SKILLS } from '../constants';

interface SkillSelectProps {
  currentAct: Act;
  unlockedSkillIds: string[];
  selectedSkill: Skill | null;
  itemInventory: ItemInventory;
  onSelectSkill: (skill: Skill) => void;
}

const SkillSelect: React.FC<SkillSelectProps> = ({ currentAct, unlockedSkillIds, selectedSkill, itemInventory, onSelectSkill }) => {
  
  const getMissionBrief = () => {
      switch(currentAct) {
          case Act.ACT_1_TICKET:
              return "STARTE AKT 1: INCIDENT RESPONSE. Wähle dein Werkzeug für die erste Triage.";
          case Act.ACT_2_PERSPECTIVE:
              return "STARTE AKT 2: PERSPEKTIVENWECHSEL. Die Verwirrung breitet sich aus. Rüste dich für die Tiefenanalyse.";
          case Act.ACT_3_BOSS:
              return "STARTE AKT 3: URSACHENFORSCHUNG. Die letzte Konfrontation. Wähle ein Werkzeug, um das System zu dekonstruieren.";
          default:
              return "WÄHLE DEINE AUSRÜSTUNG";
      }
  };

  // Find the single best recommended skill that is unlocked and not already selected
  const recommendedSkillId = SKILLS.find(s => 
    s.targetAct === currentAct && 
    unlockedSkillIds.includes(s.id) && 
    s.id !== selectedSkill?.id
  )?.id;

  return (
    <div className="flex flex-col items-center justify-center min-h-full p-2 sm:p-4 relative z-20 overflow-y-auto">
      <h2 
        data-text="AUSRÜSTUNGSPHASE"
        className="text-2xl sm:text-4xl md:text-5xl stranger-heading text-center mb-4 sm:mb-6 tracking-wider animate-pulse"
      >
        AUSRÜSTUNGSPHASE
      </h2>
      
      <p className="font-vt323 text-lg sm:text-xl text-yellow-400 mb-4 sm:mb-8 text-center max-w-2xl border-b border-gray-700 pb-4 px-2">
        {getMissionBrief()}
      </p>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 max-w-6xl w-full px-2">
        {SKILLS.map((skill) => {
          const isRecommended = skill.id === recommendedSkillId;
          const isUnlocked = unlockedSkillIds.includes(skill.id);
          const isAlreadyEquipped = selectedSkill?.id === skill.id;
          const itemCount = itemInventory[skill.id] || 0;
          const hasItems = itemCount > 0;
          const isSelectable = isUnlocked && !isAlreadyEquipped && hasItems;
          const isBadItem = skill.isBadItem || false;
          
          return (
            <button
                key={skill.id}
                onClick={() => isSelectable && onSelectSkill(skill)}
                disabled={!isSelectable}
                className={`
                relative group flex flex-col items-center p-3 sm:p-6 border-2 sm:border-4 rounded-xl transition-all duration-300
                ${isSelectable ? `${skill.color} hover:scale-105 hover:shadow-[0_0_20px_currentColor] cursor-pointer active:scale-95` : 'border-gray-800 bg-gray-900 cursor-not-allowed opacity-60'}
                bg-opacity-20 backdrop-blur-sm bg-black
                ${isRecommended && isSelectable ? 'ring-2 sm:ring-4 ring-yellow-500/50 transform scale-105 shadow-[0_0_30px_rgba(234,179,8,0.3)]' : ''}
                ${isAlreadyEquipped ? 'ring-2 sm:ring-4 ring-green-500 border-green-500 opacity-70' : ''}
                ${isBadItem && isUnlocked ? 'ring-2 ring-red-500/50' : ''}
                `}
            >
                {/* Lock Overlay */}
                {!isUnlocked && (
                    <div className="absolute inset-0 z-20 bg-black/50 flex items-center justify-center rounded-lg">
                        <span className="text-3xl sm:text-5xl drop-shadow-lg">🔒</span>
                    </div>
                )}

                {/* No Items Overlay */}
                {isUnlocked && !hasItems && !isAlreadyEquipped && (
                    <div className="absolute inset-0 z-20 bg-black/70 flex items-center justify-center rounded-lg">
                        <div className="text-center">
                            <span className="text-2xl sm:text-4xl drop-shadow-lg block mb-1">📭</span>
                            <span className="text-xs text-gray-400 font-mono">LEER</span>
                        </div>
                    </div>
                )}

                {/* Already Equipped Overlay */}
                {isAlreadyEquipped && (
                    <div className="absolute inset-0 z-20 bg-green-900/30 flex items-center justify-center rounded-lg">
                        <span className="text-2xl sm:text-4xl drop-shadow-lg">✓</span>
                    </div>
                )}

                {/* Item Count Badge */}
                {isUnlocked && hasItems && (
                    <div className={`absolute top-1 right-1 ${isBadItem ? 'bg-red-600' : 'bg-blue-600'} text-white font-bold font-press-start text-[10px] sm:text-xs px-2 py-1 rounded-full shadow-lg z-10`}>
                        x{itemCount}
                    </div>
                )}

                {/* Bad Item Warning */}
                {isBadItem && isUnlocked && (
                    <div className="absolute top-1 left-1 bg-red-600 text-white font-bold font-press-start text-[10px] sm:text-xs px-1 sm:px-2 py-0.5 sm:py-1 rounded shadow-lg z-10 animate-pulse">
                        ⚠️
                    </div>
                )}

                {isRecommended && isSelectable && (
                    <div className="absolute -top-2 sm:-top-3 bg-yellow-600 text-black font-bold font-press-start text-[8px] sm:text-[10px] px-2 sm:px-3 py-1 rounded shadow-lg z-10">
                        EMPFOHLEN
                    </div>
                )}

                {isAlreadyEquipped && (
                    <div className="absolute -top-2 sm:-top-3 bg-green-600 text-black font-bold font-press-start text-[8px] sm:text-[10px] px-2 sm:px-3 py-1 rounded shadow-lg z-10">
                        AUSGERÜSTET
                    </div>
                )}
                
                <div className={`text-4xl sm:text-6xl mb-2 sm:mb-4 filter drop-shadow-lg ${isSelectable ? 'group-hover:animate-bounce' : 'grayscale opacity-30'}`}>
                    {skill.icon}
                </div>
                
                <h3 className={`font-press-start text-xs sm:text-lg mb-1 sm:mb-2 text-center leading-tight ${isUnlocked ? 'text-white' : 'text-gray-500'}`}>
                    {skill.name}
                </h3>
                
                <div className="w-full h-px bg-white/30 my-2 sm:my-3"></div>
                
                <p className={`font-vt323 text-sm sm:text-lg text-center leading-tight ${isUnlocked ? (isBadItem ? 'text-red-300' : 'text-gray-200') : 'text-gray-600'}`}>
                    {skill.description}
                </p>

                {isSelectable && (
                    <div className="absolute bottom-1 sm:bottom-2 text-[8px] sm:text-xs text-gray-500 uppercase tracking-widest font-mono group-hover:text-white transition-colors">
                        Klicken zum Ausrüsten
                    </div>
                )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default SkillSelect;