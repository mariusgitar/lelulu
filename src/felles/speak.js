let aktivAudio = null;
let audioUnlocked = false;
let audioCtx = null;
const preloadCache = new Map();

function getCtx() {
  if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  return audioCtx;
}

export async function unlockAudio() {
  if (audioUnlocked) return;
  try {
    const ctx = getCtx();
    await ctx.resume();
    // Spill et stille klipp for å "varme opp" iOS audio
    const buf = ctx.createBuffer(1, 1, 22050);
    const src = ctx.createBufferSource();
    src.buffer = buf;
    src.connect(ctx.destination);
    src.start(0);
    audioUnlocked = true;
  } catch {
    audioUnlocked = true; // fortsett uansett
  }
}

// Preload et lite antall lydfiler (maks 3 om gangen for iOS-kompatibilitet)
// Bruk bare på de filene som spilles ALLER FØRST i et spill
export function preloadLyder(srcs) {
  // iOS tåler ikke mange samtidige Audio-objekter — begrens til 3
  const begrenset = srcs.slice(0, 3);
  begrenset.forEach((src) => {
    if (preloadCache.has(src)) return;
    const a = new Audio();
    a.preload = "metadata"; // "metadata" i stedet for "auto" — laster header, ikke hele filen
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
    // iOS krever liten forsinkelse etter cancel() før ny tale starter
    setTimeout(() => {
      const u = new SpeechSynthesisUtterance(tekst);
      const voice = getBestVoice();
      if (voice) { u.voice = voice; u.lang = voice.lang || "nb-NO"; }
      else { u.lang = "nb-NO"; }
      u.rate = 0.82;
      u.pitch = 1.0;
      u.onend  = onEnd || null;
      u.onerror = () => onEnd?.();
      synth.speak(u);
    }, 50);
  } catch { onEnd?.(); }
}

export function stoppLyd() {
  if (aktivAudio) {
    try { aktivAudio.pause(); aktivAudio.src = ""; } catch {}
    aktivAudio = null;
  }
  try {
    if ("speechSynthesis" in window) window.speechSynthesis.cancel();
  } catch {}
}

export function playAudio(src, fallbackTekst) {
  return new Promise((resolve) => {
    // Stopp forrige lyd
    if (aktivAudio) {
      try { aktivAudio.pause(); aktivAudio.src = ""; } catch {}
      aktivAudio = null;
    }

    // Resume AudioContext hvis suspended (skjer på iOS etter inaktivitet)
    if (audioCtx && audioCtx.state === "suspended") {
      audioCtx.resume().catch(() => {});
    }

    const cachet = preloadCache.get(src);
    const audio = cachet || new Audio();
    aktivAudio = audio;

    let ferdig = false;

    const avslutt = () => {
      if (ferdig) return;
      ferdig = true;
      if (aktivAudio === audio) aktivAudio = null;
      if (cachet) { try { audio.currentTime = 0; } catch {} }
      resolve();
    };

    const brukFallback = () => {
      if (ferdig) return;
      ferdig = true;
      if (aktivAudio === audio) aktivAudio = null;
      try { audio.pause(); if (!cachet) audio.src = ""; } catch {}
      if (fallbackTekst) { speak(fallbackTekst, resolve); }
      else { resolve(); }
    };

    audio.onended = avslutt;
    audio.onerror = brukFallback;

    const timer = setTimeout(brukFallback, 2000);

    if (cachet) {
      // Cachet fil — src allerede satt, bare play()
      audio.play().then(() => clearTimeout(timer)).catch(() => { clearTimeout(timer); brukFallback(); });
    } else {
      // Ikke cachet — sett src ETTER play() (iOS-trick)
      audio.play().then(() => clearTimeout(timer)).catch(() => { clearTimeout(timer); brukFallback(); });
      audio.src = src;
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
