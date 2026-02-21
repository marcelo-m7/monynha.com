
import React from 'react';
import { motion } from 'framer-motion';

export const AISection: React.FC = () => {
  return (
    <section className="bg-brand-black py-32 px-6 border-b-4 border-white">
      <div className="max-w-[1600px] mx-auto">
        <div className="flex flex-col md:flex-row items-baseline gap-8 mb-24">
          <span className="text-7xl md:text-[14rem] font-black text-outline leading-none font-display">03</span>
          <h2 className="text-6xl md:text-9xl font-black tracking-tighter leading-none uppercase font-display">AI as a <br /><span className="italic text-brand-violet">Collaborator</span></h2>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-2xl md:text-5xl font-medium mb-32 max-w-5xl leading-tight text-slate-300"
        >
          Moving beyond the hype. We integrate intelligent assistants and autonomous workflows that understand context, nuance, and human intent.
        </motion.p>

        <div className="grid md:grid-cols-3 gap-1 bg-white border-4 border-white">
          {[
            {
              title: "Intelligence",
              desc: "RAG architectures that turn your company knowledge into conversational power."
            },
            {
              title: "Flow",
              desc: "Autonomous agents that handle the mundane, so humans can handle the meaningful."
            },
            {
              title: "Openness",
              desc: "Transparent models built on open-source foundations for ethical, long-term scaling."
            }
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: i * 0.2 }}
              viewport={{ once: true }}
              className="bg-brand-black p-12 hover:bg-white group transition-colors duration-500"
            >
              <h4 className="text-xl font-black tracking-widest uppercase text-brand-violet group-hover:text-black mb-8 font-display">{item.title}</h4>
              <p className="text-lg md:text-xl font-medium text-slate-400 group-hover:text-black/80">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
