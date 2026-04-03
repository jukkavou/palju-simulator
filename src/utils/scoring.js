export function calculateScore(characters, resources) {
  const avgHappy = Math.round(characters.reduce((a, c) => a + c.happiness, 0) / characters.length);
  const avgDrunk = Math.round(characters.reduce((a, c) => a + c.drunk, 0) / characters.length);
  const s = {
    happiness: avgHappy,
    saunaBonus: Math.min(25, Math.round(resources.sauna * 0.25)),
    hotTubBonus: resources.hotTubTemp > 35 ? 20 : resources.hotTubTemp > 25 ? 12 : 4,
    cleanBonus: Math.min(25, Math.round(resources.clean * 0.25)),
    moodBonus: Math.round(resources.mood * 0.3),
    drunkPenalty: avgDrunk > 60 ? -15 : avgDrunk > 40 ? -5 : 0,
    foodPenalty: characters.some(c => c.fullness < 10) ? -10 : 0,
    dehydrationPenalty: characters.some(c => c.hydration < 15) ? -10 : 0,
  };
  s.total = Object.values(s).reduce((a, b) => a + b, 0);
  return s;
}

export function getRating(total) {
  if (total >= 150) return "LEGENDAARINEN";
  if (total >= 120) return "LOISTAVA";
  if (total >= 90) return "HYVA";
  if (total >= 60) return "IHAN OK";
  return "KATASTROFI";
}
