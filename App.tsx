/**
 * Main Application Component
 * 
 * This is the root component that orchestrates the entire game.
 * It has been refactored into smaller, maintainable modules:
 * 
 * - Game state initialization: utils/gameState.ts
 * - Helper functions: utils/gameHelpers.ts  
 * - Game mechanics (timers): hooks/useGameMechanics.ts
 * 
 * The App component now focuses on:
 * 1. Managing game state with React hooks
 * 2. Coordinating event handlers for user actions
 * 3. Rendering the appropriate screens based on game state
 * 
 * @module App
 */

import React, { useState, useEffect, useCallback } from 'react';
import { CHARACTERS, STORY_SCENARIOS, SKILLS, ACT_2_CORE_SCENARIOS, SLA_DECAY_RATE } from './constants';
import { Act, Character, GameState, Scenario, MapLocation, Skill, LogEntry, WrongAnswer } from './types';
import { initialGameState } from './utils/gameState';
import { checkGameOver, createLogEntry, clampStat } from './utils/gameHelpers';
import { useGameMechanics } from './hooks/useGameMechanics';

// UI Components
import RetroContainer from './components/RetroContainer';
import Terminal from './components/Terminal';
import StatsPanel from './components/StatsPanel';
import MiniGameClassify from './components/MiniGameClassify';
import MiniGameLogic from './components/MiniGameLogic';
import MiniGameMemory from './components/MiniGameMemory';
import MiniGameReflex from './components/MiniGameReflex';
import MiniGameDecipher from './components/MiniGameDecipher';
import HawkinsMap from './components/HawkinsMap';
import SkillSelect from './components/SkillSelect';
import EndScreen from './components/EndScreen';
import SceneTransition from './components/SceneTransition';
import { getRandomSystemMessage } from './services/systemService';

/**
 * Main App Component
 * 
 * Manages the entire game flow from intro to game over.
 * Uses custom hooks for time-based mechanics and helper functions for game logic.
 */
