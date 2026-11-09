// Bilspill – felles kjøretøy. Alle moduler henter design herfra.
// Koordinatsystem: 400 x 200 enheter, bakken ved y = 190, fronten peker mot høyre.
// deler: karosseriets former (uten fill = lakkfarge, kan males/skitnes til)
// hjul: [x, y, radius]   anker: punkter for lykt, bulk og tank (verksted, bensinstasjon)
const speil = d => d.replace(/(-?\d+\.?\d*) (-?\d+\.?\d*)/g, (m, x, y) => `${410 - x} ${y}`);
const VINDU = '#bfe3f7', MORK = '#4a4f5a', LYS = '#ffe9a3';
const KJORETOY = [
  { navn: 'bil', lyd: 'tut', farger: ['#e5484d','#3e8ef7','#8e4ec6','#f76b15'],
    deler: [{ d: speil('M18 148 C18 120 30 108 62 104 L118 98 C132 76 148 58 166 50 C174 46 182 44 192 44 L262 44 C278 44 290 50 300 60 L334 96 L366 102 C384 106 392 118 392 136 L392 150 C392 158 386 162 378 162 L26 162 C20 162 18 156 18 148 Z') }],
    anker: { lys: [381,124], bulk: [150,122], tank: [42,120] },
    hjul: [[100,160,30],[310,160,30]], nav: '#c9ced6',
    skygge: `<rect x="0" y="104" width="400" height="8" fill="#fff" opacity=".28"/>
      <path d="M184 58 L184 150" stroke="#000" stroke-opacity=".18" stroke-width="3"/>
      <path d="M274 98 L274 150" stroke="#000" stroke-opacity=".12" stroke-width="3"/>`,
    detaljer: `<g transform="matrix(-1 0 0 1 410 0)">
        <path d="M140 96 C150 76 162 62 178 56 L222 56 L222 96 Z" fill="${VINDU}"/>
        <path d="M232 56 L268 56 C280 56 288 62 296 70 L320 96 L232 96 Z" fill="${VINDU}"/>
        <path d="M184 62 L198 62 L176 92 L162 92 Z" fill="#fff" opacity=".6"/>
        <path d="M262 62 L272 62 L254 92 L244 92 Z" fill="#fff" opacity=".6"/>
        <rect x="198" y="110" width="18" height="5" rx="2.5" fill="#000" opacity=".25"/>
        <rect x="290" y="110" width="18" height="5" rx="2.5" fill="#000" opacity=".25"/>
      </g>
      <ellipse cx="381" cy="124" rx="7" ry="9" fill="${LYS}"/>
      <rect x="23" y="114" width="8" height="16" rx="3" fill="#ff7a7a"/>
      <rect x="10" y="144" width="34" height="13" rx="6.5" fill="${MORK}"/>
      <rect x="366" y="144" width="34" height="13" rx="6.5" fill="${MORK}"/>` },

  { navn: 'traktor', lyd: 'traktor', farger: ['#30a46c','#e5484d','#3e8ef7'],
    deler: [
      { d: 'M160 140 L320 140 L320 160 L160 160 Z', fill: MORK },
      { d: 'M200 152 L200 84 L318 84 Q340 84 340 104 L340 152 Z' },
      { d: 'M96 126 L104 18 L212 18 L212 126 Z' },
      { d: 'M74 112 Q140 40 206 112 L206 122 L74 122 Z' },
      { d: 'M86 8 L222 8 L222 22 L86 22 Z', fill: '#f2f4f7' } ],
    hjul: [[140,138,52],[306,160,30]], nav: '#ffcf3f', knaster: true,
    anker: { lys: [336,96], bulk: [262,118], tank: [226,130] },
    skygge: `<path d="M240 92 L240 148 M280 92 L280 148" stroke="#000" stroke-opacity=".12" stroke-width="3"/>
      <rect x="200" y="84" width="140" height="6" fill="#fff" opacity=".25"/>`,
    detaljer: `<path d="M114 30 L202 30 L202 90 L110 90 Z" fill="${VINDU}"/>
      <path d="M162 34 L176 34 L156 86 L142 86 Z" fill="#fff" opacity=".6"/>
      <rect x="326" y="94" width="12" height="52" rx="3" fill="#000" opacity=".25"/>
      <rect x="296" y="40" width="10" height="46" rx="3" fill="${MORK}"/><rect x="293" y="34" width="16" height="9" rx="3" fill="#2a2a30"/>
      <ellipse cx="336" cy="98" rx="5" ry="7" fill="${LYS}"/>
      <rect x="136" y="0" width="14" height="8" rx="3" fill="#f5b82e"/>` },
  { navn: 'brannbil', lyd: 'sirene', farger: ['#e5484d'],
    deler: [
      { d: 'M14 80 Q14 70 24 70 L292 70 L292 162 L14 162 Z' },
      { d: 'M288 62 L350 62 Q362 62 368 72 L388 112 Q392 120 392 130 L392 156 Q392 162 386 162 L288 162 Z' } ],
    anker: { lys: [385,134], bulk: [168,98], tank: [240,142] },
    hjul: [[80,160,28],[146,160,28],[330,160,28]], nav: '#e8ecf1',
    skygge: `<rect x="0" y="122" width="400" height="9" fill="#fff"/>
      <path d="M290 64 L290 160" stroke="#000" stroke-opacity=".15" stroke-width="3"/>`,
    detaljer: `<g fill="#000" opacity=".15"><rect x="28" y="80" width="96" height="34" rx="5"/><rect x="134" y="80" width="66" height="34" rx="5"/><rect x="210" y="80" width="70" height="34" rx="5"/></g>
      <g fill="#fff" opacity=".6"><rect x="70" y="94" width="12" height="4" rx="2"/><rect x="161" y="94" width="12" height="4" rx="2"/><rect x="239" y="94" width="12" height="4" rx="2"/></g>
      <g><rect x="60" y="62" width="8" height="10" fill="#c9ced6"/><rect x="250" y="62" width="8" height="10" fill="#c9ced6"/>
        <rect x="26" y="48" width="262" height="6" rx="3" fill="#c9ced6"/><rect x="26" y="60" width="262" height="6" rx="3" fill="#c9ced6"/>
        ${Array.from({length: 13}, (_, i) => `<rect x="${32 + i*20}" y="48" width="4" height="18" fill="#c9ced6"/>`).join('')}</g>
      <path d="M300 72 L346 72 Q354 72 358 80 L376 112 L300 112 Z" fill="${VINDU}"/>
      <path d="M330 76 L342 76 L326 108 L314 108 Z" fill="#fff" opacity=".6"/>
      <rect class="blink" x="306" y="50" width="30" height="12" rx="5" fill="#3e8ef7"/>
      <ellipse cx="385" cy="134" rx="5" ry="8" fill="${LYS}"/>
      <rect x="378" y="148" width="20" height="12" rx="5" fill="${MORK}"/><rect x="8" y="148" width="20" height="12" rx="5" fill="${MORK}"/>` },

  { navn: 'politibil', lyd: 'politi', farger: ['#f6f7f9'],
    deler: [{ d: speil('M18 148 C18 120 30 108 62 104 L118 98 C132 76 148 58 166 50 C174 46 182 44 192 44 L262 44 C278 44 290 50 300 60 L334 96 L366 102 C384 106 392 118 392 136 L392 150 C392 158 386 162 378 162 L26 162 C20 162 18 156 18 148 Z') }],
    anker: { lys: [381,124], bulk: [150,104], tank: [42,120] },
    hjul: [[100,160,30],[310,160,30]], nav: '#c9ced6',
    skygge: `${Array.from({length: 23}, (_, i) => `<rect x="${i*18}" y="112" width="18" height="10" fill="${i % 2 ? '#ffcf3f' : '#2d6fd6'}"/><rect x="${i*18}" y="122" width="18" height="10" fill="${i % 2 ? '#2d6fd6' : '#ffcf3f'}"/>`).join('')}
      <path d="M184 58 L184 150" stroke="#000" stroke-opacity=".18" stroke-width="3"/>
      <path d="M274 98 L274 150" stroke="#000" stroke-opacity=".12" stroke-width="3"/>`,
    detaljer: `<g transform="matrix(-1 0 0 1 410 0)">
        <path d="M140 96 C150 76 162 62 178 56 L222 56 L222 96 Z" fill="${VINDU}"/>
        <path d="M232 56 L268 56 C280 56 288 62 296 70 L320 96 L232 96 Z" fill="${VINDU}"/>
        <path d="M184 62 L198 62 L176 92 L162 92 Z" fill="#fff" opacity=".6"/>
        <path d="M262 62 L272 62 L254 92 L244 92 Z" fill="#fff" opacity=".6"/>
        <rect x="198" y="110" width="18" height="5" rx="2.5" fill="#000" opacity=".25"/>
        <rect x="290" y="110" width="18" height="5" rx="2.5" fill="#000" opacity=".25"/>
      </g>
      <ellipse cx="381" cy="124" rx="7" ry="9" fill="${LYS}"/>
      <rect x="23" y="114" width="8" height="16" rx="3" fill="#ff7a7a"/>
      <rect x="10" y="144" width="34" height="13" rx="6.5" fill="${MORK}"/>
      <rect x="366" y="144" width="34" height="13" rx="6.5" fill="${MORK}"/>
      <rect x="166" y="34" width="44" height="11" rx="4" fill="#2a2a30"/>
      <rect class="blink" x="168" y="35" width="19" height="9" rx="3" fill="#3e8ef7"/><rect class="blink" x="189" y="35" width="19" height="9" rx="3" fill="#3e8ef7" style="animation-delay:.17s"/>` },
  { navn: 'søppelbil', lyd: 'rygg', farger: ['#30a46c','#f76b15'],
    deler: [
      { d: 'M14 162 L14 60 Q14 36 40 36 L280 36 Q296 36 296 52 L296 162 Z' },
      { d: 'M292 70 L352 70 Q362 70 368 80 L388 114 Q392 120 392 130 L392 156 Q392 162 386 162 L292 162 Z', fill: '#f2f4f7' } ],
    anker: { lys: [385,134], bulk: [100,92], tank: [250,118] },
    hjul: [[90,160,30],[330,160,30]], nav: '#c9ced6',
    skygge: `<path d="M70 46 L70 150 M130 46 L130 150 M190 46 L190 150 M250 46 L250 150" stroke="#000" stroke-opacity=".12" stroke-width="4"/>
      <rect x="0" y="136" width="296" height="10" fill="#ffcf3f"/>
      <rect x="14" y="40" width="282" height="7" fill="#fff" opacity=".25"/>`,
    detaljer: `<path d="M4 64 L18 64 L18 152 L4 152 Z" fill="${MORK}"/>
      <g transform="translate(160 80)"><circle r="20" fill="#fff" opacity=".9"/><path d="M-8 6 Q-10 -10 8 -10 Q10 6 -8 6 Z" fill="#30a46c"/><path d="M-8 6 L4 -5" stroke="#fff" stroke-width="2"/></g>
      <path d="M304 80 L348 80 Q356 80 360 88 L376 116 L304 116 Z" fill="${VINDU}"/>
      <path d="M334 84 L346 84 L330 112 L318 112 Z" fill="#fff" opacity=".6"/>
      <rect class="blink" x="316" y="60" width="22" height="10" rx="4" fill="#f5b82e"/>
      <ellipse cx="385" cy="134" rx="5" ry="8" fill="${LYS}"/>
      <rect x="378" y="148" width="20" height="12" rx="5" fill="${MORK}"/>` },

  { navn: 'isbil', lyd: 'is', farger: ['#bfe9ff','#ffd1e3'],
    deler: [{ d: 'M14 52 Q14 38 28 38 L300 38 Q316 38 324 52 L352 98 L378 104 Q392 108 392 124 L392 152 Q392 162 382 162 L24 162 Q14 162 14 152 Z' }],
    anker: { lys: [386,132], bulk: [120,140], tank: [40,110] },
    hjul: [[80,160,30],[320,160,30]], nav: '#ffffff',
    skygge: `<rect x="0" y="122" width="400" height="10" fill="#ff7eb6"/><rect x="0" y="132" width="400" height="4" fill="#fff"/>`,
    detaljer: `<rect x="56" y="58" width="150" height="50" rx="6" fill="#fff6e5"/>
      ${Array.from({length: 8}, (_, i) => `<path d="M${50+i*20} 48 h20 v10 q-10 8 -20 0 z" fill="${i % 2 ? '#fff' : '#ff7eb6'}"/>`).join('')}
      <g transform="translate(250 82)"><path d="M-12 4 L0 34 L12 4 Z" fill="#e8b36a"/><path d="M-8 8 L4 30 M8 8 L-4 30" stroke="#c48a3f" stroke-width="2"/><circle cy="-2" r="12" fill="#ffb3d1"/><circle cx="-6" cy="-14" r="9" fill="#fff4c2"/><circle cx="7" cy="-13" r="9" fill="#a8e6b4"/><circle cx="1" cy="-24" r="5" fill="#e5484d"/></g>
      <path d="M300 50 L318 50 L342 96 L300 96 Z" fill="${VINDU}"/>
      <path d="M312 54 L320 54 L310 92 L304 92 Z" fill="#fff" opacity=".6"/>
      <ellipse cx="386" cy="132" rx="5" ry="8" fill="${LYS}"/>
      <rect x="378" y="148" width="20" height="12" rx="5" fill="${MORK}"/><rect x="8" y="148" width="20" height="12" rx="5" fill="${MORK}"/>` },
  { navn: 'buss', lyd: 'horn', farger: ['#f5b82e','#3e8ef7','#e5484d'],
    deler: [{ d: 'M14 50 Q14 34 30 34 L370 34 Q392 34 392 60 L392 152 Q392 162 382 162 L24 162 Q14 162 14 152 Z' }],
    anker: { lys: [386,134], bulk: [200,138], tank: [44,134] },
    hjul: [[80,160,30],[320,160,30]], nav: '#c9ced6',
    skygge: `<rect x="0" y="108" width="400" height="8" fill="#fff" opacity=".8"/>
      <rect x="0" y="38" width="400" height="5" fill="#fff" opacity=".3"/>`,
    detaljer: `${[30,86,142,198,254].map(x => `<rect x="${x}" y="48" width="46" height="48" rx="6" fill="${VINDU}"/><path d="M${x+28} 52 L${x+38} 52 L${x+22} 92 L${x+12} 92 Z" fill="#fff" opacity=".55"/>`).join('')}
      <rect x="310" y="48" width="30" height="110" rx="4" fill="${VINDU}"/><path d="M325 48 L325 158" stroke="#000" stroke-opacity=".2" stroke-width="2"/>
      <path d="M348 48 L372 48 Q384 48 386 62 L388 100 L348 100 Z" fill="${VINDU}"/>
      <ellipse cx="386" cy="134" rx="5" ry="8" fill="${LYS}"/>
      <rect x="378" y="148" width="20" height="12" rx="5" fill="${MORK}"/><rect x="8" y="148" width="20" height="12" rx="5" fill="${MORK}"/>` },
  { navn: 'gravemaskin', lyd: 'grave', farger: ['#f5b82e','#f76b15'], ingenBue: true,
    deler: [
      { d: 'M50 152 Q30 152 30 171 Q30 190 50 190 L290 190 Q310 190 310 171 Q310 152 290 152 Z', fill: '#2a2a30' },
      { d: 'M120 140 L220 140 L220 156 L120 156 Z', fill: MORK },
      { d: 'M44 106 Q44 96 54 96 L268 96 L268 146 L44 146 Z' },
      { d: 'M186 40 L240 40 Q256 40 260 56 L268 100 L186 100 Z' },
      { d: 'M246 106 L298 30 Q304 22 314 24 L326 32 L276 114 Z' },
      { d: 'M308 28 L332 22 L374 108 L356 116 Z' },
      { d: 'M346 106 L386 100 Q394 128 374 146 L350 140 Z', fill: '#8a96a6' } ],
    anker: { lys: null, bulk: [96,118], tank: [150,118] }, ingenDekk: true,
    hjul: [[60,171,13],[105,171,13],[150,171,13],[195,171,13],[240,171,13],[282,171,13]], nav: '#8a96a6',
    skygge: `<rect x="44" y="96" width="224" height="6" fill="#fff" opacity=".3"/>
      <rect x="44" y="126" width="80" height="20" fill="#000" opacity=".15"/>
      ${Array.from({length: 7}, (_, i) => `<rect x="${44 + i*36}" y="134" width="18" height="12" fill="#2a2a30" opacity=".85"/>`).join('')}`,
    detaljer: `<path d="M196 50 L238 50 Q248 50 251 60 L258 92 L196 92 Z" fill="${VINDU}"/>
      <path d="M222 54 L232 54 L216 88 L206 88 Z" fill="#fff" opacity=".6"/>
      <line x1="236" y1="100" x2="292" y2="50" stroke="#c9ced6" stroke-width="6" stroke-linecap="round"/>
      <line x1="318" y1="40" x2="352" y2="104" stroke="#c9ced6" stroke-width="4" stroke-linecap="round"/>
      <g fill="#c9ced6"><rect x="370" y="140" width="6" height="10" rx="2" transform="rotate(30 373 145)"/><rect x="360" y="142" width="6" height="10" rx="2" transform="rotate(30 363 147)"/></g>
      <rect x="120" y="76" width="8" height="22" rx="3" fill="${MORK}"/>
      <rect class="blink" x="208" y="32" width="18" height="9" rx="4" fill="#f76b15"/>` },
];

