
import React from 'react';
import { Hero } from '../components/Hero';
import { Services } from '../components/Services';
import { AISection } from '../components/AISection';
import { TeamSection } from '../components/TeamSection';
import { CTASection } from '../components/CTASection';
import Seo from '../components/Seo';
import { Page } from '../App';
import { getCanonicalUrl, getSiteAssetUrl } from '../src/seo/config';

interface HomeViewProps {
  onNavigate: (page: Page) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({ onNavigate }) => {
  const homeSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Open2',
    url: getCanonicalUrl('/'),
    logo: getSiteAssetUrl('/favicon.svg'),
    description: 'Open2 builds accessible, inclusive technology for everyone.',
    sameAs: [
      'https://github.com/Open2Tech',
    ],
  };

  return (
    <>
      <Seo
        title="Open2 – Democratizing Technology"
        description="Open2 builds accessible, inclusive technology for everyone."
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
