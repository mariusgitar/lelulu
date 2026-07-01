# Lelulu 🌿

Lekeplass for lulu — en PWA-spillapp for barn 3–5 år.

## Kom i gang

```bash
npm install
npm run dev
```

Åpne `http://localhost:5173` i nettleseren.

## Deploy til Vercel

Push til GitHub, koble repo til Vercel, og deploy.  
Build-kommando: `npm run build`  
Output-mappe: `dist`

## Filstruktur

```
lelulu/
├── public/
│   ├── manifest.json        # PWA-manifest
│   ├── ikon-192.png         # App-ikon (lag selv, 192×192)
│   └── ikon-512.png         # App-ikon (lag selv, 512×512)
│
├── src/
│   ├── main.jsx             # Inngangspunkt
│   ├── index.css            # Global reset + Nunito-font
│   ├── App.jsx              # Rotnivå-navigering mellom spill
│   ├── Hjemskjerm.jsx       # Hjemskjerm med spillhylle
│   ├── Hjemskjerm.css
│   │
│   ├── felles/
│   │   ├── Sky.jsx          # Gjenbrukbar himmel-komponent
│   │   ├── sky.css          # Himmel-animasjoner
│   │   └── speak.js         # Tale-hjelpere (Web Speech + mp3-fallback)
│   │
│   └── spill/
│       ├── dyredetektiven/
│       │   ├── Dyredetektiven.jsx
│       │   ├── Dyredetektiven.css
│       │   └── dyr.js       # Dyredata (32 dyr)
│       │
│       ├── vannlabben/
│       │   ├── VannLabben.jsx
│       │   ├── VannLabben.css
│       │   └── ting.js      # Tingdata (6 ting)
│       │
│       ├── mysteriet/       # Tomt – klar til å fylle inn
│       ├── dyreboka/        # Tomt – klar til å fylle inn
│       ├── sorter/          # Tomt – klar til å fylle inn
│       └── dyreminne/       # Tomt – klar til å fylle inn
│
├── index.html
├── vite.config.js
├── package.json
└── .gitignore
```

## Legge til et nytt spill

1. Lag mappe under `src/spill/dittspill/`
2. Lag `DittSpill.jsx` og `DittSpill.css` – bruk `VannLabben` som mal
3. Importer i `src/App.jsx` og legg til en `if`-gren
4. Lås opp kortet i `src/Hjemskjerm.jsx` ved å sette `locked: false`

## Stemme og lyd

Spillet bruker Web Speech API som standard.  
For naturlig norsk stemme (edge-tts):

```bash
pip install edge-tts
# Generer lydfiler til public/lyd/
# Se speak.js for filsti-konvensjoner
```

## PWA-ikoner

Lag to PNG-ikoner og legg i `public/`:
- `ikon-192.png` (192×192)
- `ikon-512.png` (512×512)

Bruk et enkelt emoji-basert design, f.eks. 🌿 på himmelblå bakgrunn.
