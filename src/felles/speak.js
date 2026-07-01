let aktivAudio = null;
let audioUnlocked = false;

export async function unlockAudio() {
  if (audioUnlocked) return;
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    await ctx.resume();
    audioUnlocked = true;
  } catch {
    try {
      const a = new Audio();
      a.src = "data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YQAAAAA=";
      await a.play();
      a.pause();
      audioUnlocked = true;
    } catch { /* ignorerer */ }
  }
}

function getBestVoice() {
  if (!("speechSynthesis" in window)) return null;
  const voices = window.speechSynthesis.getVoices();
  const norske = voices.filter((v) => {
    const l = v.lang?.toLowerCase() || "";
    return l.startsWith("nb") || l.startsWith("no") || l.includes("nor");
  });
  if (norske.length === 0) return voices[0] || null;
  const pref = ["nora", "siri", "finn", "enhanced", "premium", "neural", "natural"];
  return norske.find((v) => pref.some((p) => v.name.toLowerCase().includes(p))) || norske[0];
}

export function speak(tekst, onEnd) {
  try {
    const synth = window.speechSynthesis;
    if (!synth || !tekst) { onEnd?.(); return; }
    synth.cancel();
    const u = new SpeechSynthesisUtterance(tekst);
    const voice = getBestVoice();
    if (voice) { u.voice = voice; u.lang = voice.lang || "nb-NO"; } else { u.lang = "nb-NO"; }
    u.rate = 0.82;
    u.pitch = 1.0;
    u.onend = onEnd || null;
    u.onerror = onEnd || null;
    synth.speak(u);
  } catch { onEnd?.(); }
}

export function stoppLyd() {
  if (aktivAudio) { aktivAudio.pause(); aktivAudio = null; }
  if ("speechSynthesis" in window) window.speechSynthesis.cancel();
}

export function playAudio(src, fallbackTekst) {
  return new Promise((resolve) => {
    if (aktivAudio) { aktivAudio.pause(); aktivAudio = null; }
    const audio = new Audio(src);
    aktivAudio = audio;
    let ferdig = false;
    const avslutt = () => { if (!ferdig) { ferdig = true; resolve(); } };
    audio.onended = avslutt;
    audio.onerror = async () => {
      if (ferdig) return;
      ferdig = true;
      await new Promise((r) => speak(fallbackTekst, r));
      resolve();
    };
    audio.play().catch(async () => {
      if (ferdig) return;
      ferdig = true;
      await new Promise((r) => speak(fallbackTekst, r));
      resolve();
    });
  });
}

// Spiller en liste med {src, fallback} i sekvens med valgfri pause mellom
export async function playSekvens(klipp, { pauseMs = 150, onStart, signal } = {}) {
  for (let i = 0; i < klipp.length; i++) {
    if (signal?.avbrutt) return;
    onStart?.(i);
    await playAudio(klipp[i].src, klipp[i].fallback);
    if (signal?.avbrutt) return;
    if (pauseMs && i < klipp.length - 1) {
      await new Promise((r) => setTimeout(r, pauseMs));
    }
  }
}
