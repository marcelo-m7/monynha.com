import React, { useEffect, useRef, useState } from 'react';
import { PROJECTS } from './ProjectsPage';

interface ProjectCarouselProps {
  onViewAll: () => void;
}

const statusLabels = {
  production: { text: 'Production', color: 'bg-primary text-white border-near-black' },
  experimental: { text: 'Experimental', color: 'bg-[#F59E0B] text-white border-near-black' },
  lab: { text: 'Lab', color: 'bg-[#667EEA] text-white border-near-black' }
};

const ProjectCarousel: React.FC<ProjectCarouselProps> = ({ onViewAll }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const holdScrollRef = useRef<number | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const animationRef = useRef<number>();

  // Auto-scroll animation
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container || isHovered) return;

    const scroll = () => {
      if (container.scrollLeft >= container.scrollWidth - container.clientWidth) {
        // Reset to start when reaching the end
        container.scrollLeft = 0;
      } else {
        container.scrollLeft += 0.5; // Gentle scroll speed
      }
      animationRef.current = requestAnimationFrame(scroll);
    };

    animationRef.current = requestAnimationFrame(scroll);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isHovered]);

  // Update scroll button states
  const updateScrollButtons = () => {
    const container = scrollContainerRef.current;
    if (!container) return;

    setCanScrollLeft(container.scrollLeft > 0);
    setCanScrollRight(
      container.scrollLeft < container.scrollWidth - container.clientWidth - 10
    );
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    container.addEventListener('scroll', updateScrollButtons);
    updateScrollButtons();

    return () => container.removeEventListener('scroll', updateScrollButtons);
  }, []);

  useEffect(() => {
    return () => {
      if (holdScrollRef.current !== null) {
        window.clearInterval(holdScrollRef.current);
        holdScrollRef.current = null;
      }
    };
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const scrollAmount = container.clientWidth * 0.8;
    const targetScroll = container.scrollLeft + (direction === 'left' ? -scrollAmount : scrollAmount);
    
    container.scrollTo({
      left: targetScroll,
      behavior: 'smooth'
    });
  };

  const startHoldScroll = (direction: 'left' | 'right') => {
    const container = scrollContainerRef.current;
    if (!container) return;

    if (holdScrollRef.current !== null) {
      window.clearInterval(holdScrollRef.current);
    }

    const step = direction === 'left' ? -80 : 80;
    holdScrollRef.current = window.setInterval(() => {
      container.scrollBy({ left: step, top: 0, behavior: 'auto' });
    }, 16);
  };

  const stopHoldScroll = () => {
    if (holdScrollRef.current !== null) {
      window.clearInterval(holdScrollRef.current);
      holdScrollRef.current = null;
    }
  };

  return (
    <div className="space-y-8">
      {/* Header with Navigation */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <h3 className="text-2xl md:text-3xl font-display font-black uppercase italic tracking-tighter">
            Nossas Criaturas
          </h3>
          <div className="h-px flex-grow bg-near-black/10 hidden sm:block"></div>
        </div>
        
        <div className="flex items-center gap-3">
          {/* Navigation Buttons */}
          <button
            type="button"
            onClick={() => scroll('left')}
            onPointerDown={() => startHoldScroll('left')}
            onPointerUp={stopHoldScroll}
            onPointerLeave={stopHoldScroll}
            onPointerCancel={stopHoldScroll}
            disabled={!canScrollLeft}
            aria-label="Scroll carousel left"
            className={`w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-xl border-[3px] border-near-black shadow-brutalist-sm transition-all cursor-none ${
              canScrollLeft
                ? 'bg-white hover:bg-near-black hover:text-white active:scale-95'
                : 'bg-near-black/5 text-near-black/20 cursor-not-allowed'
            }`}
          >
            <span className="material-symbols-outlined text-xl leading-none" aria-hidden="true">chevron_left</span>
          </button>
          
          <button
            type="button"
            onClick={() => scroll('right')}
            onPointerDown={() => startHoldScroll('right')}
            onPointerUp={stopHoldScroll}
            onPointerLeave={stopHoldScroll}
            onPointerCancel={stopHoldScroll}
            disabled={!canScrollRight}
            aria-label="Scroll carousel right"
            className={`w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-xl border-[3px] border-near-black shadow-brutalist-sm transition-all cursor-none ${
              canScrollRight
                ? 'bg-white hover:bg-near-black hover:text-white active:scale-95'
                : 'bg-near-black/5 text-near-black/20 cursor-not-allowed'
            }`}
          >
            <span className="material-symbols-outlined text-xl leading-none" aria-hidden="true">chevron_right</span>
          </button>

          {/* View All Button */}
          <button
            onClick={onViewAll}
            className="hidden sm:flex items-center gap-2 px-4 py-2 bg-primary text-white border-[3px] border-near-black rounded-xl font-black text-xs uppercase tracking-wider shadow-brutalist-sm hover:translate-y-[-2px] transition-all cursor-none"
          >
            <span>Ver Todos</span>
            <span className="material-symbols-outlined text-base">grid_view</span>
          </button>
        </div>
      </div>

      {/* Carousel Container */}
      <div 
        ref={scrollContainerRef}
        role="region"
        aria-label="Carrossel de projetos"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="flex gap-6 overflow-x-auto hide-scrollbar scroll-smooth pb-4"
        style={{ 
          WebkitOverflowScrolling: 'touch'
        }}
      >
        {PROJECTS.map((project) => (
          <div
            key={project.id}
            className="flex-shrink-0 w-[320px] sm:w-[380px] group"
          >
            {/* Project Card */}
            <div className="h-full bg-white border-[3px] border-near-black rounded-[28px] p-6 shadow-brutalist hover:translate-y-[-4px] transition-all flex flex-col">
              {/* Icon & Status */}
              <div className="flex items-start justify-between mb-4">
                <div 
                  className={`w-14 h-14 sm:w-16 sm:h-16 rounded-xl border-2 border-near-black bg-gradient-to-br ${project.gradient} flex items-center justify-center group-hover:scale-105 transition-transform`}
                >
                  <span className="material-symbols-outlined text-3xl sm:text-4xl text-white">{project.icon}</span>
                </div>
                
                <span className={`px-2 py-1 ${statusLabels[project.status].color} text-[9px] font-black uppercase tracking-widest rounded-full border-2`}>
                  {statusLabels[project.status].text}
                </span>
              </div>

              {/* Content */}
              <div className="flex-grow space-y-3">
                <div>
                  <h4 className="text-2xl font-display font-black uppercase italic tracking-tighter group-hover:text-primary transition-colors leading-none">
                    {project.title}
                  </h4>
                  <p className="text-xs font-black uppercase tracking-widest mt-1" style={{ color: project.color }}>
                    {project.subtitle}
                  </p>
                </div>
                
                <p className="text-sm font-medium text-near-black/60 leading-relaxed line-clamp-3">
                  {project.description}
                </p>
                
                {/* Tags */}
                <div className="flex flex-wrap gap-2 pt-2">
                  {project.tags.slice(0, 3).map((tag, i) => (
                    <span 
                      key={i}
                      className="px-2 py-1 bg-near-black/5 border border-near-black/10 rounded text-[10px] font-black uppercase tracking-wider text-near-black/40"
                    >
                      {tag}
                    </span>
                  ))}
                  {project.tags.length > 3 && (
                    <span className="px-2 py-1 text-[10px] font-black uppercase text-near-black/30">
                      +{project.tags.length - 3}
                    </span>
                  )}
                </div>
              </div>

              {/* Action Button */}
              <a 
                href={project.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center justify-center gap-2 px-5 py-3 text-white font-black text-xs uppercase tracking-widest rounded-xl border-[3px] border-near-black shadow-brutalist-sm hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all cursor-none group/btn"
                style={{ backgroundColor: project.color }}
              >
                <span>Explorar</span>
                <span className="material-symbols-outlined text-base group-hover/btn:translate-x-1 transition-transform">arrow_forward</span>
              </a>
            </div>
          </div>
        ))}

        {/* View All Card (Mobile) */}
        <div className="flex-shrink-0 w-[320px] sm:hidden">
          <button
            onClick={onViewAll}
            className="h-full w-full bg-primary text-white border-[3px] border-near-black rounded-[28px] p-6 shadow-brutalist hover:translate-y-[-4px] transition-all flex flex-col items-center justify-center gap-4 text-center cursor-none"
          >
            <div className="w-16 h-16 rounded-xl border-2 border-white bg-white/10 flex items-center justify-center">
              <span className="material-symbols-outlined text-4xl">grid_view</span>
            </div>
            <div className="space-y-2">
              <h4 className="text-2xl font-display font-black uppercase italic">Ver Todos</h4>
              <p className="text-sm font-medium opacity-90">Explore nosso ecossistema completo</p>
            </div>
            <span className="material-symbols-outlined text-2xl">arrow_forward</span>
          </button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="flex justify-center gap-2 sm:hidden">
        {PROJECTS.map((_, index) => (
          <div 
            key={index} 
            className="w-2 h-2 rounded-full bg-near-black/20"
          />
        ))}
      </div>
    </div>
  );
};

export default ProjectCarousel;
