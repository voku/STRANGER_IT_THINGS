/**
 * Game State Initialization
 * 
 * Defines the initial state for a new game session.
 * This module exports the default state configuration used when starting a new game.
 * 
 * @module gameState
 */

import { GameState, Act } from '../types';
import { INITIAL_SLA, INITIAL_MORALE, INITIAL_QUALITY } from '../constants';

/**
 * Initial game state configuration
 * 
 * Sets up a fresh game with:
 * - Starting screen (INTRO)
 * - Default stats (SLA, Morale, Quality)
 * - Unlocked initial locations (Mall)
 * - Unlocked initial skills (Rubber Duck, ITIL Book)
 */
export const initialGameState: GameState = {
  currentScreen: 'INTRO',
  currentAct: Act.ACT_1_TICKET,
  selectedCharacter: null,
  selectedSkill: null,
  playerName: '',
  selectedLocation: null,
  unlockedLocationIds: ['MALL'], // Start with Mall unlocked
  unlockedSkillIds: ['RUBBER_DUCK', 'ITIL_BOOK'], // Start with Rubber Duck and ITIL Book
  completedScenarios: [],
  wrongAnswers: [], // Track wrong answers for end screen
  slaTime: INITIAL_SLA,
  teamMorale: INITIAL_MORALE,
  ticketQuality: INITIAL_QUALITY,
  turnCount: 0,
  history: [],
  currentScenario: null,
  isLoading: false,
  gameStatus: 'active'
};
