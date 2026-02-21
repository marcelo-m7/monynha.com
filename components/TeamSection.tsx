
import React from 'react';
import { motion } from 'framer-motion';
import marceloHeadshot from '../assets/marcelo.jpg';
import tercioHeadshot from '../assets/tercio.jpg';

export const TeamSection: React.FC = () => {
  const placeholderAvatar = "data:image/svg+xml;utf8,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20400%20400'%3E%3Crect%20width='400'%20height='400'%20fill='%230c0c0c'/%3E%3Ccircle%20cx='200'%20cy='150'%20r='80'%20fill='%232a2a2a'/%3E%3Cpath%20d='M80%20360c20-90%2080-130%20120-130s100%2040%20120%20130'%20fill='%232a2a2a'/%3E%3C/svg%3E";
  const team = [
    {
      name: "Marcelo Santos",
      role: "Founder · Software Engineer",
      image: marceloHeadshot,
      bio: "Focuses on automation, applied AI, and full-stack development. Marcelo combines technical depth with a product-oriented mindset.",
      links: [
        { label: "LinkedIn", url: "https://www.linkedin.com/in/marcelo-m7/" },
        { label: "GitHub", url: "https://github.com/marcelo-m7" }
      ]
    },
    {
      name: "Tércio Barreto",
      role: "Collaborator · Strategy",
      image: tercioHeadshot,
      bio: "Brings experience in technology strategy and systems thinking, aligning technology with real-world business needs.",
      links: [
        { label: "LinkedIn", url: "https://www.linkedin.com/in/t%C3%A9rcio-barreto-40a840120/" }
      ]
    }
  ];

  return (
    <section className="bg-brand-black py-32 px-6 border-b-4 border-white">
      <div className="max-w-[1600px] mx-auto">
        <div className="flex flex-col mb-24">
          <span className="text-xs font-black tracking-[0.5em] uppercase text-brand-violet mb-6">The Humans</span>
          <h2 className="text-6xl md:text-8xl font-black tracking-tighter uppercase font-display">Engineering <br />Personality</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-1 bg-white border-4 border-white">
          {team.map((member, i) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: i * 0.2 }}
              viewport={{ once: true }}
              className="bg-brand-black p-8 md:p-16 group hover:bg-brand-violet transition-colors duration-500 flex flex-col lg:flex-row gap-12"
            >
              {/* Headshot container */}
              <div className="relative w-full lg:w-48 h-64 lg:h-48 shrink-0 overflow-hidden border-4 border-white group-hover:border-black transition-colors">
                <motion.img 
                  src={member.image} 
                  alt={`${member.name} headshot`}
                  loading="lazy"
                  onError={(event) => {
                    const target = event.currentTarget;
                    if (target.dataset.fallbackApplied) {
                      return;
                    }
                    target.dataset.fallbackApplied = "true";
                    target.src = placeholderAvatar;
                  }}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-brand-violet/20 mix-blend-multiply group-hover:bg-transparent transition-colors" />
              </div>

              <div className="flex flex-col justify-between h-full flex-grow">
                <div>
                  <h3 className="text-4xl font-black tracking-tighter uppercase mb-2 font-display group-hover:text-black transition-colors">{member.name}</h3>
                  <p className="text-xs font-black tracking-widest uppercase text-brand-violet mb-8 group-hover:text-white transition-colors">{member.role}</p>
                  <p className="text-xl text-slate-400 group-hover:text-black/80 mb-12 leading-relaxed transition-colors">{member.bio}</p>
                </div>
                
                <div className="flex flex-wrap gap-6 mt-auto">
                  {member.links.map(link => (
                    <a 
                      key={link.label}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 text-xs font-black tracking-[0.2em] uppercase group-hover:text-black hover:opacity-70 transition-all"
                    >
                      {link.label === "LinkedIn" && (
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                        </svg>
                      )}
                      {link.label === "GitHub" && (
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                        </svg>
                      )}
                      <span className="underline underline-offset-8">{link.label}</span>
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
