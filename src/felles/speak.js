/**
 * Spiller et forhåndsgenerert mp3-klipp.
 * Faller tilbake til Web Speech API dersom filen ikke finnes (404 / autoplay-feil).
 *
 * Bruk:
 *   import { playAudio, speak } from "../felles/speak.js";
 *   await playAudio("/lyd/fraser/velkomst.mp3", "Hei og velkommen!");
 *   speak("Hei!"); // Web Speech fallback direkte
 *
 * Når edge-tts-filer er generert brukes playAudio() i spillene.
 * Inntil da er speak() et greit alternativ for prototyping.
 */

let aktivAudio = null;
let audioUnlocked = false;

// Spiller et usynlig stille klipp for å låse opp autoplay-policy.
// Må kalles direkte fra en bruker-event (click/pointerdown).
export async function unlockAudio() {
  if (audioUnlocked) return;
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    await ctx.resume();
    audioUnlocked = true;
  } catch {
    // Prøv med vanlig Audio som fallback
    try {
      const a = new Audio();
      a.src = "data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAA" +
        "EAAQARAAIAIgACABAAIABkYXRhAAAAAA==";
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
  const pref = ["nora", "siri", "enhanced", "premium", "neural", "natural"];
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
    u.pitch = 1.06;
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