const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>(initialGameState);
  const [nameError, setNameError] = useState(false);
  
  // Transition state for screen animations
  const [transition, setTransition] = useState<{ 
    active: boolean; 
    stage: 'OUT' | 'INTERSTITIAL' | 'IN'; 
    title: string; 
    subtitle?: string 
  }>({
    active: false,
    stage: 'IN',
    title: '',
  });

  /**
   * Ensures selected skill is always unlocked
   * Prevents cheating by selecting locked skills
   */
  useEffect(() => {
    if (gameState.selectedSkill && !gameState.unlockedSkillIds.includes(gameState.selectedSkill.id)) {
        setGameState(prev => ({ ...prev, selectedSkill: null }));
    }
  }, [gameState.selectedSkill, gameState.unlockedSkillIds]);

  /**
   * Adds a message to the game history log
   */
  const addLog = useCallback((text: string, speaker: LogEntry['speaker'] = 'SYSTEM') => {
    setGameState(prev => ({
      ...prev,
      history: [...prev.history, createLogEntry(text, speaker)]
    }));
  }, []);

  /**
   * Handles SLA decay from the timer
   * Called by useGameMechanics hook every SLA_DECAY_INTERVAL
   */
  const handleSlaDecay = useCallback(() => {
    setGameState(prev => {
      const newSla = clampStat(prev.slaTime - SLA_DECAY_RATE);
      
      // Check for game over due to time expiration
      if (newSla <= 0) {
        addLog("SLA TIME EXPIRED: Zeit ist abgelaufen.", 'SYSTEM');
        return {
          ...prev,
          slaTime: 0,
          gameStatus: 'lost' as const,
          currentScreen: 'GAME_OVER' as const
        };
      }
      
      return { ...prev, slaTime: newSla };
    });
  }, [addLog]);

  // Register game mechanics (time-based SLA decay)
  useGameMechanics({
    gameStatus: gameState.gameStatus,
    currentScreen: gameState.currentScreen,
    onSlaDecay: handleSlaDecay
  });

  /**
   * Triggers a screen transition animation
   * 
   * @param title - Main transition text
   * @param subtitle - Optional subtitle
   * @param callback - Function to call after transition completes
   */
  const triggerTransition = (title: string, subtitle?: string, callback?: () => void) => {
    setTransition({ active: true, stage: 'IN', title, subtitle });
    
    setTimeout(() => {
        setTransition(prev => ({ ...prev, stage: 'INTERSTITIAL' }));
        if (callback) callback();
    }, 600);

    setTimeout(() => {
        setTransition(prev => ({ ...prev, stage: 'OUT' }));
    }, 1200);

    setTimeout(() => {
        setTransition(prev => ({ ...prev, active: false }));
    }, 1700); // Faster fade out
  };

  /**
   * Handler: Start game with player name
   */
  const handleStartGame = (name: string) => {
    if (!name || name.trim().length < 2) {
      setNameError(true);
      return;
    }
    setNameError(false);
    setGameState(prev => ({ ...prev, playerName: name, currentScreen: 'CHAR_SELECT' }));
    triggerTransition("DIE AUSWAHL", "Wähle deine Rolle");
  };

  /**
   * Handler: Select character (sets initial stats)
   */
  const handleCharacterSelect = (char: Character) => {
    setGameState(prev => ({ 
        ...prev, 
        selectedCharacter: char,
        slaTime: char.stats.sla,
        teamMorale: char.stats.morale,
        ticketQuality: char.stats.quality
    }));
    
    triggerTransition("DAS WERKZEUG", "Rüste dich aus", () => {
        setGameState(prev => ({ ...prev, currentScreen: 'SKILL_SELECT' }));
    });
  };

  /**
   * Handler: Select skill/item for the current act
   */
  const handleSkillSelect = (skill: Skill) => {
    setGameState(prev => ({ ...prev, selectedSkill: skill }));
    
    triggerTransition("AKT 1", "Das verzerrte Ticket", () => {
        addLog("SYSTEM NEUSTART...", 'SYSTEM');
        addLog(`Willkommen, ${gameState.selectedCharacter?.name}. Der Demogorgon (User) ist unruhig.`, 'GM');
        setGameState(prev => ({ ...prev, currentScreen: 'MAP_SELECT' }));
    });
  };

  /**
   * Handler: Select location on map (loads appropriate scenario)
   * 
   * Handles scenario sequencing for Act 2:
   * - First: Role-specific scenario
   * - Then: act2_1 (ITIL basics)
   * - Finally: act2_2 (Change management)
   */
  const handleLocationSelect = (location: MapLocation) => {
    setGameState(prev => ({ ...prev, selectedLocation: location }));
    
    let scenarioToLoad: Scenario | undefined;

    // Scenario selection logic based on Act and Location
    if (gameState.currentAct === Act.ACT_1_TICKET && location.id === 'MALL') {
        scenarioToLoad = STORY_SCENARIOS.find(s => s.id === 'act1_1');
    } 
    else if (gameState.currentAct === Act.ACT_2_PERSPECTIVE && location.id === 'SCHOOL') {
        // Act 2 scenario sequencing
        if (gameState.selectedCharacter) {
             const roleScenarioId = `act2_role_${gameState.selectedCharacter?.id}`;
             
             if (!gameState.completedScenarios.includes(roleScenarioId)) {
                 // Load role-specific scenario first
                 scenarioToLoad = STORY_SCENARIOS.find(s => s.id === roleScenarioId);
             } else {
                 // Role done, check core scenarios
                 const act2_1_completed = gameState.completedScenarios.includes('act2_1');
                 const act2_2_completed = gameState.completedScenarios.includes('act2_2');
                 
                 if (!act2_1_completed) {
                     scenarioToLoad = STORY_SCENARIOS.find(s => s.id === 'act2_1');
                 } else if (!act2_2_completed) {
                     scenarioToLoad = STORY_SCENARIOS.find(s => s.id === 'act2_2');
                 } else {
                     addLog(`Alle Szenarien in ${location.name} wurden abgeschlossen.`, 'SYSTEM');
                     return;
                 }
             }
        }
        if (!scenarioToLoad) scenarioToLoad = STORY_SCENARIOS.find(s => s.id === 'act2_1');
    }
    else if (gameState.currentAct === Act.ACT_3_BOSS && location.id === 'LAB') {
        scenarioToLoad = STORY_SCENARIOS.find(s => s.id === 'act3_1');
    }

    if (scenarioToLoad) {
        // Prevent replaying completed scenarios
        if (gameState.completedScenarios.includes(scenarioToLoad.id)) {
            addLog(`Dieses Szenario wurde bereits erfolgreich abgeschlossen.`, 'SYSTEM');
            return;
        }
        
        addLog(`Reise nach ${location.name}...`, 'SYSTEM');
        addLog(scenarioToLoad.description, 'GM');
        setGameState(prev => ({
            ...prev,
            currentScenario: scenarioToLoad || null,
            currentScreen: 'GAME'
        }));
    } else {
        addLog(`Dieser Ort scheint momentan ruhig. Zu ruhig.`, 'GM');
    }
  };

  /**
   * Handler: Complete a scenario (applies stat changes and checks game over)
   * 
   * This is the core game logic that:
   * 1. Applies SLA penalties (base + wrong item penalty)
   * 2. Updates all stats (SLA, morale, quality)
   * 3. Checks for game over conditions
   * 4. Marks scenario as completed (only if correct answer)
   * 5. Handles act progression
   * 
   * @param qualityChange - Change to ticket quality stat
   * @param moraleChange - Change to team morale stat
   * @param outcomeText - Message to display to player
   * @param isCorrect - Whether the answer was correct
   * @param selectedOptionLabel - The option the player selected (for tracking wrong answers)
   */
  const handleScenarioComplete = (
    qualityChange: number, 
    moraleChange: number, 
    outcomeText: string, 
    isCorrect: boolean,
    selectedOptionLabel?: string
  ) => {
      if (!gameState.currentScenario) return;
      
      const scenarioAct = gameState.currentScenario.act;
      if (scenarioAct !== gameState.currentAct) {
          addLog("Akt-Mismatch: Abschluss zählt nicht zur Progression.", 'SYSTEM');
          return;
      }

      // Calculate SLA penalty (base + wrong item penalty)
      let slaPenalty = 10; // Base penalty for completing scenario
      
      if (gameState.selectedSkill) {
        const skill = SKILLS.find(s => s.id === gameState.selectedSkill?.id);
        if (skill && skill.targetAct && skill.targetAct !== gameState.currentAct && skill.slaPenalty) {
          slaPenalty += skill.slaPenalty;
          addLog(`WARNUNG: ${skill.name} ist nicht optimal für diesen Akt. -${skill.slaPenalty}% SLA.`, 'SYSTEM');
        }
      }
      
      // Update all stats (clamped to 0-100)
      const newSla = clampStat(gameState.slaTime - slaPenalty);
      const newMorale = clampStat(gameState.teamMorale + moraleChange);
      const newQuality = clampStat(gameState.ticketQuality + qualityChange);

      // Log outcome
      addLog(outcomeText, 'SYSTEM');

      // Track completion (only if correct)
      let updatedCompleted = [...gameState.completedScenarios];
      let updatedWrongAnswers = [...gameState.wrongAnswers];
      
      if (isCorrect && !updatedCompleted.includes(gameState.currentScenario.id)) {
          updatedCompleted.push(gameState.currentScenario.id);
      }
      
      // Track wrong answers for end screen explanation (don't end game immediately)
      if (!isCorrect && gameState.currentScenario.options) {
          const correctOption = gameState.currentScenario.options.find(o => o.isCorrect === true);
          const wrongAnswer: WrongAnswer = {
              scenarioId: gameState.currentScenario.id,
              scenarioTitle: gameState.currentScenario.title,
              selectedOption: selectedOptionLabel || 'Unbekannt',
              correctOption: correctOption?.label || 'Unbekannt',
              explanation: outcomeText
          };
          updatedWrongAnswers.push(wrongAnswer);
          addLog("HINWEIS: Falsche Entscheidung getroffen. Du kannst weiterspielen, aber beachte die Auswirkungen auf deine Stats.", 'SYSTEM');
      }

      // Check game over conditions (only from stats, not from wrong answers)
      const gameOverCheck = checkGameOver(newSla, newMorale, newQuality);
      
      // Initialize next state
      let nextAct = gameState.currentAct;
      let newScreen: GameState['currentScreen'] = 'MAP_SELECT';
      let gameStatus: GameState['gameStatus'] = 'active';
      let newUnlockedLocs = [...gameState.unlockedLocationIds];
      let newUnlockedSkills = [...gameState.unlockedSkillIds];

      // Handle game over from stats (not from wrong answers anymore)
      if (gameOverCheck.isGameOver) {
          gameStatus = 'lost';
          newScreen = 'GAME_OVER';
          addLog(gameOverCheck.reason || "SYSTEM FAILURE: Kritische Grenzwerte unterschritten.", 'SYSTEM');
      } else {
          // Handle act progression (only if correct answer)
          if (isCorrect) {
              if (gameState.currentAct === Act.ACT_1_TICKET && gameState.currentScenario?.id === 'act1_1') {
                  // Advance to Act 2
                  nextAct = Act.ACT_2_PERSPECTIVE;
                  newUnlockedLocs.push('SCHOOL');
                  newUnlockedSkills.push('COFFEE');
                  
                  triggerTransition("AKT 2", "Das Perspektiven-Labyrinth", () => {
                      addLog("Level Up! Ort freigeschaltet: HAWKINS HIGH", 'SYSTEM');
                      addLog("Neues Item verfügbar: SCHWARZER KAFFEE", 'SYSTEM');
                  });
                  newScreen = 'SKILL_SELECT';
              }
              else if (gameState.currentAct === Act.ACT_2_PERSPECTIVE) {
                   // Check if all core scenarios are done
                   const act2CoreDone = ACT_2_CORE_SCENARIOS.every(id => updatedCompleted.includes(id));
                   if (act2CoreDone) {
                       // Advance to Act 3
                       nextAct = Act.ACT_3_BOSS;
                       newUnlockedLocs.push('LAB');
                       newUnlockedSkills.push('DEBUGGER');
                       
                       triggerTransition("AKT 3", "Der Modell-Endgegner", () => {
                          addLog("WARNUNG: Hohe Energie-Signatur im HAWKINS LAB.", 'SYSTEM');
                          addLog("Bonus Item freigeschaltet: ROOT CAUSE ANALYZER", 'SYSTEM');
                       });
                       newScreen = 'SKILL_SELECT';
                   }
              }
              else if (gameState.currentAct === Act.ACT_3_BOSS && gameState.currentScenario?.id === 'act3_1') {
                  // Game won!
                  gameStatus = 'won';
                  newScreen = 'GAME_OVER';
                  addLog("SIEG! Der Modell-Endgegner wurde besiegt. Das System ist stabil.", 'SYSTEM');
              }
          }
      }

      // Apply all updates
      setGameState(prev => ({
          ...prev,
          slaTime: newSla,
          teamMorale: newMorale,
          ticketQuality: newQuality,
          completedScenarios: updatedCompleted,
          wrongAnswers: updatedWrongAnswers,
          currentAct: nextAct,
          currentScreen: newScreen,
          gameStatus: gameStatus,
          unlockedLocationIds: newUnlockedLocs,
          unlockedSkillIds: newUnlockedSkills,
          currentScenario: null
      }));
  };

  /**
   * Handler: Replay game with same character
   */
  const handleReplay = () => {
    setGameState({ ...initialGameState, playerName: gameState.playerName });
  };

  /**
   * Renders the current screen based on game state
   */
  const renderContent = () => {
    // Intro screen
    if (gameState.currentScreen === 'INTRO') {
      return (
        <div className="flex flex-col items-center justify-center h-full text-center px-4 animate-fade-in">
          <h1 className="text-5xl md:text-8xl font-stranger mb-8 drop-shadow-lg text-red-600 tracking-widest animate-pulse">
            <span className="block">STRANGER</span>
            <span className="block text-blue-500">IT THINGS</span>
          </h1>
          <div className="max-w-2xl mb-8 space-y-4">
            <p className="font-vt323 text-2xl text-red-500">HAWKINS INCIDENT CENTER</p>
            <p className="font-mono text-lg text-gray-300">
              1986. Eine Störung aus dem Upside Down bedroht die Infrastruktur. 
              Ist es ein Incident? Ein Request? Oder etwas viel Dunkleres?
            </p>
            <p className="font-vt323 text-xl text-yellow-400">
              Wähle deine Rolle. Rette den Service.
            </p>
          </div>
          <div className="flex flex-col gap-4 w-full max-w-md">
            <input 
              type="text" 
              placeholder="AGENT NAME EINGEBEN..."
              maxLength={20}
              onChange={(e) => setGameState(prev => ({ ...prev, playerName: e.target.value }))}
              onKeyDown={(e) => e.key === 'Enter' && handleStartGame(gameState.playerName)}
              className={`px-4 py-3 bg-black border-2 ${nameError ? 'border-red-500 animate-shake' : 'border-green-600'} text-green-500 font-vt323 text-xl focus:outline-none focus:border-green-400 placeholder-green-800`}
            />
            {nameError && <p className="text-red-500 font-mono text-sm">Name zu kurz (min. 2 Zeichen)</p>}
            <button 
              onClick={() => handleStartGame(gameState.playerName)}
              className="px-8 py-4 bg-red-700 border-2 border-red-500 text-white font-press-start hover:bg-red-600 hover:scale-105 transition-all text-sm shadow-[0_0_20px_rgba(220,38,38,0.5)] animate-pulse"
            >
              INSERT COIN (START)
            </button>
          </div>
        </div>
      );
    }

    // Character selection
    if (gameState.currentScreen === 'CHAR_SELECT') {
      return (
        <div className="flex flex-col items-center w-full h-full p-4 animate-fade-in overflow-y-auto">
          <h2 className="text-3xl md:text-5xl font-stranger mb-8 text-yellow-400 tracking-widest">
            WÄHLE DEINEN CHARAKTER
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl w-full">
            {CHARACTERS.map((char) => (
              <button
                key={char.id}
                onClick={() => handleCharacterSelect(char)}
                className={`p-6 bg-gray-900 border-4 ${char.themeColor} hover:scale-105 transition-all rounded-lg shadow-lg flex flex-col items-center gap-4 font-press-start`}
              >
                <div className="text-6xl">{char.portraitEmoji}</div>
                <h3 className="text-xl">{char.name}</h3>
                <div className="text-xs text-gray-400">{char.role.split('(')[0]}</div>
                <p className="text-xs text-center leading-relaxed text-gray-300">{char.description}</p>
                <div className="flex gap-4 text-xs">
                  <div>SPD: {char.stats.sla}</div>
                  <div>ACC: {char.stats.quality}</div>
                  <div>HP: {char.stats.morale}</div>
                </div>
              </button>
            ))}
          </div>
        </div>
      );
    }

    // Skill selection
    if (gameState.currentScreen === 'SKILL_SELECT') {
      return (
        <SkillSelect 
          currentAct={gameState.currentAct}
          unlockedSkillIds={gameState.unlockedSkillIds}
          selectedSkill={gameState.selectedSkill}
          onSelectSkill={handleSkillSelect}
        />
      );
    }

    // Map selection
    if (gameState.currentScreen === 'MAP_SELECT') {
      return (
        <HawkinsMap 
          playerName={gameState.playerName}
          character={gameState.selectedCharacter!}
          unlockedLocationIds={gameState.unlockedLocationIds}
          currentAct={gameState.currentAct}
          onSelectLocation={handleLocationSelect}
        />
      );
    }

    // Active game (scenario)
    if (gameState.currentScreen === 'GAME' && gameState.currentScenario) {
      return (
        <div className="flex flex-col items-center w-full h-full p-4 animate-fade-in overflow-y-auto">
          <div className="max-w-4xl w-full bg-gray-900/80 p-6 rounded-lg border-2 border-gray-700 mb-6 shadow-[0_0_30px_rgba(0,0,0,0.5)]">
            <div className="flex justify-between items-start mb-4">
               <div>
                  <h3 className="text-yellow-500 font-press-start text-sm md:text-lg mb-1">{gameState.currentScenario.title}</h3>
                  <span className="text-gray-400 font-vt323 text-xl">{gameState.currentScenario.environment}</span>
               </div>
               <div className="bg-red-900/40 text-red-400 px-3 py-1 rounded font-mono text-xs border border-red-800 animate-pulse">
                  PRIORITY: HIGH
               </div>
            </div>

            <div className="font-vt323 text-xl md:text-2xl text-gray-200 leading-relaxed whitespace-pre-line">
                {gameState.currentScenario.description}
            </div>
          </div>

          <div className="w-full">
              {gameState.currentScenario.type === 'TRIAGE' && (
                  <MiniGameClassify 
                      scenario={gameState.currentScenario}
                      skill={gameState.selectedSkill}
                      onComplete={handleScenarioComplete}
                  />
              )}
              
              {gameState.currentScenario.type === 'MODEL_FIX' && (
                  <MiniGameLogic 
                      scenario={gameState.currentScenario}
                      skill={gameState.selectedSkill}
                      onComplete={(success) => {
                          handleScenarioComplete(
                              success ? 20 : -20, 
                              success ? 10 : -10, 
                              success ? "Modell erfolgreich refakturiert." : "Refactoring fehlgeschlagen. Spaghetti-Code entstanden.",
                              success
                          );
                      }}
                  />
              )}

              {gameState.currentScenario.type === 'DECRYPT' && (
                  <MiniGameDecipher
                      scenario={gameState.currentScenario}
                      skill={gameState.selectedSkill}
                      onComplete={(success) => {
                           handleScenarioComplete(
                              success ? 15 : -10,
                              success ? 5 : -5,
                              success ? "Zugriff gewährt." : "Zugriff verweigert.",
                              success
                           );
                      }}
                  />
              )}

              {gameState.currentScenario.type === 'MEMORY' && (
                  <MiniGameMemory 
                      scenario={gameState.currentScenario}
                      skill={gameState.selectedSkill}
                      onComplete={(success) => {
                          handleScenarioComplete(
                              success ? 15 : -10,
                              success ? 5 : -5,
                              success ? "Pattern erkannt." : "Fehlerhafte Zuordnung.",
                              success
                          );
                      }}
                  />
              )}

              {gameState.currentScenario.type === 'REFLEX' && (
                  <MiniGameReflex 
                      scenario={gameState.currentScenario}
                      skill={gameState.selectedSkill}
                      onComplete={(success) => {
                          handleScenarioComplete(
                              success ? 10 : -10,
                              success ? 5 : -5,
                              success ? "Reaktionstest bestanden." : "Zu langsam.",
                              success
                          );
                      }}
                  />
              )}
          </div>
        </div>
      );
    }

    // Game over (win/lose)
    if (gameState.currentScreen === 'GAME_OVER') {
      return (
        <EndScreen 
          gameState={gameState}
          onReplay={handleReplay}
          onFullReset={() => setGameState(initialGameState)}
        />
      );
    }

    return null;
  };

  return (
    <RetroContainer>
      {/* Transition overlay */}
      {transition.active && (
        <SceneTransition 
          title={transition.title}
          subtitle={transition.subtitle}
          stage={transition.stage}
        />
      )}

      {/* Stats panel (visible during gameplay) */}
      {gameState.selectedCharacter && gameState.currentScreen !== 'INTRO' && gameState.currentScreen !== 'CHAR_SELECT' && (
        <StatsPanel 
          character={gameState.selectedCharacter}
          skill={gameState.selectedSkill}
          slaTime={gameState.slaTime}
          teamMorale={gameState.teamMorale}
          ticketQuality={gameState.ticketQuality}
          currentAct={gameState.currentAct}
          gameStatus={gameState.gameStatus}
        />
      )}

      {/* Main content area */}
      <div className="flex-1 overflow-hidden relative z-10">
        {renderContent()}
      </div>

      {/* Terminal log (visible after character selection) */}
      {gameState.currentScreen !== 'INTRO' && gameState.currentScreen !== 'CHAR_SELECT' && (
        <Terminal history={gameState.history} />
      )}
    </RetroContainer>
  );
};

export default App;
