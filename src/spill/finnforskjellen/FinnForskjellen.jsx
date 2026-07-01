import { useState, useMemo, useEffect } from "react";
import Sky from "../../felles/Sky.jsx";
import { speak, stoppLyd } from "../../felles/speak.js";
import { SCENER } from "./data.js";
import "../../felles/sky.css";
import "./FinnForskjellen.css";

function lagSceneB(scene) {
  return scene.objekter.map((o) =>
    o.id === scene.forskjell ? { ...o, emoji: scene.endring.til } : o
  );
}

function Bilde({ objekter, onTrykk, funnetId, sideLabel, bakgrunn }) {
  return (
    <div className="ff-ramme">
      <div className="ff-merke">{sideLabel}</div>
      <div className="ff-bilde" style={{ background: bakgrunn }}>
        {objekter.map((o) => (
          <button
            key={o.id}
            className={"ff-obj" + (funnetId === o.id ? " ff-funnet" : "")}
            style={{ left: `${o.x}%`, top: `${o.y}%` }}
            onClick={() => onTrykk(o.id)}
            aria-label="Trykk her"
          >
            {o.emoji}
          </button>
        ))}
      </div>
    </div>
  );
}

export default function FinnForskjellen({ onBack }) {
  const sceneRekkefolge = useMemo(
    () => [...SCENER].sort(() => Math.random() - 0.5),
    []
  );
  const [sceneIdx, setSceneIdx] = useState(0);
  const [funnet, setFunnet]     = useState(false);
  const [stjerner, setStjerner] = useState(0);
  const [ferdig, setFerdig]     = useState(false);

  const scene  = sceneRekkefolge[sceneIdx];
  const sceneB = useMemo(() => lagSceneB(scene), [scene]);

  useEffect(() => {
    setTimeout(() => speak("Kan du finne forskjellen?"), 400);
    return () => stoppLyd();
  }, [sceneIdx]);

  const trykk = (id) => {
    if (funnet) return;
    if (id === scene.forskjell) {
      setFunnet(true);
      speak(`Du fant den! ${scene.endring.fra} ble til ${scene.endring.til}!`);
    } else {
      speak("Ikke der, se videre!");
    }
  };

  const neste = () => {
    setStjerner((s) => s + 1);
    if (sceneIdx + 1 < sceneRekkefolge.length) {
      setSceneIdx((i) => i + 1);
      setFunnet(false);
    } else {
      setFerdig(true);
      speak("Du fant alle forskjellene! Du er en ekte detektiv!");
    }
  };

  if (ferdig) return (
    <div className="ff-scene">
      <Sky />
      <button className="ff-tilbake" onClick={onBack}>← Hjem</button>
      <div className="ff-ferdig">
        <div className="ff-ferdig-emoji">🔍✨</div>
        <h2>Alle forskjeller funnet!</h2>
        <p>{"⭐".repeat(stjerner)}</p>
        <button className="ff-btn" onClick={() => window.location.reload()}>Spill igjen</button>
        <button className="ff-btn ff-btn-sek" onClick={onBack}>← Tilbake til Lelulu</button>
      </div>
    </div>
  );

  return (
    <div className="ff-scene">
      <Sky />
      <button className="ff-tilbake" onClick={onBack}>← Hjem</button>

      <div className="ff-stjerner">
        {"⭐".repeat(stjerner)}{"☆".repeat(sceneRekkefolge.length - stjerner)}
      </div>

      <p className="ff-instruks">
        {funnet ? "Du fant den! 🎉" : "Finn det som er forskjellig!"}
      </p>

      <div className="ff-bilder">
        <Bilde
          objekter={scene.objekter}
          onTrykk={trykk}
          funnetId={null}
          sideLabel="A"
          bakgrunn={scene.bakgrunn}
        />
        <Bilde
          objekter={sceneB}
          onTrykk={trykk}
          funnetId={funnet ? scene.forskjell : null}
          sideLabel="B"
          bakgrunn={scene.bakgrunn}
        />
      </div>

      {funnet && (
        <div className="ff-resultat">
          <span>{scene.endring.fra} → {scene.endring.til}</span>
          <button className="ff-btn" onClick={neste}>
            {sceneIdx + 1 < sceneRekkefolge.length ? "Neste bilde" : "Se resultatet"}
          </button>
        </div>
      )}
    </div>
  );
}
