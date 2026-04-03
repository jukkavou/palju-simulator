import type { Activity } from '../types';

export const ACTIVITIES: Record<string, Activity[]> = {
  fri_eve: [
    { id: "unpack", label: "🏠 Purka tavarat", effects: { mood: 5 }, text: "Tavarat kannetaan sisaan." },
    { id: "sauna1", label: "🔥 Lammita sauna", effects: { sauna: 40, wood: -10, mood: 10 }, charEffects: { leader: "Janne", leaderBonus: { happiness: 10 } }, text: "Ensimmaiset loylyt!" },
    { id: "hotub_fill", label: "🛁 Tayta palju", effects: { hotTubTemp: 15, wood: -5 }, text: "Palju taytetaan jarvivedella." },
    { id: "grill", label: "🥩 Grillaa illallinen", effects: { food: -12, mood: 10 }, charEffects: { allFood: 20, leader: "Jukka", leaderBonus: { happiness: 10 } }, text: "Makkarat ja pihvit grilliin!" },
    { id: "drinks1", label: "🍺 Avaa kylmat", effects: { booze: -8, mood: 8 }, charEffects: { allDrunk: 12, allHydration: -5, leader: "Vesa", leaderBonus: { happiness: 8 } }, text: "Kylmat napsahtavat auki!" },
  ],
  sat_morn: [
    { id: "breakfast", label: "🥞 Aamiainen", effects: { food: -10, mood: 10 }, charEffects: { allFood: 18, allDrunk: -8, allHydration: 5 }, text: "Aamupala valmistuu." },
    { id: "hotub_heat", label: "🔥 Lisaa puita paljuun", effects: { hotTubTemp: 10, wood: -5 }, text: "Palju tarvitsee lisaa puita." },
    { id: "sauna_morn", label: "🧖 Aamusauna", effects: { sauna: 25, wood: -5, mood: 8 }, charEffects: { allHydration: -8 }, text: "Aamusauna!" },
    { id: "tech_setup", label: "🤓 Tekniikka-demo", effects: { mood: 10 }, charEffects: { leader: "Ari", leaderBonus: { happiness: 15 } }, text: "Vimpaimet levitetaan poydalle!" },
    { id: "chill", label: "☕ Kahvi terassilla", effects: { mood: 8 }, charEffects: { allHydration: 8, allDrunk: -5 }, text: "Rauhallinen hetki." },
  ],
  sat_day: [
    { id: "drone", label: "🚁 Drone-lennatys", effects: { mood: 15 }, requires: "DJI Mini 4 Pro -drone", charEffects: { leader: "Ari", leaderBonus: { happiness: 15 } }, text: "Drone nousee ilmaan!" },
    { id: "rc_race", label: "🏎️ RC-kilpa-ajo", effects: { mood: 15 }, requires: "RC-monstertruck", text: "Hiekkatie on kilparata!" },
    { id: "vr_session", label: "🥽 VR-sessio", effects: { mood: 12 }, requires: "Meta Quest 3 -lasit", text: "Quest-lasit kiertavat." },
    { id: "fishing", label: "🎣 Kalastus", effects: { mood: 10, food: 5 }, requires: "Kalastusvalineet", text: "Laiturilla kalassa." },
    { id: "swim", label: "🏊 Uinti jarvessa", effects: { mood: 8 }, charEffects: { allHydration: 5 }, text: "Jarvi virkistaa!" },
    { id: "hotub_m", label: "🛁 Paljun yllapito", effects: { hotTubTemp: 12, wood: -6 }, text: "Puita paljun alle." },
    { id: "cook_lunch", label: "🍳 Lounas", effects: { food: -14, mood: 8 }, charEffects: { allFood: 18, leader: "Jukka", leaderBonus: { happiness: 8 } }, text: "Lounas valmistuu!" },
    { id: "boardgames", label: "🎲 Lautapelit", effects: { mood: 12 }, requires: "Lautapelit", text: "Catan poytaan!" },
  ],
  sat_eve: [
    { id: "feast", label: "🥩 Iso grilli-illallinen", effects: { food: -20, mood: 18 }, charEffects: { allFood: 25, leader: "Jukka", leaderBonus: { happiness: 12 } }, text: "Illan paatapahtuma!" },
    { id: "hotub_party", label: "🛁 Paljubileet", effects: { hotTubTemp: -3, mood: 20, booze: -10 }, charEffects: { allDrunk: 12, allHydration: -5, allHappiness: 8 }, text: "Kaikki paljuun!" },
    { id: "sauna_eve", label: "🔥 Iltasauna", effects: { sauna: 30, wood: -8, mood: 15 }, charEffects: { allHydration: -10, leader: "Janne", leaderBonus: { happiness: 12 } }, text: "Loylyt laulavat!" },
    { id: "drinks_heavy", label: "🥃 Kunnon bileet", effects: { booze: -22, mood: 12 }, charEffects: { allDrunk: 30, allHydration: -12, leader: "Vesa", leaderBonus: { happiness: 15 } }, text: "Juomapelit alkavat!" },
    { id: "drinks_chill", label: "🍷 Viini & keskustelu", effects: { booze: -8, mood: 12 }, charEffects: { allDrunk: 10, allHappiness: 5 }, text: "Rauhallinen iltaviini." },
    { id: "movie", label: "📽️ Leffa projektorilla", effects: { mood: 14 }, requires: "Kannettava projektori", text: "Elokuvailta!" },
    { id: "fpv", label: "📡 FPV pimeassa", effects: { mood: 10 }, requires: "FPV-lasit + rata", charEffects: { leader: "Ari", leaderBonus: { happiness: 12 } }, text: "LED-rata pimeassa!" },
  ],
  sat_night: [
    { id: "party_on", label: "🎉 Jatkot", effects: { booze: -15, mood: 8 }, charEffects: { allDrunk: 22, allHydration: -10, leader: "Vesa", leaderBonus: { happiness: 10 } }, text: "Yo jatkuu!" },
    { id: "night_sauna", label: "🔥 Yosauna", effects: { sauna: 20, wood: -5, mood: 12 }, charEffects: { allHydration: -8 }, text: "Yosauna tahtitaivaan alla." },
    { id: "sleep", label: "😴 Nukkumaan", effects: { mood: 5 }, charEffects: { allDrunk: -10, allHydration: 5, allHappiness: 5 }, text: "Jarkeva valinta." },
    { id: "snacks", label: "🍿 Yopalaa", effects: { food: -6, mood: 5 }, charEffects: { allFood: 10 }, text: "Kaikki maistuu nyt." },
    { id: "stars", label: "⭐ Tahtitaivas", effects: { mood: 10 }, charEffects: { allHappiness: 8 }, text: "Tahtitaivas on upea." },
  ],
  sun_morn: [
    { id: "hangover_bfast", label: "🤢 Darra-aamiainen", effects: { food: -10, mood: 6 }, charEffects: { allFood: 15, allDrunk: -15, allHydration: 10 }, text: "Kahvia. Paljon kahvia." },
    { id: "last_sauna", label: "🧖 Viimeinen sauna", effects: { sauna: 20, wood: -5, mood: 12 }, charEffects: { allHydration: -5, allHappiness: 5 }, text: "Perinne on perinne." },
    { id: "last_swim", label: "🏊 Viimeinen uinti", effects: { mood: 8 }, charEffects: { allHydration: 5, allDrunk: -5 }, text: "Virkistava pulahdus." },
    { id: "pack", label: "📦 Pakkaa tavarat", effects: { mood: -3 }, text: "Tavarat autoon." },
  ],
  sun_day: [
    { id: "c_kitchen", label: "🧽 Keittio", effects: { clean: 25, mood: -5 }, text: "Tiskivuori odottaa." },
    { id: "c_sauna", label: "🧹 Saunan siivous", effects: { clean: 20, mood: -3 }, text: "Sauna ja palju siistiksi." },
    { id: "c_rooms", label: "🛏️ Huoneet", effects: { clean: 20, mood: -3 }, text: "Lakanat kasaan." },
    { id: "c_outside", label: "🏡 Piha", effects: { clean: 20, mood: -5 }, text: "Piha siistiksi." },
    { id: "c_trash", label: "🗑️ Roskat", effects: { clean: 15, mood: -3 }, text: "Pullot ja roskat pois." },
  ],
};