function hjulMarkup([x, y, r], k) {
  const knaster = k.knaster ? Array.from({length: 14}, (_, i) => `<rect x="-5" y="${-r - 3}" width="10" height="9" rx="2" fill="#2a2a30" transform="rotate(${i * 360/14})"/>`).join('') : '';
  const eiker = [0,72,144,216,288].map(a => `<line x1="0" y1="0" x2="${(r*.47*Math.cos(a*Math.PI/180)).toFixed(1)}" y2="${(r*.47*Math.sin(a*Math.PI/180)).toFixed(1)}" stroke="#8a919c" stroke-width="${(r*.13).toFixed(1)}" stroke-linecap="round"/>`).join('');
  return `<g transform="translate(${x} ${y})"><g class="hjul">${knaster}<circle r="${r}" fill="#2a2a30"/><circle r="${(r*.56).toFixed(1)}" fill="${k.nav}"/>${eiker}<circle r="${(r*.17).toFixed(1)}" fill="#6b727d"/></g></g>`;
}


const finn = n => KJORETOY.find(k => k.navn === n);
const forskyv = (d, dy) => d.replace(/(-?\d+\.?\d*) (-?\d+\.?\d*)/g, (m, x, y) => `${x} ${+y + dy}`);

// ---------- Byggeklosser ----------
const KAROSSERI = [
  { id: 'bil', sete: [[134, 94], [228, 94]], ...finn('bil'), hjulX: [100, 310], tak: [183, 44, 70] },
  { id: 'varebil', sete: [[318, 94]], hjulX: [80, 320], tak: [160, 38, 260], anker: { lys: [386,132], bulk: [200,100], tank: [40,120] },
    deler: [{ d: 'M14 52 Q14 38 28 38 L300 38 Q316 38 324 52 L352 98 L378 104 Q392 108 392 124 L392 152 Q392 162 382 162 L24 162 Q14 162 14 152 Z' }],
    skygge: `<rect x="0" y="118" width="400" height="8" fill="#fff" opacity=".35"/><path d="M290 44 L290 158 M150 44 L150 158" stroke="#000" stroke-opacity=".12" stroke-width="3"/>`,
    detaljer: `<path d="M300 50 L318 50 L342 96 L300 96 Z" fill="${VINDU}"/><path d="M312 54 L320 54 L310 92 L304 92 Z" fill="#fff" opacity=".6"/>
      <rect x="270" y="104" width="14" height="5" rx="2.5" fill="#000" opacity=".25"/>
      <ellipse cx="386" cy="132" rx="5" ry="8" fill="${LYS}"/><rect x="18" y="110" width="7" height="16" rx="3" fill="#ff7a7a"/>
      <rect x="378" y="148" width="20" height="12" rx="5" fill="${MORK}"/><rect x="8" y="148" width="20" height="12" rx="5" fill="${MORK}"/>` },
  { id: 'pickup', sete: [[240, 98], [286, 98]], hjulX: [100, 316], tak: [247, 56, 66], anker: { lys: [384,126], bulk: [120,130], tank: [40,124] },
    deler: [{ d: 'M14 104 L200 104 L200 70 Q200 56 214 56 L280 56 Q292 56 300 66 L326 100 L370 106 Q392 110 392 128 L392 152 Q392 162 382 162 L24 162 Q14 162 14 152 Z' }],
    skygge: `<rect x="0" y="104" width="200" height="6" fill="#000" opacity=".2"/><rect x="0" y="116" width="400" height="6" fill="#fff" opacity=".3"/>`,
    detaljer: `<path d="M214 66 L278 66 Q286 66 292 74 L314 100 L214 100 Z" fill="${VINDU}"/><path d="M262 70 L272 70 L254 96 L244 96 Z" fill="#fff" opacity=".6"/>
      <rect x="236" y="112" width="16" height="5" rx="2.5" fill="#000" opacity=".25"/>
      <ellipse cx="384" cy="126" rx="6" ry="8" fill="${LYS}"/><rect x="14" y="110" width="7" height="16" rx="3" fill="#ff7a7a"/>
      <rect x="374" y="146" width="24" height="12" rx="5" fill="${MORK}"/><rect x="8" y="146" width="24" height="12" rx="5" fill="${MORK}"/>` },
  { id: 'buss', sete: [[53, 94], [109, 94], [165, 94], [221, 94], [277, 94]], ...finn('buss'), hjulX: [80, 320], tak: [200, 34, 300] },
  { id: 'racer', sete: [[212, 112], [242, 112]], hjulX: [104, 296], tak: [222, 90, 50], anker: { lys: [362,140], bulk: [200,134], tank: [62,136] },
    deler: [{ d: 'M40 142 Q40 122 64 120 L150 114 Q168 92 196 90 L242 90 Q254 90 264 98 L290 114 L344 122 Q368 126 368 142 L368 154 Q368 162 360 162 L48 162 Q40 162 40 154 Z' },
            { d: 'M30 88 L80 88 L80 98 L30 98 Z' }, { d: 'M52 98 L60 98 L60 122 L52 122 Z' }],
    skygge: `<rect x="0" y="138" width="400" height="7" fill="#fff" opacity=".85"/><rect x="0" y="147" width="400" height="3" fill="#fff" opacity=".85"/>`,
    detaljer: `<path d="M178 112 Q188 96 204 96 L238 96 Q248 96 254 102 L264 112 Z" fill="${VINDU}"/><path d="M222 99 L232 99 L222 110 L212 110 Z" fill="#fff" opacity=".6"/>
      <circle cx="140" cy="134" r="12" fill="#fff"/><path d="M134 128 L146 128 L138 142" stroke="#2a2a30" stroke-width="3" fill="none" stroke-linecap="round"/>
      <ellipse cx="362" cy="140" rx="5" ry="6" fill="${LYS}"/><rect x="354" y="150" width="18" height="10" rx="4" fill="${MORK}"/>` },
];
const HJULTYPER = [
  { id: 'vanlig', r: 30, nav: '#c9ced6' },
  { id: 'sma', r: 22, nav: '#e8ecf1' },
  { id: 'traktor', r: 36, nav: '#ffcf3f', knaster: true },
  { id: 'monster', r: 46, nav: '#e5484d', knaster: true },
  { id: 'belter' },
];
const TOPPER = ['ingen', 'blalys', 'stige', 'propell', 'kran', 'is'];
const FABRIKK_FARGER = ['#e5484d','#f76b15','#ffcf3f','#30a46c','#3e8ef7','#8e4ec6','#ff7eb6','#f2f4f7'];

