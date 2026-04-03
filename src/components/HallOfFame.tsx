import type { HallOfFameEntry } from '../types';

const PF = "'Courier New', monospace";
const btn = (bg: string) => ({ padding: "8px 12px", background: bg, color: "#fff", border: "2px solid #555", borderRadius: 4, fontFamily: PF, fontSize: 11, cursor: "pointer", textAlign: "center" as const, width: "100%" });

interface HallOfFameProps {
  entries: HallOfFameEntry[];
  onRestart: () => void;
}

export default function HallOfFame({ entries, onRestart }: HallOfFameProps) {
  return (
    <div style={{ maxWidth: 500, margin: "0 auto", background: "#1a1a1a", minHeight: "100vh", color: "#eee", fontFamily: PF, fontSize: 12 }}>
      <div style={{ padding: 16 }}>
        <h1 style={{ fontSize: 18, color: "#FFD54F", textAlign: "center", marginBottom: 16 }}>🏆 VUODEN PALJU - TOP 10</h1>
        {entries.length === 0 ? <p style={{ color: "#666", textAlign: "center" }}>Ei viela tuloksia.</p> :
          entries.map((t, i) => (
            <div key={i} style={{ background: i === 0 ? "#2a2a1a" : "#222", border: "2px solid " + (i === 0 ? "#FFD54F" : "#444"), borderRadius: 6, padding: 10, marginBottom: 6 }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: i === 0 ? "#FFD54F" : "#fff" }}>{i === 0 ? "👑" : "#"+(i+1)} {t.name}</span>
                <span style={{ color: "#4CAF50", fontWeight: "bold" }}>{t.score} pts</span>
              </div>
              <div style={{ fontSize: 9, color: "#888" }}>{t.chars.join(", ")} - {t.date}</div>
            </div>
          ))
        }
        <button onClick={onRestart} style={{ ...btn("#4CAF50"), marginTop: 12 }}>🔄 Pelaa uudelleen</button>
      </div>
    </div>
  );
}
