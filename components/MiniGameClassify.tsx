import React, { useState, useMemo } from 'react';
import { Scenario, Skill } from '../types';
import LifecycleDiagram from './LifecycleDiagram';

interface MiniGameClassifyProps {
  scenario: Scenario;
  skill: Skill | null;
  onComplete: (qualityChange: number, moraleChange: number, outcomeText: string, isCorrect: boolean) => void;
}

const MiniGameClassify: React.FC<MiniGameClassifyProps> = ({ scenario, skill, onComplete }) => {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showDiagram, setShowDiagram] = useState(false);
  const [hintRevealed, setHintRevealed] = useState(false);

  // Calculate the best option based on isCorrect flag
  const bestOptionIndex = useMemo(() => {
      if (!scenario.options) return -1;
      return scenario.options.findIndex(opt => opt.isCorrect === true);
  }, [scenario.options]);

  const handleSelect = (index: number) => {
    setSelectedOption(index);
    if (!scenario.options) return;
    const option = scenario.options[index];
    
    // Always show diagram if it's a standard flow type to reinforce learning
    if (option.type === 'INCIDENT' || option.type === 'REQUEST' || option.type === 'CHANGE') {
        setShowDiagram(true);
    } else {
        // For INQUIRY or others, we still might want to show confirmation
        setShowDiagram(false); 
    }
  };

  const handleConfirm = () => {
    if (selectedOption === null || !scenario.options) return;
    const option = scenario.options[selectedOption];
    onComplete(option.qualityChange, option.moraleChange, option.outcome, option.isCorrect ?? true);
  };

  if (!scenario.options) return <div>Datenkorruptionsfehler.</div>;

  // Determine which path to highlight on the diagram
  const getDiagramPath = (): 'INCIDENT' | 'REQUEST' | 'CHANGE' | null => {
      if (selectedOption === null) return null;
      const type = scenario.options![selectedOption].type;
      if (type === 'INCIDENT') return 'INCIDENT';
      if (type === 'REQUEST') return 'REQUEST';
      if (type === 'CHANGE') return 'CHANGE';
      return null;
  };

  const canUseHint = skill?.id === 'ITIL_BOOK' || skill?.id === 'COFFEE' || skill?.id === 'RUBBER_DUCK';

  return (
    <div className="flex flex-col items-center w-full animate-fade-in relative">
      
      {/* Options Grid - Hide/Dim when Diagram is active to focus attention */}
      {!showDiagram && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto w-full mb-8">
            {scenario.options.map((option, idx) => {
                const isRecommended = hintRevealed && idx === bestOptionIndex;
                
                return (
                    <button 
                        key={idx}
                        onClick={() => handleSelect(idx)}
                        disabled={selectedOption !== null}
                        className={`
                            py-6 px-4 border-4 transition-all rounded-lg shadow-lg flex flex-col items-center gap-2 group relative overflow-hidden font-press-start
                            ${option.type === 'INCIDENT' ? 'bg-red-950/60 border-red-600 hover:bg-red-900 text-red-100 hover:shadow-[0_0_15px_red]' : ''}
                            ${option.type === 'REQUEST' ? 'bg-blue-950/60 border-blue-600 hover:bg-blue-900 text-blue-100 hover:shadow-[0_0_15px_blue]' : ''}
                            ${option.type === 'CHANGE' ? 'bg-purple-950/60 border-purple-600 hover:bg-purple-900 text-purple-100 hover:shadow-[0_0_15px_purple]' : ''}
                            ${option.type === 'INQUIRY' ? 'bg-yellow-950/60 border-yellow-600 hover:bg-yellow-900 text-yellow-100 hover:shadow-[0_0_15px_orange]' : ''}
                            hover:scale-105 active:scale-95
                            ${isRecommended ? 'ring-4 ring-green-500 scale-105 shadow-[0_0_30px_rgba(34,197,94,0.6)]' : ''}
                        `}
                        aria-label={`Option ${idx + 1}: ${option.label}`}
                    >
                        {isRecommended && (
                            <div className="absolute top-0 right-0 bg-green-600 text-black text-[10px] font-bold px-2 py-1 font-press-start animate-pulse">
                                EMPFOHLEN
                            </div>
                        )}

                        <div className="text-4xl mb-3 group-hover:animate-bounce filter drop-shadow-md">
                            {option.type === 'INCIDENT' && '🔥'}
                            {option.type === 'REQUEST' && '📦'}
                            {option.type === 'CHANGE' && '✨'}
                            {option.type === 'INQUIRY' && '🔍'}
                        </div>
                        <span className="text-xs md:text-sm text-center leading-relaxed tracking-wider">
                            {option.label}
                        </span>
                    </button>
                );
            })}
        </div>
      )}

      {/* Skill / Hint Button */}
      {!showDiagram && canUseHint && !hintRevealed && scenario.hint && (
          <button 
            onClick={() => setHintRevealed(true)}
            className="mb-6 px-4 py-2 bg-indigo-900 border border-indigo-400 text-indigo-300 font-press-start text-xs rounded shadow-[0_0_10px_rgba(99,102,241,0.5)] hover:bg-indigo-800 animate-pulse"
          >
            {skill.icon} NUTZE {skill.name}
          </button>
      )}

      {/* Hint Display */}
      {hintRevealed && !showDiagram && (
          <div className="mb-6 max-w-xl bg-indigo-950/80 border border-indigo-500 p-4 rounded text-center shadow-[0_0_15px_rgba(99,102,241,0.3)] animate-fade-in-up">
              <span className="text-indigo-300 font-bold font-mono block mb-1">{'>> SYSTEM-HINWEIS ENTSCHLÜSSELT:'}</span>
              <span className="text-white font-vt323 text-lg">{scenario.hint}</span>
              <div className="text-green-400 font-press-start text-xs mt-2">OPTIMALE HANDLUNG MARKIERT</div>
          </div>
      )}

      {/* Lifecycle Diagram - Full Focus Mode */}
      {showDiagram && (
        <div className="w-full flex flex-col items-center animate-zoom-in">
             <div className="bg-black/90 border-4 border-gray-700 p-2 rounded-lg w-full max-w-5xl shadow-[0_0_50px_rgba(0,0,0,0.8)] mb-6 relative overflow-hidden">
                 {/* Retro Header for Diagram */}
                 <div className="absolute top-0 left-0 w-full bg-gray-900 border-b border-gray-700 px-4 py-2 flex justify-between items-center z-10">
                     <span className="text-gray-400 font-press-start text-xs">WORKFLOW SIMULATION V2.1</span>
                     <span className="text-red-500 font-mono text-xs animate-pulse">RECORDING...</span>
                 </div>
                 
                 {/* Scanline overlay for screen effect */}
                 <div className="pointer-events-none absolute inset-0 z-20 opacity-10" style={{background: 'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06))', backgroundSize: '100% 2px, 3px 100%'}}></div>
                 
                 <div className="pt-8 overflow-x-auto">
                    <LifecycleDiagram activePath={getDiagramPath()} className="w-full h-auto min-w-[600px]" />
                 </div>
                 
                 <p className="text-center font-mono text-sm text-green-400 mt-4 mb-2 animate-pulse">
                    &gt; Simulierte Auswirkung auf SLA und Backend-Prozesse...
                 </p>
             </div>

             <div className="flex gap-4">
                <button
                    onClick={() => {
                        setShowDiagram(false);
                        setSelectedOption(null);
                    }}
                    className="px-6 py-3 border-2 border-gray-600 text-gray-400 font-press-start text-sm hover:border-white hover:text-white transition-all rounded hover:bg-gray-800"
                >
                    ZURÜCK
                </button>
                <button
                    onClick={handleConfirm}
                    className="px-8 py-3 bg-red-700 border-2 border-red-500 text-white font-press-start text-sm hover:bg-red-600 hover:scale-105 transition-all rounded shadow-[0_0_20px_rgba(220,38,38,0.5)] animate-pulse"
                >
                    BESTÄTIGEN &gt;&gt;
                </button>
             </div>
        </div>
      )}
      
      {/* Fallback Confirm for Inquiry or other types without Diagram */}
      {!showDiagram && selectedOption !== null && getDiagramPath() === null && (
          <div className="mt-6">
               <button
                    onClick={handleConfirm}
                    className="px-8 py-3 bg-yellow-700 border-2 border-yellow-500 text-white font-press-start text-sm hover:bg-yellow-600 hover:scale-105 transition-all rounded shadow-[0_0_20px_rgba(202,138,4,0.5)]"
                >
                    ANFRAGE SENDEN &gt;&gt;
                </button>
          </div>
      )}

      {!showDiagram && !hintRevealed && (
        <p className="mt-4 text-gray-400 font-vt323 text-xl text-center max-w-2xl animate-pulse">
            Wähle weise. Deine Entscheidung beeinflusst die <span className="text-yellow-400">Team-Moral</span> und die <span className="text-yellow-400">SLA</span>.
        </p>
      )}
    </div>
  );
};

export default MiniGameClassify;