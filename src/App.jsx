import { useState } from "react";
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

export default function App() {
  const [skjerm, setSkjerm] = useState("hjem");
  const tilbake = () => setSkjerm("hjem");

  if (skjerm === "dyredetektiven")  return <Dyredetektiven  onBack={tilbake} />;
  if (skjerm === "vannlabben")      return <VannLabben      onBack={tilbake} />;
  if (skjerm === "dyreboka")        return <Dyreboka        onBack={tilbake} />;
  if (skjerm === "sorter")          return <SorterDyrene    onBack={tilbake} />;
  if (skjerm === "dyreminne")       return <Dyreminne       onBack={tilbake} />;
  if (skjerm === "lyddetektiven")   return <LydDetektiven   onBack={tilbake} />;
  if (skjerm === "silhuett")        return <Silhuett        onBack={tilbake} />;
  if (skjerm === "finnforskjellen") return <FinnForskjellen onBack={tilbake} />;
  if (skjerm === "dinodetektiven")  return <Dinodetektiven  onBack={tilbake} />;

  return <Hjemskjerm onOpen={setSkjerm} />;
}
