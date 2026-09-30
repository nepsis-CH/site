import { getCollection, render, type CollectionEntry } from 'astro:content';
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
  const page = await getOptionalPage(id, locale);
  if (!page) throw new Error(`Pagina „${id}” nu există în src/content/pagini/`);
  return page;
}

/** Ca `getPage`, dar întoarce `null` dacă pagina nu există (ex. calendarul anual). */
export async function getOptionalPage(id: string, locale: Locale) {
  const all = await getCollection('pagini');
  const entry =
    all.find((e) => e.id === `${locale}/${id}`) ?? all.find((e) => e.id === `${defaultLocale}/${id}`);
  if (!entry) return null;
  const { Content } = await render(entry);
  return { entry, Content };
}

/** Membrii, în ordinea din frontmatter. */
export async function getMembers() {
  const all = await getCollection('membri');
  return all.sort((a, b) => a.data.order - b.data.order);
}

/**
 * Primele rânduri din textul unei amintiri, curățate de marcajele Markdown, ca să
 * încapă în rezumatul de două rânduri de pe pagina de amintiri.
 */
export function rezumatText(body: string | undefined, limita = 220): string {
  return (body ?? '')
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ') // imagini
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1') // legături: păstrăm doar textul
    .replace(/<[^>]+>/g, ' ')
    .replace(/[#*_>`]/g, ' ')
    .split('\n')
    .map((r) => r.trim())
    .filter(Boolean)
    .join(' ')
    .replace(/\s+/g, ' ')
    .slice(0, limita)
    .trim();
}

/** O intrare din calendarul anual: fie un eveniment anunțat, fie o amintire. */
export type IntrareCalendar = {
  date: Date;
  title: string;
  /** `false` când se știe doar luna: data servește atunci numai la ordonare. */
  showDay: boolean;
  location?: string;
  /** Unde duce rândul: ancora cardului de pe pagină, sau pagina amintirii. */
  href?: string;
  cheie: string;
};

/**
 * Calendarul unui an, adunat din ambele colecții.
 *
 * Evenimentele anunțate și amintirile sunt același lucru privit din două
 * momente: înainte și după. Calendarul le arată pe toate, ca anul să fie
 * întreg, fără ca cineva să scrie aceeași dată în două fișiere.
 *
 * Când o amintire cade în ziua unui eveniment, rămâne titlul evenimentului
 * (el e tradus în toate limbile), dar rândul trimite la amintire — acolo sunt
 * fotografiile, iar evenimentul a trecut deja.
 */
export async function getYearCalendar(
  locale: Locale,
  year: number,
  linkAmintire: (slug: string) => string,
): Promise<IntrareCalendar[]> {
  const zi = (d: Date) => d.toISOString().slice(0, 10);

  const evenimente = (await getEvents(locale)).filter((e) => e.data.date.getUTCFullYear() === year);

  const amintiri = (await getMemoriesByYear(locale))
    .filter((g) => g.year === year)
    .flatMap((g) => g.entries)
    .filter(({ memory }) => memory.data.date);

  const dupaZi = new Map<string, IntrareCalendar>();
  for (const e of evenimente) {
    dupaZi.set(zi(e.data.date), {
      date: e.data.date,
      title: e.data.title,
      showDay: e.data.showDay,
      location: e.data.location,
      href: `#eveniment-${e.data.translationKey}`,
      cheie: e.data.translationKey,
    });
  }

  for (const { memory, slug } of amintiri) {
    const cheieZi = zi(memory.data.date!);
    const existent = dupaZi.get(cheieZi);
    if (existent) {
      // Evenimentul are deja rândul; îl trimitem însă către amintire.
      existent.href = linkAmintire(slug);
    } else {
      dupaZi.set(cheieZi, {
        date: memory.data.date!,
        title: memory.data.title,
        showDay: memory.data.showDate,
        href: linkAmintire(slug),
        cheie: `amintire-${slug}`,
      });
    }
  }

  return [...dupaZi.values()].sort((a, b) => a.date.getTime() - b.date.getTime());
}

/**
 * Cele mai recente amintiri, oricare ar fi anul lor.
 *
 * „Evenimente recente” înseamnă ce s-a întâmplat ultima dată, iar asta se
 * citește din amintiri, nu din evenimentele anunțate: un eveniment din
 * calendar rămâne acolo și după ce trece, dar povestea lui apare în amintiri.
 */
export async function getRecentMemories(locale: Locale, limita = 3): Promise<MemoryWithSlug[]> {
  const toate = (await getMemoriesByYear(locale)).flatMap((g) => g.entries);
  const cheie = (m: MemoryWithSlug) =>
    m.memory.data.date ? m.memory.data.date.getTime() : Date.UTC(m.memory.data.year, 0, 1);
  return [...toate].sort((a, b) => cheie(b) - cheie(a)).slice(0, limita);
}
