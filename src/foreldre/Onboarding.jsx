import { useState } from "react";

const GRONN = "#1f5c4a";
const GUL   = "#f0c14b";

function ProgressBar({ steg, total }) {
  return (
    <div style={{ display: "flex", gap: 6, padding: "20px 28px 0" }}>
      {Array.from({ length: total }).map((_, i) => (
        <div key={i} style={{
          flex: 1, height: 4, borderRadius: 2,
          background: i <= steg ? GRONN : "#eee",
          transition: "background 0.2s",
        }} />
      ))}
    </div>
  );
}

function StegMerke({ steg, total }) {
  return (
    <div style={{ fontSize: 12, fontWeight: 800, color: GUL, textTransform: "uppercase", letterSpacing: 1.5, marginBottom: 4 }}>
      Steg {steg} av {total}
    </div>
  );
}

function Steg({ number, title, children }) {
  return (
    <div style={{ display: "flex", gap: 14, marginBottom: 18 }}>
      <div style={{
        width: 28, height: 28, borderRadius: "50%", background: GUL,
        display: "flex", alignItems: "center", justifyContent: "center",
        fontWeight: 900, fontSize: 13, color: GRONN, flexShrink: 0,
      }}>{number}</div>
      <div>
        <div style={{ fontWeight: 900, fontSize: 13.5, color: "#1a1a1a", marginBottom: 3 }}>{title}</div>
        <div style={{ fontSize: 12.5, fontWeight: 600, color: "#555", lineHeight: 1.5 }}>{children}</div>
      </div>
    </div>
  );
}

function OSToggle({ platform, setPlatform }) {
  return (
    <div style={{ display: "flex", gap: 8, marginBottom: 18 }}>
      {[["ios", "📱 iPhone/iPad"], ["android", "🤖 Android"]].map(([val, label]) => (
        <button key={val} onClick={() => setPlatform(val)} style={{
          flex: 1, padding: "10px", borderRadius: 12,
          background: platform === val ? GRONN : "#f0f0f0",
          color: platform === val ? "#fff" : "#666",
          border: "none", fontWeight: 800, fontSize: 13,
          cursor: "pointer", fontFamily: "inherit",
        }}>{label}</button>
      ))}
    </div>
  );
}

function NavKnapper({ onBack, onNext, nesteTekst = "Neste →" }) {
  return (
    <div style={{ display: "flex", gap: 10, marginTop: 22 }}>
      {onBack && (
        <button onClick={onBack} style={{
          flex: 1, background: "#fff", color: GRONN, border: `2px solid ${GRONN}`,
          borderRadius: 14, padding: "13px", fontWeight: 900, fontSize: 14,
          cursor: "pointer", fontFamily: "inherit",
        }}>← Tilbake</button>
      )}
      <button onClick={onNext} style={{
        flex: 2, background: GRONN, color: "#fff", border: "none",
        borderRadius: 14, padding: "13px", fontWeight: 900, fontSize: 14,
        cursor: "pointer", fontFamily: "inherit",
      }}>{nesteTekst}</button>
    </div>
  );
}

// ── Skjerm 1: Velkommen ───────────────────────────────────────────
function Velkommen({ onNext }) {
  return (
    <div style={{ padding: "48px 28px", textAlign: "center" }}>
      <div style={{ fontSize: 56, marginBottom: 16 }}>🌿</div>
      <h1 style={{ fontSize: 24, fontWeight: 900, color: "#1a1a1a", margin: "0 0 10px" }}>
        Velkommen til Lelulu
      </h1>
      <p style={{ fontSize: 14, fontWeight: 600, color: "#666", lineHeight: 1.6, margin: "0 0 8px" }}>
        En lekeplass for barn — uten reklame, uten algoritmer, uten overraskelser.
      </p>
      <p style={{ fontSize: 13, fontWeight: 600, color: "#999", lineHeight: 1.5, margin: "0 0 32px" }}>
        Denne oppsett-guiden er kun for deg som forelder. Gjør alt klart før du gir nettbrettet til barnet.
      </p>
      <button onClick={onNext} style={{
        background: GRONN, color: "#fff", border: "none",
        borderRadius: 16, padding: "15px 36px", fontWeight: 900, fontSize: 15,
        cursor: "pointer", width: "100%", fontFamily: "inherit",
      }}>
        Sett opp Lelulu →
      </button>
    </div>
  );
}

