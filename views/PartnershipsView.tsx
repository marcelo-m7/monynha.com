import React from 'react';
import { motion } from 'framer-motion';
import { Page } from '../App';
import { PartnerCard } from '../components/PartnerCard';
import logoJusNacionalidade from '../assets/logo-jusnacionalidade.png';
import logoSeaEu from '../assets/logo-sea-eu.svg';
import logoCorvanis from '../assets/logo-corvanis.png';
import logoUalg from '../assets/logo-ualg-white.svg';

interface PartnershipsViewProps {
  onNavigate: (page: Page) => void;
}

export const PartnershipsView: React.FC<PartnershipsViewProps> = ({ onNavigate }) => {
  const partners = [
    {
      name: 'University of Algarve (UAlg)',
      category: 'Academic Partner',
      description: 'Innovation and research collaboration focused on inclusive and applied technology.',
      logo: logoUalg,
      logoAlt: 'University of Algarve logo',
    },
    {
      name: 'SEA-EU Alliance',
      category: 'European University Alliance',
      description: 'Collaboration through FACODI, supporting cross-border digital learning initiatives.',
      logo: logoSeaEu,
      logoAlt: 'SEA-EU Alliance logo',
    },
    {
      name: 'Corvanis',
      category: 'Development Partner',
      description: 'Strategic and technical mentorship supporting product direction and execution.',
      logo: logoCorvanis,
      logoAlt: 'Corvanis partner logo',
    },
    {
      name: 'Jus Nacionalidade',
      category: 'Legal Partner',
      description: 'Legal support in immigration and nationality law to ensure trusted compliance pathways.',
      logo: logoJusNacionalidade,
      logoAlt: 'Jus Nacionalidade logo',
    },
  ];

  return (
    <div className="bg-brand-black">
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
              Partnerships & Collaboration
            </span>
          </div>

          <h1 className="text-[12vw] md:text-[9vw] font-black tracking-tighter uppercase leading-[0.85] font-display mb-16">
            Where <br />
            <span className="text-brand-violet">Collaboration</span> <br />
            <span className="text-outline">Drives Innovation</span>
          </h1>

          <div className="grid lg:grid-cols-12 gap-12 items-end">
            <div className="lg:col-span-7">
              <p className="text-xl md:text-3xl font-medium max-w-2xl leading-[1.2] tracking-tight text-slate-300">
                We build together with universities, companies, and legal experts to turn ideas into accessible,
                production-ready systems.
              </p>
            </div>
            <div className="lg:col-span-5 flex flex-col sm:flex-row gap-6 lg:justify-end">
              <button
                onClick={() => onNavigate('contact')}
                className="px-10 py-6 bg-white text-black font-black text-lg tracking-widest uppercase border-4 border-white hover:bg-transparent hover:text-white transition-all"
              >
                Become a partner
              </button>
              <button
                onClick={() => onNavigate('open-source')}
                className="px-10 py-6 border-4 border-white text-white font-black text-lg tracking-widest uppercase hover:bg-white hover:text-black transition-all"
              >
                Open ecosystem
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
              category={partner.category}
              description={partner.description}
              logo={partner.logo}
              logoAlt={partner.logoAlt}
            />
          ))}
        </div>
      </section>
    </div>
  );
};
