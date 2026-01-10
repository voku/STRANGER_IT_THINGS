import React from 'react';
import { Skill, Act } from '../types';
import { SKILLS } from '../constants';

interface SkillSelectProps {
  currentAct: Act;
  unlockedSkillIds: string[];
  onSelectSkill: (skill: Skill) => void;
}

const SkillSelect: React.FC<SkillSelectProps> = ({ currentAct, unlockedSkillIds, onSelectSkill }) => {
  
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

  // Find the single best recommended skill that is unlocked
  const recommendedSkillId = SKILLS.find(s => s.targetAct === currentAct && unlockedSkillIds.includes(s.id))?.id;

  return (
    <div className="flex flex-col items-center justify-center h-full p-4 relative z-20">
      <h2 
        data-text="AUSRÜSTUNGSPHASE"
        className="text-4xl md:text-5xl stranger-heading text-center mb-6 tracking-wider animate-pulse"
      >
        AUSRÜSTUNGSPHASE
      </h2>
      
      <p className="font-vt323 text-xl text-yellow-400 mb-8 text-center max-w-2xl border-b border-gray-700 pb-4">
        {getMissionBrief()}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl w-full">
        {SKILLS.map((skill) => {
          const isRecommended = skill.id === recommendedSkillId;
          const isUnlocked = unlockedSkillIds.includes(skill.id);
          
          return (
            <button
                key={skill.id}
                onClick={() => isUnlocked && onSelectSkill(skill)}
                disabled={!isUnlocked}
                className={`
                relative group flex flex-col items-center p-6 border-4 rounded-xl transition-all duration-300
                ${isUnlocked ? `${skill.color} hover:scale-105 hover:shadow-[0_0_20px_currentColor] cursor-pointer` : 'border-gray-800 bg-gray-900 cursor-not-allowed opacity-60'}
                bg-opacity-20 backdrop-blur-sm bg-black
                ${isRecommended && isUnlocked ? 'ring-4 ring-yellow-500/50 transform scale-105 shadow-[0_0_30px_rgba(234,179,8,0.3)]' : ''}
                `}
            >
                {/* Lock Overlay */}
                {!isUnlocked && (
                    <div className="absolute inset-0 z-20 bg-black/50 flex items-center justify-center rounded-lg">
                        <span className="text-5xl drop-shadow-lg">🔒</span>
                    </div>
                )}

                {isRecommended && isUnlocked && (
                    <div className="absolute -top-3 bg-yellow-600 text-black font-bold font-press-start text-[10px] px-3 py-1 rounded shadow-lg z-10">
                        EMPFOHLEN
                    </div>
                )}
                
                <div className={`text-6xl mb-4 filter drop-shadow-lg ${isUnlocked ? 'group-hover:animate-bounce' : 'grayscale opacity-30'}`}>
                    {skill.icon}
                </div>
                
                <h3 className={`font-press-start text-lg mb-2 text-center leading-tight ${isUnlocked ? 'text-white' : 'text-gray-500'}`}>
                    {skill.name}
                </h3>
                
                <div className="w-full h-px bg-white/30 my-3"></div>
                
                <p className={`font-vt323 text-lg text-center leading-tight ${isUnlocked ? 'text-gray-200' : 'text-gray-600'}`}>
                    {skill.description}
                </p>

                {isUnlocked && (
                    <div className="absolute bottom-2 text-xs text-gray-500 uppercase tracking-widest font-mono group-hover:text-white transition-colors">
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