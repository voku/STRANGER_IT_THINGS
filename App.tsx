import React, { useState, useEffect } from 'react';
import { CHARACTERS, INITIAL_SLA, INITIAL_MORALE, INITIAL_QUALITY, STORY_SCENARIOS, SKILLS } from './constants';
import { Act, Character, GameState, LogEntry, Scenario, MapLocation, Skill } from './types';
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

const initialGameState: GameState = {
  currentScreen: 'INTRO',
  currentAct: Act.ACT_1_TICKET,
  selectedCharacter: null,
  selectedSkill: null,
  playerName: '',
  selectedLocation: null,
  unlockedLocationIds: ['MALL'], // Start with Mall unlocked
  unlockedSkillIds: ['RUBBER_DUCK', 'ITIL_BOOK'], // Start with Rubber Duck and ITIL Book
  completedScenarios: [],
  slaTime: INITIAL_SLA,
  teamMorale: INITIAL_MORALE,
  ticketQuality: INITIAL_QUALITY,
  turnCount: 0,
  history: [],
  currentScenario: null,
  isLoading: false,
  gameStatus: 'active'
};

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>(initialGameState);
  const [nameError, setNameError] = useState(false);
  
  // Ensure ausgewählte Items wirklich freigeschaltet sind
  useEffect(() => {
    if (gameState.selectedSkill && !gameState.unlockedSkillIds.includes(gameState.selectedSkill.id)) {
        setGameState(prev => ({ ...prev, selectedSkill: null }));
    }
  }, [gameState.selectedSkill, gameState.unlockedSkillIds]);

  // Transition State
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

  // --- Helpers ---
  const addLog = (text: string, speaker: LogEntry['speaker'] = 'SYSTEM') => {
    setGameState(prev => ({
      ...prev,
      history: [...prev.history, {
        id: Date.now().toString() + Math.random(),
        speaker,
        text,
        timestamp: new Date()
      }]
    }));
  };

  const triggerTransition = (title: string, subtitle?: string, callback?: () => void) => {
    setTransition({ active: true, stage: 'IN', title, subtitle });
    
    setTimeout(() => {
        setTransition(prev => ({ ...prev, stage: 'INTERSTITIAL' }));
        if (callback) callback();
    }, 2000); // Wait for fade in/zoom

    setTimeout(() => {
        setTransition(prev => ({ ...prev, stage: 'OUT', active: false }));
    }, 4500); // Wait for reading time
  };

  // --- Handlers ---

  const handleStartGame = (name: string) => {
    if (!name.trim()) {
        setNameError(true);
        return;
    }
    setGameState(prev => ({ ...prev, playerName: name }));
    
    triggerTransition("DIE AUSWAHL", "Wähle deine Rolle", () => {
        setGameState(prev => ({ ...prev, currentScreen: 'CHAR_SELECT' }));
    });
  };

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

  const handleSkillSelect = (skill: Skill) => {
    setGameState(prev => ({ ...prev, selectedSkill: skill }));
    
    triggerTransition("AKT 1", "Das verzerrte Ticket", () => {
        addLog("SYSTEM NEUSTART...", 'SYSTEM');
        addLog(`Willkommen, ${gameState.selectedCharacter?.name}. Der Demogorgon (User) ist unruhig.`, 'GM');
        setGameState(prev => ({ ...prev, currentScreen: 'MAP_SELECT' }));
    });
  };

  const handleLocationSelect = (location: MapLocation) => {
    setGameState(prev => ({ ...prev, selectedLocation: location }));
    
    let scenarioToLoad: Scenario | undefined;

    // Logic to select scenario based on Act and Location
    if (gameState.currentAct === Act.ACT_1_TICKET && location.id === 'MALL') {
        scenarioToLoad = STORY_SCENARIOS.find(s => s.id === 'act1_1');
    } 
    else if (gameState.currentAct === Act.ACT_2_PERSPECTIVE && location.id === 'SCHOOL') {
        // Find role-specific scenario
        if (gameState.selectedCharacter) {
             scenarioToLoad = STORY_SCENARIOS.find(s => s.id === `act2_role_${gameState.selectedCharacter?.id}`);
        }
        // Fallback if not found (should not happen if constants are aligned)
        if (!scenarioToLoad) scenarioToLoad = STORY_SCENARIOS.find(s => s.id === 'act2_1');
    }
    else if (gameState.currentAct === Act.ACT_3_BOSS && location.id === 'LAB') {
        scenarioToLoad = STORY_SCENARIOS.find(s => s.id === 'act3_1');
    }

    if (scenarioToLoad) {
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

  const handleScenarioComplete = (qualityChange: number, moraleChange: number, outcomeText: string) => {
      if (!gameState.currentScenario) return;
      const scenarioAct = gameState.currentScenario.act;
      if (scenarioAct !== gameState.currentAct) {
          addLog("Akt-Mismatch: Abschluss zählt nicht zur Progression. Bitte zum aktuellen Akt zurückkehren.", 'SYSTEM');
      }

      // 1. Update Stats
      const newSla = Math.max(0, Math.min(100, gameState.slaTime - 10)); // Time passes
      const newMorale = Math.max(0, Math.min(100, gameState.teamMorale + moraleChange));
      const newQuality = Math.max(0, Math.min(100, gameState.ticketQuality + qualityChange));

      // Track abgeschlossenes Szenario
      const updatedCompleted = Array.from(new Set([...gameState.completedScenarios, gameState.currentScenario.id]));

      // 2. Log Outcome
      addLog(outcomeText, 'SYSTEM');

      // 3. Determine if Level/Act Complete
      let nextAct = gameState.currentAct;
      let newScreen: GameState['currentScreen'] = 'MAP_SELECT';
      let gameStatus: GameState['gameStatus'] = 'active';
      let newUnlockedLocs = [...gameState.unlockedLocationIds];
      let newUnlockedSkills = [...gameState.unlockedSkillIds];

      // Check Game Over Conditions
      if (newSla <= 0 || newMorale <= 0 || newQuality <= 0) {
          gameStatus = 'lost';
          newScreen = 'GAME_OVER';
          addLog("SYSTEM FAILURE: Kritische Grenzwerte unterschritten.", 'SYSTEM');
      } else {
          // Act Progression Logic
          if (gameState.currentAct === Act.ACT_1_TICKET && gameState.currentScenario?.id === 'act1_1') {
              // Act 1 Complete -> Act 2
              nextAct = Act.ACT_2_PERSPECTIVE;
              newUnlockedLocs.push('SCHOOL');
              newUnlockedSkills.push('COFFEE'); // Unlock Coffee for Act 2
              
              triggerTransition("AKT 2", "Das Perspektiven-Labyrinth", () => {
                  addLog("Level Up! Ort freigeschaltet: HAWKINS HIGH", 'SYSTEM');
                  addLog("Neues Item verfügbar: SCHWARZER KAFFEE", 'SYSTEM');
              });
              newScreen = 'SKILL_SELECT'; // Let player re-equip for Act 2
          }
          else if (gameState.currentAct === Act.ACT_2_PERSPECTIVE) {
               const act2CoreDone = ['act2_1', 'act2_2'].every(id => updatedCompleted.includes(id));
               if (scenarioAct === Act.ACT_2_PERSPECTIVE && act2CoreDone) {
                   nextAct = Act.ACT_3_BOSS;
                   newUnlockedLocs.push('LAB');
                   newUnlockedSkills.push('DEBUGGER'); // Unlock Debugger for Boss
                   
                   triggerTransition("AKT 3", "Der Modell-Endgegner", () => {
                      addLog("WARNUNG: Hohe Energie-Signatur im HAWKINS LAB.", 'SYSTEM');
                      addLog("Neues Item verfügbar: ROOT CAUSE ANALYZER", 'SYSTEM');
                   });
                   newScreen = 'SKILL_SELECT';
               } else if (scenarioAct === Act.ACT_2_PERSPECTIVE && !act2CoreDone) {
                   addLog("Akt 3 noch gesperrt: ITIL-Tempel und Change-Rätsel abschließen, um den Boss freizuschalten.", 'SYSTEM');
               }
          }
          else if (gameState.currentAct === Act.ACT_3_BOSS && gameState.currentScenario?.id === 'act3_1') {
              // Victory
              gameStatus = 'won';
              newScreen = 'VICTORY';
              addLog("BEDROHUNG ELIMINIERT. SERVICE WIEDERHERGESTELLT.", 'SYSTEM');
          }
      }

      setGameState(prev => ({
          ...prev,
          slaTime: newSla,
          teamMorale: newMorale,
          ticketQuality: newQuality,
          currentAct: nextAct,
          currentScreen: newScreen,
          gameStatus: gameStatus,
          unlockedLocationIds: Array.from(new Set(newUnlockedLocs)),
          unlockedSkillIds: Array.from(new Set(newUnlockedSkills)),
          completedScenarios: updatedCompleted,
          currentScenario: null // Reset active scenario
      }));
  };

  const handleReplay = () => {
      setGameState(initialGameState);
      setTransition({ active: false, stage: 'IN', title: '' });
  };

  // --- Rendering Content based on Screen ---
  const renderContent = () => {
    switch(gameState.currentScreen) {
        case 'INTRO':
            return (
                <div className="flex flex-col items-center justify-center h-full text-center px-4 animate-fade-in-up">
                    <h1 className="text-5xl md:text-8xl font-stranger text-red-600 mb-8 stranger-title tracking-widest leading-none">
                        STRANGER<br/>IT THINGS
                    </h1>
                    <div className="max-w-2xl bg-black/60 border-2 border-red-900/50 p-6 rounded-lg backdrop-blur-sm mb-8 shadow-[0_0_30px_rgba(220,38,38,0.2)]">
                        <p className="font-vt323 text-xl md:text-2xl text-gray-300 leading-relaxed mb-4">
                            HAWKINS INCIDENT CENTER<br/>
                            1986. Eine Störung aus dem Upside Down bedroht die Infrastruktur.
                            Ist es ein Incident? Ein Request? Oder etwas viel Dunkleres?
                        </p>
                        <p className="font-vt323 text-lg text-red-400 animate-pulse">
                            Wähle deine Rolle. Rette den Service.
                        </p>
                    </div>
                    
                    <div className="flex flex-col gap-2 w-full max-w-sm">
                        <input 
                            type="text" 
                            placeholder="AGENT NAME EINGEBEN..." 
                            className={`bg-gray-900 border-2 ${nameError ? 'border-red-500 animate-shake' : 'border-green-800'} text-green-500 font-vt323 text-xl p-3 text-center outline-none focus:border-green-500 transition-colors uppercase`}
                            onChange={(e) => {
                                setGameState(prev => ({ ...prev, playerName: e.target.value }));
                                setNameError(false);
                            }}
                            onKeyDown={(e) => e.key === 'Enter' && handleStartGame(gameState.playerName)}
                            value={gameState.playerName}
                            maxLength={12}
                        />
                        <button 
                            onClick={() => handleStartGame(gameState.playerName)}
                            className="bg-red-900/80 hover:bg-red-800 text-white font-press-start py-4 px-8 rounded border border-red-600 shadow-[0_0_15px_red] transition-all transform hover:scale-105 active:scale-95 text-xs md:text-sm tracking-widest"
                        >
                            INSERT COIN (START)
                        </button>
                    </div>
                </div>
            );
        
        case 'CHAR_SELECT':
            return (
                <div className="flex flex-col items-center h-full p-4 overflow-y-auto">
                    <h2 className="text-3xl font-stranger text-red-500 mb-6 mt-4">WÄHLE DEINEN CHARAKTER</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 w-full max-w-7xl pb-8">
                        {CHARACTERS.map(char => (
                            <button 
                                key={char.id}
                                onClick={() => handleCharacterSelect(char)}
                                className={`group relative p-4 border-2 bg-gray-900/80 backdrop-blur hover:bg-gray-800 transition-all text-left flex flex-col gap-2 ${char.themeColor} hover:scale-105 hover:shadow-[0_0_20px_rgba(255,255,255,0.2)]`}
                            >
                                <div className="absolute top-2 right-2 text-4xl group-hover:animate-bounce">{char.portraitEmoji}</div>
                                <h3 className="font-press-start text-xs md:text-sm text-white mb-1 uppercase leading-snug max-w-[80%]">{char.name}</h3>
                                <div className="text-[10px] font-mono uppercase tracking-widest opacity-70 mb-2">{char.role.split('(')[0]}</div>
                                <p className="font-vt323 text-lg text-gray-300 leading-tight">{char.description}</p>
                                <div className="mt-auto pt-4 flex gap-2 text-[10px] font-mono text-gray-400">
                                    <span className={char.stats.sla > 70 ? 'text-green-400' : 'text-yellow-500'}>SPD: {char.stats.sla}</span>
                                    <span className={char.stats.quality > 70 ? 'text-green-400' : 'text-yellow-500'}>ACC: {char.stats.quality}</span>
                                    <span className={char.stats.morale > 70 ? 'text-green-400' : 'text-yellow-500'}>HP: {char.stats.morale}</span>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
            );

        case 'SKILL_SELECT':
            return (
                <SkillSelect 
                    currentAct={gameState.currentAct} 
                    unlockedSkillIds={gameState.unlockedSkillIds} 
                    onSelectSkill={handleSkillSelect} 
                />
            );

        case 'MAP_SELECT':
            if (!gameState.selectedCharacter) return null;
            return (
                <HawkinsMap 
                    playerName={gameState.playerName}
                    character={gameState.selectedCharacter}
                    unlockedLocationIds={gameState.unlockedLocationIds}
                    currentAct={gameState.currentAct}
                    onSelectLocation={handleLocationSelect}
                />
            );

        case 'GAME':
            if (!gameState.currentScenario) return <div>Lade Fehler...</div>;
            return (
                <div className="flex flex-col items-center justify-center h-full w-full max-w-5xl mx-auto p-4 animate-fade-in">
                    <div className="w-full bg-gray-900/90 border-2 border-gray-600 p-6 rounded-lg shadow-2xl mb-6 relative overflow-hidden">
                        {/* Scenario Header */}
                        <div className="flex justify-between items-start mb-4 border-b border-gray-700 pb-2">
                             <div>
                                <h3 className="text-yellow-500 font-press-start text-sm md:text-lg mb-1">{gameState.currentScenario.title}</h3>
                                <span className="text-gray-400 font-vt323 text-xl">{gameState.currentScenario.environment}</span>
                             </div>
                             <div className="bg-red-900/40 text-red-400 px-3 py-1 rounded font-mono text-xs border border-red-800 animate-pulse">
                                PRIORITY: HIGH
                             </div>
                        </div>

                        {/* Scenario Description */}
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
                                        success ? "Modell erfolgreich refakturiert." : "Refactoring fehlgeschlagen. Spaghetti-Code entstanden."
                                    );
                                }}
                            />
                        )}

                        {/* Fallback for other potential types if extended */}
                        {gameState.currentScenario.type === 'DECRYPT' && (
                            <MiniGameDecipher
                                scenario={gameState.currentScenario}
                                skill={gameState.selectedSkill}
                                onComplete={(success) => {
                                     handleScenarioComplete(
                                        success ? 15 : -10,
                                        success ? 5 : -5,
                                        success ? "Zugriff gewährt." : "Zugriff verweigert."
                                     );
                                }}
                            />
                        )}
                    </div>
                </div>
            );
        
        case 'VICTORY':
        case 'GAME_OVER':
            return (
                <EndScreen 
                    gameState={gameState} 
                    onReplay={() => {
                        setGameState(prev => ({
                            ...initialGameState,
                            playerName: prev.playerName // Keep name
                        }));
                    }}
                    onFullReset={handleReplay}
                />
            );

        default: 
            return null;
    }
  };

  return (
    <RetroContainer>
        {/* Transition Overlay */}
        {transition.active && (
            <div className={`fixed inset-0 z-50 transition-opacity duration-1000 ${transition.stage === 'OUT' ? 'opacity-0' : 'opacity-100'}`}>
                <SceneTransition title={transition.title} subtitle={transition.subtitle} />
            </div>
        )}

        {/* Global HUD */}
        {gameState.currentScreen !== 'INTRO' && gameState.currentScreen !== 'CHAR_SELECT' && gameState.selectedCharacter && (
            <div className="w-full max-w-7xl mx-auto p-4 animate-fade-in-up">
                <StatsPanel character={gameState.selectedCharacter} gameState={gameState} />
            </div>
        )}

        {/* Main Content Area */}
        <div className="flex-grow flex flex-col items-center justify-center w-full max-w-7xl mx-auto p-4 relative z-10">
            {renderContent()}
        </div>

        {/* Terminal/Log (Bottom, always visible except Intro) */}
        {gameState.currentScreen !== 'INTRO' && gameState.currentScreen !== 'VICTORY' && gameState.currentScreen !== 'GAME_OVER' && (
             <div className="w-full max-w-7xl mx-auto p-4">
                <Terminal logs={gameState.history} />
             </div>
        )}
    </RetroContainer>
  );
};

export default App;
