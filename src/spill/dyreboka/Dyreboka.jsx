import { useState, useEffect } from "react";
import Sky from "../../felles/Sky.jsx";
import { playAudio, stoppLyd } from "../../felles/speak.js";
import { DYR } from "./data.js";
import "../../felles/sky.css";
import "./Dyreboka.css";

export default function Dyreboka({ onBack }) {
  const [valgt, setValgt] = useState(null);

  useEffect(() => {
    setTimeout(() => playAudio("/lyd/fraser/bok_start.mp3", "Trykk på et dyr for å høre om det!"), 500);
    return () => stoppLyd();
  }, []);

  const apneDyr = async (dyr) => {
    setValgt(dyr);
    // Les navn, deretter alle fakta fra forhåndsgenererte filer
    // Faller tilbake til Web Speech med full tekst
    const fullTekst = `${dyr.navn}. ${dyr.fakta.join(" ")}`;
    await playAudio(`/lyd/dyreboka/${dyr.id}.mp3`, fullTekst);
  };

  const lukk = () => { setValgt(null); stoppLyd(); };

  return (
    <div className="bok-scene">
      <Sky />
      <button className="bok-tilbake" onClick={onBack}>← Hjem</button>
      {!valgt && (
        <>
          <h2 className="bok-tittel">📖 Dyreboka</h2>
          <p className="bok-undertittel">Trykk på et dyr for å høre om det!</p>
          <div className="bok-rutenett">
            {DYR.map((dyr) => (
              <button key={dyr.id} className="bok-kort"
                style={{ background: dyr.farge, borderColor: dyr.kant }}
                onClick={() => apneDyr(dyr)}>
                <span className="bok-emoji">{dyr.emoji}</span>
                <span className="bok-navn">{dyr.navn}</span>
              </button>
            ))}
          </div>
        </>
      )}
      {valgt && (
        <div className="bok-portrett" style={{ background: valgt.farge, borderColor: valgt.kant }}>
          <button className="bok-lukk" onClick={lukk} aria-label="Lukk">✕</button>
          <span className="bok-portrett-emoji">{valgt.emoji}</span>
          <h2 className="bok-portrett-navn">{valgt.navn}</h2>
          <ul className="bok-fakta-liste">
            {valgt.fakta.map((f, i) => <li key={i}>{f}</li>)}
          </ul>
          <button className="bok-hør-igjen" onClick={() => apneDyr(valgt)}>🔊 Hør igjen</button>
        </div>
      )}
    </div>
  );
}
