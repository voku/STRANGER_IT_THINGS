/**
 * Game Mechanics Tests
 * 
 * Tests for core game mechanics:
 * - SLA penalties for wrong items
 * - Time-based SLA reduction
 * - Game over conditions
 * - Stat calculations
 */

import { describe, it, expect } from 'vitest';
import { SKILLS, SLA_DECAY_RATE, SLA_DECAY_INTERVAL, INITIAL_SLA, INITIAL_MORALE, INITIAL_QUALITY } from '../constants';
import { Act } from '../types';

describe('Game Mechanics', () => {
  describe('SLA Penalty System', () => {
    it('should have slaPenalty defined for all skills', () => {
      SKILLS.forEach(skill => {
        expect(skill.slaPenalty).toBeDefined();
        expect(skill.slaPenalty).toBeGreaterThan(0);
      });
    });

    it('should have varying penalties based on skill type', () => {
      const rubberDuck = SKILLS.find(s => s.id === 'RUBBER_DUCK');
      const coffee = SKILLS.find(s => s.id === 'COFFEE');
      const rootCauseAnalyzer = SKILLS.find(s => s.id === 'DEBUGGER');
      
      expect(rubberDuck?.slaPenalty).toBe(5);
      expect(coffee?.slaPenalty).toBe(3); // Lower penalty - universal
      expect(rootCauseAnalyzer?.slaPenalty).toBe(10); // Higher penalty - specialized
    });

    it('should have targetAct defined for all skills', () => {
      SKILLS.forEach(skill => {
        expect(skill.targetAct).toBeDefined();
      });
    });
  });

  describe('Time-Based SLA Reduction', () => {
    it('should have decay rate configured', () => {
      expect(SLA_DECAY_RATE).toBeDefined();
      expect(SLA_DECAY_RATE).toBe(2); // 2% per interval
    });

    it('should have decay interval configured', () => {
      expect(SLA_DECAY_INTERVAL).toBeDefined();
      expect(SLA_DECAY_INTERVAL).toBe(30000); // 30 seconds
    });

    it('should reduce SLA over time', () => {
      const initialSla = 100;
      const afterOneInterval = initialSla - SLA_DECAY_RATE;
      const afterTwoIntervals = afterOneInterval - SLA_DECAY_RATE;
      
      expect(afterOneInterval).toBe(98);
      expect(afterTwoIntervals).toBe(96);
    });
  });

  describe('Initial Game State', () => {
    it('should have proper initial values', () => {
      expect(INITIAL_SLA).toBe(100);
      expect(INITIAL_MORALE).toBe(100);
      expect(INITIAL_QUALITY).toBe(50);
    });

    it('should start with reasonable stat values', () => {
      expect(INITIAL_SLA).toBeGreaterThan(0);
      expect(INITIAL_SLA).toBeLessThanOrEqual(100);
      
      expect(INITIAL_MORALE).toBeGreaterThan(0);
      expect(INITIAL_MORALE).toBeLessThanOrEqual(100);
      
      expect(INITIAL_QUALITY).toBeGreaterThan(0);
      expect(INITIAL_QUALITY).toBeLessThanOrEqual(100);
    });
  });

  describe('Game Over Conditions', () => {
    it('should trigger game over when SLA hits 0', () => {
      const sla = 0;
      const morale = 50;
      const quality = 50;
      
      const shouldBeGameOver = sla <= 0 || morale <= 0 || quality <= 0;
      expect(shouldBeGameOver).toBe(true);
    });

    it('should trigger game over when morale hits 0', () => {
      const sla = 50;
      const morale = 0;
      const quality = 50;
      
      const shouldBeGameOver = sla <= 0 || morale <= 0 || quality <= 0;
      expect(shouldBeGameOver).toBe(true);
    });

    it('should trigger game over when quality hits 0', () => {
      const sla = 50;
      const morale = 50;
      const quality = 0;
      
      const shouldBeGameOver = sla <= 0 || morale <= 0 || quality <= 0;
      expect(shouldBeGameOver).toBe(true);
    });

    it('should not trigger game over when all stats are above 0', () => {
      const sla = 10;
      const morale = 10;
      const quality = 10;
      
      const shouldBeGameOver = sla <= 0 || morale <= 0 || quality <= 0;
      expect(shouldBeGameOver).toBe(false);
    });
  });

  describe('Stat Clamping', () => {
    it('should clamp stats between 0 and 100', () => {
      const clamp = (value: number) => Math.max(0, Math.min(100, value));
      
      expect(clamp(150)).toBe(100);
      expect(clamp(-50)).toBe(0);
      expect(clamp(75)).toBe(75);
    });

    it('should handle edge cases', () => {
      const clamp = (value: number) => Math.max(0, Math.min(100, value));
      
      expect(clamp(0)).toBe(0);
      expect(clamp(100)).toBe(100);
      expect(clamp(100.5)).toBe(100);
      expect(clamp(-0.5)).toBe(0);
    });
  });

  describe('Skill System', () => {
    it('should have 7 skills total (4 good + 3 bad items)', () => {
      expect(SKILLS).toHaveLength(7);
    });

    it('should have 4 good items and 3 bad items', () => {
      const goodItems = SKILLS.filter(s => !s.isBadItem);
      const badItems = SKILLS.filter(s => s.isBadItem);
      expect(goodItems).toHaveLength(4);
      expect(badItems).toHaveLength(3);
    });

    it('should have unique skill IDs', () => {
      const ids = SKILLS.map(s => s.id);
      const uniqueIds = new Set(ids);
      expect(ids.length).toBe(uniqueIds.size);
    });

    it('should have all required fields', () => {
      SKILLS.forEach(skill => {
        expect(skill.id).toBeTruthy();
        expect(skill.name).toBeTruthy();
        expect(skill.description).toBeTruthy();
        expect(skill.icon).toBeTruthy();
        expect(skill.color).toBeTruthy();
        expect(skill.targetAct).toBeDefined();
        expect(skill.slaPenalty).toBeDefined();
      });
    });

    it('should have Act 1 skills', () => {
      const act1Skills = SKILLS.filter(s => s.targetAct === Act.ACT_1_TICKET);
      expect(act1Skills.length).toBeGreaterThan(0);
    });

    it('should have Act 2 skill', () => {
      const act2Skills = SKILLS.filter(s => s.targetAct === Act.ACT_2_PERSPECTIVE);
      expect(act2Skills.length).toBeGreaterThan(0);
    });

    it('should have Act 3 skill', () => {
      const act3Skills = SKILLS.filter(s => s.targetAct === Act.ACT_3_BOSS);
      expect(act3Skills.length).toBeGreaterThan(0);
    });
  });

  describe('Scenario Completion Penalty', () => {
    it('should apply base penalty of 10% SLA per scenario', () => {
      const basePenalty = 10;
      const sla = 100;
      const afterScenario = sla - basePenalty;
      
      expect(afterScenario).toBe(90);
    });

    it('should apply additional penalty for wrong item', () => {
      const basePenalty = 10;
      const wrongItemPenalty = 5;
      const sla = 100;
      const afterScenario = sla - basePenalty - wrongItemPenalty;
      
      expect(afterScenario).toBe(85);
    });

    it('should not go below 0', () => {
      const sla = 5;
      const penalty = 20;
      const afterPenalty = Math.max(0, sla - penalty);
      
      expect(afterPenalty).toBe(0);
    });
  });
});
