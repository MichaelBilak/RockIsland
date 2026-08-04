export const LOCALES = ['it', 'en', 'de', 'fr', 'ru'] as const;
export type Locale = (typeof LOCALES)[number];

export const LOCALE_LABELS: Record<Locale, string> = {
  it: 'IT',
  en: 'EN',
  de: 'DE',
  fr: 'FR',
  ru: 'RU',
};

export function htmlLangFor(locale: Locale): string {
  const map: Record<Locale, string> = {
    it: 'it',
    en: 'en',
    de: 'de',
    fr: 'fr',
    ru: 'ru',
  };
  return map[locale];
}

export const LOCALE_STORAGE_KEY = 'rockisland.locale';
