import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { Page } from '../App';
import { Logo } from './Logo';

interface NavbarProps {
  currentPage: Page;
  setPage: (page: Page) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPage, setPage }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems: { label: string; value: Page }[] = [
    { label: 'Home', value: 'home' },
    { label: 'Solutions', value: 'solutions' },
    { label: 'Labs', value: 'labs' },
    { label: 'Open Source', value: 'open-source' },
  ];

  // Lock body scroll when menu is open to prevent background movement
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024 && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.touchAction = 'none'; // Prevent pull-to-refresh on mobile
    } else {
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
    }

    window.addEventListener('resize', handleResize);
    return () => {
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
      window.removeEventListener('resize', handleResize);
    };
  }, [isMenuOpen]);

  const handleNavClick = useCallback((page: Page) => {
    setPage(page);
    setIsMenuOpen(false);
  }, [setPage]);

  const toggleMenu = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    setIsMenuOpen(prev => !prev);
  }, []);

  // Explicitly typing menuVariants to fix "Type 'number[]' is not assignable to type 'Easing | Easing[]'" for the 'ease' property
  const menuVariants: Variants = {
    closed: {
      opacity: 0,
      y: "-100%",
      transition: {
        duration: 0.4,
        ease: [0.32, 0, 0.67, 0], // Accelerated ease-in
        when: "afterChildren"
      }
    },
    open: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 200,
        mass: 1,
        when: "beforeChildren",
        staggerChildren: 0.08
      }
    }
  };

  // Explicitly typing itemVariants to fix "Type 'string' is not assignable to type 'AnimationGeneratorType'" for the 'type' property
  const itemVariants: Variants = {
    closed: { opacity: 0, y: 30, scale: 0.95 },
    open: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: {
        type: "spring",
        damping: 20,
        stiffness: 100
      }
    }
  };

  return (
    <>
      <nav className="sticky top-0 z-[60] bg-brand-black/90 backdrop-blur-xl border-b-4 border-white">
        <div className="max-w-[1920px] mx-auto px-6 py-5 flex items-center justify-between">
          <div 
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-4 cursor-pointer group select-none"
          >
            <motion.div
              whileHover={{ rotate: 10, scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: "spring", stiffness: 400, damping: 15 }}
            >
              <Logo size="md" />
            </motion.div>
            <span className="text-2xl font-black tracking-tighter uppercase font-display group-hover:text-brand-violet transition-colors">
              Monynha
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-10">
            {navItems.map((item) => (
              <button
                key={item.value}
                onClick={() => handleNavClick(item.value)}
                className={`text-xs font-black tracking-[0.2em] uppercase transition-colors relative group ${
                  currentPage === item.value ? 'text-brand-violet' : 'hover:text-brand-violet'
                }`}
              >
                {item.label}
                <motion.span 
                  className="absolute -bottom-1 left-0 h-0.5 bg-brand-violet"
                  initial={false}
                  animate={{ width: currentPage === item.value ? '100%' : '0%' }}
                  transition={{ duration: 0.3 }}
                />
              </button>
            ))}
            <motion.button
              whileHover={{ scale: 1.05, backgroundColor: '#8b5cf6', color: '#ffffff' }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleNavClick('contact')}
              className={`px-8 py-3 font-black text-xs tracking-widest uppercase transition-all border-2 border-white ${
                currentPage === 'contact' ? 'bg-brand-violet text-white border-brand-violet' : 'bg-white text-black'
              }`}
            >
              Build with us
            </motion.button>
          </div>

          {/* Mobile Menu Toggle - Larger hit area for reliable taps */}
          <div className="lg:hidden flex items-center h-full">
            <button 
              onClick={toggleMenu}
              className="w-14 h-14 border-2 border-white flex flex-col items-center justify-center gap-1.5 hover:bg-white hover:text-black transition-all z-[70] active:scale-90 touch-none"
              aria-label={isMenuOpen ? "Close Menu" : "Open Menu"}
            >
              <motion.span 
                animate={isMenuOpen ? { rotate: 45, y: 7.5 } : { rotate: 0, y: 0 }}
                className="w-7 h-0.5 bg-current block origin-center transition-transform"
              ></motion.span>
              <motion.span 
                animate={isMenuOpen ? { opacity: 0, x: -15 } : { opacity: 1, x: 0 }}
                className="w-7 h-0.5 bg-current block transition-all"
              ></motion.span>
              <motion.span 
                animate={isMenuOpen ? { rotate: -45, y: -7.5 } : { rotate: 0, y: 0 }}
                className="w-7 h-0.5 bg-current block origin-center transition-transform"
              ></motion.span>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            className="fixed inset-0 z-[55] bg-brand-black flex flex-col overflow-hidden"
          >
            {/* Clickable Background Overlay to close when tapping empty spaces */}
            <div 
              className="absolute inset-0 z-0 pointer-events-auto"
              onClick={() => setIsMenuOpen(false)}
            />

            {/* Background Accent */}
            <div className="absolute top-0 right-0 w-full h-full bg-brand-violet/5 [clip-path:polygon(100%_0,0_0,100%_100%)] pointer-events-none" />
            
            <div className="relative z-10 flex flex-col justify-between h-full pt-32 pb-12 px-8">
              <div className="flex flex-col gap-10">
                <motion.span 
                  variants={itemVariants}
                  className="text-xs font-black tracking-[0.6em] uppercase text-white/30 select-none"
                >
                  Systems / Menu
                </motion.span>
                <ul className="flex flex-col gap-6">
                  {navItems.map((item) => (
                    <motion.li key={item.value} variants={itemVariants}>
                      <button
                        onClick={() => handleNavClick(item.value)}
                        className={`text-5xl sm:text-7xl font-black tracking-tighter uppercase font-display text-left transition-all active:scale-95 ${
                          currentPage === item.value ? 'text-brand-violet' : 'text-white active:text-brand-violet'
                        }`}
                      >
                        {item.label}
                      </button>
                    </motion.li>
                  ))}
                </ul>
              </div>

              <motion.div variants={itemVariants} className="mt-12 flex flex-col gap-8">
                <button
                  onClick={() => handleNavClick('contact')}
                  className="w-full py-8 border-4 border-white bg-white text-black font-black text-2xl tracking-widest uppercase active:bg-brand-violet active:text-white transition-all active:scale-95 shadow-[0_0_30px_rgba(255,255,255,0.1)]"
                >
                  Build with us
                </button>
                
                <div className="grid grid-cols-2 gap-8 pt-4 border-t-2 border-white/10">
                  <div className="flex flex-col gap-2">
                    <span className="text-[10px] font-black uppercase text-white/20 tracking-widest">Connect</span>
                    <a href="https://github.com/Monynha-Softwares" target="_blank" rel="noreferrer" className="text-xs font-black tracking-widest uppercase text-white/60 hover:text-white transition-colors">GitHub</a>
                  </div>
                  <div className="flex flex-col gap-2">
                    <span className="text-[10px] font-black uppercase text-white/20 tracking-widest">Signal</span>
                    <a href="mailto:hello@monynha.com" className="text-xs font-black tracking-widest uppercase text-white/60 hover:text-white transition-colors">Email</a>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};