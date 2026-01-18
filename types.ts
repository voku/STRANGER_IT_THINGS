
export enum CharacterRole {
  SERVICE_DESK = 'service_desk',
  IAM = 'iam',
  INFRASTRUCTURE = 'infrastructure',
  DEVELOPER = 'developer',
  LICENSING = 'licensing',
  ERP = 'erp',
  PURCHASING = 'purchasing',
}

export enum Act {
  ACT_1_TICKET = 'act1',
  ACT_2_PERSPECTIVE = 'act2',
  ACT_3_BOSS = 'act3',
  ACT_4_EPILOGUE = 'act4'
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
  slaPenalty?: number; // SLA penalty if used in wrong context
  isBadItem?: boolean; // Flag for items with negative effects
  qualityEffect?: number; // Additional quality effect when used (can be negative)
  moraleEffect?: number; // Additional morale effect when used (can be negative)
}

export interface ItemInventory {
  [skillId: string]: number; // Track quantity of each item
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
  isCorrect?: boolean; // Flag to mark the correct answer
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

export interface WrongAnswer {
  scenarioId: string;
  scenarioTitle: string;
  selectedOption: string;
  correctOption: string;
  explanation: string;
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
  wrongAnswers: WrongAnswer[]; // Track wrong answers for end screen

  // Resources
  slaTime: number; // Represents remaining time/SLA buffer
  teamMorale: number; // HP equivalent
  ticketQuality: number; // Score equivalent
  itemInventory: ItemInventory; // Track collected items and quantities
  
  turnCount: number;
  history: LogEntry[];
  currentScenario: Scenario | null;
  isLoading: boolean;
  gameStatus: 'active' | 'won' | 'lost';
}
