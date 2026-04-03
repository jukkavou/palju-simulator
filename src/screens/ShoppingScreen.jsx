import { SHOPPING_ITEMS } from '../data/shopping';
const PF = "'Courier New', monospace";
const btn = (bg) => ({ padding: "6px 10px", background: bg, color: "#fff", border: "2px solid #555", borderRadius: 4, fontFamily: PF, fontSize: 11, cursor: "pointer", textAlign: "left", width: "100%" });

export default function ShoppingScreen({ budget, spent, cart, onAdd, onRemove, onNext }) {
  return (
    <div style={{ maxWidth: 500, margin: "0 auto", background: "#1a1a1a", minHeight: "100vh", color: "#eee", fontFamily: PF, fontSize: 12 }}>
      <div style={{ padding: 10 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
          <h2 style={{ fontSize: 15, color: "#FFD54F", margin: 0 }}>🛒 Kauppa</h2>
          <span style={{ color: spent > budget * 0.8 ? "#f44" : "#4CAF50", fontSize: 12 }}>{spent} / {budget}e</span>
        </div>
        <div style={{ display: "grid", gap: 4, marginBottom: 10 }}>
          {SHOPPING_ITEMS.map((item, i) => {
            const cnt = cart.filter(c => c.name === item.name).length;
            return (
              <button key={i} onClick={() => onAdd(item)} style={{ ...btn(cnt > 0 ? "#2E7D32" : "#333"), display: "flex", justifyContent: "space-between" }}>
                <span>{item.emoji} {item.name} {cnt > 0 && "x"+cnt}</span>
                <span style={{ color: "#FFD54F" }}>{item.cost}e</span>
              </button>
            );
          })}
        </div>
        {cart.length > 0 && (
          <div style={{ background: "#222", padding: 6, borderRadius: 6, marginBottom: 10 }}>
            <div style={{ fontSize: 9, color: "#888", marginBottom: 3 }}>Korissa ({cart.length}):</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 3 }}>
              {cart.map((item, i) => <span key={i} onClick={() => onRemove(i)} style={{ background: "#444", padding: "1px 5px", borderRadius: 3, fontSize: 9, cursor: "pointer" }}>{item.emoji} {item.name} x</span>)}
            </div>
          </div>
        )}
        <button onClick={onNext} style={{ ...btn("#FF9800"), textAlign: "center", fontSize: 12 }}>📦 Varusteet</button>
      </div>
    </div>
  );
}
