/**
 * Instant feedback-lyder via Web Audio API.
 * Ingen filer, ingen latency — genereres direkte i nettleseren.
 */

let ctx = null;

function getCtx() {
  if (!ctx) ctx = new (window.AudioContext || window.webkitAudioContext)();
  if (ctx.state === "suspended") ctx.resume();
  return ctx;
}

/**
 * Pling — lys, positiv, kort.
 * Tre stigende toner i rask rekkefølge.
 */
export function pling() {
  try {
    const c = getCtx();
    const now = c.currentTime;
    [523.25, 659.25, 783.99].forEach((freq, i) => {
      const osc  = c.createOscillator();
      const gain = c.createGain();
      osc.connect(gain);
      gain.connect(c.destination);
      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, now + i * 0.07);
      gain.gain.setValueAtTime(0, now + i * 0.07);
      gain.gain.linearRampToValueAtTime(0.22, now + i * 0.07 + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.07 + 0.18);
      osc.start(now + i * 0.07);
      osc.stop(now + i * 0.07 + 0.2);
    });
  } catch { /* Web Audio ikke tilgjengelig */ }
}

/**
 * Bumm — myk, dempet, ikke skremmende.
 * En kort fallende tone med litt "wobble".
 */
export function bumm() {
  try {
    const c = getCtx();
    const now = c.currentTime;
    const osc  = c.createOscillator();
    const gain = c.createGain();
    osc.connect(gain);
    gain.connect(c.destination);
    osc.type = "sine";
    osc.frequency.setValueAtTime(280, now);
    osc.frequency.exponentialRampToValueAtTime(140, now + 0.18);
    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(0.18, now + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);
    osc.start(now);
    osc.stop(now + 0.25);
  } catch { /* Web Audio ikke tilgjengelig */ }
}
