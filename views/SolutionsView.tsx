
import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Page } from '../App';
import Seo from '../components/Seo';
import { getCanonicalUrl, getSiteAssetUrl } from '../src/seo/config';

interface SolutionsViewProps {
  onNavigate: (page: Page) => void;
}

export const SolutionsView: React.FC<SolutionsViewProps> = ({ onNavigate }) => {
  const { t } = useTranslation();

  const solutions = [
    {
      id: 'odoo',
      accent: 'text-brand-blue',
    },
    {
      id: 'software',
      accent: 'text-brand-teal',
    },
    {
      id: 'ai',
      accent: 'text-brand-violet',
    }
  ];

  return (
    <div className="bg-brand-black">
      <Seo
        title="Solutions - Monynha Softwares"
        description="Explore Monynha solutions in Odoo, bespoke software engineering, and AI-powered automation for scalable operations."
        canonical={getCanonicalUrl('/solutions')}
        image={getSiteAssetUrl('/assets/base-colors.png')}
      />
      {/* Hero */}
      <section className="min-h-[60vh] flex flex-col justify-center px-6 md:px-12 py-20 border-b-4 border-white">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-[1600px] mx-auto"
        >
          <span className="text-xs font-black tracking-[0.4em] uppercase bg-brand-blue text-white px-5 py-2 mb-8 inline-block">{t('solutions.badge')}</span>
          <h1 className="text-6xl md:text-[10rem] font-black tracking-tighter uppercase leading-[0.8] mb-12 font-display">
            {t('solutions.headingLine1')} <br /><span className="text-outline">{t('solutions.headingLine2')}</span>
          </h1>
          <p className="text-2xl md:text-4xl font-medium max-w-3xl text-slate-300 leading-tight">
            {t('solutions.description')}
          </p>
        </motion.div>
      </section>

      {/* Grid */}
      <section className="border-b-4 border-white">
        <div className="grid lg:grid-cols-3">
          {solutions.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`p-12 md:p-20 border-white min-h-[60vh] flex flex-col justify-between group hover:bg-white transition-colors duration-500 ${i !== 2 ? 'border-b-4 lg:border-b-0 lg:border-r-4' : ''}`}
            >
              <div>
                <span className={`text-6xl font-black mb-12 block font-display opacity-20 group-hover:opacity-100 transition-opacity ${item.accent}`}>0{i + 1}</span>
                <h3 className="text-5xl font-black tracking-tighter uppercase mb-6 font-display group-hover:text-black">{t(`solutions.cards.${item.id}.title`)}</h3>
                <p className="text-xl text-slate-400 group-hover:text-black/80 mb-12 leading-relaxed">{t(`solutions.cards.${item.id}.desc`)}</p>
              </div>
              <ul className="space-y-4">
                {(t(`solutions.cards.${item.id}.outcomes`, { returnObjects: true }) as string[]).map((o) => (
                  <li key={o} className="flex items-center gap-3 text-xs font-black tracking-widest uppercase group-hover:text-black">
                    <span className={`w-4 h-4 border-2 border-white group-hover:border-black ${item.accent.replace('text-', 'bg-')}`} />
                    {o}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </section>
      
      {/* Outcome Statement */}
      <section className="py-32 px-6 text-center border-b-4 border-white bg-white text-black">
        <h2 className="text-4xl md:text-7xl font-black tracking-tighter uppercase font-display max-w-4xl mx-auto mb-12">
          {t('solutions.statement')} <span className="text-brand-violet italic underline">{t('solutions.statementHighlight')}</span> {t('solutions.statementEnding')}
        </h2>
        <button 
          onClick={() => onNavigate('contact')}
          className="px-12 py-6 bg-black text-white font-black text-xl tracking-widest uppercase hover:bg-brand-violet transition-colors"
        >
          {t('solutions.button')}
        </button>
      </section>
    </div>
  );
};
