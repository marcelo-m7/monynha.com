import React, { useEffect, useRef } from 'react';

interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  longDescription: string;
  icon: string;
  color: string;
  gradient: string;
  status: 'production' | 'experimental' | 'lab';
  url: string;
  tags: string[];
  features?: string[];
}

export const PROJECTS: Project[] = [
  {
    id: 'boteco-pro',
    title: 'Boteco PRO',
    subtitle: 'boteco.pro',
    description: 'A plataforma definitiva de gestão para bares e restaurantes.',
    longDescription: 'Sistema completo de gestão para bares e restaurantes construído sobre Odoo ERP. Do cardápio digital ao controle de estoque, empoderamos a indústria de food & beverage com orgulho e tecnologia de ponta.',
    icon: 'local_bar',
    color: '#9767e4',
    gradient: 'from-[#9767e4] via-[#667EEA] to-[#764BA2]',
    status: 'production',
    url: 'https://boteco.pro',
    tags: ['Odoo ERP', 'Digital Menus', 'Stock Control', 'Analytics', 'POS'],
    features: [
      'Cardápios digitais interativos com QR Code',
      'Controle de estoque em tempo real',
      'Dashboard de vendas e analytics',
      'Gestão de mesas e pedidos',
      'Integração com delivery',
      'Relatórios financeiros completos'
    ]
  },
  {
    id: 'facodi',
    title: 'FACODI',
    subtitle: 'facodi.pt',
    description: 'Faculdade Comunitária Digital democratizando educação.',
    longDescription: 'Democratizamos currículos universitários em playlists abertas e acessíveis. Qualquer pessoa pode brilhar na tecnologia, independentemente de background ou recursos financeiros. Educação de qualidade como direito, não privilégio.',
    icon: 'school',
    color: '#667EEA',
    gradient: 'from-[#667EEA] to-[#764BA2]',
    status: 'lab',
    url: 'https://facodi.pt',
    tags: ['Education', 'Open Source', 'Community', 'Tech Skills'],
    features: [
      'Currículos universitários estruturados',
      'Playlists de vídeo curadas',
      'Trilhas de aprendizado personalizadas',
      'Recursos 100% gratuitos',
      'Comunidade ativa de estudantes',
      'Certificados de conclusão'
    ]
  },
  {
    id: 'monynha-fun',
    title: 'Monynha Fun',
    subtitle: 'monynha.fun',
    description: 'Arquivo de videos do YouTube e indexador de playlists do Facodi.',
    longDescription: 'Um arquivo vivo de videos do YouTube com indexacao de playlists da Facodi (Faculdade Comunitaria Digital). Centraliza curadoria, trilhas e colecoes para facilitar o acesso ao conhecimento aberto.',
    icon: 'toys',
    color: '#F59E0B',
    gradient: 'from-[#F59E0B] to-[#EF4444]',
    status: 'experimental',
    url: 'https://monynha.fun',
    tags: ['YouTube', 'Playlists', 'Facodi', 'Curadoria'],
    features: [
      'Indexacao de playlists do Facodi',
      'Arquivo organizado de videos',
      'Curadoria por trilhas de estudo',
      'Busca rapida por temas',
      'Links diretos para playlists',
      'Colecoes abertas e publicas'
    ]
  },
  {
    id: 'odoo-integrations',
    title: 'Odoo ERP Integrations',
    subtitle: 'odoo.com',
    description: 'Integrações enterprise conectando Odoo com ferramentas modernas.',
    longDescription: 'Integrações de nível enterprise conectando Odoo com o melhor do ecossistema SaaS moderno. Stripe para pagamentos, Clerk para autenticação, Supabase como backend, e pipelines customizadas de IA.',
    icon: 'hub',
    color: '#8B5CF6',
    gradient: 'from-[#8B5CF6] to-[#EC4899]',
    status: 'production',
    url: 'https://odoo.com',
    tags: ['Integration', 'Stripe', 'Clerk', 'Supabase', 'AI', 'API'],
    features: [
      'Integração Stripe completa',
      'Autenticação via Clerk',
      'Backend Supabase',
      'Pipelines de IA customizadas',
      'APIs RESTful e GraphQL',
      'Webhooks e automações'
    ]
  }
];

interface ProjectsPageProps {
  onBack: () => void;
  onStartWizard: () => void;
}

const statusLabels = {
  production: { text: 'Production', color: 'bg-primary text-white border-near-black' },
  experimental: { text: 'Experimental', color: 'bg-[#F59E0B] text-white border-near-black' },
  lab: { text: 'Lab', color: 'bg-[#667EEA] text-white border-near-black' }
};

