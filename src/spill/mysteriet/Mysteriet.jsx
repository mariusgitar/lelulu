import { useState, useMemo, useRef, useEffect } from "react";
import Sky from "../../felles/Sky.jsx";
import { speak } from "../../felles/speak.js";
import { DYR } from "./data.js";
import "../../felles/sky.css";
import "./Mysteriet.css";

const RUNDER = 4;

export default function Mysteriet({ onBack }) {
  const [bevis, setBevis]           = useState([]);
  const [rundeIndex, setRundeIndex] = useState(0);
  const [valgt, setValgt]           = useState(null);
  const [feedback, setFeedback]     = useState(null);
  const [ferdig, setFerdig]         = useState(false);
  const introSpilt                  = useRef(false);

  const runder = useMemo(() => {
    const shuffled = [...DYR].sort(() => Math.random() - 0.5).slice(0, RUNDER);
    return shuffled.map((fasit) => {
      const andre = DYR.filter((d) => d.id !== fasit.id)
        .sort(() => Math.random() - 0.5)
        .slice(0, 2);
      return { fasit, alternativer: [fasit, ...andre].sort(() => Math.random() - 0.5) };
    });
  }, []);

  const runde = runder[rundeIndex];

  const lesSporsmal = () => {
    if (runde) speak(runde.fasit.mysterium);
  };

  useEffect(() => {
    if (!introSpilt.current && runde) {
      introSpilt.current = true;
      setTimeout(lesSporsmal, 500);
    }
  }, [runde]);

  const velg = (dyr) => {
    if (feedback) return;
    setValgt(dyr.id);
    if (dyr.id === runde.fasit.id) {
      setFeedback("riktig");
      speak(`Ja! Det var ${runde.fasit.navn}! ${runde.fasit.brol}`);
      setTimeout(() => {
        setBevis((b) => [...b, runde.fasit]);
        if (rundeIndex + 1 < RUNDER) {
          setRundeIndex((i) => i + 1);
          setValgt(null);
          setFeedback(null);
          introSpilt.current = false;
        } else {
          setFerdig(true);
          speak("Du løste alle mysteriene! Du er en ekte dyredetektiv!");
        }
      }, 1800);
    } else {
      setFeedback("feil");
      speak("Hmm, prøv igjen, lille detektiv!");
      setTimeout(() => { setFeedback(null); setValgt(null); }, 1100);
    }
  };

  if (ferdig) return (
    <div className="myst-scene">
      <Sky />
      <button className="myst-tilbake" onClick={onBack}>← Hjem</button>
      <div className="myst-ferdig">
        <div className="myst-ferdig-emoji">🕵️‍♂️✨</div>
        <h2>Saken er løst!</h2>
        <p>Du fant alle dyrene i mysteriet.</p>
        <div className="myst-bevis-rekke">
          {bevis.map((d) => <span key={d.id} className="myst-bevis-emoji">{d.emoji}</span>)}
        </div>
        <button className="myst-btn" onClick={() => window.location.reload()}>Spill igjen</button>
        <button className="myst-btn myst-btn-sek" onClick={onBack}>← Tilbake til Lelulu</button>
      </div>
    </div>
  );

  if (!runde) return null;

  return (
    <div className="myst-scene">
      <Sky />
      <button className="myst-tilbake" onClick={onBack}>← Hjem</button>

      <div className="myst-bevistavle" role="status">
        {Array.from({ length: RUNDER }).map((_, i) => (
          <div key={i} className={"myst-rute" + (i < bevis.length ? " myst-fylt" : "")}>
            {i < bevis.length ? bevis[i].emoji : "❔"}
          </div>
        ))}
      </div>

      <div className="myst-sporsmal">
        <button className="myst-lyd" onClick={lesSporsmal} aria-label="Hør igjen">🔊</button>
        <p>{runde.fasit.mysterium}</p>
      </div>

      <div className="myst-alternativer">
        {runde.alternativer.map((dyr) => {
          const erValgt   = valgt === dyr.id;
          const visRiktig = feedback === "riktig" && erValgt;
          const visFeil   = feedback === "feil"   && erValgt;
          return (
            <button
              key={dyr.id}
              className={"myst-kort" + (visRiktig ? " kort-riktig" : "") + (visFeil ? " kort-feil" : "")}
              style={{ background: dyr.farge, borderColor: dyr.kant }}
              onClick={() => velg(dyr)}
              disabled={!!feedback}
            >
              <span className="myst-dyr-emoji">{dyr.emoji}</span>
              <span className="myst-dyr-navn">{dyr.navn}</span>
            </button>
          );
        })}
      </div>

      {feedback === "feil"   && <div className="myst-feedback feil">Prøv igjen! 🔍</div>}
      {feedback === "riktig" && <div className="myst-feedback riktig">Riktig! {runde.fasit.brol} 🎉</div>}
    </div>
  );
}