function toppMarkup(t, [tx, ty, w]) {
  switch (t) {
    case 'blalys': return `<rect x="${tx-24}" y="${ty-11}" width="48" height="12" rx="4" fill="#2a2a30"/><rect class="blink" x="${tx-22}" y="${ty-10}" width="21" height="9" rx="3" fill="#3e8ef7"/><rect class="blink" x="${tx+1}" y="${ty-10}" width="21" height="9" rx="3" fill="#3e8ef7" style="animation-delay:.25s"/>`;
    case 'stige': { const L = Math.min(w + 90, 280), x0 = tx - L/2; return `<rect x="${tx-30}" y="${ty-8}" width="8" height="9" fill="#9aa3ae"/><rect x="${tx+22}" y="${ty-8}" width="8" height="9" fill="#9aa3ae"/><rect x="${x0}" y="${ty-22}" width="${L}" height="5" rx="2.5" fill="#c9ced6"/><rect x="${x0}" y="${ty-11}" width="${L}" height="5" rx="2.5" fill="#c9ced6"/>${Array.from({length: Math.floor(L/18)}, (_, i) => `<rect x="${x0 + 6 + i*18}" y="${ty-22}" width="4" height="16" fill="#c9ced6"/>`).join('')}`; }
    case 'propell': return `<rect x="${tx-3}" y="${ty-30}" width="6" height="31" rx="2" fill="${MORK}"/><g transform="translate(${tx} ${ty-32})"><g class="propell"><ellipse rx="56" ry="5" fill="#9aa3ae"/></g><circle r="6" fill="#e5484d"/></g>`;
    case 'kran': return `<rect x="${tx-14}" y="${ty-12}" width="28" height="13" rx="3" fill="#ffcf3f"/><line x1="${tx}" y1="${ty-8}" x2="${tx+80}" y2="${ty-70}" stroke="#f5b82e" stroke-width="10" stroke-linecap="round"/><line x1="${tx}" y1="${ty-8}" x2="${tx+80}" y2="${ty-70}" stroke="#2a2a30" stroke-width="2" stroke-dasharray="6 6"/><line x1="${tx+80}" y1="${ty-70}" x2="${tx+80}" y2="${ty-28}" stroke="#2a2a30" stroke-width="2"/><path d="M${tx+80} ${ty-28} q8 2 6 10 q-4 6 -10 0" stroke="#2a2a30" stroke-width="3" fill="none"/>`;
    case 'is': return `<path d="M${tx-20} ${ty-44} L${tx} ${ty} L${tx+20} ${ty-44} Z" fill="#e8b36a"/><path d="M${tx-14} ${ty-38} L${tx+6} ${ty-8} M${tx+14} ${ty-38} L${tx-6} ${ty-8}" stroke="#c48a3f" stroke-width="2"/><circle cx="${tx}" cy="${ty-50}" r="20" fill="#ffb3d1"/><circle cx="${tx-10}" cy="${ty-66}" r="14" fill="#fff4c2"/><circle cx="${tx+11}" cy="${ty-64}" r="14" fill="#a8e6b4"/><circle cx="${tx+1}" cy="${ty-80}" r="7" fill="#e5484d"/>`;
    default: return '';
  }
}

