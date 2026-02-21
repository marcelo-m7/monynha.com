
import React, { useEffect, useState } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Logo } from './components/Logo';
import { motion, AnimatePresence } from 'framer-motion';

// Views
import { HomeView } from './views/HomeView';
import { SolutionsView } from './views/SolutionsView';
import { LabsView } from './views/LabsView';
import { OpenSourceView } from './views/OpenSourceView';
import { ContactView } from './views/ContactView';

export type Page = 'home' | 'solutions' | 'labs' | 'open-source' | 'contact';

const App: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentPage, setCurrentPage] = useState<Page>('home');

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 2500); 
    return () => clearTimeout(timer);
  }, []);

  const handleSetPage = (page: Page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home': return <HomeView onNavigate={handleSetPage} />;
      case 'solutions': return <SolutionsView onNavigate={handleSetPage} />;
      case 'labs': return <LabsView onNavigate={handleSetPage} />;
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
            initial={{ opacity: 1 }}
            exit={{ 
              opacity: 0,
              scale: 1.1,
              filter: "blur(20px)",
              transition: { duration: 0.8, ease: "easeInOut" }
            }}
            className="fixed inset-0 z-[100] bg-brand-black flex flex-col items-center justify-center"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center gap-12"
            >
              <Logo size="xl" animate={true} />
              <div className="flex flex-col items-center gap-2">
                <motion.p 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                  className="font-display font-black text-4xl uppercase tracking-[0.4em]"
                >
                  Monynha
                </motion.p>
                <motion.div 
                   initial={{ width: 0 }}
                   animate={{ width: "100%" }}
                   transition={{ delay: 0.8, duration: 1.2, ease: "circOut" }}
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
