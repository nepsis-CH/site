import ro from './ro';
import fr from './fr';
import en from './en';
import de from './de';

export const locales = ['ro', 'fr', 'en', 'de'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'ro';

/**
 * Subdirectorul în care e găzduit site-ul: gol pe domeniul propriu
 * (ch.nepsis.org), „/nepsis” pe o găzduire secundară de tip GitHub Pages.
 */
const base = (import.meta.env.BASE_URL ?? '/').replace(/\/$/, '');

/** Prefixează o cale internă absolută cu subdirectorul de găzduire. */
export function withBase(path: string): string {
  if (!base || !path.startsWith('/') || path.startsWith('//')) return path;
  return `${base}${path}`;
}

/** Elimină prefixul subdirectorului dintr-o cale (inversul lui `withBase`). */
function stripBase(pathname: string): string {
  if (!base) return pathname;
  if (pathname === base) return '/';
  return pathname.startsWith(`${base}/`) ? pathname.slice(base.length) : pathname;
}

export type UIDict = typeof ro;
export type UIKey = keyof UIDict;

const dicts: Record<Locale, Partial<UIDict>> = { ro, fr, en, de };

export function isLocale(value: unknown): value is Locale {
  return typeof value === 'string' && (locales as readonly string[]).includes(value);
}

/** Locale din parametrul de rută `[...lang]` (undefined => română). */
export function localeFromParam(param: string | undefined): Locale {
  return isLocale(param) ? param : defaultLocale;
}

/** Funcție de traducere: cheile lipsă cad pe română. */
export function useTranslations(locale: Locale) {
  return function t(key: UIKey): string {
    return dicts[locale][key] ?? ro[key];
  };
}

/** Prefixează o cale cu locale-ul (româna rămâne la rădăcină) și cu subdirectorul de găzduire. */
export function localePath(locale: Locale, path: string): string {
  const clean = path.startsWith('/') ? path : `/${path}`;
  const withLocale = locale === defaultLocale ? clean : `/${locale}${clean === '/' ? '/' : clean}`;
  return withBase(withLocale);
}

/**
 * Elimină prefixul de limbă (și pe cel al subdirectorului) dintr-o cale,
 * pentru selectorul de limbă. Rezultatul se dă mai departe lui `localePath`.
 */
export function stripLocale(pathname: string): string {
  const path = stripBase(pathname);
  for (const l of locales) {
    if (l === defaultLocale) continue;
    if (path === `/${l}` || path === `/${l}/`) return '/';
    if (path.startsWith(`/${l}/`)) return path.slice(l.length + 1);
  }
  return path || '/';
}

/** Căile statice pentru rutele `[...lang]`: /, /fr, /en, /de. */
export function langStaticPaths() {
  return [
    { params: { lang: undefined } },
    { params: { lang: 'fr' } },
    { params: { lang: 'en' } },
    { params: { lang: 'de' } },
  ];
}

const dateLocales: Record<Locale, string> = {
  ro: 'ro-RO',
  fr: 'fr-CH',
  en: 'en-GB',
  de: 'de-CH',
};

/** Formatează o dată complet (ex. „28 februarie 2026”). */
export function formatDate(date: Date, locale: Locale): string {
  return new Intl.DateTimeFormat(dateLocales[locale], {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(date);
}

/** Ziua din lună, ca număr (pentru blocul de dată din calendar). */
export function formatDay(date: Date, locale: Locale): string {
  return new Intl.DateTimeFormat(dateLocales[locale], { day: 'numeric', timeZone: 'UTC' }).format(date);
}

/** Luna prescurtată, fără punct final (ex. „feb”, „déc”, „Dez”). */
export function formatMonthShort(date: Date, locale: Locale): string {
  const luna = new Intl.DateTimeFormat(dateLocales[locale], { month: 'short', timeZone: 'UTC' }).format(date);
  return luna.replace(/\.$/, '');
}

/** Numele lunii, întreg (ex. „februarie”, „février”, „Februar”). */
export function formatMonthLong(date: Date, locale: Locale): string {
  return new Intl.DateTimeFormat(dateLocales[locale], { month: 'long', timeZone: 'UTC' }).format(date);
}

/** Luna și anul, fără zi (ex. „noiembrie 2026”) — pentru datele încă neprecizate. */
export function formatMonthYear(date: Date, locale: Locale): string {
  return new Intl.DateTimeFormat(dateLocales[locale], {
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(date);
}
