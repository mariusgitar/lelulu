import { useState, useRef, useEffect } from "react";
import Sky from "../../felles/Sky.jsx";
import { playAudio, unlockAudio, preloadLyder } from "../../felles/speak.js";
import { pling, bumm } from "../../felles/feedback.js";
import { DYR, STEDER } from "./data.js";
import "../../felles/sky.css";
import "./SorterDyrene.css";

preloadLyder([
  "/lyd/fraser/sort_start.mp3",
  "/lyd/fraser/sort_feil.mp3",
  "/lyd/fraser/sort_ferdig.mp3",
  ...DYR.map(d => `/lyd/sorter/${d.id}_${d.sted}.mp3`),
]);

export default function SorterDyrene({ onBack }) {
  const [rekkefolge]    = useState(() => [...DYR].sort(() => Math.random() - 0.5));
  const [aktivIndex, setAktivIndex] = useState(0);
  const [plassert, setPlassert]     = useState({});
  const [dragOverSted, setDragOverSted] = useState(null);
  const [risting, setRisting]       = useState(null);
  const [ferdig, setFerdig]         = useState(false);
  const [holdes, setHoldes]         = useState(false);
  const [pekerPos, setPekerPos]     = useState({ x: 0, y: 0 });
  const dragOffset = useRef({ dx: 0, dy: 0 });
  const dyrRef     = useRef(null);
  const aktivtDyr  = rekkefolge[aktivIndex];

  useEffect(() => {
    setTimeout(async () => {
      await unlockAudio();
      playAudio("/lyd/fraser/sort_start.mp3", "Dra dyret dit det bor!");
    }, 500);
  }, []);

  const fullfor = (dyrId, stedId) => {
    setPlassert((prev) => {
      const neste = { ...prev, [dyrId]: stedId };
      if (Object.keys(neste).length === DYR.length) {
        setTimeout(() => {
          setFerdig(true);
          playAudio("/lyd/fraser/sort_ferdig.mp3", "Bra jobbet! Alle dyrene har funnet hjemmet sitt!");
        }, 600);
      }
      return neste;
    });
  };

  const handleDrop = async (stedId) => {
    if (!aktivtDyr) return;
    if (aktivtDyr.sted === stedId) {
      pling();
      // Bruker forhåndsgenerert fil med riktig dyrenavn og sted
      await playAudio(
        `/lyd/sorter/${aktivtDyr.id}_${stedId}.mp3`,
        `Ja! ${aktivtDyr.navn} bor i ${STEDER.find(s => s.id === stedId).navn.toLowerCase()}et!`
      );
      fullfor(aktivtDyr.id, stedId);
      setTimeout(() => setAktivIndex((i) => i + 1), 700);
    } else {
      bumm();
      setRisting(stedId);
      playAudio("/lyd/fraser/sort_feil.mp3", "Hmm, prøv et annet sted!");
      setTimeout(() => setRisting(null), 450);
    }
    setDragOverSted(null);
  };

  const onPointerDown = (e) => {
    const rect = dyrRef.current.getBoundingClientRect();
    dragOffset.current = { dx: e.clientX - (rect.left + rect.width / 2), dy: e.clientY - (rect.top + rect.height / 2) };
    setPekerPos({ x: e.clientX, y: e.clientY });
    setHoldes(true);
  };

  const onMove = (e) => {
    setPekerPos({ x: e.clientX, y: e.clientY });
    const el = document.elementFromPoint(e.clientX, e.clientY);
    setDragOverSted(el?.closest?.("[data-sted]")?.getAttribute("data-sted") || null);
  };

  const onUp = (e) => {
    setHoldes(false);
    const el = document.elementFromPoint(e.clientX, e.clientY);
    const sted = el?.closest?.("[data-sted]");
    if (sted) handleDrop(sted.getAttribute("data-sted"));
    else setDragOverSted(null);
  };

  useEffect(() => {
    if (!holdes) return;
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    window.addEventListener("pointercancel", onUp);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onUp);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [holdes]);

  if (ferdig) return (
    <div className="sort-scene"><Sky />
      <button className="sort-tilbake" onClick={onBack}>← Hjem</button>
      <div className="sort-ferdig">
        <div className="sort-ferdig-emoji">🏡✨</div>
        <h2>Alle dyrene er hjemme!</h2>
        <button className="sort-btn" onClick={() => window.location.reload()}>Lek igjen</button>
        <button className="sort-btn sort-btn-sek" onClick={onBack}>← Tilbake til Lelulu</button>
      </div>
    </div>
  );

  return (
    <div className="sort-scene"><Sky />
      <button className="sort-tilbake" onClick={onBack}>← Hjem</button>
      <p className="sort-instruks">Dra dyret dit det bor!</p>
      <div className="sort-steder">
        {STEDER.map((sted) => (
          <div key={sted.id} data-sted={sted.id}
            className={"sort-sted" + (dragOverSted === sted.id ? " sted-over" : "") + (risting === sted.id ? " sted-rist" : "")}
            style={{ background: sted.farge, borderColor: sted.kant }}>
            <span className="sort-sted-emoji">{sted.emoji}</span>
            <span className="sort-sted-navn">{sted.navn}</span>
            <div className="sort-sted-dyr">
              {DYR.filter((d) => plassert[d.id] === sted.id).map((d) => <span key={d.id}>{d.emoji}</span>)}
            </div>
          </div>
        ))}
      </div>
      <div className="sort-dra-omrade">
        {aktivtDyr && (
          <div ref={dyrRef}
            className={"sort-drabart" + (holdes ? " sort-holdes" : "")}
            onPointerDown={onPointerDown}
            style={holdes ? { position: "fixed", left: pekerPos.x - dragOffset.current.dx, top: pekerPos.y - dragOffset.current.dy, transform: "translate(-50%,-50%) scale(1.15)", zIndex: 50 } : {}}>
            <span className="sort-dyr-emoji">{aktivtDyr.emoji}</span>
          </div>
        )}
        <p className="sort-dyr-navn">{aktivtDyr?.navn ?? ""}</p>
      </div>
    </div>
  );
}
