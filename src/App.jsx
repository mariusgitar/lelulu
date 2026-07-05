import { useState, useEffect, useRef } from "react";
import Hjemskjerm from "./Hjemskjerm.jsx";
import Dyredetektiven from "./spill/dyredetektiven/Dyredetektiven.jsx";
import VannLabben from "./spill/vannlabben/VannLabben.jsx";
import Dyreboka from "./spill/dyreboka/Dyreboka.jsx";
import SorterDyrene from "./spill/sorter/SorterDyrene.jsx";
import Dyreminne from "./spill/dyreminne/Dyreminne.jsx";
import LydDetektiven from "./spill/lyddetektiven/LydDetektiven.jsx";
import Silhuett from "./spill/silhuett/Silhuett.jsx";
import FinnForskjellen from "./spill/finnforskjellen/FinnForskjellen.jsx";
import Dinodetektiven from "./spill/dinodetektiven/Dinodetektiven.jsx";
import Onboarding from "./foreldre/Onboarding.jsx";
import ForeldrePanelWrapper, { saveAktiverte } from "./foreldre/ForeldrePanel.jsx";
import { stoppLyd } from "./felles/speak.js";

const SOL_KLIKK_GRENSE = 5;
const SOL_RESET_MS     = 3000;

function loadOnboarded() {
  try { return !!localStorage.getItem("ll_onboarded"); } catch { return false; }
}
function saveOnboarded() {
  try { localStorage.setItem("ll_onboarded", "1"); } catch {}
}
function loadAktiverte() {
  try {
    const lagret = localStorage.getItem("ll_aktiverte");
    return lagret ? JSON.parse(lagret) : null;
  } catch { return null; }
}

export default function App() {
  const [skjerm, setSkjerm]             = useState("hjem");
  const [visOnboarding, setVisOnboarding] = useState(!loadOnboarded());
  const [visForeldrePanel, setVisForeldrePanel] = useState(false);
  const [aktiverte, setAktiverte]       = useState(loadAktiverte);
  const [solTrykk, setSolTrykk]         = useState(0);
  const solTimerRef                     = useRef(null);

  // Lytt på localStorage-endringer fra ForeldrePanelWrapper
  useEffect(() => {
    const oppdater = () => setAktiverte(loadAktiverte());
    window.addEventListener("storage", oppdater);
    return () => window.removeEventListener("storage", oppdater);
  }, []);

  const tilbake = () => {
    stoppLyd();
    setSkjerm("hjem");
  };

  const trykkSol = () => {
    const ny = solTrykk + 1;
    setSolTrykk(ny);
    clearTimeout(solTimerRef.current);
    if (ny >= SOL_KLIKK_GRENSE) {
      setSolTrykk(0);
      setVisForeldrePanel(true);
    } else {
      solTimerRef.current = setTimeout(() => setSolTrykk(0), SOL_RESET_MS);
    }
  };

  const lukkForeldrePanel = () => {
    setVisForeldrePanel(false);
    setAktiverte(loadAktiverte());
  };

  if (visOnboarding) {
    return <Onboarding onDone={() => { saveOnboarded(); setVisOnboarding(false); }} />;
  }

  if (visForeldrePanel) {
    return <ForeldrePanelWrapper onLukk={lukkForeldrePanel} />;
  }

  if (skjerm === "dyredetektiven")  return <Dyredetektiven  onBack={tilbake} onSolTrykk={trykkSol} />;
  if (skjerm === "vannlabben")      return <VannLabben      onBack={tilbake} onSolTrykk={trykkSol} />;
  if (skjerm === "dyreboka")        return <Dyreboka        onBack={tilbake} onSolTrykk={trykkSol} />;
  if (skjerm === "sorter")          return <SorterDyrene    onBack={tilbake} onSolTrykk={trykkSol} />;
  if (skjerm === "dyreminne")       return <Dyreminne       onBack={tilbake} onSolTrykk={trykkSol} />;
  if (skjerm === "lyddetektiven")   return <LydDetektiven   onBack={tilbake} onSolTrykk={trykkSol} />;
  if (skjerm === "silhuett")        return <Silhuett        onBack={tilbake} onSolTrykk={trykkSol} />;
  if (skjerm === "finnforskjellen") return <FinnForskjellen onBack={tilbake} onSolTrykk={trykkSol} />;
  if (skjerm === "dinodetektiven")  return <Dinodetektiven  onBack={tilbake} onSolTrykk={trykkSol} />;

  return (
    <Hjemskjerm
      onOpen={setSkjerm}
      onSolTrykk={trykkSol}
      solTrykk={solTrykk}
      aktiverte={aktiverte}
    />
  );
}
