export const DEFAULT_CHARACTERS = [
  { name: "Ari", trait: "Teknonortti", emoji: "🤓", desc: "Tuo aina uusimmat vimpaimet" },
  { name: "Jukka", trait: "Grillimestari", emoji: "👨‍🍳", desc: "Vastaa ruuanlaitosta" },
  { name: "Janne", trait: "Saunamestari", emoji: "🔥", desc: "Pitaa loylyt kohdallaan" },
  { name: "Tomi", trait: "Jarjestaja", emoji: "📋", desc: "Suunnittelee ja organisoi" },
  { name: "Vesa", trait: "Bilettaja", emoji: "🍺", desc: "Nostaa tunnelmaa" },
];

export function createCharState(chars) {
  return chars.map(c => ({ ...c, happiness: 60, drunk: 0, fullness: 50, hydration: 70 }));
}
