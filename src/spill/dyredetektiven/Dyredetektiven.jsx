import { useState, useEffect, useRef } from "react";
import { speak, stoppLyd, playAudio, playSekvens, unlockAudio } from "../../felles/speak.js";
import { DYR } from "./dyr.js";
import "./Dyredetektiven.css";

const RUNDER = 5;
const IDLE_MS = 8000;

// Filstier
const f = {
  fraser: (navn) => ({ src: `/lyd/fraser/${navn}.mp3`, fallback: "" }),
  sporsmal: (slug, navn) => ({ src: `/lyd/dyr/${slug}_sporsmal.mp3`, fallback: `Hvor gammel kan en ${navn.toLowerCase()} omtrent bli?` }),
  tall: (n) => ({ src: `/lyd/tall/${n}.mp3`, fallback: `${n} år` }),
  fakta: (slug, tekst) => ({ src: `/lyd/fakta/${slug}.mp3`, fallback: tekst }),
};

const RESPONS_RIKTIG = ["respons_riktig_1", "respons_riktig_2", "respons_riktig_3"];

function lagAlternativer(fasit) {
  const kand = new Set();
  for (const x of [0.3, 0.5, 0.7, 1.4, 2.0, 2.8, 0.2, 1.8])
    kand.add(Math.max(1, Math.round(fasit * x)));
  for (const d of [-8, -5, -3, 3, 5, 8, 12, 20, 40, -12])
    kand.add(Math.max(1, fasit + d));
  const sh = [...kand].filter((v) => v !== fasit).sort(() => Math.random() - 0.5);
  return [fasit, sh[0], sh[1]].sort(() => Math.random() - 0.5);
}

function kalkulerPoeng(valgt, fasit, alt) {
  if (valgt === fasit) return 3;
  const gale = alt.filter((a) => a !== fasit);
  const diff = Math.abs(valgt - fasit);
  const annen = Math.abs((gale.find((g) => g !== valgt) ?? fasit) - fasit);
  return diff < annen ? 2 : 1;
}