// ── Skjerm 2: Installer PWA ────────────────────────────────────────
function InstallPWA({ onNext, onBack }) {
  const [platform, setPlatform] = useState("ios");
  return (
    <div style={{ padding: "28px 28px" }}>
      <StegMerke steg={1} total={3} />
      <h2 style={{ fontSize: 19, fontWeight: 900, color: "#1a1a1a", margin: "0 0 6px" }}>
        Legg appen på hjemskjermen
      </h2>
      <p style={{ fontSize: 12.5, fontWeight: 600, color: "#666", margin: "0 0 16px", lineHeight: 1.5 }}>
        Da åpnes Lelulu som en egen app — uten adressefelt eller nettleser-distraksjoner.
      </p>
      <OSToggle platform={platform} setPlatform={setPlatform} />
      {platform === "ios" ? (
        <>
          <Steg number="1" title="Åpne i Safari 🧭">Lelulu fungerer best i Safari på iPhone og iPad.</Steg>
          <Steg number="2" title="Trykk på Del-knappen ⬆️">Firkanten med pil opp, nederst i Safari.</Steg>
          <Steg number="3" title='Velg "Legg til på Hjemskjerm" 📱'>Scroll litt ned i menyen for å finne den.</Steg>
          <Steg number="4" title='Trykk "Legg til"'>Lelulu dukker opp som et eget ikon.</Steg>
        </>
      ) : (
        <>
          <Steg number="1" title="Åpne i Chrome 🌐">Anbefalt nettleser på Android.</Steg>
          <Steg number="2" title="Trykk på menyknappen (⋮)">Øverst til høyre.</Steg>
          <Steg number="3" title='Velg "Legg til på startskjermen"'>Eller "Installer app", avhengig av telefonen.</Steg>
          <Steg number="4" title="Bekreft">Lelulu dukker opp som et eget ikon.</Steg>
        </>
      )}
      <NavKnapper onBack={onBack} onNext={onNext} />
    </div>
  );
}

// ── Skjerm 3: Guided Access ────────────────────────────────────────
function GuidedAccess({ onNext, onBack }) {
  const [platform, setPlatform] = useState("ios");
  return (
    <div style={{ padding: "28px 28px" }}>
      <StegMerke steg={2} total={3} />
      <h2 style={{ fontSize: 19, fontWeight: 900, color: "#1a1a1a", margin: "0 0 6px" }}>
        Lås enheten til Lelulu
      </h2>
      <p style={{ fontSize: 12.5, fontWeight: 600, color: "#666", margin: "0 0 16px", lineHeight: 1.5 }}>
        En innebygd funksjon i telefonen/nettbrettet som hindrer barnet i å trykke seg ut til andre apper.
      </p>
      <OSToggle platform={platform} setPlatform={setPlatform} />
      {platform === "ios" ? (
        <>
          <Steg number="1" title="Slå på Guidet tilgang">Innstillinger → Tilgjengelighet → Guidet tilgang → skru på og sett en kode.</Steg>
          <Steg number="2" title="Åpne Lelulu">Trykk på ikonet du nettopp la til på hjemskjermen.</Steg>
          <Steg number="3" title="Trippel-klikk sideknappen">Trykk "Start" øverst til høyre for å låse.</Steg>
          <Steg number="4" title="For å avslutte">Trippel-klikk igjen og skriv inn koden din.</Steg>
        </>
      ) : (
        <>
          <Steg number="1" title="Slå på Fest app">Innstillinger → Sikkerhet → Fest app → skru på.</Steg>
          <Steg number="2" title="Åpne Lelulu">Trykk på ikonet på hjemskjermen.</Steg>
          <Steg number="3" title="Åpne oversikt-knappen">Hold inne firkant-knappen, trykk på Lelulu-ikonet, velg "Fest".</Steg>
          <Steg number="4" title="For å avslutte">Hold inne Tilbake- og Oversikt-knappen samtidig.</Steg>
        </>
      )}
      <div style={{
        background: "#FFF8E8", borderRadius: 14, padding: "12px 16px",
        fontSize: 12, fontWeight: 600, color: "#7a6020", marginTop: 4, lineHeight: 1.5,
      }}>
        💡 Valgfritt, men anbefalt — uten dette kan barnet trykke seg ut til andre apper.
      </div>
      <NavKnapper onBack={onBack} onNext={onNext} />
    </div>
  );
}

