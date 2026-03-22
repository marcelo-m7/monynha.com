import React, { useState, useEffect } from 'react';
import Landing from './components/Landing';
import Wizard from './components/Wizard';
import LoadingScreen from './components/LoadingScreen';
import Report from './components/Report';
import IntroScene from './components/IntroScene';
import FairyCursor from './components/FairyCursor';
import AboutSite from './components/AboutSite';
import LegalPages from './components/LegalPages';
import ProjectsPage from './components/ProjectsPage';
import { LeadData, DiagnosisResult } from './types';
import { generateDiagnosis, sendDiagnosticEmail, sendContactConfirmation, saveLead } from './services';

export enum AppState {
  INTRO,
  LANDING,
  WIZARD,
  LOADING,
  REPORT,
  ABOUT,
  PROJECTS,
  LEGAL
}

export type LegalType = 'privacy' | 'terms' | 'cookies';
type AboutSection = 'manifesto' | 'impacto' | 'contato';

const VIEW_META: Record<AppState, { title: string; description: string; canonical: string }> = {
  [AppState.INTRO]: {
    title: 'Monynha Softwares | Introdução',
    description: 'Conheça a Monynha Softwares e inicie seu diagnóstico digital estratégico.',
    canonical: 'https://monynha.com/'
  },
  [AppState.LANDING]: {
    title: 'Monynha Softwares | Diagnóstico Digital e Automação',
    description: 'Transforme seu caos em faturamento com diagnóstico digital estratégico e automação centrada no humano.',
    canonical: 'https://monynha.com/'
  },
  [AppState.WIZARD]: {
    title: 'Monynha Softwares | Formulário de Diagnóstico',
    description: 'Responda ao formulário da Monynha Softwares para receber um plano de ação digital personalizado.',
    canonical: 'https://monynha.com/'
  },
  [AppState.LOADING]: {
    title: 'Monynha Softwares | Processando Diagnóstico',
    description: 'Estamos processando seu diagnóstico digital personalizado.',
    canonical: 'https://monynha.com/'
  },
  [AppState.REPORT]: {
    title: 'Monynha Softwares | Relatório de Diagnóstico',
    description: 'Veja o relatório completo do seu diagnóstico com recomendações de crescimento.',
    canonical: 'https://monynha.com/'
  },
  [AppState.ABOUT]: {
    title: 'Monynha Softwares | Sobre',
    description: 'Conheça os laboratórios e a abordagem da Monynha Softwares para produtos digitais.',
    canonical: 'https://monynha.com/sobre'
  },
  [AppState.PROJECTS]: {
    title: 'Monynha Softwares | Criaturas do Estúdio',
    description: 'Explore o ecossistema completo de produtos e experimentos da Monynha Softwares.',
    canonical: 'https://monynha.com/produtos'
  },
  [AppState.LEGAL]: {
    title: 'Monynha Softwares | Políticas Legais',
    description: 'Acesse a política de privacidade, termos de uso e política de cookies.',
    canonical: 'https://monynha.com/privacidade'
  }
};

const parseLocationToState = (pathname: string): { view: AppState; legal?: LegalType; aboutSection?: AboutSection } => {
  const normalized = pathname.toLowerCase();

  if (normalized === '/produtos') {
    return { view: AppState.PROJECTS };
  }

  if (normalized === '/impacto') {
    return { view: AppState.ABOUT, aboutSection: 'impacto' };
  }

  if (normalized === '/contato') {
    return { view: AppState.ABOUT, aboutSection: 'contato' };
  }

  if (normalized === '/sobre') {
    return { view: AppState.ABOUT, aboutSection: 'manifesto' };
  }

  if (normalized === '/termos') {
    return { view: AppState.LEGAL, legal: 'terms' };
  }

  if (normalized === '/cookies') {
    return { view: AppState.LEGAL, legal: 'cookies' };
  }

  if (normalized === '/legal' || normalized === '/privacidade') {
    return { view: AppState.LEGAL, legal: 'privacy' };
  }

  return { view: AppState.INTRO };
};

const getPathFromState = (state: AppState, activeLegal: LegalType, aboutSection: AboutSection): string => {
  if (state === AppState.PROJECTS) return '/produtos';
  if (state === AppState.LEGAL) {
    if (activeLegal === 'terms') return '/termos';
    if (activeLegal === 'cookies') return '/cookies';
    return '/privacidade';
  }
  if (state === AppState.ABOUT) {
    if (aboutSection === 'impacto') return '/impacto';
    if (aboutSection === 'contato') return '/contato';
    return '/sobre';
  }
  return '/';
};