// Lager et kjøretøy i samme format som KJORETOY, så det kan brukes i vask, verksted og lakk
function lagKjoretoy(v) {
  const kar = KAROSSERI[v.kar], ht = HJULTYPER[v.hjul];
  const belte = ht.id === 'belter';
  const dy = belte ? -10 : 30 - ht.r;
  const tak = [kar.tak[0], kar.tak[1] + dy, kar.tak[2]];
  const flytt = s => `<g transform="translate(0 ${dy})">${s}</g>`;
  let deler = kar.deler.map(d => ({ ...d, d: forskyv(d.d, dy) }));
  let hjul;
  if (belte) {
    const x1 = kar.hjulX[0] - 34, x2 = kar.hjulX[1] + 34;
    deler = [{ d: `M${x1+20} 152 Q${x1} 152 ${x1} 171 Q${x1} 190 ${x1+20} 190 L${x2-20} 190 Q${x2} 190 ${x2} 171 Q${x2} 152 ${x2-20} 152 Z`, fill: '#2a2a30' }, ...deler];
    const n = Math.max(3, Math.round((x2 - x1 - 40) / 44)) + 1;
    hjul = Array.from({length: n}, (_, i) => [Math.round(x1 + 20 + i * (x2 - x1 - 40) / (n - 1)), 171, 13]);
  } else {
    hjul = kar.hjulX.map(x => [x, 190 - ht.r, ht.r]);
  }
  const lyd = { blalys: 'politi', stige: 'sirene', is: 'is' }[TOPPER[v.topp]] || (kar.id === 'buss' ? 'horn' : ht.id === 'traktor' ? 'traktor' : 'tut');
  return {
    navn: 'minbil', lyd, farger: [FABRIKK_FARGER[v.farge]], deler, hjul,
    nav: belte ? '#8a96a6' : ht.nav, knaster: !!ht.knaster, ingenBue: belte || ht.r > 34,
    skygge: flytt(kar.skygge), detaljer: flytt(kar.detaljer) + toppMarkup(TOPPER[v.topp], tak),
    tak, _kar: flytt(kar.detaljer), _topp: toppMarkup(TOPPER[v.topp], tak),
    anker: { lys: kar.anker.lys ? [kar.anker.lys[0], kar.anker.lys[1] + dy] : null, bulk: [kar.anker.bulk[0], kar.anker.bulk[1] + dy], tank: [kar.anker.tank[0], kar.anker.tank[1] + dy] },
    ingenDekk: belte,
    sete: (kar.sete || []).map(([x, y]) => [x, y + dy]),
  };
}


