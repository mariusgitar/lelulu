import { useState } from "react";
import Hjemskjerm from "./Hjemskjerm.jsx";
import Dyredetektiven from "./spill/dyredetektiven/Dyredetektiven.jsx";
import VannLabben from "./spill/vannlabben/VannLabben.jsx";
import Mysteriet from "./spill/mysteriet/Mysteriet.jsx";
import Dyreboka from "./spill/dyreboka/Dyreboka.jsx";
import SorterDyrene from "./spill/sorter/SorterDyrene.jsx";
import Dyreminne from "./spill/dyreminne/Dyreminne.jsx";

export default function App() {
  const [skjerm, setSkjerm] = useState("hjem");
  const tilbake = () => setSkjerm("hjem");

  if (skjerm === "dyredetektiven") return <Dyredetektiven onBack={tilbake} />;
  if (skjerm === "vannlabben")     return <VannLabben     onBack={tilbake} />;
  if (skjerm === "mysteriet")      return <Mysteriet      onBack={tilbake} />;
  if (skjerm === "dyreboka")       return <Dyreboka       onBack={tilbake} />;
  if (skjerm === "sorter")         return <SorterDyrene   onBack={tilbake} />;
  if (skjerm === "dyreminne")      return <Dyreminne      onBack={tilbake} />;

  return <Hjemskjerm onOpen={setSkjerm} />;
}
