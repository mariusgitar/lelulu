import { useState, useMemo, useRef, useEffect } from "react";
import Sky from "../../felles/Sky.jsx";
import { playAudio, stoppLyd, unlockAudio, preloadLyder } from "../../felles/speak.js";
import { pling, bumm } from "../../felles/feedback.js";
import { DYR } from "./data.js";
import "../../felles/sky.css";
import "./Silhuett.css";

preloadLyder([
  "/lyd/fraser/sil_sporsmal.mp3",
  "/lyd/fraser/sil_ferdig.mp3",
  "/lyd/fraser/respons_riktig_1.mp3",
  "/lyd/fraser/respons_naer.mp3",
  ...DYR.map(d => `/lyd/silhuett/${d.id}.mp3`),
]);

const RUNDER = 5;

export default function Silhuett({ onBack }) {
  const [rundeIndex, setRundeIndex] = useState(0);
  const [feedback, setFeedback]     = useState(null);
  const [valgt, setValgt]           = useState(null);
  const [stjerner, setStjerner]     = useState(0);
  const [ferdig, setFerdig]         = useState(false);
  const introSpilt = useRef(false);

  const runder = useMemo(() => {
    const shuffled = [...DYR].sort(() => Math.random() - 0.5).slice(0, RUNDER);
    return shuffled.map((fasit) => {
      const andre = DYR.filter((d) => d.id !== fasit.id).sort(() => Math.random() - 0.5).slice(0, 2);
      return { fasit, alternativer: [fasit, ...andre].sort(() => Math.random() - 0.5) };
    });
  }, []);

  const runde = runder[rundeIndex];

  useEffect(() => {
    if (!introSpilt.current && runde) {
      introSpilt.current = true;
      setTimeout(async () => {
        await unlockAudio();
        playAudio("/lyd/fraser/sil_sporsmal.mp3", "Hvem gjemmer seg i skyggen?");
      }, 400);
    }
  }, [runde]);

  useEffect(() => () => stoppLyd(), []);

  const velg = async (dyr) => {
    if (feedback) return;
    setValgt(dyr.id);
    if (dyr.id === runde.fasit.id) {
      pling();
      setFeedback("riktig");
      // Bruker forhåndsgenerert fil med riktig dyrenavn — ingen Web Speech
      await playAudio(
        `/lyd/silhuett/${runde.fasit.id}.mp3`,
        `Riktig! Det er en ${runde.fasit.navn.toLowerCase()}!`
      );
      setTimeout(() => {
        setStjerner((s) => s + 1);
        if (rundeIndex + 1 < RUNDER) {
          setRundeIndex((i) => i + 1);
          setFeedback(null);
          setValgt(null);
          introSpilt.current = false;
        } else {
          setFerdig(true);
          playAudio("/lyd/fraser/sil_ferdig.mp3", "Du gjettet alle skyggene! Godt øye!");
        }
      }, 1900);
    } else {
      bumm();
      setFeedback("feil");
      playAudio("/lyd/fraser/respons_naer.mp3", "Nesten! Se godt på formen.");
      setTimeout(() => { setFeedback(null); setValgt(null); }, 1100);
    }
  };

  if (ferdig) return (
    <div className="sil-scene"><Sky />
      <button className="sil-tilbake" onClick={onBack}>← Hjem</button>
      <div className="sil-ferdig">
        <div className="sil-ferdig-emoji">🌟🔦</div>
        <h2>Alle skygger funnet!</h2>
        <p>{"⭐".repeat(stjerner)}</p>
        <button className="sil-btn" onClick={() => window.location.reload()}>Spill igjen</button>
        <button className="sil-btn sil-btn-sek" onClick={onBack}>← Tilbake til Lelulu</button>
      </div>
    </div>
  );

  if (!runde) return null;

  return (
    <div className="sil-scene"><Sky />
      <button className="sil-tilbake" onClick={onBack}>← Hjem</button>
      <div className="sil-stjerner">{"⭐".repeat(stjerner)}{"☆".repeat(RUNDER - stjerner)}</div>
      <p className="sil-sporsmal">Hvem gjemmer seg i skyggen?</p>
      <div className="sil-boks" style={{ borderColor: runde.fasit.kant }}>
        <span className={"sil-emoji" + (feedback === "riktig" ? " avslort" : "")}
          style={feedback !== "riktig" ? { filter: "brightness(0)", opacity: 0.85 } : {}}>
          {runde.fasit.emoji}
        </span>
      </div>
      <div className="sil-alternativer">
        {runde.alternativer.map((dyr) => {
          const erValgt   = valgt === dyr.id;
          const visRiktig = feedback === "riktig" && erValgt;
          const visFeil   = feedback === "feil"   && erValgt;
          return (
            <button key={dyr.id}
              className={"sil-kort" + (visRiktig ? " kort-riktig" : "") + (visFeil ? " kort-feil" : "")}
              style={{ background: dyr.farge, borderColor: dyr.kant }}
              onClick={() => velg(dyr)} disabled={!!feedback}>
              <span className="sil-dyr-emoji">{dyr.emoji}</span>
              <span className="sil-dyr-navn">{dyr.navn}</span>
            </button>
          );
        })}
      </div>
      {feedback === "feil"   && <div className="sil-feedback feil">Prøv igjen! 👀</div>}
      {feedback === "riktig" && <div className="sil-feedback riktig">Tada! 🎉</div>}
    </div>
  );
}
