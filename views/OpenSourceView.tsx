
import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Page } from '../App';
import Seo from '../components/Seo';
import { getCanonicalUrl, getSiteAssetUrl } from '../src/seo/config';

interface OpenSourceViewProps {
  onNavigate: (page: Page) => void;
}

export const OpenSourceView: React.FC<OpenSourceViewProps> = ({ onNavigate }) => {
  const { t } = useTranslation();

  const projects = [
    {
      id: 'facodi',
      github: "https://github.com/marcelo-m7/facodi",
      live: "https://facodi.com"
    },
    {
      id: 'tubeo2',
      github: "https://github.com/marcelo-m7/monynha.fun",
      live: "https://tube.open2.tech"
    }
  ];

  return (
    <div className="bg-brand-black">
      <Seo
        title={t('seo.openSource.title')}
        description={t('seo.openSource.description')}
        canonical={getCanonicalUrl('/open-source')}
        image={getSiteAssetUrl('/assets/base-colors.png')}
      />
      {/* Header */}
      <section className="pt-32 pb-20 px-6 border-b-4 border-white">
        <div className="max-w-[1600px] mx-auto">
          <div className="flex flex-col lg:flex-row gap-20 items-end">
            <div className="lg:w-2/3">
              <h1 className="text-7xl md:text-[12rem] font-black tracking-tighter uppercase leading-[0.8] mb-12 font-display">
                {t('opensource.headingLine1')} <br /><span className="text-brand-teal">{t('opensource.headingHighlight')}</span>
              </h1>
              <p className="text-2xl md:text-4xl font-medium text-slate-300 leading-tight">
                {t('opensource.description')}
              </p>
            </div>
            <div className="lg:w-1/3">
              <div className="p-10 border-4 border-white bg-brand-teal text-white">
                <h4 className="text-2xl font-black uppercase mb-4 font-display">{t('opensource.philosophyTitle')}</h4>
                <p className="font-bold mb-8 opacity-90">{t('opensource.philosophyText')}</p>
                <a 
                  href="https://github.com/Open2Tech" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="inline-block px-8 py-4 bg-white text-black font-black uppercase tracking-widest text-xs hover:bg-black hover:text-white transition-colors"
                >
                  {t('opensource.organizationGithub')}
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
            key={project.id}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="p-12 md:p-24 border-b-4 border-black hover:bg-brand-teal hover:text-white transition-colors group"
          >
            <div className="flex flex-col lg:flex-row justify-between items-start gap-12">
              <div className="flex-1">
                <div className="flex flex-wrap gap-3 mb-8">
                  {(t(`opensource.projects.${project.id}.tags`, { returnObjects: true }) as string[]).map((tag) => (
                    <span key={tag} className="px-3 py-1 border-2 border-black group-hover:border-white text-[10px] font-black uppercase tracking-widest">
                      {tag}
                    </span>
                  ))}
                </div>
                <h2 className="text-5xl md:text-8xl font-black tracking-tighter uppercase font-display mb-2">{t(`opensource.projects.${project.id}.name`)}</h2>
                <h3 className="text-xl font-black uppercase opacity-40 group-hover:opacity-100 mb-8">{t(`opensource.projects.${project.id}.fullName`)}</h3>
                <p className="text-xl md:text-2xl font-bold max-w-3xl opacity-60 group-hover:opacity-100 leading-relaxed mb-12">
                  {t(`opensource.projects.${project.id}.desc`)}
                </p>
                
                <div className="flex flex-wrap gap-8">
                  <a 
                    href={project.github} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 text-xs font-black uppercase tracking-widest underline underline-offset-8 decoration-4"
                  >
                    {t('opensource.viewSourceCode')}
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
                  </a>
                  <a 
                    href={project.github} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 text-xs font-black uppercase tracking-widest underline underline-offset-8 decoration-4"
                  >
                    {t('opensource.viewSourceCode')}
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
                  </a>
                  {project.live && (
                    <a 
                      href={project.live} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-4 text-xs font-black uppercase tracking-widest underline underline-offset-8 decoration-4"
                    >
                      {t('opensource.liveDeployment')}
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
            <h3 className="text-4xl md:text-6xl font-black uppercase tracking-tighter font-display mb-6">{t('opensource.signalsWelcome')}</h3>
            <p className="text-slate-400 text-xl leading-relaxed">
              {t('opensource.signalsDescription')}
            </p>
          </div>
          <a 
            href="https://github.com/Open2Tech" 
            target="_blank" 
            rel="noopener noreferrer"
            className="px-16 py-8 border-4 border-white font-black text-xl tracking-widest uppercase hover:bg-white hover:text-black transition-all shrink-0 text-center"
          >
            {t('opensource.forkOnGithub')}
          </a>
        </div>
      </section>

      {/* Closing Statement */}
      <section className="py-24 px-6 text-center bg-brand-violet text-white">
        <h2 className="text-3xl md:text-5xl font-black tracking-tighter uppercase font-display max-w-4xl mx-auto">
          "{t('opensource.closingQuote')}"
        </h2>
      </section>
    </div>
  );
};
