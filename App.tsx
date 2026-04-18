
import React, { useEffect, useState } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Logo } from './components/Logo';
import { motion, AnimatePresence } from 'framer-motion';

// Views
import { HomeView } from './views/HomeView';
import { SolutionsView } from './views/SolutionsView';
import { PartnershipsView } from './views/PartnershipsView';
import { OpenSourceView } from './views/OpenSourceView';
import { ContactView } from './views/ContactView';

export type Page = 'home' | 'solutions' | 'partnerships' | 'open-source' | 'contact';

export const PAGE_PATHS: Record<Page, string> = {
  home: '/',
  solutions: '/solutions',
  partnerships: '/partnerships',
  'open-source': '/open-source',
  contact: '/contact',
};

const PATH_PAGES: Record<string, Page> = {
  '/': 'home',
  '/solutions': 'solutions',
  '/partnerships': 'partnerships',
  '/open-source': 'open-source',
  '/contact': 'contact',
};

const getPageFromPathname = (pathname: string): Page => {
  const normalized = pathname !== '/' && pathname.endsWith('/') ? pathname.slice(0, -1) : pathname;
  return PATH_PAGES[normalized] || 'home';
};

const App: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    
    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };
    
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 2500); 
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const updatePageFromUrl = () => {
      setCurrentPage(getPageFromPathname(window.location.pathname));
    };

    updatePageFromUrl();
    window.addEventListener('popstate', updatePageFromUrl);

    return () => {
      window.removeEventListener('popstate', updatePageFromUrl);
    };
  }, []);

  const handleSetPage = (page: Page) => {
    setCurrentPage(page);
    const targetPath = PAGE_PATHS[page];
    if (window.location.pathname !== targetPath) {
      window.history.pushState({ page }, '', targetPath);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home': return <HomeView onNavigate={handleSetPage} />;
      case 'solutions': return <SolutionsView onNavigate={handleSetPage} />;
      case 'partnerships': return <PartnershipsView onNavigate={handleSetPage} />;
      case 'open-source': return <OpenSourceView onNavigate={handleSetPage} />;
      case 'contact': return <ContactView />;
      default: return <HomeView onNavigate={handleSetPage} />;
    }
  };

  return (
    <div className="min-h-screen bg-brand-black text-white selection:bg-brand-violet selection:text-white">
      <AnimatePresence>
        {!isLoaded && (
          <motion.div
            key="loader"
            initial={{ opacity: prefersReducedMotion ? 0 : 1 }}
            exit={{ 
              opacity: 0,
              scale: prefersReducedMotion ? 1 : 1.1,
              filter: prefersReducedMotion ? "none" : "blur(20px)",
              transition: { duration: prefersReducedMotion ? 0.1 : 0.8, ease: "easeInOut" }
            }}
            className="fixed inset-0 z-[100] bg-brand-black flex flex-col items-center justify-center"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.5 }}
              className="flex flex-col items-center gap-12"
            >
              <Logo size="xl" animate={!prefersReducedMotion} />
              <div className="flex flex-col items-center gap-2">
                <motion.p 
                  initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: prefersReducedMotion ? 0 : 0.5, duration: prefersReducedMotion ? 0 : 0.8 }}
                  className="font-display font-black text-4xl uppercase tracking-[0.4em]"
                >
                  Open2
                </motion.p>
                <motion.div 
                   initial={{ width: prefersReducedMotion ? "100%" : 0 }}
                   animate={{ width: "100%" }}
                   transition={{ delay: prefersReducedMotion ? 0 : 0.8, duration: prefersReducedMotion ? 0 : 1.2, ease: "circOut" }}
                   className="h-1 bg-gradient-to-r from-brand-violet to-brand-blue"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Navbar currentPage={currentPage} setPage={handleSetPage} />
      
      <main className="relative z-10 overflow-x-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            {renderPage()}
          </motion.div>
        </AnimatePresence>
      </main>

      <Footer setPage={handleSetPage} />
    </div>
  );
};

export default App;
