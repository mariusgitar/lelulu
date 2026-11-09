// Bilspill-modul: kjøretur
// Kjør sideveis, stopp ved oppdrag. Hvert kjøretøy har egne oppdrag (noen med flere typer, noen med variasjoner).
// Dyr finnes langs veien i alle turer (trykk på dem). Dyrefangeren henter dem og kjører dem til dyreparken.
Bilspill.modul('kjoretur', {
  css: `
  * { box-sizing: border-box; -webkit-tap-highlight-color: transparent; }
  :root { --vt: 120px; --kn: 84px; }
  @media (max-height: 520px) { :root { --vt: 92px; --kn: 70px; } }
  html, body { margin: 0; height: 100%; overflow: hidden; touch-action: none; user-select: none; -webkit-user-select: none; font-family: 'Nunito', system-ui, sans-serif; }
  body { background: #2a2f38; display: flex; flex-direction: column; }
  .scene { position: relative; flex: 1; overflow: hidden; background: linear-gradient(#aee3f5, #d7f0e0 70%); }
  .lag { position: absolute; left: 0; right: 0; background-repeat: repeat-x; pointer-events: none; }
  .vei { position: absolute; left: 0; right: 0; bottom: 0; height: 22%; background: #6b7280; }
  .vei::before { content: ''; position: absolute; left: 0; right: 0; top: 0; height: 9%; background: #b9c0c9; }
  .striper { position: absolute; left: 0; right: 0; top: 52%; height: 5%; background: repeating-linear-gradient(90deg, #fff 0 60px, transparent 60px 120px); }
  .objekter { position: absolute; inset: 0; pointer-events: none; }
  .obj { position: absolute; }
  .obj.dyr { pointer-events: auto; cursor: pointer; }
  .obj svg { width: 100%; height: 100%; overflow: visible; display: block; }
  .carbox { position: absolute; left: 6%; aspect-ratio: 2 / 1; z-index: 2; }
  .carbox svg { position: absolute; inset: 0; width: 100%; height: 100%; overflow: visible; }
  .shadow { position: absolute; left: 6%; right: 6%; bottom: 0; height: 6%; border-radius: 50%; background: rgba(0,0,0,.25); filter: blur(4px); }
  .rister { animation: rist .18s linear infinite; }
  @keyframes rist { 50% { transform: translateY(-1px); } }
  .hjul { transform-box: fill-box; transform-origin: center; }
  .kjorer .hjul { animation: spinn .35s linear infinite; }
  @keyframes spinn { to { transform: rotate(360deg); } }
  .blink { animation: blink .35s steps(2) infinite; }
  .rolig .blink { animation: none; }
  @keyframes blink { 50% { opacity: .25; } }
  .glint { display: none; }
  .flamme { transform-box: fill-box; transform-origin: 50% 100%; animation: flakk .3s ease-in-out infinite alternate; transition: transform .5s, opacity .5s; }
  @keyframes flakk { from { transform: scale(1, 1); } to { transform: scale(.9, 1.12); } }
  .vink { transform-box: fill-box; transform-origin: 50% 100%; animation: vink .4s ease-in-out infinite alternate; }
  @keyframes vink { from { transform: rotate(-12deg); } to { transform: rotate(12deg); } }
  .hale { transform-box: fill-box; transform-origin: 100% 100%; animation: hale .5s ease-in-out infinite alternate; }
  @keyframes hale { from { transform: rotate(-10deg); } to { transform: rotate(12deg); } }
  .pust { transform-box: fill-box; transform-origin: 50% 100%; animation: pust 2.4s ease-in-out infinite; }
  @keyframes pust { 50% { transform: scale(1.02, .98); } }
  .hopp { transform-box: fill-box; transform-origin: 50% 100%; animation: hopp .45s ease-out 3; }
  @keyframes hopp { 50% { transform: translateY(-16%); } }
  .spis { transform-box: fill-box; transform-origin: 50% 100%; animation: spis .35s ease-in-out 6; }
  @keyframes spis { 50% { transform: rotate(6deg) translateY(4%); } }
  .spire { transform-box: fill-box; transform-origin: 50% 100%; animation: spire .5s cubic-bezier(.3,1.6,.5,1) both; }
  @keyframes spire { from { transform: scale(0); } to { transform: scale(1); } }
  .plopp { transform-box: fill-box; transform-origin: 50% 100%; animation: spire .4s cubic-bezier(.3,1.8,.5,1) both; }
  .stjerne { position: absolute; width: 60px; pointer-events: none; animation: glitre 1.2s ease-out forwards; z-index: 6; }
  @keyframes glitre { 0% { transform: translate(-50%,-50%) scale(0) rotate(0); opacity: 0; } 30% { opacity: 1; transform: translate(-50%,-50%) scale(1.1) rotate(40deg); } 100% { transform: translate(-50%,-50%) scale(0) rotate(120deg); opacity: 0; } }
  .hjerte { position: absolute; font-size: 28px; pointer-events: none; z-index: 6; animation: hjerte 1.2s ease-out forwards; }
  @keyframes hjerte { from { transform: translate(-50%, 0) scale(.5); opacity: 1; } to { transform: translate(-50%, -90px) scale(1.2); opacity: 0; } }
  .effekt { position: absolute; inset: 0; width: 100%; height: 100%; pointer-events: none; z-index: 3; overflow: visible; }
  .blits { position: absolute; inset: 0; background: #fff; z-index: 8; pointer-events: none; animation: blits .6s ease-out forwards; }
  @keyframes blits { from { opacity: .95; } to { opacity: 0; } }
  .foto { position: absolute; z-index: 9; background: #fff; padding: 8px 8px 22px; border-radius: 6px; box-shadow: 0 8px 20px rgba(0,0,0,.25); pointer-events: none; }
  .foto .bilde { width: 100%; height: 100%; border-radius: 3px; background: linear-gradient(#aee3f5, #d7f0e0); display: flex; align-items: flex-end; justify-content: center; gap: 4%; padding: 4% 4% 6%; }
  .foto svg { height: 100%; overflow: visible; }
  .album { position: absolute; right: 12px; top: 12px; z-index: 7; display: flex; gap: 4px; pointer-events: none; }
  .album div { width: 34px; height: 30px; background: linear-gradient(#aee3f5, #d7f0e0 60%, #8fd694 60%); border: 3px solid #fff; border-bottom-width: 7px; border-radius: 3px; box-shadow: 0 2px 4px rgba(0,0,0,.2); transform: rotate(var(--r)); }

  .verktoy { min-height: var(--vt); display: flex; gap: 14px; justify-content: center; align-items: center; padding: 8px 14px calc(8px + env(safe-area-inset-bottom)); background: #343b48; box-shadow: inset 0 6px 0 #2a2f38; }
  .knapp { flex: none; width: var(--kn); height: var(--kn); border-radius: 50%; border: none; background: #f2f4f7; box-shadow: 0 6px 0 rgba(0,0,0,.35); display: grid; place-items: center; padding: 12px; transition: transform .15s, opacity .3s; }
  .knapp svg { width: 100%; height: 100%; pointer-events: none; }
  .knapp:active, .knapp.trykk { transform: translateY(5px); box-shadow: 0 1px 0 rgba(0,0,0,.35); }
  .knapp.gass { width: calc(var(--kn) * 1.35); height: calc(var(--kn) * 1.35); border-radius: 24px; background: #3ddc6f; }
  .knapp.handling { background: #ffcf3f; animation: puls 1s ease-in-out infinite; }
  .knapp.skjult { opacity: 0; pointer-events: none; transform: scale(.5); }
  .knapp.garasje { background: #4a5262; margin-right: auto; }
  .knapp.hint { animation: puls 1.2s ease-in-out infinite; }
  @keyframes puls { 50% { transform: scale(1.1); } }
  .velg { position: absolute; inset: 0; z-index: 10; display: flex; flex-wrap: wrap; gap: 2.4vmin; align-content: center; justify-content: center; padding: 70px 4vmin 3vmin; background: rgba(174,227,245,.94); overflow-y: auto; touch-action: pan-y; }
  .velg button { position: relative; width: min(21vw, 30vh, 220px); aspect-ratio: 1.5 / 1; border: 4px solid #9fd3ea; border-radius: 24px; background: #fff; box-shadow: 0 6px 0 #6bb4d4; padding: 10px 8px 4px; }
  .velg button.min { border-color: #F5C842; box-shadow: 0 6px 0 #c49a00; background: #FFF8DA; }
  .velg button.min::after { content: '⭐'; position: absolute; right: -8px; top: -12px; font-size: 26px; }
  .velg svg { width: 100%; height: 100%; overflow: visible; pointer-events: none; }
  .velg.skjult { display: none; }
  `,
  html: `
<div class="scene" id="scene">
  <div class="lag" id="fjell" style="bottom: 22%; height: 34%;"></div>
  <div class="lag" id="bakker" style="bottom: 22%; height: 20%;"></div>
  <div class="vei"><div class="striper" id="striper"></div></div>
  <div class="objekter" id="objekter"></div>
  <div class="carbox" id="carbox"><div class="shadow"></div><svg viewBox="0 0 400 200" id="bilSvg"></svg></div>
  <svg class="effekt" id="effekt"></svg>
  <div class="album" id="album"></div>
  <div class="velg" id="velg"></div>
</div>
<div class="verktoy" id="verktoy"></div>`,
  start() {
(() => {
  const NS = 'http://www.w3.org/2000/svg';
  const $ = id => document.getElementById(id);
  const finn = n => KJORETOY.find(k => k.navn === n);
  const scene = $('scene'), carbox = $('carbox'), bilSvg = $('bilSvg'), objLag = $('objekter'), effekt = $('effekt');
  const tilf = a => a[Math.floor(Math.random() * a.length)];
  const SK = 1.5;                         // verdensobjekter tegnes 1,5x i forhold til kjøretøyenhetene

  // ---------- Bakgrunnslag ----------
  const uri = s => `url("data:image/svg+xml,${encodeURIComponent(s)}")`;
  $('fjell').style.backgroundImage = uri(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 200" preserveAspectRatio="none"><path d="M0 200 L0 120 L120 40 L220 110 L330 20 L460 120 L560 60 L680 130 L800 120 L800 200 Z" fill="#a9c7e6"/><path d="M330 20 L360 48 L340 44 L320 56 L300 46 Z M120 40 L146 62 L120 58 L100 64 Z" fill="#fff"/></svg>`);
  $('bakker').style.backgroundImage = uri(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 120" preserveAspectRatio="none"><path d="M0 120 L0 60 Q80 10 170 50 Q260 90 340 40 Q440 -10 520 50 Q560 75 600 60 L600 120 Z" fill="#8fd694"/><path d="M0 120 L0 90 Q120 60 240 86 Q380 116 480 80 Q550 60 600 90 L600 120 Z" fill="#6fc47a"/></svg>`);

  // ---------- Figurer ----------
  const hud = ['#f2c7a5','#d9a27a','#a8714a','#7a4b2e'];
  const klaer = ['#e5484d','#3e8ef7','#30a46c','#8e4ec6','#f76b15','#ff7eb6'];
  const har = ['#2a2a30','#8b5a2b','#e8b36a','#c0392b'];
  // person med føttene i (0,0)
  const person = (h = 1, o = {}) => {
    const kl = o.kl || tilf(klaer), hu = o.hu || tilf(hud), ha = o.ha || tilf(har);
    return `<g transform="scale(${h})">
      <rect x="-11" y="-44" width="22" height="30" rx="10" fill="${kl}"/>
      <rect x="-9" y="-16" width="7" height="16" rx="3" fill="#2a2a30"/><rect x="2" y="-16" width="7" height="16" rx="3" fill="#2a2a30"/>
      ${o.armerOpp ? `<rect x="-17" y="-66" width="6" height="26" rx="3" fill="${kl}" transform="rotate(-15 -14 -40)"/><rect x="11" y="-66" width="6" height="26" rx="3" fill="${kl}" transform="rotate(15 14 -40)"/>` : ''}
      <circle cy="-56" r="13" fill="${hu}"/><circle cx="-4" cy="-58" r="1.8" fill="#2a2a30"/><circle cx="5" cy="-58" r="1.8" fill="#2a2a30"/>
      <path d="M-4 -51 Q0 -47 5 -51" stroke="#2a2a30" stroke-width="1.6" fill="none" stroke-linecap="round"/>
      ${o.bestemor ? `<circle cy="-66" r="9" fill="#dfe3e8"/><path d="M-13 -60 Q-12 -70 0 -70 Q12 -70 13 -60 Z" fill="#dfe3e8"/>` : `<path d="M-13 -60 Q-12 -72 0 -72 Q12 -72 13 -60 Q6 -66 -13 -60 Z" fill="${ha}"/>`}
    </g>`;
  };
  // et dyr med føttene i (0,0), sentrert
  const dyrSvg = (navn, skala = 1) => { const d = DYR[navn]; return `<g transform="scale(${skala}) translate(${-d.w / 2} ${-d.h})"><g class="pust">${d.svg()}</g></g>`; };
  // ansikt i vindu (passasjer)
  const ansikt = (x, y, hu = tilf(hud)) => `<g class="plopp"><circle cx="${x}" cy="${y}" r="12" fill="${hu}"/><circle cx="${x-4}" cy="${y-2}" r="1.8" fill="#2a2a30"/><circle cx="${x+4}" cy="${y-2}" r="1.8" fill="#2a2a30"/><path d="M${x-4} ${y+4} Q${x} ${y+7} ${x+4} ${y+4}" stroke="#2a2a30" stroke-width="1.5" fill="none"/><path d="M${x-12} ${y-4} Q${x-11} ${y-14} ${x} ${y-14} Q${x+11} ${y-14} ${x+12} ${y-4} Q${x+5} ${y-9} ${x-12} ${y-4} Z" fill="${tilf(har)}"/></g>`;

  const KUNST = {
    tre: { w: 90, h: 150, svg: () => `<rect x="38" y="90" width="14" height="60" rx="4" fill="#8b5a2b"/><circle cx="45" cy="64" r="40" fill="${tilf(['#4fae5c','#5cbf6a','#3f9a4d'])}"/><circle cx="28" cy="50" r="12" fill="#fff" opacity=".12"/>` },
    gran: { w: 80, h: 170, svg: () => `<rect x="34" y="140" width="12" height="30" fill="#8b5a2b"/><path d="M40 0 L76 70 L58 70 L80 110 L56 110 L80 150 L0 150 L24 110 L0 110 L22 70 L4 70 Z" fill="#2f8a4a"/>` },
    hus: { w: 150, h: 140, svg: () => { const f = tilf(['#e5484d','#f5b82e','#7cc4ff','#f2f4f7']); return `<rect x="10" y="58" width="130" height="82" fill="${f}"/><path d="M0 62 L75 6 L150 62 Z" fill="#5a3a2a"/><rect x="62" y="96" width="26" height="44" rx="3" fill="#8b5a2b"/><rect x="24" y="78" width="26" height="24" rx="3" fill="#bfe3f7"/><rect x="100" y="78" width="26" height="24" rx="3" fill="#bfe3f7"/>`; } },
    ku: { w: 110, h: 80, svg: () => KU },
    blomster: { w: 80, h: 30, svg: () => [10, 30, 50, 70].map(x => `<line x1="${x}" y1="30" x2="${x}" y2="14" stroke="#30a46c" stroke-width="3"/><circle cx="${x}" cy="12" r="6" fill="${tilf(['#ff7eb6','#ffcf3f','#fff','#e5484d'])}"/>`).join('') },
  };
  const KU = `<g class="pust"><rect x="10" y="20" width="76" height="38" rx="16" fill="#fff" stroke="#2a2a30" stroke-width="2"/><circle cx="34" cy="34" r="9" fill="#2a2a30"/><circle cx="62" cy="44" r="7" fill="#2a2a30"/><g fill="#2a2a30"><rect x="18" y="54" width="8" height="24" rx="3"/><rect x="34" y="54" width="8" height="24" rx="3"/><rect x="62" y="54" width="8" height="24" rx="3"/><rect x="76" y="54" width="8" height="24" rx="3"/></g><rect x="80" y="8" width="28" height="30" rx="10" fill="#fff" stroke="#2a2a30" stroke-width="2"/><rect x="86" y="28" width="22" height="12" rx="6" fill="#ffb3c7"/><circle cx="90" cy="18" r="2.5" fill="#2a2a30"/><path d="M84 8 l-4 -6 M104 8 l4 -6" stroke="#2a2a30" stroke-width="3" stroke-linecap="round"/></g>`;
  const SCENERI = ['tre', 'gran', 'hus', 'tre', 'blomster', 'gran', 'ku', 'dyr', 'dyr', 'dyr'];

  // ---------- Ikoner til handlingsknappen ----------
  const IKON = {
    vann: `<svg viewBox="0 0 100 100"><path d="M20 70 Q40 20 80 30" stroke="#3e8ef7" stroke-width="14" fill="none" stroke-linecap="round"/><g fill="#7cc4ff"><circle cx="84" cy="44" r="6"/><circle cx="76" cy="56" r="5"/><circle cx="88" cy="60" r="4"/></g><rect x="8" y="64" width="30" height="20" rx="6" fill="#e5484d"/></svg>`,
    stige: `<svg viewBox="0 0 100 100"><g stroke="#9aa3ae" stroke-width="7" stroke-linecap="round"><line x1="22" y1="90" x2="62" y2="10"/><line x1="42" y1="90" x2="82" y2="10"/></g><g stroke="#c9ced6" stroke-width="5"><line x1="30" y1="74" x2="50" y2="74"/><line x1="38" y1="58" x2="58" y2="58"/><line x1="46" y1="42" x2="66" y2="42"/><line x1="54" y1="26" x2="74" y2="26"/></g></svg>`,
    lft: `<svg viewBox="0 0 100 100"><rect x="30" y="34" width="40" height="54" rx="6" fill="#30a46c"/><rect x="26" y="26" width="48" height="10" rx="4" fill="#24834f"/><path d="M50 20 L50 4 M38 12 L50 2 L62 12" stroke="#2a2a30" stroke-width="7" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
    dor: `<svg viewBox="0 0 100 100"><rect x="22" y="10" width="56" height="84" rx="8" fill="#bfe3f7" stroke="#3e8ef7" stroke-width="6"/><line x1="50" y1="12" x2="50" y2="92" stroke="#3e8ef7" stroke-width="5"/><path d="M36 52 L28 52 M64 52 L72 52" stroke="#2a2a30" stroke-width="6" stroke-linecap="round"/></svg>`,
    is: `<svg viewBox="0 0 100 100"><path d="M32 46 L50 94 L68 46 Z" fill="#e8b36a"/><circle cx="50" cy="40" r="20" fill="#ffb3d1"/><circle cx="40" cy="24" r="13" fill="#fff4c2"/><circle cx="61" cy="26" r="13" fill="#a8e6b4"/><circle cx="51" cy="10" r="6" fill="#e5484d"/></svg>`,
    blalys: `<svg viewBox="0 0 100 100"><rect x="14" y="60" width="72" height="20" rx="8" fill="#2a2a30"/><path d="M22 60 Q22 30 50 30 Q78 30 78 60 Z" fill="#3e8ef7"/><g stroke="#3e8ef7" stroke-width="6" stroke-linecap="round"><line x1="50" y1="6" x2="50" y2="18"/><line x1="14" y1="22" x2="22" y2="30"/><line x1="86" y1="22" x2="78" y2="30"/></g></svg>`,
    kjegle: `<svg viewBox="0 0 100 100"><path d="M34 84 L46 14 L54 14 L66 84 Z" fill="#f76b15"/><rect x="38" y="40" width="24" height="10" fill="#fff"/><rect x="38" y="60" width="24" height="9" fill="#fff"/><rect x="22" y="80" width="56" height="10" rx="4" fill="#f76b15"/></svg>`,
    fro: `<svg viewBox="0 0 100 100"><path d="M10 80 Q50 64 90 80 L90 92 L10 92 Z" fill="#8b5a2b"/><line x1="50" y1="78" x2="50" y2="40" stroke="#30a46c" stroke-width="6"/><path d="M50 56 Q30 50 28 34 Q46 36 50 56 Z M50 48 Q70 40 74 24 Q54 26 50 48 Z" fill="#5cbf6a"/></svg>`,
    hoy: `<svg viewBox="0 0 100 100"><rect x="14" y="40" width="72" height="46" rx="14" fill="#f5c242"/><g stroke="#d9a42e" stroke-width="4"><line x1="22" y1="52" x2="78" y2="52"/><line x1="22" y1="64" x2="78" y2="64"/><line x1="22" y1="76" x2="78" y2="76"/></g><rect x="44" y="40" width="10" height="46" fill="#c0392b"/></svg>`,
    kjeks: `<svg viewBox="0 0 100 100"><path d="M24 40 a12 12 0 1 1 14 -14 L62 26 a12 12 0 1 1 14 14 L76 60 a12 12 0 1 1 -14 14 L38 74 a12 12 0 1 1 -14 -14 Z" fill="#e8b36a" stroke="#c48a3f" stroke-width="4"/><path d="M50 62 C36 52 38 40 46 40 C49 40 50 43 50 44 C50 43 51 40 54 40 C62 40 64 52 50 62 Z" fill="#ff7eb6"/></svg>`,
    port: `<svg viewBox="0 0 100 100"><rect x="10" y="20" width="12" height="74" rx="3" fill="#8b5a2b"/><rect x="78" y="20" width="12" height="74" rx="3" fill="#8b5a2b"/><path d="M10 22 Q50 -2 90 22" stroke="#30a46c" stroke-width="10" fill="none"/><g stroke="#c48a3f" stroke-width="5"><line x1="26" y1="40" x2="26" y2="90"/><line x1="38" y1="40" x2="38" y2="90"/><line x1="62" y1="40" x2="62" y2="90"/><line x1="74" y1="40" x2="74" y2="90"/></g></svg>`,
    vink: `<svg viewBox="0 0 100 100"><path d="M30 92 L30 50 Q30 40 38 40 Q44 40 44 48 L44 24 Q44 16 51 16 Q58 16 58 24 L58 20 Q58 12 65 12 Q72 12 72 20 L72 30 Q72 22 79 22 Q86 22 86 30 L86 66 Q86 92 60 92 Z" fill="#f2c7a5" stroke="#d9a27a" stroke-width="4"/><g stroke="#3e8ef7" stroke-width="5" stroke-linecap="round"><path d="M14 30 Q8 40 14 50"/><path d="M6 24 Q-2 40 6 56"/></g></svg>`,
    kamera: `<svg viewBox="0 0 100 100"><rect x="10" y="30" width="80" height="56" rx="12" fill="#2a2a30"/><rect x="34" y="20" width="32" height="16" rx="5" fill="#2a2a30"/><circle cx="50" cy="58" r="20" fill="#4a5262"/><circle cx="50" cy="58" r="12" fill="#7cc4ff"/><circle cx="45" cy="53" r="4" fill="#fff"/><circle cx="76" cy="42" r="5" fill="#ffcf3f"/></svg>`,
    lupe: `<svg viewBox="0 0 100 100"><circle cx="42" cy="42" r="26" fill="#bfe3f7" stroke="#2a2a30" stroke-width="9"/><line x1="62" y1="62" x2="88" y2="88" stroke="#2a2a30" stroke-width="12" stroke-linecap="round"/><path d="M30 36 a14 14 0 0 1 12 -10" stroke="#fff" stroke-width="5" fill="none" stroke-linecap="round"/></svg>`,
    flaske: `<svg viewBox="0 0 100 100"><rect x="34" y="34" width="32" height="58" rx="10" fill="#30a46c"/><rect x="42" y="12" width="16" height="26" rx="4" fill="#30a46c"/><rect x="40" y="6" width="20" height="8" rx="3" fill="#2a2a30"/><rect x="40" y="50" width="20" height="22" rx="3" fill="#fff" opacity=".85"/></svg>`,
    plukk: `<svg viewBox="0 0 100 100"><path d="M24 36 L76 36 L70 92 L30 92 Z" fill="#4a505c"/><path d="M30 36 Q50 4 70 36" stroke="#4a505c" stroke-width="7" fill="none"/><rect x="40" y="52" width="10" height="16" rx="3" fill="#e5484d"/><rect x="54" y="56" width="10" height="14" rx="3" fill="#7cc4ff"/></svg>`,
    eple: `<svg viewBox="0 0 100 100"><path d="M50 30 C30 18 10 32 14 56 C18 80 36 92 50 86 C64 92 82 80 86 56 C90 32 70 18 50 30 Z" fill="#e5484d"/><rect x="47" y="12" width="6" height="20" rx="3" fill="#5e3d22"/><path d="M54 22 Q70 8 80 18 Q66 28 54 22 Z" fill="#5cbf6a"/><ellipse cx="32" cy="48" rx="6" ry="10" fill="#fff" opacity=".35"/></svg>`,
    plaster: `<svg viewBox="0 0 100 100"><g transform="rotate(-30 50 50)"><rect x="4" y="34" width="92" height="32" rx="16" fill="#f2c7a5" stroke="#d9a27a" stroke-width="3"/><rect x="34" y="36" width="32" height="28" rx="4" fill="#fff4e8"/></g></svg>`,
    boble: `<svg viewBox="0 0 100 100"><g fill="#fff" stroke="#7cc4ff" stroke-width="5"><circle cx="38" cy="58" r="26"/><circle cx="70" cy="34" r="16"/><circle cx="74" cy="72" r="11"/></g><path d="M26 48 a14 14 0 0 1 10 -10" stroke="#7cc4ff" stroke-width="5" fill="none" stroke-linecap="round"/></svg>`,
  };
  const HJERTE = '❤️';

  function passSvg(dyr) {
    const typer = dyr ? ['hund', 'katt', 'koala', 'love', 'tiger'] : ['barn', 'barn', 'voksen', 'bestemor', 'hund', 'katt'];
    const n = 2 + Math.floor(Math.random() * 3);
    return `<rect x="8" y="10" width="6" height="110" fill="#7d8796"/><circle cx="11" cy="14" r="14" fill="#3e8ef7"/><rect x="3" y="8" width="16" height="10" rx="3" fill="#fff"/>` +
      Array.from({length: n}, (_, i) => { const t = tilf(typer), x = 44 + i * 38;
        const fig = DYR[t] ? dyrSvg(t, .42) : person(t === 'barn' ? .75 : .95, { bestemor: t === 'bestemor' });
        return `<g class="pass" data-type="${t}"><g transform="translate(${x} 120)">${fig}</g></g>`; }).join('');
  }
  function isKunder(o, piknik) {
    const kunder = Array.from({length: 3}, () => Math.random() < .5 ? tilf(['hund', 'katt', 'koala', 'love', 'tiger']) : 'barn');
    const bak = piknik ? `<path d="M10 150 L240 150 L210 120 L40 120 Z" fill="#ff7eb6"/><g fill="#fff" opacity=".6"><rect x="70" y="120" width="20" height="30"/><rect x="130" y="120" width="20" height="30"/><rect x="190" y="120" width="16" height="30"/></g>
      <line x1="220" y1="140" x2="220" y2="40" stroke="#4a505c" stroke-width="4"/><path d="M160 50 Q220 0 280 50 Z" fill="#ffcf3f"/><path d="M180 50 Q200 30 220 50 M220 50 Q240 30 260 50" stroke="#f5b82e" stroke-width="3" fill="none"/>` : '';
    return bak + kunder.map((k, i) => `<g transform="translate(${piknik ? 60 + i * 60 : 40 + i * 76} ${piknik ? 140 : 110})"><g class="kunde" data-type="${k}">${k === 'barn' ? person(piknik ? .85 : 1, { armerOpp: true }) : dyrSvg(k, piknik ? .55 : .65)}</g></g>`).join('');
  }
  const PLASTER = `<rect x="4" y="34" width="92" height="32" rx="16" fill="#f2c7a5" stroke="#d9a27a" stroke-width="3"/><rect x="34" y="36" width="32" height="28" rx="4" fill="#fff4e8"/><g fill="#d9a27a"><circle cx="16" cy="44" r="2"/><circle cx="16" cy="56" r="2"/><circle cx="84" cy="44" r="2"/><circle cx="84" cy="56" r="2"/></g>`;
  // ---------- Oppdragstyper ----------
  // w, h: størrelse i objekt-enheter.  gap: avstand fra bilens front til objektet når bilen stopper.
  const TYPER = {
    brann: { ikon: 'vann', w: 170, h: 150, gap: 14, dybde: 3, trykk: 3,
      svg: () => `<rect x="10" y="58" width="130" height="92" fill="${tilf(['#f5b82e','#7cc4ff','#f2f4f7'])}"/><path d="M0 62 L75 4 L150 62 Z" fill="#5a3a2a"/><rect x="62" y="104" width="26" height="46" rx="3" fill="#8b5a2b"/><rect x="24" y="80" width="28" height="26" rx="3" fill="#ffd28a"/><rect x="98" y="80" width="28" height="26" rx="3" fill="#ffd28a"/>
        <g class="redd" opacity="0"><g transform="translate(112 106) scale(.42)"><g class="vinkeg">${person(1, { kl: '#3e8ef7', armerOpp: true })}</g></g></g>
        <g class="flammer">${[[38,82,.9],[112,82,.9],[75,20,1.3],[118,40,.8]].map(([x, y, s]) => `<g transform="translate(${x} ${y}) scale(${s})"><g class="flamme"><path d="M-14 0 C-18 -14 -8 -20 -6 -34 C2 -24 4 -30 4 -40 C14 -28 18 -14 14 0 Z" fill="#f76b15"/><path d="M-7 0 C-9 -8 -3 -12 -2 -20 C3 -14 6 -10 7 0 Z" fill="#ffcf3f"/></g></g>`).join('')}</g>` },
    katt: { ikon: 'stige', w: 150, h: 210, gap: 30, dybde: 3,
      svg: () => `<rect x="62" y="110" width="22" height="100" rx="6" fill="#8b5a2b"/><path d="M80 92 L136 70" stroke="#8b5a2b" stroke-width="10" stroke-linecap="round"/>
        <circle cx="70" cy="70" r="60" fill="#4fae5c"/><circle cx="40" cy="50" r="22" fill="#5cbf6a"/><circle cx="98" cy="40" r="26" fill="#5cbf6a"/>
        <path d="M100 80 L140 66" stroke="#8b5a2b" stroke-width="9" stroke-linecap="round"/>
        <g class="katten"><g transform="translate(122 70)">${dyrSvg('katt', .5)}</g></g>` },
    ender: { ikon: 'blalys', w: 130, h: 40, gap: 90, dybde: 4,
      svg: () => `${[[20,1.3,'#fff'],[56,.8,'#ffcf3f'],[80,.8,'#ffcf3f'],[104,.8,'#ffcf3f']].map(([x, s, f]) => `<g class="and"><g transform="translate(${x} 40) scale(${s})"><ellipse cx="0" cy="-12" rx="14" ry="10" fill="${f}"/><circle cx="10" cy="-24" r="8" fill="${f}"/><path d="M16 -24 L24 -22 L16 -20 Z" fill="#f76b15"/><circle cx="12" cy="-26" r="1.6" fill="#2a2a30"/><path d="M-4 -2 L-4 0 M4 -2 L4 0" stroke="#f76b15" stroke-width="3"/></g></g>`).join('')}` },
    kjegler: { ikon: 'kjegle', w: 220, h: 90, gap: 40, dybde: 4,
      svg: () => { const b = finn('bil'); return `<g transform="translate(20 -10) scale(.42)">${b.deler.map(d => `<path d="${d.d}" fill="#9aa3ae"/>`).join('')}${b.detaljer}${b.hjul.map(h => hjulMarkup(h, b)).join('')}</g>
        <g class="varsel"><circle cx="196" cy="42" r="6" fill="#f5b82e"/><circle cx="30" cy="42" r="6" fill="#f5b82e"/></g>
        ${[4, 110, 206].map((x, i) => `<g class="kjegle" data-i="${i}" opacity="0" transform="translate(${x} 90)"><g><path d="M-8 0 L-3 -26 L3 -26 L8 0 Z" fill="#f76b15"/><rect x="-5" y="-17" width="10" height="5" fill="#fff"/><rect x="-11" y="-3" width="22" height="4" rx="2" fill="#f76b15"/></g></g>`).join('')}`; } },
    soppel: { ikon: 'lft', w: 110, h: 64, gap: 30, dybde: 3,
      svg: o => { o.trykkMaks = o.antall; const farger = [['#30a46c','#24834f'],['#3e8ef7','#2d6fd6'],['#8b5a2b','#6b4527']];
        return Array.from({length: o.antall}, (_, i) => { const [f, f2] = tilf(farger); return `<g class="dunk" data-i="${i}"><g transform="translate(${4 + i * 56} 0)"><rect x="4" y="16" width="38" height="44" rx="5" fill="${f}"/><rect x="0" y="8" width="46" height="10" rx="4" fill="${f2}"/><g fill="#2a2a30"><circle cx="10" cy="60" r="4"/><circle cx="36" cy="60" r="4"/></g><g class="soppel"><rect x="8" y="1" width="12" height="9" rx="2" fill="${tilf(['#f5b82e','#e5484d','#fff','#7cc4ff'])}" transform="rotate(-20 14 5)"/><circle cx="32" cy="5" r="6" fill="${tilf(['#e5484d','#ffcf3f','#9aa3ae'])}"/></g></g></g>`; }).join(''); } },
    passasjerer: { ikon: 'dor', w: 190, h: 120, gap: 18, dybde: 3, svg: () => passSvg(false) },
    is: { ikon: 'is', w: 90, h: 110, gap: 20, dybde: 3,
      svg: o => { o.kunde = Math.random() < .5 ? tilf(DYR_NAVN.filter(d => d !== 'sjiraff')) : 'barn';
        return `<g transform="translate(45 110)"><g class="kunde">${o.kunde === 'barn' ? person(1.05, { armerOpp: true }) : dyrSvg(o.kunde, .7)}</g></g>`; } },
    saa: { ikon: 'fro', w: 440, h: 26, gap: 10, dybde: 6,
      svg: () => `<path d="M0 26 Q220 10 440 26 Z" fill="#8b5a2b"/><rect x="0" y="16" width="440" height="10" fill="#7a4b2e"/>${Array.from({length: 11}, (_, i) => `<path d="M${10 + i*40} 18 q10 -4 20 0" stroke="#5e3d22" stroke-width="3" fill="none"/>`).join('')}<g class="planter"></g>` },
    mate: { ikon: 'hoy', w: 300, h: 90, gap: 20, dybde: 2,
      svg: () => `<g stroke="#c48a3f" stroke-width="6"><line x1="0" y1="50" x2="300" y2="50"/><line x1="0" y1="70" x2="300" y2="70"/></g>${[10, 80, 150, 220, 290].map(x => `<rect x="${x - 4}" y="40" width="8" height="50" fill="#8b5a2b"/>`).join('')}
        ${[30, 170].map(x => `<g class="beitedyr" transform="translate(${x} 10)">${KU}</g>`).join('')}<g class="hoyballer"></g>` },
    dyr: { ikon: 'kjeks', w: 130, h: 200, gap: 24, dybde: 3,
      svg: o => { o.dyr = nesteDyr(); const d = DYR[o.dyr], sk = o.dyr === 'sjiraff' ? .9 : 1.1;
        return `<g transform="translate(65 200)"><g class="dyret">${dyrSvg(o.dyr, sk)}</g></g>
          <g transform="translate(${65 + d.w * sk * .25} ${200 - d.h * sk - 26})"><circle r="16" fill="#fff" stroke="#9fd3ea" stroke-width="3"/><text y="7" text-anchor="middle" font-size="20" font-weight="900" fill="#3e8ef7" font-family="Nunito, sans-serif">?</text></g>`; } },
    dyrepark: { ikon: 'port', w: 360, h: 170, gap: 20, dybde: 1,
      svg: () => `<rect x="0" y="120" width="360" height="50" fill="#8fd694"/><circle cx="300" cy="80" r="44" fill="#4fae5c"/><rect x="294" y="110" width="12" height="40" fill="#8b5a2b"/>
        <g stroke="#c48a3f" stroke-width="6">${Array.from({length: 13}, (_, i) => `<line x1="${110 + i * 20}" y1="104" x2="${110 + i * 20}" y2="170"/>`).join('')}<line x1="100" y1="114" x2="360" y2="114"/></g>
        <rect x="10" y="40" width="14" height="130" rx="4" fill="#8b5a2b"/><rect x="86" y="40" width="14" height="130" rx="4" fill="#8b5a2b"/>
        <path d="M6 46 Q55 6 104 46" stroke="#30a46c" stroke-width="14" fill="none"/>
        <g fill="#fff" transform="translate(55 28)"><ellipse cx="0" cy="6" rx="7" ry="5"/><circle cx="-7" cy="-2" r="3"/><circle cx="-2" cy="-7" r="3"/><circle cx="3" cy="-7" r="3"/><circle cx="8" cy="-2" r="3"/></g>
        <g class="porten"><g stroke="#c48a3f" stroke-width="5">${[30, 44, 58, 72].map(x => `<line x1="${x}" y1="80" x2="${x}" y2="170"/>`).join('')}<line x1="24" y1="96" x2="86" y2="96"/><line x1="24" y1="150" x2="86" y2="150"/></g></g>
        <g class="parkdyr"></g>` },
    venn: { ikon: 'vink', w: 90, h: 110, gap: 20, dybde: 3,
      svg: o => { o.venn = Math.random() < .55 ? tilf(['hund', 'katt', 'koala', 'love', 'tiger']) : 'barn';
        return `<g transform="translate(45 110)"><g class="vennen">${o.venn === 'barn' ? `<g class="vinkeg">${person(1, { armerOpp: true })}</g>` : dyrSvg(o.venn, .75)}</g></g>`; } },
    foto: { ikon: 'kamera', w: 200, h: 150, gap: 20, dybde: 2,
      svg: o => { o.dyr = tilf(DYR_NAVN);
        return `<rect x="10" y="100" width="70" height="8" rx="3" fill="#8b5a2b"/><rect x="16" y="108" width="6" height="42" fill="#8b5a2b"/><rect x="68" y="108" width="6" height="42" fill="#8b5a2b"/>
          <rect x="2" y="30" width="10" height="120" fill="#7d8796"/><rect x="-16" y="10" width="46" height="34" rx="6" fill="#fff" stroke="#3e8ef7" stroke-width="4"/><rect x="-6" y="18" width="26" height="18" rx="4" fill="#2a2a30"/><circle cx="7" cy="27" r="6" fill="#7cc4ff"/><rect x="2" y="14" width="10" height="5" rx="2" fill="#2a2a30"/>
          <g transform="translate(140 150)"><g class="modell">${dyrSvg(o.dyr, o.dyr === 'sjiraff' ? .7 : 1)}</g></g>`; } },
    basseng: { ikon: 'vann', w: 250, h: 90, gap: 14, dybde: 3,
      svg: () => `<rect x="16" y="44" width="160" height="40" rx="18" fill="#dfe3e8"/>
        <g class="poolvann" style="transform-box:fill-box;transform-origin:50% 100%;transform:scaleY(.08);transition:transform .9s"><rect x="24" y="50" width="144" height="30" rx="12" fill="#7cc4ff"/><path d="M34 58 q10 -5 20 0 t20 0 t20 0 t20 0 t20 0" stroke="#fff" stroke-width="3" fill="none" opacity=".7"/></g>
        <rect x="16" y="44" width="160" height="40" rx="18" fill="none" stroke="#ff7eb6" stroke-width="8"/>
        ${[196, 226].map((x, i) => `<g class="badende" data-i="${i}"><g transform="translate(${x} 88)">${person(.8, { armerOpp: true })}</g></g>`).join('')}` },
    bortkommen: { ikon: 'lupe', w: 290, h: 110, gap: 20, dybde: 3,
      svg: () => `<g class="hunden"><g transform="translate(46 110)">${dyrSvg('hund', .8)}</g></g>
        <g class="spm" transform="translate(60 18)"><circle r="15" fill="#fff" stroke="#9fd3ea" stroke-width="3"/><text y="7" text-anchor="middle" font-size="20" font-weight="900" fill="#3e8ef7" font-family="Nunito, sans-serif">?</text></g>
        <g transform="translate(250 110)"><g class="eier">${person(1, { armerOpp: true })}</g></g>` },
    gjenvinning: { ikon: 'flaske', w: 90, h: 110, gap: 30, dybde: 3,
      svg: () => `<g class="iglo"><path d="M6 106 L6 52 Q6 6 45 6 Q84 6 84 52 L84 106 Z" fill="#30a46c"/><rect x="30" y="22" width="30" height="10" rx="5" fill="#1d6b45"/>
        <g transform="translate(45 70)"><rect x="-8" y="-20" width="16" height="30" rx="5" fill="#fff" opacity=".9"/><rect x="-4" y="-28" width="8" height="10" rx="2" fill="#fff" opacity=".9"/></g>
        <rect x="0" y="100" width="90" height="10" rx="4" fill="#1d6b45"/></g>` },
    rydde: { ikon: 'plukk', w: 320, h: 34, gap: 16, dybde: 4,
      svg: () => `<path d="M0 34 Q160 18 320 34 Z" fill="#8fd694"/>` + [20, 70, 120, 170, 220, 270].map((x, i) => `<g class="rusk" data-i="${i}"><g transform="translate(${x} ${22 + (i % 2) * 4})">${tilf([
        `<rect x="-6" y="-12" width="12" height="16" rx="3" fill="#e5484d"/><rect x="-6" y="-12" width="12" height="4" fill="#c9ced6"/>`,
        `<path d="M-10 0 L-4 -12 L8 -8 L10 2 Z" fill="#fff" stroke="#c9ced6" stroke-width="1.5"/>`,
        `<path d="M-12 -2 Q0 -14 12 -4 Q0 -8 -12 -2 Z" fill="#ffcf3f" stroke="#d9a400" stroke-width="1.5"/>`,
        `<rect x="-5" y="-16" width="10" height="18" rx="4" fill="#7cc4ff" opacity=".85"/>`])}</g></g>`).join('') },
    dyrebuss: { ikon: 'dor', w: 190, h: 120, gap: 18, dybde: 3, svg: () => passSvg(true) },
    lekeplass: { ikon: 'dor', w: 280, h: 140, gap: 20, dybde: 2,
      svg: () => `<path d="M0 140 Q140 124 280 140 Z" fill="#8fd694"/>
        <g stroke="#e5484d" stroke-width="7" stroke-linecap="round"><line x1="20" y1="138" x2="50" y2="40"/><line x1="110" y1="138" x2="80" y2="40"/><line x1="44" y1="40" x2="86" y2="40"/></g>
        <g class="huske" style="transform-box:view-box;transform-origin:65px 40px"><line x1="58" y1="40" x2="58" y2="104" stroke="#4a505c" stroke-width="2"/><line x1="72" y1="40" x2="72" y2="104" stroke="#4a505c" stroke-width="2"/><rect x="52" y="102" width="26" height="6" rx="3" fill="#f5b82e"/><g class="husker"></g></g>
        <path d="M150 138 L150 60 L176 60 L176 138" stroke="#3e8ef7" stroke-width="6" fill="none"/><path d="M176 62 Q210 70 250 132 L262 132" stroke="#ffcf3f" stroke-width="12" fill="none" stroke-linecap="round"/>
        <g class="lekere"></g>` },
    isfest: { ikon: 'is', w: 230, h: 110, gap: 20, dybde: 3, svg: o => isKunder(o, false) },
    piknik: { ikon: 'is', w: 250, h: 150, gap: 20, dybde: 2, svg: o => isKunder(o, true) },
    epler: { ikon: 'eple', w: 200, h: 210, gap: 20, dybde: 3,
      svg: () => `<rect x="62" y="110" width="22" height="100" rx="6" fill="#8b5a2b"/>
        <g class="krone" style="transform-box:fill-box;transform-origin:50% 100%"><circle cx="72" cy="72" r="62" fill="#4fae5c"/><circle cx="40" cy="52" r="24" fill="#5cbf6a"/><circle cx="104" cy="44" r="26" fill="#5cbf6a"/>
        ${[[40,70],[70,40],[104,64],[60,96],[96,100],[30,40],[118,90]].map(([x, y], i) => `<g class="eple" data-i="${i}"><circle cx="${x}" cy="${y}" r="8" fill="#e5484d"/><rect x="${x-1}" y="${y-12}" width="2" height="5" fill="#5e3d22"/></g>`).join('')}</g>
        <g transform="translate(160 210)"><path d="M-30 -34 L30 -34 L24 0 L-24 0 Z" fill="#c48a3f"/><g stroke="#8b5a2b" stroke-width="2"><line x1="-28" y1="-24" x2="28" y2="-24"/><line x1="-26" y1="-12" x2="26" y2="-12"/></g><g class="kurv"></g></g>` },
    plaster: { ikon: 'plaster', w: 130, h: 200, gap: 24, dybde: 3,
      svg: o => { o.dyr = tilf(DYR_NAVN.filter(d => d !== 'sjiraff')); const d = DYR[o.dyr];
        return `<g transform="translate(65 200)"><g class="dyret">${dyrSvg(o.dyr, 1.1)}</g></g>
          <g class="spm" transform="translate(${65 + d.w * .3} ${200 - d.h * 1.1 - 24})"><circle r="17" fill="#fff" stroke="#f5a0c0" stroke-width="3"/><g transform="rotate(-30) scale(.32) translate(-50 -50)">${PLASTER}</g></g>`; } },
    dusj: { ikon: 'boble', w: 120, h: 190, gap: 30, dybde: 2,
      svg: () => `<rect x="10" y="20" width="10" height="170" fill="#9aa3ae"/><rect x="100" y="20" width="10" height="170" fill="#9aa3ae"/><rect x="0" y="10" width="120" height="22" rx="8" fill="#3e8ef7"/>
        <g fill="#fff"><circle cx="30" cy="21" r="5"/><circle cx="60" cy="21" r="5"/><circle cx="90" cy="21" r="5"/></g>
        <g transform="translate(60 -14)"><path d="M0 -14 Q-10 -2 -6 4 Q0 10 6 4 Q10 -2 0 -14 Z" fill="#7cc4ff"/></g>` },
  };
  const OPPDRAG_FOR = {
    brannbil: ['brann', 'katt', 'basseng'], politibil: ['ender', 'kjegler', 'bortkommen'], 'søppelbil': ['soppel', 'gjenvinning', 'rydde'],
    buss: ['passasjerer', 'dyrebuss', 'lekeplass'], isbil: ['is', 'isfest', 'piknik'], traktor: ['saa', 'mate', 'epler'],
    dyrefanger: ['dyr', 'plaster', 'dyr', 'dyr', 'dyrepark'],
  };
  let sistType = null, dyrIndeks = 0, fanget = [], pose = [];
  function nesteType() {
    const liste = OPPDRAG_FOR[K.navn] || ['venn', 'foto', 'dusj'];
    if (K.navn === 'dyrefanger') return liste[dyrIndeks++ % liste.length];
    if (!pose.length) { pose = [...liste].sort(() => Math.random() - .5); if (pose[0] === sistType && pose.length > 1) pose.push(pose.shift()); }
    return (sistType = pose.shift());
  }
  function nesteDyr() {
    const ledige = DYR_NAVN.filter(d => !fanget.includes(d) && !objekter.some(o => o.dyr === d && o.oppdrag && !o.ferdig));
    return tilf(ledige.length ? ledige : DYR_NAVN);
  }

  // ---------- Tilstand ----------
  const VALGBARE = ['brannbil', 'politibil', 'dyrefanger', 'søppelbil', 'buss', 'isbil', 'traktor', 'bil'];
  let K = finn('brannbil'), FRONT = 392;
  let s = 1, vehLeft = 0, veiTopp = 0;
  let camX = 0, fart = 0, gass = false, aktivt = null, objekter = [], nesteSceneri = 300, nesteOppdrag = 900;
  const MAKS = 240, AKS = 260, BREMS = 320;
  const frontX = k => { let m = 0; k.deler.forEach(d => { const n = d.d.match(/-?\d+\.?\d*/g).map(Number); for (let i = 0; i < n.length; i += 2) m = Math.max(m, n[i]); }); k.hjul.forEach(([x, , r]) => { m = Math.max(m, x + r); }); return m + 6; };

  function layout() {
    const r = scene.getBoundingClientRect();
    const w = Math.min(r.width * 0.42, r.height * 0.5 * 2);
    carbox.style.width = w + 'px';
    s = w / 400; vehLeft = r.width * 0.06; veiTopp = r.height * 0.78;
    carbox.style.bottom = (r.height * 0.06) + 'px';
    objekter.forEach(plasser);
  }

  function byggBil() {
    const k = K;
    bilSvg.innerHTML = `${k.deler.map(d => `<path d="${d.d}" fill="${d.fill || 'var(--bil)'}"/>`).join('')}${tegnLakk(k)}
      <defs><clipPath id="karosseri">${k.deler.map(d => `<path d="${d.d}"/>`).join('')}</clipPath></defs>
      <g clip-path="url(#karosseri)">${k.skygge}<rect x="0" y="142" width="400" height="30" fill="#000" opacity=".1"/>
        ${k.ingenBue ? '' : k.hjul.map(([x,y,r]) => `<circle cx="${x}" cy="${y}" r="${r+8}" fill="#000" opacity=".28"/>`).join('')}</g>
      ${k.detaljer}<g id="ekstra"></g>${k.foran || ''}${tegnMerker(k)}
      ${k.hjul.map(h => hjulMarkup(h, k)).join('')}`;
    bilSvg.style.setProperty('--bil', k.farger[0]);
    FRONT = frontX(k);
  }

  // ---------- Objekter i verden ----------
  function lagObjekt(type, wx, extra = {}) {
    const el = document.createElement('div'); el.className = 'obj';
    const o = { type, wx, el, dybde: 0, skala: 1, ...extra };
    let inner;
    if (type === 'oppdrag') { const t = TYPER[o.otype]; o.w = t.w; o.h = t.h; o.dybde = t.dybde; inner = t.svg(o); }
    else if (type === 'dyr') { const d = DYR[o.dyr]; o.w = d.w + 10; o.h = d.h; inner = `<g transform="translate(${o.w / 2} ${o.h})"><g class="dyret">${dyrSvg(o.dyr)}</g></g>`; el.classList.add('dyr'); }
    else { const a = KUNST[type]; o.w = a.w; o.h = a.h; inner = a.svg(); }
    el.innerHTML = `<svg viewBox="0 0 ${o.w} ${o.h}">${inner}</svg>`;
    objLag.appendChild(el); objekter.push(o); plasser(o);
    if (type === 'dyr' || type === 'ku') {
      el.style.pointerEvents = 'auto';
      el.addEventListener('pointerdown', e => { e.stopPropagation(); Lyd.start(); (DYRELYD[o.dyr || 'ku'])(); hopp(el.querySelector('svg > g')); hjerter(el); });
    }
    return o;
  }
  function plasser(o) {
    const sk = o.skala * SK;
    o.el.style.width = (o.w * s * sk) + 'px'; o.el.style.height = (o.h * s * sk) + 'px';
    o.el.style.top = (veiTopp + o.dybde * s - o.h * s * sk) + 'px';
  }
  function oppdaterObjekter() {
    objekter = objekter.filter(o => {
      const x = vehLeft + (o.wx - camX) * s;
      if (x < -o.w * s * 2 - 300) { o.el.remove(); return false; }
      o.el.style.transform = `translateX(${x}px)`;
      return true;
    });
    while (nesteSceneri < camX + 1700) {
      const pos = nesteSceneri;
      if (objekter.some(o => o.oppdrag && pos > o.wx - 200 && pos < o.wx + o.w * SK + 60)) { nesteSceneri += 120; continue; }
      let t = tilf(SCENERI);
      const bak = Math.random() < .45 && t !== 'dyr';
      if (t === 'dyr') lagObjekt('dyr', nesteSceneri, { dyr: tilf(DYR_NAVN), skala: .8, dybde: 1 });
      else lagObjekt(t, nesteSceneri, { skala: bak ? .7 : 1, dybde: bak ? -6 : 2 });
      nesteSceneri += 170 + Math.random() * 240;
    }
    while (nesteOppdrag < camX + 1700) {
      const otype = nesteType(), t = TYPER[otype];
      const ob = lagObjekt('oppdrag', nesteOppdrag, { otype, oppdrag: true, trykk: 0, antall: 1 + (Math.random() < .5 ? 1 : 0) });
      ob.stopp = ob.wx - FRONT - t.gap;
      ob.el.style.zIndex = 1;
      const bredde = ob.w * SK;
      objekter.filter(x => !x.oppdrag && x.wx + x.w * SK * x.skala > ob.wx - 160 && x.wx < ob.wx + bredde + 60).forEach(x => { x.el.remove(); x.wx = -1e9; });
      nesteOppdrag += bredde + 1100 + Math.random() * 500;
    }
  }

  // ---------- Lyd ----------
  let ac = null, motorO = null, motorO2 = null, motorLfo = null, motorG = null;
  function startLyd() {
    if (ac) { if (ac.state === 'suspended') ac.resume(); return; }
    ac = Lyd.start(); if (!ac) return;
    motorO = ac.createOscillator(); motorO.type = 'triangle'; motorO.frequency.value = 60;
    motorO2 = ac.createOscillator(); motorO2.type = 'sine'; motorO2.frequency.value = 120;
    motorLfo = ac.createOscillator(); motorLfo.frequency.value = 10;
    const g2 = ac.createGain(); g2.gain.value = .3;
    const am = ac.createGain(); am.gain.value = .55;
    const lfoG = ac.createGain(); lfoG.gain.value = .45;
    const f = ac.createBiquadFilter(); f.type = 'lowpass'; f.frequency.value = 600; f.Q.value = .7;
    motorG = ac.createGain(); motorG.gain.value = 0;
    motorLfo.connect(lfoG).connect(am.gain);
    motorO.connect(am); motorO2.connect(g2).connect(am);
    am.connect(f).connect(motorG).connect(ac.destination);
    [motorO, motorO2, motorLfo].forEach(o => o.start());
  }
  const signal = () => (LYDER[K.lyd] || tut)();

  // ---------- Effekter ----------
  const STJ = `<svg viewBox="0 0 100 100"><path d="M50 4 L60 40 L96 50 L60 60 L50 96 L40 60 L4 50 L40 40 Z" fill="#fff6b0" stroke="#ffd23f" stroke-width="4" stroke-linejoin="round"/></svg>`;
  function stjerner(px, py, n = 7) {
    for (let i = 0; i < n; i++) setTimeout(() => {
      const st = document.createElement('div'); st.className = 'stjerne'; st.innerHTML = STJ;
      st.style.left = (px + (Math.random() - .5) * 140) + 'px'; st.style.top = (py + (Math.random() - .5) * 90) + 'px';
      scene.appendChild(st); setTimeout(() => st.remove(), 1300);
    }, i * 110);
  }
  function hjerter(el, n = 3) {
    const r = el.getBoundingClientRect(), sr = scene.getBoundingClientRect();
    for (let i = 0; i < n; i++) setTimeout(() => {
      const h = document.createElement('div'); h.className = 'hjerte'; h.textContent = HJERTE;
      h.style.left = (r.left - sr.left + r.width * (.3 + Math.random() * .4)) + 'px'; h.style.top = (r.top - sr.top + r.height * .1) + 'px';
      scene.appendChild(h); setTimeout(() => h.remove(), 1250);
    }, i * 180);
  }
  function hopp(g) { if (!g) return; g.classList.remove('hopp'); void g.getBoundingClientRect(); g.classList.add('hopp'); }
  const sr = () => scene.getBoundingClientRect();
  const bilPx = (ux, uy) => { const r = bilSvg.getBoundingClientRect(), q = sr(); return [r.left - q.left + ux * s, r.top - q.top + uy * s]; };
  const objPx = (o, ux, uy) => { const r = o.el.getBoundingClientRect(), q = sr(), sk = r.width / o.w; return [r.left - q.left + ux * sk, r.top - q.top + uy * sk]; };
  const objSkala = o => o.el.getBoundingClientRect().width / o.w;
  // flytt en svg-gruppe (i et objekt) i en bue til et punkt på skjermen
  function hoppTil(o, g, [tx, ty], ms = 700) {
    const r = g.getBoundingClientRect(), sk = objSkala(o);
    const [x0, y0] = g._t || [0, 0];
    const dx = x0 + (tx - (r.left - sr().left + r.width / 2)) / sk, dy = y0 + (ty - (r.top - sr().top + r.height)) / sk;
    g._t = [dx, dy];
    o.el.style.zIndex = 5;
    return g.animate([{ transform: `translate(${x0}px, ${y0}px)` }, { transform: `translate(${(x0 + dx) / 2}px, ${Math.min(y0, dy) - 50}px)`, offset: .5 }, { transform: `translate(${dx}px, ${dy}px)` }], { duration: ms, easing: 'ease-in-out', fill: 'forwards' });
  }
  // sette en passasjer/et dyr inn i kjøretøyet
  function sitteplass(i) {
    if (K.bur) return [K.bur.x[i % K.bur.x.length], K.bur.y];
    if (K.sete) return K.sete[i % K.sete.length];
    const t = K.tak || [200, 40, 100];
    return [t[0] + (i % 2 ? 26 : -26), t[1] + 52];
  }
  function settInn(innhold, i) {
    const [x, y] = sitteplass(i);
    $('ekstra').insertAdjacentHTML('beforeend', `<g transform="translate(${x} ${y})"><g class="plopp">${innhold}</g></g>`);
  }
  const innHode = (type) => {
    if (type === 'barn' || type === 'voksen' || type === 'bestemor') return ansikt(0, -14);
    const d = DYR[type]; const sk = K.bur ? Math.min(60 / d.h, 72 / d.w) : Math.min(30 / d.h, 40 / d.w);
    return `<g transform="scale(${sk}) translate(${-d.w / 2} ${-d.h})">${d.svg()}</g>`;
  };

  // ---------- Handlingene ----------
  function utfor(o) {
    const t = o.otype;
    if (t === 'brann') {
      o.trykk++;
      const [x1, y1] = bilPx(286, 54), [x2, y2] = objPx(o, 75 + (o.trykk - 2) * 36, 60);
      const p = document.createElementNS(NS, 'path');
      p.setAttribute('d', `M${x1} ${y1} Q${(x1 + x2) / 2} ${Math.min(y1, y2) - 90} ${x2} ${y2}`);
      p.setAttribute('stroke', '#5fb0ff'); p.setAttribute('stroke-width', 10); p.setAttribute('fill', 'none'); p.setAttribute('stroke-linecap', 'round'); p.setAttribute('stroke-dasharray', '40 20');
      effekt.appendChild(p);
      p.animate([{ strokeDashoffset: 0 }, { strokeDashoffset: -900 }], { duration: 1000 });
      p.animate([{ opacity: .9 }, { opacity: .9, offset: .7 }, { opacity: 0 }], { duration: 1000 }).onfinish = () => p.remove();
      stoy(0, .9, 1500, .25);
      const igjen = Math.max(0, 1 - o.trykk / 3);
      setTimeout(() => o.el.querySelectorAll('.flamme').forEach(f => { f.style.transform = `scale(${igjen})`; if (!igjen) f.style.opacity = 0; }), 400);
      if (o.trykk >= 3) { setTimeout(() => { const r = o.el.querySelector('.redd'); r.setAttribute('opacity', 1); r.querySelector('.vinkeg').classList.add('vink'); hjerter(o.el); }, 900); return 1400; }
      return 0;
    }
    if (t === 'katt') {
      const [x1, y1] = bilPx(300, 44), [x2, y2] = objPx(o, 124, 82);
      const l = document.createElementNS(NS, 'g');
      const len = Math.hypot(x2 - x1, y2 - y1), ang = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;
      l.innerHTML = `<g transform="translate(${x1} ${y1}) rotate(${ang})"><g class="stigeg" style="transform-origin:0 0; transform: scaleX(0)"><rect x="0" y="-9" width="${len}" height="4" fill="#c9ced6"/><rect x="0" y="5" width="${len}" height="4" fill="#c9ced6"/>${Array.from({length: Math.floor(len / 16)}, (_, i) => `<rect x="${8 + i * 16}" y="-9" width="4" height="18" fill="#c9ced6"/>`).join('')}</g></g>`;
      effekt.appendChild(l);
      const sg = l.querySelector('.stigeg');
      sg.animate([{ transform: 'scaleX(0)' }, { transform: 'scaleX(1)' }], { duration: 900, easing: 'ease-out', fill: 'forwards' });
      tone(200, 0, .9, 'sawtooth', .04, 320);
      setTimeout(() => {
        DYRELYD.katt();
        const k = o.el.querySelector('.katten');
        const a1 = hoppTil(o, k, [x1 + (x2 - x1) * .15, y1 + 4], 1200);
        a1.onfinish = () => {
          const [gx, gy] = bilPx(FRONT + 34, 190);
          hoppTil(o, k, [gx, gy], 600).onfinish = () => { hjerter(o.el); };
          setTimeout(() => sg.animate([{ transform: 'scaleX(1)' }, { transform: 'scaleX(0)' }], { duration: 700, fill: 'forwards' }).onfinish = () => l.remove(), 300);
        };
      }, 950);
      return 3300;
    }
    if (t === 'ender') {
      LYDER.politi(); carbox.classList.remove('rolig');
      const sk = objSkala(o);
      o.el.querySelectorAll('.and').forEach((a, i) => setTimeout(() => {
        a.style.transition = 'transform 2s linear, opacity .5s 1.6s';
        a.style.transform = `translate(20px, ${sr().height * .25 / sk}px)`; a.style.opacity = 0;
        tone(700 + i * 90, 0, .08, 'square', .05); tone(700 + i * 90, .12, .08, 'square', .05);
      }, 300 + i * 350));
      setTimeout(() => carbox.classList.add('rolig'), 2400);
      return 3300;
    }
    if (t === 'kjegler') {
      carbox.classList.remove('rolig');
      o.el.querySelectorAll('.kjegle').forEach((k, i) => setTimeout(() => { k.setAttribute('opacity', 1); k.firstElementChild.classList.add('plopp'); tone(600 + i * 150, 0, .12, 'sine', .12); }, 200 + i * 450));
      setTimeout(() => { LYDER.politi(); carbox.classList.add('rolig'); }, 1700);
      return 2400;
    }
    if (t === 'soppel') {
      const i = o.trykk++;
      const dunk = o.el.querySelectorAll('.dunk')[i];
      const [cx, cy] = bilPx(150, 10);
      const r = dunk.getBoundingClientRect(), sk = objSkala(o);
      const dx = (cx - (r.left - sr().left + r.width / 2)) / sk, dy = (cy - (r.top - sr().top + r.height)) / sk;
      LYDER.rygg(); o.el.style.zIndex = 5;
      dunk.style.transformBox = 'fill-box'; dunk.style.transformOrigin = '50% 50%';
      dunk.animate([
        { transform: 'translate(0,0) rotate(0)' },
        { transform: `translate(${dx * .5}px, ${dy - 50}px) rotate(0)`, offset: .3 },
        { transform: `translate(${dx}px, ${dy}px) rotate(-160deg)`, offset: .55 },
        { transform: `translate(${dx}px, ${dy}px) rotate(-160deg)`, offset: .72 },
        { transform: 'translate(0,0) rotate(0)' }], { duration: 2400, easing: 'ease-in-out' }).onfinish = () => { o.el.style.zIndex = 1; };
      setTimeout(() => {
        dunk.querySelector('.soppel').style.display = 'none';
        stoy(0, .5, 600, .3); tone(90, 0, .3, 'square', .06);
        for (let n = 0; n < 6; n++) { const c = document.createElementNS(NS, 'circle'); const [px, py] = bilPx(140 + Math.random() * 30, -10); c.setAttribute('cx', px); c.setAttribute('cy', py); c.setAttribute('r', 4 + Math.random() * 4); c.setAttribute('fill', tilf(['#f5b82e','#e5484d','#9aa3ae','#fff'])); effekt.appendChild(c); c.animate([{ transform: 'translate(0,0)' }, { transform: `translate(${(Math.random() - .5) * 20}px, ${50 * s}px)`, opacity: 0 }], { duration: 500, delay: n * 40, fill: 'forwards' }).onfinish = () => c.remove(); }
      }, 1300);
      return o.trykk >= o.antall ? 2500 : 0;
    }
    if (t === 'passasjerer' || t === 'dyrebuss') {
      tone(300, 0, .2, 'sine', .1, 200); stoy(0, .3, 1200, .15);
      const dor = bilPx(325, 160);
      const pass = [...o.el.querySelectorAll('.pass')];
      pass.forEach((p, i) => setTimeout(() => {
        hoppTil(o, p, dor, 700).onfinish = () => { p.style.opacity = 0; };
        const ty = p.dataset.type;
        if (DYR[ty]) DYRELYD[ty](); else tone(500 + i * 120, .3, .15, 'sine', .1);
        setTimeout(() => { const wx = [30,86,142,198,254][$('ekstra').children.length % 5] + 23; $('ekstra').insertAdjacentHTML('beforeend', `<g transform="translate(${wx} 92)">${innHode(ty)}</g>`); }, 700);
      }, i * 450));
      return 900 + pass.length * 450;
    }
    if (t === 'is') {
      LYDER.is();
      const [x1, y1] = bilPx(200, 70), [x2, y2] = objPx(o, 45, 30);
      const d = document.createElement('div'); d.style.cssText = `position:absolute;width:${44 * s}px;height:${44 * s}px;left:${x1}px;top:${y1}px;z-index:6;pointer-events:none`;
      d.innerHTML = IKON.is; scene.appendChild(d);
      d.animate([{ transform: 'translate(-50%,-50%)' }, { transform: `translate(calc(-50% + ${(x2 - x1) / 2}px), calc(-50% + ${(y2 - y1) / 2 - 80}px)) rotate(180deg)` }, { transform: `translate(calc(-50% + ${x2 - x1}px), calc(-50% + ${y2 - y1}px)) rotate(360deg)` }], { duration: 900, easing: 'ease-in-out', fill: 'forwards' });
      setTimeout(() => {
        d.remove();
        const k = o.el.querySelector('.kunde');
        const topp = o.kunde === 'barn' ? -100 : -DYR[o.kunde].h * .7 - 10;
        k.insertAdjacentHTML('beforeend', `<g transform="translate(-10 ${topp}) scale(.24)">${IKON.is.replace(/<\/?svg[^>]*>/g, '')}</g>`);
        hopp(k); hjerter(o.el);
        if (o.kunde !== 'barn') DYRELYD[o.kunde](); else { tone(880, 0, .2, 'sine', .12); tone(1175, .15, .3, 'sine', .12); }
      }, 900);
      return 1900;
    }
    if (t === 'saa') {
      LYDER.traktor();
      const pl = o.el.querySelector('.planter');
      for (let i = 0; i < 12; i++) setTimeout(() => {
        const x = 20 + i * 36, korn = Math.random() < .5;
        pl.insertAdjacentHTML('beforeend', `<g transform="translate(${x} 18)"><g class="spire">${korn
          ? `<line x1="0" y1="0" x2="0" y2="-30" stroke="#d9a400" stroke-width="3"/><ellipse cx="0" cy="-34" rx="4" ry="9" fill="#f5b82e"/>`
          : `<line x1="0" y1="0" x2="0" y2="-24" stroke="#30a46c" stroke-width="3"/><circle cy="-28" r="7" fill="${tilf(['#ff7eb6','#ffcf3f','#e5484d','#fff'])}"/><circle cy="-28" r="2.5" fill="#f5b82e"/>`}</g></g>`);
        tone(600 + i * 40, 0, .1, 'sine', .08);
      }, i * 140);
      return 2000;
    }
    if (t === 'mate') {
      LYDER.traktor();
      const hb = o.el.querySelector('.hoyballer');
      [60, 200].forEach((x, i) => setTimeout(() => {
        hb.insertAdjacentHTML('beforeend', `<g transform="translate(${x} 90)"><g class="plopp"><rect x="-22" y="-26" width="44" height="26" rx="8" fill="#f5c242"/><g stroke="#d9a42e" stroke-width="3"><line x1="-16" y1="-18" x2="16" y2="-18"/><line x1="-16" y1="-9" x2="16" y2="-9"/></g></g></g>`);
        stoy(0, .2, 500, .2);
      }, 200 + i * 400));
      setTimeout(() => { o.el.querySelectorAll('.beitedyr > g').forEach(g => g.classList.add('spis')); DYRELYD.ku(); setTimeout(() => DYRELYD.ku(), 700); hjerter(o.el, 4); }, 1100);
      return 2600;
    }
    if (t === 'dyr') {
      const g = o.el.querySelector('.dyret');
      o.el.querySelector('svg > g:last-child').style.display = 'none';
      DYRELYD[o.dyr](); hjerter(o.el);
      const plass = fanget.length;
      setTimeout(() => {
        const [x, y] = sitteplass(plass);
        hoppTil(o, g, bilPx(x, y), 800).onfinish = () => {
          g.style.opacity = 0;
          settInn(innHode(o.dyr), plass);
          fanget.push(o.dyr); tone(880, 0, .15, 'sine', .12); tone(1320, .12, .25, 'sine', .1);
        };
      }, 600);
      return 1700;
    }
    if (t === 'dyrepark') {
      const port = o.el.querySelector('.porten');
      port.style.transformBox = 'fill-box'; port.style.transformOrigin = '0% 50%'; port.style.transition = 'transform .8s';
      port.style.transform = 'scaleX(.15)';
      tone(300, 0, .5, 'triangle', .08, 500);
      const park = o.el.querySelector('.parkdyr');
      const liste = [...fanget];
      setTimeout(() => {
        liste.forEach((d, i) => setTimeout(() => {
          const x = 140 + i * 52 + (d === 'sjiraff' ? 0 : 0);
          park.insertAdjacentHTML('beforeend', `<g transform="translate(${x} 166)"><g class="plopp">${dyrSvg(d, d === 'sjiraff' ? .55 : .6)}</g></g>`);
          DYRELYD[d](); if ($('ekstra').firstElementChild) $('ekstra').firstElementChild.remove();
        }, i * 550));
        setTimeout(() => { hjerter(o.el, 6); LYDER.dyr(); }, liste.length * 550 + 200);
      }, 700);
      fanget = [];
      return 1500 + liste.length * 550;
    }
    if (t === 'venn') {
      const g = o.el.querySelector('.vennen'), plass = $('ekstra').children.length;
      if (o.venn !== 'barn') DYRELYD[o.venn](); else tone(700, 0, .15, 'sine', .1, 900);
      const [x, y] = sitteplass(plass);
      hoppTil(o, g, bilPx(x, y), 800).onfinish = () => {
        g.style.opacity = 0;
        settInn(innHode(o.venn), plass);
        if ($('ekstra').children.length > 2) $('ekstra').firstElementChild.remove();
        tone(880, 0, .15, 'sine', .12); tone(1320, .12, .25, 'sine', .1);
      };
      return 1500;
    }
    if (t === 'basseng') {
      o.trykk++;
      const [x1, y1] = bilPx(286, 54), [x2, y2] = objPx(o, 96, 50);
      const p = document.createElementNS(NS, 'path');
      p.setAttribute('d', `M${x1} ${y1} Q${(x1 + x2) / 2} ${Math.min(y1, y2) - 90} ${x2} ${y2}`);
      p.setAttribute('stroke', '#5fb0ff'); p.setAttribute('stroke-width', 10); p.setAttribute('fill', 'none'); p.setAttribute('stroke-linecap', 'round'); p.setAttribute('stroke-dasharray', '40 20');
      effekt.appendChild(p);
      p.animate([{ strokeDashoffset: 0 }, { strokeDashoffset: -900 }], { duration: 1000 });
      p.animate([{ opacity: .9 }, { opacity: .9, offset: .7 }, { opacity: 0 }], { duration: 1000 }).onfinish = () => p.remove();
      stoy(0, .9, 1500, .25);
      setTimeout(() => { o.el.querySelector('.poolvann').style.transform = `scaleY(${o.trykk >= 2 ? 1 : .5})`; }, 500);
      if (o.trykk >= 2) {
        setTimeout(() => o.el.querySelectorAll('.badende').forEach((b, i) => setTimeout(() => {
          hoppTil(o, b, objPx(o, 60 + i * 60, 74), 650).onfinish = () => { stoy(0, .4, 900, .25); tone(700, 0, .15, 'sine', .1, 1100); hjerter(o.el, 2); };
        }, i * 400)), 1100);
        return 2700;
      }
      return 0;
    }
    if (t === 'bortkommen') {
      LYDER.politi(); carbox.classList.remove('rolig');
      o.el.querySelector('.spm').style.display = 'none';
      setTimeout(() => { DYRELYD.hund(); hoppTil(o, o.el.querySelector('.hunden'), objPx(o, 222, 110), 1000).onfinish = () => { hopp(o.el.querySelector('.eier')); hjerter(o.el, 4); tone(880, 0, .15, 'sine', .12); tone(1320, .12, .25, 'sine', .1); }; }, 600);
      setTimeout(() => carbox.classList.add('rolig'), 2200);
      return 2400;
    }
    if (t === 'gjenvinning') {
      const ig = o.el.querySelector('.iglo');
      const [cx, cy] = bilPx(150, 10);
      const r = ig.getBoundingClientRect(), sk = objSkala(o);
      const dx = (cx - (r.left - sr().left + r.width / 2)) / sk, dy = (cy - (r.top - sr().top + r.height)) / sk;
      LYDER.rygg(); o.el.style.zIndex = 5;
      ig.animate([{ transform: 'translate(0,0)' }, { transform: `translate(${dx * .5}px, ${dy - 60}px)`, offset: .3 }, { transform: `translate(${dx}px, ${dy - 10}px)`, offset: .5 }, { transform: `translate(${dx}px, ${dy - 10}px)`, offset: .75 }, { transform: 'translate(0,0)' }], { duration: 2600, easing: 'ease-in-out' }).onfinish = () => { o.el.style.zIndex = 1; };
      setTimeout(() => {
        for (let n = 0; n < 8; n++) setTimeout(() => {
          tone(1800 + Math.random() * 1600, 0, .08, 'sine', .07);
          const c = document.createElementNS(NS, 'rect'); const [px, py] = bilPx(140 + Math.random() * 24, 0);
          c.setAttribute('x', px); c.setAttribute('y', py); c.setAttribute('width', 7); c.setAttribute('height', 14); c.setAttribute('rx', 3); c.setAttribute('fill', tilf(['#30a46c', '#7cc4ff', '#a8e6b4', '#8b5a2b']));
          effekt.appendChild(c); c.animate([{ transform: 'translate(0,0)' }, { transform: `translate(0, ${40 * s}px)`, opacity: 0 }], { duration: 400, fill: 'forwards' }).onfinish = () => c.remove();
        }, n * 90);
      }, 1350);
      return 2700;
    }
    if (t === 'rydde') {
      const mal = bilPx(150, 10);
      const rusk = [...o.el.querySelectorAll('.rusk')];
      rusk.forEach((r, i) => setTimeout(() => {
        hoppTil(o, r, mal, 600).onfinish = () => { r.style.opacity = 0; tone(500 + i * 90, 0, .1, 'sine', .1); };
      }, i * 260));
      setTimeout(() => LYDER.rygg(), rusk.length * 260 + 400);
      return rusk.length * 260 + 900;
    }
    if (t === 'lekeplass') {
      tone(300, 0, .2, 'sine', .1, 200); stoy(0, .3, 1200, .15);
      const ekstra = $('ekstra'), antall = Math.max(3, ekstra.children.length);
      const plasser = [[65, 104, 'husker'], [163, 58, 'lekere'], [120, 138, 'lekere'], [215, 138, 'lekere'], [250, 138, 'lekere']];
      for (let i = 0; i < Math.min(antall, 5); i++) setTimeout(() => {
        if (ekstra.firstElementChild) ekstra.firstElementChild.remove();
        const [x, y, g] = plasser[i];
        o.el.querySelector('.' + g).insertAdjacentHTML('beforeend', `<g transform="translate(${x} ${y})"><g class="plopp">${person(.6, { armerOpp: true })}</g></g>`);
        tone(600 + i * 120, 0, .15, 'sine', .1);
      }, 300 + i * 380);
      setTimeout(() => { const h = o.el.querySelector('.huske'); h.animate([{ transform: 'rotate(-20deg)' }, { transform: 'rotate(20deg)' }], { duration: 900, iterations: Infinity, direction: 'alternate', easing: 'ease-in-out' }); hjerter(o.el, 4); }, 300 + Math.min(antall, 5) * 380);
      return 900 + Math.min(antall, 5) * 380;
    }
    if (t === 'isfest' || t === 'piknik') {
      LYDER.is();
      const kunder = [...o.el.querySelectorAll('.kunde')];
      kunder.forEach((k, i) => setTimeout(() => {
        const [x1, y1] = bilPx(200, 70), kr = k.getBoundingClientRect(), q = sr();
        const x2 = kr.left - q.left + kr.width / 2, y2 = kr.top - q.top;
        const d = document.createElement('div'); d.style.cssText = `position:absolute;width:${40 * s}px;height:${40 * s}px;left:${x1}px;top:${y1}px;z-index:6;pointer-events:none`;
        d.innerHTML = IKON.is; scene.appendChild(d);
        d.animate([{ transform: 'translate(-50%,-50%)' }, { transform: `translate(calc(-50% + ${(x2 - x1) / 2}px), calc(-50% + ${(y2 - y1) / 2 - 70}px)) rotate(180deg)` }, { transform: `translate(calc(-50% + ${x2 - x1}px), calc(-50% + ${y2 - y1}px)) rotate(360deg)` }], { duration: 800, easing: 'ease-in-out', fill: 'forwards' });
        setTimeout(() => {
          d.remove(); const ty = k.dataset.type;
          const topp = ty === 'barn' ? -100 : -DYR[ty].h * .6 - 10;
          k.insertAdjacentHTML('beforeend', `<g transform="translate(-10 ${topp}) scale(.24)">${IKON.is.replace(/<\/?svg[^>]*>/g, '')}</g>`);
          hopp(k); if (DYR[ty]) DYRELYD[ty](); else tone(880 + i * 100, 0, .2, 'sine', .12);
        }, 800);
      }, i * 700));
      setTimeout(() => hjerter(o.el, 4), kunder.length * 700 + 700);
      return kunder.length * 700 + 1100;
    }
    if (t === 'epler') {
      LYDER.traktor();
      const krone = o.el.querySelector('.krone');
      krone.animate([{ transform: 'rotate(0)' }, { transform: 'rotate(-3deg)' }, { transform: 'rotate(3deg)' }, { transform: 'rotate(0)' }], { duration: 400, iterations: 3 });
      const epler = [...o.el.querySelectorAll('.eple')];
      epler.forEach((e, i) => setTimeout(() => {
        hoppTil(o, e, objPx(o, 150 + (i % 4) * 7, 182 - Math.floor(i / 4) * 5), 600).onfinish = () => { tone(300 + i * 40, 0, .1, 'sine', .14); };
      }, 600 + i * 220));
      setTimeout(() => hjerter(o.el, 3), 600 + epler.length * 220 + 500);
      return 1400 + epler.length * 220;
    }
    if (t === 'plaster') {
      o.el.querySelector('.spm').style.display = 'none';
      const d = DYR[o.dyr], g = o.el.querySelector('.dyret');
      g.insertAdjacentHTML('beforeend', `<g transform="translate(${-d.w * 1.1 * .1} ${-d.h * 1.1 * .45}) rotate(-25) scale(.3) translate(-50 -50)"><g class="plopp">${PLASTER}</g></g>`);
      tone(660, 0, .1, 'sine', .12); tone(990, .1, .2, 'sine', .12);
      setTimeout(() => { DYRELYD[o.dyr](); hopp(g); hjerter(o.el, 4); }, 500);
      return 1800;
    }
    if (t === 'dusj') {
      stoy(0, 1.6, 2000, .18);
      const r = bilSvg.getBoundingClientRect(), q = sr();
      for (let i = 0; i < 26; i++) setTimeout(() => {
        const b = document.createElement('div'), d = 10 + Math.random() * 22;
        b.style.cssText = `position:absolute;z-index:4;pointer-events:none;width:${d}px;height:${d}px;border-radius:50%;background:rgba(255,255,255,.6);border:2px solid rgba(255,255,255,.95);left:${r.left - q.left + Math.random() * r.width * .9}px;top:${r.top - q.top - 20}px`;
        scene.appendChild(b);
        b.animate([{ transform: 'translateY(0)', opacity: 1 }, { transform: `translateY(${r.height * (.4 + Math.random() * .4)}px)`, opacity: 1, offset: .8 }, { transform: `translateY(${r.height * .8}px) scale(1.4)`, opacity: 0 }], { duration: 1100, easing: 'ease-in' }).onfinish = () => b.remove();
        if (i % 4 === 0) tone(900 + Math.random() * 600, 0, .06, 'sine', .06);
      }, i * 60);
      setTimeout(() => { const [px, py] = bilPx(200, 100); stjerner(px, py, 9); }, 1500);
      return 2300;
    }
    if (t === 'foto') {
      tone(1800, 0, .05, 'square', .06); stoy(0, .15, 4000, .2);
      const bl = document.createElement('div'); bl.className = 'blits'; scene.appendChild(bl); setTimeout(() => bl.remove(), 650);
      DYRELYD[o.dyr]();
      const f = document.createElement('div'); f.className = 'foto';
      const q = sr(), w = Math.min(q.width * .42, q.height * .9);
      f.style.cssText += `width:${w}px;height:${w * .72}px;left:${(q.width - w) / 2}px;top:${(q.height - w * .72) / 2}px;transform:rotate(-4deg)`;
      const kk = K;
      f.innerHTML = `<div class="bilde"><svg viewBox="0 -30 400 230">${kk.deler.map(d => `<path d="${d.d}" fill="${d.fill || kk.farger[0]}"/>`).join('')}${tegnLakk(kk)}${kk.detaljer.replace(/class="blink"/g, '')}${$('ekstra').innerHTML}${tegnMerker(kk)}${kk.hjul.map(h => hjulMarkup(h, kk)).join('')}</svg><svg viewBox="${-DYR[o.dyr].w / 2 - 10} ${-DYR[o.dyr].h - 10} ${DYR[o.dyr].w + 20} ${DYR[o.dyr].h + 20}">${dyrSvg(o.dyr)}</svg></div>`;
      scene.appendChild(f);
      f.animate([{ transform: 'rotate(-4deg) scale(.6)', opacity: 0 }, { transform: 'rotate(-4deg) scale(1)', opacity: 1 }], { duration: 350, easing: 'cubic-bezier(.3,1.6,.5,1)' });
      setTimeout(() => {
        const al = $('album').getBoundingClientRect();
        f.animate([{ transform: 'rotate(-4deg) scale(1)' }, { transform: `translate(${al.right - q.left - (q.width + w) / 2}px, ${al.top - q.top - (q.height - w * .72) / 2 - w * .3}px) rotate(10deg) scale(.12)`, opacity: .2 }], { duration: 700, easing: 'ease-in', fill: 'forwards' }).onfinish = () => {
          f.remove();
          const a = $('album'); if (a.children.length >= 6) a.firstElementChild.remove();
          const d = document.createElement('div'); d.style.setProperty('--r', (Math.random() * 16 - 8) + 'deg'); a.appendChild(d);
        };
      }, 1500);
      return 2400;
    }
  }

  // ---------- Kontroller ----------
  const bar = $('verktoy');
  const GARASJE = `<svg viewBox="0 0 100 100"><path d="M10 44 L50 14 L90 44 L90 90 L10 90 Z" fill="#f2f4f7"/><rect x="24" y="50" width="52" height="40" fill="#9aa3ae"/><g stroke="#7d8796" stroke-width="3"><line x1="24" y1="60" x2="76" y2="60"/><line x1="24" y1="70" x2="76" y2="70"/><line x1="24" y1="80" x2="76" y2="80"/></g></svg>`;
  const HORN = `<svg viewBox="0 0 100 100"><path d="M14 40 L34 40 L70 16 L70 84 L34 60 L14 60 Z" fill="#ffcf3f" stroke="#2a2a30" stroke-width="5" stroke-linejoin="round"/><path d="M80 34 Q90 50 80 66" stroke="#2a2a30" stroke-width="5" fill="none" stroke-linecap="round"/></svg>`;
  const PEDAL = `<svg viewBox="0 0 100 100"><rect x="26" y="10" width="48" height="80" rx="12" fill="#2a2a30"/><g stroke="#4a5262" stroke-width="5"><line x1="34" y1="26" x2="66" y2="26"/><line x1="34" y1="40" x2="66" y2="40"/><line x1="34" y1="54" x2="66" y2="54"/><line x1="34" y1="68" x2="66" y2="68"/></g></svg>`;
  const lagKnapp = (html, cls) => { const b = document.createElement('button'); b.className = 'knapp ' + cls; b.innerHTML = html; bar.appendChild(b); return b; };
  const bGarasje = lagKnapp(GARASJE, 'garasje');
  const bHorn = lagKnapp(HORN, '');
  const bHandling = lagKnapp('', 'handling skjult');
  const bGass = lagKnapp(PEDAL, 'gass hint');
  bGarasje.addEventListener('pointerdown', e => { e.preventDefault(); startLyd(); visVelg(); });
  bHorn.addEventListener('pointerdown', e => {
    e.preventDefault(); startLyd(); signal();
    // dyr og kuer i nærheten svarer
    objekter.filter(o => (o.type === 'dyr' || o.type === 'ku') && Math.abs(o.wx - camX - 250) < 700).slice(0, 2).forEach((o, i) => setTimeout(() => { (DYRELYD[o.dyr || 'ku'])(); hopp(o.el.querySelector('svg > g')); }, 700 + i * 500));
  });
  bGass.addEventListener('pointerdown', e => { e.preventDefault(); startLyd(); gass = true; bGass.classList.add('trykk'); bGass.classList.remove('hint'); bGass.setPointerCapture?.(e.pointerId); });
  const slippGass = () => { gass = false; bGass.classList.remove('trykk'); };
  bGass.addEventListener('pointerup', slippGass); bGass.addEventListener('pointercancel', slippGass); bGass.addEventListener('lostpointercapture', slippGass);
  let travel = false;
  bHandling.addEventListener('pointerdown', e => {
    e.preventDefault(); startLyd();
    if (!aktivt || travel) return;
    const ventetid = utfor(aktivt);
    if (ventetid) {
      travel = true; bHandling.style.opacity = .4;
      setTimeout(() => {
        const [px, py] = objPx(aktivt, aktivt.w / 2, aktivt.h / 2);
        stjerner(px, py); jingle();
        aktivt.ferdig = true; aktivt = null; travel = false;
        bHandling.classList.add('skjult'); bHandling.style.opacity = ''; bGass.classList.add('hint');
      }, ventetid);
    }
  });

  // ---------- Velg kjøretøy (inkludert «min bil») ----------
  const velg = $('velg');
  function mini(k) {
    return `<svg viewBox="0 -30 400 230">${k.deler.map(d => `<path d="${d.d}" fill="${d.fill || k.farger[0]}"/>`).join('')}${tegnLakk(k)}${k.detaljer.replace(/class="blink"/g, '')}${tegnMerker(k)}${k.hjul.map(h => hjulMarkup(h, k)).join('')}</svg>`;
  }
  const valgbare = [...(MIN_BIL ? [MIN_BIL] : []), ...VALGBARE.map(finn)];
  valgbare.forEach(k => {
    const b = document.createElement('button'); b.innerHTML = mini(k);
    if (k.navn === 'minbil') b.classList.add('min');
    b.addEventListener('pointerup', e => { e.preventDefault(); startLyd(); start(k); });
    velg.appendChild(b);
  });
  function visVelg() { velg.classList.remove('skjult'); gass = false; }
  function start(k) {
    K = k;
    velg.classList.add('skjult');
    objekter.forEach(o => o.el.remove()); objekter = [];
    camX = 0; fart = 0; aktivt = null; travel = false; nesteSceneri = 300; nesteOppdrag = 900; sistType = null; dyrIndeks = 0; fanget = []; pose = [];
    $('album').innerHTML = '';
    bHandling.classList.add('skjult'); bGass.classList.add('hint');
    byggBil(); carbox.classList.add('rolig');
    signal();
  }

  // ---------- Hovedløkke ----------
  let forrige = performance.now();
  function tikk(t) {
    const dt = Math.min(.05, (t - forrige) / 1000); forrige = t;
    const neste = objekter.filter(o => o.oppdrag && !o.ferdig).sort((a, b) => a.stopp - b.stopp)[0];
    if (aktivt) fart = Math.max(0, fart - BREMS * 2 * dt);
    else if (gass) fart = Math.min(MAKS, fart + AKS * dt);
    else fart = Math.max(0, fart - BREMS * dt);
    if (neste && !aktivt) {
      const igjen = neste.stopp - camX;
      if (igjen <= 2) {
        camX = neste.stopp; fart = 0; aktivt = neste;
        bHandling.innerHTML = IKON[TYPER[neste.otype].ikon];
        bHandling.classList.remove('skjult'); bGass.classList.remove('hint');
        if (neste.otype === 'dyr') { DYRELYD[neste.dyr](); hopp(neste.el.querySelector('.dyret')); }
      }
      else fart = Math.min(fart, Math.sqrt(2 * BREMS * igjen) + 8);
    }
    camX += fart * dt;
    bilSvg.classList.toggle('kjorer', fart > 5);
    carbox.classList.toggle('rister', fart > 5);
    if (motorG) {
      const tr = K.lyd === 'traktor', base = tr ? 48 : 64;
      motorG.gain.setTargetAtTime(fart > 1 ? .12 : .05, ac.currentTime, .15);
      motorO.frequency.setTargetAtTime(base + fart * (tr ? .1 : .22), ac.currentTime, .15);
      motorO2.frequency.setTargetAtTime((base + fart * (tr ? .1 : .22)) * 2, ac.currentTime, .15);
      motorLfo.frequency.setTargetAtTime((tr ? 6 : 9) + fart * (tr ? .03 : .06), ac.currentTime, .15);
    }
    const px = camX * s;
    $('fjell').style.backgroundPosition = `${-px * .15}px 100%`;
    $('fjell').style.backgroundSize = `${800 * s * 1.4}px 100%`;
    $('bakker').style.backgroundPosition = `${-px * .45}px 100%`;
    $('bakker').style.backgroundSize = `${600 * s * 1.4}px 100%`;
    $('striper').style.backgroundPosition = `${-px}px 0`;
    oppdaterObjekter();
    requestAnimationFrame(tikk);
  }

  layout(); window.addEventListener('resize', layout);
  byggBil();
  requestAnimationFrame(tikk);
})();
  },
});
