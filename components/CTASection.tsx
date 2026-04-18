
import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Page } from '../App';

interface CTASectionProps {
  onNavigate: (page: Page) => void;
}

export const CTASection: React.FC<CTASectionProps> = ({ onNavigate }) => {
  const { t } = useTranslation();

  return (
    <section className="relative py-40 px-6 bg-brand-violet border-b-4 border-white overflow-hidden">
      {/* Decorative Geometric Overlay */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-white/10 [clip-path:polygon(100%_0,0_0,100%_100%)] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-1/4 h-1/2 bg-black/5 [clip-path:circle(50%_at_0_100%)] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10 text-center md:text-left">
        <motion.h2
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-7xl md:text-[11rem] font-black tracking-tighter mb-12 uppercase leading-[0.85] font-display"
        >
          {t('cta.headingLine1')} <br /><span className="italic">{t('cta.headingHighlight')}</span>
        </motion.h2>

        <p className="text-2xl md:text-4xl font-bold mb-16 text-white max-w-2xl leading-tight">
          {t('cta.description')}
        </p>

        <motion.button
          whileHover={{ scale: 1.05, backgroundColor: '#ffffff', color: '#000000' }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onNavigate('contact')}
          className="inline-block px-12 py-8 bg-black text-white font-black text-2xl tracking-widest uppercase transition-all border-4 border-black"
        >
          {t('cta.button')}
        </motion.button>
      </div>
    </section>
  );
};
