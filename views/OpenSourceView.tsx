
import React from 'react';
import { motion } from 'framer-motion';
import { Page } from '../App';

interface OpenSourceViewProps {
  onNavigate: (page: Page) => void;
}

export const OpenSourceView: React.FC<OpenSourceViewProps> = ({ onNavigate }) => {
  const projects = [
    {
      name: "FACODI",
      fullName: "Faculdade Comunitária Digital",
      tags: ["Open Source", "Education", "Community", "Platform"],
      desc: "An open educational platform focused on democratizing access to higher education. It organizes academic curricula into learning paths and playlists, making university-level knowledge accessible, free, and community-driven.",
      github: "https://github.com/marcelo-m7/facodi.pt",
      live: "https://facodi.pt"
    },
    {
      name: "Monynha Fun",
      fullName: "Video Curation Platform",
      tags: ["Open Source", "Media", "Curation", "Experimental"],
      desc: "An open-source video curation platform focused on organizing YouTube content into meaningful playlists and collections. Exploring content discovery and lightweight social interaction around educational media.",
      github: "https://github.com/marcelo-m7/monynha.fun",
      live: "https://monynha.fun"
    },
    {
      name: "BotecoPRO Website",
      fullName: "Official SaaS Ecosystem Landing",
      tags: ["Open Source", "SaaS", "Hospitality", "Frontend"],
      desc: "The official website for BotecoPRO, an open-source bar and restaurant management ecosystem. This project serves as the public-facing layer of the platform, focusing on clarity and onboarding.",
      github: "https://github.com/marcelo-m7/BotecoPRO-website",
      live: "https://boteco.pt"
    },
    {
      name: "BotecoPRO App",
      fullName: "Operational Management Tool",
      tags: ["Open Source", "Mobile App", "Hospitality", "Operations"],
      desc: "A mobile-first management tool designed for bars and restaurants. It focuses on daily operations, usability, and real-world workflows, connecting staff through a simple digital interface.",
      github: "https://github.com/marcelo-m7/BotecoPro-app",
      live: "https://app.boteco.pt"
    }
  ];

  return (
    <div className="bg-brand-black">
      {/* Header */}
      <section className="pt-32 pb-20 px-6 border-b-4 border-white">
        <div className="max-w-[1600px] mx-auto">
          <div className="flex flex-col lg:flex-row gap-20 items-end">
            <div className="lg:w-2/3">
              <h1 className="text-7xl md:text-[12rem] font-black tracking-tighter uppercase leading-[0.8] mb-12 font-display">
                Building <br /><span className="text-brand-teal">Open</span>
              </h1>
              <p className="text-2xl md:text-4xl font-medium text-slate-300 leading-tight">
                Monynha Softwares builds in public whenever possible. Open-source isn't just a strategy—it's a tool for collective learning and democratizing technology.
              </p>
            </div>
            <div className="lg:w-1/3">
              <div className="p-10 border-4 border-white bg-brand-teal text-white">
                <h4 className="text-2xl font-black uppercase mb-4 font-display">Philosophy</h4>
                <p className="font-bold mb-8 opacity-90">Some projects are production-ready, others are experimental explorations. We value the process of building as much as the final product.</p>
                <a 
                  href="https://github.com/Monynha-Softwares" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="inline-block px-8 py-4 bg-white text-black font-black uppercase tracking-widest text-xs hover:bg-black hover:text-white transition-colors"
                >
                  Organization GitHub
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects List */}
      <section className="bg-white text-black">
        {projects.map((project, i) => (
          <motion.div
            key={project.name}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="p-12 md:p-24 border-b-4 border-black hover:bg-brand-teal hover:text-white transition-colors group"
          >
            <div className="flex flex-col lg:flex-row justify-between items-start gap-12">
              <div className="flex-1">
                <div className="flex flex-wrap gap-3 mb-8">
                  {project.tags.map(tag => (
                    <span key={tag} className="px-3 py-1 border-2 border-black group-hover:border-white text-[10px] font-black uppercase tracking-widest">
                      {tag}
                    </span>
                  ))}
                </div>
                <h2 className="text-5xl md:text-8xl font-black tracking-tighter uppercase font-display mb-2">{project.name}</h2>
                <h3 className="text-xl font-black uppercase opacity-40 group-hover:opacity-100 mb-8">{project.fullName}</h3>
                <p className="text-xl md:text-2xl font-bold max-w-3xl opacity-60 group-hover:opacity-100 leading-relaxed mb-12">
                  {project.desc}
                </p>
                
                <div className="flex flex-wrap gap-8">
                  <a 
                    href={project.github} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 text-xs font-black uppercase tracking-widest underline underline-offset-8 decoration-4"
                  >
                    View Source Code
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
                  </a>
                  {project.live && (
                    <a 
                      href={project.live} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-4 text-xs font-black uppercase tracking-widest underline underline-offset-8 decoration-4"
                    >
                      Live Deployment
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                    </a>
                  )}
                </div>
              </div>
              
              <div className="hidden lg:flex w-32 h-32 border-8 border-black group-hover:border-white items-center justify-center shrink-0">
                <span className="text-4xl font-black">{i + 1}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </section>

      {/* Contribution Invitation */}
      <section className="py-32 px-6 border-b-4 border-white">
        <div className="max-w-[1600px] mx-auto text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="max-w-2xl">
            <h3 className="text-4xl md:text-6xl font-black uppercase tracking-tighter font-display mb-6">Signals Welcome</h3>
            <p className="text-slate-400 text-xl leading-relaxed">
              Our repositories are open spaces. Explore the code, fork a project, test our prototypes, or open an issue. Experimentation and community feedback are what move these ecosystems forward.
            </p>
          </div>
          <a 
            href="https://github.com/Monynha-Softwares" 
            target="_blank" 
            rel="noopener noreferrer"
            className="px-16 py-8 border-4 border-white font-black text-xl tracking-widest uppercase hover:bg-white hover:text-black transition-all shrink-0 text-center"
          >
            Fork on GitHub
          </a>
        </div>
      </section>

      {/* Closing Statement */}
      <section className="py-24 px-6 text-center bg-brand-violet text-white">
        <h2 className="text-3xl md:text-5xl font-black tracking-tighter uppercase font-display max-w-4xl mx-auto">
          "The best technology is built by people who aren't afraid to share their work."
        </h2>
      </section>
    </div>
  );
};
