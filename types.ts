
export enum CharacterRole {
  SERVICE_DESK = 'Service Desk (Die Frontline-Wächter)',
  IAM = 'AD / IAM (Die Rollen-Meister)',
  INFRASTRUCTURE = 'Server / Infra (Die Netzwerk-Krieger)',
  DEVELOPER = 'Softwareentwicklung (Die Code-Zauberer)',
  LICENSING = 'Lizenz / Beschaffung (Die Lizenz-Diplomaten)',
  ERP = 'ERP / Business (Die Prozess-Beschwörer)',
  PURCHASING = 'Einkauf / Logistik (Die Logistik-Ranger)',
}

export enum Act {
  ACT_1_TICKET = 'AKT 1: Das verzerrte Ticket',
  ACT_2_PERSPECTIVE = 'AKT 2: Das Perspektiven-Labyrinth',
  ACT_3_BOSS = 'AKT 3: Der Modell-Endgegner',
  ACT_4_EPILOGUE = 'AKT 4: Die neue Welt'
}

export interface Character {
  id: string;
  role: CharacterRole;
  name: string;
  description: string;
  specialAbility: string;
  stats: {
    sla: number; // Time/Speed
    quality: number; // Accuracy
    morale: number; // Resilience
  };
  portraitEmoji: string;
  themeColor: string;
}

export interface Skill {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  targetAct?: Act; // Hint where this skill is most useful
}

export interface MapLocation {
  id: string;
  name: string;
  description: string;
  coords: { x: number; y: number };
  type: 'SAFE' | 'DANGER' | 'NEUTRAL';
  requiredAct?: Act; // Act required to unlock/play this location
}

export interface ScenarioOption {
  label: string;
  type: 'INCIDENT' | 'REQUEST' | 'CHANGE' | 'INQUIRY';
  outcome: string;
  qualityChange: number;
  moraleChange: number;
}

export interface Scenario {
  id: string;
  act: Act;
  type: string;
  title: string;
  environment: string;
  hint?: string;
  description: string;
  options?: ScenarioOption[];
  successMessage?: string;
  failureMessage?: string;
  difficultyLevel?: number;
  targetWord?: string;
}

export interface LogEntry {
  id: string;
  speaker: 'GM' | 'PLAYER' | 'SYSTEM' | 'USER';
  text: string;
  timestamp: Date;
}

export interface GameState {
  currentScreen: 'INTRO' | 'CHAR_SELECT' | 'SKILL_SELECT' | 'MAP_SELECT' | 'GAME' | 'VICTORY' | 'GAME_OVER';
  currentAct: Act;
  selectedCharacter: Character | null;
  selectedSkill: Skill | null;
  playerName: string;
  selectedLocation: MapLocation | null;
  
  // Progression tracking
  unlockedLocationIds: string[];
  unlockedSkillIds: string[];
  completedScenarios: string[];

  // Resources
  slaTime: number; // Represents remaining time/SLA buffer
  teamMorale: number; // HP equivalent
  ticketQuality: number; // Score equivalent
  
  turnCount: number;
  history: LogEntry[];
  currentScenario: Scenario | null;
  isLoading: boolean;
  gameStatus: 'active' | 'won' | 'lost';
}
