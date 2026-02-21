
import React from 'react';
import { Hero } from '../components/Hero';
import { Services } from '../components/Services';
import { AISection } from '../components/AISection';
import { TeamSection } from '../components/TeamSection';
import { CTASection } from '../components/CTASection';
import { Page } from '../App';

interface HomeViewProps {
  onNavigate: (page: Page) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({ onNavigate }) => {
  return (
    <>
      <Hero onNavigate={onNavigate} />
      <Services onNavigate={onNavigate} />
      <AISection />
      <TeamSection />
      <CTASection onNavigate={onNavigate} />
    </>
  );
};
