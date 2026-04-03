export interface Character {
  name: string;
  trait: string;
  emoji: string;
  desc: string;
}

export interface CharState extends Character {
  happiness: number;
  drunk: number;
  fullness: number;
  hydration: number;
}

export interface ResourceEffects {
  food?: number;
  booze?: number;
  wood?: number;
  mood?: number;
  sauna?: number;
  hotTubTemp?: number;
  clean?: number;
  hydration?: number;
}

export interface CharEffects {
  allDrunk?: number;
  allFood?: number;
  allHydration?: number;
  allHappiness?: number;
  leader?: string;
  leaderBonus?: Record<string, number>;
}

export interface Activity {
  id: string;
  label: string;
  effects: ResourceEffects;
  charEffects?: CharEffects;
  requires?: string;
  text: string;
}

export interface RandomEvent {
  text: string;
  effects: ResourceEffects;
  charEffects?: CharEffects;
  charTarget?: { trait: string; happiness: number };
}

export interface GearItem {
  name: string;
  emoji: string;
  fun: number;
}

export interface ShoppingItem {
  name: string;
  cost: number;
  emoji: string;
  food?: number;
  booze?: number;
  wood?: number;
  hydration?: number;
  misc?: string;
}

export interface TimeSlot {
  id: string;
  label: string;
  icon: string;
}

export interface Scene {
  sky: string;
  ground: string;
}

export interface Resources {
  food: number;
  booze: number;
  wood: number;
  mood: number;
  sauna: number;
  hotTubTemp: number;
  clean: number;
  hydration: number;
}

export interface EventLogEntry {
  text: string;
  color: string;
}

export interface DialogueLine {
  name: string;
  text: string;
}

export interface Dialogue {
  lines: DialogueLine[];
}

export interface Score {
  happiness: number;
  saunaBonus: number;
  hotTubBonus: number;
  cleanBonus: number;
  moodBonus: number;
  drunkPenalty: number;
  foodPenalty: number;
  dehydrationPenalty: number;
  total: number;
}

export interface HallOfFameEntry {
  name: string;
  score: number;
  chars: string[];
  date: string;
}
