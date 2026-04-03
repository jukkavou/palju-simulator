import { GEAR_ITEMS } from '../data/gear';
import type { GearItem } from '../types';

const PF = "'Courier New', monospace";
const btn = (bg: string) => ({ padding: "6px 10px", background: bg, color: "#fff", border: "2px solid #555", borderRadius: 4, fontFamily: PF, fontSize: 11, cursor: "pointer", textAlign: "left" as const, width: "100%" });

interface GearScreenProps {
  gear: GearItem[];
  onToggle: (item: GearItem) => void;
  onBack: () => void;
  onStart: () => void;
}

export default function GearScreen({ gear, onToggle, onBack, onStart }: GearScreenProps) {
  return (
    <div style={{ maxWidth: 500, margin: "0 auto", background: "#1a1a1a", minHeight: "100vh", color: "#eee", fontFamily: PF, fontSize: 12 }}>
      <div style={{ padding: 10 }}>
        <h2 style={{ fontSize: 15, color: "#FFD54F", marginBottom: 10 }}>📦 Varusteet</h2>
        <div style={{ display: "grid", gap: 4, marginBottom: 10 }}>
          {GEAR_ITEMS.map((item, i) => {
            const sel = gear.find(g => g.name === item.name);
            return (
              <button key={i} onClick={() => onToggle(item)} style={{ ...btn(sel ? "#1565C0" : "#333"), display: "flex", justifyContent: "space-between" }}>
                <span>{item.emoji} {item.name}</span>
                <span style={{ color: sel ? "#4CAF50" : "#666" }}>{sel ? "OK" : "-"}</span>
              </button>
            );
          })}
        </div>
        <div style={{ display: "flex", gap: 6 }}>
          <button onClick={onBack} style={{ ...btn("#555"), textAlign: "center", flex: 1 }}>Kauppa</button>
          <button onClick={onStart} style={{ ...btn("#4CAF50"), textAlign: "center", flex: 2 }}>🚗 Mokille!</button>
        </div>
      </div>
    </div>
  );
}
