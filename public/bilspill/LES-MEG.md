# Bilspill

Miniapp med sju moduler: bilfabrikk, bilvask, verksted, lakkering, kjøretur, byggeplass og bensinstasjon.
Ren HTML/JS, ingen byggesteg, ingen eksterne filer eller lydfiler.

## Struktur

```
index.html            hovedmeny + lasting av moduler
felles/kjoretoy.js    ALLE kjøretøydesign, bilfabrikkens deler og «min bil»
felles/lyd.js         felles lyd: tone, motorlyd, signaler per kjøretøy (LYDER), dyrelyder
felles/dyr.js         dyrene (hund, katt, løve, tiger, koala, sjiraff)
moduler/<id>.js       én fil per modul (fabrikk, vask, verksted, lakk, kjoretur, bygg, bensin)
moduler/katalog.js    oversikt over alle design (åpnes med #katalog)
```

- Endre et kjøretøy: `felles/kjoretoy.js`. Det slår ut i alle moduler.
- Se alle design samlet: `index.html#katalog` (viser 400×200-rammen, bakken og ankerpunktene).
- Navigasjon: `#vask`, `#verksted` osv. Siden lastes på nytt ved hvert bytte, så hver modul starter rent.
- «Min bil» lagres i `localStorage` (`bilspill.minBil.valg`, `.lakk`, `.merker`) og dukker opp i vask, verksted, lakk, bensinstasjon og kjøretur. Lakk og klistremerker følger med; bytte av karosseri eller hjul i fabrikken nullstiller lakken.

## Inn i Lelulu (React + Vite)

1. Kopier mappen til `public/bilspill/`.
2. Lag en flis i Lelulu som navigerer til `/bilspill/index.html?retur=/`
   (`retur` gir en hjem-knapp i bilspill-menyen som går tilbake til Lelulu).
3. Alternativt: vis den i en fullskjerms `<iframe src="/bilspill/index.html">`.