// ── Skjerm 4: Foreldretilgang ──────────────────────────────────────
function ForeldreTilgang({ onNext, onBack }) {
  return (
    <div style={{ padding: "28px 28px" }}>
      <StegMerke steg={3} total={3} />
      <h2 style={{ fontSize: 19, fontWeight: 900, color: "#1a1a1a", margin: "0 0 6px" }}>
        Foreldretilgang
      </h2>
      <p style={{ fontSize: 12.5, fontWeight: 600, color: "#666", margin: "0 0 16px", lineHeight: 1.5 }}>
        Lelulu har et skjult panel der du velger hvilke spill barnet skal se.
      </p>

      <div style={{ background: "#FFF8E8", borderRadius: 16, padding: "14px 16px", marginBottom: 14 }}>
        <div style={{ fontWeight: 900, fontSize: 13, color: "#8a6d1a", marginBottom: 6 }}>
          ☀️ Slik åpner du panelet
        </div>
        <div style={{ fontSize: 12.5, fontWeight: 600, color: "#7a6020", lineHeight: 1.5 }}>
          Trykk 5 ganger raskt på solen øverst i høyre hjørne. Du blir bedt om en PIN-kode.
        </div>
      </div>

      <div style={{ background: "#fff", border: "2px solid #eee", borderRadius: 16, padding: "14px 16px", marginBottom: 14 }}>
        <div style={{ fontWeight: 900, fontSize: 13, color: "#1a1a1a", marginBottom: 6 }}>🔑 PIN-kode</div>
        <div style={{ fontSize: 22, fontWeight: 900, color: GRONN, letterSpacing: 6, marginBottom: 6 }}>
          1 2 3 4
        </div>
        <div style={{ fontSize: 11.5, fontWeight: 600, color: "#888" }}>
          Du kan endre denne i kildekoden (PARENT_PIN i App.jsx).
        </div>
      </div>

      <div style={{ fontSize: 13, fontWeight: 700, color: "#1a1a1a", marginBottom: 8 }}>
        I panelet kan du:
      </div>
      <div style={{ fontSize: 12.5, fontWeight: 600, color: "#555", lineHeight: 1.8, marginBottom: 4 }}>
        🎮 Skru enkeltspill av og på<br/>
        👀 Deaktiverte spill forsvinner fra hjemskjermen<br/>
        ⏱ Tidsstyring og mer kommer i fremtidige oppdateringer
      </div>

      <NavKnapper onBack={onBack} onNext={onNext} nesteTekst="Ferdig, åpne Lelulu 🌿" />
    </div>
  );
}

// ── Hovedkomponent ──────────────────────────────────────────────────
export default function Onboarding({ onDone }) {
  const [skjerm, setSkjerm] = useState(0);
  const TOTAL = 3;

  const skjermer = [
    <Velkommen key="0" onNext={() => setSkjerm(1)} />,
    <InstallPWA key="1" onNext={() => setSkjerm(2)} onBack={() => setSkjerm(0)} />,
    <GuidedAccess key="2" onNext={() => setSkjerm(3)} onBack={() => setSkjerm(1)} />,
    <ForeldreTilgang key="3" onNext={onDone} onBack={() => setSkjerm(2)} />,
  ];

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 500,
      background: "linear-gradient(180deg, #aee3f5 0%, #d7f0e0 55%, #eaf8ec 100%)",
      fontFamily: "'Nunito', system-ui, sans-serif",
      display: "flex", alignItems: "flex-start", justifyContent: "center",
      padding: "20px 16px", overflowY: "auto",
    }}>
      <div style={{
        width: "100%", maxWidth: 420, background: "#fff",
        borderRadius: 28, overflow: "hidden",
        boxShadow: "0 20px 60px rgba(0,0,0,0.18)",
        minHeight: 540, marginTop: "max(20px, env(safe-area-inset-top))",
      }}>
        {skjerm > 0 && skjerm < 4 && <ProgressBar steg={skjerm - 1} total={TOTAL} />}
        {skjermer[skjerm]}
      </div>
    </div>
  );
}
