import { useState, useCallback } from 'react';
import { createCharState } from '../data/characters';
import type { Character, CharState, CharEffects, ResourceEffects, Resources, EventLogEntry } from '../types';

const INITIAL_RESOURCES: Resources = {
  food: 0, booze: 0, wood: 30, mood: 50,
  sauna: 0, hotTubTemp: 5, clean: 0, hydration: 0,
};

export function useGameState(initialChars: Character[]) {
  const [characters, setCharacters] = useState<CharState[]>(createCharState(initialChars));
  const [resources, setResources] = useState<Resources>({ ...INITIAL_RESOURCES });
  const [eventLog, setEventLog] = useState<EventLogEntry[]>([]);
  const [timeSlot, setTimeSlot] = useState(0);
  const [actionsLeft, setActionsLeft] = useState(3);

  const log = useCallback((text: string, color = "#0f0") => {
    setEventLog(prev => [...prev, { text, color }]);
  }, []);

  const updateChar = useCallback((name: string, effects: Record<string, number>) => {
    setCharacters(prev => prev.map(c => {
      if (c.name !== name) return c;
      const n: CharState = { ...c };
      const numericKeys = ['happiness', 'drunk', 'fullness', 'hydration'] as const;
      for (const k of numericKeys) {
        if (k in effects) {
          n[k] = Math.max(0, Math.min(100, n[k] + effects[k]!));
        }
      }
      return n;
    }));
  }, []);

  const updateAllChars = useCallback((effects: CharEffects) => {
    setCharacters(prev => prev.map(c => {
      const n = { ...c };
      if (effects.allDrunk) n.drunk = Math.max(0, Math.min(100, n.drunk + effects.allDrunk));
      if (effects.allFood) n.fullness = Math.max(0, Math.min(100, n.fullness + effects.allFood));
      if (effects.allHydration) n.hydration = Math.max(0, Math.min(100, n.hydration + effects.allHydration));
      if (effects.allHappiness) n.happiness = Math.max(0, Math.min(100, n.happiness + effects.allHappiness));
      return n;
    }));
  }, []);

  const applyResourceEffects = useCallback((effects: ResourceEffects) => {
    setResources(prev => {
      const n: Resources = { ...prev };
      for (const [k, v] of Object.entries(effects)) {
        if (k in n && v !== undefined) {
          const max = k === "hotTubTemp" ? 42 : k === "clean" ? 100 : k === "mood" ? 100 : 999;
          (n as unknown as Record<string, number>)[k] = Math.max(0, Math.min(max, (n as unknown as Record<string, number>)[k]! + v));
        }
      }
      return n;
    });
  }, []);

  const decayResources = useCallback(() => {
    setResources(prev => ({
      ...prev,
      hotTubTemp: Math.max(0, prev.hotTubTemp - 3),
      sauna: Math.max(0, prev.sauna - 10),
    }));
    setCharacters(prev => prev.map(c => ({
      ...c,
      drunk: Math.max(0, c.drunk - 4),
      fullness: Math.max(0, c.fullness - 6),
      hydration: Math.max(0, c.hydration - 5),
      happiness: Math.max(0, Math.min(100,
        c.happiness + (c.hydration < 20 ? -5 : 0) + (c.fullness < 15 ? -5 : 0) + (c.drunk > 75 ? -3 : 0)
      )),
    })));
  }, []);

  const reset = useCallback((chars: Character[]) => {
    setCharacters(createCharState(chars));
    setResources({ ...INITIAL_RESOURCES });
    setEventLog([]);
    setTimeSlot(0);
    setActionsLeft(3);
  }, []);

  return {
    characters, setCharacters, resources, setResources,
    eventLog, log, timeSlot, setTimeSlot,
    actionsLeft, setActionsLeft,
    updateChar, updateAllChars, applyResourceEffects, decayResources, reset,
  };
}
