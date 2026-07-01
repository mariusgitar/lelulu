import { useState, useMemo, useRef, useEffect } from "react";
import Sky from "../../felles/Sky.jsx";
import { speak, stoppLyd } from "../../felles/speak.js";
import { DINO } from "./data.js";
import "../../felles/sky.css";
import "./Dinodetektiven.css";

const RUNDER = 5;

// Viser bilde hvis det finnes, faller tilbake til stor emoji
function DinoBilde({ dino, stor = false }) {
  const [bildeFeilet, setBildeFeilet] = useState(false);
  if (bildeFeilet || !dino.img) {
    return <span className={stor ? "dino-emoji-stor" : "dino-emoji-liten"}>{dino.emoji}</span>;
  }
  return (
    <img
      src={dino.img}
      alt={dino.navn}
      className={stor ? "dino-img-stor" : "dino-img-liten"}
      onError={() => setBildeFeilet(true)}
    />
  );
}

export default function Dinodetektiven({ onBack }) {
  const [fase, setFase]             = useState("start");
  const [rundeIndex, setRundeIndex] = useState(0);
  const [valgt, setValgt]           = useState(null);
  const [feedback, setFeedback]     = useState(null);
  const [poeng, setPoeng]           = useState(0);
  const [ferdig, setFerdig]         = useState(false);
  const [visFakta, setVisFakta]     = useState(false);
  const introSpilt                  = useRef(false);

  const runder = useMemo(() => {
    const shuffled = [...DINO].sort(() => Math.random() - 0.5).slice(0, RUNDER);
    return shuffled.map((fasit) => {
      const andre = DINO.filter((d) => d.id !== fasit.id)
        .sort(() => Math.random() - 0.5)
        .slice(0, 2);
      return { fasit, alternativer: [fasit, ...andre].sort(() => Math.random() - 0.5) };
    });
  }, []);

  const runde = runder[rundeIndex];

  const lesBæsj = () => {
    if (!runde) return;
    speak(`Hvem bæsjer ${runde.fasit.bæsjBeskrivelse}`);
  };

  useEffect(() => {
    if (fase === "gjett" && !introSpilt.current && runde) {
      introSpilt.current = true;
      setTimeout(lesBæsj, 500);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [runde, fase]);

  useEffect(() => () => stoppLyd(), []);

  const velg = (dino) => {
    if (feedback) return;
    setValgt(dino.id);
    if (dino.id === runde.fasit.id) {
      setFeedback("riktig");
      setPoeng((p) => p + 1);
      speak(`Riktig! Det er ${runde.fasit.navn}! ${runde.fasit.fakta}`);
      setVisFakta(true);
    } else {
      setFeedback("feil");
      speak("Hmm, prøv en annen!");
      setTimeout(() => { setFeedback(null); setValgt(null); }, 1100);
    }
  };

  const neste = () => {
    if (rundeIndex + 1 < RUNDER) {
      setRundeIndex((i) => i + 1);
      setFeedback(null);
      setValgt(null);
      setVisFakta(false);
      introSpilt.current = false;
    } else {
      setFerdig(true);
      speak(poeng >= RUNDER - 1 ? "Du er en ekte dino-ekspert!" : "Bra innsats! Spill igjen og lær mer om dinosaurene!");
    }
  };

  if (ferdig) return (
    <div className="dino-scene">
      <Sky />
      <button className="dino-tilbake" onClick={onBack}>← Hjem</button>
      <div className="dino-ferdig">
        <div className="dino-ferdig-emoji">🦕✨</div>
        <h2>{poeng >= RUNDER - 1 ? "Dino-ekspert!" : "Bra forsøk!"}</h2>
        <p className="dino-poeng-tekst">{poeng} av {RUNDER} riktige</p>
        <button className="dino-btn" onClick={() => window.location.reload()}>Spill igjen</button>
        <button className="dino-btn dino-btn-sek" onClick={onBack}>← Tilbake til Lelulu</button>
      </div>
    </div>
  );

  if (fase === "start") return (
    <div className="dino-scene">
      <Sky />
      <button className="dino-tilbake" onClick={onBack}>← Hjem</button>
      <div className="dino-start">
        <div className="dino-start-emojier">🦕💩🦖</div>
        <h1 className="dino-tittel">Dinodetektiven!</h1>
        <p className="dino-ingress">Hvem bæsjer dette? Gjett hvilken dinosaur bæsjen tilhører!</p>
        <button className="dino-btn" onClick={() => setFase("gjett")}>🔍 Start!</button>
      </div>
    </div>
  );

  if (!runde) return null;

  return (
    <div className="dino-scene">
      <Sky />
      <button className="dino-tilbake" onClick={onBack}>← Hjem</button>

      <div className="dino-fremdrift">
        {Array.from({ length: RUNDER }).map((_, i) => (
          <span key={i} className={"dino-dot" + (i < poeng ? " dino-dot-ok" : "")}>
            {i < poeng ? "🦕" : "❔"}
          </span>
        ))}
      </div>

      <div className="dino-baesj-boks">
        <p className="dino-baesj-label">Hvem bæsjer...</p>
        <div className="dino-baesj-emoji">{runde.fasit.bæsj}</div>
        <p className="dino-baesj-beskrivelse">{runde.fasit.bæsjBeskrivelse}</p>
        <button className="dino-lyd-knapp" onClick={lesBæsj} aria-label="Hør igjen">🔊</button>
      </div>

      <div className="dino-alternativer">
        {runde.alternativer.map((dino) => {
          const erValgt   = valgt === dino.id;
          const visRiktig = feedback === "riktig" && erValgt;
          const visFeil   = feedback === "feil"   && erValgt;
          return (
            <button
              key={dino.id}
              className={"dino-kort" + (visRiktig ? " kort-riktig" : "") + (visFeil ? " kort-feil" : "")}
              style={{ background: dino.farge, borderColor: dino.kant }}
              onClick={() => velg(dino)}
              disabled={!!feedback}
            >
              <DinoBilde dino={dino} />
              <span className="dino-kort-navn">{dino.navn}</span>
            </button>
          );
        })}
      </div>

      {visFakta && (
        <div className="dino-fakta-boks">
          <p>💡 {runde.fasit.fakta}</p>
          <p className="dino-fakta2">🦕 {runde.fasit.fakta2}</p>
          <button className="dino-btn" onClick={neste}>
            {rundeIndex + 1 < RUNDER ? "Neste dino!" : "Se resultatet!"}
          </button>
        </div>
      )}

      {feedback === "feil" && <div className="dino-feedback feil">Prøv igjen! 🔍</div>}
    </div>
  );
}
