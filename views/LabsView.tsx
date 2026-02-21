
import React from 'react';
import { motion } from 'framer-motion';
import { Page } from '../App';

interface LabsViewProps {
  onNavigate: (page: Page) => void;
}

export const LabsView: React.FC<LabsViewProps> = ({ onNavigate }) => {
  const experiments = [
    { title: "NeuroFlow", category: "Experiment", status: "Active", desc: "A neural-network based task priority engine." },
    { title: "GlassUI", category: "Internal Tool", status: "Stable", desc: "Our proprietary design system for high-performance dashboards." },
    { title: "PulseDB", category: "Prototype", status: "Research", desc: "Exploring time-series data visualization in 3D environments." },
    { title: "AutoERP", category: "Prototype", status: "Testing", desc: "Self-correcting Odoo data entry agents." }
  ];

  return (
    <div className="bg-brand-black">
      {/* Hero */}
      <section className="min-h-[50vh] flex flex-col justify-center px-6 md:px-12 py-20 border-b-4 border-white bg-brand-violet/10">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          className="max-w-[1600px] mx-auto"
        >
          <span className="text-xs font-black tracking-[0.4em] uppercase bg-white text-brand-violet px-5 py-2 mb-8 inline-block">The Playground</span>
          <h1 className="text-6xl md:text-[10rem] font-black tracking-tighter uppercase leading-[0.8] mb-12 font-display">
            Monynha <br /><span className="text-outline">Labs</span>
          </h1>
          <p className="text-xl md:text-3xl font-medium max-w-2xl text-slate-300">
            This is where we break things to learn how to build them better. A space for curiosity, prototypes, and the future of software.
          </p>
        </motion.div>
      </section>

      {/* Lab Grid */}
      <section className="p-6 md:p-12 border-b-4 border-white">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {experiments.map((item, i) => (
            <motion.div
              key={item.title}
              whileHover={{ y: -10 }}
              className="p-8 border-4 border-white bg-white/5 backdrop-blur-md flex flex-col justify-between min-h-[400px]"
            >
              <div>
                <div className="flex justify-between items-start mb-12">
                  <span className="text-[10px] font-black tracking-[0.3em] uppercase px-3 py-1 bg-brand-violet">{item.category}</span>
                  <span className="text-[10px] font-black tracking-[0.3em] uppercase text-white/40">{item.status}</span>
                </div>
                <h3 className="text-4xl font-black tracking-tighter uppercase mb-4 font-display">{item.title}</h3>
                <p className="text-slate-400 font-medium">{item.desc}</p>
              </div>
              
              <button 
                onClick={() => onNavigate('contact')}
                className="pt-8 border-t-2 border-white/10 mt-8 flex justify-between items-center w-full text-left group"
              >
                <span className="text-[10px] font-black uppercase text-brand-violet group-hover:text-white transition-colors">Inquire Project</span>
                <svg className="w-6 h-6 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </button>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Philosophy */}
      <section className="py-24 px-6 border-b-4 border-white flex flex-col items-center text-center">
        <motion.div 
          whileHover={{ scale: 1.1, rotate: 135 }}
          className="w-20 h-20 bg-brand-violet rotate-45 mb-12 flex items-center justify-center cursor-help"
        >
          <span className="text-4xl font-black -rotate-45">!</span>
        </motion.div>
        <h2 className="text-3xl md:text-5xl font-black tracking-tighter uppercase font-display max-w-2xl mb-8">
          "Failure is the most efficient way to debug a roadmap."
        </h2>
        <p className="text-white/40 font-black tracking-widest uppercase text-xs">— The Labs Manifesto</p>
      </section>
    </div>
  );
};
