/**
 * Game State Initialization
 * 
 * Defines the initial state for a new game session.
 * This module exports the default state configuration used when starting a new game.
 * 
 * @module gameState
 */

import { GameState, Act } from '../types';
import { INITIAL_SLA, INITIAL_MORALE, INITIAL_QUALITY, SKILLS } from '../constants';

/**
 * Initial game state configuration
 * 
 * Sets up a fresh game with:
 * - Starting screen (INTRO)
 * - Default stats (SLA, Morale, Quality)
 * - Unlocked initial locations (Mall)
 * - ALL skills unlocked from the start
 * - Starting inventory with 1 of each item
 */

// Create initial inventory with all items
const createInitialInventory = () => {
  const inventory: { [key: string]: number } = {};
  SKILLS.forEach(skill => {
    inventory[skill.id] = 1; // Start with 1 of each item
  });
  return inventory;
};

// Get all skill IDs for unlocking
const getAllSkillIds = () => SKILLS.map(skill => skill.id);

export const initialGameState: GameState = {
  currentScreen: 'INTRO',
  currentAct: Act.ACT_1_TICKET,
  selectedCharacter: null,
  selectedSkill: null,
  playerName: '',
  selectedLocation: null,
  unlockedLocationIds: ['MALL', 'ARCADE', 'FOREST'], // Start with Mall and detours unlocked
  unlockedSkillIds: getAllSkillIds(), // All skills unlocked from the start
  completedScenarios: [],
  wrongAnswers: [], // Track wrong answers for end screen
  slaTime: INITIAL_SLA,
  teamMorale: INITIAL_MORALE,
  ticketQuality: INITIAL_QUALITY,
  itemInventory: createInitialInventory(), // Start with 1 of each item
  turnCount: 0,
  history: [],
  currentScenario: null,
  isLoading: false,
  gameStatus: 'active'
};
