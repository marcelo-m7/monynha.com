import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from '../locales/en.json';
import pt from '../locales/pt.json';
import fr from '../locales/fr.json';
import es from '../locales/es.json';

const SUPPORTED_LANGUAGES = ['en', 'pt', 'fr', 'es'] as const;
type SupportedLanguage = (typeof SUPPORTED_LANGUAGES)[number];

const LANGUAGE_STORAGE_KEY = 'monynha.language';
const DEFAULT_LANGUAGE: SupportedLanguage = 'en';

const normalizeLanguage = (value?: string | null): SupportedLanguage => {
  if (!value) {
    return DEFAULT_LANGUAGE;
  }

  const short = value.toLowerCase().split('-')[0];
  return SUPPORTED_LANGUAGES.includes(short as SupportedLanguage)
    ? (short as SupportedLanguage)
    : DEFAULT_LANGUAGE;
};

const getInitialLanguage = (): SupportedLanguage => {
  if (typeof window === 'undefined') {
    return DEFAULT_LANGUAGE;
  }

  const storedValue = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);
  if (storedValue) {
    return normalizeLanguage(storedValue);
  }

  return normalizeLanguage(window.navigator.language);
};

if (!i18n.isInitialized) {
  i18n.use(initReactI18next).init({
    resources: {
      en: { translation: en },
      pt: { translation: pt },
      fr: { translation: fr },
      es: { translation: es },
    },
    lng: getInitialLanguage(),
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });
}

if (typeof window !== 'undefined') {
  window.document.documentElement.lang = i18n.resolvedLanguage ?? DEFAULT_LANGUAGE;

  i18n.on('languageChanged', (language) => {
    const normalizedLanguage = normalizeLanguage(language);
    window.localStorage.setItem(LANGUAGE_STORAGE_KEY, normalizedLanguage);
    window.document.documentElement.lang = normalizedLanguage;
  });
}

export default i18n;
