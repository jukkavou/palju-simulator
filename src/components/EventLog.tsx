import { useRef, useEffect } from 'react';
import type { EventLogEntry } from '../types';

const PF = "'Courier New', monospace";

interface EventLogProps {
  events: EventLogEntry[];
}

export default function EventLog({ events }: EventLogProps) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => { if (ref.current) ref.current.scrollTop = ref.current.scrollHeight; }, [events]);
  return (
    <div ref={ref} style={{ background: "#0a0a0a", border: "2px solid #333", borderRadius: 6, padding: 8, maxHeight: 180, overflowY: "auto", fontFamily: PF, fontSize: 10 }}>
      {events.length === 0 ? <div style={{ color: "#444" }}>Tapahtumaloki...</div> :
        events.map((e, i) => <div key={i} style={{ marginBottom: 4, color: e.color || "#0f0", lineHeight: 1.4 }}>&gt; {e.text}</div>)}
    </div>
  );
}
