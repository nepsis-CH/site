import ro from './ro';
import fr from './fr';
import en from './en';
import de from './de';

export const locales = ['ro', 'fr', 'en', 'de'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'ro';

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

/** Prefixează o cale cu locale-ul (româna rămâne la rădăcină). */
export function localePath(locale: Locale, path: string): string {
  const clean = path.startsWith('/') ? path : `/${path}`;
  return locale === defaultLocale ? clean : `/${locale}${clean === '/' ? '/' : clean}`;
}

/** Elimină prefixul de limbă dintr-o cale (pentru selectorul de limbă). */
export function stripLocale(pathname: string): string {
  for (const l of locales) {
    if (l === defaultLocale) continue;
    if (pathname === `/${l}` || pathname === `/${l}/`) return '/';
    if (pathname.startsWith(`/${l}/`)) return pathname.slice(l.length + 1);
  }
  return pathname || '/';
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
