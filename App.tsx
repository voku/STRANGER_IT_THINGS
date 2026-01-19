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
import { CHARACTERS, STORY_SCENARIOS, SKILLS, ACT_2_CORE_SCENARIOS, SLA_DECAY_RATE, DETOUR_PENALTIES } from './constants';
import { Act, Character, GameState, Scenario, MapLocation, Skill, LogEntry, WrongAnswer } from './types';
import { initialGameState } from './utils/gameState';
import { checkGameOver, createLogEntry, clampStat } from './utils/gameHelpers';
import { useGameMechanics } from './hooks/useGameMechanics';
import { useTranslation, formatMessage } from './translations';
import { getTranslatedScenario } from './utils/scenarioTranslation';

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
import LanguageSelector from './components/LanguageSelector';
import CharacterCard from './components/CharacterCard';
import { getRandomSystemMessage } from './services/systemService';

/**
 * Main App Component
 * 
 * Manages the entire game flow from intro to game over.
 * Uses custom hooks for time-based mechanics and helper functions for game logic.
 */
const App: React.FC = () => {
  const { t } = useTranslation();
  const [gameState, setGameState] = useState<GameState>(initialGameState);
  
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
        addLog(t.system.slaExpired, 'SYSTEM');
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
   * Handler: Start game (no name input needed)
   */
  const handleStartGame = () => {
    triggerTransition(t.acts.transitions.selection.title, t.acts.transitions.selection.subtitle, () => {
      setGameState(prev => ({ ...prev, currentScreen: 'CHAR_SELECT' }));
    });
  };

  /**
   * Handler: Select character (sets initial stats and name)
   */
  const handleCharacterSelect = (char: Character) => {
    setGameState(prev => ({ 
        ...prev, 
        selectedCharacter: char,
        playerName: char.name, // Set player name to character name
        slaTime: char.stats.sla,
        teamMorale: char.stats.morale,
        ticketQuality: char.stats.quality
    }));
    
    triggerTransition(t.acts.transitions.equipment.title, t.acts.transitions.equipment.subtitle, () => {
        setGameState(prev => ({ ...prev, currentScreen: 'SKILL_SELECT' }));
    });
  };

  /**
   * Helper: Get Act title and subtitle for transitions
   */
  const getActTransitionInfo = (act: Act): { title: string; subtitle: string } => {
    switch (act) {
      case Act.ACT_1_TICKET:
        return t.acts.transitions.act1;
      case Act.ACT_2_PERSPECTIVE:
        return t.acts.transitions.act2;
      case Act.ACT_3_BOSS:
        return t.acts.transitions.act3;
      case Act.ACT_4_EPILOGUE:
        return t.acts.transitions.act4;
      default:
        return t.acts.transitions.act1;
    }
  };

  /**
   * Handler: Select skill/item for the current act
   */
  const handleSkillSelect = (skill: Skill) => {
    setGameState(prev => ({ ...prev, selectedSkill: skill }));
    
    const actInfo = getActTransitionInfo(gameState.currentAct);
    triggerTransition(actInfo.title, actInfo.subtitle, () => {
        addLog(t.system.restart, 'SYSTEM');
        addLog(formatMessage(t.system.welcome, { name: gameState.selectedCharacter?.name || '' }), 'GM');
        setGameState(prev => ({ ...prev, currentScreen: 'MAP_SELECT' }));
    });
  };

  /**
   * Helper: Handle detour location visits (wrong moves with penalties)
   * @returns true if location is a detour, false otherwise
   */
  const handleDetourLocation = (location: MapLocation): boolean => {
    if (location.id === 'ARCADE') {
        addLog(t.detours.arcade.enter, 'SYSTEM');
        addLog(t.detours.arcade.description, 'GM');
        addLog(formatMessage(t.detours.arcade.penalty, { penalty: DETOUR_PENALTIES.ARCADE_SLA_PENALTY.toString() }), 'SYSTEM');
        setGameState(prev => ({
            ...prev,
            slaTime: clampStat(prev.slaTime - DETOUR_PENALTIES.ARCADE_SLA_PENALTY)
        }));
        return true;
    }
    
    if (location.id === 'FOREST') {
        addLog(t.detours.forest.enter, 'SYSTEM');
        addLog(t.detours.forest.description, 'GM');
        addLog(formatMessage(t.detours.forest.penalty, { penalty: DETOUR_PENALTIES.FOREST_SLA_PENALTY.toString() }), 'SYSTEM');
        setGameState(prev => ({
            ...prev,
            slaTime: clampStat(prev.slaTime - DETOUR_PENALTIES.FOREST_SLA_PENALTY)
        }));
        return true;
    }
    
    if (location.id === 'UPSIDEDOWN') {
        addLog(t.detours.upsidedown.enter, 'SYSTEM');
        addLog(t.detours.upsidedown.description, 'GM');
        addLog(formatMessage(t.detours.upsidedown.penalty, { penalty: DETOUR_PENALTIES.UPSIDEDOWN_MORALE_PENALTY.toString() }), 'SYSTEM');
        setGameState(prev => ({
            ...prev,
            teamMorale: clampStat(prev.teamMorale - DETOUR_PENALTIES.UPSIDEDOWN_MORALE_PENALTY)
        }));
        return true;
    }
    
    return false;
  };

  /**
   * Handler: Select location on map (loads appropriate scenario)
   * 
   * Handles scenario sequencing for Act 2:
   * - First: Role-specific scenario
   * - Then: act2_1 (ITIL basics)
   * - Finally: act2_2 (Change management)
   * 
   * Also handles detour locations (wrong moves) that provide flavor text
   */
  const handleLocationSelect = (location: MapLocation) => {
    setGameState(prev => ({ ...prev, selectedLocation: location }));
    
    // Handle detour locations (no scenarios, just flavor text and penalties)
    if (handleDetourLocation(location)) {
        return;
    }
    
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
                     addLog(formatMessage(t.system.allScenariosCompleted, { location: location.name }), 'SYSTEM');
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
            addLog(t.system.scenarioCompleted, 'SYSTEM');
            return;
        }
        
        // Translate the scenario before using it
        const translatedScenario = getTranslatedScenario(scenarioToLoad, t);
        
        addLog(formatMessage(t.ui.travelTo, { location: location.name }), 'SYSTEM');
        addLog(translatedScenario.description, 'GM');
        setGameState(prev => ({
            ...prev,
            currentScenario: translatedScenario,
            currentScreen: 'GAME'
        }));
    } else {
        addLog(t.system.locationQuiet, 'GM');
    }
  };

  /**
   * Handler: Complete a scenario (applies stat changes and checks game over)
   * 
   * This is the core game logic that:
   * 1. Consumes used item from inventory
   * 2. Applies item effects (including bad item penalties)
   * 3. Applies SLA penalties (base + wrong item penalty)
   * 4. Updates all stats (SLA, morale, quality)
   * 5. Checks for game over conditions
   * 6. Marks scenario as completed (only if correct answer)
   * 7. Handles act progression
   * 8. Awards new items to inventory
   * 
   * @param qualityChange - Change to ticket quality stat
   * @param moraleChange - Change to team morale stat
   * @param outcomeText - Message to display to player
   * @param isCorrect - Whether the answer was correct
   * @param selectedOptionLabel - The option the player selected (for tracking wrong answers)
   * @param itemUsed - Whether an item was used in this scenario
   */
  const handleScenarioComplete = (
    qualityChange: number, 
    moraleChange: number, 
    outcomeText: string, 
    isCorrect: boolean,
    selectedOptionLabel?: string,
    itemUsed: boolean = false
  ) => {
      if (!gameState.currentScenario) return;
      
      const scenarioAct = gameState.currentScenario.act;
      if (scenarioAct !== gameState.currentAct) {
          addLog(t.system.actMismatch, 'SYSTEM');
          return;
      }

      // Track inventory changes
      let newInventory = { ...gameState.itemInventory };

      // Apply item effects if used
      let itemQualityEffect = 0;
      let itemMoraleEffect = 0;
      
      if (itemUsed && gameState.selectedSkill) {
        const skill = SKILLS.find(s => s.id === gameState.selectedSkill?.id);
        if (skill) {
          // Consume item from inventory
          const currentCount = newInventory[skill.id] || 0;
          if (currentCount > 0) {
            newInventory[skill.id] = currentCount - 1;
            addLog(formatMessage(t.system.itemConsumed, { 
              icon: skill.icon, 
              name: skill.name, 
              count: newInventory[skill.id].toString() 
            }), 'SYSTEM');
          }
          
          // Apply bad item effects
          if (skill.isBadItem) {
            itemQualityEffect = skill.qualityEffect || 0;
            itemMoraleEffect = skill.moraleEffect || 0;
            if (itemQualityEffect !== 0 || itemMoraleEffect !== 0) {
              addLog(formatMessage(t.system.itemWarning, { name: skill.name }), 'SYSTEM');
            }
          }
        }
      }

      // Calculate SLA penalty (base + wrong item penalty)
      let slaPenalty = 10; // Base penalty for completing scenario
      
      if (gameState.selectedSkill && itemUsed) {
        const skill = SKILLS.find(s => s.id === gameState.selectedSkill?.id);
        if (skill && skill.targetAct && skill.targetAct !== gameState.currentAct && skill.slaPenalty) {
          slaPenalty += skill.slaPenalty;
          addLog(formatMessage(t.system.wrongItemWarning, { 
            name: skill.name, 
            penalty: skill.slaPenalty.toString() 
          }), 'SYSTEM');
        }
      }
      
      // Update all stats (clamped to 0-100), including item effects
      const newSla = clampStat(gameState.slaTime - slaPenalty);
      const newMorale = clampStat(gameState.teamMorale + moraleChange + itemMoraleEffect);
      const newQuality = clampStat(gameState.ticketQuality + qualityChange + itemQualityEffect);

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
              selectedOption: selectedOptionLabel || t.endScreen.unknown,
              correctOption: correctOption?.label || t.endScreen.unknown,
              explanation: outcomeText
          };
          updatedWrongAnswers.push(wrongAnswer);
          addLog(t.system.wrongDecision, 'SYSTEM');
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
          addLog(gameOverCheck.reason || t.system.systemFailure, 'SYSTEM');
      } else {
          // Handle act progression (only if correct answer)
          if (isCorrect) {
              if (gameState.currentAct === Act.ACT_1_TICKET && gameState.currentScenario?.id === 'act1_1') {
                  // Advance to Act 2
                  nextAct = Act.ACT_2_PERSPECTIVE;
                  newUnlockedLocs.push('SCHOOL');
                  
                  triggerTransition(t.acts.transitions.act2.title, t.acts.transitions.act2.subtitle, () => {
                      addLog(t.system.levelUp, 'SYSTEM');
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
                       
                       triggerTransition(t.acts.transitions.act3.title, t.acts.transitions.act3.subtitle, () => {
                          addLog(t.system.labWarning, 'SYSTEM');
                       });
                       newScreen = 'SKILL_SELECT';
                   }
              }
              else if (gameState.currentAct === Act.ACT_3_BOSS && gameState.currentScenario?.id === 'act3_1') {
                  // Game won!
                  gameStatus = 'won';
                  newScreen = 'GAME_OVER';
                  addLog(t.system.victory, 'SYSTEM');
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
          itemInventory: newInventory,
          currentScenario: null
      }));
  };

  /**
   * Handler: Replay game with same character
   */
  const handleReplay = () => {
    setGameState({ ...initialGameState });
  };

  /**
   * Renders the current screen based on game state
   */
  const renderContent = () => {
    // Intro screen
    if (gameState.currentScreen === 'INTRO') {
      return (
        <div className="flex flex-col items-center justify-center h-full text-center px-4 animate-fade-in">
          {/* Language Selector at top */}
          <div className="absolute top-4 right-4 z-50">
            <LanguageSelector showLabel={false} />
          </div>
          
          <h1 className="text-5xl md:text-8xl font-stranger mb-8 drop-shadow-lg text-red-600 tracking-widest animate-pulse">
            <span className="block">STRANGER</span>
            <span className="block text-blue-500">IT THINGS</span>
          </h1>
          <div className="max-w-2xl mb-8 space-y-4">
            <p className="font-vt323 text-2xl text-red-500">{t.intro.subtitle}</p>
            <p className="font-mono text-lg text-gray-300">
              {t.intro.description}
            </p>
            <p className="font-vt323 text-xl text-yellow-400">
              {t.intro.callToAction}
            </p>
          </div>
          <div className="flex flex-col gap-4 w-full max-w-md">
            <button 
              onClick={handleStartGame}
              className="px-8 py-4 bg-red-700 border-2 border-red-500 text-white font-press-start hover:bg-red-600 hover:scale-105 transition-all text-sm shadow-[0_0_20px_rgba(220,38,38,0.5)] animate-pulse"
            >
              {t.intro.startButton}
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
            {t.characterSelect.title}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl w-full">
            {CHARACTERS.map((char) => (
              <CharacterCard 
                key={char.id}
                character={char}
                onSelect={handleCharacterSelect}
              />
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
          itemInventory={gameState.itemInventory}
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
          completedScenarios={gameState.completedScenarios}
          onSelectLocation={handleLocationSelect}
        />
      );
    }

    // Active game (scenario)
    if (gameState.currentScreen === 'GAME' && gameState.currentScenario) {
      // Calculate location progress
      const getScenarioProgress = () => {
        if (gameState.selectedLocation) {
          const locationScenarios = STORY_SCENARIOS.filter(scenario => {
            if (gameState.selectedLocation!.id === 'MALL' && gameState.selectedLocation!.requiredAct === Act.ACT_1_TICKET) {
              return scenario.id === 'act1_1';
            }
            if (gameState.selectedLocation!.id === 'SCHOOL' && gameState.selectedLocation!.requiredAct === Act.ACT_2_PERSPECTIVE) {
              return scenario.id === `act2_role_${gameState.selectedCharacter?.id}` || scenario.id === 'act2_1' || scenario.id === 'act2_2';
            }
            if (gameState.selectedLocation!.id === 'LAB' && gameState.selectedLocation!.requiredAct === Act.ACT_3_BOSS) {
              return scenario.id === 'act3_1';
            }
            return false;
          });
          
          const total = locationScenarios.length;
          const completed = locationScenarios.filter(s => gameState.completedScenarios.includes(s.id)).length;
          
          return { completed, total, locationName: gameState.selectedLocation.name };
        }
        return null;
      };
      
      const progress = getScenarioProgress();
      
      return (
        <div className="flex flex-col items-center w-full h-full p-4 animate-fade-in overflow-y-auto">
          <div className="max-w-4xl w-full bg-gray-900/80 p-6 rounded-lg border-2 border-gray-700 mb-6 shadow-[0_0_30px_rgba(0,0,0,0.5)]">
            <div className="flex justify-between items-start mb-4">
               <div>
                  <h3 className="text-yellow-500 font-press-start text-sm md:text-lg mb-1">{gameState.currentScenario.title}</h3>
                  <span className="text-gray-400 font-vt323 text-xl">{gameState.currentScenario.environment}</span>
                  {progress && (
                    <div className="mt-2 font-mono text-xs text-cyan-400">
                      📍 {progress.locationName} | {formatMessage(t.ui.progress, { completed: progress.completed.toString(), total: progress.total.toString() })}
                    </div>
                  )}
               </div>
               <div className="bg-red-900/40 text-red-400 px-3 py-1 rounded font-mono text-xs border border-red-800 animate-pulse">
                  {t.ui.priority}
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
                      itemInventory={gameState.itemInventory}
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
                              success ? t.miniGames.logic.accessGranted : t.miniGames.logic.accessDenied,
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
          itemInventory={gameState.itemInventory}
        />
      )}

      {/* Main content area */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden relative z-10">
        {renderContent()}
      </div>

      {/* Terminal log (visible after character selection, hidden on mobile during skill/map select for space) */}
      {gameState.currentScreen !== 'INTRO' && 
       gameState.currentScreen !== 'CHAR_SELECT' && 
       gameState.currentScreen !== 'GAME_OVER' && (
        <div className={`${(gameState.currentScreen === 'SKILL_SELECT' || gameState.currentScreen === 'MAP_SELECT') ? 'hidden md:block' : ''}`}>
          <Terminal history={gameState.history} />
        </div>
      )}
    </RetroContainer>
  );
};

export default App;
