import { useState, useRef, useEffect } from "react";
import Sky from "../../felles/Sky.jsx";
import { playAudio, stoppLyd, unlockAudio } from "../../felles/speak.js";
import { DYR } from "./data.js";
import "../../felles/sky.css";
import "./Dyreminne.css";

function sleep(ms) { return new Promise((r) => setTimeout(r, ms)); }

export default function Dyreminne({ onBack }) {
  const [sekvens, setSekvens]       = useState([]);
  const [status, setStatus]         = useState("klar");
  const [aktivLys, setAktivLys]     = useState(null);
  const [inputListe, setInputListe] = useState([]);
  const [runde, setRunde]           = useState(0);
  const [highscore, setHighscore]   = useState(0);
  const sekvensRef = useRef([]);
  const stopRef    = useRef(false);

  useEffect(() => {
    // Bug 5: intro-talen her er før brukerinteraksjon, bruk bare speak (Web Speech er ok for intro)
    // playAudio vil blokkeres av autoplay uansett her
    setTimeout(() => playAudio("/lyd/fraser/min_start.mp3", "Husk rekkefølgen på dyrelydene!"), 500);
    return () => { stopRef.current = true; stoppLyd(); };
  }, []);

  const startSpill = async () => {
    // Bug 5 fix: unlock her, rett etter bruker-klikk
    await unlockAudio();
    stopRef.current = false;
    setSekvens([]);
    setInputListe([]);
    setRunde(0);
    setStatus("klar");
    await sleep(300);
    await leggTilOgSpill([]);
  };

  const leggTilOgSpill = async (gammel) => {
    const nytt = DYR[Math.floor(Math.random() * DYR.length)];
    const ny   = [...gammel, nytt];
    sekvensRef.current = ny;
    setSekvens(ny);
    setInputListe([]);
    setRunde(ny.length);
    await spillSekvens(ny);
  };

  const spillSekvens = async (seq) => {
    setStatus("spiller");
    await sleep(800);
    for (const dyr of seq) {
      if (stopRef.current) return;
      setAktivLys(dyr.id);
      await playAudio(dyr.src, dyr.lyd);
      await sleep(300);
      setAktivLys(null);
      await sleep(600);
    }
    if (!stopRef.current) setStatus("venter");
  };

  const trykkDyr = async (dyr) => {
    if (status !== "venter") return;
    setAktivLys(dyr.id);
    // Ikke await her — skal bare gi umiddelbar feedback mens input registreres
    playAudio(dyr.src, dyr.lyd);
    setTimeout(() => setAktivLys(null), 300);

    const ny     = [...inputListe, dyr.id];
    const indeks = ny.length - 1;

    if (sekvensRef.current[indeks].id !== dyr.id) {
      setStatus("feil");
      if (runde > highscore) setHighscore(runde);
      await sleep(400);
      await playAudio("/lyd/fraser/min_feil.mp3", "Oi! Vi prøver igjen fra start.");
      setTimeout(() => startSpill(), 1200);
      return;
    }

    setInputListe(ny);

    if (ny.length === sekvensRef.current.length) {
      setStatus("riktig");
      await sleep(1000);
      await playAudio("/lyd/fraser/min_riktig.mp3", "Bra husket! Neste runde!");
      await sleep(500);
      if (!stopRef.current) leggTilOgSpill(sekvensRef.current);
    }
  };

  return (
    <div className="min-scene"><Sky />
      <button className="min-tilbake" onClick={onBack}>← Hjem</button>
      <p className="min-instruks">
        {status === "klar"    && "Husk rekkefølgen på dyrelydene!"}
        {status === "spiller" && "Lytt nøye... 👂"}
        {status === "venter"  && "Din tur! Trykk i samme rekkefølge."}
        {status === "feil"    && "Oi då! Vi prøver igjen. 🔁"}
        {status === "riktig"  && "Riktig! 🎉"}
      </p>
      {runde > 0 && (
        <div className="min-runde">
          Runde {runde}
          {highscore > 0 && <span className="min-rekord"> · Rekord: {highscore}</span>}
        </div>
      )}
      <div className="min-rutenett">
        {DYR.map((dyr) => (
          <button key={dyr.id}
            className={"min-dyr" + (aktivLys === dyr.id ? " min-aktiv" : "")}
            style={{ background: dyr.farge }}
            onClick={() => trykkDyr(dyr)}
            disabled={status !== "venter"}>
            <span className="min-emoji">{dyr.emoji}</span>
          </button>
        ))}
      </div>
      {status === "klar" && runde === 0 && (
        <button className="min-btn" onClick={startSpill}>Start</button>
      )}
    </div>
  );
}
