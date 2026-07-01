import { useState, useRef } from "react";
import Sky from "./felles/Sky.jsx";
import "./felles/sky.css";
import "./Hjemskjerm.css";

const SPILL = [
  {
    id: "dyredetektiven",
    emoji: "🕵️",
    bg: "#FFF4CC",
    border: "#F5C842",
    shadow: "#c49a00",
    label: "Dyredetektiven",
    sublabel: "Hvor gammel blir dyr?",
    locked: false,
    burst: ["🐘", "🦁", "🐧", "🦊", "🐬", "🦋"],
  },
  {
    id: "vannlabben",
    emoji: "🔬",
    bg: "#D6F0FF",
    border: "#5BB8F5",
    shadow: "#1a7bbf",
    label: "Vann-labben",
    sublabel: "Flyter eller synker?",
    locked: false,
    burst: ["⚽", "🪨", "🍎", "🥄", "🪵", "🪙"],
  },
  {
    id: "mysteriet",
    emoji: "🐾",
    bg: "#E8FFD6",
    border: "#7DD95A",
    shadow: "#4caa22",
    label: "Mysteriet",
    sublabel: "Snart klar!",
    locked: true,
    burst: [],
  },
  {
    id: "dyreboka",
    emoji: "📖",
    bg: "#FFE8F0",
    border: "#F5A0C0",
    shadow: "#c4507a",
    label: "Dyreboka",
    sublabel: "Snart klar!",
    locked: true,
    burst: [],
  },
  {
    id: "sorter",
    emoji: "🌊",
    bg: "#F0EEFF",
    border: "#9B8FE8",
    shadow: "#6254c4",
    label: "Sorter dyrene",
    sublabel: "Snart klar!",
    locked: true,
    burst: [],
  },
  {
    id: "dyreminne",
    emoji: "🎵",
    bg: "#FFF0E8",
    border: "#F5A060",
    shadow: "#c46a20",
    label: "Dyreminne",
    sublabel: "Snart klar!",
    locked: true,
    burst: [],
  },
];

function SpillKort({ spill, onOpen }) {
  const [trykket, setTrykket] = useState(false);
  const [partikler, setPartikler] = useState([]);
  const idRef = useRef(0);

  const handleTrykk = () => {
    if (spill.locked) return;
    setTrykket(true);
    const nye = spill.burst.map((emoji, i) => ({
      id: idRef.current++,
      emoji,
      x: 50 + 44 * Math.cos((i / spill.burst.length) * 2 * Math.PI),
      y: 50 + 44 * Math.sin((i / spill.burst.length) * 2 * Math.PI),
    }));
    setPartikler(nye);
    setTimeout(() => {
      setTrykket(false);
      setPartikler([]);
      onOpen(spill.id);
    }, 550);
  };

  return (
    <button
      className={"spill-kort" + (spill.locked ? " kort-laaast" : "") + (trykket ? " kort-trykket" : "")}
      style={{
        background: spill.bg,
        borderColor: spill.border,
        "--skygge": spill.shadow,
      }}
      onPointerDown={handleTrykk}
      disabled={spill.locked}
      aria-label={spill.label}
    >
      {partikler.map((p) => (
        <span
          key={p.id}
          className="burst-partikkel"
          style={{
            "--tx": `${(p.x - 50) * 2.2}px`,
            "--ty": `${(p.y - 50) * 2.2}px`,
          }}
        >
          {p.emoji}
        </span>
      ))}

      {spill.locked && <span className="laas-badge">🔒</span>}
      <span className="kort-emoji">{spill.emoji}</span>
      <span className="kort-label" style={{ color: spill.shadow }}>{spill.label}</span>
      <span className="kort-sublabel" style={{ color: spill.shadow }}>{spill.sublabel}</span>
    </button>
  );
}

export default function Hjemskjerm({ onOpen }) {
  return (
    <div className="hjemskjerm">
      <Sky />
      <div className="hils">👋</div>
      <h1 className="tittel">Hva vil du gjøre?</h1>
      <p className="undertittel">Trykk på en knapp!</p>
      <div className="spill-grid">
        {SPILL.map((s) => (
          <SpillKort key={s.id} spill={s} onOpen={onOpen} />
        ))}
      </div>
      <div className="gress" aria-hidden="true">
        🌿🌿🌿🌿🌿🌿🌿🌿🌿🌿🌿🌿🌿🌿🌿🌿
      </div>
    </div>
  );
}
