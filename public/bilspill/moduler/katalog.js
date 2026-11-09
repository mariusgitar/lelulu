// Bilspill-modul: katalog – oversikt over alle kjøretøydesign (for voksne, åpnes med #katalog)
Bilspill.modul('katalog', {
  css: `
    body { background: #eef2f6; overflow: auto !important; touch-action: auto !important; }
    .kat { position: fixed; inset: 0; overflow-y: auto; touch-action: pan-y; padding: 70px 16px 24px; align-content: start; display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 14px; }
    .kat h2 { grid-column: 1 / -1; margin: 10px 0 0; font: 600 16px system-ui; color: #4a505c; }
    .kort { background: #fff; border-radius: 14px; padding: 10px; box-shadow: 0 2px 0 rgba(0,0,0,.08); }
    .kort svg { width: 100%; aspect-ratio: 2 / 1.15; overflow: visible; display: block; }
    .kort p { margin: 6px 2px 0; font: 13px system-ui; color: #4a505c; }
    .forklaring { grid-column: 1 / -1; font: 13px system-ui; color: #4a505c; }
    .forklaring i { display: inline-block; width: 10px; height: 10px; border-radius: 50%; margin: 0 4px 0 12px; vertical-align: -1px; }
  `,
  html: `<div class="kat" id="kat"></div>`,
  start() {
    const kat = document.getElementById('kat');
    const kort = (k, navn) => {
      const a = k.anker || {};
      const pkt = (p, f) => p ? `<circle cx="${p[0]}" cy="${p[1]}" r="6" fill="${f}" stroke="#fff" stroke-width="2"/>` : '';
      return `<div class="kort"><svg viewBox="-10 -40 420 240">
        <rect x="0" y="0" width="400" height="200" fill="none" stroke="#c9ced6" stroke-dasharray="6 6"/>
        <line x1="-10" y1="190" x2="410" y2="190" stroke="#9aa3ae" stroke-width="2"/>
        ${k.deler.map(d => `<path d="${d.d}" fill="${d.fill || k.farger[0]}"/>`).join('')}
        <defs><clipPath id="kp${navn}">${k.deler.map(d => `<path d="${d.d}"/>`).join('')}</clipPath></defs>
        <g clip-path="url(#kp${navn})">${k.skygge || ''}</g>
        ${(k.detaljer || '').replace(/class="blink"/g, '')}
        ${k.hjul.map(h => hjulMarkup(h, k)).join('')}
        ${pkt(a.lys, '#ffcf3f')}${pkt(a.bulk, '#8e4ec6')}${pkt(a.tank, '#e5484d')}
      </svg><p>${navn}</p></div>`;
    };
    kat.innerHTML = `<p class="forklaring">Stiplet ramme = 400×200, grå linje = bakken. Ankerpunkter:<i style="background:#ffcf3f"></i>lykt<i style="background:#8e4ec6"></i>bulk<i style="background:#e5484d"></i>tank</p>
      <h2>Faste kjøretøy</h2>${KJORETOY.map(k => kort(k, k.navn)).join('')}
      <h2>Bilfabrikk – karosserier</h2>${KAROSSERI.map((k, i) => kort(lagKjoretoy({ kar: i, hjul: 0, topp: 0, farge: i }), k.id)).join('')}
      <h2>Bilfabrikk – hjul og topper</h2>${HJULTYPER.map((h, i) => kort(lagKjoretoy({ kar: 0, hjul: i, topp: i + 1, farge: 4 }), h.id + ' + ' + TOPPER[i + 1])).join('')}`;
  },
});
