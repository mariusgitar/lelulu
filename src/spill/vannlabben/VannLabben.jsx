import { useState, useEffect, useRef, useMemo } from "react";
import Sky from "../../felles/Sky.jsx";
import { speak } from "../../felles/speak.js";
import { TING, OPPGAVER } from "./ting.js";
import "../../felles/sky.css";
import "./VannLabben.css";

function lagStartStatus(ting) {
  return Object.fromEntries(ting.map((t) => [t.id, "venter"]));
}

export default function VannLabben({ onBack }) {
  const ting = useMemo(() => [...TING].sort(() => Math.random() - 0.5), []);
  const [oppgaveIdx, setOppgaveIdx]     = useState(0);
  const [status, setStatus]             = useState(() => lagStartStatus(ting));
  const [pos, setPos]                   = useState({});
  const [aktivId, setAktivId]           = useState(null);
  const [pekerPos, setPekerPos]         = useState({ x: 0, y: 0 });
  const [overVann, setOverVann]         = useState(false);
  const [forklaring, setForklaring]     = useState(null);
  const [heltFerdig, setHeltFerdig]     = useState(false);
  const [rundeOverlay, setRundeOverlay] = useState(false);
  const [bassengTommes, setBassengTommes] = useState(false);

  const dragOffset = useRef({ dx: 0, dy: 0 });
  const elRefs     = useRef({});
  const introRef   = useRef(-1);
  const bassengRef = useRef(null);

  const erOverBasseng = (clientX, clientY) => {
    if (!bassengRef.current) return false;
    const rect = bassengRef.current.getBoundingClientRect();
    // Utvidet fangst-sone: 80px over toppen, 30px på sidene
    return (
      clientX >= rect.left - 30 &&
      clientX <= rect.right + 30 &&
      clientY >= rect.top - 80 &&
      clientY <= rect.bottom + 20
    );
  };

  const oppgave = OPPGAVER[oppgaveIdx];
  const riktige = ting.filter((t) => t.type === oppgave && status[t.id]?.startsWith("i-vann")).length;
  const total   = ting.filter((t) => t.type === oppgave).length;

  useEffect(() => {
    if (introRef.current !== oppgaveIdx) {
      introRef.current = oppgaveIdx;
      setTimeout(() => speak(
        oppgave === "flyter"
          ? "Dra alle tingene som flyter, opp i bassenget!"
          : "Nå: dra alle tingene som synker, ned i bassenget!"
      ), 500);
    }
  }, [oppgaveIdx, oppgave]);

  const onDown = (id) => (e) => {
    if (status[id] !== "venter") return;
    const r = elRefs.current[id].getBoundingClientRect();
    dragOffset.current = {
      dx: e.clientX - (r.left + r.width / 2),
      dy: e.clientY - (r.top + r.height / 2),
    };
    setPekerPos({ x: e.clientX, y: e.clientY });
    setAktivId(id);
  };

  const onMove = (e) => {
    setPekerPos({ x: e.clientX, y: e.clientY });
    setOverVann(erOverBasseng(e.clientX, e.clientY));
  };

  const onUp = (e) => {
    if (!aktivId) return;
    const t = ting.find((x) => x.id === aktivId);
    const iVann = erOverBasseng(e.clientX, e.clientY);

    if (iVann) {
      const alleredeAv = ting.filter((x) => status[x.id]?.startsWith("i-vann") && x.type === t.type).length;
      const sone = alleredeAv;
      const bw = 100 / 3;
      setPos((p) => ({
        ...p,
        [aktivId]: {
          x: sone * bw + bw * 0.25 + Math.random() * bw * 0.5,
          y: t.type === "flyter" ? 10 + Math.random() * 8 : 78 + Math.random() * 10,
        },
      }));
      setStatus((s) => ({ ...s, [aktivId]: t.type === "flyter" ? "i-vann-flyter" : "i-vann-synker" }));
      setForklaring(t);
      speak(
        t.type === oppgave
          ? (t.type === "flyter" ? "Riktig, den flyter!" : "Riktig, den synker!")
          : (t.type === "flyter"
              ? "Se, den flyter faktisk! Men vi leter etter de som synker."
              : "Se, den synker faktisk! Men vi leter etter de som flyter.")
      );
    }
    setAktivId(null);
    setOverVann(false);
  };

  useEffect(() => {
    if (!aktivId) return;
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    window.addEventListener("pointercancel", onUp);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onUp);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [aktivId]);

  useEffect(() => {
    if (riktige > 0 && riktige === total && !rundeOverlay && !heltFerdig) {
      setRundeOverlay(true);
      speak(
        oppgaveIdx + 1 < OPPGAVER.length
          ? "Bra jobbet! Nå tester vi noe nytt."
          : "Du har testet alt! Du er en ekte vann-forsker!"
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [riktige]);

  const nesteOppgave = () => {
    if (oppgaveIdx + 1 < OPPGAVER.length) {
      setBassengTommes(true);
      setTimeout(() => {
        setStatus(lagStartStatus(ting));
        setPos({});
        setForklaring(null);
        setOppgaveIdx((i) => i + 1);
        setRundeOverlay(false);
        setBassengTommes(false);
      }, 700);
    } else {
      setHeltFerdig(true);
    }
  };

  if (heltFerdig) {
    return (
      <div className="vl-scene">
        <Sky />
        <div className="vl-ferdig">
          <div className="vl-ferdig-emoji">🔬💧</div>
          <h2>Vann-forsker ferdig!</h2>
          <p>Du testet både flyt og synk!</p>
          <button className="vl-btn" onClick={() => window.location.reload()}>Test igjen</button>
          <button className="vl-btn vl-btn-sekundar" onClick={onBack}>← Tilbake til Lelulu</button>
        </div>
      </div>
    );
  }

  return (
    <div className="vl-scene">
      <button className="vl-tilbake" onClick={onBack}>← Hjem</button>

      <div className="vl-oppgave-merker">
        {OPPGAVER.map((o, i) => (
          <span
            key={o}
            className={"vl-prikk" + (i === oppgaveIdx ? " aktiv" : "") + (i < oppgaveIdx ? " ferdig" : "")}
          >
            {o === "flyter" ? "🟢" : "🔵"}
          </span>
        ))}
      </div>

      <p className="vl-instruks">
        Finn alt som {oppgave === "flyter" ? "flyter 🟢" : "synker 🔵"}
      </p>
      <div className="vl-fremdrift">{riktige} / {total} funnet</div>

      <div ref={bassengRef} className={"vl-basseng" + (overVann ? " basseng-klar" : "")} data-vann="true">
        <div className="vl-overflate" />
        {ting.map((t) => {
          if (!status[t.id]?.startsWith("i-vann")) return null;
          const p = pos[t.id] || { x: 50, y: 50 };
          return (
            <span
              key={t.id}
              className={"vl-obj" + (t.type === "flyter" ? " obj-flyter" : " obj-synker") + (bassengTommes ? " tommes" : "")}
              style={{
                left: `${p.x}%`,
                ...(t.type === "flyter" ? { top: `${p.y}%` } : { "--bunn-y": `${p.y}%` }),
              }}
            >
              {t.emoji}
            </span>
          );
        })}

        {rundeOverlay && (
          <div className="vl-overlay">
            <div className="vl-overlay-kort">
              <p>{oppgaveIdx + 1 < OPPGAVER.length ? "Bra jobbet! 🎉" : "Alt testet! 🎉"}</p>
              <button className="vl-btn vl-btn-liten" onClick={nesteOppgave}>
                {oppgaveIdx + 1 < OPPGAVER.length ? "Neste oppgave" : "Se resultatet"}
              </button>
            </div>
          </div>
        )}
      </div>

      {forklaring && !rundeOverlay && (
        <p className="vl-forklaring">{forklaring.forklaring}</p>
      )}

      <div className="vl-ting-rad">
        {ting.map((t) => {
          if (status[t.id] !== "venter") return null;
          const aktiv = aktivId === t.id;
          return (
            <div
              key={t.id}
              ref={(el) => (elRefs.current[t.id] = el)}
              className={"vl-ting" + (aktiv ? " holdes" : "")}
              onPointerDown={onDown(t.id)}
              style={
                aktiv
                  ? {
                      position: "fixed",
                      left: pekerPos.x - dragOffset.current.dx,
                      top: pekerPos.y - dragOffset.current.dy,
                      transform: "translate(-50%, -50%) scale(1.15)",
                      zIndex: 50,
                    }
                  : {}
              }
            >
              <span className="vl-ting-emoji">{t.emoji}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
