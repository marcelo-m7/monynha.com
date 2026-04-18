import React from 'react';
import { motion } from 'framer-motion';

interface PartnerCardProps {
  name: string;
  category: string;
  description: string;
  logo: string;
  logoAlt: string;
}

export const PartnerCard: React.FC<PartnerCardProps> = ({
  name,
  category,
  description,
  logo,
  logoAlt,
}) => {
  return (
    <motion.div
      whileHover={{ y: -10 }}
      className="p-8 border-4 border-white bg-white/5 backdrop-blur-md flex flex-col justify-between min-h-[400px]"
    >
      <div>
        <div className="flex justify-between items-start mb-10">
          <span className="text-[10px] font-black tracking-[0.3em] uppercase px-3 py-1 bg-brand-violet">
            {category}
          </span>
        </div>

        <div className="h-20 mb-10 flex items-center">
          <img
            src={logo}
            alt={logoAlt?.trim() || `${name} logo`}
            loading="lazy"
            decoding="async"
            className="max-h-full max-w-full object-contain"
          />
        </div>

        <h3 className="text-4xl font-black tracking-tighter uppercase mb-4 font-display">{name}</h3>
        <p className="text-slate-400 font-medium">{description}</p>
      </div>
    </motion.div>
  );
};
