import React, { useState } from 'react';
import { GameState, CharacterRole, WrongAnswer } from '../types';
import { ACT_2_CORE_SCENARIOS } from '../constants';

interface EndScreenProps {
  gameState: GameState;
  onReplay: () => void;
}

const EndScreen: React.FC<EndScreenProps> = ({ gameState, onReplay }) => {
  const { playerName, selectedCharacter, selectedSkill, ticketQuality, teamMorale, slaTime, gameStatus, wrongAnswers } = gameState;
  const victory = gameStatus === 'won';
  const charName = selectedCharacter?.name || "Unbekannter Agent";
  const skillName = selectedSkill?.name || "Standard-Ausrüstung";
  const completed = gameState.completedScenarios || [];
  const [showWrongAnswers, setShowWrongAnswers] = useState(false);
  
  // Grade Calculation (Weighted)
  const score = (ticketQuality * 0.4) + (teamMorale * 0.3) + (slaTime * 0.3);
  
  let grade = 'F';
  if (score >= 95) grade = 'S';
  else if (score >= 85) grade = 'A';
  else if (score >= 70) grade = 'B';
  else if (score >= 50) grade = 'C';
  else if (score >= 30) grade = 'D';

  const title = victory ? "MISSION ERFÜLLT" : "SYSTEMFEHLER";
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
                    ? "Der Service Desk hat das Signal erfolgreich vom Rauschen getrennt. Der User-Nebel hat sich aufgelöst."
                    : "Der Service Desk wurde von Hysterie überrannt. Unfähig, Störungen von Anfragen zu unterscheiden, kollabierte die Warteschlange.");
                break;
            case CharacterRole.IAM:
                lines.push(victory
                    ? "Identitätsgrenzen durchgesetzt. Das Prinzip der geringsten Rechte hat das Königreich gerettet."
                    : "Zugriffskontrollfehler. Berechtigungen wurden ohne Prüfung vergeben, die Tore stehen weit offen.");
                break;
            case CharacterRole.INFRASTRUCTURE:
                lines.push(victory
                    ? "Infrastruktur-Integrität gehalten. Du hast die Uptime erfolgreich gegen Fehlalarme verteidigt."
                    : "Kritische Systeme ignoriert, während Phantomen nachgejagt wurde. Die physikalische Ebene ist kompromittiert.");
                break;
            case CharacterRole.DEVELOPER:
                lines.push(victory
                    ? "Produktions-Code bewahrt. Du hast echte Bugs von gefährlichem Feature-Creep unterschieden."
                    : "Technische Schulden explodiert. Die Codebasis ist nun mit Hotfixes für nicht existente Fehler verschmutzt.");
                break;
            case CharacterRole.LICENSING:
                lines.push(victory
                    ? "Compliance erreicht. Das Audit ergab null Abweichungen."
                    : "Schatten-IT entdeckt. Unlizenzierte Software wuchert im Netzwerk.");
                break;
            case CharacterRole.ERP:
                lines.push(victory
                    ? "Prozesslogik wiederhergestellt. Die Bücher sind ausgeglichen und die Workflows sauber."
                    : "Datenkorruption in den Kernmodulen. Die Geschäftslogik ist zerbrochen.");
                break;
            case CharacterRole.PURCHASING:
                lines.push(victory
                    ? "Lieferkette gesichert. Kritische Assets kamen gerade noch rechtzeitig an."
                    : "Logistik-Stau. Das Lager ist voll mit Anfragen, aber leer an Lösungen.");
                break;
            default:
                lines.push(victory ? "System stabilisiert." : "Systemkollaps.");
        }
    }

    // 1b. Lernpfad-Hinweise
    if (act2CoreMissing.length > 0) {
        lines.push("Lernpfad verpasst: ITIL-Tempel/Change-Rätsel wurden übersprungen. Klassifizierungsmodell blieb unsauber.");
    }

    // 2. Skill Impact
    if (selectedSkill) {
        if (selectedSkill.id === 'ITIL_BOOK') {
            lines.push(victory ? "Der ITIL-Kodex lieferte die nötige Struktur." : "Selbst die heiligen Texte konnten dieses Chaos nicht verhindern.");
        } else if (selectedSkill.id === 'COFFEE') {
            lines.push(victory ? "Koffeinpegel hielt die kognitive Leistung aufrecht." : "Der Koffein-Absturz kam im denkbar schlechtesten Moment.");
        } else if (selectedSkill.id === 'DEBUGGER') {
            lines.push(victory ? "Die Ursachenanalyse war chirurgisch präzise." : "Der Debugger enthüllte nur noch mehr Fehler.");
        } else if (selectedSkill.id === 'RUBBER_DUCK') {
            lines.push(victory ? "Die Gummiente hörte geduldig zu und führte dich zur Lösung." : "Du sprachst zur Ente, aber die Ente hörte nicht zu.");
        }
    }

    // 3. Performance Nuance
    if (ticketQuality < 40) lines.push("WARNUNG: Klassifizierungsgenauigkeit war kritisch niedrig. Nachschulung empfohlen.");
    if (teamMorale < 30) lines.push("ALARM: Team leidet unter schwerem Burnout.");
    if (slaTime < 20) lines.push("HINWEIS: Mehrere SLA-Verletzungen verzeichnet.");
    if (!victory) {
        if (slaTime <= 0) lines.push("Grund für Niederlage: SLA-Puffer aufgebraucht – Incident-Handling zu langsam.");
        if (teamMorale <= 0) lines.push("Grund für Niederlage: Team-Moral kollabiert – zu viel Ping-Pong oder Druck.");
        if (ticketQuality <= 0) lines.push("Grund für Niederlage: Ticket-Qualität bei 0 – falsche Klassifikation dominierte.");
    }
    if (score > 90) lines.push("BELOBIGUNG: Hervorragende Leistung in allen Metriken.");
    
    // 4. Wrong answers summary
    if (wrongAnswers && wrongAnswers.length > 0) {
        lines.push(`FEHLERANALYSE: ${wrongAnswers.length} falsche Entscheidung(en) getroffen.`);
    }

    return lines.join(" ");
  };

  // Render wrong answers section
  const renderWrongAnswersSection = () => {
    if (!wrongAnswers || wrongAnswers.length === 0) return null;
    
    return (
      <div className="mt-6">
        <button
          onClick={() => setShowWrongAnswers(!showWrongAnswers)}
          className="w-full px-4 py-2 bg-orange-900/50 border border-orange-600 text-orange-400 font-vt323 text-lg rounded hover:bg-orange-800/50 transition-all flex items-center justify-between"
        >
          <span>⚠️ FEHLERANALYSE ({wrongAnswers.length} Fehler)</span>
          <span className="text-xl">{showWrongAnswers ? '▲' : '▼'}</span>
        </button>
        
        {showWrongAnswers && (
          <div className="mt-4 space-y-4 animate-fade-in">
            {wrongAnswers.map((wa, idx) => (
              <div key={idx} className="bg-black/60 border border-orange-700/50 rounded-lg p-4 text-left">
                <div className="font-press-start text-xs text-orange-400 mb-2">
                  {wa.scenarioTitle}
                </div>
                <div className="font-vt323 text-base space-y-2">
                  <div className="flex items-start gap-2">
                    <span className="text-red-500 font-bold">✗</span>
                    <span className="text-red-300">Deine Wahl: {wa.selectedOption}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-green-500 font-bold">✓</span>
                    <span className="text-green-300">Richtig wäre: {wa.correctOption}</span>
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
                    <span className="text-base sm:text-xl font-bold text-white tracking-wider">VORFALLSBERICHT #{Math.floor(1000 + Math.random() * 9000)}</span>
                    <span className={`text-xs px-2 py-1 text-white rounded font-bold ${victory ? 'bg-green-800' : 'bg-red-800'}`}>
                        {victory ? 'GELÖST' : 'KRITISCH'}
                    </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 sm:gap-y-6 gap-x-4 text-sm font-vt323 text-lg sm:text-xl">
                    <div className="border-l-2 border-gray-700 pl-3">
                        <span className="block text-gray-500 text-xs font-mono">AGENT</span>
                        <span className="text-white uppercase tracking-widest">{playerName || 'UNBEKANNT'}</span>
                    </div>
                    <div className="border-l-2 border-gray-700 pl-3">
                        <span className="block text-gray-500 text-xs font-mono">ROLLE</span>
                        <span className={`text-white uppercase tracking-widest ${selectedCharacter?.themeColor?.split(' ')[0] || 'text-white'}`}>
                            {selectedCharacter?.role.split('(')[0] || 'UNBEKANNT'}
                        </span>
                    </div>
                    <div className="border-l-2 border-gray-700 pl-3">
                        <span className="block text-gray-500 text-xs font-mono">AUSRÜSTUNG</span>
                        <span className="text-yellow-400 flex items-center gap-2">
                            {selectedSkill?.icon} {skillName}
                        </span>
                    </div>
                    <div className="border-l-2 border-gray-700 pl-3">
                        <span className="block text-gray-500 text-xs font-mono">SEKTOR</span>
                        <span className="text-red-400">HAWKINS LAB</span>
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
                        <div className="text-[8px] sm:text-[10px] text-gray-500 mb-1 group-hover:text-yellow-400 transition-colors">QUALITÄT</div>
                        <div className={`font-bold text-lg sm:text-2xl ${ticketQuality > 70 ? 'text-green-400' : 'text-red-400'}`}>
                            {Math.round(ticketQuality)}%
                        </div>
                    </div>
                    <div className="bg-gray-800 p-2 sm:p-3 rounded border border-gray-700 group">
                        <div className="text-[8px] sm:text-[10px] text-gray-500 mb-1 group-hover:text-blue-400 transition-colors">MORAL</div>
                        <div className={`font-bold text-lg sm:text-2xl ${teamMorale > 70 ? 'text-blue-400' : 'text-red-400'}`}>
                            {Math.round(teamMorale)}%
                        </div>
                    </div>
                    <div className="bg-gray-800 p-2 sm:p-3 rounded border border-gray-700 group">
                        <div className="text-[8px] sm:text-[10px] text-gray-500 mb-1 group-hover:text-purple-400 transition-colors">SLA</div>
                        <div className={`font-bold text-lg sm:text-2xl ${slaTime > 50 ? 'text-purple-400' : 'text-red-400'}`}>
                            {Math.round(slaTime)}%
                        </div>
                    </div>
                </div>

                {/* Wrong Answers Section */}
                {renderWrongAnswersSection()}

                 {/* Single Replay Button */}
                 <div className="mt-6 sm:mt-8 w-full">
                    <button 
                        onClick={onReplay}
                        className="w-full px-4 sm:px-6 py-3 sm:py-4 bg-gray-800 border-2 border-yellow-600 text-yellow-500 hover:bg-yellow-600 hover:text-black font-press-start text-xs sm:text-sm rounded transition-all shadow-[0_0_15px_rgba(234,179,8,0.3)] hover:shadow-[0_0_25px_rgba(234,179,8,0.6)] active:scale-95"
                    >
                        🎮 NEU STARTEN
                    </button>
                </div>

             </div>
        </div>
    </div>
  );
};

export default EndScreen;
