// Bilspill – felles lyd. Alt lages i nettleseren (WebAudio), ingen lydfiler.
// Lyd.start() må kalles fra et trykk (krav i iOS Safari) før noe kan spilles.
const Lyd = {
  ac: null,
  start() {
    if (this.ac) { if (this.ac.state === 'suspended') this.ac.resume(); return this.ac; }
    try { this.ac = new (window.AudioContext || window.webkitAudioContext)(); } catch (e) { this.ac = null; }
    return this.ac;
  },
};

function tone(freq, t0, dur, type = 'triangle', vol = .18, glideTil) {
  const ac = Lyd.ac; if (!ac) return;
  const o = ac.createOscillator(), g = ac.createGain();
  o.type = type; o.frequency.setValueAtTime(freq, ac.currentTime + t0);
  if (glideTil) o.frequency.linearRampToValueAtTime(glideTil, ac.currentTime + t0 + dur);
  g.gain.setValueAtTime(0, ac.currentTime + t0);
  g.gain.linearRampToValueAtTime(vol, ac.currentTime + t0 + .02);
  g.gain.exponentialRampToValueAtTime(.001, ac.currentTime + t0 + dur);
  o.connect(g).connect(ac.destination); o.start(ac.currentTime + t0); o.stop(ac.currentTime + t0 + dur + .05);
}

// Myk «brum-brum»: trekant + mild overtone, pulserende volum (putt-putt), lavpassfilter
function motorLyd(dur = 1.5, traktor = false) {
  const ac = Lyd.ac; if (!ac) return;
  const t = ac.currentTime;
  const f0 = traktor ? 48 : 70, f1 = traktor ? 68 : 118, p0 = traktor ? 6 : 12, p1 = traktor ? 9 : 22;
  const o1 = ac.createOscillator(), o2 = ac.createOscillator(), lfo = ac.createOscillator();
  o1.type = 'triangle'; o2.type = 'sine'; lfo.type = 'sine';
  o1.frequency.setValueAtTime(f0, t); o1.frequency.linearRampToValueAtTime(f1, t + dur * .6);
  o2.frequency.setValueAtTime(f0 * 2, t); o2.frequency.linearRampToValueAtTime(f1 * 2, t + dur * .6);
  lfo.frequency.setValueAtTime(p0, t); lfo.frequency.linearRampToValueAtTime(p1, t + dur * .6);
  const g2 = ac.createGain(); g2.gain.value = .3;
  const am = ac.createGain(); am.gain.value = .55;
  const lfoG = ac.createGain(); lfoG.gain.value = .45;
  const lp = ac.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = 600; lp.Q.value = .7;
  const env = ac.createGain();
  env.gain.setValueAtTime(0, t); env.gain.linearRampToValueAtTime(.2, t + .15);
  env.gain.setValueAtTime(.2, t + Math.max(.2, dur - .45)); env.gain.exponentialRampToValueAtTime(.001, t + dur);
  lfo.connect(lfoG).connect(am.gain);
  o1.connect(am); o2.connect(g2).connect(am);
  am.connect(lp).connect(env).connect(ac.destination);
  [o1, o2, lfo].forEach(o => { o.start(t); o.stop(t + dur + .05); });
}

const tut = () => { [0, .3].forEach(t => { tone(392, t, .22, 'square', .07); tone(494, t, .22, 'square', .05); }); };
const jingle = () => [523, 659, 784, 1047].forEach((f, i) => tone(f, i * .11, .35, 'triangle', .16));

// Signal per kjøretøy (navnet ligger i kjøretøyets «lyd»-felt)
const LYDER = {
  tut,
  traktor: () => { tone(196, 0, .35, 'square', .07); tone(196, .45, .5, 'square', .07); },
  sirene: () => [0, .4, .8, 1.2].forEach((t, i) => tone(i % 2 ? 784 : 587, t, .38, 'triangle', .12)),
  rygg: () => [0, .3, .6].forEach(t => tone(1050, t, .15, 'square', .05)),
  politi: () => [0, .5, 1].forEach(t => { tone(650, t, .25, 'triangle', .12, 950); tone(950, t + .25, .25, 'triangle', .12, 650); }),
  is: () => [784, 659, 784, 880, 784, 659, 523].forEach((f, i) => tone(f, i * .16, .3, 'sine', .14)),
  grave: () => { tone(110, 0, .3, 'square', .06); tone(110, .4, .3, 'square', .06); tone(82, .8, .5, 'square', .06); },
  horn: () => { tone(185, 0, .7, 'sawtooth', .06); tone(233, 0, .7, 'sawtooth', .05); },
};

// Støy (sus, brøl, plask) – felles hjelper
function stoy(t0, dur, freq = 1000, vol = .2, type = 'bandpass') {
  const ac = Lyd.ac; if (!ac) return;
  if (!Lyd.stoyBuf) {
    Lyd.stoyBuf = ac.createBuffer(1, ac.sampleRate, ac.sampleRate);
    const d = Lyd.stoyBuf.getChannelData(0); for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
  }
  const s = ac.createBufferSource(), f = ac.createBiquadFilter(), g = ac.createGain();
  s.buffer = Lyd.stoyBuf; f.type = type; f.frequency.value = freq;
  g.gain.setValueAtTime(0, ac.currentTime + t0); g.gain.linearRampToValueAtTime(vol, ac.currentTime + t0 + .04);
  g.gain.exponentialRampToValueAtTime(.001, ac.currentTime + t0 + dur);
  s.connect(f).connect(g).connect(ac.destination); s.start(ac.currentTime + t0); s.stop(ac.currentTime + t0 + dur + .05);
}

// Dyrelyder (koselige, ikke skumle)
const DYRELYD = {
  hund: () => { tone(320, 0, .12, 'square', .07, 200); tone(320, .2, .12, 'square', .07, 200); },
  katt: () => { tone(620, 0, .25, 'sine', .12, 900); tone(900, .25, .35, 'sine', .1, 520); },
  love: () => { tone(150, 0, .9, 'sawtooth', .07, 90); stoy(0, .9, 300, .12, 'lowpass'); },
  tiger: () => { tone(190, 0, .7, 'sawtooth', .06, 110); stoy(0, .7, 450, .1, 'lowpass'); },
  koala: () => [0, .18, .36].forEach(t => tone(95, t, .14, 'sawtooth', .07, 75)),
  sjiraff: () => { tone(160, 0, .5, 'sine', .12, 130); tone(130, .5, .4, 'sine', .08, 150); },
  ku: () => tone(150, 0, .9, 'sawtooth', .08, 110),
};
LYDER.dyr = () => [523, 659, 523, 784].forEach((f, i) => tone(f, i * .15, .2, 'sine', .14));
