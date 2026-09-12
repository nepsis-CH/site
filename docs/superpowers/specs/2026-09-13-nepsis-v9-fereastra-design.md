# v9 — „Fereastra"

Plan de design pentru a noua versiune a site-ului Nepsis Elveția.
Pagini și structură de text: neschimbate față de v8.

## Ideea centrală

**Suntem aceeași poveste ca ocrotitorul nostru.** Sfântul Ioan Casian a plecat din Dobrogea
în Apus și a întemeiat acolo monahismul occidental — exact situația unor tineri români în
Elveția. Site-ul spune asta prin două reguli, nu prin cuvinte:

1. **Suprafața paginii e întotdeauna lumină.** Întunericul există numai înăuntrul fotografiilor.
   Nicio secțiune închisă, niciun voal, niciun duoton, nicăieri.
2. **Roșul marchează exclusiv timpul și acțiunea.** Datele, vremea în care ne aflăm, butoanele.
   Negrul e vorbirea, albul e pagina. Regula vine din rubricile cărților de slujbă.

A doua regulă e cea care nu poate fi mutată pe un site de spa: roșul de pe pagină marchează
literal timpul Bisericii.

## Provenință

Sinteză între două direcții din dezbaterea celor 17 agenți:
- **Fereastra** dă șasiul: suprafețe numai luminoase, arcul ca singură abatere de la dreptunghi,
  o fotografie mare în loc de multe mici.
- **Roata** dă sufletul: regula rubricii (roșul = timpul), anul liturgic ca logică de organizare.
  Obiectul-roată se abandonează complet.

Motivul alegerii: Fereastra e singura care supraviețuiește faptelor măsurate de critici
(fotografii late, telefon, mentenanță); Roata e singura care trece testul spa. Niciuna singură
nu ajunge.

## Ce nu facem, și de ce

- **Fără roată.** Felii de tort ca ținte de atins, răspuns în afara ecranului pe telefon, iar
  banda „aceeași sărbătoare, alți ani" ar randa azi un GIF din 2020 lângă un screenshot.
- **Crucea nu se rupe și nu se regularizează niciodată.** În `logo-small.jpg` verticala e coada
  literei P, dominantă peste diagonale, tăiată inegal. E monogram-cruce, nu fulg de nea cu șase
  raze egale. Nu se folosește ciuntită ca glumă pe 404.
- **Icoana nu se decupează niciodată.** `iconita-sf-Casian-fata.jpg` are numele inscripționat în
  colțurile de sus („SF. IOAN" / „CUV. CASIAN"). Un arc ar tăia exact acele colțuri. Icoana stă
  dreptunghiulară, la proporțiile ei. Arcul de pe `/ocrotitorul/` se pune pe o fotografie de la
  hram, nu pe icoană.
- **Fotografiile de grup nu se taie niciodată.** Rămân late. `2022_hram.JPG` are 30+ oameni de
  la o margine la alta; la 1:1 pierde 44% din lățime, la 3:4 pierde 58%.
- **Banda care se derulează singură (GalleryMarquee) dispare.** E mișcare pe care n-a cerut-o
  nimeni, iar bugetul de mișcare se cheltuie integral în deschidere.

## Paletă

