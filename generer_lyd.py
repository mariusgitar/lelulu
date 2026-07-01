import asyncio
import os
import edge_tts

STEMME = "nb-NO-PernilleNeural"
RATE   = "-12%"  # litt langsommere enn standard, bra for barn

async def generer(tekst, filsti):
    os.makedirs(os.path.dirname(filsti), exist_ok=True)
    communicate = edge_tts.Communicate(tekst, STEMME, rate=RATE)
    await communicate.save(filsti)
    print(f"✓ {filsti}")

# ─────────────────────────────────────────────
#  FELLES FRASER (brukes av begge spill)
# ─────────────────────────────────────────────

FRASER = {
    # Dyredetektiven
    "velkomst":         "Hei! Jeg heter Dyredetektiven. Hvor gammel kan dyrene omtrent bli? Trykk på den gule knappen for å starte spillet!",
    "idle_start":       "Trykk på den gule knappen for å starte!",
    "respons_riktig_1": "Ja, det stemmer!",
    "respons_riktig_2": "Bra gjetta!",
    "respons_riktig_3": "Helt riktig!",
    "respons_naer":     "Nesten! Du var ganske nær!",
    "respons_feil":     "Ikke helt, men du prøvde!",
    "visste_du_at":     "Visste du at...",
    "slutt_perfekt":    "Du er en ekte dyreekspert!",
    "slutt_bra":        "Du kan mye om dyr! Øv litt til for å bli ekspert!",
    "slutt_ok":         "Bra innsats! Spill igjen og lær enda mer!",
    "slutt_prov":       "Spill igjen og du lærer masse nytt om dyr!",

    # Vann-labben
    "vl_finn_flyter":   "Dra alle tingene som flyter, opp i bassenget!",
    "vl_finn_synker":   "Nå: dra alle tingene som synker, ned i bassenget!",
    "vl_riktig_flyter": "Riktig, den flyter!",
    "vl_riktig_synker": "Riktig, den synker!",
    "vl_feil_flyter":   "Se, den flyter faktisk! Men vi leter etter de som synker akkurat nå.",
    "vl_feil_synker":   "Se, den synker faktisk! Men vi leter etter de som flyter akkurat nå.",
    "vl_runde_neste":   "Bra jobbet! Nå tester vi noe nytt.",
    "vl_ferdig":        "Du har testet alt! Du er en ekte vann-forsker!",
}

# ─────────────────────────────────────────────
#  DYREDETEKTIVEN — spørsmål per dyr
# ─────────────────────────────────────────────

DYR = [
    ("hund",       "Hund"),
    ("katt",       "Katt"),
    ("hest",       "Hest"),
    ("kamel",      "Kamel"),
    ("elefant",    "Elefant"),
    ("skilpadde",  "Skilpadde"),
    ("papegoye",   "Papegøye"),
    ("gullfisk",   "Gullfisk"),
    ("pingvin",    "Pingvin"),
    ("love",       "Løve"),
    ("isbjorn",    "Isbjørn"),
    ("gorilla",    "Gorilla"),
    ("delfin",     "Delfin"),
    ("sjiraff",    "Sjiraff"),
    ("krokodille", "Krokodille"),
    ("orn",        "Ørn"),
    ("kanin",      "Kanin"),
    ("hamster",    "Hamster"),
    ("ku",         "Ku"),
    ("gris",       "Gris"),
    ("ugle",       "Ugle"),
    ("rev",        "Rev"),
    ("bjorn",      "Bjørn"),
    ("koala",      "Koala"),
    ("hval",       "Hval"),
    ("blekksprut", "Blekksprut"),
    ("sommerfugl", "Sommerfugl"),
    ("hai",        "Hai"),
    ("sebra",      "Sebra"),
    ("neshorn",    "Neshorn"),
    ("flodhest",   "Flodhest"),
]

