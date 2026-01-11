/**
 * Simple Gameplay Test - Debug version
 */

import { describe, it, expect } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { CHARACTERS } from '../constants';

describe('Simple Gameplay Test', () => {
  it('should start the game and reach character selection', async () => {
    const user = userEvent.setup();
    render(<App />);
    
    // Verify intro screen
    expect(screen.getByText(/STRANGER/i)).toBeInTheDocument();
    
    // Enter name
    const nameInput = screen.getByPlaceholderText(/AGENT NAME EINGEBEN/i);
    await user.type(nameInput, 'TestAgent');
    
    // Start game
    const startButton = screen.getByText(/INSERT COIN/i);
    await user.click(startButton);
    
    // Should reach character selection (faster transitions now ~1.7s)
    await waitFor(() => {
      expect(screen.getByText(/WÄHLE DEINEN CHARAKTER/i)).toBeInTheDocument();
    }, { timeout: 5000 });
  });

  it('should select character without fake timers', async () => {
    const user = userEvent.setup();
    render(<App />);
    
    // Navigate to character selection
    const nameInput = screen.getByPlaceholderText(/AGENT NAME EINGEBEN/i);
    await user.type(nameInput, 'TestAgent');
    await user.click(screen.getByText(/INSERT COIN/i));
    
    await waitFor(() => {
      expect(screen.getByText(/WÄHLE DEINEN CHARAKTER/i)).toBeInTheDocument();
    }, { timeout: 5000 });
    
    // Select first character
    const firstCharacter = CHARACTERS[0];
    const charButton = screen.getByText(firstCharacter.name);
    await user.click(charButton);
    
    // Wait for transition to show
    await waitFor(() => {
      expect(screen.getByText(/DAS WERKZEUG/i)).toBeInTheDocument();
    }, { timeout: 3000 });
    
    // Wait for skill selection screen (faster transitions now ~1.7s)
    await waitFor(() => {
      expect(screen.getByText(/AUSRÜSTUNGSPHASE/i)).toBeInTheDocument();
    }, { timeout: 5000 });
    
    // Verify we're on skill selection and can see content
    expect(screen.getByText(/AUSRÜSTUNGSPHASE/i)).toBeInTheDocument();
  });

  it('golden path: should complete full flow from intro to skill selection and select a skill', async () => {
    const user = userEvent.setup();
    render(<App />);
    
    // Step 1: Enter name and start game
    const nameInput = screen.getByPlaceholderText(/AGENT NAME EINGEBEN/i);
    await user.type(nameInput, 'TestAgent');
    await user.click(screen.getByText(/INSERT COIN/i));
    
    // Step 2: Wait for and verify character selection screen (faster transitions)
    await waitFor(() => {
      expect(screen.getByText(/WÄHLE DEINEN CHARAKTER/i)).toBeInTheDocument();
    }, { timeout: 5000 });
    
    // Step 3: Select first character (The Operator)
    const firstCharacter = CHARACTERS[0];
    const charButton = screen.getByText(firstCharacter.name);
    await user.click(charButton);
    
    // Step 4: Wait for transition animation
    await waitFor(() => {
      expect(screen.getByText(/DAS WERKZEUG/i)).toBeInTheDocument();
    }, { timeout: 3000 });
    
    // Step 5: Wait for skill selection screen (AUSRÜSTUNGSPHASE)
    await waitFor(() => {
      expect(screen.getByText(/AUSRÜSTUNGSPHASE/i)).toBeInTheDocument();
    }, { timeout: 5000 });
    
    // Step 6: Wait for skill buttons to be rendered (after transition completes)
    // Since we now show 4 random items, we can't guarantee specific items will appear
    // Just verify that some skills are displayed and at least one is selectable
    let skillButtons: HTMLElement[] = [];
    await waitFor(() => {
      skillButtons = screen.queryAllByRole('button').filter(btn => 
        btn.textContent?.includes('Klicken zum Ausrüsten')
      );
      expect(skillButtons.length).toBeGreaterThan(0);
    }, { timeout: 3000 });
    
    expect(skillButtons.length).toBeLessThanOrEqual(4); // Should show max 4 items
    
    // Step 7: Select the first available skill (any of the randomized ones)
    const firstSkillButton = skillButtons[0];
    expect(firstSkillButton).not.toBeNull();
    expect(firstSkillButton).not.toBeDisabled();
    await user.click(firstSkillButton);
    
    // Step 8: Wait for transition to next screen (AKT 1)
    await waitFor(() => {
      expect(screen.getByText(/AKT 1/i)).toBeInTheDocument();
    }, { timeout: 3000 });
    
    // Step 9: Verify we reach the map selection screen after transition
    await waitFor(() => {
      // Look for map-related text or terminal messages
      const terminalText = screen.queryByText(/SYSTEM NEUSTART/i) || screen.queryByText(/Willkommen/i);
      expect(terminalText).toBeInTheDocument();
    }, { timeout: 5000 });
  }, 20000); // Reduced timeout due to faster transitions

  it('golden path: complete game from start to finish', async () => {
    const user = userEvent.setup();
    render(<App />);
    
    // ========== ACT 0: INTRO ==========
    const nameInput = screen.getByPlaceholderText(/AGENT NAME EINGEBEN/i);
    await user.type(nameInput, 'GoldenPathAgent');
    await user.click(screen.getByText(/INSERT COIN/i));
    
    await waitFor(() => {
      expect(screen.getByText(/WÄHLE DEINEN CHARAKTER/i)).toBeInTheDocument();
    }, { timeout: 5000 });
    
    // ========== CHARACTER SELECTION ==========
    const operatorButton = screen.getByText(CHARACTERS[0].name);
    await user.click(operatorButton);
    
    await waitFor(() => {
      expect(screen.getByText(/DAS WERKZEUG/i)).toBeInTheDocument();
    }, { timeout: 3000 });
    
    // ========== ACT 1: SKILL SELECTION ==========
    await waitFor(() => {
      expect(screen.getByText(/AUSRÜSTUNGSPHASE/i)).toBeInTheDocument();
    }, { timeout: 5000 });
    
    // Wait for skill buttons to be rendered (after transition completes)
    let skillButtons: HTMLElement[] = [];
    await waitFor(() => {
      skillButtons = screen.queryAllByRole('button').filter(btn => 
        btn.textContent?.includes('Klicken zum Ausrüsten')
      );
      expect(skillButtons.length).toBeGreaterThan(0);
    }, { timeout: 3000 });
    
    await user.click(skillButtons[0]);
    
    await waitFor(() => {
      // Look for transition-specific text "Das verzerrte Ticket"
      expect(screen.getByText(/verzerrte Ticket/i)).toBeInTheDocument();
    }, { timeout: 3000 });
    
    // ========== ACT 1: MAP SELECTION ==========
    await waitFor(() => {
      expect(screen.getByText(/EINSATZKARTE/i)).toBeInTheDocument();
    }, { timeout: 5000 });
    
    // Click on Starcourt Mall location - use getAllByText to get the button specifically
    const mallElements = screen.getAllByText(/Starcourt Mall/i);
    const mallButton = mallElements.find(el => el.closest('button'));
    expect(mallButton).toBeDefined();
    const actualMallButton = mallButton!.closest('button');
    expect(actualMallButton).not.toBeDisabled();
    await user.click(actualMallButton!);
    
    // ========== ACT 1: SCENARIO - Der User-Nebel ==========
    await waitFor(() => {
      expect(screen.getByText(/Der User-Nebel/i)).toBeInTheDocument();
    }, { timeout: 5000 });
    
    // Select the correct option: "NACHFRAGEN: 'Was ist der Soll-Zustand?'" (INQUIRY type)
    const inquiryButton = screen.getByText(/NACHFRAGEN.*Soll-Zustand/i).closest('button');
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
    
    // ========== ACT 2: ROLE SCENARIO - Die Notaufnahme (for Service Desk) ==========
    await waitFor(() => {
      expect(screen.getByText(/Die Notaufnahme/i)).toBeInTheDocument();
    }, { timeout: 5000 });
    
    // Select correct option: "Die Blutung stoppen (INCIDENT)" - this will show diagram
    const incidentButton = screen.getByText(/Blutung stoppen.*INCIDENT/i).closest('button');
    await user.click(incidentButton!);
    
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
    
    // ========== ACT 2: ITIL TEMPEL ==========
    await waitFor(() => {
      expect(screen.getByText(/ITIL Tempel/i)).toBeInTheDocument();
    }, { timeout: 5000 });
    
    // Select correct option: "Incident = Kaputt. Request = Neu." (REQUEST type - shows diagram)
    const correctITILButton = screen.getByText(/Incident.*Kaputt.*Request.*Neu/i).closest('button');
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
    
    // ========== ACT 2: DIE FEHLENDE MAGIE ==========
    await waitFor(() => {
      expect(screen.getByText(/fehlende Magie/i)).toBeInTheDocument();
    }, { timeout: 5000 });
    
    // Select correct option: "Change Request (Requirement)" (CHANGE type - shows diagram)
    const changeButton = screen.getByText(/Change Request.*Requirement/i).closest('button');
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
      expect(screen.getByText(/Modell-Endgegner/i)).toBeInTheDocument();
    }, { timeout: 5000 });
    
    // This is a MODEL_FIX type minigame - use the DEBUGGER AUTO-FIX
    await waitFor(() => {
      expect(screen.getByText(/DEBUGGER STARTEN.*AUTO-FIX/i)).toBeInTheDocument();
    }, { timeout: 3000 });
    
    const autoFixButton = screen.getByText(/DEBUGGER STARTEN.*AUTO-FIX/i);
    await user.click(autoFixButton);
    
    // ========== VICTORY ==========
    await waitFor(() => {
      // After completing the boss fight, we should see game over screen with victory
      expect(screen.getByText(/MISSION ERFÜLLT/i)).toBeInTheDocument();
    }, { timeout: 5000 });
    
    // Verify we're on end screen with single restart button
    expect(screen.getByText(/NEU STARTEN/i)).toBeInTheDocument();
    
  }, 60000); // Reduced timeout due to faster transitions
});
