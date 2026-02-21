
import React from 'react';
import { Page } from '../App';
import { Logo } from './Logo';

interface FooterProps {
  setPage: (page: Page) => void;
}

export const Footer: React.FC<FooterProps> = ({ setPage }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-24 px-8 bg-brand-black border-t-4 border-white/10">
      <div className="max-w-[1920px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-20 mb-32">
          <div className="col-span-1 md:col-span-2 space-y-12">
            <div 
              onClick={() => setPage('home')}
              className="flex items-center gap-4 cursor-pointer group"
            >
              <Logo size="lg" />
              <span className="text-4xl font-black uppercase tracking-tighter font-display group-hover:text-brand-violet transition-colors">
                Monynha
              </span>
            </div>
            <p className="text-2xl md:text-3xl font-bold max-w-md leading-tight uppercase font-display text-white">
              A modern and inclusive software studio focused on custom solutions and human-first engineering.
            </p>
            <p className="text-xs font-black tracking-widest uppercase text-white/30">
              Portugal (Remote-first)
            </p>
          </div>

          <div className="space-y-10">
            <h5 className="text-xs font-black tracking-[0.5em] uppercase text-white/30">Navigation</h5>
            <ul className="space-y-6 text-xl font-black uppercase font-display">
              <li><button onClick={() => setPage('solutions')} className="hover:text-brand-violet hover:line-through transition-all text-left">Solutions</button></li>
              <li><button onClick={() => setPage('labs')} className="hover:text-brand-violet hover:line-through transition-all text-left">Labs</button></li>
              <li><button onClick={() => setPage('open-source')} className="hover:text-brand-violet hover:line-through transition-all text-left">Open Source</button></li>
              <li><button onClick={() => setPage('contact')} className="hover:text-brand-violet hover:line-through transition-all text-left">Contact</button></li>
            </ul>
          </div>

          <div className="space-y-10">
            <h5 className="text-xs font-black tracking-[0.5em] uppercase text-white/30">Social Hub</h5>
            <ul className="space-y-6 text-xl font-black uppercase font-display">
              <li><a href="https://github.com/Monynha-Softwares" target="_blank" rel="noreferrer" className="hover:text-brand-violet hover:line-through transition-all">GitHub Org</a></li>
              <li><a href="https://www.linkedin.com/in/marcelo-m7/" target="_blank" rel="noreferrer" className="hover:text-brand-violet hover:line-through transition-all">Marcelo (LKD)</a></li>
              <li><a href="https://www.linkedin.com/in/t%C3%A9rcio-barreto-40a840120/" target="_blank" rel="noreferrer" className="hover:text-brand-violet hover:line-through transition-all">Tércio (LKD)</a></li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-start pt-16 border-t-4 border-white/20 gap-8">
          <span className="text-xs font-black tracking-widest uppercase text-white/40">
            © {currentYear} Monynha Softwares. Engineering with personality.
          </span>
          <div className="flex gap-12">
            <a href="#" className="text-xs font-black tracking-widest uppercase hover:text-white text-white/40">Privacy Policy</a>
            <a href="#" className="text-xs font-black tracking-widest uppercase hover:text-white text-white/40">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
