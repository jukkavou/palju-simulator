import { useState } from 'react';
import { DEFAULT_CHARACTERS } from './data/characters';
import { TIME_SLOTS } from './data/timeSlots';
import { ACTIVITIES } from './data/activities';
import { RANDOM_EVENTS } from './data/events';
import { useGameState } from './hooks/useGameState';
import { useDialogue } from './hooks/useDialogue';
import { calculateScore } from './utils/scoring';
import StartScreen from './screens/StartScreen';
import ShoppingScreen from './screens/ShoppingScreen';
import GearScreen from './screens/GearScreen';
import GameScreen from './screens/GameScreen';
import SummaryScreen from './screens/SummaryScreen';
import HallOfFame from './components/HallOfFame';

export default function App() {
  const [phase, setPhase] = useState("start");
  const [charTemplates, setCharTemplates] = useState([...DEFAULT_CHARACTERS]);
  const [budget] = useState(200);
  const [spent, setSpent] = useState(0);
  const [cart, setCart] = useState([]);
  const [gear, setGear] = useState([]);
  const [score, setScore] = useState(null);
  const [hallOfFame, setHallOfFame] = useState([]);
  const [apiKey, setApiKey] = useState("");

  const game = useGameState(charTemplates);
  const dialog = useDialogue();
  const currentSlot = TIME_SLOTS[game.timeSlot];
  const currentActivities = ACTIVITIES[currentSlot?.id] || [];

  const doActivity = async (act) => {
    if (game.actionsLeft <= 0) return;
    if (act.requires && !gear.find(g => g.name === act.requires)) { game.log("Puuttuu: " + act.requires, "#f44"); return; }
    const r = game.resources;
    if (act.effects.food && r.food + (act.effects.food||0) < 0 && act.effects.food < 0) { game.log("Ruoka loppu!", "#f44"); return; }
    if (act.effects.booze && r.booze + (act.effects.booze||0) < 0 && act.effects.booze < 0) { game.log("Juomat loppu!", "#f44"); return; }
    if (act.effects.wood && r.wood + (act.effects.wood||0) < 0 && act.effects.wood < 0) { game.log("Polttopuut loppu!", "#f44"); return; }
    game.applyResourceEffects(act.effects);
    if (act.charEffects) {
      game.updateAllChars(act.charEffects);
      if (act.charEffects.leader) {
        const leader = game.characters.find(c => c.name === act.charEffects.leader || c.trait === act.charEffects.leader);
        if (leader && act.charEffects.leaderBonus) game.updateChar(leader.name, act.charEffects.leaderBonus);
      }
    }
    game.setActionsLeft(prev => prev - 1);
    game.log(act.text, "#0f0");
    const dl = await dialog.fetchDialogue(game.characters, act.text, currentSlot?.label, apiKey);
    if (dl?.lines) dl.lines.forEach(l => game.log(l.name + ': "' + l.text + '"', "#88f"));
  };

  const advanceTime = () => {
    if (game.timeSlot >= TIME_SLOTS.length - 1) { setScore(calculateScore(game.characters, game.resources)); setPhase("summary"); return; }
    if (Math.random() < 0.45 && game.timeSlot > 0) {
      const evt = RANDOM_EVENTS[Math.floor(Math.random() * RANDOM_EVENTS.length)];
      game.applyResourceEffects(evt.effects);
      if (evt.charEffects) game.updateAllChars(evt.charEffects);
      if (evt.charTarget) { const t = game.characters.find(c => c.trait === evt.charTarget.trait); if (t) game.updateChar(t.name, { happiness: evt.charTarget.happiness }); }
      game.log(evt.text, "#ff0");
    }
    game.decayResources();
    game.setTimeSlot(prev => prev + 1);
    game.setActionsLeft(3);
    dialog.clearDialogue();
    game.characters.forEach(c => {
      if (c.hydration < 20) game.log(c.name + " on kuivunut!", "#f44");
      if (c.fullness < 15) game.log(c.name + " on nalkainen!", "#f44");
      if (c.drunk > 80) game.log(c.name + " on todella humalassa!", "#f44");
    });
  };

  const saveToHallOfFame = (name) => {
    setHallOfFame(prev => [...prev, { name, score: score.total, chars: game.characters.map(c => c.name), date: new Date().toLocaleDateString("fi-FI") }].sort((a,b) => b.score - a.score).slice(0, 10));
    setPhase("halloffame");
  };

  const restart = () => {
    setPhase("start"); setSpent(0); setCart([]); setGear([]); setScore(null);
    dialog.clearDialogue(); game.reset(charTemplates);
  };

  const addToCart = (item) => {
    if (spent + item.cost > budget) return;
    setCart(prev => [...prev, item]); setSpent(prev => prev + item.cost);
    game.setResources(prev => ({ ...prev, food: prev.food+(item.food||0), booze: prev.booze+(item.booze||0), wood: prev.wood+(item.wood||0), hydration: prev.hydration+(item.hydration||0) }));
  };
  const removeFromCart = (idx) => {
    const item = cart[idx];
    setCart(prev => prev.filter((_,i) => i !== idx)); setSpent(prev => prev - item.cost);
    game.setResources(prev => ({ ...prev, food: prev.food-(item.food||0), booze: prev.booze-(item.booze||0), wood: prev.wood-(item.wood||0), hydration: prev.hydration-(item.hydration||0) }));
  };
  const toggleGear = (item) => setGear(prev => prev.find(g => g.name === item.name) ? prev.filter(g => g.name !== item.name) : [...prev, item]);

  if (phase === "halloffame") return <HallOfFame entries={hallOfFame} onRestart={restart} />;
  if (phase === "start") return <StartScreen characters={charTemplates} setCharacters={setCharTemplates} apiKey={apiKey} setApiKey={setApiKey} onStart={() => setPhase("shopping")} hasHallOfFame={hallOfFame.length > 0} onShowHallOfFame={() => setPhase("halloffame")} />;
  if (phase === "shopping") return <ShoppingScreen budget={budget} spent={spent} cart={cart} onAdd={addToCart} onRemove={removeFromCart} onNext={() => setPhase("gear")} />;
  if (phase === "gear") return <GearScreen gear={gear} onToggle={toggleGear} onBack={() => setPhase("shopping")} onStart={() => { setPhase("playing"); game.log("Porukka saapui mokille!", "#FFD54F"); }} />;
  if (phase === "summary" && score) return <SummaryScreen score={score} characters={game.characters} onSave={saveToHallOfFame} onRestart={restart} />;
  return <GameScreen currentSlot={currentSlot} timeSlot={game.timeSlot} actionsLeft={game.actionsLeft} characters={game.characters} resources={game.resources} activities={currentActivities} gear={gear} eventLog={game.eventLog} dialogue={dialog.dialogue} loadingDialogue={dialog.loading} onDoActivity={doActivity} onAdvanceTime={advanceTime} totalSlots={TIME_SLOTS.length} nextSlotLabel={TIME_SLOTS[game.timeSlot+1]?.label} />;
}
