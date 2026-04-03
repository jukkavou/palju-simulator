import StatusBar from './StatusBar';
const PF = "'Courier New', monospace";

export default function CharCard({ char, expanded, onClick }) {
  const c = char;
  const face = c.happiness > 70 ? "😄" : c.happiness > 40 ? "😐" : "😞";
  const drunk = c.drunk > 60 ? "🥴" : c.drunk > 30 ? "😵‍💫" : "";
  return (
    <div onClick={onClick} style={{ background: expanded ? "#2a2a3a" : "#222", border: "2px solid " + (expanded ? "#FFD54F" : "#444"), borderRadius: 6, padding: expanded ? 8 : 6, cursor: "pointer", transition: "all 0.2s" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: expanded ? 6 : 0 }}>
        <span style={{ fontSize: 18 }}>{c.emoji}</span>
        <div style={{ flex: 1 }}>
          <div style={{ fontFamily: PF, fontSize: 11, color: "#fff", fontWeight: "bold" }}>{c.name} {face}{drunk}</div>
          <div style={{ fontFamily: PF, fontSize: 9, color: "#888" }}>{c.trait}</div>
        </div>
      </div>
      {expanded && (
        <div style={{ marginTop: 4 }}>
          <StatusBar label="Tyytyv." value={c.happiness} max={100} color="#4CAF50" icon="😊" small />
          <StatusBar label="Humala" value={c.drunk} max={100} color={c.drunk > 60 ? "#f44" : "#FF9800"} icon="🍺" small />
          <StatusBar label="Kyll." value={c.fullness} max={100} color="#8BC34A" icon="🍖" small />
          <StatusBar label="Neste" value={c.hydration} max={100} color="#2196F3" icon="💧" small />
        </div>
      )}
    </div>
  );
}
