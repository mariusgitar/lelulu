// Bilspill-modul: bensin
Bilspill.modul('bensin', {
  css: "\n  * { box-sizing: border-box; -webkit-tap-highlight-color: transparent; }\n  html, body { margin: 0; height: 100%; overflow: hidden; touch-action: none; user-select: none; -webkit-user-select: none; }\n  body { background: #2a2f38; }\n  .scene { position: absolute; inset: 0; overflow: hidden; }\n  .bak { position: absolute; inset: 0; width: 100%; height: 100%; }\n  .pumpe { position: absolute; z-index: 1; }\n  .pumpe svg { width: 100%; height: 100%; overflow: visible; display: block; }\n  .carbox { position: absolute; aspect-ratio: 2 / 1; z-index: 2; transition: transform 1.6s cubic-bezier(.2,.7,.3,1); }\n  .carbox.ut { transition: transform 1.5s cubic-bezier(.6,0,.9,.5); }\n  .carbox > svg { position: absolute; inset: 0; width: 100%; height: 100%; overflow: visible; }\n  .shadow { position: absolute; left: 6%; right: 6%; bottom: 0; height: 6%; border-radius: 50%; background: rgba(0,0,0,.25); filter: blur(4px); }\n  .hjul { transform-box: fill-box; transform-origin: center; }\n  .kjorer .hjul { animation: spinn .35s linear infinite; }\n  @keyframes spinn { to { transform: rotate(360deg); } }\n  .blink { animation: none; } .kjorer .blink { animation: blink .35s steps(2) infinite; }\n  @keyframes blink { 50% { opacity: .25; } }\n  .glint { display: none; }\n  .slanger { position: absolute; inset: 0; width: 100%; height: 100%; pointer-events: none; z-index: 3; }\n  .munn { position: absolute; z-index: 4; transform: translate(-50%, -50%); touch-action: none; }\n  .munn svg { width: 100%; height: 100%; pointer-events: none; overflow: visible; }\n  .munn.hjem { transition: left .5s cubic-bezier(.3,1.2,.5,1), top .5s cubic-bezier(.3,1.2,.5,1); }\n  .munn.vent { animation: vippe 1.6s ease-in-out infinite; }\n  @keyframes vippe { 0%,100% { transform: translate(-50%, -50%) rotate(0); } 50% { transform: translate(-50%, -58%) rotate(-8deg); } }\n  .munn.trykk { animation: pump .5s ease-in-out infinite; }\n  @keyframes pump { 50% { transform: translate(-50%, -50%) scale(.92); } }\n  .lokk { position: absolute; z-index: 2; transform: translate(-50%, -50%); pointer-events: none; }\n  .lokk svg { width: 100%; height: 100%; overflow: visible; }\n  .ring { transform-box: fill-box; transform-origin: center; animation: ring 1.2s ease-in-out infinite; }\n  @keyframes ring { 50% { transform: scale(1.25); opacity: .4; } }\n  .maler { position: absolute; z-index: 3; transform: translate(-50%, -100%); transition: opacity .4s; pointer-events: none; }\n  .maler svg { width: 100%; height: 100%; overflow: visible; }\n  .mynt { position: absolute; z-index: 5; transform: translate(-50%, -50%); animation: mynt 1s ease-in-out infinite; }\n  .mynt svg { width: 100%; height: 100%; pointer-events: none; }\n  @keyframes mynt { 50% { transform: translate(-50%, -62%) rotateY(180deg); } }\n  .kontroll { position: absolute; z-index: 5; transform: translate(-50%, -50%) scale(.3); opacity: 0; pointer-events: none; transition: transform .45s cubic-bezier(.3,1.6,.5,1), opacity .3s; touch-action: none; }\n  .kontroll.vis { transform: translate(-50%, -50%) scale(1); opacity: 1; pointer-events: auto; }\n  .kontroll svg { width: 100%; height: 100%; overflow: visible; display: block; pointer-events: none; }\n  .pil { animation: pil 1s ease-in-out infinite; transform-box: fill-box; transform-origin: center; }\n  @keyframes pil { 50% { opacity: .3; } }\n  .lyn { opacity: 0; transition: opacity .2s; }\n  .stjerne { position: absolute; width: 60px; pointer-events: none; animation: glitre 1.2s ease-out forwards; z-index: 6; }\n  @keyframes glitre { 0% { transform: translate(-50%,-50%) scale(0) rotate(0); opacity: 0; } 30% { opacity: 1; transform: translate(-50%,-50%) scale(1.1) rotate(40deg); } 100% { transform: translate(-50%,-50%) scale(0) rotate(120deg); opacity: 0; } }\n  .nei { animation: nei .45s ease-in-out; }\n  @keyframes nei { 20%,60% { margin-left: -8px; } 40%,80% { margin-left: 8px; } }\n",
  html: "\n<div class=\"scene\" id=\"scene\">\n  <svg class=\"bak\" id=\"bak\" viewBox=\"0 0 1000 500\" preserveAspectRatio=\"xMidYMax slice\">\n    <defs>\n      <linearGradient id=\"himmel\" x1=\"0\" y1=\"0\" x2=\"0\" y2=\"1\"><stop offset=\"0\" stop-color=\"#8fd0ff\"/><stop offset=\"1\" stop-color=\"#d9f1ff\"/></linearGradient>\n    </defs>\n    <rect x=\"-1000\" y=\"-500\" width=\"3000\" height=\"1000\" fill=\"url(#himmel)\"/>\n    <path d=\"M-500 330 Q-200 280 100 320 Q350 350 600 310 Q850 270 1100 320 Q1300 340 1500 300 L1500 400 L-500 400 Z\" fill=\"#8fd694\"/>\n    <!-- butikken -->\n    <g transform=\"translate(560 210)\">\n      <rect width=\"380\" height=\"190\" fill=\"#f2f4f7\"/><rect y=\"-24\" width=\"380\" height=\"30\" fill=\"#30a46c\"/>\n      <rect x=\"24\" y=\"40\" width=\"200\" height=\"90\" rx=\"4\" fill=\"#bfe3f7\"/><path d=\"M60 46 L90 46 L50 124 L20 124 Z\" fill=\"#fff\" opacity=\".5\"/>\n      <g fill=\"#ffcf3f\"><rect x=\"40\" y=\"96\" width=\"30\" height=\"34\"/><rect x=\"80\" y=\"104\" width=\"24\" height=\"26\" fill=\"#e5484d\"/><rect x=\"112\" y=\"90\" width=\"28\" height=\"40\" fill=\"#3e8ef7\"/></g>\n      <rect x=\"260\" y=\"60\" width=\"80\" height=\"130\" rx=\"4\" fill=\"#bfe3f7\"/><line x1=\"300\" y1=\"60\" x2=\"300\" y2=\"190\" stroke=\"#9aa3ae\" stroke-width=\"3\"/>\n      <circle cx=\"190\" cy=\"-9\" r=\"22\" fill=\"#fff\"/><path d=\"M190 -24 Q178 -8 182 2 Q190 10 198 2 Q202 -8 190 -24 Z\" fill=\"#e5484d\"/>\n    </g>\n    <!-- skiltmast -->\n    <g transform=\"translate(470 120)\"><rect x=\"-6\" y=\"0\" width=\"12\" height=\"280\" fill=\"#9aa3ae\"/><rect x=\"-48\" y=\"-70\" width=\"96\" height=\"80\" rx=\"12\" fill=\"#30a46c\"/><circle cy=\"-30\" r=\"26\" fill=\"#fff\"/><path d=\"M0 -50 Q-14 -32 -9 -20 Q0 -12 9 -20 Q14 -32 0 -50 Z\" fill=\"#e5484d\"/></g>\n    <!-- asfalt og øy -->\n    <rect x=\"-1000\" y=\"400\" width=\"3000\" height=\"400\" fill=\"#6b7280\"/>\n    <rect x=\"-1000\" y=\"400\" width=\"3000\" height=\"8\" fill=\"#5a6070\"/>\n    <g fill=\"#fff\" opacity=\".7\"><rect x=\"330\" y=\"450\" width=\"60\" height=\"6\"/><rect x=\"460\" y=\"450\" width=\"60\" height=\"6\"/><rect x=\"590\" y=\"450\" width=\"60\" height=\"6\"/><rect x=\"720\" y=\"450\" width=\"60\" height=\"6\"/><rect x=\"850\" y=\"450\" width=\"60\" height=\"6\"/></g>\n  </svg>\n  <!-- tak over pumpene (i samme slice-koordinater) -->\n  <svg class=\"bak\" viewBox=\"0 0 1000 500\" preserveAspectRatio=\"xMidYMax slice\" style=\"z-index:0; pointer-events:none\" id=\"tak\"></svg>\n  <div class=\"pumpe\" id=\"pBensin\"></div>\n  <div class=\"pumpe\" id=\"pStrom\"></div>\n  <div class=\"carbox\" id=\"carbox\"><div class=\"shadow\"></div><svg viewBox=\"0 0 400 200\" id=\"bilSvg\"></svg></div>\n  <div class=\"lokk\" id=\"lokk\"></div>\n  <div class=\"maler\" id=\"maler\"></div>\n  <svg class=\"slanger\" id=\"slanger\"><path id=\"slangeB\" fill=\"none\" stroke=\"#2a2a30\" stroke-width=\"10\" stroke-linecap=\"round\"/><path id=\"slangeS\" fill=\"none\" stroke=\"#2a2a30\" stroke-width=\"9\" stroke-linecap=\"round\"/></svg>\n  <div class=\"kontroll\" id=\"kontroll\"></div>\n  <div class=\"munn\" id=\"mBensin\"></div>\n  <div class=\"munn\" id=\"mStrom\"></div>\n</div>\n\n",
  start() {
(() => {

  const $ = id => document.getElementById(id);
  const scene = $('scene'), carbox = $('carbox'), bilSvg = $('bilSvg');

  // ---------- Grafikk ----------
  const DRAPE = f => `<path d="M0 -20 Q-14 -2 -9 8 Q0 16 9 8 Q14 -2 0 -20 Z" fill="${f}"/>`;
  const LYN = f => `<path d="M3 -20 L-10 2 L-1 2 L-4 20 L10 -4 L1 -4 Z" fill="${f}"/>`;
  $('pBensin').innerHTML = `<svg viewBox="0 0 100 220">
      <rect x="10" y="20" width="80" height="196" rx="10" fill="#e5484d"/><rect x="10" y="20" width="80" height="16" rx="8" fill="#c73a3f"/>
      <rect x="20" y="48" width="60" height="40" rx="5" fill="#1d2430"/><text id="tellerB" x="72" y="76" text-anchor="end" font-family="monospace" font-size="20" fill="#3ddc6f">000</text>
      <circle cx="50" cy="128" r="22" fill="#fff"/><g transform="translate(50 130)">${DRAPE('#e5484d')}</g>
      <rect x="84" y="100" width="14" height="40" rx="4" fill="#9aa3ae"/>
      <rect x="0" y="206" width="100" height="14" rx="4" fill="#4a505c"/></svg>`;
  $('pStrom').innerHTML = `<svg viewBox="0 0 100 220">
      <rect x="14" y="30" width="72" height="186" rx="16" fill="#30a46c"/><rect x="14" y="30" width="72" height="16" rx="8" fill="#24834f"/>
      <rect x="24" y="58" width="52" height="36" rx="5" fill="#1d2430"/><g id="stromBar">${[0,1,2,3].map(i => `<rect x="${30 + i*11}" y="66" width="8" height="20" rx="2" fill="#2f5a3c"/>`).join('')}</g>
      <circle cx="50" cy="132" r="22" fill="#fff"/><g transform="translate(50 132)">${LYN('#30a46c')}</g>
      <rect x="80" y="104" width="14" height="40" rx="4" fill="#9aa3ae"/>
      <rect x="4" y="206" width="92" height="14" rx="4" fill="#4a505c"/></svg>`;
  $('mBensin').innerHTML = `<svg viewBox="-50 -50 100 100"><path d="M-30 -10 L14 -22 Q24 -24 26 -14 L28 -6 L44 -12 L46 -4 L28 4 L22 26 Q20 34 12 32 L-26 22 Q-34 20 -32 12 Z" fill="#2a2a30"/><path d="M-10 6 Q0 26 16 14" stroke="#e5484d" stroke-width="5" fill="none"/><rect x="-24" y="-8" width="30" height="14" rx="4" fill="#e5484d"/></svg>`;
  $('mStrom').innerHTML = `<svg viewBox="-50 -50 100 100"><rect x="-26" y="-18" width="44" height="40" rx="10" fill="#2a2a30"/><rect x="18" y="-12" width="14" height="28" rx="4" fill="#30a46c"/><g fill="#c9ced6"><rect x="32" y="-6" width="10" height="5" rx="2"/><rect x="32" y="5" width="10" height="5" rx="2"/></g><g transform="translate(-4 2) scale(.7)">${LYN('#3ddc6f')}</g></svg>`;
  $('tak').innerHTML = `<rect x="-200" y="96" width="640" height="34" fill="#e5484d"/><rect x="-200" y="130" width="640" height="10" fill="#c73a3f"/>
    <g fill="#fff6c2"><rect x="0" y="140" width="80" height="6" rx="3"/><rect x="160" y="140" width="80" height="6" rx="3"/><rect x="320" y="140" width="80" height="6" rx="3"/></g>
    <rect x="-200" y="146" width="20" height="260" fill="#d9dee6"/><rect x="420" y="146" width="18" height="260" fill="#d9dee6"/>`;
  const MYNT = `<svg viewBox="-30 -30 60 60"><circle r="26" fill="#f5b82e" stroke="#d99a1c" stroke-width="4"/><circle r="17" fill="none" stroke="#d99a1c" stroke-width="3"/><path d="M-6 -8 L6 -8 M-6 0 L6 0 M0 -12 L0 12" stroke="#d99a1c" stroke-width="3" stroke-linecap="round"/></svg>`;
  const STJ = `<svg viewBox="0 0 100 100"><path d="M50 4 L60 40 L96 50 L60 60 L50 96 L40 60 L4 50 L40 40 Z" fill="#fff6b0" stroke="#ffd23f" stroke-width="4" stroke-linejoin="round"/></svg>`;

  // ---------- Layout ----------
  let W = 0, H = 0, bakke = 0, s = 1, carLeft = 0;
  const hvile = { bensin: [0, 0], strom: [0, 0] }, utlop = { bensin: [0, 0], strom: [0, 0] };
  function layout() {
    const r = scene.getBoundingClientRect(); W = r.width; H = r.height;
    // asfalten starter ved y=400 av 500 i bakgrunnen (slice, bunnjustert)
    const sk = Math.max(W / 1000, H / 500);
    bakke = H - 100 * sk + 22 * sk;
    const pumpH = Math.min(H * .5, W * .26), pumpW = pumpH * 100 / 220;
    const px1 = Math.max(10, W * .03);
    [['pBensin', px1], ['pStrom', px1 + pumpW * 1.25]].forEach(([id, x]) => {
      const el = $(id); el.style.left = x + 'px'; el.style.top = (bakke - pumpH) + 'px'; el.style.width = pumpW + 'px'; el.style.height = pumpH + 'px';
    });
    const pr = pumpW / 100;
    hvile.bensin = [px1 + 98 * pr, bakke - pumpH + 112 * pr]; utlop.bensin = [px1 + 50 * pr, bakke - pumpH + 200 * pr];
    const px2 = px1 + pumpW * 1.25;
    hvile.strom = [px2 + 94 * pr, bakke - pumpH + 116 * pr]; utlop.strom = [px2 + 50 * pr, bakke - pumpH + 200 * pr];
    carLeft = px2 + pumpW * 1.35;
    const cw = Math.min(W - carLeft - 16, H * .5 * 2);
    carbox.style.left = carLeft + 'px'; carbox.style.width = cw + 'px';
    carbox.style.top = (bakke + H * .06 - cw / 2) + 'px';
    s = cw / 400;
    ['mBensin', 'mStrom'].forEach(id => { $(id).style.width = $(id).style.height = Math.max(64, pumpW * .8) + 'px'; });
    if (!koblet.bensin && !drag) plasserMunn('bensin', ...hvile.bensin);
    if (!koblet.strom && !drag) plasserMunn('strom', ...hvile.strom);
    oppdaterLokk(); tegnSlanger();
  }

  // ---------- Lyd ----------
  let ac = null, fyllO = null, fyllG = null, stoyBuf = null;
  function startLyd() {
    if (ac) { if (ac.state === 'suspended') ac.resume(); return; }
    try {
      ac = Lyd.start(); if (!ac) return;
      stoyBuf = ac.createBuffer(1, ac.sampleRate, ac.sampleRate);
      const d = stoyBuf.getChannelData(0); for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
      fyllO = ac.createOscillator(); fyllO.type = 'sine'; fyllO.frequency.value = 120;
      fyllG = ac.createGain(); fyllG.gain.value = 0;
      fyllO.connect(fyllG).connect(ac.destination); fyllO.start();
    } catch (e) { ac = null; }
  }
  const klikk = () => { tone(900, 0, .05, 'square', .06); tone(500, .05, .08, 'square', .05); };
  const kaching = () => { tone(1568, 0, .15, 'square', .06); tone(2093, .08, .5, 'triangle', .12); tone(2637, .16, .5, 'sine', .08); };
  const motor = () => motorLyd(1.5, K.lyd === 'traktor');

  // ---------- Kjøretøy og behov ----------
  let kIdx = 0, K = KJORETOY_SPILL[0], behov = 'bensin', niva = 0, klar = false;
  const koblet = { bensin: false, strom: false };
  function byggBil() {
    const k = K;
    bilSvg.innerHTML = `${k.deler.map(d => `<path d="${d.d}" fill="${d.fill || 'var(--bil)'}"/>`).join('')}${tegnLakk(k)}
      <defs><clipPath id="karosseri">${k.deler.map(d => `<path d="${d.d}"/>`).join('')}</clipPath></defs>
      <g clip-path="url(#karosseri)">${k.skygge}<rect x="0" y="142" width="400" height="30" fill="#000" opacity=".1"/>
        ${k.ingenBue ? '' : k.hjul.map(([x,y,r]) => `<circle cx="${x}" cy="${y}" r="${r+8}" fill="#000" opacity=".28"/>`).join('')}</g>
      ${k.detaljer}${tegnMerker(k)}${k.hjul.map(h => hjulMarkup(h, k)).join('')}`;
    bilSvg.style.setProperty('--bil', k.farger[0]);
  }
  const lokkPx = () => { const t = K.anker.tank; const r = bilSvg.getBoundingClientRect(), sr = scene.getBoundingClientRect(); return [r.left - sr.left + t[0] * s, r.top - sr.top + t[1] * s]; };
  function oppdaterLokk() {
    if (!klar) { $('lokk').style.display = 'none'; $('maler').style.opacity = 0; return; }
    const [x, y] = lokkPx(), d = Math.max(54, 34 * s * 1.6);
    const l = $('lokk'); l.style.display = ''; l.style.left = x + 'px'; l.style.top = y + 'px'; l.style.width = l.style.height = d + 'px';
    const m = $('maler'); m.style.opacity = 1;
    const r = bilSvg.getBoundingClientRect(), sr = scene.getBoundingClientRect();
    m.style.left = (r.left - sr.left + r.width / 2) + 'px'; m.style.top = (r.top - sr.top + 10 * s) + 'px';
    m.style.width = Math.max(110, r.width * .3) + 'px'; m.style.height = Math.max(70, r.width * .2) + 'px';
  }
  function tegnLokk() {
    const f = behov === 'bensin' ? '#e5484d' : '#30a46c';
    $('lokk').innerHTML = koblet[behov] ? '' : `<svg viewBox="-40 -40 80 80"><circle class="ring" r="30" fill="none" stroke="${f}" stroke-width="5"/><circle r="20" fill="#fff" stroke="${f}" stroke-width="4"/><g transform="scale(.75)">${behov === 'bensin' ? DRAPE(f) : LYN(f)}</g></svg>`;
  }
  function tegnMaler() {
    const m = $('maler');
    if (behov === 'bensin') {
      const v = -60 + 120 * niva;
      m.innerHTML = `<svg viewBox="-60 -50 120 66"><path d="M-50 10 A50 50 0 0 1 50 10 Z" fill="#fff" stroke="#2a2a30" stroke-width="4" stroke-linejoin="round"/>
        <path d="M-39.1 1.7 A40 40 0 0 1 -26.8 -19.7" stroke="#e5484d" stroke-width="7" fill="none"/>
        <path d="M26.8 -19.7 A40 40 0 0 1 39.1 1.7" stroke="#3ddc6f" stroke-width="7" fill="none"/>
        <g transform="rotate(${v} 0 10)"><line x1="0" y1="10" x2="0" y2="-24" stroke="#2a2a30" stroke-width="5" stroke-linecap="round"/></g><circle cy="10" r="6" fill="#2a2a30"/>
        <g transform="translate(0 -18) scale(.42)">${DRAPE('#9aa3ae')}</g></svg>`;
    } else {
      const n = Math.round(niva * 5);
      m.innerHTML = `<svg viewBox="-60 -40 120 60"><rect x="-50" y="-30" width="92" height="46" rx="8" fill="#fff" stroke="#2a2a30" stroke-width="4"/><rect x="42" y="-16" width="10" height="18" rx="3" fill="#2a2a30"/>
        ${[0,1,2,3,4].map(i => `<rect x="${-44 + i*17}" y="-24" width="13" height="34" rx="3" fill="${i < n ? (n < 2 ? '#f5b82e' : '#3ddc6f') : '#e6eaf0'}"/>`).join('')}</svg>`;
    }
  }

  // ---------- Munnstykker og slanger ----------
  function plasserMunn(type, x, y) { const m = $(type === 'bensin' ? 'mBensin' : 'mStrom'); m.dataset.x = x; m.dataset.y = y; m.style.left = x + 'px'; m.style.top = y + 'px'; tegnSlanger(); }
  function tegnSlanger() {
    [['bensin', 'slangeB', 'mBensin'], ['strom', 'slangeS', 'mStrom']].forEach(([t, sid, mid]) => {
      const m = $(mid), [x0, y0] = utlop[t];
      const x1 = parseFloat(m.style.left), y1 = parseFloat(m.style.top) + 10;
      const sag = Math.max(40, Math.hypot(x1 - x0, y1 - y0) * .35);
      $(sid).setAttribute('d', `M${x0} ${y0} C${x0} ${y0 + sag} ${x1 - 20} ${y1 + sag} ${x1} ${y1}`);
    });
  }
  // følg munnstykket under hjem-animasjonen
  (function slangeLoop() { const b = $('mBensin').getBoundingClientRect(), st = $('mStrom').getBoundingClientRect(), sr = scene.getBoundingClientRect();
    if ($('mBensin').classList.contains('hjem') || $('mStrom').classList.contains('hjem')) {
      [['bensin', 'slangeB', b], ['strom', 'slangeS', st]].forEach(([t, sid, r]) => { const [x0, y0] = utlop[t], x1 = r.left - sr.left + r.width / 2, y1 = r.top - sr.top + r.height / 2 + 10, sag = Math.max(40, Math.hypot(x1 - x0, y1 - y0) * .35); $(sid).setAttribute('d', `M${x0} ${y0} C${x0} ${y0 + sag} ${x1 - 20} ${y1 + sag} ${x1} ${y1}`); });
    }
    requestAnimationFrame(slangeLoop); })();

  let drag = null, fyller = false;
  function hjem(type) {
    const m = $(type === 'bensin' ? 'mBensin' : 'mStrom');
    koblet[type] = false; m.classList.remove('trykk', 'vent');
    m.classList.add('hjem'); plasserMunn(type, ...hvile[type]);
    setTimeout(() => { m.classList.remove('hjem'); tegnSlanger(); }, 520);
  }
  ['bensin', 'strom'].forEach(type => {
    const m = $(type === 'bensin' ? 'mBensin' : 'mStrom');
    m.addEventListener('pointerdown', e => {
      e.preventDefault(); startLyd(); m.setPointerCapture?.(e.pointerId);
      if (koblet[type]) return;
      if (!klar) return;
      drag = { type, m, dx: parseFloat(m.style.left) - e.clientX, dy: parseFloat(m.style.top) - e.clientY };
      m.classList.remove('hjem'); klikk();
    });
    m.addEventListener('pointermove', e => { if (drag && drag.m === m) plasserMunn(type, e.clientX + drag.dx, e.clientY + drag.dy); });
    const slipp = () => {
      if (!drag || drag.m !== m) return;
      drag = null;
      const [lx, ly] = lokkPx();
      const avst = Math.hypot(parseFloat(m.style.left) - lx, parseFloat(m.style.top) - ly);
      if (avst < Math.max(70, 60 * s) && klar) {
        if (type === behov) {
          koblet[type] = true; plasserMunn(type, lx, ly); tegnLokk(); klikk(); tone(700, .05, .1, 'sine', .1);
          setTimeout(() => visKontroll(type), 250);
        } else {
          $('lokk').classList.remove('nei'); void $('lokk').offsetWidth; $('lokk').classList.add('nei');
          tone(260, 0, .3, 'sine', .12, 200); hjem(type);
        }
      } else hjem(type);
    };
    m.addEventListener('pointerup', slipp); m.addEventListener('pointercancel', slipp);
  });

  // ---------- Påfylling: pump spaken opp og ned (bensin) eller sveiv rundt (strøm) ----------
  let teller = 0, aktivitet = 0;
  const kontroll = $('kontroll');
  const PUMPE = `<svg viewBox="0 0 220 320">
      <rect x="20" y="20" width="180" height="290" rx="30" fill="#fff" opacity=".85"/>
      <g class="pil" fill="#e5484d"><path d="M196 110 l-14 -18 l-14 18 z"/><path d="M196 170 l-14 18 l-14 -18 z"/></g>
      <g id="spak"><rect x="104" y="60" width="12" height="150" fill="#9aa3ae"/><rect x="104" y="60" width="4" height="150" fill="#fff" opacity=".5"/>
        <rect x="36" y="44" width="148" height="28" rx="14" fill="#2a2a30"/><rect x="36" y="44" width="34" height="28" rx="14" fill="#e5484d"/><rect x="150" y="44" width="34" height="28" rx="14" fill="#e5484d"/></g>
      <rect x="76" y="196" width="68" height="104" rx="12" fill="#e5484d"/><rect x="70" y="190" width="80" height="16" rx="7" fill="#c73a3f"/>
      <rect x="66" y="290" width="88" height="12" rx="5" fill="#4a505c"/>
      <g transform="translate(110 252)">${DRAPE('#fff')}</g>
    </svg>`;
  const SVEIV = `<svg viewBox="-110 -110 220 220">
      <circle r="104" fill="#fff" opacity=".85"/>
      <g class="pil" fill="none" stroke="#30a46c" stroke-width="6" stroke-linecap="round"><path d="M-70 -70 A99 99 0 0 1 70 -70"/><path d="M58 -82 L72 -70 L54 -60" /></g>
      <g class="lyn" id="lynene">${[[-92,10,-20],[88,24,20],[0,98,0]].map(([x,y,r]) => `<g transform="translate(${x} ${y}) rotate(${r}) scale(.8)">${LYN('#ffcf3f')}</g>`).join('')}</g>
      <circle r="80" fill="#30a46c"/><circle r="70" fill="#24834f"/>
      <g id="hjulet">${[0,60,120,180,240,300].map(a => `<rect x="-5" y="-68" width="10" height="68" rx="4" fill="#3ddc6f" transform="rotate(${a})"/>`).join('')}
        <circle cx="0" cy="-60" r="18" fill="#ffcf3f" stroke="#d99a1c" stroke-width="4"/></g>
      <circle r="16" fill="#c9ced6"/><g transform="scale(.6)">${LYN('#30a46c')}</g>
    </svg>`;
  let spakY = 0, vinkel = 0, kDrag = null;
  function visKontroll(type) {
    const pB = $('pBensin').getBoundingClientRect(), pS = $('pStrom').getBoundingClientRect(), sr = scene.getBoundingClientRect();
    const midt = (pB.left + pS.right) / 2 - sr.left;
    const str = Math.min(H * .6, W * .5);
    kontroll.innerHTML = type === 'bensin' ? PUMPE : SVEIV;
    kontroll.style.width = (type === 'bensin' ? str * 220 / 320 : str) + 'px'; kontroll.style.height = str + 'px';
    kontroll.style.left = Math.max(str / 2 + 6, midt) + 'px'; kontroll.style.top = Math.max(str / 2 + 6, bakke - str / 2 - H * .05) + 'px';
    spakY = 0; vinkel = 0; tegnKontroll();
    kontroll.classList.add('vis'); tone(520, 0, .1, 'sine', .1, 780);
  }
  function skjulKontroll() { kontroll.classList.remove('vis'); kDrag = null; }
  function tegnKontroll() {
    const sp = kontroll.querySelector('#spak'); if (sp) sp.setAttribute('transform', `translate(0 ${spakY})`);
    const hj = kontroll.querySelector('#hjulet'); if (hj) hj.setAttribute('transform', `rotate(${vinkel * 180 / Math.PI})`);
  }
  function fyll(mengde) {
    if (niva >= 1) return;
    niva = Math.min(1, niva + mengde);
    aktivitet = Math.min(1, aktivitet + mengde * 25);
    if (behov === 'bensin') { teller += mengde * 600; $('tellerB').textContent = String(Math.floor(teller) % 1000).padStart(3, '0'); }
    tegnMaler();
    if (niva >= 1) fullt();
  }
  kontroll.addEventListener('pointerdown', e => {
    e.preventDefault(); startLyd(); kontroll.setPointerCapture?.(e.pointerId);
    const r = kontroll.getBoundingClientRect();
    kDrag = { y0: e.clientY, spak0: spakY, skala: 320 / r.height, cx: r.left + r.width / 2, cy: r.top + r.height / 2, a: null };
    kDrag.a = Math.atan2(e.clientY - kDrag.cy, e.clientX - kDrag.cx);
    kontroll.querySelectorAll('.pil').forEach(p => p.style.display = 'none');
  });
  kontroll.addEventListener('pointermove', e => {
    if (!kDrag || niva >= 1) return;
    if (behov === 'bensin') {
      const ny = Math.max(0, Math.min(100, kDrag.spak0 + (e.clientY - kDrag.y0) * kDrag.skala));
      const d = ny - spakY;
      if (d > 0) {                                        // nedtrykk pumper bensin
        fyll(d / 100 * .13);
        if (ny >= 95 && spakY < 95) { tone(80, 0, .18, 'sine', .3); tone(140, .05, .2, 'sine', .2, 90); }
      } else if (d < -2 && Math.random() < .3) sus_(0, .08, 3000, .05);
      spakY = ny;
    } else {
      const a = Math.atan2(e.clientY - kDrag.cy, e.clientX - kDrag.cx);
      let d = a - kDrag.a; if (d > Math.PI) d -= 2 * Math.PI; if (d < -Math.PI) d += 2 * Math.PI;
      kDrag.a = a; vinkel += d;
      fyll(Math.abs(d) / (2 * Math.PI) * .22);
      const ly = kontroll.querySelector('#lynene'); if (ly) ly.style.opacity = Math.min(1, aktivitet * 1.5);
      if (Math.abs(d) > .08 && Math.random() < .15) tone(1800 + Math.random() * 1200, 0, .04, 'square', .03);
    }
    tegnKontroll();
  });
  const kSlipp = () => { kDrag = null; };
  kontroll.addEventListener('pointerup', kSlipp); kontroll.addEventListener('pointercancel', kSlipp);
  function sus_(t0, dur, freq, vol) {
    if (!ac) return;
    const src = ac.createBufferSource(), f = ac.createBiquadFilter(), g = ac.createGain();
    src.buffer = stoyBuf; f.type = 'bandpass'; f.frequency.value = freq;
    g.gain.setValueAtTime(vol, ac.currentTime + t0); g.gain.exponentialRampToValueAtTime(.001, ac.currentTime + t0 + dur);
    src.connect(f).connect(g).connect(ac.destination); src.start(ac.currentTime + t0); src.stop(ac.currentTime + t0 + dur + .05);
  }
  function tikk() {
    aktivitet *= .9;
    if (behov === 'strom') {
      const ly = kontroll.querySelector('#lynene'); if (ly && !kDrag) ly.style.opacity = Math.min(1, aktivitet * 1.5);
      $('stromBar').querySelectorAll('rect').forEach((r, i) => r.setAttribute('fill', aktivitet > .1 && (Math.floor(performance.now() / 150) % 4) === i ? '#3ddc6f' : '#2f5a3c'));
    }
    if (fyllG) {
      fyllG.gain.setTargetAtTime(Math.min(.14, aktivitet * .3), ac.currentTime, .03);
      fyllO.type = behov === 'bensin' ? 'sine' : 'triangle';
      fyllO.frequency.setTargetAtTime(behov === 'bensin' ? 100 + 40 * Math.sin(performance.now() / 50) + niva * 60 : 150 + aktivitet * 400 + niva * 200, ac.currentTime, .02);
    }
    requestAnimationFrame(tikk);
  }

  function fullt() {
    aktivitet = 0; setTimeout(skjulKontroll, 350);
    tone(1319, 0, .2, 'sine', .14); tone(1760, .2, .4, 'sine', .14);
    setTimeout(() => hjem(behov), 500);
    $('stromBar').querySelectorAll('rect').forEach(r => r.setAttribute('fill', '#2f5a3c'));
    // mynt å betale med
    setTimeout(() => {
      const r = bilSvg.getBoundingClientRect(), sr = scene.getBoundingClientRect();
      const m = document.createElement('div'); m.className = 'mynt'; m.innerHTML = MYNT;
      const d = Math.max(64, r.width * .14);
      m.style.width = m.style.height = d + 'px';
      m.style.left = (r.left - sr.left + r.width * .55) + 'px'; m.style.top = (r.top - sr.top + r.height * .3) + 'px';
      scene.appendChild(m);
      tone(880, 0, .1, 'sine', .08);
      m.addEventListener('pointerdown', e => {
        e.preventDefault(); startLyd(); kaching();
        const p = $('pBensin').getBoundingClientRect();
        m.style.animation = 'none'; m.style.transition = 'left .6s ease-in, top .6s ease-in, opacity .6s, transform .6s';
        m.style.left = (p.left - sr.left + p.width / 2) + 'px'; m.style.top = (p.top - sr.top + p.height * .3) + 'px'; m.style.opacity = 0; m.style.transform = 'translate(-50%,-50%) scale(.4)';
        setTimeout(() => m.remove(), 650);
        stjerner(r.left - sr.left + r.width / 2, r.top - sr.top + r.height * .4);
        setTimeout(kjorUt, 900);
      }, { once: true });
    }, 900);
  }
  function stjerner(px, py, n = 7) {
    jingle();
    for (let i = 0; i < n; i++) setTimeout(() => {
      const st = document.createElement('div'); st.className = 'stjerne'; st.innerHTML = STJ;
      st.style.left = (px + (Math.random() - .5) * 200) + 'px'; st.style.top = (py + (Math.random() - .5) * 100) + 'px';
      scene.appendChild(st); setTimeout(() => st.remove(), 1300);
    }, i * 110);
  }

  // ---------- Inn og ut ----------
  function kjorUt() {
    klar = false; oppdaterLokk();
    setTimeout(() => (LYDER[K.lyd] || LYDER.tut)(), 100);
    setTimeout(() => {
      bilSvg.classList.add('kjorer'); carbox.classList.add('ut'); motor();
      carbox.style.transform = `translateX(${W}px)`;
      setTimeout(() => { kIdx = (kIdx + 1) % KJORETOY_SPILL.length; K = KJORETOY_SPILL[kIdx]; kjorInn(); }, 1600);
    }, 900);
  }
  function kjorInn() {
    behov = ['traktor', 'gravemaskin', 'brannbil', 'søppelbil'].includes(K.navn) ? 'bensin' : (Math.random() < .5 ? 'bensin' : 'strom');
    niva = .05 + Math.random() * .1; teller = 0; $('tellerB').textContent = '000';
    byggBil(); tegnMaler(); tegnLokk();
    carbox.classList.remove('ut');
    carbox.style.transition = 'none'; carbox.style.transform = `translateX(${-W}px)`;
    carbox.offsetWidth;
    carbox.style.transition = ''; carbox.style.transform = 'translateX(0)';
    bilSvg.classList.add('kjorer'); motor();
    setTimeout(() => { bilSvg.classList.remove('kjorer'); klar = true; oppdaterLokk(); }, 1650);
  }

  layout(); window.addEventListener('resize', layout);
  kjorInn();
  requestAnimationFrame(tikk);
})();
  },
});