const App: React.FC = () => {
  const [view, setView] = useState<AppState>(AppState.INTRO);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [leadData, setLeadData] = useState<LeadData | null>(null);
  const [diagnosis, setDiagnosis] = useState<DiagnosisResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [activeLegal, setActiveLegal] = useState<LegalType>('privacy');
  const [aboutSection, setAboutSection] = useState<AboutSection>('manifesto');

  useEffect(() => {
    const route = parseLocationToState(window.location.pathname);
    setView(route.view);
    if (route.legal) setActiveLegal(route.legal);
    if (route.aboutSection) setAboutSection(route.aboutSection);

    const handlePopState = () => {
      const popRoute = parseLocationToState(window.location.pathname);
      setView(popRoute.view);
      if (popRoute.legal) setActiveLegal(popRoute.legal);
      if (popRoute.aboutSection) setAboutSection(popRoute.aboutSection);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  useEffect(() => {
    const nextPath = getPathFromState(view, activeLegal, aboutSection);
    if (window.location.pathname !== nextPath) {
      window.history.replaceState({}, '', nextPath);
    }
  }, [view, activeLegal, aboutSection]);

  useEffect(() => {
    const meta = { ...VIEW_META[view] };

    if (view === AppState.ABOUT) {
      meta.canonical = `https://monynha.com${getPathFromState(view, activeLegal, aboutSection)}`;
    }

    if (view === AppState.LEGAL) {
      meta.canonical = `https://monynha.com${getPathFromState(view, activeLegal, aboutSection)}`;
    }

    document.title = meta.title;

    const description = document.querySelector('meta[name="description"]');
    if (description) description.setAttribute('content', meta.description);

    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) canonical.setAttribute('href', meta.canonical);
  }, [view]);

  const transitionTo = (newState: AppState) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setView(newState);
      setIsTransitioning(false);
    }, 600);
  };

  const startWizard = () => {
    setError(null);
    transitionTo(AppState.WIZARD);
  };

  const exploreMonynha = () => {
    setAboutSection('manifesto');
    transitionTo(AppState.ABOUT);
  };

  const finishIntro = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setView(AppState.LANDING);
      setIsTransitioning(false);
    }, 800);
  };

  const handleOpenLegal = (type: LegalType) => {
    setActiveLegal(type);
    transitionTo(AppState.LEGAL);
  };

  const handleWizardComplete = async (data: LeadData) => {
    setLeadData(data);
    setView(AppState.LOADING);

    // ALWAYS send contact confirmation first (fallback mechanism)
    // This guarantees user and team are notified regardless of diagnosis success
    try {
      await sendContactConfirmation(data);
      console.log('✓ Contact confirmation sent successfully');
    } catch (confirmError) {
      console.error('⚠️ Contact confirmation failed:', confirmError);
      // Continue anyway - don't block the diagnosis flow
    }

    try {
      const diagResult = await generateDiagnosis(data);
      setDiagnosis(diagResult);

      const [saveResult, emailResult] = await Promise.allSettled([
        saveLead(data, diagResult),
        sendDiagnosticEmail(data, diagResult),
      ]);

      if (saveResult.status === 'rejected') {
        console.error('Lead persistence failed:', saveResult.reason);
      }

      if (emailResult.status === 'rejected') {
        console.error('Diagnostic email failed:', emailResult.reason);
      }

      setTimeout(() => transitionTo(AppState.REPORT), 3000);
    } catch (err) {
      console.error('Error processing wizard:', err);
      
      // Even if diagnosis fails, user already received confirmation email
      // Show error but acknowledge we captured their contact
      setError('Mona, o diagnóstico automático deu problema, mas já recebemos teu contato e vamos te responder em breve!');
      setView(AppState.WIZARD);
    }
  };

  const handleReset = () => {
    setDiagnosis(null);
    setLeadData(null);
    setError(null);
    transitionTo(AppState.LANDING);
  };

  const handleExploreFromReport = () => {
    setAboutSection('manifesto');
    transitionTo(AppState.ABOUT);
  };

  const handleViewProjects = () => {
    transitionTo(AppState.PROJECTS);
  };

  return (
    <div className="min-h-screen relative selection:bg-primary selection:text-white overflow-hidden">
      <style>{`
        .transition-overlay { position: fixed; inset: 0; background: #9767e4; z-index: 9999; transform: translateY(100%); pointer-events: none; }
        .transition-overlay.active { animation: slide-shutter 1.2s cubic-bezier(0.85, 0, 0.15, 1) forwards; }
        @keyframes slide-shutter { 0% { transform: translateY(100%); } 40%, 60% { transform: translateY(0%); } 100% { transform: translateY(-100%); } }
        @media (prefers-reduced-motion: reduce) {
          .transition-overlay.active { animation: none; transform: translateY(-100%); }
        }
      `}</style>

      <div className={`transition-overlay ${isTransitioning ? 'active' : ''}`} aria-hidden="true" />
      <FairyCursor />

      <main id="main-content">
        {view === AppState.INTRO && (
          <div className="relative">
            <IntroScene onComplete={finishIntro} />
            <button
              onClick={finishIntro}
              className="fixed top-8 right-8 z-[120] px-6 py-2 border-2 border-white/20 text-white/40 hover:text-white hover:border-white transition-all text-xs font-black uppercase tracking-widest rounded-full bg-black/20 backdrop-blur-md focus-visible:ring-2 focus-visible:ring-white"
            >
              Pular Intro
            </button>
          </div>
        )}

        {view === AppState.LANDING && <Landing onStart={startWizard} onExplore={exploreMonynha} />}
        {view === AppState.ABOUT && <AboutSite onBack={() => transitionTo(AppState.LANDING)} onStartWizard={startWizard} onOpenLegal={handleOpenLegal} onViewProjects={handleViewProjects} initialSection={aboutSection} onSectionNavigate={setAboutSection} />}
        {view === AppState.PROJECTS && <ProjectsPage onBack={() => transitionTo(AppState.ABOUT)} onStartWizard={startWizard} />}
        {view === AppState.WIZARD && <Wizard onComplete={handleWizardComplete} onCancel={handleReset} error={error} />}
        {view === AppState.LOADING && <LoadingScreen isDone={!!diagnosis} />}
        {view === AppState.REPORT && diagnosis && <Report diagnosis={diagnosis} onReset={handleReset} onExplore={handleExploreFromReport} />}
        {view === AppState.LEGAL && <LegalPages type={activeLegal} onBack={() => transitionTo(AppState.ABOUT)} />}
      </main>
    </div>
  );
};

export default App;