FAKTA = {
    "hund":       "Hunder sover nesten halvparten av dagen!",
    "katt":       "Katter kan pure i timevis!",
    "hest":       "Hester sover stående!",
    "kamel":      "Kameler lagrer fett i pukkelene, ikke vann!",
    "elefant":    "Elefanter husker steder de besøkte for mange år siden!",
    "skilpadde":  "Noen skilpadder er eldre enn oldeforeldrene dine!",
    "papegoye":   "Papegøyer kan lære hundrevis av ord!",
    "gullfisk":   "Gullfisker husker faktisk mer enn 3 sekunder!",
    "pingvin":    "Pingviner er superflinke til å svømme men kan ikke fly!",
    "love":       "Løvinner jakter mest maten i flokken!",
    "isbjorn":    "Isbjørner kan lukte mat på 30 kilometers avstand!",
    "gorilla":    "Gorillaer lager nye senger av blader hver natt!",
    "delfin":     "Delfiner sover med ett øye åpent!",
    "sjiraff":    "Sjiraffer sover bare 30 minutter om dagen!",
    "krokodille": "Krokodiller har nesten ikke forandret seg på 200 millioner år!",
    "orn":        "Ørner kan se fisk langt nede i vannet fra høyt oppe i lufta!",
    "kanin":      "Kaniner tygger over 100 ganger i minuttet!",
    "hamster":    "Hamstere kan ha mat i kinnene til de kommer hjem!",
    "ku":         "Kuer har beste venner og blir lei seg når de skilles!",
    "gris":       "Griser er like smarte som hunder!",
    "ugle":       "Ugler kan fly nesten helt lydløst!",
    "rev":        "Rever bruker halen som teppe når det er kaldt!",
    "bjorn":      "Bjørner kan lukte mat veldig langt unna!",
    "koala":      "Koalaer sover ofte opptil 20 timer i døgnet!",
    "hval":       "Noen hvaler synger lange sanger under vann!",
    "blekksprut": "Blekkspruter har tre hjerter!",
    "sommerfugl": "Sommerfugler smaker med føttene!",
    "hai":        "Haier har eksistert lenger enn dinosaurene!",
    "sebra":      "Ingen sebraer har helt like striper!",
    "neshorn":    "Neshorn har horn som er laget av det samme stoffet som negler!",
    "flodhest":   "Flodhester kan løpe overraskende fort på land!",
}

# ─────────────────────────────────────────────
#  VANN-LABBEN — forklaringer per ting
# ─────────────────────────────────────────────

TING_FORKLARING = {
    "ball":   "Ballen er full av luft, og luft er lett! Derfor flyter den.",
    "stein":  "Steinen er tung og tett, så den synker rett til bunns.",
    "eple":   "Epler har litt luft inni seg, så de flyter — prøv det hjemme!",
    "skje":   "Metall er tett og tungt. Skjeen synker fort.",
    "trebit": "Tre er lettere enn vann — derfor flyter båter laget av tre!",
    "mynt":   "Mynten er liten, men veldig tett. Den synker raskt.",
}

# Tall 1–150 (brukes av Dyredetektiven)
TALL = list(range(1, 151))

# ─────────────────────────────────────────────
#  GENERER ALT
# ─────────────────────────────────────────────

async def main():
    oppgaver = []

    # Felles fraser
    for navn, tekst in FRASER.items():
        oppgaver.append(generer(tekst, f"lyd/fraser/{navn}.mp3"))

    # Dyredetektiven — spørsmål og fakta
    for slug, navn in DYR:
        sporsmal = f"Hvor gammel kan en {navn.lower()} omtrent bli?"
        oppgaver.append(generer(sporsmal, f"lyd/dyr/{slug}_sporsmal.mp3"))
        if slug in FAKTA:
            oppgaver.append(generer(FAKTA[slug], f"lyd/fakta/{slug}.mp3"))

    # Tall
    for n in TALL:
        oppgaver.append(generer(f"{n} år", f"lyd/tall/{n}.mp3"))

    # Vann-labben — forklaringer
    for slug, tekst in TING_FORKLARING.items():
        oppgaver.append(generer(tekst, f"lyd/vl/forklaring/{slug}.mp3"))

    # Kjør alt parallelt i bolker på 10 for å ikke overbelaste
    bolk = 10
    for i in range(0, len(oppgaver), bolk):
        await asyncio.gather(*oppgaver[i:i+bolk])

    print(f"\n✅ Ferdig! Totalt {len(oppgaver)} lydfiler generert.")

asyncio.run(main())
