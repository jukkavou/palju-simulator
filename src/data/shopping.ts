import type { ShoppingItem } from '../types';

export const SHOPPING_ITEMS: ShoppingItem[] = [
  { name: "Makkarat & lihat", cost: 25, food: 20, emoji: "🥩" },
  { name: "Salaatit & kasvikset", cost: 15, food: 10, emoji: "🥗" },
  { name: "Aamiaistarvikkeet", cost: 12, food: 15, emoji: "🥞" },
  { name: "Snackit & sipsit", cost: 10, food: 8, emoji: "🍿" },
  { name: "Olut (24-pack)", cost: 35, booze: 30, emoji: "🍺" },
  { name: "Lonkero (12-pack)", cost: 28, booze: 15, emoji: "🥂" },
  { name: "Viinit (3 pulloa)", cost: 30, booze: 20, emoji: "🍷" },
  { name: "Vakevat", cost: 25, booze: 25, emoji: "🥃" },
  { name: "Grillihiilet", cost: 8, emoji: "🔥", misc: "coal" },
  { name: "Polttopuut (extra)", cost: 15, wood: 25, emoji: "🪵" },
  { name: "Mehut & limsat", cost: 8, hydration: 15, emoji: "🧃" },
  { name: "Vesipullot (iso)", cost: 5, hydration: 20, emoji: "💧" },
];
