// Bilspill-modul: lakk
Bilspill.modul('lakk', {
  css: "\n  * { box-sizing: border-box; -webkit-tap-highlight-color: transparent; }\n  :root { --vt: 140px; --kn: 82px; }\n  @media (max-height: 520px) { :root { --vt: 100px; --kn: 66px; } }\n  @media (max-width: 700px) { :root { --kn: 58px; } }\n  html, body { margin: 0; height: 100%; overflow: hidden; touch-action: none; user-select: none; -webkit-user-select: none; font-family: system-ui, sans-serif; }\n  body { background: #2c3340; display: flex; flex-direction: column; }\n\n  .scene { position: relative; flex: 1; overflow: hidden; }\n  .vegg { position: absolute; left: 0; top: 0; width: 100%; height: 78%; pointer-events: none; }\n  .gulv { position: absolute; left: 0; bottom: 0; width: 100%; height: 22%; pointer-events: none; }\n  .carbox { position: absolute; left: 50%; bottom: 7%; transform: translateX(-50%); width: 300px; aspect-ratio: 2 / 1; }\n  .ramme { position: absolute; left: -8%; width: 116%; top: -30%; height: 130%; overflow: visible; pointer-events: none; }\n  .shadow { position: absolute; left: 6%; right: 6%; bottom: 0; height: 6%; border-radius: 50%; background: rgba(0,0,0,.25); filter: blur(4px); }\n  .bil { position: absolute; inset: 0; transition: transform 1.6s cubic-bezier(.2,.7,.3,1); }\n  .bil.ut { transition: transform 1.5s cubic-bezier(.6,0,.9,.5); }\n  .bil > svg, .bil > canvas { position: absolute; inset: 0; width: 100%; height: 100%; overflow: visible; }\n  .hopp { animation: hopp .7s ease-out 2; }\n  @keyframes hopp { 0%,100% { transform: translateY(0); } 30% { transform: translateY(-5%); } 55% { transform: translateY(0); } 70% { transform: translateY(-1.5%); } }\n\n  .hjul { transform-box: fill-box; transform-origin: center; }\n  .kjorer .hjul { animation: spinn .35s linear infinite; }\n  @keyframes spinn { to { transform: rotate(360deg); } }\n  .kjorer .blink { animation: blink .35s steps(2) infinite; }\n  @keyframes blink { 50% { opacity: .25; } }\n  .glint { transform: translateX(-200px); }\n  .skinn .glint { animation: glint 1.1s ease-in-out 2; }\n  @keyframes glint { from { transform: translateX(-200px); } to { transform: translateX(520px); } }\n  .vifte { transform-box: fill-box; transform-origin: center; animation: spinn 1.2s linear infinite; }\n  .blase .vifte { animation-duration: .25s; }\n\n  .klistre { cursor: grab; }\n  .klistre.ny { animation: plopp .35s cubic-bezier(.3,1.8,.5,1); transform-box: fill-box; transform-origin: center; }\n  @keyframes plopp { from { transform: scale(.3); } to { transform: scale(1); } }\n  .stjerne { position: absolute; width: 9%; pointer-events: none; animation: glitre 1.2s ease-out forwards; }\n  @keyframes glitre { 0% { transform: scale(0) rotate(0); opacity: 0; } 30% { opacity: 1; transform: scale(1.1) rotate(40deg); } 100% { transform: scale(0) rotate(120deg); opacity: 0; } }\n\n  .verktoy { min-height: var(--vt); flex-wrap: wrap; align-content: center; padding-top: 8px !important; padding-bottom: 8px; display: flex; gap: 10px; justify-content: center; align-items: center; padding: 0 10px env(safe-area-inset-bottom); background: #3a4250; box-shadow: inset 0 6px 0 #2c3340; }\n  .knapp { flex: none; width: var(--kn); height: var(--kn); border-radius: 22px; border: none; background: #f2f4f7; box-shadow: 0 5px 0 rgba(0,0,0,.3); display: grid; place-items: center; padding: 8px; transition: transform .2s, box-shadow .2s; touch-action: none; }\n  .knapp svg { width: 100%; height: 100%; pointer-events: none; }\n  .knapp.aktiv { box-shadow: 0 0 0 5px #fff, 0 5px 0 rgba(0,0,0,.3); transform: translateY(-6px) scale(1.06); }\n  .knapp.kjor { background: #3ddc6f; border-radius: 50%; margin-left: 12px; }\n  .knapp.bytt { background: #ffcf3f; }\n  .skille { width: 3px; height: 60%; background: #2c3340; border-radius: 2px; }\n  .spokelse { position: fixed; width: 80px; height: 80px; pointer-events: none; transform: translate(-50%, -50%); z-index: 5; filter: drop-shadow(0 6px 5px rgba(0,0,0,.3)); }\n  .spokelse.borte { transition: opacity .3s, transform .3s; opacity: 0; transform: translate(-50%, -50%) scale(.3) rotate(90deg); }\n  .peker { position: fixed; width: 70px; height: 70px; pointer-events: none; transform: translate(-15%, -95%); display: none; z-index: 5; filter: drop-shadow(0 4px 3px rgba(0,0,0,.25)); }\n",
  html: "\n<div class=\"scene\" id=\"scene\">\n  <svg class=\"vegg\" viewBox=\"0 0 1200 500\" preserveAspectRatio=\"xMidYMax slice\">\n    <defs>\n      <pattern id=\"panel\" width=\"100\" height=\"100\" patternUnits=\"userSpaceOnUse\"><rect width=\"100\" height=\"100\" fill=\"#dfe6ee\"/><rect x=\"2\" y=\"2\" width=\"96\" height=\"96\" rx=\"4\" fill=\"#e9eef4\"/></pattern>\n      <pattern id=\"fare\" width=\"28\" height=\"28\" patternUnits=\"userSpaceOnUse\" patternTransform=\"rotate(45)\"><rect width=\"28\" height=\"28\" fill=\"#ffcf3f\"/><rect width=\"14\" height=\"28\" fill=\"#2a2a30\"/></pattern>\n      <linearGradient id=\"himmel\" x1=\"0\" y1=\"0\" x2=\"0\" y2=\"1\"><stop offset=\"0\" stop-color=\"#8fd0ff\"/><stop offset=\"1\" stop-color=\"#d9f1ff\"/></linearGradient>\n    </defs>\n    <rect width=\"1200\" height=\"500\" fill=\"url(#panel)\"/>\n    <!-- malingsklatter på veggen -->\n    <g opacity=\".85\">\n      <circle cx=\"330\" cy=\"420\" r=\"18\" fill=\"#ff7eb6\"/><circle cx=\"352\" cy=\"440\" r=\"7\" fill=\"#ff7eb6\"/><circle cx=\"312\" cy=\"446\" r=\"5\" fill=\"#ff7eb6\"/>\n      <circle cx=\"860\" cy=\"410\" r=\"16\" fill=\"#3e8ef7\"/><circle cx=\"884\" cy=\"398\" r=\"6\" fill=\"#3e8ef7\"/><circle cx=\"848\" cy=\"432\" r=\"4\" fill=\"#3e8ef7\"/>\n      <circle cx=\"600\" cy=\"300\" r=\"12\" fill=\"#30a46c\"/><circle cx=\"618\" cy=\"290\" r=\"5\" fill=\"#30a46c\"/>\n      <circle cx=\"470\" cy=\"230\" r=\"9\" fill=\"#f5b82e\"/><circle cx=\"752\" cy=\"250\" r=\"10\" fill=\"#e5484d\"/><circle cx=\"766\" cy=\"240\" r=\"4\" fill=\"#e5484d\"/>\n    </g>\n    <!-- tak med lysrør -->\n    <rect width=\"1200\" height=\"70\" fill=\"#3a4250\"/><rect y=\"70\" width=\"1200\" height=\"10\" fill=\"#2c3340\"/>\n    <g fill=\"#f6fbff\"><rect x=\"260\" y=\"82\" width=\"180\" height=\"12\" rx=\"6\"/><rect x=\"510\" y=\"82\" width=\"180\" height=\"12\" rx=\"6\"/><rect x=\"760\" y=\"82\" width=\"180\" height=\"12\" rx=\"6\"/></g>\n    <!-- vifter -->\n    <g transform=\"translate(250 230)\"><circle r=\"44\" fill=\"#4a505c\"/><circle r=\"38\" fill=\"#2c3340\"/>\n      <g class=\"vifte\"><path d=\"M0 0 C10 -30 30 -30 30 -10 Z M0 0 C30 10 30 30 10 30 Z M0 0 C-10 30 -30 30 -30 10 Z M0 0 C-30 -10 -30 -30 -10 -30 Z\" fill=\"#9aa3ae\"/></g><circle r=\"7\" fill=\"#c9ced6\"/></g>\n    <g transform=\"translate(950 230)\"><circle r=\"44\" fill=\"#4a505c\"/><circle r=\"38\" fill=\"#2c3340\"/>\n      <g class=\"vifte\"><path d=\"M0 0 C10 -30 30 -30 30 -10 Z M0 0 C30 10 30 30 10 30 Z M0 0 C-10 30 -30 30 -30 10 Z M0 0 C-30 -10 -30 -30 -10 -30 Z\" fill=\"#9aa3ae\"/></g><circle r=\"7\" fill=\"#c9ced6\"/></g>\n    <!-- hylle med malingsbokser -->\n    <g transform=\"translate(190 330)\">\n      <rect x=\"0\" y=\"66\" width=\"130\" height=\"9\" rx=\"3\" fill=\"#7d8796\"/>\n      <g><rect x=\"6\" y=\"30\" width=\"34\" height=\"36\" rx=\"4\" fill=\"#c9ced6\"/><rect x=\"6\" y=\"40\" width=\"34\" height=\"14\" fill=\"#e5484d\"/><path d=\"M6 30 q0 -10 17 -10 q17 0 17 10\" fill=\"none\" stroke=\"#7d8796\" stroke-width=\"3\"/></g>\n      <g><rect x=\"48\" y=\"30\" width=\"34\" height=\"36\" rx=\"4\" fill=\"#c9ced6\"/><rect x=\"48\" y=\"40\" width=\"34\" height=\"14\" fill=\"#3e8ef7\"/><path d=\"M52 30 q-4 -6 4 -8 q6 -2 6 6\" fill=\"#3e8ef7\"/></g>\n      <g><rect x=\"90\" y=\"30\" width=\"34\" height=\"36\" rx=\"4\" fill=\"#c9ced6\"/><rect x=\"90\" y=\"40\" width=\"34\" height=\"14\" fill=\"#ffcf3f\"/></g>\n    </g>\n    <!-- sprøytepistol på kroken -->\n    <g transform=\"translate(900 320)\">\n      <rect x=\"-3\" y=\"0\" width=\"6\" height=\"16\" fill=\"#7d8796\"/>\n      <g transform=\"translate(0 16)\"><rect x=\"-26\" y=\"10\" width=\"52\" height=\"16\" rx=\"6\" fill=\"#3e8ef7\"/><rect x=\"-6\" y=\"24\" width=\"12\" height=\"30\" rx=\"4\" fill=\"#2a2a30\"/><rect x=\"22\" y=\"13\" width=\"18\" height=\"8\" rx=\"3\" fill=\"#c9ced6\"/><rect x=\"-14\" y=\"-4\" width=\"22\" height=\"16\" rx=\"4\" fill=\"#c9ced6\"/></g>\n      <path d=\"M0 70 q-30 40 20 70 q40 20 60 0\" stroke=\"#2a2a30\" stroke-width=\"5\" fill=\"none\"/>\n    </g>\n    <!-- porter -->\n    <g>\n      <rect x=\"0\" y=\"150\" width=\"150\" height=\"350\" fill=\"url(#himmel)\"/>\n      <circle cx=\"40\" cy=\"250\" r=\"34\" fill=\"#fff\"/><circle cx=\"80\" cy=\"245\" r=\"26\" fill=\"#fff\"/>\n      <path d=\"M0 470 Q60 420 150 455 L150 500 L0 500 Z\" fill=\"#7fcf86\"/>\n      <rect x=\"150\" y=\"130\" width=\"22\" height=\"370\" fill=\"url(#fare)\"/><rect x=\"0\" y=\"130\" width=\"172\" height=\"22\" fill=\"url(#fare)\"/>\n    </g>\n    <g transform=\"translate(1200 0) scale(-1 1)\">\n      <rect x=\"0\" y=\"150\" width=\"150\" height=\"350\" fill=\"url(#himmel)\"/>\n      <circle cx=\"60\" cy=\"230\" r=\"28\" fill=\"#fff\"/><circle cx=\"96\" cy=\"236\" r=\"20\" fill=\"#fff\"/>\n      <path d=\"M0 460 Q80 430 150 465 L150 500 L0 500 Z\" fill=\"#7fcf86\"/>\n      <circle cx=\"40\" cy=\"430\" r=\"26\" fill=\"#4fae5c\"/><rect x=\"36\" y=\"440\" width=\"8\" height=\"40\" fill=\"#8b5a2b\"/>\n      <rect x=\"150\" y=\"130\" width=\"22\" height=\"370\" fill=\"url(#fare)\"/><rect x=\"0\" y=\"130\" width=\"172\" height=\"22\" fill=\"url(#fare)\"/>\n    </g>\n  </svg>\n  <svg class=\"gulv\" viewBox=\"0 0 1200 140\" preserveAspectRatio=\"xMidYMin slice\">\n    <defs><pattern id=\"fare2\" width=\"28\" height=\"28\" patternUnits=\"userSpaceOnUse\" patternTransform=\"rotate(45)\"><rect width=\"28\" height=\"28\" fill=\"#ffcf3f\"/><rect width=\"14\" height=\"28\" fill=\"#2a2a30\"/></pattern></defs>\n    <rect width=\"1200\" height=\"140\" fill=\"#9aa3ae\"/><rect width=\"1200\" height=\"10\" fill=\"url(#fare2)\"/>\n    <!-- dekkpapir under bilen -->\n    <path d=\"M300 18 L900 18 L940 110 L260 110 Z\" fill=\"#efe6d2\"/><path d=\"M300 18 L900 18 L904 26 L296 26 Z\" fill=\"#e2d6bb\"/>\n    <g opacity=\".8\"><circle cx=\"380\" cy=\"80\" r=\"9\" fill=\"#e5484d\"/><circle cx=\"395\" cy=\"90\" r=\"4\" fill=\"#e5484d\"/><circle cx=\"720\" cy=\"60\" r=\"10\" fill=\"#3e8ef7\"/><circle cx=\"560\" cy=\"96\" r=\"6\" fill=\"#30a46c\"/><circle cx=\"820\" cy=\"94\" r=\"7\" fill=\"#ff7eb6\"/></g>\n  </svg>\n\n  <div class=\"carbox\" id=\"carbox\">\n    <svg class=\"ramme\" viewBox=\"-32 -60 464 260\">\n      <!-- lakkeringsbås: ramme med lysrør -->\n      <rect x=\"-28\" y=\"-48\" width=\"18\" height=\"242\" rx=\"4\" fill=\"#d9e1ea\"/>\n      <rect x=\"410\" y=\"-48\" width=\"18\" height=\"242\" rx=\"4\" fill=\"#d9e1ea\"/>\n      <rect x=\"-24\" y=\"-30\" width=\"10\" height=\"200\" rx=\"5\" fill=\"#f6fbff\"/><rect x=\"414\" y=\"-30\" width=\"10\" height=\"200\" rx=\"5\" fill=\"#f6fbff\"/>\n      <rect x=\"-34\" y=\"-58\" width=\"468\" height=\"20\" rx=\"8\" fill=\"#3a4250\"/>\n      <rect x=\"20\" y=\"-34\" width=\"360\" height=\"8\" rx=\"4\" fill=\"#f6fbff\"/>\n      <rect x=\"-34\" y=\"186\" width=\"32\" height=\"8\" rx=\"3\" fill=\"#4a505c\"/><rect x=\"402\" y=\"186\" width=\"32\" height=\"8\" rx=\"3\" fill=\"#4a505c\"/>\n    </svg>\n    <div class=\"shadow\"></div>\n    <div class=\"bil\" id=\"bil\">\n      <svg viewBox=\"0 0 400 200\" id=\"under\"></svg>\n      <canvas id=\"maling\" width=\"1000\" height=\"500\"></canvas>\n      <svg viewBox=\"0 0 400 200\" id=\"over\"></svg>\n    </div>\n  </div>\n</div>\n\n<div class=\"verktoy\" id=\"verktoy\"></div>\n<div class=\"peker\" id=\"peker\"></div>\n\n",
  start() {
(() => {

  // ---------- Farger og klistremerker ----------
  const FARGER = ['#e5484d','#f76b15','#ffcf3f','#30a46c','#3e8ef7','#8e4ec6','#ff7eb6','#2a2a30'];
  const GRUNNING = '#cfd5dd';
  const KLISTRE = {
    stjerne: `<path d="M0 -18 L5 -6 L18 -5 L8 4 L11 17 L0 10 L-11 17 L-8 4 L-18 -5 L-5 -6 Z" fill="#ffcf3f" stroke="#fff" stroke-width="2.5" stroke-linejoin="round"/>`,
    hjerte: `<path d="M0 16 C-24 0 -18 -18 -6 -16 C-2 -15 0 -12 0 -10 C0 -12 2 -15 6 -16 C18 -18 24 0 0 16 Z" fill="#ff4d6d" stroke="#fff" stroke-width="2.5"/>`,
    lyn: `<path d="M4 -18 L-12 2 L-1 2 L-5 18 L12 -3 L1 -3 Z" fill="#ffcf3f" stroke="#2a2a30" stroke-width="2.5" stroke-linejoin="round"/>`,
    flamme: `<path d="M-18 8 C-10 -4 -4 -2 -2 -12 C4 -4 4 0 8 -6 C12 0 14 4 18 2 C14 14 4 18 -6 16 C-12 15 -16 12 -18 8 Z" fill="#f76b15" stroke="#fff" stroke-width="2"/><path d="M-8 10 C-4 4 0 6 2 0 C6 6 8 8 10 6 C8 12 0 14 -8 10 Z" fill="#ffcf3f"/>`,
    blomst: `${[0,72,144,216,288].map(a => `<circle cx="${(10*Math.cos(a*Math.PI/180)).toFixed(1)}" cy="${(10*Math.sin(a*Math.PI/180)).toFixed(1)}" r="8" fill="#ff7eb6" stroke="#fff" stroke-width="2"/>`).join('')}<circle r="7" fill="#ffcf3f" stroke="#fff" stroke-width="2"/>`,
    smil: `<circle r="17" fill="#ffcf3f" stroke="#fff" stroke-width="2.5"/><circle cx="-6" cy="-4" r="2.6" fill="#2a2a30"/><circle cx="6" cy="-4" r="2.6" fill="#2a2a30"/><path d="M-8 5 Q0 13 8 5" stroke="#2a2a30" stroke-width="2.6" fill="none" stroke-linecap="round"/>`,
    flagg: `<rect x="-16" y="-12" width="32" height="24" fill="#fff" stroke="#2a2a30" stroke-width="2"/>${[0,1,2,3].map(r => [0,1,2,3].map(c => (r + c) % 2 ? '' : `<rect x="${-16 + c*8}" y="${-12 + r*6}" width="8" height="6" fill="#2a2a30"/>`).join('')).join('')}`,
    sju: `<circle r="17" fill="#fff" stroke="#e5484d" stroke-width="4"/><path d="M-7 -8 L8 -8 L-1 11" stroke="#2a2a30" stroke-width="4" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`,
  };
  const ikonSvg = (inner, vb = '-22 -22 44 44') => `<svg viewBox="${vb}">${inner}</svg>`;
  const BOKS = f => `<svg viewBox="0 0 100 100"><rect x="26" y="30" width="48" height="62" rx="10" fill="${f}"/><rect x="26" y="50" width="48" height="16" fill="#fff" opacity=".35"/><rect x="34" y="18" width="32" height="14" rx="4" fill="#c9ced6"/><rect x="44" y="6" width="12" height="14" rx="3" fill="#7d8796"/><circle cx="62" cy="10" r="3" fill="${f}"/><circle cx="72" cy="6" r="2.2" fill="${f}"/><circle cx="70" cy="15" r="2" fill="${f}"/></svg>`;
  const KJOR = `<svg viewBox="0 0 100 100"><rect x="30" y="18" width="5" height="70" rx="2.5" fill="#2a2a30"/><g>${[0,1,2,3].map(r => [0,1,2,3,4].map(c => `<rect x="${35 + c*9}" y="${20 + r*9}" width="9" height="9" fill="${(r + c) % 2 ? '#2a2a30' : '#fff'}"/>`).join('')).join('')}</g></svg>`;
  const PALETT = `<svg viewBox="0 0 100 100"><path d="M50 10 C20 10 8 34 12 54 C16 74 34 70 40 78 C46 88 56 92 66 88 C88 80 94 52 86 34 C78 18 66 10 50 10 Z" fill="#f2d6a8"/><circle cx="34" cy="38" r="8" fill="#e5484d"/><circle cx="54" cy="28" r="8" fill="#ffcf3f"/><circle cx="72" cy="40" r="8" fill="#3e8ef7"/><circle cx="72" cy="62" r="8" fill="#30a46c"/><circle cx="42" cy="62" r="9" fill="#fff"/></svg>`;
  const MERKER = ikonSvg(`<g transform="translate(-7 -6) scale(.7)">${KLISTRE.stjerne}</g><g transform="translate(9 9) scale(.6)">${KLISTRE.hjerte}</g>`);
  const STJERNE = `<svg viewBox="0 0 100 100"><path d="M50 4 L60 40 L96 50 L60 60 L50 96 L40 60 L4 50 L40 40 Z" fill="#fff6b0" stroke="#ffd23f" stroke-width="4" stroke-linejoin="round"/></svg>`;

  // ---------- Elementer og layout ----------
  const scene = document.getElementById('scene');
  const carbox = document.getElementById('carbox');
  const bilEl = document.getElementById('bil');
  const under = document.getElementById('under');
  const over = document.getElementById('over');
  const peker = document.getElementById('peker');
  function layout() {
    const r = scene.getBoundingClientRect();
    carbox.style.width = Math.min(r.width * 0.8, r.height * 0.6 * 2) + 'px';
  }
  layout(); window.addEventListener('resize', layout);

  const S = 1000 / 400;
  const mal = document.getElementById('maling').getContext('2d'); mal.setTransform(S,0,0,S,0,0);
  const maske = document.createElement('canvas'); maske.width = 1000; maske.height = 500;
  const mctx = maske.getContext('2d'); mctx.setTransform(S,0,0,S,0,0);
  let malbare = [];
  function maskér() { mal.save(); mal.setTransform(1,0,0,1,0,0); mal.globalCompositeOperation = 'destination-in'; mal.drawImage(maske, 0, 0); mal.restore(); }
  const paaBil = (x, y) => malbare.some(p => mctx.isPointInPath(p, x * S, y * S));

  // ---------- Lyd ----------
  let ac = null, stoyBuf = null, susG = null;
  function startLyd() {
    if (ac) { if (ac.state === 'suspended') ac.resume(); return; }
    try {
      ac = Lyd.start(); if (!ac) return;
      stoyBuf = ac.createBuffer(1, ac.sampleRate * 2, ac.sampleRate);
      const d = stoyBuf.getChannelData(0); for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
      const s = ac.createBufferSource(); s.buffer = stoyBuf; s.loop = true;
      const f = ac.createBiquadFilter(); f.type = 'highpass'; f.frequency.value = 3000;
      susG = ac.createGain(); susG.gain.value = 0;
      s.connect(f).connect(susG).connect(ac.destination); s.start();
    } catch (e) { ac = null; }
  }
  const motor = () => motorLyd(1.5, K.lyd === 'traktor');
  const signal = () => LYDER[K.lyd]();
  const plopp = () => tone(520, 0, .15, 'sine', .16, 900);
  const vekk = () => tone(500, 0, .25, 'sine', .1, 200);

  // ---------- Kjøretøy ----------
  let kIdx = (+new URLSearchParams(location.search).get('k') || 0) % KJORETOY_SPILL.length, K = KJORETOY_SPILL[kIdx];
  function byggKjoretoy(k) {
    under.innerHTML = k.deler.map(d => `<path d="${d.d}" fill="${d.fill || 'var(--bil)'}"/>`).join('');
    under.style.setProperty('--bil', GRUNNING);
    over.innerHTML = `<defs>
        <clipPath id="karosseri">${k.deler.map(d => `<path d="${d.d}"/>`).join('')}</clipPath>
        <linearGradient id="glintGrad" x1="0" x2="1"><stop offset="0" stop-color="#fff" stop-opacity="0"/><stop offset=".5" stop-color="#fff" stop-opacity=".75"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient>
      </defs>
      <g clip-path="url(#karosseri)" style="pointer-events:none">
        ${k.skygge}
        <rect x="0" y="142" width="400" height="30" fill="#000" opacity=".1"/>
        ${k.ingenBue ? '' : k.hjul.map(([x,y,r]) => `<circle cx="${x}" cy="${y}" r="${r+8}" fill="#000" opacity=".28"/>`).join('')}
      </g>
      <g style="pointer-events:none">${k.detaljer}</g>
      <g clip-path="url(#karosseri)"><rect class="glint" x="0" y="0" width="70" height="200" fill="url(#glintGrad)"/></g>
      ${k.hjul.map(h => hjulMarkup(h, k)).join('')}
      <g id="merker"></g>`;
    mal.save(); mal.setTransform(1,0,0,1,0,0); mal.clearRect(0,0,1000,500); mal.restore();
    mctx.save(); mctx.setTransform(1,0,0,1,0,0); mctx.clearRect(0,0,1000,500); mctx.restore();
    malbare = k.deler.filter(d => !d.fill).map(d => new Path2D(d.d));
    mctx.fillStyle = '#000'; malbare.forEach(p => mctx.fill(p));
    // «Min bil»: fortsett på lakken som er malt før
    if (k.navn === 'minbil') {
      if (k.merker) document.getElementById('merker').innerHTML = k.merker;
      if (k.lakk) { const img = new Image(); img.onload = () => { mal.save(); mal.setTransform(1,0,0,1,0,0); mal.drawImage(img, 0, 0, 1000, 500); mal.restore(); }; img.src = k.lakk; }
    }
  }

  // ---------- Verktøylinje ----------
  const bar = document.getElementById('verktoy');
  let modus = 'farger', farge = FARGER[0], opptatt = true;
  function tegnBar() {
    bar.innerHTML = '';
    const knapp = (html, cls, fn) => { const b = document.createElement('button'); b.className = 'knapp ' + (cls || ''); b.innerHTML = html; b.addEventListener('pointerdown', e => { e.stopPropagation(); startLyd(); fn(e, b); }); bar.appendChild(b); return b; };
    if (modus === 'farger') {
      FARGER.forEach(f => knapp(BOKS(f), f === farge ? 'aktiv' : '', (e, b) => { farge = f; bar.querySelectorAll('.knapp').forEach(k => k.classList.remove('aktiv')); b.classList.add('aktiv'); tone(700, 0, .08, 'sine', .08); }));
      bar.insertAdjacentHTML('beforeend', '<div class="skille"></div>');
      knapp(MERKER, 'bytt', () => { modus = 'merker'; tegnBar(); });
    } else {
      knapp(PALETT, 'bytt', () => { modus = 'farger'; tegnBar(); });
      bar.insertAdjacentHTML('beforeend', '<div class="skille"></div>');
      Object.keys(KLISTRE).forEach(n => knapp(ikonSvg(KLISTRE[n]), '', e => startDrag(n, null, e)));
    }
    knapp(KJOR, 'kjor', () => { if (!opptatt) ferdig(); });
  }
  tegnBar();

  // ---------- Spraying ----------
  let spray = false, sist = null;
  function tilBil(cx, cy) {
    const r = bilEl.getBoundingClientRect();
    return [(cx - r.left) / r.width * 400, (cy - r.top) / r.height * 200];
  }
  function sprayPunkt(x, y) {
    const g = mal.createRadialGradient(x, y, 0, x, y, 24);
    g.addColorStop(0, farge); g.addColorStop(.55, farge + 'cc'); g.addColorStop(1, farge + '00');
    mal.fillStyle = g; mal.beginPath(); mal.arc(x, y, 24, 0, Math.PI*2); mal.fill();
    mal.fillStyle = farge;
    for (let i = 0; i < 3; i++) { const a = Math.random() * Math.PI * 2, d = 18 + Math.random() * 12; mal.beginPath(); mal.arc(x + Math.cos(a) * d, y + Math.sin(a) * d, .8 + Math.random() * 1.4, 0, Math.PI*2); mal.fill(); }
  }
  function sprayTil(e) {
    const [x, y] = tilBil(e.clientX, e.clientY);
    peker.style.left = e.clientX + 'px'; peker.style.top = e.clientY + 'px';
    const fra = sist || [x, y];
    const steg = Math.max(1, Math.ceil(Math.hypot(x - fra[0], y - fra[1]) / 5));
    for (let i = 1; i <= steg; i++) sprayPunkt(fra[0] + (x - fra[0]) * i / steg, fra[1] + (y - fra[1]) * i / steg);
    maskér();
    sist = [x, y];
  }

  // ---------- Klistremerker: dra fra linja, flytt eller dra av bilen ----------
  let drag = null;
  function startDrag(navn, el, e) {
    const sp = document.createElement('div'); sp.className = 'spokelse'; sp.innerHTML = ikonSvg(KLISTRE[navn]);
    const bredde = bilEl.getBoundingClientRect().width * 44 / 400 * 1.15;
    sp.style.width = sp.style.height = Math.max(44, bredde) + 'px';
    sp.style.left = e.clientX + 'px'; sp.style.top = e.clientY + 'px';
    document.body.appendChild(sp);
    if (el) el.style.opacity = '0';
    drag = { navn, el, sp };
  }
  function slippMerke(e) {
    const d = drag; drag = null;
    const [x, y] = tilBil(e.clientX, e.clientY);
    if (!opptatt && paaBil(x, y)) {
      const rot = d.el ? d.el.dataset.rot : (Math.random() * 30 - 15).toFixed(0);
      if (d.el) d.el.remove();
      const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
      g.setAttribute('transform', `translate(${x.toFixed(1)} ${y.toFixed(1)}) rotate(${rot})`);
      g.dataset.navn = d.navn; g.dataset.rot = rot;
      g.innerHTML = `<g class="klistre ny">${KLISTRE[d.navn]}</g>`;
      document.getElementById('merker').appendChild(g);
      d.sp.remove(); plopp();
    } else {
      if (d.el) d.el.remove();
      d.sp.classList.add('borte'); setTimeout(() => d.sp.remove(), 320);
      vekk();
    }
  }

  scene.addEventListener('pointerdown', e => {
    startLyd();
    if (opptatt) return;
    const merke = e.target.closest && e.target.closest('#merker > g');
    if (merke) { startDrag(merke.dataset.navn, merke, e); return; }
    if (modus !== 'farger') return;
    spray = true; sist = null;
    peker.innerHTML = BOKS(farge); peker.style.display = 'block';
    if (susG) susG.gain.setTargetAtTime(.18, ac.currentTime, .03);
    sprayTil(e);
  });
  window.addEventListener('pointermove', e => {
    if (drag) { drag.sp.style.left = e.clientX + 'px'; drag.sp.style.top = e.clientY + 'px'; return; }
    if (spray) sprayTil(e);
  });
  function slipp(e) {
    if (drag) slippMerke(e);
    if (spray) { spray = false; sist = null; peker.style.display = 'none'; if (susG) susG.gain.setTargetAtTime(0, ac.currentTime, .04); }
  }
  window.addEventListener('pointerup', slipp); window.addEventListener('pointercancel', slipp);

  // ---------- Ferdig: vis frem og kjør ut ----------
  function ferdig() {
    opptatt = true;
    if (K.navn === 'minbil') {
      try {
        K.lakk = document.getElementById('maling').toDataURL('image/png');
        K.merker = document.getElementById('merker').innerHTML.replace(/ ny"/g, '"');
        localStorage.setItem('bilspill.minBil.lakk', K.lakk);
        localStorage.setItem('bilspill.minBil.merker', K.merker);
      } catch (e) {}
    }
    carbox.classList.add('blase');
    over.classList.add('skinn'); bilEl.classList.add('hopp');
    jingle(); setTimeout(signal, 600);
    for (let i = 0; i < 9; i++) setTimeout(() => {
      const s = document.createElement('div'); s.className = 'stjerne'; s.innerHTML = STJERNE;
      s.style.left = (5 + Math.random() * 80) + '%'; s.style.top = (10 + Math.random() * 50) + '%';
      bilEl.appendChild(s); setTimeout(() => s.remove(), 1300);
    }, i * 140);
    setTimeout(() => {
      carbox.classList.remove('blase');
      over.classList.remove('skinn'); bilEl.classList.remove('hopp');
      [under, over].forEach(s => s.classList.add('kjorer'));
      bilEl.classList.add('ut'); motor();
      bilEl.style.transform = 'translateX(130vw)';
      setTimeout(() => { kIdx = (kIdx + 1) % KJORETOY_SPILL.length; K = KJORETOY_SPILL[kIdx]; kjorInn(false); }, 1600);
    }, 2800);
  }

  function kjorInn(forste) {
    byggKjoretoy(K);
    bilEl.classList.remove('ut');
    bilEl.style.transition = 'none'; bilEl.style.transform = 'translateX(-130vw)';
    bilEl.offsetWidth;
    bilEl.style.transition = ''; bilEl.style.transform = 'translateX(0)';
    [under, over].forEach(s => s.classList.add('kjorer'));
    if (!forste) { motor(); if (['sirene','rygg','politi','is'].includes(K.lyd)) setTimeout(signal, 300); }
    setTimeout(() => { [under, over].forEach(s => s.classList.remove('kjorer')); opptatt = false; }, 1650);
  }
  requestAnimationFrame(() => kjorInn(true));
})();
  },
});
