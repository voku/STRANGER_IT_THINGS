/**
 * Character Card Component with Translation Support
 */

import React from 'react';
import { Character } from '../types';
import { useTranslation } from '../translations';
import { useCharacterTranslation, useRoleTranslation } from '../translations/helpers';

interface CharacterCardProps {
  character: Character;
  onSelect: (character: Character) => void;
}

const CharacterCard: React.FC<CharacterCardProps> = ({ character, onSelect }) => {
  const { t } = useTranslation();
  const charTranslation = useCharacterTranslation(character.id);
  const roleDisplayName = useRoleTranslation(character.role);

  return (
    <button
      onClick={() => onSelect(character)}
      className={`p-6 bg-gray-900 border-4 ${character.themeColor} hover:scale-105 transition-all rounded-lg shadow-lg flex flex-col items-center gap-4 font-press-start`}
    >
      <div className="text-6xl">{character.portraitEmoji}</div>
      <h3 className="text-xl">{character.name}</h3>
      <div className="text-xs text-gray-400">{roleDisplayName}</div>
      <p className="text-xs text-center leading-relaxed text-gray-300">
        {charTranslation.description}
      </p>
      <div className="flex gap-4 text-xs">
        <div>{t.ui.stats.speed}: {character.stats.sla}</div>
        <div>{t.ui.stats.accuracy}: {character.stats.quality}</div>
        <div>{t.ui.stats.hp}: {character.stats.morale}</div>
      </div>
    </button>
  );
};

export default CharacterCard;
