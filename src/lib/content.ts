import { getCollection, getEntry, render, type CollectionEntry } from 'astro:content';
import { defaultLocale, type Locale } from '../i18n';

/**
 * Alege, pentru fiecare `translationKey`, varianta în limba cerută;
 * dacă nu există traducere, cade pe română (fallback).
 */
function pickByLocale<T extends { data: { lang: Locale; translationKey: string } }>(
  entries: T[],
  locale: Locale
): T[] {
  const byKey = new Map<string, T[]>();
  for (const entry of entries) {
    const group = byKey.get(entry.data.translationKey) ?? [];
    group.push(entry);
    byKey.set(entry.data.translationKey, group);
  }
  const picked: T[] = [];
  for (const group of byKey.values()) {
    const found =
      group.find((e) => e.data.lang === locale) ??
      group.find((e) => e.data.lang === defaultLocale) ??
      group[0];
    if (found) picked.push(found);
  }
  return picked;
}

/** Toate evenimentele în limba cerută (cu fallback pe română). */
export async function getEvents(locale: Locale): Promise<CollectionEntry<'evenimente'>[]> {
  const all = await getCollection('evenimente');
  return pickByLocale(all, locale);
}

/**
 * Împarte evenimentele automat: cele de azi încolo la „Urmează” (crescător),
 * restul la „Trecute” (descrescător). Nimeni nu mută nimic manual.
 */
export function splitEvents(events: CollectionEntry<'evenimente'>[], now = new Date()) {
  const today = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));
  const upcoming = events
    .filter((e) => e.data.date.getTime() >= today.getTime())
    .sort((a, b) => a.data.date.getTime() - b.data.date.getTime());
  const past = events
    .filter((e) => e.data.date.getTime() < today.getTime())
    .sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
  return { upcoming, past };
}

/** Amintirile în limba cerută, grupate pe ani (anii cei mai noi primii). */
export async function getMemoriesByYear(locale: Locale) {
  const all = await getCollection('amintiri');
  const picked = pickByLocale(all, locale);
  const byYear = new Map<number, CollectionEntry<'amintiri'>[]>();
  for (const entry of picked) {
    const group = byYear.get(entry.data.year) ?? [];
    group.push(entry);
    byYear.set(entry.data.year, group);
  }
  const sortKey = (e: CollectionEntry<'amintiri'>) =>
    e.data.date ? e.data.date.getTime() : e.data.order;
  return [...byYear.entries()]
    .sort(([a], [b]) => b - a)
    .map(([year, entries]) => ({
      year,
      entries: entries.sort((a, b) => sortKey(b) - sortKey(a)),
    }));
}

/** Conținutul unei pagini statice în limba cerută, cu fallback pe română. */
export async function getPage(id: string, locale: Locale) {
  const entry =
    (await getEntry('pagini', `${locale}/${id}`)) ?? (await getEntry('pagini', `${defaultLocale}/${id}`));
  if (!entry) throw new Error(`Pagina „${id}” nu există în src/content/pagini/`);
  const { Content } = await render(entry);
  return { entry, Content };
}

/** Membrii, în ordinea din frontmatter. */
export async function getMembers() {
  const all = await getCollection('membri');
  return all.sort((a, b) => a.data.order - b.data.order);
}
