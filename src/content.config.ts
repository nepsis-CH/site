import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const langSchema = z.enum(['ro', 'fr', 'en', 'de']).default('ro');

/**
 * Evenimente (viitoare și trecute). Un fișier .md = un eveniment.
 * Cele cu `date` în viitor apar automat la „Urmează”; restul trec singure la „Trecute”.
 */
const evenimente = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: './src/content/evenimente' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
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
    role: z.enum(['presedinte', 'consiliu', 'coordonator', 'webadmin']),
    parish: z.string(),
    photo: z.string().optional(),
    // Poziția în listă: mai mic = mai în față.
    order: z.number().default(99),
  }),
});

export const collections = { evenimente, amintiri, pagini, membri };
