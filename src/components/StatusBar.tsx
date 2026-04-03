const PF = "'Courier New', monospace";

interface StatusBarProps {
  label: string;
  value: number;
  max: number;
  color: string;
  icon: string;
  small?: boolean;
}

export default function StatusBar({ label, value, max, color, icon, small }: StatusBarProps) {
  const pct = Math.min(100, Math.max(0, (value / max) * 100));
  return (
    <div style={{ marginBottom: small ? 3 : 5 }}>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: small ? 9 : 10, fontFamily: PF, color: "#aaa", marginBottom: 1 }}>
        <span>{icon} {label}</span><span>{Math.round(value)}</span>
      </div>
      <div style={{ height: small ? 6 : 8, background: "#333", borderRadius: 2, overflow: "hidden", border: "1px solid #555" }}>
        <div style={{ height: "100%", width: pct + "%", background: color, transition: "width 0.4s" }} />
      </div>
    </div>
  );
}
