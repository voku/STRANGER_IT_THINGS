/**
 * Full Gameplay Integration Tests
 * 
 * These tests simulate complete gameplay scenarios from start to finish:
 * - Character selection
 * - Skill selection and transition
 * - Act progression
 * - Scenario completion
 * - Win/loss conditions
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render, screen, waitFor, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { CHARACTERS } from '../constants';

// Mock timers for transitions
beforeEach(() => {
  vi.useFakeTimers();
});

afterEach(() => {
  vi.clearAllTimers();
  vi.useRealTimers();
});

describe('Full Gameplay Flow', () => {
  describe('Character Selection and Transition', () => {
    it('should complete full flow from intro to skill selection', async () => {
      const user = userEvent.setup({ delay: null });
      render(<App />);
      
      // Step 1: Verify we start at intro screen
      expect(screen.getByText(/STRANGER/i)).toBeInTheDocument();
      expect(screen.getByText(/IT THINGS/i)).toBeInTheDocument();
      
      // Step 2: Enter player name
      const nameInput = screen.getByPlaceholderText(/AGENT NAME EINGEBEN/i);
      await user.type(nameInput, 'TestAgent');
      
      // Step 3: Start game
      const startButton = screen.getByText(/INSERT COIN/i);
      await user.click(startButton);
      
      // Should transition to character select
      await waitFor(() => {
        expect(screen.getByText(/WÄHLE DEINEN CHARAKTER/i)).toBeInTheDocument();
      });
      
      // Step 4: Select first character
      const firstCharacter = CHARACTERS[0];
      const charButton = screen.getByText(firstCharacter.name);
      await user.click(charButton);
      
      // Step 5: Verify transition starts (DAS WERKZEUG)
      await waitFor(() => {
        expect(screen.getByText(/DAS WERKZEUG/i)).toBeInTheDocument();
      });
      
      // Step 6: Advance time to complete transition (2000ms for INTERSTITIAL)
      await act(async () => {
        vi.advanceTimersByTime(2000);
      });
      
      // Step 7: Verify we reach skill selection screen after transition
      await waitFor(() => {
        expect(screen.getByText(/AUSRÜSTUNGSPHASE/i)).toBeInTheDocument();
      }, { timeout: 3000 });
      
      // Step 8: Advance time to complete transition fade out (5500ms total)
      await act(async () => {
        vi.advanceTimersByTime(3500);
      });
      
      // Step 9: Verify transition is no longer blocking
      await waitFor(() => {
        // The skill selection screen should still be visible
        expect(screen.getByText(/AUSRÜSTUNGSPHASE/i)).toBeInTheDocument();
      });
    });

    it('should not have black screen after character selection', async () => {
      const user = userEvent.setup({ delay: null });
      render(<App />);
      
      // Navigate to character selection
      const nameInput = screen.getByPlaceholderText(/AGENT NAME EINGEBEN/i);
      await user.type(nameInput, 'TestAgent');
      const startButton = screen.getByText(/INSERT COIN/i);
      await user.click(startButton);
      
      await waitFor(() => {
        expect(screen.getByText(/WÄHLE DEINEN CHARAKTER/i)).toBeInTheDocument();
      });
      
      // Select character
      const firstCharacter = CHARACTERS[0];
      const charButton = screen.getByText(firstCharacter.name);
      await user.click(charButton);
      
      // Wait for transition to complete
      await act(async () => {
        vi.advanceTimersByTime(6000); // Full transition time
      });
      
      // Verify we can see skill selection content (not just black screen)
      await waitFor(() => {
        const skillSelect = screen.queryByText(/AUSRÜSTUNGSPHASE/i);
        expect(skillSelect).toBeInTheDocument();
      }, { timeout: 3000 });
    });
  });

  describe('Act 1 Gameplay', () => {
    it('should complete Act 1 scenario successfully', async () => {
      const user = userEvent.setup({ delay: null });
      render(<App />);
      
      // Setup: Get to gameplay
      const nameInput = screen.getByPlaceholderText(/AGENT NAME EINGEBEN/i);
      await user.type(nameInput, 'TestAgent');
      await user.click(screen.getByText(/INSERT COIN/i));
      
      await waitFor(() => {
        expect(screen.getByText(/WÄHLE DEINEN CHARAKTER/i)).toBeInTheDocument();
      });
      
      // Select character
      const firstCharacter = CHARACTERS[0];
      await user.click(screen.getByText(firstCharacter.name));
      
      // Wait for skill selection transition
      await act(async () => {
        vi.advanceTimersByTime(6000); // Full transition time
      });
      
      await waitFor(() => {
        expect(screen.getByText(/AUSRÜSTUNGSPHASE/i)).toBeInTheDocument();
      });
      
      // Select skill (Rubber Duck)
      const rubberDuckButton = screen.getByText(/RUBBER DUCK/i);
      await user.click(rubberDuckButton);
      
      // Wait for Act 1 transition
      await act(async () => {
        vi.advanceTimersByTime(6000); // Full transition time
      });
      
      // Should be at map selection
      await waitFor(() => {
        expect(screen.getByText(/STARCOURT MALL/i)).toBeInTheDocument();
      });
      
      // Select mall location
      const mallButton = screen.getByText(/STARCOURT MALL/i);
      await user.click(mallButton);
      
      // Should show scenario
      await waitFor(() => {
        expect(screen.getByText(/Das Flatternde Ticket/i)).toBeInTheDocument();
      });
    });
  });

  describe('Character Stats Display', () => {
    it('should display character stats after selection', async () => {
      const user = userEvent.setup({ delay: null });
      render(<App />);
      
      // Navigate to character selection
      const nameInput = screen.getByPlaceholderText(/AGENT NAME EINGEBEN/i);
      await user.type(nameInput, 'TestAgent');
      await user.click(screen.getByText(/INSERT COIN/i));
      
      await waitFor(() => {
        expect(screen.getByText(/WÄHLE DEINEN CHARAKTER/i)).toBeInTheDocument();
      });
      
      // Select character
      const firstCharacter = CHARACTERS[0];
      await user.click(screen.getByText(firstCharacter.name));
      
      // Wait for transition
      await act(async () => {
        vi.advanceTimersByTime(6000); // Full transition time
      });
      
      // Stats panel should be visible with character info
      await waitFor(() => {
        expect(screen.getByText(firstCharacter.name)).toBeInTheDocument();
      });
    });
  });

  describe('Transition Timing', () => {
    it('should complete transitions within expected timeframes', async () => {
      const user = userEvent.setup({ delay: null });
      render(<App />);
      
      // Get to character selection
      const nameInput = screen.getByPlaceholderText(/AGENT NAME EINGEBEN/i);
      await user.type(nameInput, 'TestAgent');
      await user.click(screen.getByText(/INSERT COIN/i));
      
      await waitFor(() => {
        expect(screen.getByText(/WÄHLE DEINEN CHARAKTER/i)).toBeInTheDocument();
      });
      
      // Select character to trigger transition
      const firstCharacter = CHARACTERS[0];
      await user.click(screen.getByText(firstCharacter.name));
      
      // At t=0: Transition should show "DAS WERKZEUG"
      expect(screen.getByText(/DAS WERKZEUG/i)).toBeInTheDocument();
      
      // At t=2000ms: INTERSTITIAL stage - callback fires, screen changes
      await act(async () => {
        vi.advanceTimersByTime(2000);
      });
      
      await waitFor(() => {
        expect(screen.getByText(/AUSRÜSTUNGSPHASE/i)).toBeInTheDocument();
      });
      
      // At t=4500ms+: OUT stage - transition should start fading
      await act(async () => {
        vi.advanceTimersByTime(2500);
      });
      
      // Complete the fade out
      await act(async () => {
        vi.advanceTimersByTime(1000);
      });
      
      // Transition should no longer be active
      await waitFor(() => {
        // The skill selection screen should be fully visible
        expect(screen.getByText(/AUSRÜSTUNGSPHASE/i)).toBeInTheDocument();
      });
    });
  });
});