export default function Dyredetektiven({ onBack }) {
  const [fase, setFase]             = useState("start");
  const [indeks, setIndeks]         = useState(0);
  const [rekkefolge, setRekkefolge] = useState([]);
  const [valgt, setValgt]           = useState(null);
  const [alternativer, setAlternativer] = useState([]);
  const [opplestIndeks, setOpplestIndeks] = useState(-1);
  const [poeng, setPoeng]           = useState(0);
  const [sistePoeng, setSistePoeng] = useState(0);
  const [nedtelling, setNedtelling] = useState(null);

  const idleRef  = useRef(null);
  const autoRef  = useRef(null);
  const faseRef  = useRef(fase);
  const valgtRef = useRef(valgt);
  const dyrRef   = useRef(null);
  const altRef   = useRef([]);
  const signalRef = useRef({ avbrutt: false });

  useEffect(() => { faseRef.current = fase; }, [fase]);
  useEffect(() => { valgtRef.current = valgt; }, [valgt]);

  const clearIdle = () => clearTimeout(idleRef.current);

  const nyttSignal = () => {
    signalRef.current.avbrutt = true;
    stoppLyd();
    const s = { avbrutt: false };
    signalRef.current = s;
    return s;
  };

  const spillSporsmalOgAlternativer = async (dyr, alt, signal) => {
    await playAudio(
      `/lyd/dyr/${dyr.slug}_sporsmal.mp3`,
      `Hvor gammel kan en ${dyr.navn.toLowerCase()} omtrent bli?`
    );
    if (signal.avbrutt) return;
    await playSekvens(
      alt.map((v, i) => ({ src: `/lyd/tall/${v}.mp3`, fallback: `${v} år` })),
      {
        pauseMs: 400,
        signal,
        onStart: (i) => setOpplestIndeks(i),
      }
    );
    if (!signal.avbrutt) {
      setOpplestIndeks(-1);
      startIdle();
    }
  };

  const startIdle = () => {
    clearIdle();
    idleRef.current = setTimeout(async () => {
      if (faseRef.current === "start") {
        await playAudio("/lyd/fraser/idle_start.mp3", "Trykk på den gule knappen for å starte!");
      } else if (faseRef.current === "gjett" && valgtRef.current === null && dyrRef.current) {
        const signal = nyttSignal();
        await spillSporsmalOgAlternativer(dyrRef.current, altRef.current, signal);
      }
    }, IDLE_MS);
  };

  useEffect(() => {
    const init = async () => {
      await new Promise((r) => setTimeout(r, 600));
      const signal = nyttSignal();
      await playAudio("/lyd/fraser/velkomst.mp3",
        "Hei! Jeg heter Dyredetektiven. Hvor gammel kan dyrene omtrent bli? Trykk på den gule knappen for å starte!");
      if (!signal.avbrutt) startIdle();
    };
    init();
    return () => { nyttSignal(); clearIdle(); clearInterval(autoRef.current); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const gjeldende = rekkefolge[indeks];
  useEffect(() => { dyrRef.current = gjeldende || null; }, [gjeldende]);
  useEffect(() => { altRef.current = alternativer; }, [alternativer]);

  async function startSpill() {
    await unlockAudio();
    clearIdle();
    nyttSignal();
    const sh = [...DYR].sort(() => Math.random() - 0.5).slice(0, RUNDER);
    setRekkefolge(sh);
    setIndeks(0);
    setPoeng(0);
    setValgt(null);
    setSistePoeng(0);
    setFase("gjett");
    initRunde(sh, 0);
  }

  function initRunde(liste, idx) {
    const alt = lagAlternativer(liste[idx].maxAlder);
    setAlternativer(alt);
    setValgt(null);
    setOpplestIndeks(-1);
    altRef.current = alt;
    dyrRef.current = liste[idx];
    setTimeout(async () => {
      const signal = nyttSignal();
      await spillSporsmalOgAlternativer(liste[idx], alt, signal);
    }, 400);
  }

  async function velgSvar(val) {
    if (valgt !== null) return;
    clearIdle();
    clearInterval(autoRef.current);
    const signal = nyttSignal();
    setOpplestIndeks(-1);
    const p = kalkulerPoeng(val, gjeldende.maxAlder, alternativer);
    setValgt(val);
    setSistePoeng(p);
    setPoeng((prev) => prev + p);
    const riktig = val === gjeldende.maxAlder;
    const respNavn = riktig
      ? RESPONS_RIKTIG[Math.floor(Math.random() * 3)]
      : p === 2 ? "respons_naer" : "respons_feil";
    const respFallback = riktig
      ? ["Ja, det stemmer!", "Bra gjetta!", "Helt riktig!"][RESPONS_RIKTIG.indexOf(respNavn)]
      : p === 2 ? "Nesten! Du var ganske nær!" : "Ikke helt, men du prøvde!";

    await playSekvens([
      { src: `/lyd/fraser/${respNavn}.mp3`, fallback: respFallback },
      { src: `/lyd/tall/${gjeldende.maxAlder}.mp3`, fallback: `${gjeldende.maxAlder} år` },
      { src: `/lyd/fraser/visste_du_at.mp3`, fallback: "Visste du at..." },
      { src: `/lyd/fakta/${gjeldende.slug}.mp3`, fallback: gjeldende.fakta },
    ], { pauseMs: 250, signal });

    if (signal.avbrutt) return;
    let t = 3;
    setNedtelling(t);
    autoRef.current = setInterval(() => {
      t -= 1;
      if (t <= 0) { clearInterval(autoRef.current); setNedtelling(null); neste(p); }
      else setNedtelling(t);
    }, 1000);
  }

  function neste(ekstra = 0) {
    clearIdle();
    clearInterval(autoRef.current);
    setNedtelling(null);
    nyttSignal();
    if (indeks + 1 >= RUNDER) {
      setFase("ferdig");
      const tot = poeng + ekstra;
      const maks = RUNDER * 3;
      const pst = tot / maks;
      const slug = pst === 1 ? "slutt_perfekt" : pst >= 0.7 ? "slutt_bra" : pst >= 0.4 ? "slutt_ok" : "slutt_prov";
      const fallback = pst === 1 ? "Du er en ekte dyreekspert!" : pst >= 0.7 ? "Du kan mye om dyr!" : "Spill igjen og lær enda mer!";
      setTimeout(() => playAudio(`/lyd/fraser/${slug}.mp3`, fallback), 400);
    } else {
      const ny = indeks + 1;
      setIndeks(ny);
      initRunde(rekkefolge, ny);
    }
  }

  const maks = RUNDER * 3;

  return (
    <div className="dd-scene">
      <button className="dd-tilbake" onClick={onBack}>← Hjem</button>

      {fase === "start" && (
        <div className="dd-start">
          <div className="dd-pote">🐾</div>
          <h1 className="dd-tittel">Dyredetektiven!</h1>
          <p className="dd-ingress">Hvor gammel kan dyrene omtrent bli?<br />Trykk på riktig svar!</p>
          <button className="dd-btn" onClick={startSpill}>🎮 Start spillet!</button>
        </div>
      )}

      {fase === "gjett" && gjeldende && (
        <div className="dd-gjett">
          <div className="dd-progress">
            <div className="dd-progress-bar">
              <div className="dd-progress-fill" style={{ width: `${(indeks / RUNDER) * 100}%` }} />
            </div>
            <span className="dd-poeng-label">{poeng} p</span>
          </div>
          <div className="dd-dyr-emoji">{gjeldende.emoji}</div>
          <h2 className="dd-dyr-navn">{gjeldende.navn}</h2>
          <p className="dd-sporsmal">Hvor gammel kan en {gjeldende.navn.toLowerCase()} omtrent bli?</p>
          <div className="dd-svar-liste">
            {alternativer.map((alt, i) => {
              const erValgt = valgt === alt;
              const erRiktig = alt === gjeldende.maxAlder;
              const lesNa = opplestIndeks === i;
              let bg = "rgba(255,255,255,0.07)";
              let border = "2px solid rgba(255,255,255,0.12)";
              let farge = "white";
              if (lesNa && !valgt) { bg = "rgba(255,215,0,0.2)"; border = "2px solid #ffd700"; }
              if (valgt !== null) {
                if (erRiktig)     { bg = "#22c55e"; border = "2px solid #16a34a"; }
                else if (erValgt) { bg = "#ef4444"; border = "2px solid #dc2626"; }
                else              { bg = "rgba(255,255,255,0.03)"; border = "2px solid transparent"; farge = "#555"; }
              }
              return (
                <button key={alt} className="dd-svar-knapp"
                  style={{ background: bg, border, cursor: valgt !== null ? "default" : "pointer" }}
                  onClick={() => velgSvar(alt)}>
                  <span className="dd-svar-tall" style={{ color: farge }}>{alt}</span>
                  <span className="dd-svar-enhet" style={{ color: valgt && !erRiktig && !erValgt ? "#444" : "#aaa" }}>år</span>
                </button>
              );
            })}
          </div>
          {valgt !== null && (
            <div className="dd-fakta">
              <PoengBadge poeng={sistePoeng} />
              <p className="dd-faktaboks">💡 Visste du at... {gjeldende.fakta}</p>
              <button className="dd-btn" onClick={() => neste(0)}>
                {indeks + 1 >= RUNDER ? "🏆 Se resultatet!" :
                 nedtelling !== null ? `➡️ Neste dyr... (${nedtelling})` : "➡️ Neste dyr!"}
              </button>
            </div>
          )}
          {valgt === null && (
            <button className="dd-stopp" onClick={async () => {
              clearIdle();
              const signal = nyttSignal();
              setOpplestIndeks(-1);
              await spillSporsmalOgAlternativer(gjeldende, alternativer, signal);
            }}>🔊 Les opp igjen</button>
          )}
        </div>
      )}

      {fase === "ferdig" && (
        <div className="dd-ferdig">
          <div className="dd-trophy">{poeng === maks ? "🏆" : poeng >= maks * 0.7 ? "🎉" : "💪"}</div>
          <h2 className="dd-tittel">{poeng === maks ? "Perfekt!" : poeng >= maks * 0.7 ? "Bra jobba!" : "Godt forsøk!"}</h2>
          <div className="dd-poeng-boks">
            <div className="dd-poeng-stor">{poeng}</div>
            <div className="dd-poeng-sub">av {maks} poeng</div>
          </div>
          <p className="dd-sluttekst">
            {poeng === maks ? "Du er en ekte dyreekspert! 🌟" :
             poeng >= maks * 0.7 ? "Du kan mye om dyr! 🦁" :
             poeng >= maks * 0.4 ? "Bra innsats! Spill igjen 🐧" : "Spill igjen og lær masse! 🐾"}
          </p>
          <button className="dd-btn" onClick={startSpill}>🔄 Spill igjen!</button>
          <button className="dd-btn dd-btn-sekundar" onClick={onBack}>← Tilbake til Lelulu</button>
        </div>
      )}
    </div>
  );
}

function PoengBadge({ poeng }) {
  const cfg = {
    3: { emoji: "⭐⭐⭐", tekst: "Perfekt!",   farge: "#ffd700", bg: "rgba(255,215,0,0.15)" },
    2: { emoji: "⭐⭐",   tekst: "Nesten!",    farge: "#fb923c", bg: "rgba(251,146,60,0.15)" },
    1: { emoji: "⭐",     tekst: "Du prøvde!", farge: "#94a3b8", bg: "rgba(148,163,184,0.15)" },
  };
  const c = cfg[poeng];
  return (
    <div className="dd-badge" style={{ background: c.bg, border: `2px solid ${c.farge}` }}>
      <span className="dd-badge-emoji">{c.emoji}</span>
      <span className="dd-badge-tekst" style={{ color: c.farge }}>+{poeng} poeng — {c.tekst}</span>
    </div>
  );
}
