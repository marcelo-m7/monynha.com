import React from 'react';
import { products } from '../content/siteContent';

interface ProjectCarouselProps {
  onViewAll: () => void;
}

const ProjectCarousel: React.FC<ProjectCarouselProps> = ({ onViewAll }) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-primary font-black">Prévia</p>
          <h3 className="text-2xl md:text-3xl font-display font-black tracking-tighter">Produtos e projetos em destaque</h3>
        </div>
        <button onClick={onViewAll} className="px-4 py-2 rounded-xl bg-primary text-white border-2 border-near-black font-black shadow-brutalist-sm">Ver todos</button>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {products.slice(0, 3).map((product) => (
          <article key={product.id} className="rounded-[1.5rem] border-[3px] border-near-black bg-white p-5 shadow-brutalist-sm">
            <div className="flex items-center justify-between gap-3">
              <h4 className="text-xl font-black tracking-tight">{product.name}</h4>
              <span className="text-[10px] uppercase tracking-[0.2em] text-primary font-black">{product.status}</span>
            </div>
            <p className="mt-3 text-near-black/70">{product.short}</p>
          </article>
        ))}
      </div>
    </div>
  );
};

export default ProjectCarousel;
