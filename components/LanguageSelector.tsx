import React from 'react';
import { useTranslation } from 'react-i18next';

const supportedLanguages = ['en', 'pt', 'fr', 'es'] as const;
type SupportedLanguage = (typeof supportedLanguages)[number];

interface LanguageSelectorProps {
  className?: string;
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({ className = '' }) => {
  const { i18n, t } = useTranslation();

  const handleLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    void i18n.changeLanguage(event.target.value as SupportedLanguage);
  };

  const activeLanguage = i18n.resolvedLanguage?.split('-')[0] ?? 'en';

  return (
    <label className={`inline-flex items-center gap-2 ${className}`}>
      <span className="sr-only">{t('nav.languageSelector')}</span>
      <select
        value={activeLanguage}
        onChange={handleLanguageChange}
        aria-label={t('nav.languageSelector')}
        className="bg-transparent border-2 border-white text-white px-3 py-2 text-xs font-black tracking-[0.2em] uppercase focus:outline-none focus:border-brand-violet"
      >
        {supportedLanguages.map((language) => (
          <option key={language} value={language} className="bg-brand-black text-white">
            {t(`languages.${language}`)}
          </option>
        ))}
      </select>
    </label>
  );
};
