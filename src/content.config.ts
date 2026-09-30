import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const langSchema = z.enum(['ro', 'fr', 'en', 'de', 'it']).default('ro');

/**
 * Evenimente (viitoare și trecute). Un fișier .md = un eveniment.
 * Cele cu `date` în viitor apar automat la „Urmează”; restul trec singure la „Trecute”.
 */
const evenimente = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: './src/content/evenimente' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    /*
      Pune `false` când se știe doar luna, nu și ziua: data rămâne folosită la
      sortare, dar se afișează „noiembrie 2026”, nu o zi anume, aleasă de noi.
    */
    showDay: z.boolean().default(true),
    location: z.string().optional(),
    image: z.string().optional(),
    imageAlt: z.string().optional(),
    registrationLink: z.string().url().optional(),
    lang: langSchema,
    translationKey: z.string(),
  }),
});

/**
 * Amintiri: retrospective ale evenimentelor, grupate automat pe ani.
 */
const amintiri = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: './src/content/amintiri' }),
  schema: z.object({
    title: z.string(),
    year: z.number().int(),
    // Data exactă (dacă e cunoscută) — folosită la sortarea în cadrul anului.
    date: z.coerce.date().optional(),
    // Pune `false` când data e doar aproximativă (folosită numai la sortare, nu se afișează).
    showDate: z.boolean().default(true),
    // Pentru amintirile fără dată exactă: mai mare = mai sus în listă.
    order: z.number().default(0),
    images: z
      .array(z.object({ src: z.string(), alt: z.string() }))
      .default([]),
    lang: langSchema,
    translationKey: z.string(),
  }),
});

/**
 * Conținutul paginilor statice, pe limbi: pagini/ro/*.md, pagini/fr/*.md etc.
 */
const pagini = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: './src/content/pagini' }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
  }),
});

/**
 * Membrii Nepsis Elveția. Un fișier .md = o persoană.
 */
const membri = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: './src/content/membri' }),
  schema: z.object({
    name: z.string(),
    // `responsabil` e părintele care răspunde de frăție la nivel de țară; ceilalți
    // sunt legați de o parohie anume. La alumni rolul e opțional: pentru cei mai
    // mulți contează doar parohia din care au venit.
    role: z.enum(['responsabil', 'presedinte', 'consiliu', 'coordonator', 'webadmin', 'diacon']).optional(),
    /*
      Secțiunea din pagina Echipa. Ordinea de afișare e fixată în pagină, nu aici:
      coordonatorii, apoi responsabilul, apoi foștii coordonatori.
    */
    group: z.enum(['coordonatori', 'responsabil', 'alumni']).default('coordonatori'),
    // Opțională: nu pentru toți e stabilită încă parohia.
    parish: z.string().optional(),
    photo: z.string().optional(),
    // Poziția în listă: mai mic = mai în față.
    order: z.number().default(99),
  }),
});

export const collections = { evenimente, amintiri, pagini, membri };
