import { useState } from "react";
import Sky from "../felles/Sky.jsx";
import "../felles/sky.css";

const GRONN = "#1f5c4a";
const GUL   = "#f0c14b";
export const PARENT_PIN = "1234";

const ALLE_SPILL = [
  { id: "dyredetektiven",  emoji: "🕵️", navn: "Dyredetektiven",  sub: "Hvor gammel blir dyr?" },
  { id: "dinodetektiven",  emoji: "🦕", navn: "Dinodetektiven",  sub: "Hvem bæsjet dette?" },
  { id: "vannlabben",      emoji: "🔬", navn: "Vann-labben",     sub: "Flyter eller synker?" },
  { id: "lyddetektiven",   emoji: "🎧", navn: "Lyddetektiven",   sub: "Hvem lager lyden?" },
  { id: "silhuett",        emoji: "🔦", navn: "Skyggegjetting",  sub: "Hvem gjemmer seg?" },
  { id: "finnforskjellen", emoji: "🔍", navn: "Finn forskjellen",sub: "Hva er annerledes?" },
  { id: "dyreboka",        emoji: "📖", navn: "Dyreboka",        sub: "Lær om dyrene!" },
  { id: "sorter",          emoji: "🌊", navn: "Sorter dyrene",   sub: "Vann, land eller luft?" },
  { id: "dyreminne",       emoji: "🎵", navn: "Dyreminne",       sub: "Husk rekkefølgen!" },
];

function loadAktiverte() {
  try {
    const lagret = localStorage.getItem("ll_aktiverte");
    return lagret ? JSON.parse(lagret) : Object.fromEntries(ALLE_SPILL.map(s => [s.id, true]));
  } catch { return Object.fromEntries(ALLE_SPILL.map(s => [s.id, true])); }
}

export function saveAktiverte(aktiverte) {
  try { localStorage.setItem("ll_aktiverte", JSON.stringify(aktiverte)); } catch {}
}

// ── PIN-inngang ────────────────────────────────────────────────────
function PinSkjerm({ onSuccess, onAvbryt }) {
  const [input, setInput] = useState("");
  const [feil, setFeil] = useState(false);

  const trykk = (siffer) => {
    if (input.length >= 4) return;
    const ny = input + siffer;
    setInput(ny);
    setFeil(false);
    if (ny.length === 4) {
      setTimeout(() => {
        if (ny === PARENT_PIN) { onSuccess(); }
        else { setFeil(true); setInput(""); }
      }, 200);
    }
  };

  const slett = () => { setInput(input.slice(0, -1)); setFeil(false); };

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 200,
      background: "linear-gradient(180deg, #aee3f5 0%, #d7f0e0 55%, #eaf8ec 100%)",
      fontFamily: "'Nunito', system-ui, sans-serif",
      display: "flex", alignItems: "center", justifyContent: "center", padding: 20,
    }}>
      <div style={{
        background: "rgba(255,255,255,0.92)", borderRadius: 28, padding: "32px 28px",
        maxWidth: 320, width: "100%", textAlign: "center",
        boxShadow: "0 20px 60px rgba(0,0,0,0.12)",
      }}>
        <div style={{ fontSize: "2.4rem", marginBottom: 10 }}>🔐</div>
        <h2 style={{ fontSize: "1.1rem", fontWeight: 900, color: GRONN, margin: "0 0 4px" }}>
          Foreldretilgang
        </h2>
        <p style={{ fontSize: "0.78rem", fontWeight: 600, color: "#5a8a7a", margin: "0 0 22px" }}>
          Tast inn PIN-koden
        </p>

        <div style={{ display: "flex", gap: 12, justifyContent: "center", marginBottom: 24 }}>
          {[0,1,2,3].map(i => (
            <div key={i} style={{
              width: 16, height: 16, borderRadius: "50%",
              border: `2px solid ${feil ? "#e04444" : "#9bc4b6"}`,
              background: i < input.length ? (feil ? "#e04444" : GRONN) : "white",
              transition: "background 0.15s, border-color 0.15s",
            }} />
          ))}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10, marginBottom: 8 }}>
          {[1,2,3,4,5,6,7,8,9].map(n => (
            <button key={n} onClick={() => trykk(String(n))} style={{
              background: "white", border: `2px solid #d0e8d8`, borderRadius: 14,
              padding: "14px", fontSize: "1.2rem", fontWeight: 900, color: GRONN,
              cursor: "pointer", fontFamily: "inherit",
              transition: "transform 0.1s",
            }}
            onPointerDown={e => e.currentTarget.style.transform = "scale(0.92)"}
            onPointerUp={e => e.currentTarget.style.transform = "scale(1)"}
            >{n}</button>
          ))}
          <button onClick={onAvbryt} style={{
            background: "white", border: "2px solid #d0e8d8", borderRadius: 14,
            padding: "14px", fontSize: "1rem", fontWeight: 800, color: "#888",
            cursor: "pointer", fontFamily: "inherit",
          }}>✕</button>
          <button onClick={() => trykk("0")} style={{
            background: "white", border: "2px solid #d0e8d8", borderRadius: 14,
            padding: "14px", fontSize: "1.2rem", fontWeight: 900, color: GRONN,
            cursor: "pointer", fontFamily: "inherit",
          }}>0</button>
          <button onClick={slett} style={{
            background: "white", border: "2px solid #d0e8d8", borderRadius: 14,
            padding: "14px", fontSize: "1rem", fontWeight: 800, color: "#888",
            cursor: "pointer", fontFamily: "inherit",
          }}>⌫</button>
        </div>

        {feil && (
          <div style={{ color: "#b03a3a", fontSize: "0.8rem", fontWeight: 700, marginTop: 6 }}>
            Feil PIN. Prøv igjen.
          </div>
        )}
      </div>
    </div>
  );
}

