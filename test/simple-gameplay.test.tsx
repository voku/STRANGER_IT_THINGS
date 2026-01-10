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
});
