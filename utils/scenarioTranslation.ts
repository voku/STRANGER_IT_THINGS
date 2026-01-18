/**
 * Utility to get translated scenario content
 * 
 * This module provides functions to retrieve translated versions of scenarios
 * from the translation files, falling back to the original constants if needed.
 */

import { Scenario, ScenarioOption } from '../types';
import { TranslationKey } from '../translations/en';

/**
 * Get a translated scenario by merging translation data with the base scenario
 * @param scenario - The base scenario from constants.ts
 * @param translations - The translation object (t)
 * @returns A new scenario object with translated content
 */
export function getTranslatedScenario(scenario: Scenario, translations: TranslationKey): Scenario {
  const scenarioTranslation = (translations.scenarios as any)[scenario.id];
  
  // If no translation exists, return original
  if (!scenarioTranslation) {
    return scenario;
  }
  
  // Create translated scenario
  const translatedScenario: Scenario = {
    ...scenario,
    title: scenarioTranslation.title || scenario.title,
    environment: scenarioTranslation.environment || scenario.environment,
    hint: scenarioTranslation.hint || scenario.hint,
    description: scenarioTranslation.description || scenario.description,
    successMessage: scenarioTranslation.successMessage || scenario.successMessage,
    failureMessage: scenarioTranslation.failureMessage || scenario.failureMessage,
  };
  
  // Translate options if they exist
  if (scenario.options && scenarioTranslation.options) {
    translatedScenario.options = scenario.options.map((option, index) => {
      // Find matching translated option by type
      const translatedOption = findTranslatedOption(scenarioTranslation.options, option.type);
      
      if (translatedOption) {
        return {
          ...option,
          label: translatedOption.label || option.label,
          outcome: translatedOption.outcome || option.outcome,
        };
      }
      
      return option;
    });
  }
  
  return translatedScenario;
}

/**
 * Helper function to find a translated option by type
 */
function findTranslatedOption(options: any, type: string): any {
  // Handle different translation structures
  if (options.incident && type === 'INCIDENT') return options.incident;
  if (options.request && type === 'REQUEST') return options.request;
  if (options.change && type === 'CHANGE') return options.change;
  if (options.inquiry && type === 'INQUIRY') return options.inquiry;
  
  // Handle array structure (legacy)
  if (Array.isArray(options)) {
    return options.find((opt: any) => opt.type === type);
  }
  
  return null;
}
