/**
 * Game Helper Functions
 * 
 * Utility functions for game logic that don't involve state mutations.
 * These are pure functions that can be used across the application.
 * 
 * @module gameHelpers
 */

import { GameState, LogEntry } from '../types';

/**
 * Checks if the game should end based on current stats
 * 
 * Game over occurs when any of the three stats (SLA, Morale, Quality) reach zero.
 * 
 * @param sla - Current SLA percentage (0-100)
 * @param morale - Current team morale percentage (0-100)
 * @param quality - Current ticket quality percentage (0-100)
 * @returns Object with isGameOver flag and optional reason string
 * 
 * @example
 * ```ts
 * const result = checkGameOver(0, 50, 50);
 * // { isGameOver: true, reason: "SLA FAILURE: Zeit ist abgelaufen." }
 * ```
 */
export function checkGameOver(
  sla: number, 
  morale: number, 
  quality: number
): { isGameOver: boolean; reason?: string } {
  if (sla <= 0) {
    return { isGameOver: true, reason: "SLA FAILURE: Time has expired." };
  }
  if (morale <= 0) {
    return { isGameOver: true, reason: "MORAL COLLAPSE: Team morale has collapsed." };
  }
  if (quality <= 0) {
    return { isGameOver: true, reason: "QUALITY FAILURE: Ticket quality has dropped to zero." };
  }
  return { isGameOver: false };
}

/**
 * Creates a new log entry for the game history
 * 
 * @param text - The message to log
 * @param speaker - Who is speaking (SYSTEM, GM, PLAYER, or DM)
 * @returns A new log entry object with timestamp and unique ID
 * 
 * @example
 * ```ts
 * const log = createLogEntry("Game started", "SYSTEM");
 * ```
 */
export function createLogEntry(
  text: string, 
  speaker: LogEntry['speaker'] = 'SYSTEM'
): LogEntry {
  return {
    id: Date.now().toString() + Math.random(),
    speaker,
    text,
    timestamp: new Date()
  };
}

/**
 * Clamps a value between 0 and 100
 * 
 * Ensures stat values never go below 0 or above 100.
 * Handles NaN values by converting them to 0 to prevent state corruption.
 * 
 * @param value - The value to clamp
 * @returns The clamped value between 0 and 100
 * 
 * @example
 * ```ts
 * clampStat(150) // returns 100
 * clampStat(-10) // returns 0
 * clampStat(75)  // returns 75
 * clampStat(NaN) // returns 0 (prevents corruption)
 * ```
 */
export function clampStat(value: number): number {
  // Prevent NaN from corrupting game state
  if (isNaN(value) || !isFinite(value)) {
    console.warn('clampStat received invalid value:', value, '- defaulting to 0');
    return 0;
  }
  return Math.max(0, Math.min(100, value));
}