const ProjectsPage: React.FC<ProjectsPageProps> = ({ onBack, onStartWizard }) => {
  const scrollIntervalRef = useRef<number | null>(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  useEffect(() => {
    return () => {
      if (scrollIntervalRef.current !== null) {
        window.clearInterval(scrollIntervalRef.current);
        scrollIntervalRef.current = null;
      }
    };
  }, []);

  const startScrollHold = (direction: 'up' | 'down') => {
    const step = direction === 'up' ? -40 : 40;
    if (scrollIntervalRef.current !== null) {
      window.clearInterval(scrollIntervalRef.current);
    }
    scrollIntervalRef.current = window.setInterval(() => {
      window.scrollBy({ top: step, left: 0, behavior: 'auto' });
    }, 16);
  };

  const stopScrollHold = () => {
    if (scrollIntervalRef.current !== null) {
      window.clearInterval(scrollIntervalRef.current);
      scrollIntervalRef.current = null;
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFAFC] py-8 sm:py-12 px-4 sm:px-6 font-body">
      {/* Header Navigation */}
      <nav className="w-full max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-6 mb-12 sm:mb-16">
        <button 
          type="button" 
          onClick={onBack}
          className="flex items-center gap-3 sm:gap-4 group cursor-none text-left"
        >
          <div className="w-12 h-12 sm:w-16 sm:h-16 bg-primary border-[3px] sm:border-4 border-near-black rounded-xl sm:rounded-2xl flex items-center justify-center shadow-brutalist transition-transform group-hover:scale-105">
            <span className="text-white font-black text-2xl sm:text-4xl">M</span>
          </div>
          <div className="flex flex-col">
            <span className="text-2xl sm:text-3xl font-black tracking-tighter uppercase italic leading-none">Monynha.</span>
            <span className="text-[10px] sm:text-xs font-black uppercase tracking-[0.2em] sm:tracking-[0.3em] text-primary mt-1">Criaturas do Estúdio</span>
          </div>
        </button>
        
        <div className="flex gap-4">
          <button 
            onClick={onBack}
            className="group px-6 py-3 border-[3px] border-near-black font-black text-sm uppercase tracking-wider hover:bg-near-black hover:text-white transition-all rounded-xl shadow-brutalist-sm cursor-none"
          >
            <span className="flex items-center gap-2">
              <span className="material-symbols-outlined text-lg">arrow_back</span>
              Voltar
            </span>
          </button>
          
          <button 
            onClick={onStartWizard}
            className="group px-6 py-3 bg-primary text-white border-[3px] border-near-black font-black text-sm uppercase tracking-wider hover:translate-y-[-2px] transition-all rounded-xl shadow-brutalist cursor-none"
          >
            <span className="flex items-center gap-2">
              Iniciar Projeto
              <span className="material-symbols-outlined text-lg">rocket_launch</span>
            </span>
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto mb-16 sm:mb-20">
        <div className="text-center space-y-6">
          <div className="inline-block px-6 py-2 sm:px-8 sm:py-3 border-[3px] border-near-black bg-near-black text-white rounded-full font-black text-xs sm:text-sm uppercase tracking-widest rotate-[-1.5deg] shadow-brutalist-sm">
            Nosso Ecossistema
          </div>
          
          <h1 className="text-4xl xs:text-5xl md:text-7xl lg:text-8xl font-display font-black leading-[0.9] tracking-tighter text-near-black">
            Criaturas do <br/>
            <span className="text-primary italic underline decoration-near-black decoration-4 md:decoration-8 underline-offset-4 md:underline-offset-[18px]">Estúdio</span>
          </h1>
          
          <p className="text-base sm:text-lg md:text-xl font-medium text-near-black/60 leading-relaxed max-w-3xl mx-auto italic">
            Explore o ecossistema vivo da Monynha Softwares — de plataformas prontas para produção até iniciativas experimentais do Lab. Cada criatura tem um propósito, uma alma e um pouco de resistência codificada.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto flex items-center justify-center gap-4 mb-10">
        <button
          type="button"
          onPointerDown={() => startScrollHold('up')}
          onPointerUp={stopScrollHold}
          onPointerLeave={stopScrollHold}
          onPointerCancel={stopScrollHold}
          className="group px-5 py-3 border-[3px] border-near-black font-black text-xs sm:text-sm uppercase tracking-wider rounded-xl shadow-brutalist-sm bg-white hover:bg-near-black hover:text-white transition-all cursor-none"
          aria-label="Rolar para cima rapidamente"
        >
          <span className="flex items-center gap-2">
            <span className="material-symbols-outlined text-lg">keyboard_arrow_up</span>
            Segurar para subir
          </span>
        </button>
        <button
          type="button"
          onPointerDown={() => startScrollHold('down')}
          onPointerUp={stopScrollHold}
          onPointerLeave={stopScrollHold}
          onPointerCancel={stopScrollHold}
          className="group px-5 py-3 bg-primary text-white border-[3px] border-near-black font-black text-xs sm:text-sm uppercase tracking-wider rounded-xl shadow-brutalist hover:translate-y-[-2px] transition-all cursor-none"
          aria-label="Rolar para baixo rapidamente"
        >
          <span className="flex items-center gap-2">
            Segurar para descer
            <span className="material-symbols-outlined text-lg">keyboard_arrow_down</span>
          </span>
        </button>
      </div>

      {/* Projects Grid */}
      <div className="max-w-7xl mx-auto space-y-12">
        {PROJECTS.map((project, index) => (
          <div key={project.id} className="relative group">
            {/* Gradient Glow Effect */}
            {project.status === 'production' && (
              <div className={`absolute -inset-1 bg-gradient-to-r ${project.gradient} rounded-[36px] opacity-75 blur-xl group-hover:opacity-100 transition duration-500`}></div>
            )}
            
            {/* Project Card */}
            <div className={`relative bg-white border-[4px] border-near-black rounded-[32px] p-8 md:p-12 shadow-brutalist hover:translate-y-[-6px] transition-all ${
              project.status !== 'production' && 'hover:border-[' + project.color + ']'
            }`}>
              <div className="flex flex-col lg:flex-row gap-8 items-start">
                {/* Icon */}
                <div className="flex-shrink-0">
                  <div 
                    className={`w-20 h-20 md:w-24 md:h-24 rounded-2xl border-[3px] border-near-black bg-gradient-to-br ${project.gradient} flex items-center justify-center shadow-brutalist-sm group-hover:scale-105 transition-transform`}
                  >
                    <span className="material-symbols-outlined text-5xl md:text-6xl text-white">{project.icon}</span>
                  </div>
                </div>
                
                {/* Content */}
                <div className="flex-grow space-y-6">
                  <div className="space-y-3">
                    <div className="flex flex-wrap items-center gap-3">
                      <h3 className="text-3xl md:text-5xl font-display font-black uppercase italic tracking-tighter group-hover:text-primary transition-colors">
                        {project.title}
                      </h3>
                      <span className={`px-3 py-1.5 ${statusLabels[project.status].color} text-[10px] xs:text-xs font-black uppercase tracking-wider sm:tracking-widest rounded-full border-2`}>
                        {statusLabels[project.status].text}
                      </span>
                    </div>
                    
                    <p className="text-sm font-black uppercase tracking-widest" style={{ color: project.color }}>
                      {project.subtitle}
                    </p>
                    
                    <p className="text-base md:text-xl font-medium text-near-black/70 leading-relaxed">
                      {project.longDescription}
                    </p>
                  </div>
                  
                  {/* Tags */}
                  <div className="flex flex-wrap gap-3">
                    {project.tags.map((tag, i) => (
                      <span 
                        key={i}
                        className="px-3 py-1.5 sm:px-4 sm:py-2 border-2 border-near-black/10 rounded-full text-[10px] xs:text-xs font-black uppercase tracking-wider sm:tracking-widest text-near-black/50"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  {/* Features */}
                  {project.features && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-4 border-t-2 border-near-black/5">
                      {project.features.map((feature, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <span className="material-symbols-outlined text-primary text-lg mt-0.5">check_circle</span>
                          <span className="text-sm font-medium text-near-black/60">{feature}</span>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  {/* Action Button */}
                  <a 
                    href={project.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 sm:px-8 sm:py-4 text-white font-black text-xs sm:text-sm uppercase tracking-wider sm:tracking-widest rounded-xl border-[3px] border-near-black shadow-brutalist hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all cursor-none group/btn"
                    style={{ backgroundColor: project.color }}
                  >
                    <span>Visitar Projeto</span>
                    <span className="material-symbols-outlined text-lg group-hover/btn:translate-x-1 transition-transform">arrow_outward</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* CTA Section */}
      <div className="max-w-4xl mx-auto mt-20 sm:mt-32">
        <div className="bg-primary text-white p-10 md:p-16 rounded-[60px] border-4 border-near-black shadow-brutalist flex flex-col items-center text-center space-y-8">
          <h3 className="text-4xl md:text-6xl font-display font-bold tracking-tighter leading-none italic">
            Tem uma ideia <br/> revolucionária?
          </h3>
          
          <p className="text-base md:text-lg font-medium opacity-90 max-w-xl">
            Vamos transformar seu conceito em realidade. Cada grande projeto começa com uma conversa.
          </p>
          
          <button 
            onClick={onStartWizard}
            className="group px-8 py-5 bg-white text-primary font-black text-base md:text-lg uppercase italic tracking-tight rounded-2xl border-[3px] border-near-black shadow-brutalist-sm hover:translate-y-[-3px] hover:shadow-brutalist transition-all cursor-none flex items-center gap-3"
          >
            <span>Iniciar Meu Projeto</span>
            <span className="material-symbols-outlined text-2xl group-hover:translate-x-1 transition-transform">rocket_launch</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectsPage;
