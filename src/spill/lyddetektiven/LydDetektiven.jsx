import { useState, useMemo, useRef, useEffect } from "react";
import Sky from "../../felles/Sky.jsx";
import { playAudio, stoppLyd, unlockAudio } from "../../felles/speak.js";
import { DYR } from "./data.js";
import "../../felles/sky.css";
import "./LydDetektiven.css";

const RUNDER = 5;

export default function LydDetektiven({ onBack }) {
  const [rundeIndex, setRundeIndex] = useState(0);
  const [feedback, setFeedback]     = useState(null);
  const [valgt, setValgt]           = useState(null);
  const [stjerner, setStjerner]     = useState(0);
  const [ferdig, setFerdig]         = useState(false);
  const [spillerLyd, setSpillerLyd] = useState(false);
  const introSpilt = useRef(false);

  const runder = useMemo(() => {
    const shuffled = [...DYR].sort(() => Math.random() - 0.5).slice(0, RUNDER);
    return shuffled.map((fasit) => {
      const andre = DYR.filter((d) => d.id !== fasit.id).sort(() => Math.random() - 0.5).slice(0, 2);
      return { fasit, alternativer: [fasit, ...andre].sort(() => Math.random() - 0.5) };
    });
  }, []);

  const runde = runder[rundeIndex];

  // Bug 3 fix: si "Hvem lager denne lyden?" FØR dyrelyden spilles
  const lesLyd = async () => {
    if (!runde || spillerLyd) return;
    await unlockAudio();
    setSpillerLyd(true);
    await playAudio("/lyd/fraser/lyd_sporsmal.mp3", "Hvem lager denne lyden?");
    await new Promise((r) => setTimeout(r, 200));
    await playAudio(runde.fasit.src, runde.fasit.lyd);
    setSpillerLyd(false);
  };

  useEffect(() => {
    if (!introSpilt.current && runde) {
      introSpilt.current = true;
      setTimeout(lesLyd, 500);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [runde]);

  useEffect(() => () => stoppLyd(), []);

  const velg = async (dyr) => {
    if (feedback) return;
    setValgt(dyr.id);
    if (dyr.id === runde.fasit.id) {
      setFeedback("riktig");
      await playAudio("/lyd/fraser/lyd_riktig.mp3", `Riktig! Det var ${runde.fasit.navn}en!`);
      setTimeout(() => {
        setStjerner((s) => s + 1);
        if (rundeIndex + 1 < RUNDER) {
          setRundeIndex((i) => i + 1);
          setFeedback(null);
          setValgt(null);
          introSpilt.current = false;
        } else {
          setFerdig(true);
          playAudio("/lyd/fraser/lyd_ferdig.mp3", "Du kjente igjen alle dyrelydene! Du er en ekte lyddetektiv!");
        }
      }, 1700);
    } else {
      setFeedback("feil");
      await playAudio("/lyd/fraser/lyd_feil.mp3", "Lytt en gang til!");
      setTimeout(() => { setFeedback(null); setValgt(null); }, 1100);
    }
  };

  if (ferdig) return (
    <div className="lyd-scene"><Sky />
      <button className="lyd-tilbake" onClick={onBack}>← Hjem</button>
      <div className="lyd-ferdig">
        <div className="lyd-ferdig-emoji">🎧🐾</div>
        <h2>Lyddetektiv-mester!</h2>
        <p>{"⭐".repeat(stjerner)}</p>
        <button className="lyd-btn" onClick={() => window.location.reload()}>Spill igjen</button>
        <button className="lyd-btn lyd-btn-sek" onClick={onBack}>← Tilbake til Lelulu</button>
      </div>
    </div>
  );

  if (!runde) return null;

  return (
    <div className="lyd-scene"><Sky />
      <button className="lyd-tilbake" onClick={onBack}>← Hjem</button>
      <div className="lyd-stjerner">{"⭐".repeat(stjerner)}{"☆".repeat(RUNDER - stjerner)}</div>
      <p className="lyd-sporsmal">Hvem lager denne lyden?</p>
      <button className={"lyd-stor-knapp" + (spillerLyd ? " spiller" : "")}
        onClick={lesLyd} aria-label="Spill lyden igjen">
        <span>{spillerLyd ? "🔊" : "🔈"}</span>
      </button>
      <div className="lyd-alternativer">
        {runde.alternativer.map((dyr) => {
          const erValgt   = valgt === dyr.id;
          const visRiktig = feedback === "riktig" && erValgt;
          const visFeil   = feedback === "feil"   && erValgt;
          return (
            <button key={dyr.id}
              className={"lyd-kort" + (visRiktig ? " kort-riktig" : "") + (visFeil ? " kort-feil" : "")}
              style={{ background: dyr.farge, borderColor: dyr.kant }}
              onClick={() => velg(dyr)} disabled={!!feedback}>
              <span className="lyd-dyr-emoji">{dyr.emoji}</span>
              <span className="lyd-dyr-navn">{dyr.navn}</span>
            </button>
          );
        })}
      </div>
      {feedback === "feil"   && <div className="lyd-feedback feil">Lytt igjen! 👂</div>}
      {feedback === "riktig" && <div className="lyd-feedback riktig">Riktig! 🎉</div>}
    </div>
  );
}
