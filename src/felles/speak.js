let aktivAudio   = null;
let aktivKilde   = null;
let audioUnlocked = false;
let audioCtx     = null;
let speakTimer   = null;
const preloadCache = new Map();

function getCtx() {
  if (!audioCtx || audioCtx.state === "closed") {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  if (audioCtx.state === "suspended") audioCtx.resume().catch(() => {});
  return audioCtx;
}

export async function unlockAudio() {
  if (audioUnlocked) return;
  try {
    const ctx = getCtx();
    await ctx.resume();
    const buf = ctx.createBuffer(1, 1, 22050);
    const src = ctx.createBufferSource();
    src.buffer = buf;
    src.connect(ctx.destination);
    src.start(0);
    audioUnlocked = true;
  } catch {
    audioUnlocked = true;
  }
}

export function preloadLyder(srcs) {
  srcs.forEach((src) => {
    if (preloadCache.has(src)) return;
    const a = new Audio();
    a.preload = "auto";
    a.src = src;
    preloadCache.set(src, a);
  });
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
    if (speakTimer) { clearTimeout(speakTimer); speakTimer = null; }
    speakTimer = setTimeout(() => {
      speakTimer = null;
      try {
        const u = new SpeechSynthesisUtterance(tekst);
        const voice = getBestVoice();
        if (voice) { u.voice = voice; u.lang = voice.lang || "nb-NO"; }
        else { u.lang = "nb-NO"; }
        u.rate = 0.82;
        u.pitch = 1.0;
        u.onend  = () => onEnd?.();
        u.onerror = () => onEnd?.();
        synth.speak(u);
      } catch { onEnd?.(); }
    }, 50);
  } catch { onEnd?.(); }
}

export function stoppLyd() {
  if (aktivKilde) {
    try { aktivKilde.stop(); } catch {}
    aktivKilde = null;
  }
  if (aktivAudio) {
    try { aktivAudio.pause(); aktivAudio.src = ""; } catch {}
    aktivAudio = null;
  }
  if (speakTimer) { clearTimeout(speakTimer); speakTimer = null; }
  try {
    if ("speechSynthesis" in window) window.speechSynthesis.cancel();
  } catch {}
}

export function playAudio(src, fallbackTekst) {
  return new Promise((resolve) => {
    // Stopp forrige
    if (aktivKilde) {
      try { aktivKilde.stop(); } catch {}
      aktivKilde = null;
    }
    if (aktivAudio) {
      try { aktivAudio.pause(); aktivAudio.src = ""; } catch {}
      aktivAudio = null;
    }

    let ferdig = false;
    let timer  = null;

    const ok = () => {
      if (ferdig) return;
      ferdig = true;
      clearTimeout(timer);
      resolve();
    };

    const brukFallback = () => {
      if (ferdig) return;
      ferdig = true;
      clearTimeout(timer);
      if (aktivKilde) { try { aktivKilde.stop(); } catch {} aktivKilde = null; }
      if (fallbackTekst && fallbackTekst.length > 0) {
        speak(fallbackTekst, resolve);
      } else {
        resolve();
      }
    };

    // Prøv AudioContext (unngår iOS autoplay-blokkering etter unlock)
    try {
      const ctx = getCtx();
      timer = setTimeout(brukFallback, 8000);

      fetch(src)
        .then((r) => { if (!r.ok) throw new Error("http " + r.status); return r.arrayBuffer(); })
        .then((buf) => ctx.decodeAudioData(buf))
        .then((decoded) => {
          if (ferdig) return;
          clearTimeout(timer);
          const kilde = ctx.createBufferSource();
          kilde.buffer = decoded;
          kilde.connect(ctx.destination);
          aktivKilde = kilde;
          kilde.onended = ok;
          kilde.start(0);
          // Sett ny timeout basert på faktisk varighet + margin
          timer = setTimeout(ok, (decoded.duration * 1000) + 2000);
        })
        .catch(brukFallback);
    } catch {
      // AudioContext ikke tilgjengelig — fall tilbake til Audio-element
      const audio = new Audio(src);
      aktivAudio = audio;
      audio.onended = ok;
      audio.onerror = brukFallback;
      timer = setTimeout(brukFallback, 8000);
      audio.play().catch(brukFallback);
    }
  });
}

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
