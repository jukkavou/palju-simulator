import { useState } from 'react';
import { TIME_SLOTS } from '../data/timeSlots';
import PixelCabin from '../components/PixelCabin';
import StatusBar from '../components/StatusBar';
import CharCard from '../components/CharCard';
import EventLog from '../components/EventLog';
import DialogueBubble from '../components/DialogueBubble';
import type { TimeSlot, CharState, Resources, Activity, GearItem, EventLogEntry, Dialogue } from '../types';

const PF = "'Courier New', monospace";
const btn = (bg: string) => ({ padding: "6px 10px", background: bg, color: "#fff", border: "2px solid #555", borderRadius: 4, fontFamily: PF, fontSize: 11, cursor: "pointer", textAlign: "left" as const, width: "100%" });

interface GameScreenProps {
  currentSlot: TimeSlot | undefined;
  timeSlot: number;
  actionsLeft: number;
  characters: CharState[];
  resources: Resources;
  activities: Activity[];
  gear: GearItem[];
  eventLog: EventLogEntry[];
  dialogue: Dialogue | null;
  loadingDialogue: boolean;
  onDoActivity: (act: Activity) => void;
  onAdvanceTime: () => void;
  totalSlots: number;
  nextSlotLabel: string | undefined;
}

export default function GameScreen({ currentSlot, timeSlot, actionsLeft, characters, resources, activities, gear, eventLog, dialogue, loadingDialogue, onDoActivity, onAdvanceTime, totalSlots, nextSlotLabel }: GameScreenProps) {
  const [expandedChar, setExpandedChar] = useState<string | null>(null);
  return (
    <div style={{ maxWidth: 500, margin: "0 auto", background: "#1a1a1a", minHeight: "100vh", color: "#eee", fontFamily: PF, fontSize: 12 }}>
      <div style={{ padding: 6 }}>
        <PixelCabin scene={currentSlot?.id ?? "fri_eve"} hotTubTemp={resources.hotTubTemp} />
        <div style={{ display: "flex", gap: 2, margin: "6px 0" }}>
          {TIME_SLOTS.map((ts, i) => <div key={ts.id} style={{ flex: 1, height: 5, borderRadius: 2, background: i < timeSlot ? "#4CAF50" : i === timeSlot ? "#FFD54F" : "#333" }} />)}
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10, color: "#aaa", marginBottom: 6 }}>
          <span>{currentSlot?.icon} {currentSlot?.label}</span>
          <span>Toiminnot: {actionsLeft}/3</span>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 4, marginBottom: 6 }}>
          {characters.map(c => <CharCard key={c.name} char={c} expanded={expandedChar === c.name} onClick={() => setExpandedChar(expandedChar === c.name ? null : c.name)} />)}
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 10px", marginBottom: 6 }}>
          <StatusBar label="Ruoka" value={resources.food} max={60} color="#8BC34A" icon="🍖" />
          <StatusBar label="Juomat" value={resources.booze} max={80} color="#FFB300" icon="🥂" />
          <StatusBar label="Puut" value={resources.wood} max={60} color="#795548" icon="🪵" />
          <StatusBar label="Palju" value={resources.hotTubTemp} max={42} color={resources.hotTubTemp > 35 ? "#f44" : "#2196F3"} icon="🛁" />
          <StatusBar label="Sauna" value={resources.sauna} max={100} color="#FF5722" icon="🔥" />
          <StatusBar label="Tunnelma" value={resources.mood} max={100} color="#4CAF50" icon="🎉" />
          {currentSlot?.id === "sun_day" && <StatusBar label="Siivous" value={resources.clean} max={100} color="#00BCD4" icon="🧹" />}
        </div>
        <DialogueBubble dialogue={dialogue} loading={loadingDialogue} />
        <div style={{ display: "grid", gap: 3, marginBottom: 6 }}>
          {activities.map(act => {
            const disabled = actionsLeft <= 0 || (act.requires != null && !gear.find(g => g.name === act.requires));
            const missing = act.requires != null && !gear.find(g => g.name === act.requires);
            return (
              <button key={act.id} onClick={() => onDoActivity(act)} disabled={disabled}
                style={{ ...btn(disabled ? "#1a1a1a" : "#37474F"), opacity: disabled ? 0.4 : 1 }}>
                {act.label}
                {missing && <span style={{ fontSize: 8, color: "#f44", display: "block" }}>Puuttuu: {act.requires}</span>}
              </button>
            );
          })}
        </div>
        <button onClick={onAdvanceTime} style={{ ...btn(timeSlot >= totalSlots - 1 ? "#E91E63" : "#FF9800"), textAlign: "center", fontSize: 11, marginBottom: 6 }}>
          {timeSlot >= totalSlots - 1 ? "🏁 Lopputulos" : ">> " + (nextSlotLabel ?? "")}
        </button>
        <EventLog events={eventLog} />
      </div>
    </div>
  );
}