| Valoare | Nume | Rol |
|---|---|---|
| `#FFFFFF` | lumina | Suprafața principală. Alb pur, nu crem — un ecran emite. |
| `#F7F9FB` | lumina de zi | Alb abia răcit spre albastru: antet, subsol, banda Mitropoliei. Rece deliberat, ca să nu poată aluneca în bej. |
| `#FCF6F3` | lumina de seară | Alb cu suflu roz (nuanța vine din roșu, nu din ocru). Exclusiv banda „Următorul eveniment". |
| `#B01E16` | candela | Singurul roșu. Cinabru adânc: citește ca cerneală de rubrică, nu ca semnal de alertă, dar rămâne în familia steagului. Contrast pe alb ≈ 6,5:1. |
| `#000000` | cerneala | Negru adevărat. Sigla e desenată cu tuș; un negru virat (#0B0B0B) ar fi vocea unui șablon. |
| `#6B6560` | umbra | Text secundar. Gri cald, înclinat spre roșu — nu gri mediu neutru. |

Regulă verificabilă cu ochiul: **în corpul paginii e vizibil un singur element roșu odată**,
iar în antet și în subsol nu există roșu deloc.

## Tipografie

Două familii, ambele găzduite local (fără fetch extern — păstrăm decizia de Lighthouse),
subset latin + latin-ext pentru ă â î ș ț plus franceză și germană.

- **Newsreader** (variabilă, 300–600, cu italic real) — titluri și proză de accent.
  Doi agenți independenți au ales-o pentru același motiv: italicul ei e caligrafic, cu
  terminații trase, singurul comportament tipografic care rimează cu sigla desenată de mână.
  Fiind variabilă, titlul de 64px și rândul de 22px vin din același fișier.
- **Instrument Sans** — text curent, etichete, interfață.

**Titlurile stau în greutate 300, niciodată bold.** Ușurința e tonul; gravitatea ar veni din
bold și ar face site-ul solemn. Aceasta e mecanica anti-solemnitate a întregului sistem.

Scară: 64 / 44 / 30 / 22 / 17 / 14 / 13 px. Proză la maximum 62 de caractere pe rând.

**Decizie de confirmat:** asta înlocuiește Cardo + Inter. La v6 ai spus că fontul Cardo rămâne.
Dacă vrei să rămână, spune — dar atunci pierdem argumentul caligrafic.

## Arcul — unde se cheltuie îndrăzneala

O singură formă pe tot site-ul: semicerc sus, drept jos — fereastra de biserică. Se obține prin
decupaj, nu prin desen: `border-radius` pe colțurile de sus, 4px jos, `overflow: hidden`,
`aspect-ratio` 3/4 pe desktop și 4/5 pe mobil.

Costă o linie de CSS și de aceea funcționează identic pe telefon și pe laptop — spre deosebire
de axul vertical sau de roată, care se evaporau sub 768px.

**Apare exact o dată pe pagină.** Nicăieri altundeva nu există colțuri rotunde mari, carduri,
umbre sau chenare decorative. Tot restul e dreptunghi tăiat drept, linie de 1px și alb.

Excepția, care e o regulă: **arcul e forma fotografiilor de locuri și adunări; cercul e forma
chipurilor.** Portretele din `/echipa/` rămân rotunde, cum ai cerut. Un medalion de portret și
o fereastră sunt două lucruri diferite, și distincția asta poartă sens.

## Momentul de deschidere — „se face lumină în fereastră"

Unul singur, pe toată durata vizitei, numai pe prima pagină. Fără JavaScript, fără
`sessionStorage`, fără bibliotecă.

La încărcare **tot layout-ul e deja la locul lui, la opacitate 1**: titlul, subtitlul, butoanele,
meniul. Nimic nu urcă, nimic nu apare. Asta răspunde direct criticii că o coregrafie se consumă
pe dreptunghiuri goale cât se decodează pozele pe 4G — aici nu se ascunde niciodată conținut ca
să fie animat.

Singurul lucru care se întâmplă: arcul e acoperit complet de albul propriu al paginii, iar albul
se retrage în jos și iese din cadru, cu marginea difuză, ca și cum lumina ar intra pe fereastră
de sus.

```
pseudo-element în interiorul arcului
background: linear-gradient(to bottom, rgba(255,255,255,0) 0%, #fff 35%, #fff 100%)
height: 260%
transform: translateY(-38%) → translateY(120%)
1100ms cubic-bezier(0.2, 0.75, 0.25, 1)
```

Sub `prefers-reduced-motion: reduce` voalul pur și simplu nu există; fotografia e acolo din
primul cadru.

## Butoane

Trei ranguri. Niciunul pastilă, niciunul cu săgeată, niciunul cu gradient sau umbră. Text în
propoziție, verb plus obiect: „Vino la hram", „Scrie-ne", „Abonează-te".

1. **Candela** (acțiunea principală, cel mult una pe pagină): dreptunghi plin `#B01E16`,
   rază 3px, padding 10/18px, text alb Instrument Sans 14px.
   La hover **nu se închide la culoare — se aprinde**: `box-shadow: 0 0 0 7px rgba(176,30,22,.09)`,
   un halou care se scurge în albul din jur, 140ms. La `:active` haloul se strânge la 4px.
2. **Secundar**: text negru cu o linie roșie de 1px dedesubt, la 6px sub linia de bază.
   La hover linia se îngroașă la 2px. Fără casetă.
3. **Terțiar / navigație**: text simplu subliniat.

Focus vizibil: contur 2px `#B01E16` la 2px distanță, pe toate trei.

## Homepage, secțiune cu secțiune

| # | Secțiune | Laptop | Telefon |
|---|---|---|---|
| 1 | **Fereastra** | Coloana stângă: monogram-crucea 40px, `h1` Newsreader 300 la 64px, subtitlul, rubrica roșie („Acum: vremea colindelor"), două acțiuni. Dreapta: arcul cu prima fotografie a celei mai noi amintiri. | **Arcul primul**, pe toată lățimea; textul dedesubt. Primul ecran trebuie să conțină chipuri de oameni — e argumentul de trei secunde. |
| 2 | **Următorul eveniment** | Bandă `#FCF6F3`. Data în coloana stângă, Newsreader 300 la 44px, roșie. Titlul, locul, textul scurt, candela. | Data deasupra titlului, aceeași bandă. |
| 3 | **Lumina de afară** | Șase fotografii la proporțiile lor reale, mărimi inegale, decalaje verticale, pe alb pur. Fără decupare, fără card, fără umbră. | Două coloane, aceleași proporții reale. |
| 4 | **Cine suntem** | O coloană de 62 de caractere, aliniată stânga. Deasupra prozei, intervalul 14–35 ca rubrică roșie. | Identic. |
| 5 | **Sub omoforul Mitropoliei** | `#F7F9FB`. Stema colorată la 72px, fraza alături în Newsreader 300 la 22px. Fără roșu. | Stema deasupra, fraza dedesubt. |
| 6 | **Subsol** | `#F7F9FB`. Sigla întreagă la 80px, trei coloane. Zero roșu, zero rotunjiri, zero umbre. | O coloană. |

Fereastra ia automat prima fotografie a celei mai noi amintiri — exact imaginea pe care editorul
o alege oricum drept copertă. Se schimbă singură pe măsură ce frăția trăiește.

## Celelalte pagini

- **`/evenimente/`** — rânduri în stil Sana: data în coloana stângă (roșie), titlul și locul în
  dreapta, linie de 1px între rânduri, niciun card. Evenimentul viitor primește banda `#FCF6F3`
  și arcul paginii pe fotografia lui. Lista e tăiată de titlurile vremilor anului; vremea curentă
  are titlul roșu.
- **`/amintiri/`** — anul, cifră mare în Newsreader 300, lipit în marginea din stânga cât derulezi
  amintirile lui. Intrările sunt rânduri fotografie + text, la proporțiile reale ale fotografiei.
- **`/amintiri/<slug>/`** — titlu, dată, proză la 62 de caractere, apoi fotografiile la
  proporțiile lor, netratate. Arcul se cheltuie pe copertă.
- **`/echipa/`** — portrete rotunde (neschimbat), rubrica roșie sub nume pentru rol.
- **`/ocrotitorul/`** — icoana dreptunghiulară, netăiată, la proporțiile ei, cu chenar de 1px.
  Arcul paginii se pune pe o fotografie de la hram. Aici stă și textul despre Casian ca om care
  a plecat în Apus — teza site-ului, spusă o dată, explicit.
- **`/psaltica/`, `/contact/`, `/devino-membru/`, `/newsletter/`, `404`** — același sistem;
  arcul o dată pe pagină sau deloc.

## Ordinea de implementare

1. **Jetoanele și tipografia** — paletă, fonturi, scară, regula roșului. Schimbă tot tonul
   site-ului într-un singur commit, fără să atingă nicio structură.
2. **Arcul și fereastra de pe prima pagină**, cu momentul de deschidere. A doua cea mai mare
   schimbare de impresie.
3. **Butoanele**, în toate cele trei ranguri, peste tot.
4. **Rubrica timpului** — rândul „acum, vremea…" în antet și pe prima pagină; vremile pe
   `/evenimente/`.
5. **Fotografiile la proporțiile reale** — scoaterea decupărilor din amintiri și din „Lumina
   de afară"; dispariția benzii rulante.
6. **Restul paginilor**, pe rând.

## Riscuri rămase

| Risc | Cum îl ținem în frâu |
|---|---|
| Newsreader + Instrument Sans înlocuiesc Cardo + Inter, iar Cardo fusese declarat constant. | Decizie explicită a utilizatorului înainte de pasul 1. Dacă Cardo rămâne, pierdem argumentul caligrafic dar sistemul stă în picioare. |
| Colajul `nepsis-elvetia.jpg` iese din hero. E imaginea care a plăcut la v8. | Rămâne ca `og:image`, unde chiar lucrează. Dacă lipsa lui doare, se poate întoarce în „Lumina de afară". |
| 42 de fotografii pentru opt ani — secțiunea de șase imagini va repeta în timp. | Se alimentează din amintirile cele mai recente, deci se reînnoiește singură pe măsură ce se adaugă conținut. Sub șase amintiri cu poze, secțiunea afișează câte are. |
