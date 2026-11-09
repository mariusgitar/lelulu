// Bilspill-modul: verksted
Bilspill.modul('verksted', {
  css: "\n  * { box-sizing: border-box; -webkit-tap-highlight-color: transparent; }\n  :root { --vt: 150px; }\n  @media (max-height: 520px) { :root { --vt: 104px; } .knapp { width: 80px !important; height: 80px !important; padding: 10px !important; } }\n  html, body { margin: 0; height: 100%; overflow: hidden; touch-action: none; user-select: none; -webkit-user-select: none; font-family: system-ui, sans-serif; }\n  body { background: #3a3f4a; display: flex; flex-direction: column; }\n\n  .scene { position: relative; flex: 1; overflow: hidden; }\n  .vegg { position: absolute; left: 0; top: 0; width: 100%; height: 78%; pointer-events: none; }\n  .gulv { position: absolute; left: 0; bottom: 0; width: 100%; height: 22%; pointer-events: none; }\n  .carbox { position: absolute; left: 50%; bottom: 7%; transform: translateX(-50%); width: 300px; aspect-ratio: 2 / 1; }\n  .loftlag { position: absolute; left: -8%; width: 116%; top: -30%; height: 130%; overflow: visible; pointer-events: none; }\n  .armer { transition: transform .9s cubic-bezier(.4,0,.2,1); }\n  .loftet .armer { transform: translateY(-14px); }\n  .shadow { position: absolute; left: 6%; right: 6%; bottom: 0; height: 6%; border-radius: 50%; background: rgba(0,0,0,.25); filter: blur(4px); }\n  .bil { position: absolute; inset: 0; transition: transform 1.6s cubic-bezier(.2,.7,.3,1); }\n  .bil.ut { transition: transform 1.5s cubic-bezier(.6,0,.9,.5); }\n  .loft { position: absolute; inset: 0; transition: transform .9s cubic-bezier(.4,0,.2,1); }\n  .loftet .loft { transform: translateY(-7%); }\n  .tilt { position: absolute; inset: 0; transform-origin: 50% 95%; transition: transform .5s cubic-bezier(.3,1.6,.5,1); }\n  .tilt svg { position: absolute; inset: 0; width: 100%; height: 100%; overflow: visible; }\n\n  .hjul { transform-box: fill-box; transform-origin: center; }\n  .kjorer .hjul { animation: spinn .35s linear infinite; }\n  @keyframes spinn { to { transform: rotate(360deg); } }\n  .flat { transition: transform .55s cubic-bezier(.3,1.8,.5,1); }\n  .kjorer .blink { animation: blink .35s steps(2) infinite; }\n  @keyframes blink { 50% { opacity: .25; } }\n  .glint { transform: translateX(-200px); }\n  .skinn .glint { animation: glint 1.1s ease-in-out 2; }\n  @keyframes glint { from { transform: translateX(-200px); } to { transform: translateX(520px); } }\n\n  .markor { fill: none; stroke: #ff9f1c; stroke-width: 4; stroke-dasharray: 10 7; transform-box: fill-box; transform-origin: center; animation: mark 1.4s ease-in-out infinite; }\n  @keyframes mark { 0%,100% { transform: scale(1) rotate(0); opacity: .9; } 50% { transform: scale(1.12) rotate(20deg); opacity: .55; } }\n  .nei { animation: nei .45s ease-in-out; transform-box: fill-box; transform-origin: center; }\n  @keyframes nei { 20%,60% { transform: translateX(-6px); } 40%,80% { transform: translateX(6px); } }\n  .glod { transform-box: fill-box; transform-origin: center; animation: glod 1s ease-out 2; }\n  @keyframes glod { 0% { opacity: 0; transform: scale(.4); } 40% { opacity: .9; } 100% { opacity: 0; transform: scale(2.2); } }\n  .bank { transform-box: fill-box; transform-origin: 85% 85%; animation: bank .28s ease-in 3; }\n  @keyframes bank { 0% { transform: rotate(-40deg); } 70% { transform: rotate(8deg); } 100% { transform: rotate(-40deg); } }\n  .markor.forsvinn { animation: none; }\n  .nal { transition: transform 1.3s cubic-bezier(.4,0,.2,1); }\n  .forsvinn { transition: opacity .4s, transform .4s; opacity: 0; transform: scale(.6); transform-box: fill-box; transform-origin: center; }\n\n  .lys-rod { fill: #ff4d4f; } .lys-gronn { fill: #2f5a3c; }\n  .klar .lys-rod { fill: #5a2f30; } .klar .lys-gronn { fill: #3ddc6f; }\n  .stjerne { position: absolute; width: 9%; pointer-events: none; animation: glitre 1.2s ease-out forwards; transform: translate(-50%,-50%); }\n  @keyframes glitre { 0% { transform: translate(-50%,-50%) scale(0) rotate(0); opacity: 0; } 30% { opacity: 1; transform: translate(-50%,-50%) scale(1.1) rotate(40deg); } 100% { transform: translate(-50%,-50%) scale(0) rotate(120deg); opacity: 0; } }\n\n  .verktoy { height: var(--vt); display: flex; gap: 4vw; justify-content: center; align-items: center; padding-bottom: env(safe-area-inset-bottom); background: #4a505c; box-shadow: inset 0 6px 0 #353a44; }\n  .knapp { width: 104px; height: 104px; border-radius: 26px; border: none; background: #f2f4f7; box-shadow: 0 6px 0 rgba(0,0,0,.3); display: grid; place-items: center; padding: 12px; transition: transform .2s, box-shadow .2s; touch-action: none; }\n  .knapp svg { width: 100%; height: 100%; pointer-events: none; }\n  .knapp.aktiv { box-shadow: 0 0 0 6px #ffcf3f, 0 6px 0 rgba(0,0,0,.3); transform: scale(1.06); }\n  .spokelse { position: fixed; width: 96px; height: 96px; pointer-events: none; transform: translate(-50%, -60%) rotate(-8deg); z-index: 5; filter: drop-shadow(0 8px 6px rgba(0,0,0,.3)); }\n  .spokelse.tilbake { transition: left .35s ease-in, top .35s ease-in, opacity .35s; opacity: 0; }\n",
  html: "\n<div class=\"scene\" id=\"scene\">\n  <svg class=\"vegg\" viewBox=\"0 0 1200 500\" preserveAspectRatio=\"xMidYMax slice\">\n    <defs>\n      <pattern id=\"hull\" width=\"24\" height=\"24\" patternUnits=\"userSpaceOnUse\"><rect width=\"24\" height=\"24\" fill=\"#e7d3ad\"/><circle cx=\"12\" cy=\"12\" r=\"2.6\" fill=\"#c9b18a\"/></pattern>\n      <pattern id=\"mur\" width=\"80\" height=\"40\" patternUnits=\"userSpaceOnUse\"><rect width=\"80\" height=\"40\" fill=\"#d9dee6\"/><rect x=\"2\" y=\"2\" width=\"76\" height=\"17\" rx=\"2\" fill=\"#e6eaf0\"/><rect x=\"-38\" y=\"21\" width=\"76\" height=\"17\" rx=\"2\" fill=\"#e6eaf0\"/><rect x=\"42\" y=\"21\" width=\"76\" height=\"17\" rx=\"2\" fill=\"#e6eaf0\"/></pattern>\n      <pattern id=\"fare\" width=\"28\" height=\"28\" patternUnits=\"userSpaceOnUse\" patternTransform=\"rotate(45)\"><rect width=\"28\" height=\"28\" fill=\"#ffcf3f\"/><rect width=\"14\" height=\"28\" fill=\"#2a2a30\"/></pattern>\n      <linearGradient id=\"himmel\" x1=\"0\" y1=\"0\" x2=\"0\" y2=\"1\"><stop offset=\"0\" stop-color=\"#8fd0ff\"/><stop offset=\"1\" stop-color=\"#d9f1ff\"/></linearGradient>\n    </defs>\n    <rect width=\"1200\" height=\"500\" fill=\"url(#mur)\"/>\n    <!-- tak -->\n    <rect width=\"1200\" height=\"70\" fill=\"#4a505c\"/><rect y=\"70\" width=\"1200\" height=\"10\" fill=\"#353a44\"/>\n    <g fill=\"#fff8d6\"><rect x=\"300\" y=\"80\" width=\"120\" height=\"10\" rx=\"5\"/><rect x=\"540\" y=\"80\" width=\"120\" height=\"10\" rx=\"5\"/><rect x=\"780\" y=\"80\" width=\"120\" height=\"10\" rx=\"5\"/></g>\n    <!-- verktøytavle -->\n    <g transform=\"translate(178 196) scale(.62)\">\n      <rect width=\"300\" height=\"170\" rx=\"10\" fill=\"#b8956a\"/><rect x=\"8\" y=\"8\" width=\"284\" height=\"154\" rx=\"6\" fill=\"url(#hull)\"/>\n      <g fill=\"#7d8796\">\n        <path d=\"M40 30 l14 0 l0 90 l-14 0 z M30 20 q17 -16 34 0 l-8 14 l-18 0 z\"/>\n        <rect x=\"90\" y=\"30\" width=\"10\" height=\"90\" rx=\"4\" fill=\"#8b5a2b\"/><rect x=\"74\" y=\"24\" width=\"42\" height=\"18\" rx=\"4\"/>\n        <rect x=\"140\" y=\"62\" width=\"8\" height=\"64\" rx=\"3\"/><rect x=\"134\" y=\"26\" width=\"20\" height=\"40\" rx=\"6\" fill=\"#e5484d\"/>\n        <path d=\"M190 30 a26 26 0 1 1 0.1 0 m0 12 a14 14 0 1 0 0.1 0\" fill=\"#30a46c\" fill-rule=\"evenodd\"/>\n        <rect x=\"236\" y=\"30\" width=\"12\" height=\"60\" rx=\"3\"/><rect x=\"230\" y=\"86\" width=\"24\" height=\"34\" rx=\"6\" fill=\"#3e8ef7\"/>\n      </g>\n    </g>\n    <!-- verktøyskap -->\n    <g transform=\"translate(900 330) scale(.9)\">\n      <rect width=\"130\" height=\"160\" rx=\"8\" fill=\"#e5484d\"/>\n      <g fill=\"#c73a3f\"><rect x=\"10\" y=\"12\" width=\"110\" height=\"30\" rx=\"4\"/><rect x=\"10\" y=\"50\" width=\"110\" height=\"30\" rx=\"4\"/><rect x=\"10\" y=\"88\" width=\"110\" height=\"30\" rx=\"4\"/><rect x=\"10\" y=\"126\" width=\"110\" height=\"26\" rx=\"4\"/></g>\n      <g fill=\"#f2f4f7\"><rect x=\"50\" y=\"24\" width=\"30\" height=\"6\" rx=\"3\"/><rect x=\"50\" y=\"62\" width=\"30\" height=\"6\" rx=\"3\"/><rect x=\"50\" y=\"100\" width=\"30\" height=\"6\" rx=\"3\"/><rect x=\"50\" y=\"136\" width=\"30\" height=\"6\" rx=\"3\"/></g>\n    </g>\n    <!-- dekkstabel -->\n    <g transform=\"translate(200 410)\">\n      <rect x=\"0\" y=\"0\" width=\"90\" height=\"30\" rx=\"14\" fill=\"#2a2a30\"/><rect x=\"0\" y=\"30\" width=\"90\" height=\"30\" rx=\"14\" fill=\"#33333a\"/><rect x=\"0\" y=\"60\" width=\"90\" height=\"30\" rx=\"14\" fill=\"#2a2a30\"/>\n      <g fill=\"#555a66\"><rect x=\"30\" y=\"6\" width=\"30\" height=\"18\" rx=\"8\"/><rect x=\"30\" y=\"36\" width=\"30\" height=\"18\" rx=\"8\"/><rect x=\"30\" y=\"66\" width=\"30\" height=\"18\" rx=\"8\"/></g>\n    </g>\n    <!-- skilt: skiftenøkkel -->\n    <g transform=\"translate(560 196) scale(.8)\">\n      <rect width=\"96\" height=\"70\" rx=\"14\" fill=\"#ffcf3f\"/><rect x=\"5\" y=\"5\" width=\"86\" height=\"60\" rx=\"10\" fill=\"none\" stroke=\"#2a2a30\" stroke-width=\"3\" opacity=\".5\"/>\n      <g transform=\"translate(48 35) rotate(-40)\"><rect x=\"-5\" y=\"-24\" width=\"10\" height=\"40\" rx=\"4\" fill=\"#2a2a30\"/><path d=\"M-13 -24 a13 13 0 1 1 26 0 l-6 4 l0 -9 l-14 0 l0 9 z\" fill=\"#2a2a30\"/></g>\n    </g>\n    <!-- porter -->\n    <g>\n      <rect x=\"0\" y=\"150\" width=\"150\" height=\"350\" fill=\"url(#himmel)\"/>\n      <circle cx=\"40\" cy=\"250\" r=\"34\" fill=\"#fff\"/><circle cx=\"80\" cy=\"245\" r=\"26\" fill=\"#fff\"/>\n      <path d=\"M0 470 Q60 420 150 455 L150 500 L0 500 Z\" fill=\"#7fcf86\"/>\n      <rect x=\"150\" y=\"130\" width=\"22\" height=\"370\" fill=\"url(#fare)\"/><rect x=\"0\" y=\"130\" width=\"172\" height=\"22\" fill=\"url(#fare)\"/>\n    </g>\n    <g transform=\"translate(1200 0) scale(-1 1)\">\n      <rect x=\"0\" y=\"150\" width=\"150\" height=\"350\" fill=\"url(#himmel)\"/>\n      <circle cx=\"60\" cy=\"230\" r=\"28\" fill=\"#fff\"/><circle cx=\"96\" cy=\"236\" r=\"20\" fill=\"#fff\"/>\n      <path d=\"M0 460 Q80 430 150 465 L150 500 L0 500 Z\" fill=\"#7fcf86\"/>\n      <circle cx=\"40\" cy=\"430\" r=\"26\" fill=\"#4fae5c\"/><rect x=\"36\" y=\"440\" width=\"8\" height=\"40\" fill=\"#8b5a2b\"/>\n      <rect x=\"150\" y=\"130\" width=\"22\" height=\"370\" fill=\"url(#fare)\"/><rect x=\"0\" y=\"130\" width=\"172\" height=\"22\" fill=\"url(#fare)\"/>\n    </g>\n  </svg>\n  <svg class=\"gulv\" viewBox=\"0 0 1200 140\" preserveAspectRatio=\"xMidYMin slice\">\n    <defs><pattern id=\"fare2\" width=\"28\" height=\"28\" patternUnits=\"userSpaceOnUse\" patternTransform=\"rotate(45)\"><rect width=\"28\" height=\"28\" fill=\"#ffcf3f\"/><rect width=\"14\" height=\"28\" fill=\"#2a2a30\"/></pattern></defs>\n    <rect width=\"1200\" height=\"140\" fill=\"#9aa3ae\"/><rect width=\"1200\" height=\"10\" fill=\"url(#fare2)\"/>\n    <ellipse cx=\"420\" cy=\"90\" rx=\"60\" ry=\"10\" fill=\"#7d8692\" opacity=\".7\"/><ellipse cx=\"760\" cy=\"112\" rx=\"34\" ry=\"6\" fill=\"#7d8692\" opacity=\".6\"/>\n    <g fill=\"#ffcf3f\" opacity=\".8\"><rect x=\"0\" y=\"60\" width=\"1200\" height=\"4\"/></g>\n  </svg>\n\n  <div class=\"carbox\" id=\"carbox\">\n    <svg class=\"loftlag\" viewBox=\"-32 -60 464 260\">\n      <!-- billøft: to stolper -->\n      <rect x=\"-28\" y=\"-40\" width=\"20\" height=\"234\" rx=\"4\" fill=\"#e5484d\"/><rect x=\"-28\" y=\"-40\" width=\"6\" height=\"234\" fill=\"#fff\" opacity=\".3\"/>\n      <rect x=\"408\" y=\"-40\" width=\"20\" height=\"234\" rx=\"4\" fill=\"#e5484d\"/><rect x=\"408\" y=\"-40\" width=\"6\" height=\"234\" fill=\"#fff\" opacity=\".3\"/>\n      <rect x=\"-34\" y=\"186\" width=\"32\" height=\"8\" rx=\"3\" fill=\"#4a505c\"/><rect x=\"402\" y=\"186\" width=\"32\" height=\"8\" rx=\"3\" fill=\"#4a505c\"/>\n      <rect x=\"-34\" y=\"-48\" width=\"468\" height=\"14\" rx=\"6\" fill=\"#c73a3f\"/>\n      <g>\n        <rect x=\"402\" y=\"-26\" width=\"32\" height=\"56\" rx=\"8\" fill=\"#2a2a30\"/>\n        <circle class=\"lys-rod\" cx=\"418\" cy=\"-12\" r=\"9\"/><circle class=\"lys-gronn\" cx=\"418\" cy=\"14\" r=\"9\"/>\n      </g>\n    </svg>\n    <div class=\"shadow\"></div>\n    <svg class=\"loftlag\" viewBox=\"-32 -60 464 260\" style=\"z-index:1\">\n      <g class=\"armer\">\n        <rect x=\"-10\" y=\"186\" width=\"70\" height=\"7\" rx=\"3\" fill=\"#7d8796\"/><rect x=\"340\" y=\"186\" width=\"70\" height=\"7\" rx=\"3\" fill=\"#7d8796\"/>\n        <rect x=\"52\" y=\"182\" width=\"16\" height=\"6\" rx=\"2\" fill=\"#2a2a30\"/><rect x=\"332\" y=\"182\" width=\"16\" height=\"6\" rx=\"2\" fill=\"#2a2a30\"/>\n      </g>\n    </svg>\n    <div class=\"bil\" id=\"bil\" style=\"z-index:2\">\n      <div class=\"loft\"><div class=\"tilt\" id=\"tilt\">\n        <svg viewBox=\"0 0 400 200\" id=\"bilSvg\"></svg>\n        <svg viewBox=\"0 0 400 200\" id=\"feilSvg\"></svg>\n      </div></div>\n    </div>\n  </div>\n</div>\n\n<div class=\"verktoy\" id=\"verktoy\"></div>\n\n",
  start() {
(() => {

  // ankerpunkter for feil, per kjøretøy (eget koordinatsystem 400x200)

  // ---------- Ikoner ----------
  const IKON = {
    dekk: `<svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="42" fill="#2a2a30"/><circle cx="50" cy="50" r="24" fill="#c9ced6"/>${[0,72,144,216,288].map(a => `<line x1="50" y1="50" x2="${(50+20*Math.cos(a*Math.PI/180)).toFixed(1)}" y2="${(50+20*Math.sin(a*Math.PI/180)).toFixed(1)}" stroke="#8a919c" stroke-width="6" stroke-linecap="round"/>`).join('')}<circle cx="50" cy="50" r="7" fill="#6b727d"/><path d="M22 26 a38 38 0 0 1 20 -14" stroke="#555a66" stroke-width="5" fill="none" stroke-linecap="round"/></svg>`,
    lys: `<svg viewBox="0 0 100 100"><circle cx="50" cy="40" r="28" fill="#ffe680"/><circle cx="42" cy="32" r="8" fill="#fff" opacity=".8"/><rect x="36" y="64" width="28" height="12" rx="3" fill="#9aa3ae"/><rect x="36" y="76" width="28" height="8" rx="3" fill="#7d8796"/><rect x="42" y="84" width="16" height="8" rx="4" fill="#4a505c"/><g stroke="#ffcf3f" stroke-width="5" stroke-linecap="round"><line x1="50" y1="2" x2="50" y2="8"/><line x1="14" y1="16" x2="19" y2="20"/><line x1="86" y1="16" x2="81" y2="20"/></g></svg>`,
    bulk: `<svg viewBox="0 0 100 100"><g transform="rotate(-35 50 50)"><rect x="44" y="34" width="12" height="62" rx="5" fill="#b07a45"/><rect x="20" y="14" width="60" height="26" rx="6" fill="#7d8796"/><rect x="20" y="14" width="60" height="8" rx="4" fill="#c9ced6"/></g></svg>`,
    tank: `<svg viewBox="0 0 100 100"><path d="M22 30 L62 30 L80 48 L80 88 Q80 94 74 94 L28 94 Q22 94 22 88 Z" fill="#e5484d"/><rect x="30" y="14" width="34" height="12" rx="5" fill="none" stroke="#c73a3f" stroke-width="7"/><path d="M66 30 L80 16 L88 24" stroke="#4a505c" stroke-width="7" fill="none" stroke-linecap="round"/><path d="M38 48 L64 76 M64 48 L38 76" stroke="#ffcf3f" stroke-width="7" stroke-linecap="round"/></svg>`,
  };
  const STJERNE = `<svg viewBox="0 0 100 100"><path d="M50 4 L60 40 L96 50 L60 60 L50 96 L40 60 L4 50 L40 40 Z" fill="#fff6b0" stroke="#ffd23f" stroke-width="4" stroke-linejoin="round"/></svg>`;
  const VERKTOY = ['dekk', 'lys', 'bulk', 'tank'];

  // ---------- Layout ----------
  const scene = document.getElementById('scene');
  const carbox = document.getElementById('carbox');
  const bilEl = document.getElementById('bil');
  const tiltEl = document.getElementById('tilt');
  const bilSvg = document.getElementById('bilSvg');
  const feilSvg = document.getElementById('feilSvg');
  function layout() {
    const r = scene.getBoundingClientRect();
    carbox.style.width = Math.min(r.width * 0.8, r.height * 0.6 * 2) + 'px';
  }
  layout(); window.addEventListener('resize', layout);

  // ---------- Lyd ----------
  let ac = null, stoyBuf = null;
  function startLyd() {
    if (ac) { if (ac.state === 'suspended') ac.resume(); return; }
    try {
      ac = Lyd.start(); if (!ac) return;
      stoyBuf = ac.createBuffer(1, ac.sampleRate, ac.sampleRate);
      const d = stoyBuf.getChannelData(0); for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
    } catch (e) { ac = null; }
  }
  function sus(t0, dur, freq = 2500, vol = .2) {
    if (!ac) return;
    const s = ac.createBufferSource(), f = ac.createBiquadFilter(), g = ac.createGain();
    s.buffer = stoyBuf; f.type = 'bandpass'; f.frequency.value = freq; f.Q.value = .8;
    g.gain.setValueAtTime(0, ac.currentTime + t0); g.gain.linearRampToValueAtTime(vol, ac.currentTime + t0 + .03);
    g.gain.exponentialRampToValueAtTime(.001, ac.currentTime + t0 + dur);
    s.connect(f).connect(g).connect(ac.destination); s.start(ac.currentTime + t0); s.stop(ac.currentTime + t0 + dur + .05);
  }
  const motor = () => motorLyd(1.5, K.lyd === 'traktor');
  const signal = () => LYDER[K.lyd]();
  const LYD = {
    dekk: () => { sus(0, .25, 1800, .25); sus(.3, .25, 1800, .25); sus(.6, .35, 1800, .25); tone(300, .9, .25, 'triangle', .12, 600); },
    lys: () => { tone(1320, 0, .5, 'sine', .14); tone(1760, .12, .6, 'sine', .1); },
    bulk: () => [0, .28, .56].forEach(t => { tone(180, t, .12, 'square', .1, 90); sus(t, .06, 4000, .15); }),
    tank: () => [0, .22, .44, .66, .88].forEach((t, i) => tone(160 + i * 40, t, .16, 'sine', .2, 120 + i * 40)),
    nei: () => tone(260, 0, .3, 'sine', .12, 200),
    loft: () => tone(90, 0, .9, 'sawtooth', .04, 130),
  };

  // ---------- Kjøretøy og feil ----------
  let kIdx = (+new URLSearchParams(location.search).get('k') || 0) % KJORETOY_SPILL.length, runde = 0, K = KJORETOY_SPILL[kIdx];
  let feil = [];   // { type, x, y, r, el, fikset, hjulIdx }
  let opptatt = true;

  function byggKjoretoy(k, farge) {
    bilSvg.innerHTML = `<defs>
        <clipPath id="karosseri">${k.deler.map(d => `<path d="${d.d}"/>`).join('')}</clipPath>
        <linearGradient id="glintGrad" x1="0" x2="1"><stop offset="0" stop-color="#fff" stop-opacity="0"/><stop offset=".5" stop-color="#fff" stop-opacity=".75"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient>
      </defs>
      ${k.deler.map(d => `<path d="${d.d}" fill="${d.fill || 'var(--bil)'}"/>`).join('')}${tegnLakk(k)}
      <g clip-path="url(#karosseri)">
        ${k.skygge}
        <rect x="0" y="142" width="400" height="30" fill="#000" opacity=".1"/>
        ${k.ingenBue ? '' : k.hjul.map(([x,y,r]) => `<circle cx="${x}" cy="${y}" r="${r+8}" fill="#000" opacity=".28"/>`).join('')}
      </g>
      ${k.detaljer}${tegnMerker(k)}
      <g clip-path="url(#karosseri)"><rect class="glint" x="0" y="0" width="70" height="200" fill="url(#glintGrad)"/></g>
      ${k.hjul.map((h, i) => hjulMarkup(h, k).replace('<g class="hjul">', `<g class="flat" id="hjul${i}"><g class="hjul">`).replace(/<\/g><\/g>$/, '</g></g></g>')).join('')}`;
    bilSvg.style.setProperty('--bil', farge);
  }

  const bland = a => a.map(v => [Math.random(), v]).sort((p, q) => p[0] - q[0]).map(p => p[1]);
  function lagFeil(antall) {
    const a = K.anker;
    const tvang = new URLSearchParams(location.search).get('feil');
    const mulige = tvang ? tvang.split(',') : bland(['dekk', 'lys', 'bulk', 'tank'].filter(t => !(t === 'lys' && !a.lys) && !(t === 'dekk' && a.ingenDekk)));
    feil = mulige.slice(0, tvang ? 9 : antall).map(type => {
      if (type === 'dekk') {
        const i = Math.floor(Math.random() * K.hjul.length);
        const [x, y, r] = K.hjul[i];
        return { type, x, y, r: r + 14, hjulIdx: i };
      }
      const [x, y] = a[type];
      return { type, x, y, r: type === 'bulk' ? 30 : 24 };
    });
    feilSvg.innerHTML = '';
    feil.forEach(f => {
      const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
      let inner = '';
      if (f.type === 'dekk') {
        const [, , r] = K.hjul[f.hjulIdx];
        document.getElementById('hjul' + f.hjulIdx).style.transform = `translate(0px, ${(r * .2).toFixed(1)}px) scale(1.14, .76)`;
        tiltEl.style.transform = `rotate(${f.x < 200 ? -1.6 : 1.6}deg)`;
        inner = `<g class="vis" opacity=".7" stroke="#fff" stroke-width="3" stroke-linecap="round"><line x1="${f.x - r - 14}" y1="${f.y + r - 4}" x2="${f.x - r - 4}" y2="${f.y + r - 10}"/><line x1="${f.x + r + 14}" y1="${f.y + r - 4}" x2="${f.x + r + 4}" y2="${f.y + r - 10}"/></g>`;
      } else if (f.type === 'lys') {
        inner = `<g class="vis"><circle cx="${f.x}" cy="${f.y}" r="10" fill="#5a5f6a"/><path d="M${f.x-7} ${f.y-6} l5 5 l-3 4 l6 3 M${f.x+2} ${f.y-9} l1 6 l5 2" stroke="#e6eaf0" stroke-width="1.6" fill="none" stroke-linecap="round"/></g>`;
      } else if (f.type === 'bulk') {
        inner = `<g class="vis"><ellipse cx="${f.x}" cy="${f.y}" rx="22" ry="13" fill="#000" opacity=".22"/><ellipse cx="${f.x+3}" cy="${f.y+3}" rx="12" ry="6" fill="#000" opacity=".18"/><path d="M${f.x-18} ${f.y-4} l6 3 l-4 4 M${f.x+14} ${f.y-8} l4 6 l6 -1 M${f.x-4} ${f.y+10} l5 -3 l4 4" stroke="#000" stroke-opacity=".35" stroke-width="1.6" fill="none" stroke-linecap="round"/></g>`;
      } else if (f.type === 'tank') {
        inner = `<g class="vis" transform="translate(${f.x} ${f.y})">
          <circle r="17" fill="#fff" stroke="#2a2a30" stroke-width="3"/>
          <path d="M-12 4 A13 13 0 0 1 -4 -12" stroke="#e5484d" stroke-width="4" fill="none"/>
          <path d="M4 -12 A13 13 0 0 1 12 4" stroke="#3ddc6f" stroke-width="4" fill="none"/>
          <g class="nal" style="transform: rotate(-55deg); transform-origin: 0 0;"><line x1="0" y1="0" x2="0" y2="-12" stroke="#2a2a30" stroke-width="3" stroke-linecap="round"/></g>
          <circle r="3" fill="#2a2a30"/>
          <path d="M-5 9 h8 v6 h-8 z M3 10 l3 -2" fill="#4a505c" stroke="#4a505c" stroke-width="1"/>
        </g>`;
      }
      g.innerHTML = inner + `<circle class="markor" cx="${f.x}" cy="${f.y}" r="${f.r}"/>`;
      feilSvg.appendChild(g); f.el = g;
    });
  }

  // ---------- Verktøylinje: trykk for å velge, eller dra rett til feilen ----------
  const bar = document.getElementById('verktoy');
  let valgt = null, drag = null;
  VERKTOY.forEach(v => {
    const b = document.createElement('button'); b.className = 'knapp'; b.dataset.v = v; b.innerHTML = IKON[v];
    b.addEventListener('pointerdown', e => {
      startLyd(); e.preventDefault();
      const sp = document.createElement('div'); sp.className = 'spokelse'; sp.innerHTML = IKON[v];
      sp.style.left = e.clientX + 'px'; sp.style.top = e.clientY + 'px';
      document.body.appendChild(sp);
      drag = { v, sp, x0: e.clientX, y0: e.clientY, flyttet: false, knapp: b };
    });
    bar.appendChild(b);
  });
  function velg(v) {
    valgt = v;
    bar.querySelectorAll('.knapp').forEach(b => b.classList.toggle('aktiv', b.dataset.v === v));
  }
  window.addEventListener('pointermove', e => {
    if (!drag) return;
    drag.sp.style.left = e.clientX + 'px'; drag.sp.style.top = e.clientY + 'px';
    if (Math.hypot(e.clientX - drag.x0, e.clientY - drag.y0) > 14) drag.flyttet = true;
  });
  window.addEventListener('pointerup', e => {
    if (!drag) return;
    const d = drag; drag = null;
    if (!d.flyttet) { d.sp.remove(); velg(d.v); return; }
    const treff = bruk(d.v, e.clientX, e.clientY);
    if (treff) { d.sp.remove(); velg(null); }
    else {
      const r = d.knapp.getBoundingClientRect();
      d.sp.classList.add('tilbake'); d.sp.style.left = (r.left + r.width/2) + 'px'; d.sp.style.top = (r.top + r.height/2) + 'px';
      setTimeout(() => d.sp.remove(), 400);
    }
  });
  window.addEventListener('pointercancel', () => { if (drag) { drag.sp.remove(); drag = null; } });

  // trykk på kjøretøyet med valgt verktøy
  scene.addEventListener('pointerdown', e => { startLyd(); if (valgt && bruk(valgt, e.clientX, e.clientY)) velg(null); });

  function tilBil(cx, cy) {
    const r = bilSvg.getBoundingClientRect();
    return [(cx - r.left) / r.width * 400, (cy - r.top) / r.height * 200, r.width / 400];
  }

  // returnerer true hvis noe ble fikset
  function bruk(v, cx, cy) {
    if (opptatt) return false;
    const [x, y, skala] = tilBil(cx, cy);
    const slakk = 30 / skala * .35 + 18; // romslig treffsone, større på små skjermer
    const naer = feil.filter(f => !f.fikset && Math.hypot(x - f.x, y - f.y) < f.r + slakk)
                     .sort((a, b) => Math.hypot(x - a.x, y - a.y) - Math.hypot(x - b.x, y - b.y));
    const riktig = naer.find(f => f.type === v);
    if (riktig) { fiks(riktig); return true; }
    if (naer.length) {
      const m = naer[0].el.querySelector('.markor');
      m.classList.remove('nei'); void m.getBoundingClientRect(); m.classList.add('nei');
      LYD.nei();
    }
    return false;
  }

  function stjerner(f, n = 5) {
    for (let i = 0; i < n; i++) setTimeout(() => {
      const s = document.createElement('div'); s.className = 'stjerne'; s.innerHTML = STJERNE;
      s.style.left = ((f.x + (Math.random() - .5) * 60) / 4) + '%';
      s.style.top = ((f.y + (Math.random() - .5) * 50) / 2) + '%';
      tiltEl.appendChild(s); setTimeout(() => s.remove(), 1300);
    }, i * 110);
  }

  function fiks(f) {
    f.fikset = true;
    const m = f.el.querySelector('.markor'); m.classList.add('forsvinn');
    const vis = f.el.querySelector('.vis');
    let tid = 700;
    LYD[f.type]();
    if (f.type === 'dekk') {
      setTimeout(() => {
        document.getElementById('hjul' + f.hjulIdx).style.transform = '';
        if (!feil.some(g => g.type === 'dekk' && !g.fikset)) tiltEl.style.transform = '';
        vis && vis.classList.add('forsvinn');
      }, 850);
      tid = 1300;
    } else if (f.type === 'lys') {
      vis.classList.add('forsvinn');
      f.el.insertAdjacentHTML('beforeend', `<circle class="glod" cx="${f.x}" cy="${f.y}" r="14" fill="#fff3a0"/>`);
    } else if (f.type === 'bulk') {
      f.el.insertAdjacentHTML('beforeend', `<g transform="translate(${f.x + 4} ${f.y - 38}) scale(.5)"><g class="bank">${IKON.bulk.replace('<svg viewBox="0 0 100 100">', '').replace('</svg>', '')}</g></g>`);
      setTimeout(() => { vis.classList.add('forsvinn'); f.el.lastElementChild.remove(); }, 850);
      tid = 1100;
    } else if (f.type === 'tank') {
      f.el.querySelector('.nal').style.transform = 'rotate(55deg)';
      tid = 1400;
    }
    setTimeout(() => {
      stjerner(f);
      if (f.type === 'tank') { const v = f.el.querySelector('.vis'); setTimeout(() => v.classList.add('forsvinn'), 900); }
      if (feil.every(g => g.fikset)) setTimeout(alleFikset, 900);
    }, tid);
  }

  function alleFikset() {
    opptatt = true;
    carbox.classList.remove('loftet'); LYD.loft();
    setTimeout(() => {
      carbox.classList.add('klar');
      bilSvg.classList.add('skinn');
      jingle(); setTimeout(signal, 600);
    }, 900);
    setTimeout(kjorUt, 3200);
  }

  function kjorUt() {
    bilSvg.classList.remove('skinn');
    bilSvg.classList.add('kjorer'); bilEl.classList.add('ut');
    motor(); bilEl.style.transform = 'translateX(130vw)';
    setTimeout(nyttKjoretoy, 1600);
  }

  function kjorInn(forste) {
    feilSvg.innerHTML = ''; tiltEl.style.transform = '';
    byggKjoretoy(K, K.farger[runde % K.farger.length]);
    bilEl.classList.remove('ut');
    bilEl.style.transition = 'none'; bilEl.style.transform = 'translateX(-130vw)';
    bilEl.offsetWidth;
    bilEl.style.transition = ''; bilEl.style.transform = 'translateX(0)';
    bilSvg.classList.add('kjorer');
    if (!forste) { motor(); if (['sirene','rygg','politi','is'].includes(K.lyd)) setTimeout(signal, 300); }
    setTimeout(() => {
      bilSvg.classList.remove('kjorer');
      carbox.classList.remove('klar');
      carbox.classList.add('loftet'); LYD.loft();
      setTimeout(() => { lagFeil(forste ? 2 : 2 + Math.floor(Math.random() * 2)); opptatt = false; }, 900);
    }, 1650);
  }
  function nyttKjoretoy() {
    kIdx = (kIdx + 1) % KJORETOY_SPILL.length; if (kIdx === 0) runde++;
    K = KJORETOY_SPILL[kIdx];
    kjorInn(false);
  }
  requestAnimationFrame(() => kjorInn(true));
})();
  },
});