// Dyrefangeren: varebil med bur bak. «foran» tegnes oppå dyrene i buret (brukes i kjøretur).
const BURSPILER = `${[54,74,94,114,134,154,174,194,214].map(x => `<rect x="${x}" y="52" width="5" height="60" rx="2" fill="#dfe3e8"/>`).join('')}<rect x="38" y="48" width="196" height="68" rx="8" fill="none" stroke="#dfe3e8" stroke-width="6"/>`;
KJORETOY.push({ navn: 'dyrefanger', lyd: 'dyr', farger: ['#7fb84a','#f5b82e'],
  deler: [{ d: 'M14 52 Q14 38 28 38 L290 38 Q306 38 314 52 L344 98 L376 104 Q392 108 392 124 L392 152 Q392 162 382 162 L24 162 Q14 162 14 152 Z' }],
  hjul: [[84,160,30],[318,160,30]], nav: '#ffffff',
  anker: { lys: [386,132], bulk: [270,134], tank: [36,128] },
  tak: [160, 38, 260], bur: { x: [70, 116, 162, 208], y: 112 },
  skygge: `<rect x="0" y="124" width="400" height="9" fill="#2f5a2a" opacity=".35"/><rect x="0" y="40" width="400" height="6" fill="#fff" opacity=".25"/>`,
  detaljer: `<rect x="38" y="48" width="196" height="68" rx="8" fill="#3d4a35"/>
    <path d="M296 50 L314 50 L338 96 L296 96 Z" fill="${VINDU}"/><path d="M306 54 L314 54 L306 92 L300 92 Z" fill="#fff" opacity=".6"/>
    <g fill="#fff" opacity=".9" transform="translate(262 72)"><ellipse cx="0" cy="8" rx="9" ry="7"/><circle cx="-9" cy="-3" r="4"/><circle cx="-3" cy="-9" r="4"/><circle cx="4" cy="-9" r="4"/><circle cx="10" cy="-3" r="4"/></g>
    ${BURSPILER}
    <rect class="blink" x="150" y="28" width="22" height="10" rx="4" fill="#f5b82e"/>
    <ellipse cx="386" cy="132" rx="5" ry="8" fill="${LYS}"/>
    <rect x="378" y="148" width="20" height="12" rx="5" fill="${MORK}"/><rect x="8" y="148" width="20" height="12" rx="5" fill="${MORK}"/>`,
  foran: BURSPILER,
});
Object.assign(KJORETOY.find(k => k.navn === 'bil'), { tak: [183, 44, 70], sete: [[134, 94], [228, 94]] });

