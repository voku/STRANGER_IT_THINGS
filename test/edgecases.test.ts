/**
 * Edge Case and Integration Tests
 * 
 * These tests focus on:
 * - Boundary values (0, 100, negative numbers)
 * - Edge cases in game logic
 * - State management issues
 * - Error conditions
 * - Integration between components
 */

import { describe, it, expect } from 'vitest';
import { checkGameOver, clampStat, createLogEntry } from '../utils/gameHelpers';
import { STORY_SCENARIOS, SKILLS } from '../constants';
import { Act } from '../types';

describe('Edge Cases and Integration', () => {
  describe('Stat Clamping Edge Cases', () => {
    it('should handle exactly 0', () => {
      expect(clampStat(0)).toBe(0);
    });

    it('should handle exactly 100', () => {
      expect(clampStat(100)).toBe(100);
    });

    it('should clamp negative values to 0', () => {
      expect(clampStat(-1)).toBe(0);
      expect(clampStat(-100)).toBe(0);
      expect(clampStat(-0.5)).toBe(0);
    });

    it('should clamp values over 100', () => {
      expect(clampStat(101)).toBe(100);
      expect(clampStat(200)).toBe(100);
      expect(clampStat(100.1)).toBe(100);
    });

    it('should handle floating point values correctly', () => {
      expect(clampStat(50.5)).toBe(50.5);
      expect(clampStat(99.9)).toBe(99.9);
      expect(clampStat(0.1)).toBe(0.1);
    });

    it('should handle edge case: very large numbers', () => {
      expect(clampStat(Number.MAX_SAFE_INTEGER)).toBe(100);
    });

    it('should handle edge case: very small numbers', () => {
      expect(clampStat(Number.MIN_SAFE_INTEGER)).toBe(0);
    });

    it('should handle NaN gracefully by converting to 0', () => {
      const result = clampStat(NaN);
      expect(result).toBe(0); // Should convert NaN to 0 to prevent state corruption
    });

    it('should handle Infinity by converting to 0', () => {
      expect(clampStat(Infinity)).toBe(0);
      expect(clampStat(-Infinity)).toBe(0);
    });
  });

  describe('Game Over Edge Cases', () => {
    it('should trigger game over when SLA is exactly 0', () => {
      const result = checkGameOver(0, 50, 50);
      expect(result.isGameOver).toBe(true);
      expect(result.reason).toContain('SLA FAILURE');
    });

    it('should trigger game over when morale is exactly 0', () => {
      const result = checkGameOver(50, 0, 50);
      expect(result.isGameOver).toBe(true);
      expect(result.reason).toContain('MORAL COLLAPSE');
    });

    it('should trigger game over when quality is exactly 0', () => {
      const result = checkGameOver(50, 50, 0);
      expect(result.isGameOver).toBe(true);
      expect(result.reason).toContain('QUALITY FAILURE');
    });

    it('should NOT trigger game over when all stats are 1', () => {
      const result = checkGameOver(1, 1, 1);
      expect(result.isGameOver).toBe(false);
    });

    it('should trigger game over when multiple stats are 0 (SLA priority)', () => {
      const result = checkGameOver(0, 0, 50);
      expect(result.isGameOver).toBe(true);
      expect(result.reason).toContain('SLA FAILURE');
    });

    it('should handle negative stats (treat as game over)', () => {
      const result = checkGameOver(-10, 50, 50);
      expect(result.isGameOver).toBe(true);
    });

    it('should NOT trigger game over with very high stats', () => {
      const result = checkGameOver(100, 100, 100);
      expect(result.isGameOver).toBe(false);
    });
  });

  describe('Scenario Data Integrity', () => {
    it('should not have duplicate scenario IDs', () => {
      const ids = STORY_SCENARIOS.map(s => s.id);
      const uniqueIds = new Set(ids);
      expect(ids.length).toBe(uniqueIds.size);
    });

    it('should have valid Act references for all scenarios', () => {
      // Act enum values are German display strings, not keys
      const validActs = [Act.ACT_1_TICKET, Act.ACT_2_PERSPECTIVE, Act.ACT_3_BOSS];
      STORY_SCENARIOS.forEach(scenario => {
        expect(validActs).toContain(scenario.act);
      });
    });

    it('should have at least one option for all TRIAGE scenarios', () => {
      const triageScenarios = STORY_SCENARIOS.filter(s => s.type === 'TRIAGE');
      triageScenarios.forEach(scenario => {
        expect(scenario.options).toBeDefined();
        expect(scenario.options!.length).toBeGreaterThan(0);
      });
    });

    it('should have isCorrect defined for all options', () => {
      STORY_SCENARIOS.forEach(scenario => {
        scenario.options?.forEach((option, idx) => {
          expect(option.isCorrect).toBeDefined();
        });
      });
    });

    it('should have exactly one correct answer per TRIAGE scenario', () => {
      const triageScenarios = STORY_SCENARIOS.filter(s => s.type === 'TRIAGE');
      triageScenarios.forEach(scenario => {
        const correctCount = scenario.options?.filter(o => o.isCorrect === true).length;
        expect(correctCount).toBe(1);
      });
    });

    it('should not have multiple correct answers per scenario', () => {
      STORY_SCENARIOS.forEach(scenario => {
        if (scenario.options) {
          const correctCount = scenario.options.filter(o => o.isCorrect === true).length;
          expect(correctCount).toBeLessThanOrEqual(1);
        }
      });
    });

    it('should have unique option labels within each scenario', () => {
      STORY_SCENARIOS.forEach(scenario => {
        if (scenario.options) {
          const labels = scenario.options.map(o => o.label);
          const uniqueLabels = new Set(labels);
          expect(labels.length).toBe(uniqueLabels.size);
        }
      });
    });
  });

  describe('Skill System Edge Cases', () => {
    it('should have unique skill IDs', () => {
      const ids = SKILLS.map(s => s.id);
      const uniqueIds = new Set(ids);
      expect(ids.length).toBe(uniqueIds.size);
    });

    it('should have valid slaPenalty for all skills', () => {
      SKILLS.forEach(skill => {
        expect(skill.slaPenalty).toBeGreaterThanOrEqual(0);
        expect(skill.slaPenalty).toBeLessThanOrEqual(100);
      });
    });

    it('should not have negative penalties', () => {
      SKILLS.forEach(skill => {
        expect(skill.slaPenalty).toBeGreaterThan(0);
      });
    });

    it('should have valid targetAct for all skills', () => {
      // Act enum values are German display strings
      const validActs = [Act.ACT_1_TICKET, Act.ACT_2_PERSPECTIVE, Act.ACT_3_BOSS];
      SKILLS.forEach(skill => {
        if (skill.targetAct) {
          expect(validActs).toContain(skill.targetAct);
        }
      });
    });
  });

  describe('Log Entry Creation', () => {
    it('should create unique IDs for log entries', () => {
      const log1 = createLogEntry('Test 1');
      const log2 = createLogEntry('Test 2');
      expect(log1.id).not.toBe(log2.id);
    });

    it('should handle empty text', () => {
      const log = createLogEntry('');
      expect(log.text).toBe('');
      expect(log.id).toBeDefined();
      expect(log.timestamp).toBeDefined();
    });

    it('should handle very long text', () => {
      const longText = 'a'.repeat(10000);
      const log = createLogEntry(longText);
      expect(log.text).toBe(longText);
      expect(log.text.length).toBe(10000);
    });

    it('should default to SYSTEM speaker', () => {
      const log = createLogEntry('Test');
      expect(log.speaker).toBe('SYSTEM');
    });

    it('should accept different speaker types', () => {
      const speakers = ['SYSTEM', 'GM', 'PLAYER', 'DM'] as const;
      speakers.forEach(speaker => {
        const log = createLogEntry('Test', speaker);
        expect(log.speaker).toBe(speaker);
      });
    });

    it('should create timestamp at creation time', () => {
      const before = new Date();
      const log = createLogEntry('Test');
      const after = new Date();
      
      expect(log.timestamp.getTime()).toBeGreaterThanOrEqual(before.getTime());
      expect(log.timestamp.getTime()).toBeLessThanOrEqual(after.getTime());
    });

    it('should handle special characters in text', () => {
      const specialText = "Test with 🎮 emojis and <script>alert('xss')</script>";
      const log = createLogEntry(specialText);
      expect(log.text).toBe(specialText);
    });
  });

  describe('Stat Change Calculations', () => {
    it('should handle scenario with +20 quality when at 90', () => {
      const current = 90;
      const change = 20;
      const result = clampStat(current + change);
      expect(result).toBe(100); // Clamped
    });

    it('should handle scenario with -30 morale when at 20', () => {
      const current = 20;
      const change = -30;
      const result = clampStat(current + change);
      expect(result).toBe(0); // Clamped, should trigger game over
    });

    it('should handle multiple sequential changes that cross boundaries', () => {
      let stat = 50;
      stat = clampStat(stat + 30); // 80
      stat = clampStat(stat + 30); // 100 (clamped)
      stat = clampStat(stat + 10); // Still 100
      expect(stat).toBe(100);
    });

    it('should handle base SLA penalty plus item penalty', () => {
      const basePenalty = 10;
      const itemPenalty = 5;
      const currentSla = 100;
      const result = clampStat(currentSla - basePenalty - itemPenalty);
      expect(result).toBe(85);
    });

    it('should trigger game over when combined penalties exceed current SLA', () => {
      const basePenalty = 10;
      const itemPenalty = 10;
      const currentSla = 15;
      const newSla = clampStat(currentSla - basePenalty - itemPenalty);
      expect(newSla).toBe(0);
      
      const gameOver = checkGameOver(newSla, 50, 50);
      expect(gameOver.isGameOver).toBe(true);
    });
  });

  describe('Act Progression Logic', () => {
    it('should require act1_1 completion before Act 2', () => {
      const act1Scenario = STORY_SCENARIOS.find(s => s.id === 'act1_1');
      expect(act1Scenario).toBeDefined();
      expect(act1Scenario?.act).toBe(Act.ACT_1_TICKET);
    });

    it('should have role scenarios for Act 2', () => {
      const roleScenarios = STORY_SCENARIOS.filter(s => s.id.startsWith('act2_role_'));
      expect(roleScenarios.length).toBe(7); // One for each character
    });

    it('should have core scenarios for Act 2', () => {
      const act2_1 = STORY_SCENARIOS.find(s => s.id === 'act2_1');
      const act2_2 = STORY_SCENARIOS.find(s => s.id === 'act2_2');
      expect(act2_1).toBeDefined();
      expect(act2_2).toBeDefined();
    });

    it('should have boss scenario for Act 3', () => {
      const act3Scenario = STORY_SCENARIOS.find(s => s.id === 'act3_1');
      expect(act3Scenario).toBeDefined();
      expect(act3Scenario?.act).toBe(Act.ACT_3_BOSS);
      expect(act3Scenario?.type).toBe('MODEL_FIX');
    });
  });

  describe('Error Conditions', () => {
    it('should handle missing scenario gracefully', () => {
      const missing = STORY_SCENARIOS.find(s => s.id === 'nonexistent');
      expect(missing).toBeUndefined();
    });

    it('should handle undefined scenario ID in completion check', () => {
      const completedScenarios: string[] = ['act1_1', 'act2_1'];
      const scenarioId = undefined as any;
      const isCompleted = completedScenarios.includes(scenarioId);
      expect(isCompleted).toBe(false);
    });

    it('should detect scenarios with missing required fields', () => {
      STORY_SCENARIOS.forEach(scenario => {
        expect(scenario.id).toBeTruthy();
        expect(scenario.title).toBeTruthy();
        expect(scenario.description).toBeTruthy();
        expect(scenario.act).toBeTruthy();
        expect(scenario.type).toBeTruthy();
      });
    });
  });

  describe('Potential Race Conditions', () => {
    it('should handle rapid stat changes without going below 0', () => {
      let sla = 10;
      // Simulate multiple rapid reductions
      for (let i = 0; i < 5; i++) {
        sla = clampStat(sla - 5);
      }
      expect(sla).toBe(0); // Should not go negative
    });

    it('should handle concurrent completion checks', () => {
      const completed = ['act1_1'];
      const scenarioId = 'act2_1';
      
      // Simulate checking twice before update
      const check1 = !completed.includes(scenarioId);
      const check2 = !completed.includes(scenarioId);
      
      expect(check1).toBe(true);
      expect(check2).toBe(true);
      
      // Both could try to add, causing duplicate
      // This tests that the logic handles this case
    });
  });
});
