// Bilspill-modul: bygg
Bilspill.modul('bygg', {
  css: "\n  * { box-sizing: border-box; -webkit-tap-highlight-color: transparent; }\n  html, body { margin: 0; height: 100%; overflow: hidden; touch-action: none; user-select: none; -webkit-user-select: none; }\n  body { background: linear-gradient(#8fd0ff, #d9f1ff 60%, #c9a26b 60%); }\n  #verden { position: absolute; inset: 0; width: 100%; height: 100%; display: block; }\n  .hjul { transform-box: fill-box; transform-origin: center; }\n  .kjorer .hjul { animation: spinn .4s linear infinite; }\n  .rygger .hjul { animation: spinn .5s linear infinite reverse; }\n  @keyframes spinn { to { transform: rotate(360deg); } }\n  .lasteplan { transition: transform 1s ease-in-out; }\n  .hint { animation: hint 1.4s ease-in-out infinite; transform-box: fill-box; transform-origin: center; }\n  @keyframes hint { 0%,100% { transform: translate(0,0); opacity: .9; } 50% { transform: translate(-40px, 30px); opacity: .5; } }\n  .blink { animation: blink .5s steps(2) infinite; }\n  @keyframes blink { 50% { opacity: .2; } }\n  .horn { position: absolute; right: 16px; top: 16px; width: 70px; height: 70px; border-radius: 50%; border: none; background: #f2f4f7; box-shadow: 0 5px 0 rgba(0,0,0,.3); padding: 12px; }\n  .horn svg { width: 100%; height: 100%; pointer-events: none; }\n",
  html: "\n<svg id=\"verden\" viewBox=\"0 0 1000 500\" preserveAspectRatio=\"xMidYMax slice\">\n  <defs>\n    <pattern id=\"fare\" width=\"20\" height=\"20\" patternUnits=\"userSpaceOnUse\" patternTransform=\"rotate(45)\"><rect width=\"20\" height=\"20\" fill=\"#ffcf3f\"/><rect width=\"10\" height=\"20\" fill=\"#2a2a30\"/></pattern>\n    <linearGradient id=\"himmel\" x1=\"0\" y1=\"0\" x2=\"0\" y2=\"1\"><stop offset=\"0\" stop-color=\"#8fd0ff\"/><stop offset=\"1\" stop-color=\"#d9f1ff\"/></linearGradient>\n  </defs>\n  <rect x=\"-1000\" y=\"-500\" width=\"3000\" height=\"1000\" fill=\"url(#himmel)\"/>\n  <!-- bakgrunn: byen i bygging -->\n  <g opacity=\".9\">\n    <path d=\"M-500 330 Q-200 270 100 320 Q350 360 600 300 Q850 250 1100 310 Q1300 340 1500 300 L1500 440 L-500 440 Z\" fill=\"#8fd694\"/>\n    <rect x=\"80\" y=\"170\" width=\"120\" height=\"170\" fill=\"#c9ced6\"/>\n    ${VINDUER1}\n    <g><rect x=\"230\" y=\"230\" width=\"90\" height=\"110\" fill=\"#d9dee6\"/><rect x=\"230\" y=\"210\" width=\"90\" height=\"20\" fill=\"url(#fare)\"/></g>\n    <!-- tårnkran -->\n    <g stroke=\"#f5b82e\" stroke-width=\"5\" fill=\"none\">\n      <path d=\"M640 330 L640 90 M660 330 L660 90\"/>\n      ${KRANKRYSS}\n      <path d=\"M560 90 L900 90 M600 76 L900 90 M650 60 L560 90 M650 60 L900 90\"/>\n    </g>\n    <rect x=\"636\" y=\"80\" width=\"28\" height=\"22\" fill=\"#e5484d\"/>\n    <rect x=\"560\" y=\"92\" width=\"30\" height=\"24\" fill=\"#7d8796\"/>\n    <line x1=\"840\" y1=\"90\" x2=\"840\" y2=\"170\" stroke=\"#2a2a30\" stroke-width=\"2\"/>\n    <rect x=\"815\" y=\"170\" width=\"50\" height=\"16\" fill=\"#e5484d\"/>\n  </g>\n  <!-- bakke -->\n  <rect x=\"-1000\" y=\"440\" width=\"3000\" height=\"400\" fill=\"#b88a55\"/>\n  <rect x=\"-1000\" y=\"440\" width=\"3000\" height=\"8\" fill=\"#a07444\"/>\n  <g fill=\"#a07444\" opacity=\".7\"><ellipse cx=\"420\" cy=\"470\" rx=\"40\" ry=\"5\"/><ellipse cx=\"90\" cy=\"485\" rx=\"30\" ry=\"4\"/><ellipse cx=\"700\" cy=\"478\" rx=\"50\" ry=\"5\"/></g>\n  <!-- kjegler -->\n  <g transform=\"translate(360 440)\"><path d=\"M-12 0 L-4 -36 L4 -36 L12 0 Z\" fill=\"#f76b15\"/><rect x=\"-8\" y=\"-24\" width=\"16\" height=\"6\" fill=\"#fff\"/><rect x=\"-16\" y=\"-4\" width=\"32\" height=\"5\" rx=\"2\" fill=\"#f76b15\"/></g>\n  <g transform=\"translate(950 440)\"><path d=\"M-12 0 L-4 -36 L4 -36 L12 0 Z\" fill=\"#f76b15\"/><rect x=\"-8\" y=\"-24\" width=\"16\" height=\"6\" fill=\"#fff\"/><rect x=\"-16\" y=\"-4\" width=\"32\" height=\"5\" rx=\"2\" fill=\"#f76b15\"/></g>\n\n  <!-- jordhaug -->\n  <path id=\"haug\" fill=\"#8b5a2b\"/>\n  <path id=\"haugTopp\" fill=\"#9c6a35\"/>\n  <g id=\"steiner\"></g>\n\n  <!-- lastebil (hoved) -->\n  <g id=\"bil1\"></g>\n  <!-- leveransebil -->\n  <g id=\"bil2\" style=\"display:none\"></g>\n\n  <!-- gravemaskin: belter -->\n  <g id=\"belter\">\n    <path d=\"M430 402 Q408 402 408 421 Q408 440 430 440 L590 440 Q612 440 612 421 Q612 402 590 402 Z\" fill=\"#2a2a30\"/>\n    <g fill=\"#8a96a6\">${RULLER}</g>\n    <rect x=\"470\" y=\"388\" width=\"80\" height=\"16\" rx=\"4\" fill=\"#4a505c\"/>\n  </g>\n  <!-- gravemaskin: overdel som kan snu seg -->\n  <g id=\"overdel\" transform=\"translate(510 388)\">\n    <path d=\"M-92 -4 L-92 -40 Q-92 -50 -82 -50 L40 -50 L40 -4 Z\" fill=\"#f5b82e\"/>\n    <rect x=\"-100\" y=\"-46\" width=\"34\" height=\"42\" rx=\"8\" fill=\"#d9a400\"/>\n    <rect x=\"-56\" y=\"-78\" width=\"10\" height=\"30\" rx=\"3\" fill=\"#4a505c\"/>\n    <path d=\"M-12 -40 L-12 -112 L34 -112 Q50 -112 54 -96 L60 -40 Z\" fill=\"#f5b82e\"/>\n    <path d=\"M-2 -102 L32 -102 Q42 -102 44 -92 L48 -60 L-2 -60 Z\" fill=\"#bfe3f7\"/>\n    <path d=\"M20 -98 L30 -98 L18 -64 L8 -64 Z\" fill=\"#fff\" opacity=\".6\"/>\n    <rect class=\"blink\" x=\"6\" y=\"-122\" width=\"18\" height=\"10\" rx=\"4\" fill=\"#f76b15\"/>\n    <rect x=\"-92\" y=\"-22\" width=\"132\" height=\"6\" fill=\"#000\" opacity=\".12\"/>\n    <line id=\"syl1\" stroke=\"#c9ced6\" stroke-width=\"7\" stroke-linecap=\"round\"/>\n    <path id=\"bom\" fill=\"#f5b82e\" stroke=\"#d9a400\" stroke-width=\"2\"/>\n    <line id=\"syl2\" stroke=\"#c9ced6\" stroke-width=\"5\" stroke-linecap=\"round\"/>\n    <path id=\"arm\" fill=\"#f5b82e\" stroke=\"#d9a400\" stroke-width=\"2\"/>\n    <circle id=\"ledd1\" r=\"8\" fill=\"#4a505c\"/><circle id=\"ledd2\" r=\"7\" fill=\"#4a505c\"/>\n    <g id=\"skuff\">\n      <g id=\"skuffRot\">\n        <g id=\"skuffJord\" style=\"display:none\"><ellipse cx=\"2\" cy=\"18\" rx=\"22\" ry=\"14\" fill=\"#8b5a2b\"/><circle cx=\"-10\" cy=\"8\" r=\"7\" fill=\"#9c6a35\"/><circle cx=\"8\" cy=\"4\" r=\"8\" fill=\"#9c6a35\"/><circle cx=\"18\" cy=\"12\" r=\"5\" fill=\"#7a4b2e\"/></g>\n        <path d=\"M2 -4 L30 2 L32 34 Q24 48 2 46 L-20 40 L-22 30 L-6 34 Q10 36 14 26 L14 6 Z\" fill=\"#7d8796\"/>\n        <g fill=\"#c9ced6\"><path d=\"M-24 38 l-6 4 l6 2 z\"/><path d=\"M-12 42 l-6 4 l6 2 z\"/><path d=\"M0 45 l-6 4 l6 2 z\"/></g>\n        <circle r=\"6\" fill=\"#4a505c\"/>\n      </g>\n    </g>\n  </g>\n  <g id=\"partikler\"></g>\n  <!-- hint: en hånd som viser at man drar -->\n  <g id=\"hint\" class=\"hint\" transform=\"translate(760 330)\" style=\"pointer-events:none\">\n    <circle r=\"26\" fill=\"#fff\" opacity=\".6\"/><circle r=\"12\" fill=\"#fff\"/>\n  </g>\n</svg>\n<button class=\"horn\" id=\"horn\"></button>\n\n",
  start() {
(() => {
  const NS = 'http://www.w3.org/2000/svg';
  const svg = document.getElementById('verden');
  const $ = id => document.getElementById(id);
  const G = 440;                      // bakkenivå
  const PX = 510, PY = 388;           // dreiekrans
  const S = [42, -28];                // skulderledd (lokalt)
  const L1 = 178, L2 = 150;           // bom og arm
  const BOT = 46;                     // avstand fra håndledd til skuffbunn

  // fyll inn gjentatte detaljer
  let html = svg.innerHTML;
  html = html.replace('${VINDUER1}', Array.from({length: 12}, (_, i) => `<rect x="${92 + (i % 3) * 36}" y="${184 + Math.floor(i / 3) * 38}" width="24" height="24" fill="#bfe3f7"/>`).join(''));
  html = html.replace('${KRANKRYSS}', Array.from({length: 12}, (_, i) => `<path d="M640 ${330 - i*20} L660 ${310 - i*20}"/>`).join(''));
  html = html.replace('${RULLER}', [434, 471, 508, 545, 582].map(x => `<circle cx="${x}" cy="421" r="12"/>`).join(''));
  svg.innerHTML = html;

  // ---------- Lastebiler ----------
  const hjulSvg = (x, r = 22) => `<g transform="translate(${x} ${-r})"><g class="hjul"><circle r="${r}" fill="#2a2a30"/><circle r="${r*.55}" fill="#c9ced6"/>${[0,72,144,216,288].map(a => `<line x2="${(r*.45*Math.cos(a*Math.PI/180)).toFixed(1)}" y2="${(r*.45*Math.sin(a*Math.PI/180)).toFixed(1)}" stroke="#8a96a6" stroke-width="3" stroke-linecap="round"/>`).join('')}</g></g>`;
  function lastebil(farge) {
    return `<rect x="0" y="-54" width="266" height="14" rx="4" fill="#4a505c"/>
      <path d="M4 -40 L4 -100 Q4 -122 26 -122 L66 -122 Q78 -122 78 -110 L78 -40 Z" fill="${farge}"/>
      <path d="M12 -78 L12 -100 Q12 -112 26 -112 L54 -112 L54 -78 Z" fill="#bfe3f7"/>
      <path d="M26 -108 L36 -108 L26 -82 L16 -82 Z" fill="#fff" opacity=".6"/>
      <ellipse cx="6" cy="-54" rx="5" ry="7" fill="#ffe9a3"/><rect x="-6" y="-48" width="16" height="10" rx="4" fill="#4a505c"/>
      <rect class="blink" x="30" y="-130" width="18" height="8" rx="3" fill="#f5b82e"/>
      <g class="lasteplan" style="transform-origin: 262px -54px">
        <path d="M86 -104 L262 -104 L262 -54 L94 -54 Z" fill="${farge}"/>
        <path d="M86 -104 L262 -104 L262 -96 L86 -96 Z" fill="#000" opacity=".15"/>
        <g stroke="#000" stroke-opacity=".15" stroke-width="3"><line x1="130" y1="-96" x2="130" y2="-56"/><line x1="174" y1="-96" x2="174" y2="-56"/><line x1="218" y1="-96" x2="218" y2="-56"/></g>
        <g class="last"></g>
      </g>
      ${hjulSvg(50)}${hjulSvg(196)}${hjulSvg(240)}`;
  }
  const bil1 = $('bil1'), bil2 = $('bil2');
  bil1.innerHTML = lastebil('#e5484d');
  bil2.innerHTML = lastebil('#3e8ef7');
  const BIL1X = 40;
  bil1.setAttribute('transform', `translate(${BIL1X} ${G})`);
  const LASTPLAN = [BIL1X + 92, BIL1X + 262, G - 104];   // x1, x2, topp i verden

  // ---------- Lyd ----------
  let ac = null, stoyBuf = null, hydG = null, hydO = null;
  function startLyd() {
    if (ac) { if (ac.state === 'suspended') ac.resume(); return; }
    try {
      ac = Lyd.start(); if (!ac) return;
      stoyBuf = ac.createBuffer(1, ac.sampleRate, ac.sampleRate);
      const d = stoyBuf.getChannelData(0); for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
      hydO = ac.createOscillator(); hydO.type = 'triangle'; hydO.frequency.value = 70;
      const f = ac.createBiquadFilter(); f.type = 'lowpass'; f.frequency.value = 320;
      hydG = ac.createGain(); hydG.gain.value = 0;
      hydO.connect(f).connect(hydG).connect(ac.destination); hydO.start();
    } catch (e) { ac = null; }
  }
  function sus(t0, dur, freq = 800, vol = .25, type = 'lowpass') {
    if (!ac) return;
    const s = ac.createBufferSource(), f = ac.createBiquadFilter(), g = ac.createGain();
    s.buffer = stoyBuf; f.type = type; f.frequency.value = freq;
    g.gain.setValueAtTime(0, ac.currentTime + t0); g.gain.linearRampToValueAtTime(vol, ac.currentTime + t0 + .03);
    g.gain.exponentialRampToValueAtTime(.001, ac.currentTime + t0 + dur);
    s.connect(f).connect(g).connect(ac.destination); s.start(ac.currentTime + t0); s.stop(ac.currentTime + t0 + dur + .05);
  }
  const tut = () => { tone(185, 0, .35, 'sawtooth', .07); tone(233, 0, .35, 'sawtooth', .06); tone(185, .45, .5, 'sawtooth', .07); tone(233, .45, .5, 'sawtooth', .06); };
  const rygg = n => { for (let i = 0; i < n; i++) tone(1050, i * .5, .2, 'square', .05); };
  const motor = (dur = 1.6) => motorLyd(dur, false);

  $('horn').innerHTML = `<svg viewBox="0 0 100 100"><path d="M14 40 L34 40 L70 16 L70 84 L34 60 L14 60 Z" fill="#ffcf3f" stroke="#2a2a30" stroke-width="5" stroke-linejoin="round"/><path d="M80 34 Q90 50 80 66" stroke="#2a2a30" stroke-width="5" fill="none" stroke-linecap="round"/></svg>`;
  $('horn').addEventListener('pointerdown', e => { e.stopPropagation(); startLyd(); tone(110, 0, .3, 'square', .07); tone(110, .4, .3, 'square', .07); tone(82, .8, .5, 'square', .07); });

  // ---------- Jordhaugen ----------
  const HAUG = { cx: 790, hw: 120, H: 120 };
  let mengde = location.search.includes('tom') ? .1 : 1;
  const haugHoyde = x => HAUG.H * mengde * Math.max(0, 1 - ((x - HAUG.cx) / HAUG.hw) ** 2);
  function tegnHaug() {
    const pts = [];
    for (let x = HAUG.cx - HAUG.hw - 30; x <= HAUG.cx + HAUG.hw + 30; x += 10) {
      const k = Math.max(0, 1 - ((x - HAUG.cx) / (HAUG.hw + 30)) ** 2);
      pts.push(`${x} ${(G + 2 - HAUG.H * mengde * k ** .9 - (k > 0 ? 3 : 0)).toFixed(1)}`);
    }
    $('haug').setAttribute('d', `M${pts.join(' L')} Z`);
    const t = pts.slice(3, -3).map(p => { const [x, y] = p.split(' ').map(Number); return `${x} ${y + 10}`; });
    $('haugTopp').setAttribute('d', `M${pts.slice(3, -3).join(' L')} L${t.reverse().join(' L')} Z`);
    $('haugTopp').setAttribute('opacity', mengde > .1 ? 1 : 0);
  }
  $('steiner').innerHTML = Array.from({length: 7}, () => `<circle cx="${HAUG.cx - 80 + Math.random() * 160}" cy="${G - 4 - Math.random() * 6}" r="${3 + Math.random() * 4}" fill="#7d8796"/>`).join('');
  tegnHaug();

  // ---------- Gravemaskinens arm (to-ledds invers kinematikk) ----------
  let retning = 1;                       // 1 = mot høyre, -1 = mot venstre
  let mal = [180, 10];                   // håndleddets mål (lokalt)
  let hand = [180, 10];                  // faktisk håndledd (glattet)
  let skuffVinkel = 0, tomming = false, fylt = 0;
  function settRetning(r) {
    if (r === retning) return;
    retning = r; hand = [hand[0], hand[1]];
    $('overdel').setAttribute('transform', `translate(${PX} ${PY}) scale(${r} 1)`);
    tone(120, 0, .25, 'sawtooth', .05, 160);
  }
  function tegnArm() {
    let dx = hand[0] - S[0], dy = hand[1] - S[1];
    let d = Math.hypot(dx, dy);
    const maks = L1 + L2 - 2, min = 70;
    if (d > maks) { dx *= maks / d; dy *= maks / d; d = maks; }
    if (d < min) { dx *= min / d; dy *= min / d; d = min; }
    const a = Math.atan2(dy, dx);
    const b = Math.acos(Math.max(-1, Math.min(1, (L1*L1 + d*d - L2*L2) / (2 * L1 * d))));
    const t1 = a - b;
    const E = [S[0] + L1 * Math.cos(t1), S[1] + L1 * Math.sin(t1)];
    const W = [S[0] + dx, S[1] + dy];
    const bjelke = (p, q, w1, w2) => {
      const ang = Math.atan2(q[1] - p[1], q[0] - p[0]), nx = -Math.sin(ang), ny = Math.cos(ang);
      return `M${p[0] + nx*w1} ${p[1] + ny*w1} L${q[0] + nx*w2} ${q[1] + ny*w2} L${q[0] - nx*w2} ${q[1] - ny*w2} L${p[0] - nx*w1} ${p[1] - ny*w1} Z`;
    };
    $('bom').setAttribute('d', bjelke(S, E, 13, 10));
    $('arm').setAttribute('d', bjelke(E, W, 9, 6));
    const m1 = [S[0] + (E[0] - S[0]) * .45, S[1] + (E[1] - S[1]) * .45];
    $('syl1').setAttribute('x1', 20); $('syl1').setAttribute('y1', -20); $('syl1').setAttribute('x2', m1[0]); $('syl1').setAttribute('y2', m1[1] + 8);
    const m2 = [E[0] + (W[0] - E[0]) * .35, E[1] + (W[1] - E[1]) * .35];
    $('syl2').setAttribute('x1', E[0] - (E[0] - S[0]) * .25); $('syl2').setAttribute('y1', E[1] - (E[1] - S[1]) * .25 - 8); $('syl2').setAttribute('x2', m2[0]); $('syl2').setAttribute('y2', m2[1] - 6);
    $('ledd1').setAttribute('cx', E[0]); $('ledd1').setAttribute('cy', E[1]);
    $('ledd2').setAttribute('cx', S[0]); $('ledd2').setAttribute('cy', S[1]);
    $('skuff').setAttribute('transform', `translate(${W[0]} ${W[1]})`);
    $('skuffRot').setAttribute('transform', `rotate(${skuffVinkel})`);
    return W;
  }
  const tilVerden = ([x, y]) => [PX + retning * x, PY + y];

  // ---------- Peker ----------
  let drar = false, sistePunkt = null;
  function svgPunkt(e) {
    const p = svg.createSVGPoint(); p.x = e.clientX; p.y = e.clientY;
    return p.matrixTransform(svg.getScreenCTM().inverse());
  }
  function settMal(e) {
    const p = svgPunkt(e);
    const wx = p.x, wy = p.y - 40;              // skuffen litt over fingeren
    if (wx < PX - 30) settRetning(-1); else if (wx > PX + 30) settRetning(1);
    let lx = (wx - PX) * retning, ly = wy - PY;
    ly = Math.min(ly, G - BOT - PY + 6);         // ikke gjennom bakken
    mal = [lx, ly];
  }
  svg.addEventListener('pointerdown', e => { startLyd(); drar = true; $('hint').style.display = 'none'; settMal(e); svg.setPointerCapture?.(e.pointerId); });
  svg.addEventListener('pointermove', e => { if (drar) settMal(e); });
  const slipp = () => { drar = false; };
  svg.addEventListener('pointerup', slipp); svg.addEventListener('pointercancel', slipp);

  // ---------- Partikler ----------
  function klump(x, y, tilY, forsinkelse = 0) {
    const c = document.createElementNS(NS, 'circle');
    c.setAttribute('cx', x); c.setAttribute('cy', y); c.setAttribute('r', 4 + Math.random() * 6);
    c.setAttribute('fill', ['#8b5a2b','#9c6a35','#7a4b2e'][Math.floor(Math.random() * 3)]);
    $('partikler').appendChild(c);
    const dx = (Math.random() - .5) * 40;
    c.animate([{ transform: 'translate(0,0)' }, { transform: `translate(${dx}px, ${tilY - y}px)` }], { duration: 450 + Math.random() * 200, delay: forsinkelse, easing: 'cubic-bezier(.5,0,1,1)', fill: 'forwards' }).onfinish = () => c.remove();
  }

  // ---------- Lastebil 1: lass ----------
  let lass = 0, bil1Her = true;
  function tegnLass(g, n) {
    g.innerHTML = n ? `<path d="M90 -96 Q${130} ${-104 - n * 9} ${176} ${-100 - n * 11} Q${220} ${-104 - n * 9} 260 -96 Z" fill="#8b5a2b"/><circle cx="150" cy="${-100 - n*7}" r="7" fill="#9c6a35"/><circle cx="200" cy="${-102 - n*8}" r="8" fill="#9c6a35"/>` : '';
  }
  function tom() {
    tomming = true;
    const W = tilVerden(hand);
    const bunnX = W[0] + retning * 2;
    for (let i = 0; i < 14; i++) klump(bunnX + (Math.random() - .5) * 30, W[1] + 30, LASTPLAN[2] + 4 - lass * 6, i * 25);
    sus(.1, .5, 500, .35); tone(70, .3, .25, 'sine', .25);
    const start = performance.now();
    (function vipp(t) {
      const f = (t - start) / 900;
      skuffVinkel = f < .5 ? 110 * (f / .5) : 110 * (1 - (f - .5) / .5);
      if (f >= .35 && fylt) { fylt = 0; $('skuffJord').style.display = 'none'; lass++; tegnLass(bil1.querySelector('.last'), lass); }
      if (f < 1) requestAnimationFrame(vipp); else { skuffVinkel = 0; tomming = false; if (lass >= 4) setTimeout(bil1Kjor, 500); }
    })(start);
  }
  function animerX(g, fra, til, ms, speil = 1, ferdig) {
    const start = performance.now();
    (function steg(t) {
      const f = Math.min(1, (t - start) / ms), e = f < .5 ? 2 * f * f : 1 - (-2 * f + 2) ** 2 / 2;
      g.setAttribute('transform', `translate(${fra + (til - fra) * e} ${G}) scale(${speil} 1)`);
      if (f < 1) requestAnimationFrame(steg); else ferdig && ferdig();
    })(start);
  }
  function bil1Kjor() {
    bil1Her = false; jingle(); setTimeout(tut, 500);
    setTimeout(() => {
      bil1.classList.add('kjorer'); motor();
      animerX(bil1, BIL1X, -420, 1600, 1, () => {
        lass = 0; tegnLass(bil1.querySelector('.last'), 0);
        setTimeout(() => { motor(); animerX(bil1, -420, BIL1X, 1700, 1, () => { bil1.classList.remove('kjorer'); bil1Her = true; tut(); }); }, 900);
      });
    }, 1300);
  }

  // ---------- Lastebil 2: leverer ny jord når haugen er tom ----------
  let leverer = false;
  function lever() {
    leverer = true;
    bil2.style.display = '';
    tegnLass(bil2.querySelector('.last'), 4);
    // speilvendt (front mot høyre), rygger inn fra høyre
    const stoppX = HAUG.cx + 322;
    bil2.classList.add('rygger'); rygg(4); motor(1.8);
    animerX(bil2, 1400, stoppX, 2000, -1, () => {
      bil2.classList.remove('rygger');
      const plan = bil2.querySelector('.lasteplan');
      plan.style.transform = 'rotate(38deg)';
      tone(90, 0, 1, 'sawtooth', .05, 140);
      setTimeout(() => {
        sus(0, 1.2, 400, .35);
        tegnLass(bil2.querySelector('.last'), 0);
        for (let i = 0; i < 30; i++) klump(stoppX - 262 + Math.random() * 30, G - 120 - Math.random() * 30, G - 30 - Math.random() * 60, i * 30);
        const start = performance.now(), fra = mengde;
        (function vokse(t) { const f = Math.min(1, (t - start) / 1200); mengde = fra + (1 - fra) * f; tegnHaug(); if (f < 1) requestAnimationFrame(vokse); })(start);
      }, 700);
      setTimeout(() => { plan.style.transform = ''; }, 2200);
      setTimeout(() => {
        bil2.classList.add('kjorer'); motor();
        animerX(bil2, stoppX, 1400, 1600, -1, () => { bil2.classList.remove('kjorer'); bil2.style.display = 'none'; leverer = false; });
      }, 3300);
    });
  }

  // ---------- Hovedløkke ----------
  let forrigeHand = [...hand];
  function tikk() {
    if (!isFinite(mal[0]) || !isFinite(mal[1])) mal = [180, 10];
    if (!isFinite(hand[0]) || !isFinite(hand[1])) hand = [180, 10];
    if (!tomming) {
      hand[0] += (mal[0] - hand[0]) * .18;
      hand[1] += (mal[1] - hand[1]) * .18;
    }
    const W = tegnArm();
    hand = [W[0], W[1]];
    const fart = Math.hypot(hand[0] - forrigeHand[0], hand[1] - forrigeHand[1]);
    forrigeHand = [...hand];
    if (hydG) { hydG.gain.setTargetAtTime(Math.min(.06, fart * .012), ac.currentTime, .05); hydO.frequency.setTargetAtTime(60 + fart * 8, ac.currentTime, .05); }

    const Wv = tilVerden(hand);
    const bunn = [Wv[0], Wv[1] + BOT - 6];
    // graving
    if (!tomming && fylt < 1 && bunn[0] > HAUG.cx - HAUG.hw && bunn[0] < HAUG.cx + HAUG.hw && bunn[1] > G - haugHoyde(bunn[0]) - 4 && mengde > .02 && fart > .3) {
      const okt = Math.min(1 - fylt, fart * .012);
      fylt += okt; mengde = Math.max(0, mengde - okt * .2); tegnHaug();
      if (Math.random() < .3) { sus(0, .12, 700, .3); klump(bunn[0], bunn[1] - 6, bunn[1] + 4); }
      skuffVinkel = -15;
      if (fylt >= 1) { $('skuffJord').style.display = ''; tone(300, 0, .12, 'sine', .12, 500); }
      else if (fylt > .3) $('skuffJord').style.display = '';
    } else if (!tomming) skuffVinkel *= .85;
    // tømming i lastebilen
    if (!tomming && fylt >= .5 && bil1Her && lass < 4 && bunn[0] > LASTPLAN[0] && bunn[0] < LASTPLAN[1] && bunn[1] < LASTPLAN[2] + 10) tom();
    // tom haug -> ny leveranse
    if (mengde < .15 && !leverer) { leverer = true; setTimeout(lever, 600); }

    requestAnimationFrame(tikk);
  }
  function tilpass() {
    const r = svg.getBoundingClientRect();
    svg.setAttribute('preserveAspectRatio', r.width / r.height >= 2 ? 'xMidYMax slice' : 'xMidYMax meet');
  }
  tilpass(); window.addEventListener('resize', tilpass);
  requestAnimationFrame(tikk);
})();
  },
});
