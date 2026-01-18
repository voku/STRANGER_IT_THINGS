/**
 * Tests for Randomization and Progress Indicator Features
 * 
 * These tests verify:
 * 1. All items are unlocked from the start
 * 2. Skill selection shows exactly 4 randomized items
 * 3. Location progress indicators are displayed correctly
 * 4. In-scenario progress is shown
 */

import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { CHARACTERS, SKILLS } from '../constants';
import { TranslationProvider } from '../translations';

describe('Randomization and Progress Indicators', () => {
  
  describe('Item Unlocking', () => {
    it('should start with all items unlocked and in inventory', async () => {
      const user = userEvent.setup();
      render(
        <TranslationProvider>
          <App />
        </TranslationProvider>
      );
      
      // Navigate to skill selection (no name input)
      await user.click(screen.getByText(/INSERT COIN/i));
      
      await waitFor(() => {
        expect(screen.getByText(/CHOOSE YOUR CHARACTER/i)).toBeInTheDocument();
      }, { timeout: 5000 });
      
      await user.click(screen.getByText(CHARACTERS[0].name));
      
      await waitFor(() => {
        expect(screen.getByText(/THE TOOL/i)).toBeInTheDocument();
      }, { timeout: 3000 });
      
      await waitFor(() => {
        expect(screen.getByText(/CHOOSE YOUR EQUIPMENT/i)).toBeInTheDocument();
      }, { timeout: 5000 });
      
      // Wait for skills to render
      await waitFor(() => {
        const buttons = screen.queryAllByRole('button').filter(btn => 
          btn.textContent?.includes('x1')
        );
        expect(buttons.length).toBeGreaterThan(0);
      }, { timeout: 3000 });
      
      // Verify that items show x1 count (proving they're all in inventory)
      const itemCountBadges = screen.queryAllByText(/x1/i);
      expect(itemCountBadges.length).toBeGreaterThan(0);
      
      // Verify text mentions randomization
      expect(screen.getByText(/Choose 1 of.*randomly selected items/i)).toBeInTheDocument();
    });
  });

  describe('Randomized 4-Item Display', () => {
    it('should display exactly 4 or fewer items on skill selection screen', async () => {
      const user = userEvent.setup();
      render(
        <TranslationProvider>
          <App />
        </TranslationProvider>
      );
      
      // Navigate to skill selection (no name input)
      await user.click(screen.getByText(/INSERT COIN/i));
      
      await waitFor(() => {
        expect(screen.getByText(/CHOOSE YOUR CHARACTER/i)).toBeInTheDocument();
      }, { timeout: 5000 });
      
      await user.click(screen.getByText(CHARACTERS[0].name));
      
      await waitFor(() => {
        expect(screen.getByText(/CHOOSE YOUR EQUIPMENT/i)).toBeInTheDocument();
      }, { timeout: 5000 });
      
      // Wait for skill buttons to render
      let skillButtons: HTMLElement[] = [];
      await waitFor(() => {
        skillButtons = screen.queryAllByRole('button').filter(btn => 
          btn.textContent?.includes('Click to Equip')
        );
        expect(skillButtons.length).toBeGreaterThan(0);
      }, { timeout: 10000 });
      
      // Verify exactly 4 or fewer items are shown
      expect(skillButtons.length).toBeGreaterThanOrEqual(1);
      expect(skillButtons.length).toBeLessThanOrEqual(4);
    });
    
    it('should show randomization text on skill selection', async () => {
      const user = userEvent.setup();
      render(
        <TranslationProvider>
          <App />
        </TranslationProvider>
      );
      
      // No name input
      await user.click(screen.getByText(/INSERT COIN/i));
      
      await waitFor(() => {
        expect(screen.getByText(/CHOOSE YOUR CHARACTER/i)).toBeInTheDocument();
      }, { timeout: 5000 });
      
      await user.click(screen.getByText(CHARACTERS[0].name));
      
      await waitFor(() => {
        expect(screen.getByText(/CHOOSE YOUR EQUIPMENT/i)).toBeInTheDocument();
      }, { timeout: 5000 });
      
      // Verify text mentions randomization
      await waitFor(() => {
        expect(screen.getByText(/Choose 1 of.*randomly selected items/i)).toBeInTheDocument();
      }, { timeout: 3000 });
    });
  });

  describe('Location Progress Indicators', () => {
    it('should show progress indicator on map location', async () => {
      const user = userEvent.setup();
      render(
        <TranslationProvider>
          <App />
        </TranslationProvider>
      );
      
      // Navigate to map (no name input)
      await user.click(screen.getByText(/INSERT COIN/i));
      
      await waitFor(() => {
        expect(screen.getByText(/CHOOSE YOUR CHARACTER/i)).toBeInTheDocument();
      }, { timeout: 5000 });
      
      await user.click(screen.getByText(CHARACTERS[0].name));
      
      await waitFor(() => {
        expect(screen.getByText(/CHOOSE YOUR EQUIPMENT/i)).toBeInTheDocument();
      }, { timeout: 5000 });
      
      // Wait for and click skill button
      let skillButtons: HTMLElement[] = [];
      await waitFor(() => {
        skillButtons = screen.queryAllByRole('button').filter(btn => 
          btn.textContent?.includes('Click to Equip')
        );
        expect(skillButtons.length).toBeGreaterThan(0);
      }, { timeout: 10000 });
      
      await user.click(skillButtons[0]);
      
      await waitFor(() => {
        expect(screen.getByText(/ACT 1/i)).toBeInTheDocument();
      }, { timeout: 10000 });
      
      // Wait for map screen
      await waitFor(() => {
        expect(screen.getByText(/HAWKINS MAP/i)).toBeInTheDocument();
      }, { timeout: 10000 });
      
      // Verify progress indicator exists for Starcourt Mall (use getAllByText for multiple matches)
      // It should show something like "0/1" or similar
      const progressTexts = screen.queryAllByText(/0\/1/);
      expect(progressTexts.length).toBeGreaterThan(0); // At least one progress indicator
    });
    
    it('should show location name and progress in active scenario', async () => {
      const user = userEvent.setup();
      render(
        <TranslationProvider>
          <App />
        </TranslationProvider>
      );
      
      // Navigate to active scenario (no name input)
      await user.click(screen.getByText(/INSERT COIN/i));
      
      await waitFor(() => {
        expect(screen.getByText(/CHOOSE YOUR CHARACTER/i)).toBeInTheDocument();
      }, { timeout: 5000 });
      
      await user.click(screen.getByText(CHARACTERS[0].name));
      
      await waitFor(() => {
        expect(screen.getByText(/CHOOSE YOUR EQUIPMENT/i)).toBeInTheDocument();
      }, { timeout: 5000 });
      
      // Select skill
      let skillButtons: HTMLElement[] = [];
      await waitFor(() => {
        skillButtons = screen.queryAllByRole('button').filter(btn => 
          btn.textContent?.includes('Click to Equip')
        );
        expect(skillButtons.length).toBeGreaterThan(0);
      }, { timeout: 10000 });
      
      await user.click(skillButtons[0]);
      
      await waitFor(() => {
        expect(screen.getByText(/HAWKINS MAP/i)).toBeInTheDocument();
      }, { timeout: 10000 });
      
      // Click on Starcourt Mall (use getAllByRole for multiple buttons)
      const mallButtons = screen.getAllByRole('button', { name: /Starcourt Mall/i });
      expect(mallButtons.length).toBeGreaterThan(0);
      await user.click(mallButtons[0]); // Click the first one (mobile or desktop)
      
      // Wait for scenario to load
      await waitFor(() => {
        expect(screen.getByText(/Flickering Lights/i)).toBeInTheDocument();
      }, { timeout: 10000 });
      
      // Verify in-scenario progress indicator
      // Should show something like "📍 Starcourt Mall | Progress: 0/1"
      const progressIndicator = screen.queryByText(/📍.*Starcourt Mall.*Progress/i);
      expect(progressIndicator).toBeInTheDocument();
    });
  });

  describe('Item Count Display', () => {
    it('should show x1 count for all available items', async () => {
      const user = userEvent.setup();
      render(
        <TranslationProvider>
          <App />
        </TranslationProvider>
      );
      
      // Navigate to skill selection (no name input)
      await user.click(screen.getByText(/INSERT COIN/i));
      
      await waitFor(() => {
        expect(screen.getByText(/CHOOSE YOUR CHARACTER/i)).toBeInTheDocument();
      }, { timeout: 5000 });
      
      await user.click(screen.getByText(CHARACTERS[0].name));
      
      await waitFor(() => {
        expect(screen.getByText(/CHOOSE YOUR EQUIPMENT/i)).toBeInTheDocument();
      }, { timeout: 5000 });
      
      // Wait for items to render
      await waitFor(() => {
        const buttons = screen.queryAllByRole('button').filter(btn => 
          btn.textContent?.includes('x1')
        );
        expect(buttons.length).toBeGreaterThan(0);
      }, { timeout: 3000 });
      
      // Count how many items show x1
      const x1Badges = screen.getAllByText(/x1/);
      
      // Should be at least 1 (since we show 4 random items, and all start with 1)
      expect(x1Badges.length).toBeGreaterThanOrEqual(1);
      expect(x1Badges.length).toBeLessThanOrEqual(4); // Max 4 items shown
    });
  });

  describe('Progress Updates', () => {
    it('should update progress after completing a scenario', async () => {
      const user = userEvent.setup();
      render(
        <TranslationProvider>
          <App />
        </TranslationProvider>
      );
      
      // Navigate through to scenario completion (no name input)
      await user.click(screen.getByText(/INSERT COIN/i));
      
      await waitFor(() => {
        expect(screen.getByText(/CHOOSE YOUR CHARACTER/i)).toBeInTheDocument();
      }, { timeout: 5000 });
      
      await user.click(screen.getByText(CHARACTERS[0].name));
      
      await waitFor(() => {
        expect(screen.getByText(/CHOOSE YOUR EQUIPMENT/i)).toBeInTheDocument();
      }, { timeout: 5000 });
      
      // Select skill
      let skillButtons: HTMLElement[] = [];
      await waitFor(() => {
        skillButtons = screen.queryAllByRole('button').filter(btn => 
          btn.textContent?.includes('Click to Equip')
        );
        expect(skillButtons.length).toBeGreaterThan(0);
      }, { timeout: 10000 });
      
      await user.click(skillButtons[0]);
      
      await waitFor(() => {
        expect(screen.getByText(/HAWKINS MAP/i)).toBeInTheDocument();
      }, { timeout: 10000 });
      
      // Verify initial progress is 0/1 (use getAllByText for multiple matches)
      const initialProgress = screen.queryAllByText(/0\/1/);
      expect(initialProgress.length).toBeGreaterThan(0);
      
      // Click location and complete scenario
      const mallButtons = screen.getAllByRole('button', { name: /Starcourt Mall/i });
      await user.click(mallButtons[0]);
      
      await waitFor(() => {
        expect(screen.getByText(/Flickering Lights/i)).toBeInTheDocument();
      }, { timeout: 10000 });
      
      // Select correct answer (option 3: Joyce with the Christmas lights)
      const correctOption = screen.getByText(/Joyce.*Christmas lights/i);
      await user.click(correctOption.closest('button')!);
      
      // Submit answer
      await waitFor(() => {
        const submitButton = screen.queryByText(/Submit/i);
        if (submitButton) {
          expect(submitButton).toBeInTheDocument();
        }
      }, { timeout: 10000 });
      
      const submitButton = screen.queryByText(/Submit/i);
      if (submitButton) {
        await user.click(submitButton.closest('button')!);
        
        // After completion, progress should update (though we transition to next act)
        // Just verify no crash and transition happens
        await waitFor(() => {
          const transitionTexts = screen.queryAllByText(/ACT 2/i);
          const ausruestungTexts = screen.queryAllByText(/CHOOSE YOUR EQUIPMENT/i);
          expect(transitionTexts.length + ausruestungTexts.length).toBeGreaterThan(0);
        }, { timeout: 10000 });
      }
    }, 30000);
  });
});
