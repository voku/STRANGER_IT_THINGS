import { SYSTEM_MESSAGES } from "../constants";

// This service replaces the dynamic AI calls with robust, pre-defined sets
// to ensure stability, performance, and narrative consistency.

export const getRandomSystemMessage = (type: 'LOADING' | 'SUCCESS' | 'FAILURE'): string => {
  const messages = SYSTEM_MESSAGES[type];
  const randomIndex = Math.floor(Math.random() * messages.length);
  return messages[randomIndex];
};

export const getGlitchText = (text: string): string => {
  // Simple effect to make text look corrupted
  const chars = text.split('');
  if (Math.random() > 0.8) {
      const idx = Math.floor(Math.random() * chars.length);
      chars[idx] = ['#', '$', '%', '&', '0', '1'][Math.floor(Math.random() * 6)];
  }
  return chars.join('');
};