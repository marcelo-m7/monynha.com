import React, { useState, useEffect, useCallback, useRef } from 'react';
import ProjectCarousel from './ProjectCarousel';

interface TeamMember {
  name: string;
  role: string;
  bio: string;
  fullBio: string;
  seed: string;
  specialties: string[];
}

interface AboutSiteProps {
  onBack: () => void;
  onStartWizard: () => void;
  onOpenLegal: (type: 'privacy' | 'terms' | 'cookies') => void;
  onViewProjects: () => void;
}

const SECTIONS = [
  { id: 'manifesto', label: 'Manifesto' },
  { id: 'solucoes', label: 'Soluções' },
  { id: 'criaturas', label: 'Criaturas' },
  { id: 'colmeia', label: 'Time' },
  { id: 'contato', label: 'Contato' }
];

const TEAM_MEMBERS: TeamMember[] = [
  {
    name: 'Marcelo Santos',
    role: 'Fundador · Engenheiro de Software',
    bio: 'Foco em automação, IA aplicada e desenvolvimento full-stack.',
    fullBio: 'Marcelo combina profundidade técnica com uma mentalidade voltada para o produto, liderando a visão da Monynha. Sua paixão é o Odoo e criar arquiteturas que eliminam o atrito, permitindo que as marcas foquem no que fazem de melhor: brilhar.',
    seed: 'marina',
    specialties: ['Arquitetura Odoo', 'Integração de IA', 'Sistemas Full-Stack']
  },
  {
    name: 'Marina Melucci',
    role: 'Especialista em Presença Digital',
    bio: 'Mestra da visibilidade e storytelling de impacto.',
    fullBio: 'Marina entende que presença é resistência. Ela ajuda as marcas a encontrar sua voz autêntica e cortar o ruído digital com estratégias de conteúdo que constroem comunidades reais.',
    seed: 'marcelo',
    specialties: ['Conteúdo SEO', 'Estratégia de Branding', 'Impacto Social']
  },
  {
    name: 'Tércio Barreto',
    role: 'Colaborador · Estratégia',
    bio: 'Especialista em estratégia tecnológica e pensamento sistêmico.',
    fullBio: 'Tércio alinha a tecnologia com as necessidades reais de negócio. Ele faz a ponte entre a visão e a execução, garantindo que cada roadmap técnico esteja ancorado em crescimento estratégico e clareza operacional.',
    seed: 'tercio',
    specialties: ['Estratégia Tech', 'Pensamento Sistêmico', 'Operações Ágeis']
  },
  {
    name: 'Samuel Souza',
    role: 'UI/UX Designer',
    bio: 'Criando experiências visuais que conectam e inspiram.',
    fullBio: 'Samuel transforma ideias complexas em interfaces intuitivas e visualmente impactantes. Com foco em design centrado no usuário, ele garante que cada pixel conte uma história e cada interação seja memorável.',
    seed: 'samuel',
    specialties: ['Design de Interface', 'Prototipagem', 'Design System']
  }
];

