import type { CharState, Dialogue } from '../types';

const API_URL = "https://api.anthropic.com/v1/messages";

export async function generateDialogue(chars: CharState[], situation: string, timeLabel: string, apiKey: string): Promise<Dialogue> {
  const charDesc = chars
    .map(c => `${c.name} (${c.trait}): tyytyv ${c.happiness}/100, humala ${c.drunk}/100, kyll ${c.fullness}/100, neste ${c.hydration}/100`)
    .join("\n");

  const headers: Record<string, string> = { "Content-Type": "application/json" };
  if (apiKey) {
    headers["x-api-key"] = apiKey;
    headers["anthropic-dangerous-direct-browser-access"] = "true";
  }

  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers,
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 1000,
        system: "Olet paljusimulaattoripelin dialogi-generaattori. Kirjoita lyhyt, hauska ja aito suomalainen mokkidialogi 2-4 repliikin verran. Kayta hahmojen nimia ja persoonallisuuksia. Huomioi heidan tilansa. Vastaa VAIN JSON-muodossa ilman markdown-merkintoja: {\"lines\":[{\"name\":\"Nimi\",\"text\":\"repliikki\"}]}",
        messages: [{
          role: "user",
          content: `Ajankohta: ${timeLabel}\nTilanne: ${situation}\n\nHahmot:\n${charDesc}\n\nKirjoita 2-4 repliikkia.`
        }]
      })
    });
    const data = await res.json();
    const txt = (data.content as Array<{ text?: string }>)?.map(b => b.text || "").join("") || "";
    const clean = txt.replace(/```json|```/g, "").trim();
    return JSON.parse(clean) as Dialogue;
  } catch (e) {
    console.warn("AI dialogue failed:", e);
    return fallbackDialogue(chars);
  }
}

function fallbackDialogue(chars: CharState[]): Dialogue {
  return { lines: [
    { name: chars[0]!.name, text: "No niin, tassa sita ollaan taas." },
    { name: chars[Math.floor(Math.random() * chars.length)]!.name, text: "Eiko oo hienoa?" },
  ]};
}
