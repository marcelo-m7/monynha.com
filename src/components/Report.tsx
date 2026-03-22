import React, { useEffect, useState } from 'react';
import { DiagnosisResult } from '../types';

interface ReportProps {
  diagnosis: DiagnosisResult;
  onReset: () => void;
  onExplore: () => void;
}

const OFFICIAL_LINKS = {
  instagram: 'https://www.instagram.com/marcelo.santos.027/',
  linkedin: 'https://www.linkedin.com/in/marcelo-m7/',
  whatsapp: 'https://wa.me/41779688872',
  website: 'https://monynha.com',
  facodi: 'https://facodi.pt'
};

const Report: React.FC<ReportProps> = ({ diagnosis, onReset, onExplore }) => {
  const [showConfetti, setShowConfetti] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setShowConfetti(true);
    const timer = setTimeout(() => setShowConfetti(false), 6000);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    return () => clearTimeout(timer);
  }, []);

  const openWhatsApp = () => {
    const text = `Mona, acabei de fazer meu diagnóstico na Monynha Softwares! 💅\n\nMeu close estratégico foi: "${diagnosis.title}"\n\nBora transformar meu perrengue em faturamento e organizar esse babado?`;
    window.open(`${OFFICIAL_LINKS.whatsapp}?text=${encodeURIComponent(text)}`, '_blank');
  };

  const copyDiagnosis = async () => {
    const textToCopy = `✨ DIAGNÓSTICO MONYNHA SOFTWARES ✨\n\nClose: ${diagnosis.title}\n\n${diagnosis.description}\n\nFaça o seu em: monynha.com`;
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Erro ao copiar:', err);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFAFC] py-8 sm:py-12 px-4 sm:px-6 font-body">
      {/* Confetti Elements */}
      {showConfetti && [...Array(40)].map((_, i) => (
        <div 
          key={i} 
          className="confetti" 
          style={{ 
            left: `${Math.random() * 100}vw`, 
            animationDelay: `${Math.random() * 3}s`,
            backgroundColor: ['#9767e4', '#FF0080', '#00E5FF', '#FFD600', '#76FF03', '#FFFFFF'][Math.floor(Math.random() * 6)]
          }} 
        />
      ))}

      <nav className="w-full max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-6 mb-12 sm:mb-16 relative no-print">
        <button type="button" className="flex items-center gap-3 sm:gap-4 group cursor-none text-left" onClick={onReset}>
          <div className="w-12 h-12 sm:w-16 sm:h-16 bg-primary border-[3px] sm:border-4 border-near-black rounded-xl sm:rounded-2xl flex items-center justify-center shadow-brutalist transition-transform group-hover:scale-105">
            <span className="text-white font-black text-2xl sm:text-4xl">M</span>
          </div>
          <div className="flex flex-col">
             <span className="text-2xl sm:text-3xl font-black tracking-tighter uppercase italic leading-none">Monynha.</span>
             <span className="text-[10px] sm:text-xs font-black uppercase tracking-[0.2em] sm:tracking-[0.3em] text-primary mt-1">Diagnóstico Estratégico</span>
          </div>
        </button>
        <button 
          onClick={onReset}
          className="w-full sm:w-auto group relative px-8 py-4 sm:px-10 sm:py-5 border-[3px] sm:border-4 border-near-black font-black text-xs sm:text-sm uppercase tracking-widest hover:bg-near-black hover:text-white transition-all rounded-xl sm:rounded-2xl shadow-brutalist-sm overflow-hidden cursor-none"
        >
          <span className="relative z-10">Novo Diagnóstico</span>
        </button>
      </nav>

      <div className="max-w-4xl mx-auto mb-8 sm:mb-12 animate-in slide-in-from-top duration-700">
        <div className="bg-primary/10 border-[3px] sm:border-[4px] border-primary p-4 sm:p-6 rounded-2xl sm:rounded-3xl flex items-center gap-4 sm:gap-6 shadow-brutalist-sm">
          <div className="w-12 h-12 sm:w-16 sm:h-16 bg-primary text-white rounded-xl sm:rounded-2xl flex items-center justify-center shrink-0">
            <span className="material-icons text-2xl sm:text-4xl" aria-hidden="true">mail_lock</span>
          </div>
          <div>
            <h4 className="text-lg sm:text-xl font-black uppercase tracking-tight text-primary">Mensagem recebida!</h4>
            <p className="text-sm sm:text-near-black/70 font-bold italic">Enviamos uma confirmação no teu e-mail. Nossa equipe retorna em até 48h úteis.</p>
          </div>
        </div>
      </div>

      <main className="max-w-6xl mx-auto space-y-16 sm:space-y-24 animate-in fade-in zoom-in-95 duration-1000 print-container">
        <header className="space-y-8 sm:space-y-10 text-center md:text-left relative">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="inline-block px-6 py-2 sm:px-8 sm:py-3 border-[3px] sm:border-4 border-near-black bg-near-black text-white rounded-full font-black text-xs sm:text-sm uppercase tracking-widest rotate-[-1.5deg] shadow-brutalist-sm">
              Diagnóstico Completo
            </div>
          </div>

          <h1 className="text-4xl xs:text-5xl md:text-[100px] lg:text-[120px] font-display font-black leading-[0.9] sm:leading-[0.85] tracking-tighter text-near-black">
            Pronto, mona. <br/>
            <span className="text-primary italic underline decoration-near-black decoration-4 sm:decoration-8 md:decoration-[14px] underline-offset-4 sm:underline-offset-[18px]">Segura o close.</span>
          </h1>

          <div className="relative group mt-8 sm:mt-12 md:mt-16">
            <div className="absolute inset-0 bg-primary opacity-10 blur-[100px] group-hover:opacity-20 transition-opacity no-print"></div>
            <div className="relative border-[3px] sm:border-[4px] md:border-[6px] border-near-black p-6 sm:p-8 md:p-16 lg:p-24 rounded-2xl sm:rounded-[30px] md:rounded-[50px] lg:rounded-[70px] bg-white shadow-brutalist transition-all duration-500">
              <div className="flex flex-col md:flex-row items-center md:items-start gap-6 sm:gap-8 md:gap-10 lg:gap-14">
                <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 lg:w-36 lg:h-36 shrink-0 bg-primary rounded-2xl sm:rounded-3xl md:rounded-[35px] lg:rounded-[40px] border-2 sm:border-[3px] md:border-4 border-near-black flex items-center justify-center text-white rotate-6 group-hover:rotate-0 transition-transform shadow-brutalist-sm">
                  <span className="material-symbols-outlined text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-bold">clinical_notes</span>
                </div>
                <div className="space-y-3 sm:space-y-4 md:space-y-6 lg:space-y-8 text-center md:text-left">
                  <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-display font-bold leading-[0.9] text-near-black uppercase italic tracking-tighter break-words">
                    {diagnosis.title}
                  </h2>
                  <p className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl opacity-90 font-medium leading-relaxed max-w-4xl text-near-black/70 italic">
                    {diagnosis.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* What Happens Next Section */}
        <section className="space-y-8 sm:space-y-12">
           <div className="flex justify-between items-end border-b-[3px] sm:border-b-4 border-near-black pb-2 sm:pb-3 md:pb-5">
              <h3 className="text-xl sm:text-2xl md:text-3xl font-black uppercase tracking-tighter italic">Próximos passos do processo</h3>
           </div>
           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
              {[
                { title: 'Análise', desc: 'Marcelo ou Marina analisam pessoalmente os objetivos do teu projeto e avaliam como podemos ajudar.', icon: 'done_all' },
                { title: 'Alinhamento', desc: 'Marcamos um papo rápido pra garantir que nossas filosofias e expectativas estão conectadas.', icon: 'handshake' },
                { title: 'Proposta', desc: 'Você recebe um roadmap claro, focado em resultados, com cronograma e orçamento transparente.', icon: 'trending_up' }
              ].map((step, i) => (
                <div key={i} className="bg-white border-3 sm:border-4 border-near-black p-5 sm:p-6 lg:p-8 rounded-2xl sm:rounded-3xl shadow-brutalist-sm hover:translate-y-[-4px] transition-all group">
                   <div className="w-12 h-12 sm:w-14 sm:h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-4 sm:mb-6 border-2 border-near-black group-hover:bg-primary group-hover:text-white transition-colors">
                      <span className="material-symbols-outlined text-xl sm:text-2xl">{step.icon}</span>
                   </div>
                   <h4 className="text-lg sm:text-xl md:text-2xl font-black uppercase italic tracking-tighter mb-2">{step.title}</h4>
                   <p className="text-sm sm:text-base md:text-lg font-medium text-near-black/60 italic leading-snug">{step.desc}</p>
                </div>
              ))}
           </div>
        </section>

        {/* Roadmap (AI) */}
        <section className="bg-near-black text-white p-6 sm:p-8 md:p-14 lg:p-20 xl:p-28 rounded-2xl sm:rounded-[30px] md:rounded-[50px] lg:rounded-[80px] shadow-brutalist-purple relative overflow-hidden group">
          <div className="absolute -bottom-24 -right-24 w-[300px] sm:w-[400px] md:w-[500px] h-[300px] sm:h-[400px] md:h-[500px] bg-primary/20 blur-[80px] sm:blur-[120px] md:blur-[180px] group-hover:bg-primary/30 transition-colors no-print"></div>
          <div className="relative z-10 space-y-8 sm:space-y-12 md:space-y-16 lg:space-y-20">
            <div className="space-y-3 sm:space-y-4 md:space-y-6">
              <span className="text-[10px] sm:text-xs md:text-sm font-black uppercase tracking-[0.2em] sm:tracking-[0.3em] md:tracking-[0.5em] text-primary">The Roadmap</span>
              <h3 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-display font-bold tracking-tighter italic leading-none break-words">Passos para o <br/><span className="text-primary underline decoration-white decoration-2 sm:decoration-4 md:decoration-6 lg:decoration-8 underline-offset-2 sm:underline-offset-4 md:underline-offset-[16px]">Sucesso</span></h3>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-12 lg:gap-16 xl:gap-20">
              {diagnosis.recommendations.map((rec, i) => (
                <div key={i} className="space-y-4 sm:space-y-6 md:space-y-8 lg:space-y-10 group/item">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 bg-white text-near-black rounded-xl sm:rounded-2xl md:rounded-3xl border-2 sm:border-[3px] md:border-4 border-white flex items-center justify-center font-black text-2xl sm:text-3xl md:text-4xl rotate-[15deg] group-hover/item:rotate-0 transition-transform shadow-brutalist-sm">
                    {i + 1}
                  </div>
                  <p className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold leading-snug opacity-90 group-hover/item:opacity-100 transition-opacity italic break-words">"{rec}"</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Primary Call to Action */}
        <div className="flex flex-col items-center gap-8 sm:gap-10 md:gap-12 pt-8 sm:pt-12 md:pt-16 lg:pt-20 no-print">
          <div className="text-center space-y-4 sm:space-y-6 md:space-y-8 max-w-4xl px-4">
            <h4 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-display font-bold tracking-tighter leading-none break-words">Próxima parada: conversa de verdade</h4>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-medium text-near-black/60 italic leading-relaxed">Recebeu nosso e-mail de confirmação. Responda diretamente ou chama no WhatsApp pra acelerar esse close.</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 md:gap-8 w-full sm:w-auto px-4 sm:px-6">
            <button 
              onClick={openWhatsApp}
              className="group w-full sm:w-auto px-6 py-4 sm:px-8 sm:py-6 md:px-12 md:py-8 bg-[#25D366] text-near-black text-base sm:text-lg md:text-xl lg:text-2xl font-black border-[3px] sm:border-[4px] md:border-[6px] border-near-black rounded-2xl sm:rounded-3xl md:rounded-[40px] shadow-brutalist hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all flex items-center justify-center gap-3 sm:gap-4 md:gap-6 uppercase italic tracking-tighter cursor-none">
              <span className="material-icons text-3xl sm:text-4xl md:text-5xl" aria-hidden="true">chat</span>
              <span className="break-words">Falar com a Monynha</span>
            </button>
          </div>
        </div>

        {/* Secondary CTA Section */}
        <section className="border-t-4 border-near-black/10 pt-12 sm:pt-16 md:pt-20 pb-16 sm:pb-20 md:pb-24 space-y-8 sm:space-y-12 no-print">
          <div className="text-center space-y-4 max-w-3xl mx-auto px-4">
            <h5 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black uppercase tracking-tighter italic">Continue explorando</h5>
            <p className="text-sm sm:text-base md:text-lg font-medium text-near-black/60 italic">Descubra mais sobre como a Monynha transforma desafios digitais em resultados concretos.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 px-4 max-w-6xl mx-auto">
            <button 
              onClick={onExplore}
              className="group relative px-6 py-5 sm:py-6 border-[3px] border-near-black font-black text-sm sm:text-base uppercase tracking-wider bg-white hover:bg-near-black hover:text-white transition-all rounded-xl sm:rounded-2xl shadow-brutalist-sm hover:translate-y-[-2px] hover:shadow-brutalist cursor-none flex items-center justify-center gap-3"
            >
              <span className="material-symbols-outlined text-xl sm:text-2xl">info</span>
              <span>Sobre a Monynha</span>
            </button>

            <a 
              href={OFFICIAL_LINKS.website}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative px-6 py-5 sm:py-6 border-[3px] border-near-black font-black text-sm sm:text-base uppercase tracking-wider bg-white hover:bg-near-black hover:text-white transition-all rounded-xl sm:rounded-2xl shadow-brutalist-sm hover:translate-y-[-2px] hover:shadow-brutalist cursor-none flex items-center justify-center gap-3"
            >
              <span className="material-symbols-outlined text-xl sm:text-2xl">language</span>
              <span>Site Oficial</span>
            </a>

            <button 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="group relative px-6 py-5 sm:py-6 border-[3px] border-near-black font-black text-sm sm:text-base uppercase tracking-wider bg-white hover:bg-near-black hover:text-white transition-all rounded-xl sm:rounded-2xl shadow-brutalist-sm hover:translate-y-[-2px] hover:shadow-brutalist cursor-none flex items-center justify-center gap-3"
            >
              <span className="material-symbols-outlined text-xl sm:text-2xl">arrow_upward</span>
              <span>Voltar ao Topo</span>
            </button>

            <button 
              onClick={onReset}
              className="group relative px-6 py-5 sm:py-6 border-[3px] border-primary bg-primary/5 font-black text-sm sm:text-base uppercase tracking-wider text-primary hover:bg-primary hover:text-white transition-all rounded-xl sm:rounded-2xl shadow-brutalist-sm hover:translate-y-[-2px] hover:shadow-brutalist cursor-none flex items-center justify-center gap-3"
            >
              <span className="material-symbols-outlined text-xl sm:text-2xl">refresh</span>
              <span>Novo Diagnóstico</span>
            </button>
          </div>
        </section>
      </main>

      <footer className="max-w-7xl mx-auto border-t-4 border-near-black/5 py-16 sm:py-20 flex flex-col items-center gap-8 sm:gap-10 no-print">
        <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-8">
          <a 
            href={OFFICIAL_LINKS.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2 text-near-black/40 hover:text-primary transition-colors cursor-none"
          >
            <span className="text-sm font-bold uppercase tracking-wider">Instagram</span>
            <span className="material-symbols-outlined text-lg">arrow_outward</span>
          </a>
          <a 
            href={OFFICIAL_LINKS.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2 text-near-black/40 hover:text-primary transition-colors cursor-none"
          >
            <span className="text-sm font-bold uppercase tracking-wider">LinkedIn</span>
            <span className="material-symbols-outlined text-lg">arrow_outward</span>
          </a>
          <a 
            href={OFFICIAL_LINKS.website}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2 text-near-black/40 hover:text-primary transition-colors cursor-none"
          >
            <span className="text-sm font-bold uppercase tracking-wider">Website</span>
            <span className="material-symbols-outlined text-lg">arrow_outward</span>
          </a>
        </div>
        <div className="text-center space-y-3">
            <p className="text-xs font-black tracking-[0.3em] text-near-black/30 uppercase">
            Monynha Softwares
            </p>
            <div className="flex items-center justify-center gap-2 text-[10px] font-medium text-near-black/20">
              <span>Ecossistema Monynha:</span>
              <a 
                href={OFFICIAL_LINKS.facodi}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors underline underline-offset-2"
              >
                facodi.pt
              </a>
            </div>
            <p className="text-[10px] font-medium text-near-black/20 italic max-w-md">
            Software is a conversation between human intuition and engineering logic.
            </p>
        </div>
      </footer>
    </div>
  );
};

export default Report;
