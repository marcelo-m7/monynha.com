
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
    name: 'Monynha Softwares',
    url: getCanonicalUrl('/'),
    logo: getSiteAssetUrl('/favicon-48x48.png'),
    description: 'Custom Odoo solutions, bespoke software and AI-powered automation.',
    sameAs: [
      'https://github.com/Monynha-Softwares',
      'https://www.linkedin.com/in/marcelo-m7/',
    ],
  };

  return (
    <>
      <Seo
        title="Monynha Softwares - Democratizing Technology"
        description="Custom Odoo solutions, bespoke software and AI-powered automation."
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
