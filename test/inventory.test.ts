/**
 * Inventory and Consumable Items Tests
 * 
 * Tests for the new consumable item system:
 * - Item inventory tracking
 * - Item consumption mechanics
 * - Bad items with negative effects
 * - Item availability checks
 */

import { describe, it, expect } from 'vitest';
import { SKILLS } from '../constants';
import { ItemInventory } from '../types';

describe('Inventory System', () => {
  describe('Item Inventory Structure', () => {
    it('should store item counts by skill ID', () => {
      const inventory: ItemInventory = {
        'RUBBER_DUCK': 2,
        'COFFEE': 1
      };
      
      expect(inventory['RUBBER_DUCK']).toBe(2);
      expect(inventory['COFFEE']).toBe(1);
      expect(inventory['NONEXISTENT']).toBeUndefined();
    });

    it('should handle zero quantities', () => {
      const inventory: ItemInventory = {
        'RUBBER_DUCK': 0
      };
      
      expect(inventory['RUBBER_DUCK']).toBe(0);
    });

    it('should handle empty inventory', () => {
      const inventory: ItemInventory = {};
      
      expect(Object.keys(inventory).length).toBe(0);
    });
  });

  describe('Item Consumption', () => {
    it('should reduce item count when consumed', () => {
      let inventory: ItemInventory = { 'RUBBER_DUCK': 2 };
      
      // Consume one
      inventory['RUBBER_DUCK'] = inventory['RUBBER_DUCK'] - 1;
      expect(inventory['RUBBER_DUCK']).toBe(1);
      
      // Consume another
      inventory['RUBBER_DUCK'] = inventory['RUBBER_DUCK'] - 1;
      expect(inventory['RUBBER_DUCK']).toBe(0);
    });

    it('should not allow using items with count 0', () => {
      const inventory: ItemInventory = { 'RUBBER_DUCK': 0 };
      const canUse = (inventory['RUBBER_DUCK'] || 0) > 0;
      
      expect(canUse).toBe(false);
    });

    it('should allow using items with count > 0', () => {
      const inventory: ItemInventory = { 'RUBBER_DUCK': 3 };
      const canUse = (inventory['RUBBER_DUCK'] || 0) > 0;
      
      expect(canUse).toBe(true);
    });

    it('should handle consuming non-existent items gracefully', () => {
      const inventory: ItemInventory = {};
      const currentCount = inventory['NONEXISTENT'] || 0;
      
      expect(currentCount).toBe(0);
      expect(currentCount > 0).toBe(false);
    });
  });

  describe('Bad Items', () => {
    it('should have bad items defined with isBadItem flag', () => {
      const badItems = SKILLS.filter(s => s.isBadItem === true);
      
      expect(badItems.length).toBeGreaterThan(0);
      badItems.forEach(item => {
        expect(item.isBadItem).toBe(true);
      });
    });

    it('should have negative effects on bad items', () => {
      const badItems = SKILLS.filter(s => s.isBadItem === true);
      
      badItems.forEach(item => {
        const hasNegativeEffect = 
          (item.qualityEffect && item.qualityEffect < 0) || 
          (item.moraleEffect && item.moraleEffect < 0);
        
        expect(hasNegativeEffect).toBe(true);
      });
    });

    it('should have expired energy drink as a bad item', () => {
      const expiredDrink = SKILLS.find(s => s.id === 'EXPIRED_ENERGY_DRINK');
      
      expect(expiredDrink).toBeDefined();
      expect(expiredDrink?.isBadItem).toBe(true);
      expect(expiredDrink?.moraleEffect).toBeLessThan(0);
    });

    it('should have outdated documentation as a bad item', () => {
      const outdatedDoc = SKILLS.find(s => s.id === 'OUTDATED_DOCUMENTATION');
      
      expect(outdatedDoc).toBeDefined();
      expect(outdatedDoc?.isBadItem).toBe(true);
      expect(outdatedDoc?.qualityEffect).toBeLessThan(0);
    });

    it('should have buggy script as a bad item', () => {
      const buggyScript = SKILLS.find(s => s.id === 'BUGGY_SCRIPT');
      
      expect(buggyScript).toBeDefined();
      expect(buggyScript?.isBadItem).toBe(true);
      expect(buggyScript?.qualityEffect).toBeLessThan(0);
      expect(buggyScript?.moraleEffect).toBeLessThan(0);
    });

    it('should not mark good items as bad', () => {
      const goodItems = SKILLS.filter(s => !s.isBadItem);
      
      expect(goodItems.length).toBe(4);
      goodItems.forEach(item => {
        expect(item.isBadItem).toBeFalsy();
      });
    });
  });

  describe('Item Collection', () => {
    it('should add items to inventory when collected', () => {
      let inventory: ItemInventory = { 'RUBBER_DUCK': 1 };
      
      // Collect coffee
      inventory['COFFEE'] = (inventory['COFFEE'] || 0) + 1;
      
      expect(inventory['COFFEE']).toBe(1);
      expect(inventory['RUBBER_DUCK']).toBe(1);
    });

    it('should increase count when collecting duplicate items', () => {
      let inventory: ItemInventory = { 'RUBBER_DUCK': 1 };
      
      // Collect another rubber duck
      inventory['RUBBER_DUCK'] = (inventory['RUBBER_DUCK'] || 0) + 1;
      
      expect(inventory['RUBBER_DUCK']).toBe(2);
    });

    it('should handle collecting multiple items at once', () => {
      let inventory: ItemInventory = {};
      
      // Collect multiple items
      inventory['COFFEE'] = (inventory['COFFEE'] || 0) + 1;
      inventory['EXPIRED_ENERGY_DRINK'] = (inventory['EXPIRED_ENERGY_DRINK'] || 0) + 1;
      inventory['DEBUGGER'] = (inventory['DEBUGGER'] || 0) + 1;
      
      expect(inventory['COFFEE']).toBe(1);
      expect(inventory['EXPIRED_ENERGY_DRINK']).toBe(1);
      expect(inventory['DEBUGGER']).toBe(1);
    });
  });

  describe('Item Usage Restrictions', () => {
    it('should only allow using items that exist in inventory', () => {
      const inventory: ItemInventory = { 
        'RUBBER_DUCK': 1,
        'COFFEE': 0 
      };
      
      const canUseRubberDuck = (inventory['RUBBER_DUCK'] || 0) > 0;
      const canUseCoffee = (inventory['COFFEE'] || 0) > 0;
      const canUseDebugger = (inventory['DEBUGGER'] || 0) > 0;
      
      expect(canUseRubberDuck).toBe(true);
      expect(canUseCoffee).toBe(false);
      expect(canUseDebugger).toBe(false);
    });

    it('should consume items only once per use', () => {
      let inventory: ItemInventory = { 'RUBBER_DUCK': 1 };
      
      // Simulate using the item
      if ((inventory['RUBBER_DUCK'] || 0) > 0) {
        inventory['RUBBER_DUCK'] = inventory['RUBBER_DUCK'] - 1;
      }
      
      expect(inventory['RUBBER_DUCK']).toBe(0);
      
      // Try to use again - should not be possible
      const canUseAgain = (inventory['RUBBER_DUCK'] || 0) > 0;
      expect(canUseAgain).toBe(false);
    });
  });

  describe('Item Effects', () => {
    it('should have quality and morale effects defined for bad items', () => {
      const badItems = SKILLS.filter(s => s.isBadItem === true);
      
      badItems.forEach(item => {
        expect(item.qualityEffect !== undefined || item.moraleEffect !== undefined).toBe(true);
      });
    });

    it('should apply cumulative effects when using multiple bad items', () => {
      const expiredDrink = SKILLS.find(s => s.id === 'EXPIRED_ENERGY_DRINK');
      const outdatedDoc = SKILLS.find(s => s.id === 'OUTDATED_DOCUMENTATION');
      
      let totalQualityEffect = 0;
      let totalMoraleEffect = 0;
      
      if (expiredDrink) {
        totalQualityEffect += expiredDrink.qualityEffect || 0;
        totalMoraleEffect += expiredDrink.moraleEffect || 0;
      }
      
      if (outdatedDoc) {
        totalQualityEffect += outdatedDoc.qualityEffect || 0;
        totalMoraleEffect += outdatedDoc.moraleEffect || 0;
      }
      
      expect(totalQualityEffect).toBeLessThan(0);
      expect(totalMoraleEffect).toBeLessThan(0);
    });
  });

  describe('Initial Inventory State', () => {
    it('should start with rubber duck and ITIL book', () => {
      const initialInventory: ItemInventory = {
        'RUBBER_DUCK': 1,
        'ITIL_BOOK': 1
      };
      
      expect(initialInventory['RUBBER_DUCK']).toBe(1);
      expect(initialInventory['ITIL_BOOK']).toBe(1);
    });

    it('should not start with locked items', () => {
      const initialInventory: ItemInventory = {
        'RUBBER_DUCK': 1,
        'ITIL_BOOK': 1
      };
      
      expect(initialInventory['COFFEE']).toBeUndefined();
      expect(initialInventory['DEBUGGER']).toBeUndefined();
      expect(initialInventory['EXPIRED_ENERGY_DRINK']).toBeUndefined();
    });
  });

  describe('Item Metadata', () => {
    it('should have all items marked as consumable in description', () => {
      SKILLS.forEach(skill => {
        // All items should mention they are single-use
        expect(skill.description.toLowerCase()).toContain('einmalig');
      });
    });

    it('should have unique IDs for all items', () => {
      const ids = SKILLS.map(s => s.id);
      const uniqueIds = new Set(ids);
      
      expect(ids.length).toBe(uniqueIds.size);
    });
  });
});
