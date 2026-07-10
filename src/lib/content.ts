import { getCollection, getEntry, render, type CollectionEntry } from 'astro:content';
import { defaultLocale, type Locale } from '../i18n';

type Translatable = { data: { lang: Locale; translationKey: string } };

/** Grupează intrările după `translationKey` (o traducere per limbă). */
export function groupByTranslationKey<T extends Translatable>(entries: T[]): Map<string, T[]> {
  const byKey = new Map<string, T[]>();
  for (const entry of entries) {
    const group = byKey.get(entry.data.translationKey) ?? [];
    group.push(entry);
    byKey.set(entry.data.translationKey, group);
  }
  return byKey;
}

/** Varianta canonică (românească) a unui grup de traduceri. */
export function canonicalOf<T extends Translatable>(group: T[]): T {
  return group.find((e) => e.data.lang === defaultLocale) ?? group[0]!;
}

/** Varianta în limba cerută, cu fallback pe română. */
export function localizedOf<T extends Translatable>(group: T[], locale: Locale): T {
  return group.find((e) => e.data.lang === locale) ?? canonicalOf(group);
}

/**
 * Alege, pentru fiecare `translationKey`, varianta în limba cerută;
 * dacă nu există traducere, cade pe română (fallback).
 */
function pickByLocale<T extends Translatable>(entries: T[], locale: Locale): T[] {
  return [...groupByTranslationKey(entries).values()].map((group) => localizedOf(group, locale));
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

export type MemoryWithSlug = {
  memory: CollectionEntry<'amintiri'>;
  /** Slug-ul paginii proprii (/amintiri/<slug>/) — identic în toate limbile. */
  slug: string;
};

/** Amintirile în limba cerută, grupate pe ani (anii cei mai noi primii), cu slug-ul paginii proprii. */
export async function getMemoriesByYear(locale: Locale) {
  const all = await getCollection('amintiri');
  const withSlugs: MemoryWithSlug[] = [...groupByTranslationKey(all).values()].map((group) => ({
    memory: localizedOf(group, locale),
    slug: canonicalOf(group).id,
  }));
  const byYear = new Map<number, MemoryWithSlug[]>();
  for (const item of withSlugs) {
    const group = byYear.get(item.memory.data.year) ?? [];
    group.push(item);
    byYear.set(item.memory.data.year, group);
  }
  const sortKey = (e: CollectionEntry<'amintiri'>) =>
    e.data.date ? e.data.date.getTime() : e.data.order;
  return [...byYear.entries()]
    .sort(([a], [b]) => b - a)
    .map(([year, entries]) => ({
      year,
      entries: entries.sort((a, b) => sortKey(b.memory) - sortKey(a.memory)),
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