// Lakk og klistremerker som er malt på «min bil» i lakkeringen (lagres som bilde + SVG)
function tegnLakk(k) {
  if (!k || !k.lakk) return '';
  const id = 'lk' + Math.random().toString(36).slice(2, 8);
  return `<defs><clipPath id="${id}">${k.deler.filter(d => !d.fill).map(d => `<path d="${d.d}"/>`).join('')}</clipPath></defs>
    <image href="${k.lakk}" x="0" y="0" width="400" height="200" clip-path="url(#${id})" preserveAspectRatio="none"/>`;
}
const tegnMerker = k => (k && k.merker) || '';

// «Min bil» fra bilfabrikken (lagres som valg, bygges på nytt med gjeldende design)
function minBil() {
  try {
    const v = JSON.parse(localStorage.getItem('bilspill.minBil.valg'));
    if (v && KAROSSERI[v.kar] && HJULTYPER[v.hjul]) {
      const k = lagKjoretoy(v);
      k.lakk = localStorage.getItem('bilspill.minBil.lakk') || null;
      k.merker = localStorage.getItem('bilspill.minBil.merker') || '';
      return k;
    }
  } catch (e) {}
  return null;
}
const MIN_BIL = minBil();
const KJORETOY_SPILL = MIN_BIL ? [MIN_BIL, ...KJORETOY] : KJORETOY;
