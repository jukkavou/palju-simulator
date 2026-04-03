export default function DialogueBubble({ dialogue, loading }) {
  if (!loading && (!dialogue?.lines || dialogue.lines.length === 0)) return null;
  return (
    <div style={{ background: "#1a1a2e", border: "2px solid #3a3a5e", borderRadius: 8, padding: 8, marginBottom: 6 }}>
      {loading ? (
        <div style={{ fontSize: 10, color: "#888", textAlign: "center" }}>💬 Porukka juttelee...</div>
      ) : dialogue.lines.map((l, i) => (
        <div key={i} style={{ marginBottom: 4, fontSize: 10, lineHeight: 1.4 }}>
          <strong style={{ color: "#88f" }}>{l.name}:</strong> <span style={{ color: "#ccc" }}>"{l.text}"</span>
        </div>
      ))}
    </div>
  );
}
