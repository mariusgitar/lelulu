// Bilspill – felles dyr. Hvert dyr: { w, h, svg } i egne enheter, bakken nederst, ser mot høyre.
// Klassen «hale» vifter, «dyrkropp» brukes til hopp. Brukes i kjøretur (og kan brukes i andre moduler).
const OYE = (x, y, r = 3.2) => `<circle cx="${x}" cy="${y}" r="${r}" fill="#2a2a30"/><circle cx="${x + r * .35}" cy="${y - r * .35}" r="${r * .35}" fill="#fff"/>`;
const DYR = {
  hund: {
    w: 100, h: 74, navn: 'hund',
    svg: () => `<g class="hale"><path d="M18 36 Q4 22 10 8" stroke="#c8925a" stroke-width="8" fill="none" stroke-linecap="round"/></g>
      <g fill="#a8723f"><rect x="22" y="48" width="9" height="24" rx="4"/><rect x="56" y="48" width="9" height="24" rx="4"/></g>
      <ellipse cx="46" cy="42" rx="31" ry="17" fill="#c8925a"/>
      <g fill="#c8925a"><rect x="32" y="48" width="9" height="24" rx="4"/><rect x="66" y="48" width="9" height="24" rx="4"/></g>
      <rect x="64" y="30" width="16" height="7" rx="3" fill="#e5484d"/>
      <circle cx="78" cy="24" r="18" fill="#c8925a"/>
      <ellipse cx="92" cy="31" rx="10" ry="8" fill="#f2d6b3"/><circle cx="99" cy="28" r="4" fill="#2a2a30"/>
      <path d="M90 37 q3 6 7 2" fill="#ff8fa3"/>
      ${OYE(80, 20)}
      <path d="M66 8 Q56 26 66 38 Q76 28 72 10 Z" fill="#8b5a2b"/>`,
  },
  katt: {
    w: 84, h: 72, navn: 'katt',
    svg: () => `<g class="hale"><path d="M16 44 Q0 34 8 10" stroke="#f5a25d" stroke-width="7" fill="none" stroke-linecap="round"/></g>
      <g fill="#e08c45"><rect x="20" y="50" width="8" height="21" rx="4"/><rect x="46" y="50" width="8" height="21" rx="4"/></g>
      <ellipse cx="38" cy="46" rx="25" ry="14" fill="#f5a25d"/>
      <g stroke="#e08c45" stroke-width="4" stroke-linecap="round"><line x1="30" y1="34" x2="28" y2="44"/><line x1="40" y1="33" x2="38" y2="44"/></g>
      <g fill="#f5a25d"><rect x="28" y="50" width="8" height="21" rx="4"/><rect x="54" y="50" width="8" height="21" rx="4"/></g>
      <path d="M50 18 L53 2 L62 14 Z M64 13 L73 2 L75 18 Z" fill="#f5a25d"/>
      <circle cx="63" cy="28" r="16" fill="#f5a25d"/>
      <ellipse cx="57" cy="26" rx="3" ry="4" fill="#3aa35a"/><ellipse cx="69" cy="26" rx="3" ry="4" fill="#3aa35a"/>
      <circle cx="57" cy="26" r="1.4" fill="#2a2a30"/><circle cx="69" cy="26" r="1.4" fill="#2a2a30"/>
      <path d="M61 32 L65 32 L63 35 Z" fill="#ff8fa3"/>
      <g stroke="#2a2a30" stroke-width="1" opacity=".6"><line x1="66" y1="34" x2="82" y2="31"/><line x1="66" y1="36" x2="82" y2="38"/><line x1="60" y1="34" x2="46" y2="31"/><line x1="60" y1="36" x2="46" y2="38"/></g>`,
  },
  love: {
    w: 120, h: 94, navn: 'løve',
    svg: () => `<g class="hale"><path d="M22 52 Q6 50 6 30" stroke="#e8b04a" stroke-width="6" fill="none" stroke-linecap="round"/><circle cx="6" cy="28" r="7" fill="#b5651d"/></g>
      <g fill="#d39a3a"><rect x="28" y="62" width="11" height="30" rx="5"/><rect x="66" y="62" width="11" height="30" rx="5"/></g>
      <ellipse cx="54" cy="58" rx="36" ry="20" fill="#e8b04a"/>
      <g fill="#e8b04a"><rect x="40" y="62" width="11" height="30" rx="5"/><rect x="78" y="62" width="11" height="30" rx="5"/></g>
      ${[0,30,60,90,120,150,180,210,240,270,300,330].map(a => `<circle cx="${(90 + 24 * Math.cos(a * Math.PI / 180)).toFixed(1)}" cy="${(38 + 24 * Math.sin(a * Math.PI / 180)).toFixed(1)}" r="10" fill="#b5651d"/>`).join('')}
      <circle cx="90" cy="38" r="24" fill="#b5651d"/>
      <circle cx="90" cy="40" r="17" fill="#f2c46a"/>
      <circle cx="78" cy="24" r="5" fill="#f2c46a"/><circle cx="102" cy="24" r="5" fill="#f2c46a"/>
      ${OYE(84, 37)}${OYE(97, 37)}
      <ellipse cx="91" cy="47" rx="7" ry="5" fill="#fbe2a8"/><path d="M87 44 L95 44 L91 49 Z" fill="#8b4a2b"/>`,
  },
  tiger: {
    w: 124, h: 86, navn: 'tiger',
    svg: () => `<g class="hale"><path d="M20 48 Q4 44 8 22" stroke="#f5902e" stroke-width="7" fill="none" stroke-linecap="round"/><path d="M6 32 l6 1 M7 26 l6 1" stroke="#2a2a30" stroke-width="3"/></g>
      <g fill="#e07a20"><rect x="26" y="56" width="11" height="28" rx="5"/><rect x="64" y="56" width="11" height="28" rx="5"/></g>
      <ellipse cx="54" cy="52" rx="37" ry="19" fill="#f5902e"/>
      <ellipse cx="56" cy="62" rx="26" ry="8" fill="#fff3e0"/>
      <g stroke="#2a2a30" stroke-width="4" stroke-linecap="round" fill="none"><path d="M34 36 q3 8 -1 14"/><path d="M46 34 q3 9 -1 16"/><path d="M58 34 q3 9 -1 16"/><path d="M70 36 q3 8 -1 14"/></g>
      <g fill="#f5902e"><rect x="38" y="56" width="11" height="28" rx="5"/><rect x="76" y="56" width="11" height="28" rx="5"/></g>
      <circle cx="84" cy="22" r="7" fill="#f5902e"/><circle cx="84" cy="22" r="3.5" fill="#fff"/><circle cx="108" cy="22" r="7" fill="#f5902e"/><circle cx="108" cy="22" r="3.5" fill="#fff"/>
      <circle cx="96" cy="36" r="19" fill="#f5902e"/>
      <ellipse cx="96" cy="45" rx="12" ry="8" fill="#fff3e0"/>
      <g stroke="#2a2a30" stroke-width="3" stroke-linecap="round"><line x1="96" y1="18" x2="96" y2="25"/><line x1="90" y1="20" x2="91" y2="26"/><line x1="102" y1="20" x2="101" y2="26"/></g>
      ${OYE(89, 33)}${OYE(103, 33)}
      <path d="M92 41 L100 41 L96 45 Z" fill="#ff8fa3"/>`,
  },
  koala: {
    w: 80, h: 86, navn: 'koala',
    svg: () => `<ellipse cx="40" cy="62" rx="25" ry="23" fill="#9aa3ae"/>
      <ellipse cx="40" cy="66" rx="14" ry="15" fill="#dfe3e8"/>
      <g fill="#8a939e"><ellipse cx="24" cy="82" rx="9" ry="5"/><ellipse cx="56" cy="82" rx="9" ry="5"/><ellipse cx="18" cy="58" rx="6" ry="11"/><ellipse cx="62" cy="58" rx="6" ry="11"/></g>
      <circle cx="18" cy="18" r="14" fill="#9aa3ae"/><circle cx="18" cy="18" r="8" fill="#f2f4f7"/>
      <circle cx="62" cy="18" r="14" fill="#9aa3ae"/><circle cx="62" cy="18" r="8" fill="#f2f4f7"/>
      <circle cx="40" cy="30" r="22" fill="#9aa3ae"/>
      ${OYE(31, 27)}${OYE(49, 27)}
      <ellipse cx="40" cy="36" rx="7" ry="9" fill="#2a2a30"/><ellipse cx="38" cy="32" rx="2" ry="3" fill="#fff" opacity=".4"/>`,
  },
  sjiraff: {
    w: 104, h: 196, navn: 'sjiraff',
    svg: () => `<g class="hale" style="transform-origin:100% 0%"><path d="M12 116 Q4 128 6 144" stroke="#d9a42e" stroke-width="3" fill="none"/><circle cx="6" cy="146" r="4" fill="#8b5a2b"/></g>
      <g fill="#e0ad35"><rect x="18" y="128" width="9" height="66" rx="4"/><rect x="50" y="128" width="9" height="66" rx="4"/></g>
      <ellipse cx="40" cy="120" rx="32" ry="20" fill="#f5c242"/>
      <g fill="#f5c242"><rect x="28" y="128" width="9" height="66" rx="4"/><rect x="60" y="128" width="9" height="66" rx="4"/></g>
      <path d="M52 112 L74 30 L90 34 L70 118 Z" fill="#f5c242"/>
      <g fill="#b5651d"><rect x="20" y="108" width="12" height="10" rx="4"/><rect x="38" y="114" width="12" height="9" rx="4"/><rect x="52" y="104" width="10" height="10" rx="4"/><rect x="66" y="78" width="9" height="10" rx="4"/><rect x="72" y="54" width="8" height="10" rx="4"/><rect x="62" y="98" width="8" height="8" rx="3"/></g>
      <rect x="76" y="2" width="5" height="16" rx="2" fill="#b5651d"/><rect x="88" y="2" width="5" height="16" rx="2" fill="#b5651d"/>
      <circle cx="78" cy="3" r="4" fill="#8b5a2b"/><circle cx="90" cy="3" r="4" fill="#8b5a2b"/>
      <ellipse cx="88" cy="26" rx="17" ry="12" fill="#f5c242"/>
      <ellipse cx="100" cy="30" rx="8" ry="7" fill="#f2d68a"/>
      <path d="M72 16 l-10 -4 l6 10 Z" fill="#f5c242"/>
      ${OYE(86, 22)}<circle cx="102" cy="28" r="1.6" fill="#2a2a30"/>`,
  },
};
const DYR_NAVN = Object.keys(DYR);
