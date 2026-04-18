import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Page } from '../App';
import Seo from '../components/Seo';
import { PartnerCard } from '../components/PartnerCard';
import { getCanonicalUrl, getSiteAssetUrl } from '../src/seo/config';
import logoJusNacionalidade from '../assets/logo-jusnacionalidade.png';
import logoSeaEu from '../assets/logo-sea-eu.svg';
import logoCorvanis from '../assets/logo-corvanis.png';
import logoUalg from '../assets/logo-ualg-white.svg';

interface PartnershipsViewProps {
  onNavigate: (page: Page) => void;
}

export const PartnershipsView: React.FC<PartnershipsViewProps> = ({ onNavigate }) => {
  const { t } = useTranslation();

  const partners = [
    {
      id: 'ualg',
      name: 'University of Algarve (UAlg)',
      logo: logoUalg,
    },
    {
      id: 'seaeu',
      name: 'SEA-EU Alliance',
      logo: logoSeaEu,
    },
    {
      id: 'corvanis',
      name: 'Corvanis',
      logo: logoCorvanis,
    },
    {
      id: 'jus',
      name: 'Jus Nacionalidade',
      logo: logoJusNacionalidade,
    },
  ];

  return (
    <div className="bg-brand-black">
      <Seo
        title="Partnerships - Monynha Softwares"
        description="Discover our partners like University of Algarve, SEA-EU, Corvanis and Jus Nacionalidade."
        canonical={getCanonicalUrl('/partnerships')}
        image={getSiteAssetUrl('/assets/base-colors.png')}
        schemaMarkup={{
          '@context': 'https://schema.org',
          '@type': 'ItemList',
          name: 'Monynha Softwares Partnerships',
          itemListElement: partners.map((partner, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: partner.name,
          })),
        }}
      />
      <section className="relative min-h-[90vh] flex flex-col justify-end px-6 md:px-12 py-20 border-b-4 border-white overflow-hidden">
        <div className="absolute top-20 right-[10%] w-[400px] h-[400px] bg-brand-violet/20 rounded-full blur-[120px] -z-10 animate-pulse" />
        <div className="absolute -bottom-20 -left-20 w-[600px] h-[600px] bg-brand-blue/10 rounded-full blur-[150px] -z-10" />

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          viewport={{ once: true }}
          className="w-full max-w-[1600px] mx-auto"
        >
          <div className="mb-8">
            <span className="inline-block text-xs font-black tracking-[0.4em] uppercase bg-brand-violet text-white px-5 py-2.5">
              {t('partnerships.badge')}
            </span>
          </div>

          <h1 className="text-[12vw] md:text-[9vw] font-black tracking-tighter uppercase leading-[0.85] font-display mb-16">
            {t('partnerships.headingLine1')} <br />
            <span className="text-brand-violet">{t('partnerships.headingHighlight')}</span> <br />
            <span className="text-outline">{t('partnerships.headingLine3')}</span>
          </h1>

          <div className="grid lg:grid-cols-12 gap-12 items-end">
            <div className="lg:col-span-7">
              <p className="text-xl md:text-3xl font-medium max-w-2xl leading-[1.2] tracking-tight text-slate-300">
                {t('partnerships.description')}
              </p>
            </div>
            <div className="lg:col-span-5 flex flex-col sm:flex-row gap-6 lg:justify-end">
              <button
                onClick={() => onNavigate('contact')}
                className="px-10 py-6 bg-white text-black font-black text-lg tracking-widest uppercase border-4 border-white hover:bg-transparent hover:text-white transition-all"
              >
                {t('partnerships.becomePartner')}
              </button>
              <button
                onClick={() => onNavigate('open-source')}
                className="px-10 py-6 border-4 border-white text-white font-black text-lg tracking-widest uppercase hover:bg-white hover:text-black transition-all"
              >
                {t('partnerships.openEcosystem')}
              </button>
            </div>
          </div>
        </motion.div>
      </section>

      <section className="p-6 md:p-12 border-b-4 border-white">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {partners.map((partner) => (
            <PartnerCard
              key={partner.name}
              name={partner.name}
              category={t(`partnerships.partners.${partner.id}.category`)}
              description={t(`partnerships.partners.${partner.id}.description`)}
              logo={partner.logo}
              logoAlt={t(`partnerships.partners.${partner.id}.logoAlt`)}
            />
          ))}
        </div>
      </section>
    </div>
  );
};
