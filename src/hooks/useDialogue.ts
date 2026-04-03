import { useState } from 'react';
import { generateDialogue } from '../utils/ai';
import type { CharState, Dialogue } from '../types';

export function useDialogue() {
  const [dialogue, setDialogue] = useState<Dialogue | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchDialogue = async (chars: CharState[], situation: string, timeLabel: string, apiKey: string) => {
    setLoading(true);
    try {
      const dl = await generateDialogue(chars, situation, timeLabel, apiKey);
      setDialogue(dl);
      return dl;
    } finally {
      setLoading(false);
    }
  };

  const clearDialogue = () => setDialogue(null);
  return { dialogue, loading, fetchDialogue, clearDialogue };
}
