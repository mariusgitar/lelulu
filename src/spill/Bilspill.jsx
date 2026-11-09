import { useEffect } from "react";

// Bilspill ligger som statiske filer i public/bilspill/ og vises i en iframe.
// «← Lelulu»-knappen i Bilspill-menyen sender en melding hit, og vi går tilbake til hjemskjermen.
export default function Bilspill({ onBack }) {
  useEffect(() => {
    const lytt = (e) => {
      if (e.origin === window.location.origin && e.data?.type === "bilspill-lukk") onBack();
    };
    window.addEventListener("message", lytt);
    return () => window.removeEventListener("message", lytt);
  }, [onBack]);

  return (
    <iframe
      src="/bilspill/index.html?lelulu"
      title="Bilspill"
      allow="autoplay"
      style={{ position: "fixed", inset: 0, width: "100%", height: "100dvh", border: "none", background: "#aee3f5" }}
    />
  );
}
