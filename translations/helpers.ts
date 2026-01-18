/**
 * Translation helpers for dynamic content
 * 
 * These functions map IDs from constants to translated content
 */

import { useTranslation } from './index';

/**
 * Get translated character data
 */
export const useCharacterTranslation = (characterId: string) => {
  const { t } = useTranslation();
  
  const translations: Record<string, { description: string; specialAbility: string }> = {
    '1': {
      description: t.characters.hopper.description,
      specialAbility: t.characters.hopper.specialAbility
    },
    '2': {
      description: t.characters.brenner.description,
      specialAbility: t.characters.brenner.specialAbility
    },
    '3': {
      description: t.characters.bob.description,
      specialAbility: t.characters.bob.specialAbility
    },
    '4': {
      description: t.characters.dustin.description,
      specialAbility: t.characters.dustin.specialAbility
    },
    '5': {
      description: t.characters.murray.description,
      specialAbility: t.characters.murray.specialAbility
    },
    '6': {
      description: t.characters.joyce.description,
      specialAbility: t.characters.joyce.specialAbility
    },
    '7': {
      description: t.characters.steve.description,
      specialAbility: t.characters.steve.specialAbility
    }
  };
  
  return translations[characterId] || { description: '', specialAbility: '' };
};

/**
 * Get translated skill data
 */
export const useSkillTranslation = (skillId: string) => {
  const { t } = useTranslation();
  
  const translations: Record<string, { name: string; description: string }> = {
    'RUBBER_DUCK': {
      name: t.skills.rubberDuck.name,
      description: t.skills.rubberDuck.description
    },
    'ITIL_BOOK': {
      name: t.skills.itilBook.name,
      description: t.skills.itilBook.description
    },
    'COFFEE': {
      name: t.skills.coffee.name,
      description: t.skills.coffee.description
    },
    'DEBUGGER': {
      name: t.skills.debugger.name,
      description: t.skills.debugger.description
    },
    'EXPIRED_ENERGY_DRINK': {
      name: t.skills.expiredDrink.name,
      description: t.skills.expiredDrink.description
    },
    'OUTDATED_DOCUMENTATION': {
      name: t.skills.outdatedDocs.name,
      description: t.skills.outdatedDocs.description
    },
    'BUGGY_SCRIPT': {
      name: t.skills.buggyScript.name,
      description: t.skills.buggyScript.description
    }
  };
  
  return translations[skillId] || { name: '', description: '' };
};

/**
 * Get translated location data
 */
export const useLocationTranslation = (locationId: string) => {
  const { t } = useTranslation();
  
  const translations: Record<string, { name: string; description: string }> = {
    'MALL': {
      name: t.locations.mall.name,
      description: t.locations.mall.description
    },
    'SCHOOL': {
      name: t.locations.school.name,
      description: t.locations.school.description
    },
    'LAB': {
      name: t.locations.lab.name,
      description: t.locations.lab.description
    },
    'ARCADE': {
      name: t.locations.arcade.name,
      description: t.locations.arcade.description
    },
    'FOREST': {
      name: t.locations.forest.name,
      description: t.locations.forest.description
    },
    'UPSIDEDOWN': {
      name: t.locations.upsidedown.name,
      description: t.locations.upsidedown.description
    }
  };
  
  return translations[locationId] || { name: '', description: '' };
};
