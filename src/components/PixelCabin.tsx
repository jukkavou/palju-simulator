import { SCENES } from '../data/timeSlots';

interface PixelCabinProps {
  scene: string;
  hotTubTemp: number;
}

export default function PixelCabin({ scene, hotTubTemp }: PixelCabinProps) {
  const s = SCENES[scene] || SCENES["fri_eve"]!;
  const isNight = scene?.includes("night") || scene?.includes("eve");
  const stars = isNight ? Array.from({ length: 15 }, (_, i) => ({ x: (i * 47 + 13) % 100, y: (i * 31 + 7) % 40, sz: (i % 3) + 1 })) : [];
  return (
    <svg viewBox="0 0 320 140" style={{ width: "100%", imageRendering: "pixelated", borderRadius: 6, border: "2px solid #444" }}>
      <rect width="320" height="140" fill={s.sky} />
      {stars.map((st, i) => <rect key={i} x={st.x * 3.2} y={st.y} width={st.sz} height={st.sz} fill="#fff" opacity={0.7} />)}
      <rect x="0" y="80" width="320" height="60" fill={s.ground} />
      <rect x="170" y="88" width="130" height="50" fill="#1565C0" opacity="0.5" rx="2" />
      <rect x="55" y="42" width="100" height="48" fill="#5D4037" />
      <polygon points="45,42 105,16 165,42" fill="#B71C1C" />
      <rect x="75" y="54" width="14" height="14" fill="#FFF9C4" opacity={isNight ? 1 : 0.3} />
      <rect x="115" y="54" width="14" height="14" fill="#FFF9C4" opacity={isNight ? 1 : 0.3} />
      <rect x="95" y="68" width="14" height="22" fill="#3E2723" />
      <rect x="135" y="25" width="6" height="20" fill="#795548" />
      <rect x="15" y="72" width="28" height="18" fill="#4E342E" rx="2" />
      {hotTubTemp > 30 && [0,1,2].map(i => <line key={i} x1={22+i*7} y1="72" x2={22+i*7} y2="60" stroke="#fff" strokeWidth="1" opacity="0.3"><animate attributeName="y2" from="66" to="55" dur={2+i*0.3+"s"} repeatCount="indefinite"/><animate attributeName="opacity" from="0.3" to="0" dur={2+i*0.3+"s"} repeatCount="indefinite"/></line>)}
      <rect x="225" y="68" width="22" height="20" fill="#5D4037" />
      <polygon points="220,68 236,58 255,68" fill="#795548" />
    </svg>
  );
}
