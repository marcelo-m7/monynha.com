
import React from 'react';
import { motion } from 'framer-motion';
import { Page } from '../App';

interface HeroProps {
  onNavigate: (page: Page) => void;
}

export const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  return (
    <section className="relative min-h-[90vh] flex flex-col justify-end px-6 md:px-12 py-20 border-b-4 border-white overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-20 right-[10%] w-[400px] h-[400px] bg-brand-violet/20 rounded-full blur-[120px] -z-10 animate-pulse" />
      <div className="absolute -bottom-20 -left-20 w-[600px] h-[600px] bg-brand-blue/10 rounded-full blur-[150px] -z-10" />

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
        className="w-full max-w-[1600px] mx-auto"
      >
        <div className="mb-8">
          <span className="inline-block text-xs font-black tracking-[0.4em] uppercase bg-brand-violet text-white px-5 py-2.5">
            Human-Centered Automation
          </span>
        </div>

        <h1 className="text-[12vw] md:text-[9vw] font-black tracking-tighter uppercase leading-[0.85] font-display mb-16">
          Where <br />
          <span className="text-brand-violet">Engineering</span> <br />
          <span className="text-outline">Meets Intuition</span>
        </h1>

        <div className="grid lg:grid-cols-12 gap-12 items-end">
          <div className="lg:col-span-7">
            <p className="text-xl md:text-3xl font-medium max-w-2xl leading-[1.2] tracking-tight text-slate-300">
              We bridge the gap between complex engineering and human intuition. 
              Building digital products that don't just function — <span className="text-white italic">they breathe</span>.
            </p>
          </div>
          <div className="lg:col-span-5 flex flex-col sm:flex-row gap-6 lg:justify-end">
            <button 
              onClick={() => onNavigate('contact')}
              className="px-10 py-6 bg-white text-black font-black text-lg tracking-widest uppercase border-4 border-white hover:bg-transparent hover:text-white transition-all"
            >
              Start a project
            </button>
            <button 
              onClick={() => onNavigate('labs')}
              className="px-10 py-6 border-4 border-white text-white font-black text-lg tracking-widest uppercase hover:bg-white hover:text-black transition-all"
            >
              Our Labs
            </button>
          </div>
        </div>
      </motion.div>
    </section>
  );
};
