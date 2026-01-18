/**
 * Language Selector Component
 * 
 * Allows users to switch between languages
 */

import React from 'react';
import { useTranslation, Language } from '../translations';

interface LanguageSelectorProps {
  className?: string;
  showLabel?: boolean;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ 
  className = '', 
  showLabel = true 
}) => {
  const { language, setLanguage, t } = useTranslation();

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang);
  };

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {showLabel && (
        <span className="font-vt323 text-xl text-gray-400">
          {t.language.select}:
        </span>
      )}
      <div className="flex gap-2">
        <button
          onClick={() => handleLanguageChange('en')}
          className={`px-4 py-2 border-2 font-press-start text-xs transition-all ${
            language === 'en'
              ? 'bg-red-700 border-red-500 text-white shadow-[0_0_20px_rgba(220,38,38,0.5)]'
              : 'bg-gray-800 border-gray-600 text-gray-400 hover:border-gray-500'
          }`}
          aria-label="Switch to English"
        >
          EN
        </button>
        <button
          onClick={() => handleLanguageChange('de')}
          className={`px-4 py-2 border-2 font-press-start text-xs transition-all ${
            language === 'de'
              ? 'bg-red-700 border-red-500 text-white shadow-[0_0_20px_rgba(220,38,38,0.5)]'
              : 'bg-gray-800 border-gray-600 text-gray-400 hover:border-gray-500'
          }`}
          aria-label="Zu Deutsch wechseln"
        >
          DE
        </button>
      </div>
    </div>
  );
};

export default LanguageSelector;
