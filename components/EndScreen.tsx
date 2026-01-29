import React, { useState, useMemo } from 'react';
import { GameState, CharacterRole, WrongAnswer } from '../types';
import { ACT_2_CORE_SCENARIOS } from '../constants';
import { useTranslation, formatMessage } from '../translations';
import { useSkillTranslation } from '../translations/helpers';

interface EndScreenProps {
  gameState: GameState;
  onReplay: () => void;
}

const EndScreen: React.FC<EndScreenProps> = ({ gameState, onReplay }) => {
  const { t } = useTranslation();
  const { playerName, selectedCharacter, selectedSkill, ticketQuality, teamMorale, slaTime, gameStatus, wrongAnswers = [] } = gameState;
  const skillTranslation = useSkillTranslation(selectedSkill?.id ?? '');
  const victory = gameStatus === 'won';
  const charName = selectedCharacter?.name || t.endScreen.unknown;
  const skillName = selectedSkill ? (skillTranslation.name || selectedSkill.name) : t.endScreen.standardEquipment;
  const completed = gameState.completedScenarios || [];
  const [showWrongAnswers, setShowWrongAnswers] = useState(false);
  
  // Memoize report number to prevent changes on re-render
  const reportNumber = useMemo(() => Math.floor(1000 + Math.random() * 9000), []);
  
  // Grade Calculation (Weighted)
  const score = (ticketQuality * 0.4) + (teamMorale * 0.3) + (slaTime * 0.3);
  
  let grade = 'F';
  if (score >= 95) grade = 'S';
  else if (score >= 85) grade = 'A';
  else if (score >= 70) grade = 'B';
  else if (score >= 50) grade = 'C';
  else if (score >= 30) grade = 'D';

  const title = victory ? t.endScreen.victory.title : t.endScreen.defeat.title;
  const themeColor = victory ? "text-green-500" : "text-red-600";
  const borderColor = victory ? "border-green-600" : "border-red-600";
  const stampStyle = victory 
    ? "border-green-500 text-green-500 bg-green-900/20 rotate-[-12deg]" 
    : "border-red-500 text-red-500 bg-red-900/20 rotate-[12deg]";

  // Dynamic Narrative Generation
  const generateNarrative = () => {
    let lines: string[] = [];
    const act2CoreMissing = ACT_2_CORE_SCENARIOS.filter(id => !completed.includes(id));

    // 1. Role Specific Outcome
    if (selectedCharacter) {
        switch (selectedCharacter.role) {
            case CharacterRole.SERVICE_DESK:
                lines.push(victory 
                    ? t.endScreen.narrative.serviceDesk.victory
                    : t.endScreen.narrative.serviceDesk.defeat);
                break;
            case CharacterRole.IAM:
                lines.push(victory
                    ? t.endScreen.narrative.iam.victory
                    : t.endScreen.narrative.iam.defeat);
                break;
            case CharacterRole.INFRASTRUCTURE:
                lines.push(victory
                    ? t.endScreen.narrative.infrastructure.victory
                    : t.endScreen.narrative.infrastructure.defeat);
                break;
            case CharacterRole.DEVELOPER:
                lines.push(victory
                    ? t.endScreen.narrative.developer.victory
                    : t.endScreen.narrative.developer.defeat);
                break;
            case CharacterRole.LICENSING:
                lines.push(victory
                    ? t.endScreen.narrative.licensing.victory
                    : t.endScreen.narrative.licensing.defeat);
                break;
            case CharacterRole.ERP:
                lines.push(victory
                    ? t.endScreen.narrative.erp.victory
                    : t.endScreen.narrative.erp.defeat);
                break;
            case CharacterRole.PURCHASING:
                lines.push(victory
                    ? t.endScreen.narrative.purchasing.victory
                    : t.endScreen.narrative.purchasing.defeat);
                break;
            default:
                lines.push(victory ? t.endScreen.narrative.default.victory : t.endScreen.narrative.default.defeat);
        }
    }

    // 1b. Lernpfad-Hinweise
    if (act2CoreMissing.length > 0) {
        lines.push(t.endScreen.warnings.missedLearning);
    }

    // 2. Skill Impact
    if (selectedSkill) {
        if (selectedSkill.id === 'ITIL_BOOK') {
            lines.push(victory ? t.endScreen.skillImpact.itilBook.victory : t.endScreen.skillImpact.itilBook.defeat);
        } else if (selectedSkill.id === 'COFFEE') {
            lines.push(victory ? t.endScreen.skillImpact.coffee.victory : t.endScreen.skillImpact.coffee.defeat);
        } else if (selectedSkill.id === 'DEBUGGER') {
            lines.push(victory ? t.endScreen.skillImpact.debugger.victory : t.endScreen.skillImpact.debugger.defeat);
        } else if (selectedSkill.id === 'RUBBER_DUCK') {
            lines.push(victory ? t.endScreen.skillImpact.rubberDuck.victory : t.endScreen.skillImpact.rubberDuck.defeat);
        }
    }

    // 3. Performance Nuance
    if (ticketQuality < 40) lines.push(t.endScreen.warnings.lowQuality);
    if (teamMorale < 30) lines.push(t.endScreen.warnings.lowMorale);
    if (slaTime < 20) lines.push(t.endScreen.warnings.lowSla);
    if (!victory) {
        if (slaTime <= 0) lines.push(t.endScreen.warnings.defeatSla);
        if (teamMorale <= 0) lines.push(t.endScreen.warnings.defeatMorale);
        if (ticketQuality <= 0) lines.push(t.endScreen.warnings.defeatQuality);
    }
    if (score > 90) lines.push(t.endScreen.warnings.highScore);
    
    // 4. Wrong answers summary
    if (wrongAnswers.length > 0) {
        lines.push(formatMessage(t.endScreen.warnings.wrongDecisions, { count: wrongAnswers.length }));
    }

    return lines.join(" ");
  };

  // Render wrong answers section
  const renderWrongAnswersSection = () => {
    if (wrongAnswers.length === 0) return null;
    
    return (
      <div className="mt-6">
        <button
          onClick={() => setShowWrongAnswers(!showWrongAnswers)}
          className="w-full px-4 py-2 bg-orange-900/50 border border-orange-600 text-orange-400 font-vt323 text-lg rounded hover:bg-orange-800/50 transition-all flex items-center justify-between"
          aria-expanded={showWrongAnswers}
          aria-controls="wrong-answers-list"
        >
          <span>⚠️ {t.endScreen.errorAnalysis} ({wrongAnswers.length} {t.endScreen.errors})</span>
          <span className="text-xl" aria-hidden="true">{showWrongAnswers ? '▲' : '▼'}</span>
        </button>
        
        {showWrongAnswers && (
          <div id="wrong-answers-list" className="mt-4 space-y-4 animate-fade-in" role="list">
            {wrongAnswers.map((wa) => (
              <div key={wa.scenarioId} className="bg-black/60 border border-orange-700/50 rounded-lg p-4 text-left" role="listitem">
                <div className="font-press-start text-xs text-orange-400 mb-2">
                  {wa.scenarioTitle}
                </div>
                <div className="font-vt323 text-base space-y-2">
                  <div className="flex items-start gap-2">
                    <span className="text-red-500 font-bold" aria-hidden="true">✗</span>
                    <span className="text-red-300">{t.endScreen.yourChoice} {wa.selectedOption}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-green-500 font-bold" aria-hidden="true">✓</span>
                    <span className="text-green-300">{t.endScreen.correctWas} {wa.correctOption}</span>
                  </div>
                  <div className="mt-2 text-gray-400 text-sm border-t border-gray-700 pt-2">
                    {wa.explanation}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-full text-center px-2 sm:px-4 relative z-20 overflow-y-auto py-4 sm:py-8 animate-fade-in">
        <h1 className={`text-3xl sm:text-4xl md:text-7xl font-stranger mb-4 sm:mb-6 drop-shadow-lg ${themeColor} animate-pulse tracking-widest`}>
            {title}
        </h1>
        
        {/* REPORT CARD */}
        <div className={`w-full max-w-2xl bg-gray-900 border-2 sm:border-4 ${borderColor} p-3 sm:p-6 rounded-xl shadow-[0_0_50px_rgba(0,0,0,0.8)] relative`}>
             
             {/* Dynamic Grade Stamp */}
             <div className={`absolute top-2 right-2 sm:top-4 sm:right-4 border-2 sm:border-4 rounded-full w-16 h-16 sm:w-24 sm:h-24 flex items-center justify-center transform backdrop-blur-sm z-10 ${stampStyle} shadow-lg`}>
                <span className="font-press-start text-3xl sm:text-5xl">{grade}</span>
             </div>

             <div className="text-left font-mono space-y-3 sm:space-y-4 text-gray-300">
                <div className="border-b border-gray-600 pb-2 mb-3 sm:mb-4 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-2">
                    <span className="text-base sm:text-xl font-bold text-white tracking-wider">{t.endScreen.reportNumber} #{reportNumber}</span>
                    <span className={`text-xs px-2 py-1 text-white rounded font-bold ${victory ? 'bg-green-800' : 'bg-red-800'}`}>
                        {victory ? t.endScreen.statusResolved : t.endScreen.statusCritical}
                    </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 sm:gap-y-6 gap-x-4 text-sm font-vt323 text-lg sm:text-xl">
                    <div className="border-l-2 border-gray-700 pl-3">
                        <span className="block text-gray-500 text-xs font-mono uppercase">{selectedCharacter?.name || t.endScreen.agent}</span>
                        <span className="text-white uppercase tracking-widest">{playerName || t.endScreen.unknown}</span>
                    </div>
                    <div className="border-l-2 border-gray-700 pl-3">
                        <span className="block text-gray-500 text-xs font-mono">{t.endScreen.role}</span>
                        <span className={`text-white uppercase tracking-widest ${selectedCharacter?.themeColor?.split(' ')[0] || 'text-white'}`}>
                            {selectedCharacter?.role.split('(')[0] || t.endScreen.unknown}
                        </span>
                    </div>
                    <div className="border-l-2 border-gray-700 pl-3">
                        <span className="block text-gray-500 text-xs font-mono">{t.endScreen.equipment}</span>
                        <span className="text-yellow-400 flex items-center gap-2">
                            {selectedSkill?.icon} {skillName}
                        </span>
                    </div>
                    <div className="border-l-2 border-gray-700 pl-3">
                        <span className="block text-gray-500 text-xs font-mono">{t.endScreen.sector}</span>
                        <span className="text-red-400">{t.endScreen.sectorLab}</span>
                    </div>
                </div>

                <div className="bg-black/50 p-3 sm:p-4 rounded border border-gray-700 mt-4 sm:mt-6 shadow-inner relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                    <p className="font-vt323 text-base sm:text-xl leading-relaxed text-gray-300 text-justify">
                        {generateNarrative()}
                    </p>
                </div>

                <div className="grid grid-cols-3 gap-1 sm:gap-2 mt-3 sm:mt-4 text-center">
                    <div className="bg-gray-800 p-2 sm:p-3 rounded border border-gray-700 group">
                        <div className="text-[8px] sm:text-[10px] text-gray-500 mb-1 group-hover:text-yellow-400 transition-colors">{t.endScreen.quality}</div>
                        <div className={`font-bold text-lg sm:text-2xl ${ticketQuality > 70 ? 'text-green-400' : 'text-red-400'}`}>
                            {Math.round(ticketQuality)}%
                        </div>
                    </div>
                    <div className="bg-gray-800 p-2 sm:p-3 rounded border border-gray-700 group">
                        <div className="text-[8px] sm:text-[10px] text-gray-500 mb-1 group-hover:text-blue-400 transition-colors">{t.endScreen.morale}</div>
                        <div className={`font-bold text-lg sm:text-2xl ${teamMorale > 70 ? 'text-blue-400' : 'text-red-400'}`}>
                            {Math.round(teamMorale)}%
                        </div>
                    </div>
                    <div className="bg-gray-800 p-2 sm:p-3 rounded border border-gray-700 group">
                        <div className="text-[8px] sm:text-[10px] text-gray-500 mb-1 group-hover:text-purple-400 transition-colors">{t.endScreen.sla}</div>
                        <div className={`font-bold text-lg sm:text-2xl ${slaTime > 50 ? 'text-purple-400' : 'text-red-400'}`}>
                            {Math.round(slaTime)}%
                        </div>
                    </div>
                </div>

                {/* Wrong Answers Section */}
                {renderWrongAnswersSection()}

                {/* Contribution Section */}
                <div className="mt-6 sm:mt-8 bg-gray-900/60 p-4 sm:p-6 rounded-lg border-2 border-cyan-800 shadow-[0_0_20px_rgba(34,211,238,0.2)]">
                    <h4 className="text-cyan-400 font-press-start text-xs sm:text-sm mb-3 text-center flex items-center justify-center gap-2">
                        <span>💖</span>
                        <span>{t.endScreen.contributeTitle}</span>
                        <span>💖</span>
                    </h4>
                    <p className="font-vt323 text-base sm:text-xl text-gray-300 text-center mb-4">
                        {t.endScreen.contributeText}
                    </p>
                    <a 
                        href="https://github.com/voku/STRANGER_IT_THINGS" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="block w-full px-4 sm:px-6 py-3 bg-gray-800 border-2 border-cyan-600 text-cyan-400 hover:bg-cyan-600 hover:text-black font-press-start text-xs sm:text-sm rounded transition-all shadow-[0_0_15px_rgba(34,211,238,0.3)] hover:shadow-[0_0_25px_rgba(34,211,238,0.6)] active:scale-95 text-center"
                    >
                        <span className="inline-flex items-center gap-2">
                            <span>🌟</span>
                            <span>{t.endScreen.contributeLink}</span>
                            <span>🌟</span>
                        </span>
                    </a>
                </div>

                 {/* Single Replay Button */}
                 <div className="mt-6 sm:mt-8 w-full">
                    <button 
                        onClick={onReplay}
                        className="w-full px-4 sm:px-6 py-3 sm:py-4 bg-gray-800 border-2 border-yellow-600 text-yellow-500 hover:bg-yellow-600 hover:text-black font-press-start text-xs sm:text-sm rounded transition-all shadow-[0_0_15px_rgba(234,179,8,0.3)] hover:shadow-[0_0_25px_rgba(234,179,8,0.6)] active:scale-95"
                    >
                        🎮 {t.endScreen.replayButton}
                    </button>
                </div>

             </div>
        </div>
    </div>
  );
};

export default EndScreen;