// ── Admin-panel ────────────────────────────────────────────────────
function AdminPanel({ onLukk }) {
  const [aktiverte, setAktiverte] = useState(loadAktiverte);

  const toggle = (id) => {
    const ny = { ...aktiverte, [id]: !aktiverte[id] };
    setAktiverte(ny);
    saveAktiverte(ny);
  };

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 200,
      background: "linear-gradient(180deg, #aee3f5 0%, #d7f0e0 55%, #eaf8ec 100%)",
      fontFamily: "'Nunito', system-ui, sans-serif",
      overflowY: "auto",
    }}>
      <Sky />

      <div style={{
        position: "relative", zIndex: 1,
        maxWidth: 480, margin: "0 auto", padding: "16px 16px 48px",
      }}>

        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 14, marginBottom: 20 }}>
          <h1 style={{ fontSize: "1.15rem", fontWeight: 900, color: GRONN, margin: 0 }}>
            🔧 Foreldreinnstillinger
          </h1>
          <button onClick={onLukk} style={{
            background: "rgba(255,255,255,0.85)", border: "none", borderRadius: 99,
            padding: "8px 16px", fontSize: "0.85rem", fontWeight: 800,
            color: GRONN, cursor: "pointer", fontFamily: "inherit",
          }}>← Lukk</button>
        </div>

        {/* Spill-liste */}
        <div style={{ fontSize: "0.72rem", fontWeight: 800, color: "#3a6b5a", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 10 }}>
          Aktive spill
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 28 }}>
          {ALLE_SPILL.map(s => {
            const paa = aktiverte[s.id] !== false;
            return (
              <div key={s.id} style={{
                background: "rgba(255,255,255,0.88)", borderRadius: 18,
                padding: "12px 16px", display: "flex", alignItems: "center", gap: 12,
              }}>
                <span style={{ fontSize: "1.5rem" }}>{s.emoji}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: "0.92rem", fontWeight: 800, color: GRONN }}>{s.navn}</div>
                  <div style={{ fontSize: "0.72rem", color: "#5a8a7a", fontWeight: 600 }}>{s.sub}</div>
                </div>
                <button
                  onClick={() => toggle(s.id)}
                  aria-label={`${paa ? "Deaktiver" : "Aktiver"} ${s.navn}`}
                  style={{
                    width: 46, height: 26, borderRadius: 99, border: "none",
                    background: paa ? "#4caa22" : "#bbb",
                    cursor: "pointer", position: "relative", flexShrink: 0,
                    transition: "background 0.2s",
                  }}
                >
                  <span style={{
                    position: "absolute", width: 20, height: 20, borderRadius: "50%",
                    background: "white", top: 3,
                    left: paa ? 23 : 3,
                    transition: "left 0.2s",
                  }} />
                </button>
              </div>
            );
          })}
        </div>

        {/* Info */}
        <div style={{ fontSize: "0.72rem", fontWeight: 800, color: "#3a6b5a", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 10 }}>
          Om foreldretilgang
        </div>
        <div style={{ background: "rgba(255,255,255,0.75)", borderRadius: 16, padding: "14px 16px" }}>
          {[
            ["🔑", "PIN-kode: 1234 — trykk 5 ganger på sola for å åpne"],
            ["💾", "Innstillinger lagres lokalt på denne enheten"],
            ["👶", "Deaktiverte spill forsvinner helt fra barnets hjemskjerm"],
            ["⏱", "Tidsstyring og mer kommer i fremtidige oppdateringer"],
          ].map(([ikon, tekst]) => (
            <div key={tekst} style={{ display: "flex", gap: 10, alignItems: "flex-start", marginBottom: 10 }}>
              <span style={{ fontSize: "0.95rem", flexShrink: 0 }}>{ikon}</span>
              <span style={{ fontSize: "0.78rem", color: "#3a6b5a", fontWeight: 600, lineHeight: 1.4 }}>{tekst}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Eksportert wrapper: håndterer PIN → panel-flyt ─────────────────
export default function ForeldrePanelWrapper({ onLukk }) {
  const [fase, setFase] = useState("pin"); // pin | panel

  if (fase === "pin") {
    return <PinSkjerm onSuccess={() => setFase("panel")} onAvbryt={onLukk} />;
  }
  return <AdminPanel onLukk={onLukk} />;
}
