import { useState, useRef } from "react";
import Sky from "./felles/Sky.jsx";
import "./felles/sky.css";
import "./Hjemskjerm.css";

const ALLE_SPILL = [
  { id: "dyredetektiven",  emoji: "🕵️", bg: "#FFF4CC", border: "#F5C842", shadow: "#c49a00",
    label: "Dyredetektiven",   sublabel: "Hvor gammel blir dyr?",   burst: ["🐘","🦁","🐧","🦊","🐬","🦋"] },
  { id: "dinodetektiven",  emoji: "🦕", bg: "#E8F8E8", border: "#70C870", shadow: "#3a8a3a",
    label: "Dinodetektiven",   sublabel: "Hvem bæsjet dette?",      burst: ["🦕","🦖","💩","🦕","🦖","💩"] },
  { id: "vannlabben",      emoji: "🔬", bg: "#D6F0FF", border: "#5BB8F5", shadow: "#1a7bbf",
    label: "Vann-labben",      sublabel: "Flyter eller synker?",    burst: ["⚽","🪨","🍎","🥄","🪵","🪙"] },
  { id: "lyddetektiven",   emoji: "🎧", bg: "#FFF0E8", border: "#F5A060", shadow: "#c46a20",
    label: "Lyddetektiven",    sublabel: "Hvem lager lyden?",       burst: ["🐄","🐶","🐱","🦆","🐑","🐓"] },
  { id: "silhuett",        emoji: "🔦", bg: "#F0EEFF", border: "#9B8FE8", shadow: "#6254c4",
    label: "Skyggegjetting",   sublabel: "Hvem gjemmer seg?",       burst: ["🦁","🐧","🦒","🐰","🐘","🦈"] },
  { id: "finnforskjellen", emoji: "🔍", bg: "#FFE8F0", border: "#F5A0C0", shadow: "#c4507a",
    label: "Finn forskjellen", sublabel: "Hva er annerledes?",      burst: ["🦋","🐝","🌸","🐞","🍄","🌼"] },
  { id: "dyreboka",        emoji: "📖", bg: "#FFF8E8", border: "#F5D060", shadow: "#b89820",
    label: "Dyreboka",         sublabel: "Lær om dyrene!",          burst: ["📖","🐘","🦁","📚","🐧","✨"] },
  { id: "sorter",          emoji: "🌊", bg: "#E8F8F0", border: "#70C8A0", shadow: "#2a8a60",
    label: "Sorter dyrene",    sublabel: "Vann, land eller luft?",  burst: ["🐟","🦁","🦉","🦀","🐘","🦜"] },
  { id: "dyreminne",       emoji: "🎵", bg: "#F8F0FF", border: "#C090E8", shadow: "#8040b8",
    label: "Dyreminne",        sublabel: "Husk rekkefølgen!",       burst: ["🐄","🐶","🐱","🦆","🎵","🔊"] },
];

function SpillKort({ spill, onOpen }) {
  const [trykket, setTrykket] = useState(false);
  const [partikler, setPartikler] = useState([]);
  const idRef = useRef(0);
  const startPosRef = useRef(null);

  const handlePointerDown = (e) => {
    startPosRef.current = { x: e.clientX, y: e.clientY };
  };

  const handlePointerUp = (e) => {
    if (!startPosRef.current) return;
    const dx = Math.abs(e.clientX - startPosRef.current.x);
    const dy = Math.abs(e.clientY - startPosRef.current.y);
    startPosRef.current = null;
    // Ignorer hvis fingeren beveget seg mer enn 10px — det er en scroll
    if (dx > 10 || dy > 10) return;

    setTrykket(true);
    const nye = spill.burst.map((emoji, i) => ({
      id: idRef.current++, emoji,
      x: 50 + 44 * Math.cos((i / spill.burst.length) * 2 * Math.PI),
      y: 50 + 44 * Math.sin((i / spill.burst.length) * 2 * Math.PI),
    }));
    setPartikler(nye);
    setTimeout(() => { setTrykket(false); setPartikler([]); onOpen(spill.id); }, 550);
  };

  return (
    <button
      className={"spill-kort" + (trykket ? " kort-trykket" : "")}
      style={{ background: spill.bg, borderColor: spill.border, "--skygge": spill.shadow }}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      aria-label={spill.label}
    >
      {partikler.map((p) => (
        <span key={p.id} className="burst-partikkel"
          style={{ "--tx": `${(p.x-50)*2.2}px`, "--ty": `${(p.y-50)*2.2}px` }}>
          {p.emoji}
        </span>
      ))}
      <span className="kort-emoji">{spill.emoji}</span>
      <span className="kort-label"  style={{ color: spill.shadow }}>{spill.label}</span>
      <span className="kort-sublabel" style={{ color: spill.shadow }}>{spill.sublabel}</span>
    </button>
  );
}

export default function Hjemskjerm({ onOpen, onSolTrykk, solTrykk = 0, aktiverte }) {
  // Filtrer bort deaktiverte spill — null betyr alt er på
  const synligeSpill = aktiverte
    ? ALLE_SPILL.filter(s => aktiverte[s.id] !== false)
    : ALLE_SPILL;

  return (
    <div className="hjemskjerm">
      <Sky />

      {/* Sol-knapp for foreldretilgang */}
      <button
        className="sol-knapp"
        onClick={onSolTrykk}
        aria-label="Foreldretilgang"
        title="Trykk 5 ganger for foreldretilgang"
      >
        ☀️
        {solTrykk > 0 && (
          <span className="sol-teller">{solTrykk}/5</span>
        )}
      </button>

      <div className="hils">👋</div>
      <h1 className="tittel">Hva vil du gjøre?</h1>
      <p className="undertittel">Trykk på en knapp!</p>

      <div className="spill-grid">
        {synligeSpill.map((s) => (
          <SpillKort key={s.id} spill={s} onOpen={onOpen} />
        ))}
      </div>

      <div className="gress" aria-hidden="true">
        🌿🌿🌿🌿🌿🌿🌿🌿🌿🌿🌿🌿🌿🌿🌿🌿
      </div>
    </div>
  );
}
