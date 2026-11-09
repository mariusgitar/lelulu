// Bilspill-modul: vask
Bilspill.modul('vask', {
  css: "\n  * { box-sizing: border-box; -webkit-tap-highlight-color: transparent; }\n    :root { --vt: 150px; }\n  @media (max-height: 520px) { :root { --vt: 104px; } .knapp { width: 84px !important; height: 84px !important; padding: 10px !important; } }\n  html, body { margin: 0; height: 100%; overflow: hidden; touch-action: none; user-select: none; -webkit-user-select: none; font-family: system-ui, sans-serif; }\n  body { background: #dfe7ef; display: flex; flex-direction: column; }\n\n  /* Vaskehall-bakgrunn */\n  .scene { position: relative; flex: 1; overflow: hidden; }\n  .vegg { position: absolute; left: 0; right: 0; top: 0; bottom: 22%; width: 100%; height: 78%; pointer-events: none; }\n  .gulv { position: absolute; left: 0; right: 0; bottom: 0; width: 100%; height: 22%; pointer-events: none; }\n  .carbox { position: absolute; left: 50%; bottom: 7%; transform: translateX(-50%); width: 300px; aspect-ratio: 2 / 1; }\n  .portal { position: absolute; left: -8%; width: 116%; top: -30%; height: 130%; overflow: visible; pointer-events: none; }\n  .rull { animation: rull .5s linear infinite; animation-play-state: paused; }\n  .vasker .rull { animation-play-state: running; }\n  @keyframes rull { to { transform: translateX(-12px); } }\n  .dyse-spray { opacity: 0; }\n  .spray .dyse-spray { opacity: 1; }\n  .spray .dyse-spray line { stroke-dasharray: 6 8; animation: drypp .3s linear infinite; }\n  @keyframes drypp { to { stroke-dashoffset: -14; } }\n  .kjorer .blink { animation: blink .35s steps(2) infinite; }\n  @keyframes blink { 50% { opacity: .25; } }\n  .lys-rod { fill: #ff4d4f; } .lys-gronn { fill: #2f5a3c; }\n  .klar .lys-rod { fill: #5a2f30; } .klar .lys-gronn { fill: #3ddc6f; }\n  .boble { position: absolute; border-radius: 50%; background: rgba(255,255,255,.55); border: 2px solid rgba(255,255,255,.9); pointer-events: none; animation: stig linear forwards; }\n  @keyframes stig { from { transform: translateY(0); opacity: 0; } 10% { opacity: 1; } to { transform: translateY(-70vh); opacity: 0; } }\n  .puddle { position: absolute; left: 4%; right: 4%; bottom: -3%; height: 12%; border-radius: 50%; background: radial-gradient(ellipse at center, rgba(90,160,230,.75), rgba(90,160,230,0) 70%); opacity: 0; transition: opacity 2.5s; }\n  .shadow { position: absolute; left: 6%; right: 6%; bottom: 0; height: 6%; border-radius: 50%; background: rgba(0,0,0,.18); filter: blur(4px); }\n  .bil { position: absolute; inset: 0; transition: transform 1.6s cubic-bezier(.2,.7,.3,1); }\n  .bil.ut { transition: transform 1.5s cubic-bezier(.6,0,.9,.5); }\n  .bil svg, .bil canvas { position: absolute; inset: 0; width: 100%; height: 100%; }\n  .hopp { animation: hopp .7s ease-out 2; }\n  @keyframes hopp { 0%,100% { transform: translateY(0); } 30% { transform: translateY(-5%); } 55% { transform: translateY(0); } 70% { transform: translateY(-1.5%); } }\n\n  .hjul { transform-box: fill-box; transform-origin: center; }\n  .kjorer .hjul { animation: spinn .35s linear infinite; }\n  @keyframes spinn { to { transform: rotate(360deg); } }\n\n  .glint { transform: translateX(-200px); }\n  .skinn .glint { animation: glint 1.1s ease-in-out 2; }\n  @keyframes glint { from { transform: translateX(-200px); } to { transform: translateX(520px); } }\n\n  .stjerne { position: absolute; width: 9%; pointer-events: none; animation: glitre 1.2s ease-out forwards; }\n  @keyframes glitre { 0% { transform: scale(0) rotate(0); opacity: 0; } 30% { opacity: 1; transform: scale(1.1) rotate(40deg); } 100% { transform: scale(0) rotate(120deg); opacity: 0; } }\n\n  /* Verktøylinje */\n  .verktoy { height: var(--vt); display: flex; gap: 8vw; justify-content: center; align-items: center; padding-bottom: env(safe-area-inset-bottom); background: rgba(255,255,255,.35); }\n  .knapp { width: 112px; height: 112px; border-radius: 50%; border: none; background: #fff; box-shadow: 0 6px 0 rgba(0,0,0,.12); display: grid; place-items: center; padding: 14px; transition: transform .2s, box-shadow .2s; }\n  .knapp svg { width: 100%; height: 100%; }\n  .knapp.aktiv { box-shadow: 0 0 0 7px #3e8ef7, 0 6px 0 rgba(0,0,0,.12); transform: scale(1.05); }\n  .knapp.hint { animation: pulse 1.6s ease-in-out infinite; }\n  @keyframes pulse { 0%,100% { transform: scale(1); } 50% { transform: scale(1.1); } }\n\n  .peker { position: fixed; width: 92px; height: 92px; pointer-events: none; transform: translate(-50%, -85%); display: none; z-index: 5; filter: drop-shadow(0 4px 3px rgba(0,0,0,.2)); }\n  .drape { position: fixed; width: 10px; height: 14px; border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%; background: #5fb0ff; pointer-events: none; z-index: 4; }\n",
  html: "\n<div class=\"scene\" id=\"scene\">\n  <!-- vegg -->\n  <svg class=\"vegg\" viewBox=\"0 0 1200 500\" preserveAspectRatio=\"xMidYMax slice\">\n    <defs>\n      <pattern id=\"fliser\" width=\"40\" height=\"40\" patternUnits=\"userSpaceOnUse\">\n        <rect width=\"40\" height=\"40\" fill=\"#e9f5ff\"/><rect x=\"1.5\" y=\"1.5\" width=\"37\" height=\"37\" rx=\"3\" fill=\"#f6fbff\"/>\n      </pattern>\n      <pattern id=\"fare\" width=\"28\" height=\"28\" patternUnits=\"userSpaceOnUse\" patternTransform=\"rotate(45)\">\n        <rect width=\"28\" height=\"28\" fill=\"#ffcf3f\"/><rect width=\"14\" height=\"28\" fill=\"#2a2a30\"/>\n      </pattern>\n      <linearGradient id=\"himmel\" x1=\"0\" y1=\"0\" x2=\"0\" y2=\"1\"><stop offset=\"0\" stop-color=\"#8fd0ff\"/><stop offset=\"1\" stop-color=\"#d9f1ff\"/></linearGradient>\n    </defs>\n    <rect width=\"1200\" height=\"500\" fill=\"url(#fliser)\"/>\n    <!-- blå stripe langs veggen -->\n    <rect y=\"330\" width=\"1200\" height=\"26\" fill=\"#7cc4ff\"/><rect y=\"356\" width=\"1200\" height=\"8\" fill=\"#5aa8ee\"/>\n    <!-- tak -->\n    <rect width=\"1200\" height=\"70\" fill=\"#2d6fd6\"/><rect y=\"70\" width=\"1200\" height=\"10\" fill=\"#1f56ad\"/>\n    <g>\n      <g transform=\"translate(330 80)\"><rect x=\"-3\" width=\"6\" height=\"26\" fill=\"#1f56ad\"/><path d=\"M-34 26 h68 l-12 22 h-44 z\" fill=\"#ffcf3f\"/><ellipse cy=\"50\" rx=\"22\" ry=\"5\" fill=\"#fff6c2\"/></g>\n      <g transform=\"translate(600 80)\"><rect x=\"-3\" width=\"6\" height=\"26\" fill=\"#1f56ad\"/><path d=\"M-34 26 h68 l-12 22 h-44 z\" fill=\"#ffcf3f\"/><ellipse cy=\"50\" rx=\"22\" ry=\"5\" fill=\"#fff6c2\"/></g>\n      <g transform=\"translate(870 80)\"><rect x=\"-3\" width=\"6\" height=\"26\" fill=\"#1f56ad\"/><path d=\"M-34 26 h68 l-12 22 h-44 z\" fill=\"#ffcf3f\"/><ellipse cy=\"50\" rx=\"22\" ry=\"5\" fill=\"#fff6c2\"/></g>\n    </g>\n    <!-- porter med utsikt -->\n    <g>\n      <rect x=\"0\" y=\"150\" width=\"150\" height=\"350\" fill=\"url(#himmel)\"/>\n      <circle cx=\"40\" cy=\"250\" r=\"34\" fill=\"#ffffff\"/><circle cx=\"80\" cy=\"245\" r=\"26\" fill=\"#ffffff\"/>\n      <path d=\"M0 470 Q60 420 150 455 L150 500 L0 500 Z\" fill=\"#7fcf86\"/>\n      <rect x=\"0\" y=\"150\" width=\"150\" height=\"40\" fill=\"#cdd6e0\"/><g stroke=\"#b3bfcc\" stroke-width=\"3\"><line x1=\"0\" y1=\"160\" x2=\"150\" y2=\"160\"/><line x1=\"0\" y1=\"170\" x2=\"150\" y2=\"170\"/><line x1=\"0\" y1=\"180\" x2=\"150\" y2=\"180\"/></g>\n      <rect x=\"150\" y=\"130\" width=\"22\" height=\"370\" fill=\"url(#fare)\"/>\n      <rect x=\"0\" y=\"130\" width=\"172\" height=\"22\" fill=\"url(#fare)\"/>\n    </g>\n    <g transform=\"translate(1200 0) scale(-1 1)\">\n      <rect x=\"0\" y=\"150\" width=\"150\" height=\"350\" fill=\"url(#himmel)\"/>\n      <circle cx=\"60\" cy=\"230\" r=\"28\" fill=\"#ffffff\"/><circle cx=\"96\" cy=\"236\" r=\"20\" fill=\"#ffffff\"/>\n      <path d=\"M0 460 Q80 430 150 465 L150 500 L0 500 Z\" fill=\"#7fcf86\"/>\n      <circle cx=\"40\" cy=\"430\" r=\"26\" fill=\"#4fae5c\"/><rect x=\"36\" y=\"440\" width=\"8\" height=\"40\" fill=\"#8b5a2b\"/>\n      <rect x=\"0\" y=\"150\" width=\"150\" height=\"40\" fill=\"#cdd6e0\"/><g stroke=\"#b3bfcc\" stroke-width=\"3\"><line x1=\"0\" y1=\"160\" x2=\"150\" y2=\"160\"/><line x1=\"0\" y1=\"170\" x2=\"150\" y2=\"170\"/><line x1=\"0\" y1=\"180\" x2=\"150\" y2=\"180\"/></g>\n      <rect x=\"150\" y=\"130\" width=\"22\" height=\"370\" fill=\"url(#fare)\"/>\n      <rect x=\"0\" y=\"130\" width=\"172\" height=\"22\" fill=\"url(#fare)\"/>\n    </g>\n    <!-- hylle med såpeflasker -->\n    <g transform=\"translate(210 250)\">\n      <rect x=\"0\" y=\"62\" width=\"150\" height=\"10\" rx=\"3\" fill=\"#8a96a6\"/>\n      <g><rect x=\"12\" y=\"18\" width=\"28\" height=\"44\" rx=\"8\" fill=\"#ff7eb6\"/><rect x=\"20\" y=\"6\" width=\"12\" height=\"14\" rx=\"3\" fill=\"#fff\"/><circle cx=\"26\" cy=\"40\" r=\"7\" fill=\"#fff\" opacity=\".7\"/></g>\n      <g><rect x=\"52\" y=\"10\" width=\"32\" height=\"52\" rx=\"9\" fill=\"#3e8ef7\"/><rect x=\"61\" y=\"0\" width=\"14\" height=\"12\" rx=\"3\" fill=\"#fff\"/><path d=\"M68 30 q-8 10 0 16 q8 -6 0 -16z\" fill=\"#fff\" opacity=\".8\"/></g>\n      <g><rect x=\"96\" y=\"22\" width=\"26\" height=\"40\" rx=\"8\" fill=\"#ffcf3f\"/><rect x=\"103\" y=\"12\" width=\"12\" height=\"12\" rx=\"3\" fill=\"#fff\"/><circle cx=\"109\" cy=\"42\" r=\"6\" fill=\"#fff\" opacity=\".7\"/></g>\n      <g><rect x=\"128\" y=\"30\" width=\"18\" height=\"32\" rx=\"6\" fill=\"#30a46c\"/><rect x=\"132\" y=\"22\" width=\"10\" height=\"10\" rx=\"2\" fill=\"#fff\"/></g>\n    </g>\n    <!-- skilt: bil + dråpe -->\n    <g transform=\"translate(930 205) scale(.62)\">\n      <rect x=\"0\" y=\"0\" width=\"140\" height=\"96\" rx=\"18\" fill=\"#2d6fd6\"/><rect x=\"6\" y=\"6\" width=\"128\" height=\"84\" rx=\"14\" fill=\"none\" stroke=\"#fff\" stroke-width=\"3\" opacity=\".6\"/>\n      <path d=\"M28 66 C28 56 34 52 44 51 L58 50 L68 38 C70 36 72 35 76 35 L96 35 C100 35 103 37 105 40 L112 50 L114 51 C118 52 120 56 120 62 L120 66 Z\" fill=\"#fff\"/>\n      <circle cx=\"50\" cy=\"68\" r=\"8\" fill=\"#2d6fd6\" stroke=\"#fff\" stroke-width=\"4\"/><circle cx=\"102\" cy=\"68\" r=\"8\" fill=\"#2d6fd6\" stroke=\"#fff\" stroke-width=\"4\"/>\n      <path d=\"M70 12 q-9 12 0 18 q9 -6 0 -18z\" fill=\"#7cd3ff\"/><path d=\"M90 8 q-7 9 0 14 q7 -5 0 -14z\" fill=\"#7cd3ff\"/>\n    </g>\n  </svg>\n  <!-- gulv -->\n  <svg class=\"gulv\" viewBox=\"0 0 1200 140\" preserveAspectRatio=\"xMidYMin slice\">\n    <defs><pattern id=\"fare2\" width=\"28\" height=\"28\" patternUnits=\"userSpaceOnUse\" patternTransform=\"rotate(45)\"><rect width=\"28\" height=\"28\" fill=\"#ffcf3f\"/><rect width=\"14\" height=\"28\" fill=\"#2a2a30\"/></pattern></defs>\n    <rect width=\"1200\" height=\"140\" fill=\"#aeb9c6\"/>\n    <rect y=\"0\" width=\"1200\" height=\"10\" fill=\"url(#fare2)\"/>\n    <rect y=\"10\" width=\"1200\" height=\"130\" fill=\"#b9c4d0\"/>\n    <g fill=\"#a4afbc\"><rect x=\"0\" y=\"60\" width=\"1200\" height=\"3\"/><rect x=\"0\" y=\"100\" width=\"1200\" height=\"3\"/></g>\n    <g fill=\"#8e99a7\">\n      <rect x=\"540\" y=\"96\" width=\"120\" height=\"22\" rx=\"6\"/>\n    </g>\n    <g stroke=\"#b9c4d0\" stroke-width=\"5\"><line x1=\"556\" y1=\"100\" x2=\"556\" y2=\"114\"/><line x1=\"572\" y1=\"100\" x2=\"572\" y2=\"114\"/><line x1=\"588\" y1=\"100\" x2=\"588\" y2=\"114\"/><line x1=\"604\" y1=\"100\" x2=\"604\" y2=\"114\"/><line x1=\"620\" y1=\"100\" x2=\"620\" y2=\"114\"/><line x1=\"636\" y1=\"100\" x2=\"636\" y2=\"114\"/><line x1=\"652\" y1=\"100\" x2=\"652\" y2=\"114\"/></g>\n  </svg>\n\n  <div class=\"carbox\" id=\"carbox\">\n    <svg class=\"portal\" viewBox=\"-32 -60 464 260\">\n      <defs><clipPath id=\"rullClip\"><rect x=\"14\" y=\"-30\" width=\"372\" height=\"18\" rx=\"9\"/></clipPath></defs>\n      <!-- stolper -->\n      <rect x=\"-26\" y=\"-48\" width=\"16\" height=\"242\" rx=\"4\" fill=\"#d9e1ea\"/><rect x=\"-26\" y=\"-48\" width=\"5\" height=\"242\" fill=\"#fff\" opacity=\".6\"/>\n      <rect x=\"410\" y=\"-48\" width=\"16\" height=\"242\" rx=\"4\" fill=\"#d9e1ea\"/><rect x=\"410\" y=\"-48\" width=\"5\" height=\"242\" fill=\"#fff\" opacity=\".6\"/>\n      <rect x=\"-30\" y=\"186\" width=\"24\" height=\"8\" rx=\"3\" fill=\"#8a96a6\"/><rect x=\"406\" y=\"186\" width=\"24\" height=\"8\" rx=\"3\" fill=\"#8a96a6\"/>\n      <!-- bjelke -->\n      <rect x=\"-30\" y=\"-58\" width=\"460\" height=\"22\" rx=\"8\" fill=\"#2d6fd6\"/>\n      <g fill=\"#fff\" opacity=\".9\"><circle cx=\"20\" cy=\"-47\" r=\"3.5\"/><circle cx=\"200\" cy=\"-47\" r=\"3.5\"/><circle cx=\"380\" cy=\"-47\" r=\"3.5\"/></g>\n      <!-- roterende børste -->\n      <g clip-path=\"url(#rullClip)\">\n        <rect x=\"14\" y=\"-30\" width=\"372\" height=\"18\" fill=\"#ff7eb6\"/>\n        <g class=\"rull\"><rect x=\"0\" y=\"-32\" width=\"5\" height=\"24\" fill=\"#e0569a\" transform=\"skewX(-25)\"/><rect x=\"12\" y=\"-32\" width=\"5\" height=\"24\" fill=\"#e0569a\" transform=\"skewX(-25)\"/><rect x=\"24\" y=\"-32\" width=\"5\" height=\"24\" fill=\"#e0569a\" transform=\"skewX(-25)\"/><rect x=\"36\" y=\"-32\" width=\"5\" height=\"24\" fill=\"#e0569a\" transform=\"skewX(-25)\"/><rect x=\"48\" y=\"-32\" width=\"5\" height=\"24\" fill=\"#e0569a\" transform=\"skewX(-25)\"/><rect x=\"60\" y=\"-32\" width=\"5\" height=\"24\" fill=\"#e0569a\" transform=\"skewX(-25)\"/><rect x=\"72\" y=\"-32\" width=\"5\" height=\"24\" fill=\"#e0569a\" transform=\"skewX(-25)\"/><rect x=\"84\" y=\"-32\" width=\"5\" height=\"24\" fill=\"#e0569a\" transform=\"skewX(-25)\"/><rect x=\"96\" y=\"-32\" width=\"5\" height=\"24\" fill=\"#e0569a\" transform=\"skewX(-25)\"/><rect x=\"108\" y=\"-32\" width=\"5\" height=\"24\" fill=\"#e0569a\" transform=\"skewX(-25)\"/><rect x=\"120\" y=\"-32\" width=\"5\" height=\"24\" fill=\"#e0569a\" transform=\"skewX(-25)\"/><rect x=\"132\" y=\"-32\" width=\"5\" height=\"24\" fill=\"#e0569a\" transform=\"skewX(-25)\"/><rect x=\"144\" y=\"-32\" width=\"5\" height=\"24\" fill=\"#e0569a\" transform=\"skewX(-25)\"/><rect x=\"156\" y=\"-32\" width=\"5\" height=\"24\" fill=\"#e0569a\" transform=\"skewX(-25)\"/><rect x=\"168\" y=\"-32\" width=\"5\" height=\"24\" fill=\"#e0569a\" transform=\"skewX(-25)\"/><rect x=\"180\" y=\"-32\" width=\"5\" height=\"24\" fill=\"#e0569a\" transform=\"skewX(-25)\"/><rect x=\"192\" y=\"-32\" width=\"5\" height=\"24\" fill=\"#e0569a\" transform=\"skewX(-25)\"/><rect x=\"204\" y=\"-32\" width=\"5\" height=\"24\" fill=\"#e0569a\" transform=\"skewX(-25)\"/><rect x=\"216\" y=\"-32\" width=\"5\" height=\"24\" fill=\"#e0569a\" transform=\"skewX(-25)\"/><rect x=\"228\" y=\"-32\" width=\"5\" height=\"24\" fill=\"#e0569a\" transform=\"skewX(-25)\"/><rect x=\"240\" y=\"-32\" width=\"5\" height=\"24\" fill=\"#e0569a\" transform=\"skewX(-25)\"/><rect x=\"252\" y=\"-32\" width=\"5\" height=\"24\" fill=\"#e0569a\" transform=\"skewX(-25)\"/><rect x=\"264\" y=\"-32\" width=\"5\" height=\"24\" fill=\"#e0569a\" transform=\"skewX(-25)\"/><rect x=\"276\" y=\"-32\" width=\"5\" height=\"24\" fill=\"#e0569a\" transform=\"skewX(-25)\"/><rect x=\"288\" y=\"-32\" width=\"5\" height=\"24\" fill=\"#e0569a\" transform=\"skewX(-25)\"/><rect x=\"300\" y=\"-32\" width=\"5\" height=\"24\" fill=\"#e0569a\" transform=\"skewX(-25)\"/><rect x=\"312\" y=\"-32\" width=\"5\" height=\"24\" fill=\"#e0569a\" transform=\"skewX(-25)\"/><rect x=\"324\" y=\"-32\" width=\"5\" height=\"24\" fill=\"#e0569a\" transform=\"skewX(-25)\"/><rect x=\"336\" y=\"-32\" width=\"5\" height=\"24\" fill=\"#e0569a\" transform=\"skewX(-25)\"/><rect x=\"348\" y=\"-32\" width=\"5\" height=\"24\" fill=\"#e0569a\" transform=\"skewX(-25)\"/><rect x=\"360\" y=\"-32\" width=\"5\" height=\"24\" fill=\"#e0569a\" transform=\"skewX(-25)\"/><rect x=\"372\" y=\"-32\" width=\"5\" height=\"24\" fill=\"#e0569a\" transform=\"skewX(-25)\"/><rect x=\"384\" y=\"-32\" width=\"5\" height=\"24\" fill=\"#e0569a\" transform=\"skewX(-25)\"/><rect x=\"396\" y=\"-32\" width=\"5\" height=\"24\" fill=\"#e0569a\" transform=\"skewX(-25)\"/><rect x=\"408\" y=\"-32\" width=\"5\" height=\"24\" fill=\"#e0569a\" transform=\"skewX(-25)\"/></g>\n        <rect x=\"14\" y=\"-30\" width=\"372\" height=\"5\" fill=\"#fff\" opacity=\".35\"/>\n      </g>\n      <!-- dyser -->\n      <g id=\"dyser\"></g>\n      <!-- lyskryss på utgangen -->\n      <g>\n        <rect x=\"402\" y=\"-34\" width=\"32\" height=\"56\" rx=\"8\" fill=\"#2a2a30\"/>\n        <circle class=\"lys-rod\" cx=\"418\" cy=\"-20\" r=\"9\"/>\n        <circle class=\"lys-gronn\" cx=\"418\" cy=\"6\" r=\"9\"/>\n      </g>\n    </svg>\n    <div class=\"puddle\" id=\"puddle\"></div>\n    <div class=\"shadow\"></div>\n    <div class=\"bil\" id=\"bil\">\n      <svg viewBox=\"0 0 400 200\" id=\"bilSvg\"></svg>\n      <canvas id=\"skitt\" width=\"1000\" height=\"500\"></canvas>\n      <canvas id=\"skum\" width=\"1000\" height=\"500\"></canvas>\n    </div>\n  </div>\n</div>\n\n<div class=\"verktoy\">\n  <button class=\"knapp aktiv hint\" id=\"btnSvamp\" aria-label=\"Svamp\"></button>\n  <button class=\"knapp\" id=\"btnSlange\" aria-label=\"Vannslange\"></button>\n</div>\n<div class=\"peker\" id=\"peker\"></div>\n\n",
  start() {
(() => {

  // ---------- Layout ----------
  const scene = document.getElementById('scene');
  const carbox = document.getElementById('carbox');
  function layout() {
    const r = scene.getBoundingClientRect();
    carbox.style.width = Math.min(r.width * 0.8, r.height * 0.6 * 2) + 'px';
  }
  layout(); window.addEventListener('resize', layout);

  // dyser i bjelken
  document.getElementById('dyser').innerHTML = [50,110,170,230,290,350].map(x => `
    <g transform="translate(${x} -12)">
      <rect x="-6" y="0" width="12" height="8" rx="2" fill="#8a96a6"/>
      <g class="dyse-spray" stroke="#7cc4ff" stroke-width="3" stroke-linecap="round">
        <line x1="0" y1="10" x2="-14" y2="70"/><line x1="0" y1="10" x2="0" y2="74"/><line x1="0" y1="10" x2="14" y2="70"/>
      </g>
    </g>`).join('');

  function bobler(n) {
    const r = scene.getBoundingClientRect();
    for (let i = 0; i < n; i++) {
      const b = document.createElement('div'); b.className = 'boble';
      const d = 10 + Math.random() * 26;
      b.style.width = b.style.height = d + 'px';
      b.style.left = (Math.random() * r.width) + 'px';
      b.style.top = (r.height * (0.45 + Math.random() * 0.4)) + 'px';
      b.style.animationDuration = (3 + Math.random() * 3) + 's';
      b.style.animationDelay = (Math.random() * 1.5) + 's';
      scene.insertBefore(b, carbox);
      setTimeout(() => b.remove(), 8000);
    }
  }

  // ---------- Ikoner ----------
  const SVAMP = `<svg viewBox="0 0 100 100"><rect x="14" y="26" width="72" height="50" rx="16" fill="#ffcf3f"/><rect x="14" y="58" width="72" height="18" rx="9" fill="#5cc27a"/><g fill="#e0a915"><circle cx="32" cy="40" r="5"/><circle cx="52" cy="36" r="4"/><circle cx="68" cy="44" r="5"/><circle cx="42" cy="50" r="3.5"/></g><g fill="#fff" stroke="#a9cdea" stroke-width="2"><circle cx="30" cy="20" r="8"/><circle cx="46" cy="14" r="6"/><circle cx="74" cy="20" r="7"/></g></svg>`;
  const SLANGE = `<svg viewBox="0 0 100 100"><path d="M8 92 C20 70 26 66 40 62" stroke="#30a46c" stroke-width="12" fill="none" stroke-linecap="round"/><rect x="34" y="42" width="22" height="34" rx="8" fill="#3e8ef7" transform="rotate(-25 45 59)"/><rect x="42" y="30" width="44" height="20" rx="8" fill="#3e8ef7" transform="rotate(-25 64 40)"/><rect x="78" y="14" width="12" height="18" rx="4" fill="#ffcf3f" transform="rotate(-25 84 23)"/><g fill="#5fb0ff"><circle cx="92" cy="8" r="4"/><circle cx="96" cy="20" r="3"/><circle cx="86" cy="4" r="2.5"/></g></svg>`;
  const STJERNE = `<svg viewBox="0 0 100 100"><path d="M50 4 L60 40 L96 50 L60 60 L50 96 L40 60 L4 50 L40 40 Z" fill="#fff6b0" stroke="#ffd23f" stroke-width="4" stroke-linejoin="round"/></svg>`;
  const btnSvamp = document.getElementById('btnSvamp');
  const btnSlange = document.getElementById('btnSlange');
  btnSvamp.innerHTML = SVAMP; btnSlange.innerHTML = SLANGE;
  const peker = document.getElementById('peker');

  // ---------- Canvas-oppsett ----------
  const S = 1000 / 400; // intern skala
  const skitt = document.getElementById('skitt').getContext('2d', { willReadFrequently: true });
  const skum = document.getElementById('skum').getContext('2d', { willReadFrequently: true });
  [skitt, skum].forEach(c => { c.setTransform(S,0,0,S,0,0); });
  const STRIDE = 4;
  function tell(ctx) {
    const d = ctx.getImageData(0, 0, 1000, 500).data;
    let n = 0;
    for (let y = 0; y < 500; y += STRIDE) for (let x = 0; x < 1000; x += STRIDE) if (d[(y*1000 + x)*4 + 3] > 40) n++;
    return n;
  }
  const maske = document.createElement('canvas'); maske.width = 1000; maske.height = 500;
  const mctx = maske.getContext('2d', { willReadFrequently: true }); mctx.setTransform(S,0,0,S,0,0);
  let SILHUETT_N = 1;
  function maskér(ctx) {
    ctx.save(); ctx.setTransform(1,0,0,1,0,0); ctx.globalCompositeOperation = 'destination-in'; ctx.drawImage(maske, 0, 0); ctx.restore();
  }

  const bilSvg = document.getElementById('bilSvg');
  let kIdx = (+new URLSearchParams(location.search).get('k') || 0) % KJORETOY_SPILL.length, runde = 0, K = KJORETOY_SPILL[kIdx];
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
      ${k.hjul.map(h => hjulMarkup(h, k)).join('')}`;
    bilSvg.style.setProperty('--bil', farge);
    // maske for skitt og skum: hver del fylles for seg (union uansett vinding)
    mctx.save(); mctx.setTransform(1,0,0,1,0,0); mctx.clearRect(0,0,1000,500); mctx.restore();
    mctx.fillStyle = '#000';
    k.deler.forEach(d => mctx.fill(new Path2D(d.d)));
    k.hjul.forEach(([x,y,r]) => { mctx.beginPath(); mctx.arc(x, y, r + (k.knaster ? 3 : 0), 0, Math.PI*2); mctx.fill(); });
    SILHUETT_N = tell(mctx);
  }

  const rnd = (a, b) => a + Math.random() * (b - a);
  let skittStart = 1;

  function lagSkitt() {
    const c = skitt;
    c.save(); c.setTransform(1,0,0,1,0,0); c.clearRect(0,0,1000,500); c.restore();
    skum.save(); skum.setTransform(1,0,0,1,0,0); skum.clearRect(0,0,1000,500); skum.restore();
    c.save();
    const bruner = ['#7a5230','#8b6239','#6b4527','#9c7448','#5e3d22'];
    // gjørmebånd nederst
    const g = c.createLinearGradient(0, 95, 0, 165);
    g.addColorStop(0, 'rgba(110,75,40,0)'); g.addColorStop(.45, 'rgba(110,75,40,.85)'); g.addColorStop(1, 'rgba(90,60,30,.95)');
    c.fillStyle = g; c.fillRect(0, 95, 400, 100);
    // flekker
    for (let i = 0; i < 34; i++) {
      const x = rnd(10, 395), y = Math.random() < .65 ? rnd(100, 165) : rnd(15, 110);
      const r = rnd(10, 30);
      c.fillStyle = bruner[i % bruner.length];
      c.globalAlpha = rnd(.75, .95);
      for (let k = 0; k < 6; k++) { c.beginPath(); c.arc(x + rnd(-r, r)*.7, y + rnd(-r, r)*.5, r * rnd(.4, .8), 0, Math.PI*2); c.fill(); }
    }
    // sprut
    for (let i = 0; i < 160; i++) {
      c.globalAlpha = rnd(.6, 1);
      c.fillStyle = bruner[i % bruner.length];
      c.beginPath(); c.arc(rnd(5, 395), rnd(40, 192), rnd(1, 4.5), 0, Math.PI*2); c.fill();
    }
    // hjulene ekstra møkkete
    K.hjul.forEach(([x,y,r]) => { c.globalAlpha = .9; c.fillStyle = '#6b4527'; c.beginPath(); c.arc(x, y, r, 0, Math.PI*2); c.fill(); });
    c.restore(); c.globalAlpha = 1;
    maskér(c);
    skittStart = tell(skitt);
  }

  // ---------- Lyd (WebAudio, ingen filer) ----------
  let ac = null, stoy = null, gniFilter = null, gniGain = null, gniMal = 0;
  function startLyd() {
    if (ac) { if (ac.state === 'suspended') ac.resume(); return; }
    try {
      ac = Lyd.start(); if (!ac) return;
      const buf = ac.createBuffer(1, ac.sampleRate * 2, ac.sampleRate);
      const d = buf.getChannelData(0); for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
      stoy = ac.createBufferSource(); stoy.buffer = buf; stoy.loop = true;
      gniFilter = ac.createBiquadFilter(); gniGain = ac.createGain(); gniGain.gain.value = 0;
      stoy.connect(gniFilter).connect(gniGain).connect(ac.destination); stoy.start();
    } catch (e) { ac = null; }
  }
  const motor = () => motorLyd(1.5, K.lyd === 'traktor');
  const signal = () => LYDER[K.lyd]();

  // ---------- Verktøy og tilstand ----------
  let verktoy = 'svamp', aktiv = false, ferdig = false, sist = null, vannBrukt = 0;
  function velg(v) {
    verktoy = v;
    btnSvamp.classList.toggle('aktiv', v === 'svamp');
    btnSlange.classList.toggle('aktiv', v === 'slange');
    peker.innerHTML = v === 'svamp' ? SVAMP : SLANGE;
    startLyd();
  }
  btnSvamp.addEventListener('pointerdown', e => { e.stopPropagation(); velg('svamp'); });
  btnSlange.addEventListener('pointerdown', e => { e.stopPropagation(); velg('slange'); });
  velg('svamp');

  const bilEl = document.getElementById('bil');
  function tilBil(e) {
    const r = bilEl.getBoundingClientRect();
    return [(e.clientX - r.left) / r.width * 400, (e.clientY - r.top) / r.height * 200];
  }

  function svampStrok(x, y) {
    skitt.save(); skitt.globalCompositeOperation = 'destination-out';
    skitt.beginPath(); skitt.arc(x, y, 22, 0, Math.PI*2); skitt.fill(); skitt.restore();
    skum.save();
    for (let i = 0; i < 4; i++) {
      const bx = x + rnd(-20, 20), by = y + rnd(-16, 16), br = rnd(3.5, 10);
      skum.fillStyle = 'rgba(255,255,255,.96)'; skum.strokeStyle = 'rgba(160,195,230,.9)'; skum.lineWidth = .8;
      skum.beginPath(); skum.arc(bx, by, br, 0, Math.PI*2); skum.fill(); skum.stroke();
      skum.fillStyle = 'rgba(200,225,255,.9)';
      skum.beginPath(); skum.arc(bx - br*.35, by - br*.35, br*.22, 0, Math.PI*2); skum.fill();
    }
    skum.restore();
  }
  function slangeStrok(x, y) {
    skum.save(); skum.globalCompositeOperation = 'destination-out';
    skum.beginPath(); skum.arc(x, y, 30, 0, Math.PI*2); skum.fill(); skum.restore();
    skitt.save(); skitt.globalCompositeOperation = 'destination-out'; skitt.globalAlpha = .18;
    skitt.beginPath(); skitt.arc(x, y, 18, 0, Math.PI*2); skitt.fill(); skitt.restore();
    vannBrukt++;
    document.getElementById('puddle').style.opacity = Math.min(.9, vannBrukt / 120);
  }

  function drape(cx, cy) {
    const d = document.createElement('div'); d.className = 'drape';
    d.style.left = cx + rnd(-30, 30) + 'px'; d.style.top = cy + rnd(-10, 10) + 'px';
    document.body.appendChild(d);
    const vy = rnd(160, 320);
    d.animate([{ transform: 'translateY(0)', opacity: 1 }, { transform: `translateY(${vy}px)`, opacity: 0 }], { duration: 600, easing: 'ease-in' }).onfinish = () => d.remove();
  }

  let malTimer = 0;
  function handling(e) {
    const [x, y] = tilBil(e);
    peker.style.left = e.clientX + 'px'; peker.style.top = e.clientY + 'px';
    if (ferdig) return;
    // interpoler mellom punkter for jevne strøk
    const fra = sist || [x, y];
    const dist = Math.hypot(x - fra[0], y - fra[1]);
    const steg = Math.max(1, Math.ceil(dist / 6));
    for (let i = 1; i <= steg; i++) {
      const px = fra[0] + (x - fra[0]) * i / steg, py = fra[1] + (y - fra[1]) * i / steg;
      verktoy === 'svamp' ? svampStrok(px, py) : slangeStrok(px, py);
    }
    if (verktoy === 'svamp') maskér(skum);
    if (verktoy === 'svamp') { gniMal = Math.min(.35, gniMal + dist * .01); if (Math.random() < .04) bobler(1); }
    else if (Math.random() < .5) drape(e.clientX, e.clientY);
    sist = [x, y];
    const naa = performance.now();
    if (naa - malTimer > 350) { malTimer = naa; sjekk(); }
  }

  document.getElementById('scene').addEventListener('pointerdown', e => {
    startLyd(); aktiv = true; sist = null;
    if (!ferdig) carbox.classList.add('vasker');
    peker.style.display = 'block';
    e.target.setPointerCapture?.(e.pointerId);
    handling(e);
  });
  window.addEventListener('pointermove', e => { if (aktiv) handling(e); });
  const slipp = () => { carbox.classList.remove('vasker'); if (!aktiv) return; aktiv = false; sist = null; peker.style.display = 'none'; sjekk(); };
  window.addEventListener('pointerup', slipp); window.addEventListener('pointercancel', slipp);

  // lydloop: gnisselyd for svamp, sus for slange
  (function lydLoop() {
    if (ac && gniGain) {
      let mal = 0;
      if (aktiv && verktoy === 'slange') { gniFilter.type = 'bandpass'; gniFilter.frequency.value = 2600; gniFilter.Q.value = .7; mal = .22; }
      else if (aktiv && verktoy === 'svamp') { gniFilter.type = 'lowpass'; gniFilter.frequency.value = 700; gniFilter.Q.value = 6; mal = gniMal; }
      gniGain.gain.setTargetAtTime(mal, ac.currentTime, .05);
      gniMal *= .85;
    }
    requestAnimationFrame(lydLoop);
  })();

  // ---------- Fremdrift ----------
  function sjekk() {
    if (ferdig) return;
    const skittAndel = tell(skitt) / skittStart;
    const skumAndel = tell(skum) / SILHUETT_N;
    // hint: pulser neste naturlige verktøy, aldri «feil»
    const hintSlange = skittAndel < .25 && skumAndel > .03;
    btnSlange.classList.toggle('hint', hintSlange);
    btnSvamp.classList.toggle('hint', !hintSlange && skittAndel >= .25 && verktoy !== 'svamp');
    if (skittAndel < .07 && skumAndel < .025) blank();
  }

  function blank() {
    ferdig = true; aktiv = false; peker.style.display = 'none';
    carbox.classList.remove('vasker');
    carbox.classList.add('spray'); setTimeout(() => carbox.classList.remove('spray'), 1100);
    setTimeout(() => carbox.classList.add('klar'), 900);
    bobler(14);
    gniMal = 0;
    btnSvamp.classList.remove('hint'); btnSlange.classList.remove('hint');
    // fade ut rester
    ['skitt', 'skum'].forEach(id => document.getElementById(id).animate([{ opacity: 1 }, { opacity: 0 }], { duration: 500, fill: 'forwards' }));
    const svg = document.getElementById('bilSvg');
    svg.classList.add('skinn'); bilEl.classList.add('hopp');
    jingle(); setTimeout(signal, 700);
    const box = document.getElementById('carbox');
    for (let i = 0; i < 9; i++) setTimeout(() => {
      const s = document.createElement('div'); s.className = 'stjerne'; s.innerHTML = STJERNE;
      s.style.left = rnd(5, 85) + '%'; s.style.top = rnd(10, 60) + '%';
      bilEl.appendChild(s); setTimeout(() => s.remove(), 1300);
    }, i * 140);
    setTimeout(kjorUt, 3000);
  }

  function kjorUt() {
    const svg = document.getElementById('bilSvg');
    svg.classList.remove('skinn'); bilEl.classList.remove('hopp');
    svg.classList.add('kjorer'); bilEl.classList.add('ut');
    motor(); bilEl.style.transform = 'translateX(130vw)';
    document.getElementById('puddle').style.opacity = 0; vannBrukt = 0;
    setTimeout(nyBil, 1600);
  }

  function nyBil() {
    const svg = document.getElementById('bilSvg');
    kIdx = (kIdx + 1) % KJORETOY_SPILL.length; if (kIdx === 0) runde++;
    K = KJORETOY_SPILL[kIdx];
    byggKjoretoy(K, K.farger[runde % K.farger.length]);
    ['skitt', 'skum'].forEach(id => { document.getElementById(id).getAnimations().forEach(a => a.cancel()); });
    lagSkitt();
    carbox.classList.remove('klar');
    bilEl.classList.remove('ut');
    bilEl.style.transition = 'none'; bilEl.style.transform = 'translateX(-130vw)';
    bilEl.offsetWidth; // reflow
    bilEl.style.transition = ''; bilEl.style.transform = 'translateX(0)';
    svg.classList.add('kjorer'); motor();
    if (['sirene','rygg','politi','is'].includes(K.lyd)) setTimeout(signal, 300);
    setTimeout(() => { svg.classList.remove('kjorer'); ferdig = false; velg('svamp'); btnSvamp.classList.add('hint'); }, 1650);
  }

  // første bil kjører inn
  byggKjoretoy(K, K.farger[0]);
  lagSkitt();
  ferdig = true;
  bilEl.style.transition = 'none'; bilEl.style.transform = 'translateX(-130vw)';
  requestAnimationFrame(() => requestAnimationFrame(() => {
    bilEl.style.transition = ''; bilEl.style.transform = 'translateX(0)';
    document.getElementById('bilSvg').classList.add('kjorer');
    setTimeout(() => { document.getElementById('bilSvg').classList.remove('kjorer'); ferdig = false; }, 1650);
  }));
})();
  },
});
