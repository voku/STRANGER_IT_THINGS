/**
 * Game Storyline Tests
 * 
 * These tests verify the main game flow and storylines:
 * - Act 1: Initial ticket triage scenario
 * - Act 2: Role-specific scenarios for all 7 characters
 * - Act 2: Core ITIL scenarios (act2_1, act2_2)
 * - Act 3: Boss fight scenario
 */

import { describe, it, expect } from 'vitest';
import { STORY_SCENARIOS, ACT_2_CORE_SCENARIOS, CHARACTERS } from '../constants';
import { Act } from '../types';

describe('Game Storylines', () => {
  describe('Act 1: Das verzerrte Ticket', () => {
    it('should have act1_1 scenario', () => {
      const act1Scenario = STORY_SCENARIOS.find(s => s.id === 'act1_1');
      expect(act1Scenario).toBeDefined();
      expect(act1Scenario?.act).toBe(Act.ACT_1_TICKET);
      expect(act1Scenario?.type).toBe('TRIAGE');
    });

    it('should have 3 options with one correct answer', () => {
      const act1Scenario = STORY_SCENARIOS.find(s => s.id === 'act1_1');
      expect(act1Scenario?.options).toHaveLength(3);
      
      const correctOptions = act1Scenario?.options?.filter(o => o.isCorrect === true);
      expect(correctOptions).toHaveLength(1);
      expect(correctOptions?.[0].type).toBe('INQUIRY');
    });

    it('should have proper outcome messages for all options', () => {
      const act1Scenario = STORY_SCENARIOS.find(s => s.id === 'act1_1');
      act1Scenario?.options?.forEach(option => {
        expect(option.outcome).toBeTruthy();
        expect(option.outcome.length).toBeGreaterThan(10);
      });
    });
  });

  describe('Act 2: Role-Specific Scenarios', () => {
    it('should have scenario for each character', () => {
      CHARACTERS.forEach(character => {
        const roleScenario = STORY_SCENARIOS.find(
          s => s.id === `act2_role_${character.id}`
        );
        expect(roleScenario).toBeDefined();
        expect(roleScenario?.act).toBe(Act.ACT_2_PERSPECTIVE);
      });
    });

    it('should have exactly 7 role-specific scenarios', () => {
      const roleScenarios = STORY_SCENARIOS.filter(
        s => s.id.startsWith('act2_role_')
      );
      expect(roleScenarios).toHaveLength(7);
    });

    describe('Service Desk scenario (act2_role_1)', () => {
      it('should be TRIAGE type with correct answer marked', () => {
        const scenario = STORY_SCENARIOS.find(s => s.id === 'act2_role_1');
        expect(scenario?.type).toBe('TRIAGE');
        expect(scenario?.title).toBe('Die Notaufnahme');
        
        const correctOption = scenario?.options?.find(o => o.isCorrect === true);
        expect(correctOption).toBeDefined();
        expect(correctOption?.type).toBe('INCIDENT');
      });
    });

    describe('IAM scenario (act2_role_2)', () => {
      it('should have REQUEST as correct answer', () => {
        const scenario = STORY_SCENARIOS.find(s => s.id === 'act2_role_2');
        const correctOption = scenario?.options?.find(o => o.isCorrect === true);
        expect(correctOption?.type).toBe('REQUEST');
      });
    });

    describe('Infrastructure scenario (act2_role_3 - Das Kraftwerk)', () => {
      it('should have INCIDENT as correct answer', () => {
        const scenario = STORY_SCENARIOS.find(s => s.id === 'act2_role_3');
        expect(scenario?.title).toBe('Das Kraftwerk');
        const correctOption = scenario?.options?.find(o => o.isCorrect === true);
        expect(correctOption?.type).toBe('INCIDENT');
        expect(correctOption?.label).toContain('Turbine');
      });
    });

    describe('Developer scenario (act2_role_4)', () => {
      it('should have INCIDENT as correct answer', () => {
        const scenario = STORY_SCENARIOS.find(s => s.id === 'act2_role_4');
        const correctOption = scenario?.options?.find(o => o.isCorrect === true);
        expect(correctOption?.type).toBe('INCIDENT');
      });
    });

    describe('Licensing scenario (act2_role_5)', () => {
      it('should have INCIDENT as correct answer', () => {
        const scenario = STORY_SCENARIOS.find(s => s.id === 'act2_role_5');
        const correctOption = scenario?.options?.find(o => o.isCorrect === true);
        expect(correctOption?.type).toBe('INCIDENT');
      });
    });

    describe('ERP scenario (act2_role_6)', () => {
      it('should have INCIDENT as correct answer', () => {
        const scenario = STORY_SCENARIOS.find(s => s.id === 'act2_role_6');
        const correctOption = scenario?.options?.find(o => o.isCorrect === true);
        expect(correctOption?.type).toBe('INCIDENT');
      });
    });

    describe('Purchasing scenario (act2_role_7)', () => {
      it('should have INCIDENT as correct answer', () => {
        const scenario = STORY_SCENARIOS.find(s => s.id === 'act2_role_7');
        const correctOption = scenario?.options?.find(o => o.isCorrect === true);
        expect(correctOption?.type).toBe('INCIDENT');
      });
    });
  });

  describe('Act 2: Core ITIL Scenarios', () => {
    it('should have required core scenarios defined', () => {
      expect(ACT_2_CORE_SCENARIOS).toEqual(['act2_1', 'act2_2']);
    });

    describe('ITIL Tempel (act2_1)', () => {
      it('should test fundamental ITIL understanding', () => {
        const scenario = STORY_SCENARIOS.find(s => s.id === 'act2_1');
        expect(scenario).toBeDefined();
        expect(scenario?.title).toBe('Der ITIL Tempel');
        expect(scenario?.act).toBe(Act.ACT_2_PERSPECTIVE);
        
        const correctOption = scenario?.options?.find(o => o.isCorrect === true);
        expect(correctOption?.type).toBe('REQUEST');
        expect(correctOption?.label).toContain('Incident = Kaputt');
      });
    });

    describe('Change Request (act2_2)', () => {
      it('should require CHANGE as correct answer', () => {
        const scenario = STORY_SCENARIOS.find(s => s.id === 'act2_2');
        expect(scenario).toBeDefined();
        expect(scenario?.title).toBe('Die fehlende Magie');
        
        const correctOption = scenario?.options?.find(o => o.isCorrect === true);
        expect(correctOption?.type).toBe('CHANGE');
        expect(correctOption?.label).toContain('Change Request');
      });

      it('should have 3 options with INCIDENT and REQUEST as wrong answers', () => {
        const scenario = STORY_SCENARIOS.find(s => s.id === 'act2_2');
        expect(scenario?.options).toHaveLength(3);
        
        const wrongOptions = scenario?.options?.filter(o => o.isCorrect === false);
        expect(wrongOptions).toHaveLength(2);
      });
    });
  });

  describe('Act 3: Boss Fight', () => {
    it('should have act3_1 MODEL_FIX scenario', () => {
      const act3Scenario = STORY_SCENARIOS.find(s => s.id === 'act3_1');
      expect(act3Scenario).toBeDefined();
      expect(act3Scenario?.act).toBe(Act.ACT_3_BOSS);
      expect(act3Scenario?.type).toBe('MODEL_FIX');
      expect(act3Scenario?.title).toBe('Der Modell-Endgegner');
    });

    it('should have difficulty level configured', () => {
      const act3Scenario = STORY_SCENARIOS.find(s => s.id === 'act3_1');
      expect(act3Scenario?.difficultyLevel).toBeDefined();
      expect(act3Scenario?.difficultyLevel).toBeGreaterThan(0);
    });
  });

  describe('Scenario Progression', () => {
    it('should have scenarios for all three acts', () => {
      const act1Scenarios = STORY_SCENARIOS.filter(s => s.act === Act.ACT_1_TICKET);
      const act2Scenarios = STORY_SCENARIOS.filter(s => s.act === Act.ACT_2_PERSPECTIVE);
      const act3Scenarios = STORY_SCENARIOS.filter(s => s.act === Act.ACT_3_BOSS);
      
      expect(act1Scenarios.length).toBeGreaterThan(0);
      expect(act2Scenarios.length).toBeGreaterThan(0);
      expect(act3Scenarios.length).toBeGreaterThan(0);
    });

    it('should have unique scenario IDs', () => {
      const ids = STORY_SCENARIOS.map(s => s.id);
      const uniqueIds = new Set(ids);
      expect(ids.length).toBe(uniqueIds.size);
    });

    it('should have all scenarios with required fields', () => {
      STORY_SCENARIOS.forEach(scenario => {
        expect(scenario.id).toBeTruthy();
        expect(scenario.act).toBeTruthy();
        expect(scenario.type).toBeTruthy();
        expect(scenario.title).toBeTruthy();
        expect(scenario.description).toBeTruthy();
      });
    });
  });

  describe('isCorrect Flag Validation', () => {
    it('all TRIAGE scenarios should have exactly one correct answer', () => {
      const triageScenarios = STORY_SCENARIOS.filter(s => s.type === 'TRIAGE');
      
      triageScenarios.forEach(scenario => {
        const correctOptions = scenario.options?.filter(o => o.isCorrect === true) || [];
        expect(correctOptions.length).toBe(1);
      });
    });

    it('all scenario options should have isCorrect defined', () => {
      STORY_SCENARIOS.forEach(scenario => {
        if (scenario.options) {
          scenario.options.forEach(option => {
            expect(option.isCorrect).toBeDefined();
          });
        }
      });
    });
  });
});
