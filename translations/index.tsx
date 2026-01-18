/**
 * Translation Context and Provider
 * 
 * Provides i18n functionality throughout the app
 */

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { en } from './en';
import { de } from './de';
import type { TranslationKey } from './en';

export type Language = 'en' | 'de';

interface TranslationContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: TranslationKey;
}

const TranslationContext = createContext<TranslationContextType | undefined>(undefined);

const translations: Record<Language, TranslationKey> = {
  en,
  de
};

interface TranslationProviderProps {
  children: ReactNode;
  defaultLanguage?: Language;
}

export const TranslationProvider: React.FC<TranslationProviderProps> = ({ 
  children, 
  defaultLanguage = 'en' // Default to English as requested
}) => {
  const [language, setLanguage] = useState<Language>(defaultLanguage);

  const value: TranslationContextType = {
    language,
    setLanguage,
    t: translations[language]
  };

  return (
    <TranslationContext.Provider value={value}>
      {children}
    </TranslationContext.Provider>
  );
};

export const useTranslation = (): TranslationContextType => {
  const context = useContext(TranslationContext);
  if (!context) {
    throw new Error('useTranslation must be used within a TranslationProvider');
  }
  return context;
};

/**
 * Helper function to replace placeholders in translation strings
 * Example: formatMessage("Hello {name}", { name: "World" }) => "Hello World"
 */
export const formatMessage = (message: string, params: Record<string, string | number>): string => {
  let result = message;
  Object.entries(params).forEach(([key, value]) => {
    result = result.replace(new RegExp(`\\{${key}\\}`, 'g'), String(value));
  });
  return result;
};
