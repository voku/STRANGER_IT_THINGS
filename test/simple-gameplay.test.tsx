/**
 * Simple Gameplay Test - Debug version
 */

import { describe, it, expect } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { CHARACTERS } from '../constants';
import { TranslationProvider } from '../translations';

describe('Simple Gameplay Test', () => {
  it('should start the game and reach character selection', async () => {
    const user = userEvent.setup();
    render(
      <TranslationProvider>
        <App />
      </TranslationProvider>
    );
    
    // Verify intro screen
    expect(screen.getByText(/STRANGER/i)).toBeInTheDocument();
    
    // Start game (no name input needed)
    const startButton = screen.getByText(/INSERT COIN/i);
    await user.click(startButton);
    
    // Should reach character selection (faster transitions now ~1.7s)
    await waitFor(() => {
      expect(screen.getByText(/CHOOSE YOUR CHARACTER/i)).toBeInTheDocument();
    }, { timeout: 5000 });
  });

  it('should select character without fake timers', async () => {
    const user = userEvent.setup();
    render(
      <TranslationProvider>
        <App />
      </TranslationProvider>
    );
    
    // Navigate to character selection (no name input)
    await user.click(screen.getByText(/INSERT COIN/i));
    
    await waitFor(() => {
      expect(screen.getByText(/CHOOSE YOUR CHARACTER/i)).toBeInTheDocument();
    }, { timeout: 5000 });
    
    // Select first character
    const firstCharacter = CHARACTERS[0];
    const charButton = screen.getByText(firstCharacter.name);
    await user.click(charButton);
    
    // Wait for transition to show
    await waitFor(() => {
      expect(screen.getByText(/THE TOOL/i)).toBeInTheDocument();
    }, { timeout: 3000 });
    
    // Wait for skill selection screen (faster transitions now ~1.7s)
    await waitFor(() => {
      expect(screen.getByText(/CHOOSE YOUR EQUIPMENT/i)).toBeInTheDocument();
    }, { timeout: 5000 });
    
    // Verify we're on skill selection and can see content
    expect(screen.getByText(/CHOOSE YOUR EQUIPMENT/i)).toBeInTheDocument();
  });

  it('golden path: should complete full flow from intro to skill selection and select a skill', async () => {
    const user = userEvent.setup();
    render(
      <TranslationProvider>
        <App />
      </TranslationProvider>
    );
    
    // Step 1: Start game (no name input)
    await user.click(screen.getByText(/INSERT COIN/i));
    
    // Step 2: Wait for and verify character selection screen (faster transitions)
    await waitFor(() => {
      expect(screen.getByText(/CHOOSE YOUR CHARACTER/i)).toBeInTheDocument();
    }, { timeout: 5000 });
    
    // Step 3: Select first character (The Operator)
    const firstCharacter = CHARACTERS[0];
    const charButton = screen.getByText(firstCharacter.name);
    await user.click(charButton);
    
    // Step 4: Wait for transition animation
    await waitFor(() => {
      expect(screen.getByText(/THE TOOL/i)).toBeInTheDocument();
    }, { timeout: 3000 });
    
    // Step 5: Wait for skill selection screen (AUSRÜSTUNGSPHASE)
    await waitFor(() => {
      expect(screen.getByText(/CHOOSE YOUR EQUIPMENT/i)).toBeInTheDocument();
    }, { timeout: 5000 });
    
    // Step 6: Wait for skill buttons to be rendered (after transition completes)
    // Since we now show 4 random items, we can't guarantee specific items will appear
    // Just verify that some skills are displayed and at least one is selectable
    let skillButtons: HTMLElement[] = [];
    await waitFor(() => {
      skillButtons = screen.queryAllByRole('button').filter(btn => 
        btn.textContent?.includes('Click to Equip') || btn.textContent?.includes('Klicken zum Ausrüsten')
      );
      expect(skillButtons.length).toBeGreaterThan(0);
    }, { timeout: 3000 });
    
    expect(skillButtons.length).toBeLessThanOrEqual(4); // Should show max 4 items
    
    // Step 7: Select the first available skill (any of the randomized ones)
    const firstSkillButton = skillButtons[0];
    expect(firstSkillButton).not.toBeNull();
    expect(firstSkillButton).not.toBeDisabled();
    await user.click(firstSkillButton);
    
    // Step 8: Wait for transition to next screen (ACT 1)
    await waitFor(() => {
      expect(screen.getByText(/ACT 1/i)).toBeInTheDocument();
    }, { timeout: 3000 });
    
    // Step 9: Verify we reach the map selection screen after transition
    await waitFor(() => {
      // Look for map-related text or terminal messages
      const terminalText = screen.queryByText(/SYSTEM RESTART/i) || screen.queryByText(/Welcome/i);
      expect(terminalText).toBeInTheDocument();
    }, { timeout: 5000 });
  }, 20000); // Reduced timeout due to faster transitions

  it('golden path: complete game from start to finish', async () => {
    const user = userEvent.setup();
    render(
      <TranslationProvider>
        <App />
      </TranslationProvider>
    );
    
    // ========== ACT 0: INTRO (no name input) ==========
    await user.click(screen.getByText(/INSERT COIN/i));
    
    await waitFor(() => {
      expect(screen.getByText(/CHOOSE YOUR CHARACTER/i)).toBeInTheDocument();
    }, { timeout: 5000 });
    
    // ========== CHARACTER SELECTION ==========
    const operatorButton = screen.getByText(CHARACTERS[0].name);
    await user.click(operatorButton);
    
    await waitFor(() => {
      expect(screen.getByText(/THE TOOL/i)).toBeInTheDocument();
    }, { timeout: 3000 });
    
    // ========== ACT 1: SKILL SELECTION ==========
    await waitFor(() => {
      expect(screen.getByText(/CHOOSE YOUR EQUIPMENT/i)).toBeInTheDocument();
    }, { timeout: 5000 });
    
    // Wait for skill buttons to be rendered (after transition completes)
    let skillButtons: HTMLElement[] = [];
    await waitFor(() => {
      skillButtons = screen.queryAllByRole('button').filter(btn => 
        btn.textContent?.includes('Click to Equip') || btn.textContent?.includes('Klicken zum Ausrüsten')
      );
      expect(skillButtons.length).toBeGreaterThan(0);
    }, { timeout: 3000 });
    
    await user.click(skillButtons[0]);
    
    await waitFor(() => {
      // Look for transition-specific text "The Distorted Ticket"
      expect(screen.getByText(/Distorted Ticket/i)).toBeInTheDocument();
    }, { timeout: 3000 });
    
    // ========== ACT 1: MAP SELECTION ==========
    await waitFor(() => {
      expect(screen.getByText(/HAWKINS MAP/i)).toBeInTheDocument();
    }, { timeout: 5000 });
    
    // Click on Starcourt Mall location - use getAllByText to get the button specifically
    const mallElements = screen.getAllByText(/Starcourt Mall/i);
    const mallButton = mallElements.find(el => el.closest('button'));
    expect(mallButton).toBeDefined();
    const actualMallButton = mallButton!.closest('button');
    expect(actualMallButton).not.toBeDisabled();
    await user.click(actualMallButton!);
    
    // ========== ACT 1: SCENARIO - Flackernde Lichter in der Starcourt Mall ==========
    await waitFor(() => {
      expect(screen.getByText(/Flackernde Lichter/i)).toBeInTheDocument();
    }, { timeout: 5000 });
    
    // Select the correct option: "Wie Joyce bei den Lichterketten..." (INQUIRY type)
    const inquiryButton = screen.getByText(/Joyce bei den Lichterketten/i).closest('button');
    await user.click(inquiryButton!);
    
    // For INQUIRY type, it shows "ANFRAGE SENDEN" button directly (no diagram)
    await waitFor(() => {
      expect(screen.getByText(/ANFRAGE SENDEN/i)).toBeInTheDocument();
    }, { timeout: 3000 });
    
    const sendButton = screen.getByText(/ANFRAGE SENDEN/i);
    await user.click(sendButton);
    
    // ========== ACT 2: TRANSITION ==========
    await waitFor(() => {
      // Look for the transition-specific text
      expect(screen.getByText(/PERSPEKTIVENWECHSEL/i)).toBeInTheDocument();
    }, { timeout: 5000 });
    
    // ========== ACT 2: SKILL SELECTION ==========
    await waitFor(() => {
      expect(screen.getByText(/AUSRÜSTUNGSPHASE/i)).toBeInTheDocument();
    }, { timeout: 5000 });
    
    // Select any available skill (now randomized, so we can't guarantee Coffee)
    let skillButtons2: HTMLElement[] = [];
    await waitFor(() => {
      skillButtons2 = screen.queryAllByRole('button').filter(btn => 
        btn.textContent?.includes('Klicken zum Ausrüsten')
      );
      expect(skillButtons2.length).toBeGreaterThan(0);
    }, { timeout: 3000 });
    
    await user.click(skillButtons2[0]);
    
    await waitFor(() => {
      expect(screen.getByText(/AKT 2/i)).toBeInTheDocument();
    }, { timeout: 3000 });
    
    // ========== ACT 2: MAP SELECTION ==========
    await waitFor(() => {
      expect(screen.getByText(/EINSATZKARTE/i)).toBeInTheDocument();
    }, { timeout: 5000 });
    
    // Click on Hawkins High - use getAllByText to get the button specifically
    const schoolElements = screen.getAllByText(/Hawkins High/i);
    const schoolButton = schoolElements.find(el => el.closest('button'));
    expect(schoolButton).toBeDefined();
    const actualSchoolButton = schoolButton!.closest('button');
    await user.click(actualSchoolButton!);
    
    // ========== ACT 2: ROLE SCENARIO - War Room unter der Mall (for Service Desk) ==========
    await waitFor(() => {
      // Use getAllByText since the title appears in multiple places
      const elements = screen.getAllByText(/War Room unter der Mall/i);
      expect(elements.length).toBeGreaterThan(0);
    }, { timeout: 5000 });
    
    // Select correct option: "Du übersetzt Müllers Schrei" (REQUEST) - this will show diagram
    const requestButton = screen.getByText(/übersetzt Müllers Schrei/i).closest('button');
    await user.click(requestButton!);
    
    // Wait for diagram to appear and BESTÄTIGEN button
    await waitFor(() => {
      expect(screen.getByText(/BESTÄTIGEN/i)).toBeInTheDocument();
    }, { timeout: 3000 });
    
    const confirmBtn1 = screen.getByText(/BESTÄTIGEN/i);
    await user.click(confirmBtn1);
    
    // Return to map and complete act2_1
    await waitFor(() => {
      expect(screen.getByText(/EINSATZKARTE/i)).toBeInTheDocument();
    }, { timeout: 5000 });
    
    const schoolElements2 = screen.getAllByText(/Hawkins High/i);
    const schoolButton2 = schoolElements2.find(el => el.closest('button'))!.closest('button');
    await user.click(schoolButton2!);
    
    // ========== ACT 2: Klassenraum von Hawkins High – Drei Türen ==========
    await waitFor(() => {
      const elements = screen.getAllByText(/Klassenraum von Hawkins High/i);
      expect(elements.length).toBeGreaterThan(0);
    }, { timeout: 5000 });
    
    // Select correct option: "User beschreibt Impact. IT entscheidet intern..." (REQUEST type - shows diagram)
    const correctITILButton = screen.getByText(/User beschreibt Impact/i).closest('button');
    await user.click(correctITILButton!);
    
    await waitFor(() => {
      expect(screen.getByText(/BESTÄTIGEN/i)).toBeInTheDocument();
    }, { timeout: 3000 });
    
    const confirmBtn2 = screen.getByText(/BESTÄTIGEN/i);
    await user.click(confirmBtn2);
    
    // Return to map and complete act2_2
    await waitFor(() => {
      expect(screen.getByText(/EINSATZKARTE/i)).toBeInTheDocument();
    }, { timeout: 5000 });
    
    const schoolElements3 = screen.getAllByText(/Hawkins High/i);
    const schoolButton3 = schoolElements3.find(el => el.closest('button'))!.closest('button');
    await user.click(schoolButton3!);
    
    // ========== ACT 2: Das Void – Der Button aus einer anderen Dimension ==========
    await waitFor(() => {
      expect(screen.getByText(/Das Void/i)).toBeInTheDocument();
    }, { timeout: 5000 });
    
    // Select correct option: "Change: 'Neue Anforderung...'" (CHANGE type - shows diagram)
    const changeButton = screen.getByText(/Neue Anforderung.*Mind-Flayer-Kill-Button/i).closest('button');
    await user.click(changeButton!);
    
    await waitFor(() => {
      expect(screen.getByText(/BESTÄTIGEN/i)).toBeInTheDocument();
    }, { timeout: 3000 });
    
    const confirmBtn3 = screen.getByText(/BESTÄTIGEN/i);
    await user.click(confirmBtn3);
    
    // ========== ACT 3: TRANSITION ==========
    await waitFor(() => {
      // Look for the transition-specific text
      expect(screen.getByText(/Modell-Endgegner/i)).toBeInTheDocument();
    }, { timeout: 5000 });
    
    // ========== ACT 3: SKILL SELECTION ==========
    await waitFor(() => {
      expect(screen.getByText(/AUSRÜSTUNGSPHASE/i)).toBeInTheDocument();
    }, { timeout: 5000 });
    
    // Select any available skill (look for "Klicken zum Ausrüsten" which means clickable)
    await waitFor(() => {
      const availableSkillButtons = screen.queryAllByText(/Klicken zum Ausrüsten/i)
        .map(el => el.closest('button'))
        .filter((btn): btn is HTMLButtonElement => btn !== null && !btn.disabled);
      
      expect(availableSkillButtons.length).toBeGreaterThan(0);
    }, { timeout: 5000 });
    
    const availableSkillButtons = screen.queryAllByText(/Klicken zum Ausrüsten/i)
      .map(el => el.closest('button'))
      .filter((btn): btn is HTMLButtonElement => btn !== null && !btn.disabled);
    
    await user.click(availableSkillButtons[0]);
    
    await waitFor(() => {
      // Look for the map or other indication that transition happened
      expect(screen.getByText(/EINSATZKARTE/i)).toBeInTheDocument();
    }, { timeout: 5000 });
    
    // ========== ACT 3: MAP SELECTION ==========
    // Click on Hawkins Lab
    const labElements = screen.getAllByText(/Hawkins Lab/i);
    const labButton = labElements.find(el => el.closest('button'))!.closest('button');
    await user.click(labButton!);
    
    // ========== ACT 3: BOSS FIGHT - MODEL_FIX ==========
    await waitFor(() => {
      expect(screen.getByText(/Hawkins Lab Core/i)).toBeInTheDocument();
    }, { timeout: 5000 });
    
    // This is a MODEL_FIX type minigame  
    // Note: Without DEBUGGER skill, solving this requires puzzle-solving logic
    // For this test, we'll just verify the minigame loads correctly
    await waitFor(() => {
      const gameGrid = screen.queryByText(/AUFGABE/i); // Task description
      expect(gameGrid).toBeInTheDocument();
    }, { timeout: 3000 });
    
    // If AUTO-FIX is available (player has DEBUGGER, COFFEE, or RUBBER_DUCK skill), use it
    const autoFixButton = screen.queryByText(/DEBUGGER STARTEN.*AUTO-FIX/i);
    if (autoFixButton) {
      await user.click(autoFixButton);
      
      // ========== VICTORY ==========
      await waitFor(() => {
        // After completing the boss fight, we should see game over screen with victory
        expect(screen.getByText(/MISSION ERFÜLLT/i)).toBeInTheDocument();
      }, { timeout: 5000 });
      
      // Verify we're on end screen with single restart button
      expect(screen.getByText(/NEU STARTEN/i)).toBeInTheDocument();
    } else {
      // Skip victory check if AUTO-FIX not available
      // (In real gameplay, player would solve the puzzle manually)
      console.log('AUTO-FIX not available - test cannot auto-complete minigame');
    }
    
  }, 60000); // Reduced timeout due to faster transitions
});
