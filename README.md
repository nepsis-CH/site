# Site-ul Nepsis Elveția — ch.nepsis.org

Acest ghid este scris pentru cineva care **nu știe programare**. Tot ce ai nevoie este un cont GitHub cu drept de scriere la acest repository și un browser.

**Regula de aur:** site-ul se modifică prin fișiere text simple (`.md`). Fiecare eveniment, amintire sau membru = un fișier. După ce salvezi („Commit”), site-ul se publică singur în ~2 minute.

---

## Cum adaug un eveniment nou

1. Deschide folderul [`src/content/evenimente/`](src/content/evenimente/) pe GitHub.
2. Apasă **Add file → Create new file** (dreapta sus).
3. La numele fișierului scrie data și un nume scurt, fără spații și fără diacritice, de exemplu:
   `2026-09-20-drumetie-grindelwald.md`
4. Lipește șablonul de mai jos și completează-l:

```markdown
---
title: "Drumeție Nepsis la Grindelwald"
date: 2026-09-20
location: "Grindelwald, canton Berna"
image: /img/2026-drumetie-grindelwald.jpg
imageAlt: "Afișul drumeției de la Grindelwald"
registrationLink: https://forms.gle/exemplu
lang: ro
translationKey: drumetie-grindelwald-2026
---

Aici scrii descrierea evenimentului: programul, ce trebuie adus, cine participă.

- Poți face liste așa
- **Litere îngroșate** cu două steluțe
- [Link-uri](https://exemplu.ch) cu paranteze
```

5. Apasă butonul verde **Commit changes** (poți lăsa mesajul propus).

Gata! Evenimentul apare automat pe pagina **Evenimente**, la secțiunea „Urmează". Când data trece, el se mută **singur** la „Evenimente trecute" — nu trebuie să faci nimic.

Observații:

- Liniile `image`, `imageAlt`, `location` și `registrationLink` sunt opționale — dacă nu ai poză sau formular, șterge liniile respective.
- Dacă vrei ca evenimentul să apară și în franceză/engleză/germană, creează încă un fișier (ex. `2026-09-20-drumetie-grindelwald.fr.md`) cu textul tradus, `lang: fr` și **același** `translationKey`. Dacă nu-l traduci, vizitatorii văd automat varianta română.
- Un șablon gata de copiat există și în [`src/content/_templates/eveniment-nou.md`](src/content/_templates/eveniment-nou.md).

## Cum adaug o amintire

La fel ca la evenimente, dar în folderul [`src/content/amintiri/`](src/content/amintiri/):

1. **Add file → Create new file**, cu numele de forma `2026-drumetie-grindelwald.md`.
2. Lipește și completează:

```markdown
---
title: "Drumeție la Grindelwald"
year: 2026
date: 2026-09-20
images:
  - src: /img/2026-drumetie-1.jpg
    alt: "Poză de grup pe traseu"
  - src: /img/2026-drumetie-2.jpg
    alt: "Peisaj cu munții"
lang: ro
translationKey: amintire-2026-drumetie-grindelwald
---

Aici scrii povestea: cum a fost, cine a venit, ce ați trăit împreună.

Un paragraf nou = o linie goală.
```

3. **Commit changes**.

Amintirea apare automat pe pagina **Amintiri**, grupată la anul din câmpul `year` (anii cei mai noi sunt primii). Poți pune oricâte poze în lista `images`. Fiecare amintire primește automat și propria pagină, la adresa `/amintiri/numele-fisierului/` (de ex. `/amintiri/2026-drumetie-grindelwald/`).

## Cum urc o poză

1. Deschide folderul [`public/img/`](public/img/) pe GitHub.
2. Apasă **Add file → Upload files**.
3. Trage poza în fereastră și apasă **Commit changes**.
4. Poza ta e acum disponibilă la calea `/img/numele-pozei.jpg` — exact ce scrii în câmpurile `image:` sau `src:` de mai sus.

Sfaturi:

- Folosește nume simple, fără spații și fără diacritice: `2026-hram-poza-grup.jpg`, nu `Poză de grup (hram).jpg`.
- Pozele de la telefon pot fi mari; dacă poți, micșorează-le înainte (o lățime de ~1600 pixeli e suficientă) ca site-ul să rămână rapid.
- Pozele membrilor merg în `public/img/membri/`.

## Cum modific un text existent

1. Navighează pe GitHub până la fișierul cu textul respectiv:
   - Evenimente → `src/content/evenimente/`
   - Amintiri → `src/content/amintiri/`
   - Textul „Despre Nepsis Elveția", pagina Ocrotitorul, pagina Psaltică → `src/content/pagini/ro/` (traducerile sunt în `fr/`, `en/`, `de/`)
   - Membrii → `src/content/membri/`
2. Deschide fișierul și apasă pe **creionul** din dreapta sus (Edit this file).
3. Modifică textul și apasă **Commit changes**.

Textele de interfață (meniu, butoane, subsol) sunt în `src/i18n/ro.ts` (și `fr.ts`, `en.ts`, `de.ts`) — le poți edita la fel, cu grijă să păstrezi ghilimelele.

## Cum adaug sau modific un membru

Un fișier per persoană în `src/content/membri/`. Copiază șablonul din [`src/content/_templates/membru-nou.md`](src/content/_templates/membru-nou.md). Rolurile posibile: `presedinte`, `consiliu`, `coordonator`, `webadmin`. Dacă persoana nu are poză, șterge linia `photo:` — apare automat o siluetă.

## Cum se publică site-ul

**Fiecare Commit pe ramura `master` publică automat site-ul.** GitHub construiește site-ul (~2 minute) și îl urcă la [ch.nepsis.org](https://ch.nepsis.org). Poți urmări progresul în tab-ul **Actions** al repository-ului: o bulină verde = publicat cu succes.

Dacă ai greșit ceva și site-ul nu se mai publică (bulină roșie în Actions), nu intra în panică: deschide fișierul modificat ultima oară și verifică:

- ghilimelele de la `title:` sunt ambele prezente;
- data are formatul `2026-09-20` (an-lună-zi, cu cratime);
- cele două linii `---` de la începutul fișierului există.

## Pentru cei tehnici

Site-ul e construit cu [Astro 5](https://astro.build), Tailwind CSS 4 și colecții de conținut validate cu Zod (`src/content.config.ts`). Rulare locală:

```bash
npm install
npm run dev      # server local pe http://localhost:4321
npm run build    # build de producție în dist/
```

- Română la rădăcină (`/`), traducerile la `/fr/`, `/en/`, `/de/` — conținutul netradus cade automat pe română (`src/lib/content.ts`).
- Deploy: GitHub Actions (`.github/workflows/deploy.yml`, `withastro/action`) → GitHub Pages. Domeniul e fixat prin `public/CNAME` (DNS-ul sub-domeniului ch.nepsis.org e administrat de colegii din Nepsis France — nu se atinge).
- **Configurare unică la prima publicare:** în Settings → Pages, sursa trebuie schimbată de pe „Deploy from a branch” pe **„GitHub Actions”** (o singură dată, de un administrator al repository-ului).
- Paginile vechi (congres2020, colecta2022 etc.) sunt păstrate ca atare în `public/`, iar vechile URL-uri `.html` au redirecturi tot în `public/`.
