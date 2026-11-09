// Bilspill-modul: fabrikk
Bilspill.modul('fabrikk', {
  css: "\n  * { box-sizing: border-box; -webkit-tap-highlight-color: transparent; }\n  :root { --vt: 130px; --kn: 76px; --rk: 76px; }\n  @media (max-height: 520px) { :root { --vt: 96px; --kn: 62px; --rk: 58px; } }\n  @media (max-width: 700px) { :root { --kn: 54px; } }\n  html, body { margin: 0; height: 100%; overflow: hidden; touch-action: none; user-select: none; -webkit-user-select: none; font-family: system-ui, sans-serif; }\n  body { background: #232832; display: flex; flex-direction: column; }\n\n  .scene { position: relative; flex: 1; overflow: hidden; }\n  .vegg { position: absolute; left: 0; top: 0; width: 100%; height: 78%; pointer-events: none; }\n  .gulv { position: absolute; left: 0; bottom: 0; width: 100%; height: 22%; pointer-events: none; }\n  .carbox { position: absolute; left: 50%; bottom: 7%; transform: translateX(-50%); width: 300px; aspect-ratio: 2 / 1; }\n  .ramme { position: absolute; left: -8%; width: 116%; top: -30%; height: 130%; overflow: visible; pointer-events: none; }\n  .shadow { position: absolute; left: 6%; right: 6%; bottom: 0; height: 6%; border-radius: 50%; background: rgba(0,0,0,.3); filter: blur(4px); }\n  .bil { position: absolute; inset: 0; transition: transform 1.4s cubic-bezier(.2,.7,.3,1); }\n  .bil.ut { transition: transform 1.3s cubic-bezier(.6,0,.9,.5); }\n  .bil > svg { position: absolute; inset: 0; width: 100%; height: 100%; overflow: visible; }\n  .hopp { animation: hopp .7s ease-out 2; }\n  @keyframes hopp { 0%,100% { transform: translateY(0); } 30% { transform: translateY(-5%); } 55% { transform: translateY(0); } 70% { transform: translateY(-1.5%); } }\n  .dunk { animation: dunk .35s ease-out; }\n  @keyframes dunk { 0%,100% { transform: translateY(0); } 40% { transform: translateY(2.5%); } }\n\n  .hjul { transform-box: fill-box; transform-origin: center; }\n  .kjorer .hjul { animation: spinn .35s linear infinite; }\n  @keyframes spinn { to { transform: rotate(360deg); } }\n  .blink { animation: blink .5s steps(2) infinite; }\n  @keyframes blink { 50% { opacity: .25; } }\n  .propell { transform-box: fill-box; transform-origin: center; animation: propell .18s linear infinite alternate; }\n  @keyframes propell { from { transform: scaleX(1); } to { transform: scaleX(.08); } }\n  .glint { transform: translateX(-200px); }\n  .skinn .glint { animation: glint 1.1s ease-in-out 2; }\n  @keyframes glint { from { transform: translateX(-200px); } to { transform: translateX(520px); } }\n  .ny { animation: plopp .4s cubic-bezier(.3,1.8,.5,1); transform-box: fill-box; transform-origin: 50% 100%; }\n  @keyframes plopp { from { transform: scale(.4); opacity: .3; } to { transform: scale(1); opacity: 1; } }\n\n  .tannhjul { transform-box: fill-box; transform-origin: center; animation: spinn 8s linear infinite; }\n  .tannhjul.mot { animation-direction: reverse; animation-duration: 5s; }\n  .varsel { transform-box: fill-box; transform-origin: center; animation: spinn 1.2s linear infinite; }\n  .robot { transition: transform .25s ease-out; }\n  .jobb .robot-v { transform: rotate(28deg); }\n  .jobb .robot-h { transform: rotate(-28deg); }\n  .baandstriper { animation: baand .5s linear infinite; animation-play-state: paused; }\n  .band .baandstriper { animation-play-state: running; }\n  @keyframes baand { to { transform: translateX(20px); } }\n  .gnist { position: absolute; width: 6px; height: 6px; border-radius: 50%; background: #ffd23f; box-shadow: 0 0 6px #ffb703; pointer-events: none; }\n  .stjerne { position: absolute; width: 9%; pointer-events: none; animation: glitre 1.2s ease-out forwards; }\n  @keyframes glitre { 0% { transform: scale(0) rotate(0); opacity: 0; } 30% { opacity: 1; transform: scale(1.1) rotate(40deg); } 100% { transform: scale(0) rotate(120deg); opacity: 0; } }\n\n  .skinne { position: absolute; right: 10px; top: 50%; transform: translateY(-50%); display: flex; flex-direction: column; gap: 10px; z-index: 3; }\n  .kat { width: var(--rk); height: var(--rk); border-radius: 20px; border: none; background: #4a5262; box-shadow: 0 5px 0 rgba(0,0,0,.35); padding: 9px; display: grid; place-items: center; transition: transform .2s, background .2s; }\n  .kat svg { width: 100%; height: 100%; pointer-events: none; }\n  .kat.aktiv { background: #ffcf3f; transform: translateX(-8px) scale(1.06); }\n  .verktoy { min-height: var(--vt); display: flex; flex-wrap: wrap; align-content: center; gap: 10px; justify-content: center; align-items: center; padding: 8px 10px calc(8px + env(safe-area-inset-bottom)); background: #343b48; box-shadow: inset 0 6px 0 #232832; }\n  .knapp { flex: none; width: var(--kn); height: var(--kn); border-radius: 20px; border: none; background: #f2f4f7; box-shadow: 0 5px 0 rgba(0,0,0,.3); display: grid; place-items: center; padding: 6px; transition: transform .2s, box-shadow .2s; }\n  .knapp svg { width: 100%; height: 100%; pointer-events: none; overflow: visible; }\n  .knapp.aktiv { box-shadow: 0 0 0 5px #ffcf3f, 0 5px 0 rgba(0,0,0,.3); transform: translateY(-5px); }\n  .knapp.terning { background: #8e4ec6; margin-left: 10px; }\n  .knapp.kjor { background: #3ddc6f; border-radius: 50%; }\n  .skille { width: 3px; height: 50%; background: #232832; border-radius: 2px; }\n",
  html: "\n<div class=\"scene\" id=\"scene\">\n  <svg class=\"vegg\" viewBox=\"0 0 1200 500\" preserveAspectRatio=\"xMidYMax slice\">\n    <defs>\n      <pattern id=\"plater\" width=\"120\" height=\"80\" patternUnits=\"userSpaceOnUse\"><rect width=\"120\" height=\"80\" fill=\"#5a6476\"/><rect x=\"2\" y=\"2\" width=\"116\" height=\"76\" rx=\"3\" fill=\"#636e82\"/><g fill=\"#4f5868\"><circle cx=\"8\" cy=\"8\" r=\"2.5\"/><circle cx=\"112\" cy=\"8\" r=\"2.5\"/><circle cx=\"8\" cy=\"72\" r=\"2.5\"/><circle cx=\"112\" cy=\"72\" r=\"2.5\"/></g></pattern>\n      <pattern id=\"fare\" width=\"28\" height=\"28\" patternUnits=\"userSpaceOnUse\" patternTransform=\"rotate(45)\"><rect width=\"28\" height=\"28\" fill=\"#ffcf3f\"/><rect width=\"14\" height=\"28\" fill=\"#2a2a30\"/></pattern>\n      <linearGradient id=\"himmel\" x1=\"0\" y1=\"0\" x2=\"0\" y2=\"1\"><stop offset=\"0\" stop-color=\"#8fd0ff\"/><stop offset=\"1\" stop-color=\"#d9f1ff\"/></linearGradient>\n      <g id=\"tann\"><path d=\"M0 -50 L8 -50 L10 -40 L20 -36 L28 -43 L34 -37 L28 -28 L33 -18 L44 -16 L44 -8 L34 -5 L32 5 L41 12 L37 19 L27 15 L19 23 L22 33 L15 37 L9 28 L-1 30 L-4 40 L-12 39 L-12 29 L-22 24 L-30 31 L-36 25 L-29 16 L-33 6 L-44 4 L-44 -4 L-33 -7 L-30 -17 L-38 -24 L-33 -31 L-23 -26 L-14 -33 L-14 -44 L-6 -46 Z\" fill=\"#8a96a6\"/><circle r=\"14\" fill=\"#5a6476\"/><circle r=\"6\" fill=\"#c9ced6\"/></g>\n    </defs>\n    <rect width=\"1200\" height=\"500\" fill=\"url(#plater)\"/>\n    <!-- høye vinduer -->\n    <g fill=\"#9fd6ff\" opacity=\".8\"><rect x=\"300\" y=\"110\" width=\"120\" height=\"60\" rx=\"4\"/><rect x=\"540\" y=\"110\" width=\"120\" height=\"60\" rx=\"4\"/><rect x=\"780\" y=\"110\" width=\"120\" height=\"60\" rx=\"4\"/></g>\n    <g stroke=\"#5a6476\" stroke-width=\"4\"><line x1=\"360\" y1=\"110\" x2=\"360\" y2=\"170\"/><line x1=\"600\" y1=\"110\" x2=\"600\" y2=\"170\"/><line x1=\"840\" y1=\"110\" x2=\"840\" y2=\"170\"/></g>\n    <!-- takbjelker -->\n    <rect width=\"1200\" height=\"70\" fill=\"#343b48\"/>\n    <g stroke=\"#4a5262\" stroke-width=\"6\"><path d=\"M0 70 L60 10 L120 70 L180 10 L240 70 L300 10 L360 70 L420 10 L480 70 L540 10 L600 70 L660 10 L720 70 L780 10 L840 70 L900 10 L960 70 L1020 10 L1080 70 L1140 10 L1200 70\"/></g>\n    <rect y=\"66\" width=\"1200\" height=\"12\" fill=\"#ffcf3f\"/>\n    <!-- tannhjul -->\n    <g transform=\"translate(250 270)\"><g class=\"tannhjul\"><use href=\"#tann\"/></g></g>\n    <g transform=\"translate(312 330) scale(.6)\"><g class=\"tannhjul mot\"><use href=\"#tann\"/></g></g>\n    <g transform=\"translate(950 280) scale(.8)\"><g class=\"tannhjul mot\"><use href=\"#tann\"/></g></g>\n    <!-- rør -->\n    <g fill=\"none\" stroke-linecap=\"round\"><path d=\"M880 80 L880 180 Q880 200 900 200 L1010 200\" stroke=\"#e5484d\" stroke-width=\"14\"/><path d=\"M190 80 L190 150 Q190 170 210 170 L330 170\" stroke=\"#3e8ef7\" stroke-width=\"12\"/></g>\n    <!-- varsellampe -->\n    <g transform=\"translate(600 205)\"><rect x=\"-16\" y=\"10\" width=\"32\" height=\"10\" rx=\"3\" fill=\"#2a2a30\"/><path d=\"M-12 10 L-12 -4 Q0 -18 12 -4 L12 10 Z\" fill=\"#f76b15\"/><g class=\"varsel\"><path d=\"M0 0 L40 -10 L40 10 Z\" fill=\"#ffcf3f\" opacity=\".35\"/></g></g>\n    <!-- porter -->\n    <g>\n      <rect x=\"0\" y=\"150\" width=\"150\" height=\"350\" fill=\"url(#himmel)\"/>\n      <circle cx=\"40\" cy=\"250\" r=\"34\" fill=\"#fff\"/><circle cx=\"80\" cy=\"245\" r=\"26\" fill=\"#fff\"/>\n      <path d=\"M0 470 Q60 420 150 455 L150 500 L0 500 Z\" fill=\"#7fcf86\"/>\n      <rect x=\"150\" y=\"130\" width=\"22\" height=\"370\" fill=\"url(#fare)\"/><rect x=\"0\" y=\"130\" width=\"172\" height=\"22\" fill=\"url(#fare)\"/>\n    </g>\n    <g transform=\"translate(1200 0) scale(-1 1)\">\n      <rect x=\"0\" y=\"150\" width=\"150\" height=\"350\" fill=\"url(#himmel)\"/>\n      <circle cx=\"60\" cy=\"230\" r=\"28\" fill=\"#fff\"/><circle cx=\"96\" cy=\"236\" r=\"20\" fill=\"#fff\"/>\n      <path d=\"M0 460 Q80 430 150 465 L150 500 L0 500 Z\" fill=\"#7fcf86\"/>\n      <circle cx=\"40\" cy=\"430\" r=\"26\" fill=\"#4fae5c\"/><rect x=\"36\" y=\"440\" width=\"8\" height=\"40\" fill=\"#8b5a2b\"/>\n      <rect x=\"150\" y=\"130\" width=\"22\" height=\"370\" fill=\"url(#fare)\"/><rect x=\"0\" y=\"130\" width=\"172\" height=\"22\" fill=\"url(#fare)\"/>\n    </g>\n  </svg>\n  <svg class=\"gulv\" viewBox=\"0 0 1200 140\" preserveAspectRatio=\"xMidYMin slice\">\n    <defs><pattern id=\"fare2\" width=\"28\" height=\"28\" patternUnits=\"userSpaceOnUse\" patternTransform=\"rotate(45)\"><rect width=\"28\" height=\"28\" fill=\"#ffcf3f\"/><rect width=\"14\" height=\"28\" fill=\"#2a2a30\"/></pattern></defs>\n    <rect width=\"1200\" height=\"140\" fill=\"#7d8796\"/><rect width=\"1200\" height=\"10\" fill=\"url(#fare2)\"/>\n    <g fill=\"#6f7987\"><rect x=\"0\" y=\"60\" width=\"1200\" height=\"3\"/><rect x=\"0\" y=\"100\" width=\"1200\" height=\"3\"/></g>\n  </svg>\n\n  <div class=\"skinne\" id=\"skinne\"></div>\n\n  <div class=\"carbox\" id=\"carbox\">\n    <svg class=\"ramme\" viewBox=\"-32 -60 464 260\">\n      <defs><clipPath id=\"baandClip\"><rect x=\"-20\" y=\"190\" width=\"440\" height=\"10\" rx=\"5\"/></clipPath></defs>\n      <!-- transportbånd -->\n      <rect x=\"-20\" y=\"188\" width=\"440\" height=\"14\" rx=\"7\" fill=\"#2a2a30\"/>\n      <g clip-path=\"url(#baandClip)\"><g class=\"baandstriper\"><rect x=\"-60\" y=\"188\" width=\"8\" height=\"14\" fill=\"#4a5262\" transform=\"skewX(-30)\"/><rect x=\"-40\" y=\"188\" width=\"8\" height=\"14\" fill=\"#4a5262\" transform=\"skewX(-30)\"/><rect x=\"-20\" y=\"188\" width=\"8\" height=\"14\" fill=\"#4a5262\" transform=\"skewX(-30)\"/><rect x=\"0\" y=\"188\" width=\"8\" height=\"14\" fill=\"#4a5262\" transform=\"skewX(-30)\"/><rect x=\"20\" y=\"188\" width=\"8\" height=\"14\" fill=\"#4a5262\" transform=\"skewX(-30)\"/><rect x=\"40\" y=\"188\" width=\"8\" height=\"14\" fill=\"#4a5262\" transform=\"skewX(-30)\"/><rect x=\"60\" y=\"188\" width=\"8\" height=\"14\" fill=\"#4a5262\" transform=\"skewX(-30)\"/><rect x=\"80\" y=\"188\" width=\"8\" height=\"14\" fill=\"#4a5262\" transform=\"skewX(-30)\"/><rect x=\"100\" y=\"188\" width=\"8\" height=\"14\" fill=\"#4a5262\" transform=\"skewX(-30)\"/><rect x=\"120\" y=\"188\" width=\"8\" height=\"14\" fill=\"#4a5262\" transform=\"skewX(-30)\"/><rect x=\"140\" y=\"188\" width=\"8\" height=\"14\" fill=\"#4a5262\" transform=\"skewX(-30)\"/><rect x=\"160\" y=\"188\" width=\"8\" height=\"14\" fill=\"#4a5262\" transform=\"skewX(-30)\"/><rect x=\"180\" y=\"188\" width=\"8\" height=\"14\" fill=\"#4a5262\" transform=\"skewX(-30)\"/><rect x=\"200\" y=\"188\" width=\"8\" height=\"14\" fill=\"#4a5262\" transform=\"skewX(-30)\"/><rect x=\"220\" y=\"188\" width=\"8\" height=\"14\" fill=\"#4a5262\" transform=\"skewX(-30)\"/><rect x=\"240\" y=\"188\" width=\"8\" height=\"14\" fill=\"#4a5262\" transform=\"skewX(-30)\"/><rect x=\"260\" y=\"188\" width=\"8\" height=\"14\" fill=\"#4a5262\" transform=\"skewX(-30)\"/><rect x=\"280\" y=\"188\" width=\"8\" height=\"14\" fill=\"#4a5262\" transform=\"skewX(-30)\"/><rect x=\"300\" y=\"188\" width=\"8\" height=\"14\" fill=\"#4a5262\" transform=\"skewX(-30)\"/><rect x=\"320\" y=\"188\" width=\"8\" height=\"14\" fill=\"#4a5262\" transform=\"skewX(-30)\"/><rect x=\"340\" y=\"188\" width=\"8\" height=\"14\" fill=\"#4a5262\" transform=\"skewX(-30)\"/><rect x=\"360\" y=\"188\" width=\"8\" height=\"14\" fill=\"#4a5262\" transform=\"skewX(-30)\"/><rect x=\"380\" y=\"188\" width=\"8\" height=\"14\" fill=\"#4a5262\" transform=\"skewX(-30)\"/><rect x=\"400\" y=\"188\" width=\"8\" height=\"14\" fill=\"#4a5262\" transform=\"skewX(-30)\"/><rect x=\"420\" y=\"188\" width=\"8\" height=\"14\" fill=\"#4a5262\" transform=\"skewX(-30)\"/><rect x=\"440\" y=\"188\" width=\"8\" height=\"14\" fill=\"#4a5262\" transform=\"skewX(-30)\"/><rect x=\"460\" y=\"188\" width=\"8\" height=\"14\" fill=\"#4a5262\" transform=\"skewX(-30)\"/><rect x=\"480\" y=\"188\" width=\"8\" height=\"14\" fill=\"#4a5262\" transform=\"skewX(-30)\"/><rect x=\"500\" y=\"188\" width=\"8\" height=\"14\" fill=\"#4a5262\" transform=\"skewX(-30)\"/><rect x=\"520\" y=\"188\" width=\"8\" height=\"14\" fill=\"#4a5262\" transform=\"skewX(-30)\"/><rect x=\"540\" y=\"188\" width=\"8\" height=\"14\" fill=\"#4a5262\" transform=\"skewX(-30)\"/></g></g>\n      <g fill=\"#8a96a6\"><circle cx=\"-12\" cy=\"195\" r=\"5\"/><circle cx=\"412\" cy=\"195\" r=\"5\"/></g>\n      <!-- roboter -->\n      <g transform=\"translate(-14 194)\">\n        <rect x=\"-16\" y=\"-12\" width=\"32\" height=\"12\" rx=\"3\" fill=\"#ffcf3f\"/>\n        <g class=\"robot robot-v\" style=\"transform-origin: 0px -14px;\">\n          <circle cy=\"-14\" r=\"8\" fill=\"#2a2a30\"/>\n          <rect x=\"-6\" y=\"-104\" width=\"12\" height=\"92\" rx=\"5\" fill=\"#ffcf3f\"/>\n          <circle cy=\"-104\" r=\"7\" fill=\"#2a2a30\"/>\n          <g transform=\"translate(0 -104) rotate(70)\"><rect x=\"-5\" y=\"-60\" width=\"10\" height=\"60\" rx=\"4\" fill=\"#f76b15\"/><path d=\"M-10 -60 L-10 -74 M10 -60 L10 -74\" stroke=\"#2a2a30\" stroke-width=\"5\" stroke-linecap=\"round\"/></g>\n        </g>\n      </g>\n      <g transform=\"translate(414 194) scale(-1 1)\">\n        <rect x=\"-16\" y=\"-12\" width=\"32\" height=\"12\" rx=\"3\" fill=\"#ffcf3f\"/>\n        <g class=\"robot robot-v\" style=\"transform-origin: 0px -14px;\">\n          <circle cy=\"-14\" r=\"8\" fill=\"#2a2a30\"/>\n          <rect x=\"-6\" y=\"-104\" width=\"12\" height=\"92\" rx=\"5\" fill=\"#ffcf3f\"/>\n          <circle cy=\"-104\" r=\"7\" fill=\"#2a2a30\"/>\n          <g transform=\"translate(0 -104) rotate(70)\"><rect x=\"-5\" y=\"-60\" width=\"10\" height=\"60\" rx=\"4\" fill=\"#f76b15\"/><path d=\"M-10 -60 L-10 -74 M10 -60 L10 -74\" stroke=\"#2a2a30\" stroke-width=\"5\" stroke-linecap=\"round\"/></g>\n        </g>\n      </g>\n    </svg>\n    <div class=\"shadow\"></div>\n    <div class=\"bil\" id=\"bil\"><svg viewBox=\"0 0 400 200\" id=\"bilSvg\"></svg></div>\n  </div>\n</div>\n\n<div class=\"verktoy\" id=\"verktoy\"></div>\n\n",
  start() {
(() => {


  const mini = (kar, farge = '#9aa3ae') => `<svg viewBox="0 10 400 190">${kar.deler.map(d => `<path d="${d.d}" fill="${d.fill || farge}"/>`).join('')}${kar.hjulX.map(x => `<circle cx="${x}" cy="160" r="30" fill="#2a2a30"/><circle cx="${x}" cy="160" r="14" fill="#c9ced6"/>`).join('')}</svg>`;
  const hjulIkon = ht => ht.id === 'belter'
    ? `<svg viewBox="-60 -30 120 60"><rect x="-56" y="-22" width="112" height="44" rx="22" fill="#2a2a30"/>${[-34,-11,12,35].map(x => `<circle cx="${x}" cy="0" r="10" fill="#8a96a6"/>`).join('')}</svg>`
    : `<svg viewBox="-50 -50 100 100">${hjulMarkup([0, 0, ht.r], { nav: ht.nav, knaster: ht.knaster })}</svg>`;
  const toppIkon = t => t === 'ingen'
    ? `<svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="30" fill="none" stroke="#c9ced6" stroke-width="8"/><line x1="29" y1="71" x2="71" y2="29" stroke="#c9ced6" stroke-width="8"/></svg>`
    : `<svg viewBox="${t === 'kran' ? '-20 -110 140 130' : t === 'is' ? '-50 -100 100 110' : t === 'stige' ? '-70 -60 140 80' : '-60 -60 120 80'}"><rect x="-40" y="0" width="80" height="14" rx="6" fill="#c9ced6"/>${toppMarkup(t, [0, 0, 60])}</svg>`;
  const fargeIkon = f => `<svg viewBox="0 0 100 100"><circle cx="50" cy="52" r="36" fill="${f}" stroke="#2a2a30" stroke-opacity=".15" stroke-width="3"/><circle cx="38" cy="40" r="9" fill="#fff" opacity=".45"/></svg>`;
  const KAT_IKON = {
    kar: mini(KAROSSERI[0], '#e5484d'),
    hjul: hjulIkon(HJULTYPER[0]),
    topp: `<svg viewBox="-60 -70 120 90"><rect x="-40" y="0" width="80" height="14" rx="6" fill="#c9ced6"/>${toppMarkup('blalys', [0, 0, 60])}<g transform="translate(0 -14)">${toppMarkup('propell', [0, 0, 60])}</g></svg>`,
    farge: `<svg viewBox="0 0 100 100"><path d="M50 10 C20 10 8 34 12 54 C16 74 34 70 40 78 C46 88 56 92 66 88 C88 80 94 52 86 34 C78 18 66 10 50 10 Z" fill="#f2d6a8"/><circle cx="34" cy="38" r="8" fill="#e5484d"/><circle cx="54" cy="28" r="8" fill="#ffcf3f"/><circle cx="72" cy="40" r="8" fill="#3e8ef7"/><circle cx="72" cy="62" r="8" fill="#30a46c"/><circle cx="42" cy="62" r="9" fill="#fff"/></svg>`,
  };
  const TERNING = `<svg viewBox="0 0 100 100"><rect x="16" y="16" width="68" height="68" rx="14" fill="#fff"/><g fill="#8e4ec6"><circle cx="34" cy="34" r="7"/><circle cx="66" cy="34" r="7"/><circle cx="50" cy="50" r="7"/><circle cx="34" cy="66" r="7"/><circle cx="66" cy="66" r="7"/></g></svg>`;
  const KJOR = `<svg viewBox="0 0 100 100"><rect x="30" y="18" width="5" height="70" rx="2.5" fill="#2a2a30"/><g>${[0,1,2,3].map(r => [0,1,2,3,4].map(c => `<rect x="${35 + c*9}" y="${20 + r*9}" width="9" height="9" fill="${(r + c) % 2 ? '#2a2a30' : '#fff'}"/>`).join('')).join('')}</g></svg>`;
  const STJERNE = `<svg viewBox="0 0 100 100"><path d="M50 4 L60 40 L96 50 L60 60 L50 96 L40 60 L4 50 L40 40 Z" fill="#fff6b0" stroke="#ffd23f" stroke-width="4" stroke-linejoin="round"/></svg>`;

  // ---------- Elementer ----------
  const scene = document.getElementById('scene');
  const carbox = document.getElementById('carbox');
  const bilEl = document.getElementById('bil');
  const bilSvg = document.getElementById('bilSvg');
  function layout() {
    const r = scene.getBoundingClientRect();
    const plass = r.width - 2 * (parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--rk')) + 30);
    carbox.style.width = Math.min(plass * 0.86, r.width * 0.8, r.height * 0.55 * 2) + 'px';
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
  function sus(t0, dur, freq = 3000, vol = .15) {
    if (!ac) return;
    const s = ac.createBufferSource(), f = ac.createBiquadFilter(), g = ac.createGain();
    s.buffer = stoyBuf; f.type = 'bandpass'; f.frequency.value = freq;
    g.gain.setValueAtTime(vol, ac.currentTime + t0); g.gain.exponentialRampToValueAtTime(.001, ac.currentTime + t0 + dur);
    s.connect(f).connect(g).connect(ac.destination); s.start(ac.currentTime + t0); s.stop(ac.currentTime + t0 + dur + .05);
  }
  const motor = () => motorLyd(1.4, false);
  const klonk = () => { tone(140, 0, .12, 'square', .1, 70); sus(0, .08, 5000, .2); tone(900, .12, .08, 'square', .04); tone(1200, .2, .08, 'square', .04); };

  // ---------- Tegning ----------
  const valg = { kar: 0, hjul: 0, topp: 0, farge: 0 };
  try { Object.assign(valg, JSON.parse(localStorage.getItem('bilspill.minBil.valg')) || {}); } catch (e) {}
  let K = lagKjoretoy(valg);

  function tegn(nyDel) {
    K = lagKjoretoy(valg);
    try { K.lakk = localStorage.getItem('bilspill.minBil.lakk'); K.merker = localStorage.getItem('bilspill.minBil.merker') || ''; } catch (e) {}
    const k = K;
    bilSvg.innerHTML = `<defs>
        <clipPath id="karosseri">${k.deler.map(d => `<path d="${d.d}"/>`).join('')}</clipPath>
        <linearGradient id="glintGrad" x1="0" x2="1"><stop offset="0" stop-color="#fff" stop-opacity="0"/><stop offset=".5" stop-color="#fff" stop-opacity=".75"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient>
      </defs>
      <g class="${nyDel === 'kar' ? 'ny' : ''}">
        ${k.deler.map(d => `<path d="${d.d}" fill="${d.fill || 'var(--bil)'}" style="transition: fill .4s"/>`).join('')}${tegnLakk(k)}
        <g clip-path="url(#karosseri)">
          ${k.skygge}
          <rect x="0" y="142" width="400" height="60" fill="#000" opacity=".08"/>
          ${k.ingenBue ? '' : k.hjul.map(([x,y,r]) => `<circle cx="${x}" cy="${y}" r="${r+8}" fill="#000" opacity=".28"/>`).join('')}
        </g>
        ${k._kar}${nyDel === 'topp' ? `<g class="ny">${k._topp}</g>` : k._topp}${tegnMerker(k)}
      </g>
      <g clip-path="url(#karosseri)"><rect class="glint" x="0" y="0" width="70" height="200" fill="url(#glintGrad)"/></g>
      <g class="${nyDel === 'hjul' ? 'ny' : ''}">${k.hjul.map(h => hjulMarkup(h, k)).join('')}</g>`;
    bilSvg.style.setProperty('--bil', k.farger[0]);
    try {
      localStorage.setItem('bilspill.minBil.valg', JSON.stringify(valg));
      
    } catch (e) {}
  }

  function gnister(x, y) {
    for (let i = 0; i < 14; i++) {
      const g = document.createElement('div'); g.className = 'gnist';
      g.style.left = (x / 4) + '%'; g.style.top = (y / 2) + '%';
      bilEl.appendChild(g);
      const a = Math.random() * Math.PI * 2, d = 30 + Math.random() * 60;
      g.animate([{ transform: 'translate(0,0) scale(1)', opacity: 1 }, { transform: `translate(${Math.cos(a)*d}px, ${Math.sin(a)*d + 30}px) scale(.3)`, opacity: 0 }], { duration: 500 + Math.random() * 300, easing: 'ease-out' }).onfinish = () => g.remove();
    }
  }

  let opptatt = false;
  function bytt(kat, idx) {
    if (opptatt) return;
    valg[kat] = idx;
    if (kat === 'kar' || kat === 'hjul') { try { localStorage.removeItem('bilspill.minBil.lakk'); localStorage.removeItem('bilspill.minBil.merker'); } catch (e) {} }
    carbox.classList.add('jobb');
    setTimeout(() => {
      if (kat === 'farge') { bilSvg.style.setProperty('--bil', FABRIKK_FARGER[idx]); K.farger = [FABRIKK_FARGER[idx]]; sus(0, .5, 2500, .2); tone(660, .1, .2, 'sine', .1); tegn(); }
      else { tegn(kat); klonk(); bilEl.classList.remove('dunk'); void bilEl.offsetWidth; bilEl.classList.add('dunk'); }
      const p = kat === 'hjul' ? [K.hjul[0][0], K.hjul[0][1]] : kat === 'topp' ? [K.tak[0], K.tak[1] - 10] : [200, 110];
      gnister(...p);
      if (kat === 'hjul' && K.hjul.length > 1) gnister(K.hjul[K.hjul.length - 1][0], K.hjul[0][1]);
    }, 220);
    setTimeout(() => carbox.classList.remove('jobb'), 520);
  }

  // ---------- Menyer ----------
  const skinne = document.getElementById('skinne');
  const bar = document.getElementById('verktoy');
  let aktivKat = 'kar';
  function tegnSkinne() {
    skinne.innerHTML = '';
    ['kar', 'hjul', 'topp', 'farge'].forEach(k => {
      const b = document.createElement('button'); b.className = 'kat' + (k === aktivKat ? ' aktiv' : ''); b.innerHTML = KAT_IKON[k];
      b.addEventListener('pointerdown', e => { e.preventDefault(); startLyd(); aktivKat = k; tone(520, 0, .08, 'sine', .08); tegnSkinne(); tegnBar(); });
      skinne.appendChild(b);
    });
  }
  function tegnBar() {
    bar.innerHTML = '';
    const knapp = (html, cls, fn) => { const b = document.createElement('button'); b.className = 'knapp ' + (cls || ''); b.innerHTML = html; b.addEventListener('pointerdown', e => { e.preventDefault(); startLyd(); fn(b); }); bar.appendChild(b); return b; };
    const liste = { kar: KAROSSERI.map(k => mini(k)), hjul: HJULTYPER.map(hjulIkon), topp: TOPPER.map(toppIkon), farge: FABRIKK_FARGER.map(fargeIkon) }[aktivKat];
    liste.forEach((html, i) => knapp(html, i === valg[aktivKat] ? 'aktiv' : '', b => {
      bar.querySelectorAll('.knapp').forEach(x => x.classList.remove('aktiv')); b.classList.add('aktiv');
      bytt(aktivKat, i);
    }));
    bar.insertAdjacentHTML('beforeend', '<div class="skille"></div>');
    knapp(TERNING, 'terning', () => tilfeldig());
    knapp(KJOR, 'kjor', () => provetur());
  }

  function tilfeldig() {
    if (opptatt) return;
    const r = n => Math.floor(Math.random() * n);
    ['kar', 'hjul', 'topp', 'farge'].forEach((k, i) => setTimeout(() => {
      const n = { kar: KAROSSERI.length, hjul: HJULTYPER.length, topp: TOPPER.length, farge: FABRIKK_FARGER.length }[k];
      let ny = r(n); if (ny === valg[k]) ny = (ny + 1) % n;
      bytt(k, ny);
      if (i === 3) setTimeout(tegnBar, 300);
    }, i * 380));
    [0, .1, .2, .3].forEach(t => tone(300 + Math.random() * 600, t, .08, 'square', .04));
  }

  // ---------- Prøvetur: vis frem, kjør ut og tilbake ----------
  function provetur() {
    if (opptatt) return;
    opptatt = true;
    bilSvg.classList.add('skinn'); bilEl.classList.add('hopp');
    jingle(); setTimeout(() => LYDER[K.lyd](), 600);
    for (let i = 0; i < 9; i++) setTimeout(() => {
      const s = document.createElement('div'); s.className = 'stjerne'; s.innerHTML = STJERNE;
      s.style.left = (5 + Math.random() * 80) + '%'; s.style.top = (10 + Math.random() * 50) + '%';
      bilEl.appendChild(s); setTimeout(() => s.remove(), 1300);
    }, i * 140);
    setTimeout(() => {
      bilSvg.classList.remove('skinn'); bilEl.classList.remove('hopp');
      bilSvg.classList.add('kjorer'); carbox.classList.add('band'); bilEl.classList.add('ut'); motor();
      bilEl.style.transform = 'translateX(130vw)';
      setTimeout(() => {
        bilEl.classList.remove('ut');
        bilEl.style.transition = 'none'; bilEl.style.transform = 'translateX(-130vw)';
        bilEl.offsetWidth;
        bilEl.style.transition = ''; bilEl.style.transform = 'translateX(0)';
        motor();
        setTimeout(() => { bilSvg.classList.remove('kjorer'); carbox.classList.remove('band'); opptatt = false; }, 1450);
      }, 1500);
    }, 2400);
  }

  tegnSkinne(); tegnBar(); tegn();
  // kjører inn på båndet ved start
  bilEl.style.transition = 'none'; bilEl.style.transform = 'translateX(-130vw)';
  requestAnimationFrame(() => requestAnimationFrame(() => {
    bilEl.style.transition = ''; bilEl.style.transform = 'translateX(0)';
    bilSvg.classList.add('kjorer'); carbox.classList.add('band');
    setTimeout(() => { bilSvg.classList.remove('kjorer'); carbox.classList.remove('band'); }, 1450);
  }));
})();
  },
});
