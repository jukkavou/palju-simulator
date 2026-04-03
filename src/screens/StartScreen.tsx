import { useState } from 'react';
import PixelCabin from '../components/PixelCabin';
import type { Character } from '../types';

const PF = "'Courier New', monospace";
const btn = (bg: string) => ({ padding: "8px 12px", background: bg, color: "#fff", border: "2px solid #555", borderRadius: 4, fontFamily: PF, fontSize: 11, cursor: "pointer", textAlign: "center" as const, width: "100%" });

interface StartScreenProps {
  characters: Character[];
  setCharacters: React.Dispatch<React.SetStateAction<Character[]>>;
  onStart: () => void;
  hasHallOfFame: boolean;
  onShowHallOfFame: () => void;
}

export default function StartScreen({ characters, setCharacters, onStart, hasHallOfFame, onShowHallOfFame }: StartScreenProps) {
  const [editing, setEditing] = useState(false);
  return (
    <div style={{ maxWidth: 500, margin: "0 auto", background: "#1a1a1a", minHeight: "100vh", color: "#eee", fontFamily: PF, fontSize: 12 }}>
      <div style={{ padding: 16, textAlign: "center" }}>
        <PixelCabin scene="sat_day" hotTubTemp={35} />
        <h1 style={{ fontSize: 20, color: "#FFD54F", margin: "12px 0 4px" }}>🛁 PALJUSIMULAATTORI</h1>
        <p style={{ color: "#888", fontSize: 10, marginBottom: 12 }}>Viisi kaveria. Yksi mokki. Yksi palju. Yksi viikonloppu.</p>
        <div style={{ textAlign: "left", background: "#222", padding: 10, borderRadius: 6, marginBottom: 12 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
            <span style={{ fontSize: 11, color: "#FFD54F" }}>PORUKKA:</span>
            <button onClick={() => setEditing(!editing)} style={{ background: "#333", color: "#aaa", border: "1px solid #555", borderRadius: 3, padding: "2px 8px", fontSize: 9, cursor: "pointer", fontFamily: PF }}>
              {editing ? "Valmis" : "Muokkaa"}
            </button>
          </div>
          {characters.map((c, i) => (
            <div key={i} style={{ marginBottom: 6, display: "flex", alignItems: "center", gap: 6 }}>
              <span style={{ fontSize: 16 }}>{c.emoji}</span>
              {editing ? (
                <input value={c.name} onChange={e => { const v = e.target.value; setCharacters(prev => prev.map((ch, j) => j === i ? { ...ch, name: v } : ch)); }}
                  style={{ background: "#333", color: "#fff", border: "1px solid #666", borderRadius: 3, padding: "3px 6px", fontFamily: PF, fontSize: 11, width: 100 }} />
              ) : (
                <span style={{ fontSize: 11 }}><strong style={{ color: "#fff" }}>{c.name}</strong> - <span style={{ color: "#888" }}>{c.trait}</span></span>
              )}
            </div>
          ))}
        </div>

        <div style={{ display: "flex", gap: 8 }}>
          <button onClick={onStart} style={{ ...btn("#4CAF50"), fontSize: 13, flex: 2 }}>🛒 Kauppaan!</button>
          {hasHallOfFame && <button onClick={onShowHallOfFame} style={{ ...btn("#FF9800"), flex: 1 }}>🏆</button>}
        </div>
      </div>
    </div>
  );
}
