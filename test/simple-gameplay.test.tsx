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
    
    // Should reach character selection
    await waitFor(() => {
      expect(screen.getByText(/WÄHLE DEINEN CHARAKTER/i)).toBeInTheDocument();
    }, { timeout: 10000 });
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
    }, { timeout: 10000 });
    
    // Select first character
    const firstCharacter = CHARACTERS[0];
    const charButton = screen.getByText(firstCharacter.name);
    await user.click(charButton);
    
    // Wait for transition to show
    await waitFor(() => {
      expect(screen.getByText(/DAS WERKZEUG/i)).toBeInTheDocument();
    }, { timeout: 5000 });
    
    // Wait for skill selection screen (using real timers - 5.5 seconds)
    await waitFor(() => {
      expect(screen.getByText(/AUSRÜSTUNGSPHASE/i)).toBeInTheDocument();
    }, { timeout: 10000 });
    
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
    
    // Step 2: Wait for and verify character selection screen
    await waitFor(() => {
      expect(screen.getByText(/WÄHLE DEINEN CHARAKTER/i)).toBeInTheDocument();
    }, { timeout: 10000 });
    
    // Step 3: Select first character (The Operator)
    const firstCharacter = CHARACTERS[0];
    const charButton = screen.getByText(firstCharacter.name);
    await user.click(charButton);
    
    // Step 4: Wait for transition animation
    await waitFor(() => {
      expect(screen.getByText(/DAS WERKZEUG/i)).toBeInTheDocument();
    }, { timeout: 5000 });
    
    // Step 5: Wait for skill selection screen (AUSRÜSTUNGSPHASE)
    await waitFor(() => {
      expect(screen.getByText(/AUSRÜSTUNGSPHASE/i)).toBeInTheDocument();
    }, { timeout: 10000 });
    
    // Step 6: Verify initial unlocked skills (Rubber Duck and ITIL Book should be available)
    expect(screen.getByText(/Rubber Duck/i)).toBeInTheDocument();
    expect(screen.getByText(/ITIL V4 Codex/i)).toBeInTheDocument();
    
    // Step 7: Select the first available skill (Rubber Duck)
    const rubberDuckButton = screen.getByText(/Rubber Duck/i).closest('button');
    expect(rubberDuckButton).not.toBeNull();
    expect(rubberDuckButton).not.toBeDisabled();
    await user.click(rubberDuckButton!);
    
    // Step 8: Wait for transition to next screen (AKT 1)
    await waitFor(() => {
      expect(screen.getByText(/AKT 1/i)).toBeInTheDocument();
    }, { timeout: 5000 });
    
    // Step 9: Verify we reach the map selection screen after transition
    await waitFor(() => {
      // Look for map-related text or terminal messages
      const terminalText = screen.queryByText(/SYSTEM NEUSTART/i) || screen.queryByText(/Willkommen/i);
      expect(terminalText).toBeInTheDocument();
    }, { timeout: 10000 });
  }, 30000); // Set timeout to 30 seconds for this long test
});
