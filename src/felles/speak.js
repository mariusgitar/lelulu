let aktivAudio = null;
let audioUnlocked = false;
const preloadCache = new Map();

export async function unlockAudio() {
  if (audioUnlocked) return;
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
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

let speakTimer = null;

export function speak(tekst, onEnd) {
  try {
    const synth = window.speechSynthesis;
    if (!synth || !tekst) { onEnd?.(); return; }
    synth.cancel();
    // Kanseller evt. ventende speak-kall
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
    if (aktivAudio) {
      try { aktivAudio.pause(); aktivAudio.src = ""; } catch {}
      aktivAudio = null;
    }

    const cachet = preloadCache.get(src);
    const audio  = cachet || new Audio();
    if (!cachet) audio.src = src;
    aktivAudio = audio;

    let ferdig = false;

    const avslutt = () => {
      if (ferdig) return;
      ferdig = true;
      clearTimeout(timer);
      if (aktivAudio === audio) aktivAudio = null;
      if (cachet) { try { audio.currentTime = 0; } catch {} }
      resolve();
    };

    const brukFallback = () => {
      if (ferdig) return;
      ferdig = true;
      clearTimeout(timer);
      if (aktivAudio === audio) aktivAudio = null;
      try { audio.pause(); } catch {}
      // Bekreftet feil: tom streng ble ikke resolvet
      if (fallbackTekst && fallbackTekst.length > 0) {
        speak(fallbackTekst, resolve);
      } else {
        resolve();
      }
    };

    audio.onended = avslutt;
    audio.onerror = brukFallback;

    // Økt til 8 sekunder — forhindrer for tidlig fallback på iOS
    const timer = setTimeout(brukFallback, 8000);

    audio.play().then(() => {
      // Avspilling startet — sett ny timeout basert på faktisk varighet
      clearTimeout(timer);
      // Gi god margin etter at lyden starter
      audio.addEventListener("durationchange", () => {
        if (audio.duration && isFinite(audio.duration)) {
          // Sett timeout til varigheten + 3 sekunder margin
          setTimeout(brukFallback, (audio.duration * 1000) + 3000);
        }
      }, { once: true });
    }).catch(() => {
      clearTimeout(timer);
      brukFallback();
    });
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
