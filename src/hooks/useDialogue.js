import { useState } from 'react';
import { generateDialogue } from '../utils/ai';

export function useDialogue() {
  const [dialogue, setDialogue] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchDialogue = async (chars, situation, timeLabel, apiKey) => {
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
