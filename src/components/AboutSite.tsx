import React from 'react';
import { servicesContent } from '../content/siteContent';

interface AboutSiteProps {
  onBack: () => void;
  onStartWizard: () => void;
  onOpenLegal: (type: 'privacy' | 'terms' | 'cookies') => void;
  onViewProjects: () => void;
}

const AboutSite: React.FC<AboutSiteProps> = ({ onBack, onStartWizard, onOpenLegal, onViewProjects }) => {
  return (
    <div className="min-h-screen bg-[#FAFAFC] text-near-black">
      <nav className="sticky top-0 z-50 backdrop-blur bg-[#FAFAFC]/90 border-b-4 border-near-black">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-wrap items-center justify-between gap-4">
          <button onClick={onBack} className="flex items-center gap-3 text-left">
            <div className="w-10 h-10 rounded-xl bg-near-black text-white flex items-center justify-center font-black">M</div>
            <div>
              <p className="font-black uppercase tracking-tight">Monynha</p>
              <p className="text-xs uppercase tracking-[0.25em] text-primary font-black">Serviços • OSS • Sobre</p>
            </div>
          </button>
          <div className="flex flex-wrap gap-3 text-sm font-black">
            <button onClick={onViewProjects} className="px-4 py-2 rounded-full border-2 border-near-black bg-white">Produtos</button>
            <button onClick={onStartWizard} className="px-4 py-2 rounded-full border-2 border-near-black bg-primary text-white shadow-brutalist-sm">Contato</button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-12 md:py-16 space-y-20">
        <section className="grid gap-8 lg:grid-cols-[1fr_0.85fr] items-start">
          <div className="space-y-5">
            <p className="text-xs uppercase tracking-[0.3em] text-primary font-black">Serviços</p>
            <h1 className="text-4xl md:text-6xl font-display font-black tracking-tighter leading-[0.95]">{servicesContent.heroTitle}</h1>
            <p className="text-xl text-near-black/70 max-w-3xl">{servicesContent.heroSubtitle}</p>
          </div>
          <div className="rounded-[2rem] border-4 border-near-black bg-near-black text-white p-6 shadow-brutalist">
            <p className="text-xs uppercase tracking-[0.3em] text-primary font-black">Como a gente trabalha</p>
            <ul className="mt-4 space-y-3 text-white/80 leading-relaxed">
              <li>• Clareza sobre brilho.</li>
              <li>• Benefício antes de feature.</li>
              <li>• Humano + técnico ao mesmo tempo.</li>
              <li>• Inclusão como ponte, não como senha de grupo.</li>
            </ul>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-3">
          {servicesContent.services.map((service) => (
            <article key={service.title} className="bg-white rounded-[2rem] border-[3px] border-near-black p-6 shadow-brutalist-sm flex flex-col gap-4">
              <span className="material-symbols-outlined text-4xl text-primary" aria-hidden="true">{service.icon}</span>
              <h2 className="text-2xl font-black tracking-tight capitalize">{service.title}</h2>
              <p><strong>Para quem é:</strong> {service.audience}</p>
              <p><strong>O que dói hoje:</strong> {service.pain}</p>
              <p><strong>O que muda:</strong> {service.benefit}</p>
              <div>
                <p className="font-black mb-2">Como entregamos</p>
                <ol className="space-y-1 text-near-black/70">
                  {service.process.map((step, index) => <li key={step}>{index + 1}. {step}</li>)}
                </ol>
              </div>
              <button onClick={onStartWizard} className="mt-auto px-5 py-3 rounded-xl bg-primary text-white font-black border-2 border-near-black shadow-brutalist-sm">{service.cta}</button>
            </article>
          ))}
        </section>

        <section className="grid gap-8 lg:grid-cols-2 items-start">
          <div className="space-y-4">
            <p className="text-xs uppercase tracking-[0.3em] text-primary font-black">Open Source</p>
            <h2 className="text-3xl md:text-5xl font-display font-black tracking-tighter">Código aberto como prova de cultura e padrão técnico.</h2>
            <p className="text-near-black/70 leading-relaxed">Open source não é vitrine vazia: é prova de processo, honestidade e documentação pública. Quando faz sentido, a gente constrói em público e oferece suporte como serviço.</p>
            <button onClick={onViewProjects} className="px-6 py-3 rounded-xl bg-near-black text-white font-black border-2 border-primary shadow-brutalist-sm">Ver produtos e projetos</button>
          </div>
          <div className="grid gap-4">
            {servicesContent.oss.map((item) => (
              <article key={item} className="rounded-[1.5rem] border-2 border-near-black bg-white p-5">
                <p className="font-medium leading-relaxed">{item}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="rounded-[2rem] border-4 border-near-black bg-primary text-white p-8 md:p-10 shadow-brutalist grid gap-8 lg:grid-cols-[1fr_0.8fr]">
          <div className="space-y-4">
            <p className="text-xs uppercase tracking-[0.3em] font-black text-white/70">Sobre</p>
            <h2 className="text-3xl md:text-5xl font-display font-black tracking-tighter">{servicesContent.about.title}</h2>
            <p className="text-xl text-white/85">{servicesContent.about.subtitle}</p>
            <p className="text-white/85 leading-relaxed"><strong>Manifesto:</strong> {servicesContent.about.manifesto}</p>
            <p className="text-white/85 leading-relaxed"><strong>Origem do nome:</strong> {servicesContent.about.origin}</p>
            <p className="text-white/85 leading-relaxed"><strong>Credibilidade técnica:</strong> {servicesContent.about.technical}</p>
          </div>
          <div className="bg-white text-near-black rounded-[1.5rem] border-2 border-near-black p-6">
            <p className="text-xs uppercase tracking-[0.3em] text-primary font-black">Valores</p>
            <ul className="mt-4 space-y-3">
              {servicesContent.about.values.map((value) => <li key={value} className="leading-relaxed">• {value}</li>)}
            </ul>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-[1fr_0.8fr] items-start">
          <div className="space-y-4">
            <p className="text-xs uppercase tracking-[0.3em] text-primary font-black">Contato</p>
            <h2 className="text-3xl md:text-5xl font-display font-black tracking-tighter">Sem corporativês. Só conversa de verdade.</h2>
            <p className="text-near-black/70 leading-relaxed">A gente responde em até 1 dia útil. Sem spam. Sem empurro. Se preferir, chama direto no e-mail.</p>
            <div className="flex flex-wrap gap-4">
              <button onClick={onStartWizard} className="px-6 py-3 rounded-xl bg-primary text-white font-black border-2 border-near-black shadow-brutalist">Falar com a Monynha</button>
              <a href="mailto:hello@monynha.com" className="px-6 py-3 rounded-xl bg-white text-near-black font-black border-2 border-near-black shadow-brutalist-sm">hello@monynha.com</a>
            </div>
          </div>
          <div className="rounded-[1.5rem] border-2 border-near-black bg-white p-6 space-y-4">
            <p className="font-black">Documentos legais</p>
            <div className="flex flex-wrap gap-3">
              <button onClick={() => onOpenLegal('privacy')} className="px-4 py-2 rounded-full border-2 border-near-black">Privacidade</button>
              <button onClick={() => onOpenLegal('terms')} className="px-4 py-2 rounded-full border-2 border-near-black">Termos</button>
              <button onClick={() => onOpenLegal('cookies')} className="px-4 py-2 rounded-full border-2 border-near-black">Cookies</button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default AboutSite;
