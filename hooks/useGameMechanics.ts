/**
 * Game Mechanics Hook
 * 
 * Handles time-based game mechanics like SLA decay and automatic game over.
 * This hook manages the background timer that reduces SLA over time during active gameplay.
 * 
 * @module useGameMechanics
 */

import { useEffect } from 'react';
import { GameState } from '../types';
import { SLA_DECAY_RATE, SLA_DECAY_INTERVAL } from '../constants';

/**
 * Props for the game mechanics hook
 */
interface UseGameMechanicsProps {
  gameStatus: GameState['gameStatus'];
  currentScreen: GameState['currentScreen'];
  onSlaDecay: () => void;
}

/**
 * Hook that manages time-based SLA reduction
 * 
 * Automatically reduces SLA by SLA_DECAY_RATE every SLA_DECAY_INTERVAL during active gameplay.
 * The timer is paused during:
 * - Intro screen
 * - Character selection
 * - When game is not in 'active' status
 * 
 * @param props - Configuration for the mechanics hook
 * @param props.gameStatus - Current game status (active, won, lost)
 * @param props.currentScreen - Current screen being displayed
 * @param props.onSlaDecay - Callback function called when SLA should decay
 * 
 * @example
 * ```ts
 * useGameMechanics({
 *   gameStatus: gameState.gameStatus,
 *   currentScreen: gameState.currentScreen,
 *   onSlaDecay: handleSlaDecay
 * });
 * ```
 */
export function useGameMechanics({
  gameStatus,
  currentScreen,
  onSlaDecay
}: UseGameMechanicsProps) {
  useEffect(() => {
    // Don't run timer if game is not active or on menu screens
    if (gameStatus !== 'active' || currentScreen === 'INTRO' || currentScreen === 'CHAR_SELECT') {
      return;
    }

    // Set up interval to decay SLA
    const timer = setInterval(() => {
      onSlaDecay();
    }, SLA_DECAY_INTERVAL);

    // Cleanup timer on unmount or when dependencies change
    return () => clearInterval(timer);
  }, [gameStatus, currentScreen, onSlaDecay]);
}
