
import React from 'react';
import { motion } from 'framer-motion';
import { Page } from '../App';

interface ServicesProps {
  onNavigate: (page: Page) => void;
}

export const Services: React.FC<ServicesProps> = ({ onNavigate }) => {
  return (
    <div id="solutions">
      {/* Odoo Section */}
      <section className="border-b-4 border-white bg-brand-black overflow-hidden">
        <div className="grid lg:grid-cols-12 min-h-screen">
          <div className="lg:col-span-1 flex items-center justify-center border-r-4 border-white py-12 bg-white/5">
            <span className="text-6xl font-black text-outline-white rotate-[-90deg] lg:rotate-[-90deg] hidden lg:block">01</span>
          </div>
          <div className="lg:col-span-11 p-8 md:p-24 flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <h3 className="text-5xl md:text-9xl font-black tracking-tighter leading-none mb-4 opacity-10 uppercase font-display">Scalability.</h3>
              <h3 className="text-5xl md:text-9xl font-black tracking-tighter leading-none mb-4 opacity-30 uppercase font-display">Precision.</h3>
              <h3 className="text-5xl md:text-9xl font-black tracking-tighter leading-none uppercase font-display">Intuition.</h3>
            </motion.div>

            <div className="max-w-4xl">
              <h2 className="text-6xl md:text-8xl font-black mb-10 tracking-tighter uppercase text-brand-blue font-display">Odoo <br />Expertise</h2>
              <p className="text-xl md:text-3xl font-medium leading-tight mb-12 text-slate-300">
                Transforming enterprise chaos into symphonic clarity. Our custom implementations don't just manage resources—they empower your people to focus on what matters.
              </p>
              <div className="flex flex-wrap gap-4">
                {['ERP Architecture', 'Custom Flows', 'API Sync', 'Live Dashboards'].map(tag => (
                  <span key={tag} className="px-6 py-2 border-2 border-white/30 text-xs uppercase font-black tracking-widest hover:border-white transition-colors cursor-default">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Custom Systems Section */}
      <section className="bg-brand-teal text-white border-b-4 border-white">
        <div className="grid lg:grid-cols-12 min-h-[90vh]">
          <div className="lg:col-span-1 flex items-center justify-center border-r-4 border-white py-12 bg-black/10">
            <span className="text-6xl font-black text-black/20 rotate-[-90deg] hidden lg:block">02</span>
          </div>
          <div className="lg:col-span-11 p-8 md:p-24 flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <span className="text-black text-xs font-black tracking-[0.4em] uppercase mb-8 inline-block">Engineering Personality</span>
              <h2 className="text-6xl md:text-[10rem] font-black tracking-tighter leading-[0.8] mb-12 uppercase font-display">Bespoke <br />Software</h2>
              
              <div className="grid lg:grid-cols-2 gap-16">
                <p className="text-xl md:text-3xl font-bold leading-tight text-white/90">
                  We don't do templates. Every line of code is written to solve your specific cultural and technical challenges.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-8 border-4 border-black bg-white text-black hover:-translate-y-2 transition-transform">
                    <div className="w-12 h-12 bg-black text-white flex items-center justify-center mb-6">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
                    </div>
                    <h4 className="text-xl font-black uppercase mb-2 font-display">Internal Tools</h4>
                    <p className="text-xs font-bold uppercase text-black/60">Optimized for operational speed.</p>
                  </div>
                  <div className="p-8 border-4 border-black bg-white text-black hover:-translate-y-2 transition-transform">
                    <div className="w-12 h-12 bg-black text-white flex items-center justify-center mb-6">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" /></svg>
                    </div>
                    <h4 className="text-xl font-black uppercase mb-2 font-display">Platforms</h4>
                    <p className="text-xs font-bold uppercase text-black/60">Scalable market solutions.</p>
                  </div>
                </div>
              </div>

              <div className="mt-20">
                <button 
                  onClick={() => onNavigate('labs')}
                  className="inline-flex items-center gap-6 group text-left"
                >
                  <span className="w-16 h-16 border-4 border-white flex items-center justify-center group-hover:bg-white group-hover:text-brand-teal transition-all">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                  </span>
                  <span className="text-xl font-black tracking-widest uppercase font-display underline underline-offset-8">View Lab Products</span>
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};