const AboutSite: React.FC<AboutSiteProps> = ({ onBack, onStartWizard, onOpenLegal, onViewProjects }) => {
  const [activeSection, setActiveSection] = useState('manifesto');
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const [eggActive, setEggActive] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const clickTracker = useRef({ count: 0, lastTime: 0 });
  const modalCloseButtonRef = useRef<HTMLButtonElement>(null);
  const lastFocusedElementRef = useRef<HTMLElement | null>(null);

  // Calculate navbar height for accurate offset
  const getNavbarHeight = useCallback(() => {
    const navbar = document.querySelector('nav');
    return navbar ? navbar.offsetHeight : 80;
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const navbarHeight = getNavbarHeight();
      const scrollPosition = window.scrollY + navbarHeight + 40; // Add 40px buffer
      
      for (let i = SECTIONS.length - 1; i >= 0; i--) {
        const el = document.getElementById(SECTIONS[i].id);
        if (el && el.offsetTop <= scrollPosition) {
          setActiveSection(SECTIONS[i].id);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [getNavbarHeight]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    if (!selectedMember) return;

    lastFocusedElementRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;

    const focusTimer = setTimeout(() => {
      modalCloseButtonRef.current?.focus();
    }, 0);

    const handleEscClose = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setSelectedMember(null);
      }
    };

    document.addEventListener('keydown', handleEscClose);

    return () => {
      clearTimeout(focusTimer);
      document.removeEventListener('keydown', handleEscClose);
      lastFocusedElementRef.current?.focus();
    };
  }, [selectedMember]);

  const scrollTo = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const navbarHeight = getNavbarHeight();
      const offset = 20; // Extra spacing so title isn't flush with navbar
      const top = el.offsetTop - navbarHeight - offset;
      
      window.scrollTo({ 
        top: Math.max(0, top), 
        behavior: 'smooth' 
      });
      
      setActiveSection(id);
      setMobileMenuOpen(false); // Close mobile menu after navigation
    }
  }, [getNavbarHeight]);

  return (
    <div className={`min-h-screen bg-[#FAFAFC] text-near-black font-body overflow-x-hidden transition-all duration-700 ${eggActive ? 'saturate-[2] hue-rotate-[15deg]' : ''}`}>
      <style>{`
        .glass-header { backdrop-filter: blur(12px); background: rgba(250, 250, 252, 0.85); border-bottom: 3px solid #0B0B10; }
        .reveal-up { animation: revealUp 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards; }
        @keyframes revealUp { 0% { transform: translateY(30px); opacity: 0; filter: blur(5px); } 100% { transform: translateY(0); opacity: 1; filter: blur(0px); } }
        .nav-link-active { color: #9767e4 !important; font-weight: 800; }
        .nav-link-active::after { content: ''; position: absolute; bottom: -6px; left: 0; width: 100%; height: 3px; background: #9767e4; border-radius: 2px; }
        .link-underline { position: relative; }
        .link-underline::after { content: ''; position: absolute; bottom: -1px; left: 0; width: 0; height: 1.5px; background: currentColor; transition: width 0.3s ease; }
        .link-underline:hover::after { width: 100%; }
        .pride-strip { background: linear-gradient(90deg, #ff0000, #ff7f00, #ffff00, #00ff00, #0000ff, #4b0082, #8b00ff); height: 6px; width: 100%; }
      `}</style>

      {/* Team Modal */}
      {selectedMember && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-8" role="presentation">
          <button
            type="button"
            onClick={() => setSelectedMember(null)}
            aria-label="Fechar modal do time"
            className="absolute inset-0 bg-near-black/50 backdrop-blur-sm"
          ></button>
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="team-member-title"
            className="relative bg-white border-4 sm:border-8 border-near-black w-full max-w-3xl rounded-[40px] shadow-brutalist overflow-hidden"
          >
            <button
              ref={modalCloseButtonRef}
              onClick={() => setSelectedMember(null)}
              aria-label="Fechar modal"
              className="absolute top-4 right-4 sm:top-6 sm:right-6 w-10 h-10 sm:w-12 sm:h-12 bg-near-black text-white border-2 border-white rounded-xl flex items-center justify-center hover:bg-primary transition-all"
            >
              <span className="material-icons text-sm sm:text-base" aria-hidden="true">close</span>
            </button>
            <div className="flex flex-col md:flex-row">
              <div className="md:w-2/5 bg-primary/10 border-b-4 md:border-b-0 md:border-r-4 border-near-black p-8">
                <div className="w-full aspect-square border-2 border-near-black rounded-2xl overflow-hidden bg-white shadow-brutalist-sm">
                  <img loading="lazy" decoding="async" src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${selectedMember.seed}&backgroundColor=c0aede`} alt={selectedMember.name} className="w-full h-full object-cover" />
                </div>
              </div>
              <div className="md:w-3/5 p-8 md:p-12 space-y-6">
                <h3 id="team-member-title" className="text-2xl md:text-4xl font-display font-black uppercase italic tracking-tighter leading-none">{selectedMember.name}</h3>
                <p className="text-[10px] xs:text-xs sm:text-sm font-black uppercase tracking-wider sm:tracking-widest text-primary">{selectedMember.role}</p>
                <p className="text-base sm:text-lg md:text-xl font-medium text-near-black/70 italic leading-relaxed">{selectedMember.fullBio}</p>
                <div className="flex flex-wrap gap-2">
                  {selectedMember.specialties.map(s => (
                    <span key={s} className="px-2.5 py-1 sm:px-3 sm:py-1.5 border-2 border-near-black rounded-full text-[10px] xs:text-xs font-black uppercase tracking-wider sm:tracking-widest bg-near-black text-white">{s}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-[100] glass-header py-4 px-6 sm:px-12 flex justify-between items-center no-print">
        <button type="button" className="flex items-center gap-3 group cursor-none text-left" onClick={onBack}>
          <div className="w-9 h-9 bg-near-black text-white rounded-lg flex items-center justify-center shadow-brutalist-sm group-hover:bg-primary transition-colors">
            <span className="font-display font-bold text-lg">M</span>
          </div>
          <div className="hidden xs:flex flex-col">
            <span className="font-display font-bold text-base tracking-tighter uppercase leading-none group-hover:text-primary transition-colors">Monynha</span>
            <span className="text-[10px] xs:text-xs font-black tracking-wider sm:tracking-widest text-primary uppercase">Softwares</span>
          </div>
        </button>
        <div className="flex gap-4 items-center">
          {/* Desktop Navigation */}
          <div className="hidden lg:flex gap-6">
            {SECTIONS.map(s => (
              <button 
                key={s.id} 
                onClick={() => scrollTo(s.id)} 
                className={`relative text-xs sm:text-sm font-black uppercase tracking-wider sm:tracking-widest transition-all cursor-none link-underline py-1.5 ${activeSection === s.id ? 'nav-link-active' : 'text-near-black/40 hover:text-primary'}`}
              >
                {s.label}
              </button>
            ))}
          </div>
          
          {/* Mobile Menu Button */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden w-10 h-10 flex items-center justify-center border-2 border-near-black rounded-lg bg-white hover:bg-primary hover:text-white transition-colors cursor-none"
            aria-label="Toggle navigation menu"
          >
            <span className="material-icons text-xl" aria-hidden="true">{mobileMenuOpen ? 'close' : 'menu'}</span>
          </button>
          
          <button onClick={onStartWizard} className="px-3 py-1.5 sm:px-4 sm:py-2 bg-primary text-white font-black text-[10px] xs:text-xs uppercase tracking-wider sm:tracking-widest border-2 border-near-black rounded-lg shadow-brutalist-sm hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none transition-all cursor-none">Iniciar Wizard</button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[99] lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Fechar menu móvel"
            className="absolute inset-0 bg-near-black/50 backdrop-blur-sm"
          ></button>
          <div className="absolute top-[72px] left-0 right-0 bg-white border-b-4 border-near-black shadow-brutalist p-6 space-y-3">
            {SECTIONS.map(s => (
              <button
                key={s.id}
                onClick={() => scrollTo(s.id)}
                className={`w-full text-left px-6 py-4 rounded-xl border-2 transition-all cursor-none ${
                  activeSection === s.id 
                    ? 'bg-primary text-white border-near-black font-black shadow-brutalist-sm' 
                    : 'bg-white border-near-black/10 hover:border-primary hover:bg-primary/5 font-bold'
                }`}
              >
                <span className="text-sm uppercase tracking-widest">{s.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      <main className="pt-24 pb-16 px-6 sm:px-12 max-w-6xl mx-auto space-y-24 sm:space-y-32">
        
        {/* HERO / MANIFESTO */}
        <section id="manifesto" className="space-y-8 reveal-up">
          <div className="inline-block px-4 py-1.5 border-2 border-primary text-primary font-black text-xs uppercase tracking-widest rounded-full">Automação Centrada no Humano</div>
          <h1 className="text-4xl md:text-6xl lg:text-[80px] font-display font-bold leading-[0.9] tracking-tighter">
            ENGENHARIA <br/>
            ENCONTRA A <br/>
            <span className="text-primary italic underline decoration-near-black decoration-[8px] sm:decoration-[12px] underline-offset-4 sm:underline-offset-6">INTUIÇÃO.</span>
          </h1>
          <p className="text-lg md:text-2xl font-medium max-w-4xl text-near-black/70 italic leading-tight">
            Nós conectamos o abismo entre engenharia complexa e intuição humana. 
            Criando produtos digitais que não apenas funcionam — <span className="text-near-black font-bold">eles respiram.</span>
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
             <div className="p-6 border-2 border-near-black rounded-2xl bg-white shadow-brutalist-sm space-y-3 hover:border-primary transition-colors group">
                <h4 className="text-lg font-black uppercase italic tracking-tighter group-hover:text-primary transition-colors">Nossa Missão</h4>
                <p className="text-base text-near-black/60 leading-relaxed font-medium">Democratizar a tecnologia e combater o amadorismo. Damos voz a quem cria fora do padrão, transformando o caos em faturamento real e sustentável.</p>
             </div>
             <div className="p-6 border-2 border-near-black rounded-2xl bg-primary text-white shadow-brutalist-sm space-y-3">
                <h4 className="text-lg font-black uppercase italic tracking-tighter">Personalidade na Engenharia</h4>
                <p className="text-base text-white/80 leading-relaxed font-medium">Software não é neutro. Cada linha de código é uma decisão cultural. Na Monynha, unimos rigor técnico com a sensibilidade necessária para impactar pessoas.</p>
             </div>
          </div>
        </section>

        {/* SOLUTIONS */}
        <section id="solucoes" className="space-y-12">
          <div className="flex items-center gap-6">
            <h2 className="text-3xl md:text-5xl font-display font-bold tracking-tighter uppercase italic">O que fazemos</h2>
            <div className="flex-grow h-0.5 bg-near-black/10"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: 'Expertise Odoo',
                desc: 'Transformando o caos empresarial em clareza sinfônica. Implementações customizadas que empoderam suas pessoas.',
                icon: 'settings_suggest',
                benefits: ['Arquitetura ERP', 'Fluxos Customizados', 'Sincronização de API'],
                subtitle: 'Escalabilidade. Precisão. Intuição.'
              },
              {
                title: 'Software Sob Medida',
                desc: 'Sem templates. Código escrito para resolver seus desafios culturais e técnicos específicos.',
                icon: 'terminal',
                benefits: ['Ferramentas Internas', 'Plataformas Escaláveis', 'Excelência em UX']
              },
              {
                title: 'IA como Colaboradora',
                desc: 'Além do hype. Integramos assistentes inteligentes que entendem contexto e intenção humana.',
                icon: 'psychology',
                benefits: ['Arquiteturas RAG', 'Agentes Autônomos', 'IA Open-source']
              },
              {
                title: 'Presença Digital',
                desc: 'SEO, Branding Digital e Visibilidade para marcas que querem dominar o feed e o mercado.',
                icon: 'campaign',
                benefits: ['SEO Conteúdo', 'Branding Digital', 'Impacto Visual'],
                highlight: true
              }
            ].map((s, i) => (
              <div key={i} className={`group p-8 border-[3px] border-near-black rounded-[32px] transition-all shadow-brutalist hover:translate-y-[-4px] flex flex-col ${s.highlight ? 'bg-near-black text-white shadow-brutalist-purple' : 'bg-white hover:border-primary'}`}>
                <div className={`w-14 h-14 rounded-xl border-2 border-near-black flex items-center justify-center mb-6 shrink-0 ${s.highlight ? 'bg-primary text-white' : 'bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white'}`}>
                  <span className="material-symbols-outlined text-3xl">{s.icon}</span>
                </div>
                {s.subtitle && <p className="text-[10px] xs:text-xs font-black uppercase tracking-[0.2em] sm:tracking-[0.3em] mb-3 text-primary">{s.subtitle}</p>}
                <h3 className={`text-xl sm:text-2xl font-black uppercase italic tracking-tighter mb-4 group-hover:text-primary transition-colors ${s.highlight ? 'text-white' : ''}`}>{s.title}</h3>
                <p className={`text-sm sm:text-base font-medium leading-relaxed mb-6 ${s.highlight ? 'text-white/60' : 'text-near-black/50'}`}>{s.desc}</p>
                <div className="flex flex-wrap gap-2 mt-auto">
                  {s.benefits.map(b => (
                    <span key={b} className={`text-[10px] xs:text-xs font-black uppercase tracking-wider sm:tracking-widest px-2.5 py-1 sm:px-3 sm:py-1.5 border-2 rounded-full ${s.highlight ? 'border-white/20 text-white/40' : 'border-near-black/10 text-near-black/30 group-hover:border-primary/30 group-hover:text-primary/60'}`}>{b}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* STUDIO CREATURES / CRIATURAS DO ESTÚDIO */}
        <section id="criaturas" className="space-y-8">
          <div className="space-y-4">
            <div className="flex items-center gap-6">
              <h2 className="text-3xl md:text-5xl font-display font-bold tracking-tighter uppercase italic">Criaturas do Estúdio</h2>
              <div className="flex-grow h-0.5 bg-near-black/10"></div>
            </div>
            <p className="text-xs sm:text-sm md:text-base font-black uppercase tracking-wider sm:tracking-widest text-primary/60">Nossos produtos estáveis e experimentos do Lab.</p>
            <p className="text-sm sm:text-base md:text-lg font-medium text-near-black/60 leading-relaxed max-w-4xl italic">
              Explore the living ecosystem of Monynha Softwares — from production-ready platforms to experimental lab initiatives. Every creature has a purpose, a soul, and a bit of resistance coded into it.
            </p>
          </div>

          {/* Project Carousel */}
          <ProjectCarousel onViewAll={onViewProjects} />
        </section>

        {/* TEAM / A COLMEIA */}
        <section id="colmeia" className="space-y-12">
          <div className="flex items-center gap-6">
            <h2 className="text-3xl md:text-5xl font-display font-bold tracking-tighter uppercase italic">A Colmeia</h2>
            <div className="flex-grow h-0.5 bg-near-black/10"></div>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {TEAM_MEMBERS.map((m, i) => (
              <button
                type="button"
                key={i}
                onClick={() => setSelectedMember(m)}
                className="bg-white border-2 sm:border-[3px] border-near-black p-6 rounded-[32px] shadow-brutalist-sm hover:translate-y-[-4px] hover:border-primary transition-all group cursor-none active:scale-95 flex flex-col text-left"
              >
                <div className="w-full aspect-square bg-primary/5 border-[1.5px] border-near-black rounded-2xl mb-6 overflow-hidden relative">
                  <img loading="lazy" decoding="async" src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${m.seed}&backgroundColor=c0aede`} alt={m.name} className="w-full h-full object-cover transition-transform group-hover:scale-105" />
                </div>
                <h4 className="text-lg font-black uppercase italic tracking-tighter mb-0.5 group-hover:text-primary transition-colors leading-none">{m.name}</h4>
                <p className="text-[10px] xs:text-xs sm:text-sm font-black uppercase tracking-widest text-primary mb-4">{m.role}</p>
                <p className="text-[11px] font-medium text-near-black/50 leading-tight italic line-clamp-2">"{m.bio}"</p>
                <div className="mt-auto pt-4 border-t border-near-black/5 flex justify-between items-center group-hover:text-primary transition-colors">
                  <span className="text-[10px] xs:text-xs font-black uppercase tracking-widest">Perfil</span>
                  <span className="material-icons text-sm group-hover:translate-x-1 transition-transform" aria-hidden="true">arrow_forward</span>
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* CONTACT / CONTATO */}
        <section id="contato" className="space-y-12">
          <div className="bg-white border-[5px] border-near-black rounded-[48px] p-8 md:p-16 shadow-brutalist">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
              
              {/* Left Content */}
              <div className="flex-grow space-y-6">
                <h2 className="text-3xl md:text-5xl lg:text-6xl font-display font-black uppercase leading-[0.95] tracking-tighter">
                  BORA SIMPLIFICAR O <br/>
                  <span className="text-primary italic">CAOS DIGITAL?</span>
                </h2>
                
                <p className="text-base md:text-lg font-medium text-near-black/60 italic leading-relaxed max-w-xl">
                  Sem pressão, só uma conversa sobre o futuro do seu negócio.
                </p>
                
                <a 
                  href="mailto:hello@monynha.com"
                  className="inline-flex items-center gap-3 text-xl md:text-2xl font-black text-near-black hover:text-primary transition-colors group"
                >
                  <div className="w-12 h-12 bg-primary/10 border-2 border-near-black rounded-xl flex items-center justify-center group-hover:bg-primary group-hover:scale-105 transition-all">
                    <span className="material-symbols-outlined text-2xl text-primary group-hover:text-white">mail</span>
                  </div>
                  <span className="underline decoration-2 underline-offset-4 decoration-primary/30 group-hover:decoration-primary">hello@monynha.com</span>
                </a>
              </div>
              
              {/* Right CTA Buttons */}
              <div className="flex flex-col gap-4 w-full lg:w-auto">
                <button 
                  onClick={onStartWizard}
                  className="group px-8 py-5 bg-near-black text-white font-black text-base md:text-lg uppercase italic tracking-tight rounded-2xl border-[3px] border-primary shadow-[6px_6px_0px_0px_#9767e4] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[3px_3px_0px_0px_#9767e4] transition-all active:scale-95 cursor-none flex items-center justify-center gap-3 whitespace-nowrap"
                >
                  <span>Iniciar Projeto</span>
                  <span className="material-symbols-outlined text-2xl group-hover:translate-x-1 transition-transform">rocket_launch</span>
                </button>
                
                <a 
                  href="https://wa.me/351920128481?text=Olá%20Monynha!%20Gostaria%20de%20conversar%20sobre%20um%20projeto."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group px-8 py-5 bg-[#25D366] text-white font-black text-base md:text-lg uppercase italic tracking-tight rounded-2xl border-[3px] border-near-black shadow-brutalist-sm hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all active:scale-95 cursor-none flex items-center justify-center gap-3 whitespace-nowrap"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 group-hover:scale-110 transition-transform">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  <span>Falar no WhatsApp</span>
                </a>
              </div>
              
            </div>
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="bg-primary text-white p-10 md:p-16 rounded-[60px] border-4 border-near-black shadow-brutalist flex flex-col items-center text-center space-y-10">
          <h3 className="text-4xl md:text-6xl font-display font-bold tracking-tighter leading-none italic">Pronta para <br/> brilhar?</h3>
          <p className="text-lg md:text-2xl font-medium max-w-2xl opacity-80 leading-relaxed italic">Vamos construir algo que importa. Sem pressão de vendas, apenas uma conversa estratégica.</p>
          <div className="flex flex-col sm:flex-row gap-6">
            <button onClick={onStartWizard} className="px-10 py-5 bg-near-black text-white text-xl font-black uppercase italic tracking-tighter rounded-2xl border-2 border-white shadow-[6px_6px_0px_0px_white] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all active:scale-95 cursor-none">Construir com Significado</button>
            <button onClick={onBack} className="px-10 py-5 bg-white text-near-black text-xl font-black uppercase italic tracking-tighter rounded-2xl border-2 border-near-black shadow-brutalist-sm hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all active:scale-95 cursor-none">Voltar ao Início</button>
          </div>
        </section>

      </main>

      <footer className="py-16 bg-[#0B0B10] text-white px-8 overflow-hidden relative">
        <div className="pride-strip absolute bottom-0 left-0"></div>
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row justify-between items-start gap-12">
          <div className="space-y-6">
            <button type="button" className="flex items-center gap-4 group cursor-none text-left" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
              <div className="w-14 h-14 bg-primary border-[3px] border-white rounded-2xl flex items-center justify-center rotate-6 group-hover:rotate-0 transition-transform"><span className="font-display font-bold text-3xl">M</span></div>
              <div>
                <h4 className="text-3xl font-display font-bold tracking-tighter uppercase italic group-hover:text-primary transition-colors">Monynha.</h4>
                <p className="text-[10px] font-black tracking-widest text-primary/60 uppercase">Código com Orgulho & Resistência</p>
              </div>
            </button>
            <p className="max-w-xs text-white/40 text-sm font-medium leading-relaxed italic">Um estúdio de software inclusivo sediado remotamente em Portugal (Remote-first).</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-16 w-full lg:w-auto">
            <div className="space-y-4">
              <h5 className="text-[10px] font-black uppercase tracking-widest text-white/20">Social</h5>
              <ul className="space-y-2.5 text-[11px] font-bold uppercase tracking-widest">
                <li><a href="https://github.com/Monynha-Softwares" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">GitHub Org</a></li>
                <li><a href="https://www.linkedin.com/company/monynha-softwares/" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">LinkedIn</a></li>
              </ul>
            </div>
            <div className="space-y-4">
              <h5 className="text-[10px] font-black uppercase tracking-widest text-white/20">Monynha Ecosystem</h5>
              <p className="text-[10px] xs:text-xs text-white/30 italic font-medium leading-tight max-w-[200px]">Building digital products, platforms, and scalable systems.</p>
              <ul className="space-y-2.5 text-[11px] font-bold uppercase tracking-widest">
                <li>
                  <a 
                    href="https://monynha.fun" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="hover:text-primary transition-all duration-200 inline-block hover:translate-x-1 relative group"
                    aria-label="Visit Monynha Fun - Experimental playground"
                  >
                    <span className="relative">
                      Monynha.fun
                      <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-primary transition-all duration-300 group-hover:w-full"></span>
                    </span>
                  </a>
                </li>
                <li>
                  <a 
                    href="https://boteco.pt" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="hover:text-primary transition-all duration-200 inline-block hover:translate-x-1 relative group"
                    aria-label="Visit Boteco PT - Bar and restaurant platform"
                  >
                    <span className="relative">
                      Boteco.pt
                      <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-primary transition-all duration-300 group-hover:w-full"></span>
                    </span>
                  </a>
                </li>
                <li>
                  <a 
                    href="https://facodi.pt" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="hover:text-primary transition-all duration-200 inline-block hover:translate-x-1 relative group"
                    aria-label="Visit Facodi PT - Studio and training"
                  >
                    <span className="relative">
                      facodi.pt
                      <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-primary transition-all duration-300 group-hover:w-full"></span>
                    </span>
                  </a>
                </li>
                <li>
                  <a 
                    href="https://monynha.online" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="hover:text-primary transition-all duration-200 inline-block hover:translate-x-1 relative group"
                    aria-label="Visit Monynha Online - Main platform"
                  >
                    <span className="relative">
                      Monynha.online
                      <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-primary transition-all duration-300 group-hover:w-full"></span>
                    </span>
                  </a>
                </li>
              </ul>
            </div>
            <div className="space-y-4 hidden md:block">
              <h5 className="text-[10px] font-black uppercase tracking-widest text-white/20">Legal</h5>
              <ul className="space-y-2.5 text-[11px] font-bold uppercase tracking-widest opacity-30">
                <li><button onClick={() => onOpenLegal('privacy')} className="hover:opacity-100 transition-opacity uppercase text-left">Privacidade</button></li>
                <li><button onClick={() => onOpenLegal('terms')} className="hover:opacity-100 transition-opacity uppercase text-left">Termos</button></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="max-w-6xl mx-auto mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 opacity-40">
          <p className="text-[10px] xs:text-xs font-black tracking-[0.5em] uppercase">© {new Date().getFullYear()} Monynha Softwares • Engenharia com personalidade.</p>
          <p className="text-[10px] xs:text-xs font-black tracking-[0.2em] uppercase">Portugal / Remoto</p>
        </div>
      </footer>
    </div>
  );
};

export default AboutSite;
