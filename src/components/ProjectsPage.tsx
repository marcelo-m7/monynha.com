import React from 'react';
import { products } from '../content/siteContent';

interface ProjectsPageProps {
  onBack: () => void;
  onStartWizard: () => void;
}

const statusColors: Record<string, string> = {
  'Ativo': 'bg-emerald-600 text-white',
  'Beta': 'bg-primary text-white',
  'Experimental': 'bg-amber-500 text-white',
  'Em breve': 'bg-near-black text-white'
};

const ProjectsPage: React.FC<ProjectsPageProps> = ({ onBack, onStartWizard }) => {
  return (
    <div className="min-h-screen bg-[#FAFAFC] text-near-black">
      <nav className="sticky top-0 z-40 bg-[#FAFAFC]/95 backdrop-blur border-b-4 border-near-black">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-wrap items-center justify-between gap-4">
          <button onClick={onBack} className="flex items-center gap-3 text-left">
            <div className="w-10 h-10 rounded-xl bg-primary text-white flex items-center justify-center font-black border-2 border-near-black">M</div>
            <div>
              <p className="font-black uppercase tracking-tight">Produtos</p>
              <p className="text-xs uppercase tracking-[0.25em] text-primary font-black">Narrativa + status + CTA</p>
            </div>
          </button>
          <div className="flex gap-3">
            <button onClick={onBack} className="px-4 py-2 rounded-full border-2 border-near-black bg-white font-black">Voltar</button>
            <button onClick={onStartWizard} className="px-4 py-2 rounded-full border-2 border-near-black bg-primary text-white font-black shadow-brutalist-sm">Pedir proposta</button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-12 md:py-16 space-y-16">
        <section className="grid gap-8 lg:grid-cols-[1fr_0.9fr] items-start">
          <div className="space-y-5">
            <p className="text-xs uppercase tracking-[0.3em] text-primary font-black">Portfólio de produtos</p>
            <h1 className="text-4xl md:text-7xl font-display font-black tracking-tighter leading-[0.92]">Produtos que nascem da vida real.</h1>
            <p className="text-xl text-near-black/70 max-w-3xl">Ferramentas para operação, educação e automação — com cultura aberta, status transparente e caminhos de adoção honestos.</p>
          </div>
          <div className="rounded-[2rem] border-4 border-near-black bg-near-black text-white p-6 shadow-brutalist">
            <p className="text-xs uppercase tracking-[0.3em] text-primary font-black">Como ler esta página</p>
            <ul className="mt-4 space-y-3 text-white/80">
              <li>• Cada produto mostra o problema do mundo real.</li>
              <li>• Status obrigatório: Ativo, Beta, Experimental ou Em breve.</li>
              <li>• Quando ainda não está pronto, o CTA vira lista de espera ou conversa.</li>
            </ul>
          </div>
        </section>

        <section className="grid gap-8">
          {products.map((product) => (
            <article key={product.id} className="bg-white rounded-[2rem] border-[4px] border-near-black p-7 md:p-9 shadow-brutalist grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
              <div className="space-y-4">
                <div className="flex flex-wrap items-center gap-3">
                  <h2 className="text-3xl md:text-4xl font-display font-black tracking-tighter">{product.name}</h2>
                  <span className={`px-3 py-1 rounded-full text-xs font-black uppercase tracking-[0.2em] ${statusColors[product.status]}`}>{product.status}</span>
                </div>
                <p className="text-lg text-near-black/70">{product.short}</p>
                <p className="leading-relaxed"><strong>Problema do mundo real:</strong> {product.problem}</p>
                <div>
                  <p className="font-black mb-2">3 benefícios claros</p>
                  <ul className="space-y-2 text-near-black/70">
                    {product.benefits.map((benefit) => <li key={benefit}>• {benefit}</li>)}
                  </ul>
                </div>
              </div>
              <div className="space-y-5">
                <div>
                  <p className="font-black mb-2">Features demonstráveis</p>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {product.features.map((feature) => (
                      <div key={feature} className="rounded-xl border-2 border-near-black/10 bg-secondary p-3 text-sm font-medium">{feature}</div>
                    ))}
                  </div>
                </div>
                <div className="rounded-[1.25rem] border-2 border-near-black bg-secondary p-4">
                  <p className="font-black">Como adotar</p>
                  <p className="mt-2 text-near-black/70">Use em modo self-serve quando fizer sentido ou fale com a Monynha para implantação, suporte, customização e integrações relacionadas.</p>
                </div>
                <div className="flex flex-wrap gap-3">
                  <a href={product.links.primary} target={product.links.primary.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer" className="px-5 py-3 rounded-xl bg-primary text-white font-black border-2 border-near-black shadow-brutalist-sm">{product.status === 'Em breve' ? 'Entrar na lista' : 'Ver visão geral'}</a>
                  <a href={product.links.secondary} target={product.links.secondary.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer" className="px-5 py-3 rounded-xl bg-white text-near-black font-black border-2 border-near-black shadow-brutalist-sm">{product.status === 'Em breve' ? 'Entender a visão' : 'Ver código'}</a>
                </div>
              </div>
            </article>
          ))}
        </section>

        <section className="grid gap-6 lg:grid-cols-2">
          <article className="rounded-[2rem] border-[3px] border-near-black bg-white p-7 shadow-brutalist-sm">
            <h2 className="text-2xl font-black tracking-tight">FAQ</h2>
            <div className="mt-5 space-y-5">
              <div>
                <p className="font-black">Open source significa “sem suporte”?</p>
                <p className="text-near-black/70 mt-1">Não. Open source é um jeito de construir com transparência. Suporte, implantação e customização podem ser contratados quando fizer sentido.</p>
              </div>
              <div>
                <p className="font-black">Posso usar um produto e pedir feature?</p>
                <p className="text-near-black/70 mt-1">Sim. Abre issue, conta contexto e prioridade. Se for coisa crítica, a gente fecha um escopo e entrega com SLA.</p>
              </div>
            </div>
          </article>
          <article className="rounded-[2rem] border-[3px] border-near-black bg-primary text-white p-7 shadow-brutalist">
            <p className="text-xs uppercase tracking-[0.3em] font-black text-white/70">Relacionamento entre páginas</p>
            <h2 className="text-3xl font-display font-black tracking-tighter">Cada produto puxa serviço, suporte e comunidade.</h2>
            <p className="mt-3 text-white/85">A home roteia intenção. Produtos explicam adoção. Serviços entram como implantação, customização e integrações relacionadas.</p>
            <button onClick={onStartWizard} className="mt-6 px-6 py-3 rounded-xl bg-near-black text-white font-black border-2 border-white shadow-brutalist-sm">Falar sobre o seu caso</button>
          </article>
        </section>
      </main>
    </div>
  );
};

export default ProjectsPage;
