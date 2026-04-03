import { useState } from 'react';
import PixelCabin from '../components/PixelCabin';
import { getRating } from '../utils/scoring';
const PF = "'Courier New', monospace";
const btn = (bg) => ({ padding: "8px 12px", background: bg, color: "#fff", border: "2px solid #555", borderRadius: 4, fontFamily: PF, fontSize: 11, cursor: "pointer", textAlign: "center", width: "100%" });

export default function SummaryScreen({ score, characters, onSave, onRestart }) {
  const [tripName, setTripName] = useState("");
  return (
    <div style={{ maxWidth: 500, margin: "0 auto", background: "#1a1a1a", minHeight: "100vh", color: "#eee", fontFamily: PF, fontSize: 12 }}>
      <div style={{ padding: 16, textAlign: "center" }}>
        <PixelCabin scene="sun_day" hotTubTemp={0} />
        <h1 style={{ fontSize: 18, color: "#FFD54F", margin: "12px 0" }}>Paljuviikonloppu ohi!</h1>
        <div style={{ fontSize: 16, marginBottom: 12 }}>{getRating(score.total)}</div>
        <div style={{ background: "#222", padding: 10, borderRadius: 6, textAlign: "left", marginBottom: 10, fontSize: 10 }}>
          <div>😊 Tyytyv: <span style={{ color: "#4CAF50" }}>+{score.happiness}</span></div>
          <div>🔥 Sauna: <span style={{ color: "#FF9800" }}>+{score.saunaBonus}</span></div>
          <div>🛁 Palju: <span style={{ color: "#2196F3" }}>+{score.hotTubBonus}</span></div>
          <div>🧹 Siivous: <span style={{ color: "#00BCD4" }}>+{score.cleanBonus}</span></div>
          <div>🎉 Tunnelma: <span style={{ color: "#9C27B0" }}>+{score.moodBonus}</span></div>
          {score.drunkPenalty < 0 && <div>🤢 Krapula: <span style={{ color: "#f44" }}>{score.drunkPenalty}</span></div>}
          {score.foodPenalty < 0 && <div>😥 Nalka: <span style={{ color: "#f44" }}>{score.foodPenalty}</span></div>}
          {score.dehydrationPenalty < 0 && <div>💧 Kuivuminen: <span style={{ color: "#f44" }}>{score.dehydrationPenalty}</span></div>}
          <hr style={{ border: "1px solid #444", margin: "6px 0" }} />
          <div style={{ fontSize: 14, color: "#FFD54F" }}>YHTEENSA: {score.total}</div>
        </div>
        <div style={{ textAlign: "left", marginBottom: 10 }}>
          <div style={{ fontSize: 10, color: "#aaa", marginBottom: 4 }}>Hahmojen lopputila:</div>
          {characters.map(c => (
            <div key={c.name} style={{ background: "#222", borderRadius: 4, padding: 6, marginBottom: 4, fontSize: 10 }}>
              {c.emoji} <strong>{c.name}</strong>: 😊{Math.round(c.happiness)} 🍺{Math.round(c.drunk)} 🍖{Math.round(c.fullness)} 💧{Math.round(c.hydration)}
            </div>
          ))}
        </div>
        <div style={{ display: "flex", gap: 6, marginBottom: 8 }}>
          <input value={tripName} onChange={e => setTripName(e.target.value)} placeholder="Reissun nimi..."
            style={{ flex: 1, background: "#333", color: "#fff", border: "1px solid #666", borderRadius: 4, padding: "6px 8px", fontFamily: PF, fontSize: 11 }} />
          <button onClick={() => tripName.trim() && onSave(tripName)} style={{ ...btn("#FF9800"), width: "auto", padding: "6px 12px" }}>🏆 Tallenna</button>
        </div>
        <button onClick={onRestart} style={btn("#4CAF50")}>🔄 Uudelleen</button>
      </div>
    </div>
  );
}
