import React from 'react';
import { homeContent } from '../content/siteContent';

interface LandingProps {
  onStart: () => void;
  onExplore: () => void;
  onViewProducts: () => void;
}

const Landing: React.FC<LandingProps> = ({ onStart, onExplore, onViewProducts }) => {
  return (
    <div className="min-h-screen bg-[#171220] text-white overflow-x-hidden">
      <div className="absolute inset-0 opacity-20 pointer-events-none" aria-hidden="true">
        <div className="absolute top-20 left-10 h-32 w-32 rounded-full bg-primary blur-3xl" />
        <div className="absolute right-0 top-1/3 h-56 w-56 rounded-full bg-fuchsia-500 blur-3xl" />
      </div>

      <header className="relative z-10 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-primary font-black">Monynha Softwares</p>
            <p className="text-sm text-white/60">Produto + engenharia + comunidade pela mesma porta.</p>
          </div>
          <nav className="flex flex-wrap gap-3 text-sm font-bold">
            <button onClick={onExplore} className="px-4 py-2 rounded-full border border-white/20 hover:border-primary hover:text-primary transition-colors">Serviços, OSS e Sobre</button>
            <button onClick={onStart} className="px-4 py-2 rounded-full bg-primary text-white border border-primary">Falar com a Monynha</button>
          </nav>
        </div>
      </header>

      <main className="relative z-10">
        <section className="max-w-7xl mx-auto px-6 pt-16 pb-10 md:pt-24 md:pb-16 grid gap-10 lg:grid-cols-[1.2fr_0.8fr] items-end">
          <div className="space-y-6">
            <p className="inline-flex px-4 py-2 rounded-full border border-primary/60 bg-primary/10 text-xs font-black uppercase tracking-[0.3em] text-primary">{homeContent.hero.eyebrow}</p>
            <h1 className="text-5xl md:text-7xl font-display font-black tracking-tighter leading-[0.9] max-w-4xl">{homeContent.hero.title}</h1>
            <p className="text-xl md:text-3xl text-white/85 font-medium max-w-3xl">{homeContent.hero.subtitle}</p>
            <p className="text-base md:text-lg text-white/70 max-w-3xl leading-relaxed">{homeContent.hero.body}</p>
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <button onClick={onStart} className="px-7 py-4 bg-primary text-white font-black rounded-2xl border-2 border-near-black shadow-brutalist hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all">{homeContent.hero.ctaPrimary}</button>
              <button onClick={onViewProducts} className="px-7 py-4 bg-white text-near-black font-black rounded-2xl border-2 border-near-black shadow-brutalist hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all">{homeContent.hero.ctaSecondary}</button>
            </div>
          </div>

          <aside className="bg-white text-near-black rounded-[2rem] border-4 border-near-black p-6 md:p-8 shadow-brutalist">
            <p className="text-xs uppercase tracking-[0.3em] text-primary font-black">Nova tese do site</p>
            <p className="mt-4 text-2xl md:text-3xl font-black leading-tight">Monynha é o lugar onde produto + engenharia + comunidade entram pela mesma porta.</p>
            <div className="mt-6 space-y-3 text-sm md:text-base text-near-black/70">
              <p>• Home como roteador de intenção.</p>
              <p>• Produtos com status honesto.</p>
              <p>• Manifesto visível no topo, não escondido no rodapé.</p>
              <p>• Open source como prova, não só vitrine.</p>
            </div>
          </aside>
        </section>

        <section className="max-w-7xl mx-auto px-6 py-8 md:py-16">
          <div className="flex items-end justify-between gap-6 mb-8 flex-wrap">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-primary font-black">Escolha seu caminho</p>
              <h2 className="text-3xl md:text-5xl font-display font-black tracking-tighter">Qual é o seu rolê hoje?</h2>
            </div>
            <p className="text-white/60 max-w-xl">Em até 10 segundos, você entende se quer contratar, usar um produto, explorar código ou conhecer a comunidade.</p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {homeContent.paths.map((path) => (
              <article key={path.title} className="bg-white/5 backdrop-blur rounded-[1.75rem] border border-white/10 p-6 flex flex-col gap-4 hover:border-primary transition-colors">
                <span className="material-symbols-outlined text-4xl text-primary" aria-hidden="true">{path.icon}</span>
                <div>
                  <p className="text-xs uppercase tracking-[0.25em] text-primary font-black">{path.title}</p>
                  <h3 className="text-xl font-black mt-2">{path.hook}</h3>
                </div>
                <p className="text-white/70 leading-relaxed">{path.body}</p>
                <button onClick={path.title === 'Produtos' ? onViewProducts : onExplore} className="mt-auto text-left font-black text-primary">{path.cta} →</button>
              </article>
            ))}
          </div>
        </section>

        <section className="bg-white text-near-black py-14 md:py-20">
          <div className="max-w-7xl mx-auto px-6 grid gap-10 lg:grid-cols-2">
            <div className="space-y-5">
              <p className="text-xs uppercase tracking-[0.3em] text-primary font-black">O que a Monynha faz</p>
              <h2 className="text-3xl md:text-5xl font-display font-black tracking-tighter">Menos promessa. Mais sistema funcionando.</h2>
              <p className="text-lg text-near-black/70 max-w-2xl">Clareza primeiro, estética depois. Cada oferta precisa dizer para quem é, o que resolve e como começa.</p>
            </div>
            <div className="grid gap-4">
              {homeContent.capabilities.map((item) => (
                <article key={item.title} className="rounded-[1.5rem] border-2 border-near-black p-5 bg-secondary shadow-brutalist-sm">
                  <h3 className="text-xl font-black">{item.title}</h3>
                  <p className="mt-2 text-near-black/70 leading-relaxed">{item.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-6 py-14 md:py-20 grid gap-8 lg:grid-cols-[1fr_1.1fr] items-start">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-primary font-black">Prova</p>
            <h2 className="text-3xl md:text-5xl font-display font-black tracking-tighter">A gente aprende em público. E entrega com padrão.</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {homeContent.proof.map((item) => (
              <article key={item.title} className="rounded-[1.5rem] border border-white/10 bg-white/5 p-5">
                <h3 className="text-lg font-black text-primary">{item.title}</h3>
                <p className="mt-2 text-white/70 leading-relaxed">{item.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-6 pb-16 md:pb-24">
          <div className="rounded-[2rem] border-4 border-near-black bg-primary text-white p-8 md:p-12 shadow-brutalist grid gap-8 lg:grid-cols-[1fr_auto] items-center">
            <div className="space-y-4">
              <p className="text-xs uppercase tracking-[0.3em] font-black text-white/70">Quem somos</p>
              <h2 className="text-3xl md:text-5xl font-display font-black tracking-tighter">{homeContent.manifesto.title}</h2>
              <p className="text-white/85 max-w-3xl leading-relaxed">{homeContent.manifesto.body}</p>
            </div>
            <div className="flex flex-col gap-4">
              <button onClick={onExplore} className="px-7 py-4 bg-near-black text-white font-black rounded-2xl border-2 border-white shadow-brutalist-sm hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all">{homeContent.manifesto.cta}</button>
              <button onClick={onStart} className="px-7 py-4 bg-white text-near-black font-black rounded-2xl border-2 border-near-black shadow-brutalist-sm hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all">{homeContent.finalCta.cta}</button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Landing;
