import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Page } from '../App';
import logoJusNacionalidade from '../assets/logo-jusnacionalidade.png';
import logoSeaEu from '../assets/logo-sea-eu.svg';
import logoUalgWhite from '../assets/logo-ualg-white.svg';

interface PartnershipsViewProps {
  onNavigate: (page: Page) => void;
}

type PartnerCategory = 'Academic' | 'Development Partner' | 'Legal Partner';
type PartnerFilter = 'All' | PartnerCategory;

interface Partner {
  name: string;
  description: string;
  tag: PartnerCategory;
  context: string;
  logo?: string;
  website?: string;
}

interface PartnerCardProps {
  partner: Partner;
}

const PartnerCard: React.FC<PartnerCardProps> = ({ partner }) => {
  return (
    <motion.article
      whileHover={{ y: -4, scale: 1.02 }}
      transition={{ duration: 0.2 }}
      className="rounded-2xl border border-white/15 bg-white/[0.03] p-6 shadow-[0_20px_50px_rgba(0,0,0,0.35)] hover:border-brand-violet/80 hover:shadow-[0_20px_60px_rgba(99,102,241,0.2)]"
    >
      <div className="rounded-xl border border-white/10 bg-brand-black/60 p-5 h-24 flex items-center justify-center mb-5">
        {partner.logo ? (
          <img
            src={partner.logo}
            alt={`${partner.name} logo`}
            className="max-h-14 w-full object-contain"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full rounded-md border border-dashed border-white/30 text-white/60 text-xs font-black tracking-[0.2em] uppercase flex items-center justify-center">
            {partner.name}
          </div>
        )}
      </div>

      <div className="mb-4">
        <span className="inline-flex rounded-full border border-brand-violet/60 bg-brand-violet/10 px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em] text-brand-violet">
          {partner.tag}
        </span>
      </div>

      <h3 className="text-2xl font-black tracking-tight font-display mb-3">{partner.name}</h3>
      <p className="text-slate-300 leading-relaxed mb-4">{partner.description}</p>
      <p className="text-sm text-white/60 leading-relaxed mb-6">{partner.context}</p>

      {partner.website ? (
        <a
          href={partner.website}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] text-brand-blue hover:text-white transition-colors"
        >
          Visit website
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5h5m0 0v5m0-5L10 14" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 14v5H5V5h5" />
          </svg>
        </a>
      ) : (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] text-white/50 hover:text-white transition-colors"
        >
          Learn more with us
        </button>
      )}
    </motion.article>
  );
};

export const PartnershipsView: React.FC<PartnershipsViewProps> = ({ onNavigate }) => {
  const [activeFilter, setActiveFilter] = useState<PartnerFilter>('All');

  const partners: Partner[] = [
    {
      name: 'University of Algarve (UAlg)',
      description: 'Academic partner contributing to innovation, research, and practical digital experimentation.',
      tag: 'Academic',
      context: 'UAlg supports collaborative initiatives that connect education with real-world technology impact.',
      logo: logoUalgWhite,
      website: 'https://www.ualg.pt/'
    },
    {
      name: 'SEA-EU Alliance',
      description: 'European university alliance collaborating on cross-border digital learning initiatives.',
      tag: 'Academic',
      context: 'Partnership in the FACODI project for digital learning and skills recognition platforms.',
      logo: logoSeaEu,
      website: 'https://sea-eu.org/'
    },
    {
      name: 'Corvanis',
      description: 'Strategic development and mentorship partner supporting Monynha technical evolution.',
      tag: 'Development Partner',
      context: 'Corvanis contributes hands-on guidance and technical support for sustainable growth.',
      website: 'https://www.corvanis.com/'
    },
    {
      name: 'Jus Nacionalidade',
      description: 'Legal partner focused on immigration and nationality law for cross-border operations.',
      tag: 'Legal Partner',
      context: 'Provides legal support and partnership for people, processes, and institutional alignment.',
      logo: logoJusNacionalidade
    }
  ];

  const filters: PartnerFilter[] = ['All', 'Academic', 'Development Partner', 'Legal Partner'];

  const filteredPartners = useMemo(() => {
    if (activeFilter === 'All') {
      return partners;
    }

    return partners.filter((partner) => partner.tag === activeFilter);
  }, [activeFilter, partners]);

  return (
    <div className="bg-brand-black">
      <section className="relative overflow-hidden border-b-4 border-white">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-violet/40 via-brand-blue/25 to-brand-black" aria-hidden="true" />
        <div className="relative max-w-[1600px] mx-auto px-6 md:px-12 py-24 md:py-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl"
          >
            <span className="inline-flex bg-white text-brand-violet px-5 py-2 text-xs font-black tracking-[0.3em] uppercase mb-8 rounded-full">
              Building Together
            </span>
            <h1 className="text-6xl md:text-[8rem] font-black tracking-tighter uppercase leading-[0.82] mb-8 font-display">
              Our Partnerships
            </h1>
            <p className="text-xl md:text-3xl text-slate-200 leading-tight max-w-3xl">
              We collaborate with universities, companies, and institutions to build technology that matters.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="border-b-4 border-white px-6 md:px-12 py-16 md:py-20">
        <div className="max-w-[1600px] mx-auto">
          <div className="flex flex-wrap gap-3 mb-12">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`rounded-full border px-5 py-2 text-xs font-black tracking-[0.2em] uppercase transition-all ${
                  activeFilter === filter
                    ? 'border-brand-violet bg-brand-violet text-white shadow-[0_0_24px_rgba(99,102,241,0.45)]'
                    : 'border-white/30 text-white/70 hover:border-brand-violet/80 hover:text-white'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8">
            {filteredPartners.map((partner) => (
              <PartnerCard key={partner.name} partner={partner} />
            ))}
          </div>

          <div className="mt-14 rounded-2xl border border-white/10 bg-white/[0.02] p-8 md:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <p className="text-lg md:text-xl text-slate-300 leading-relaxed max-w-3xl">
              Partnerships are where ideas become ecosystems. We keep building bridges between research, product, and social impact.
            </p>
            <button
              onClick={() => onNavigate('contact')}
              className="shrink-0 rounded-xl border-2 border-white px-8 py-4 text-sm font-black tracking-[0.2em] uppercase hover:bg-white hover:text-black transition-all"
            >
              Become a partner
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
