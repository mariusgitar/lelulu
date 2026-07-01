import { useState } from "react";
import Hjemskjerm from "./Hjemskjerm.jsx";
import Dyredetektiven from "./spill/dyredetektiven/Dyredetektiven.jsx";
import VannLabben from "./spill/vannlabben/VannLabben.jsx";

export default function App() {
  const [skjerm, setSkjerm] = useState("hjem");

  const tilbake = () => setSkjerm("hjem");

  if (skjerm === "dyredetektiven") return <Dyredetektiven onBack={tilbake} />;
  if (skjerm === "vannlabben")     return <VannLabben onBack={tilbake} />;

  // Fallback + hjemskjerm
  return <Hjemskjerm onOpen={setSkjerm} />;
}
