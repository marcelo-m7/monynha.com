
import React from 'react';
import { Hero } from '../components/Hero';
import { Services } from '../components/Services';
import { AISection } from '../components/AISection';
import { TeamSection } from '../components/TeamSection';
import { CTASection } from '../components/CTASection';
import Seo from '../components/Seo';
import { useTranslation } from 'react-i18next';
import { Page } from '../App';
import { getCanonicalUrl, getSiteAssetUrl } from '../src/seo/config';

interface HomeViewProps {
  onNavigate: (page: Page) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({ onNavigate }) => {
  const { t } = useTranslation();

  const homeSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Open2',
    url: getCanonicalUrl('/'),
    logo: getSiteAssetUrl('/favicon.svg'),
    description: t('seo.home.description'),
    sameAs: [
      'https://github.com/Open2Tech',
    ],
  };

  return (
    <>
      <Seo
        title={t('seo.home.title')}
        description={t('seo.home.description')}
        canonical={getCanonicalUrl('/')}
        image={getSiteAssetUrl('/assets/base-colors.png')}
        schemaMarkup={homeSchema}
      />
      <Hero onNavigate={onNavigate} />
      <Services onNavigate={onNavigate} />
      <AISection />
      <TeamSection />
      <CTASection onNavigate={onNavigate} />
    </>
  );
};
