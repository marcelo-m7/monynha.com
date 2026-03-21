
import React, { useEffect } from 'react';

interface LegalPagesProps {
  type: 'privacy' | 'terms' | 'cookies';
  onBack: () => void;
}

const LEGAL_CONTENT = {
  privacy: {
    title: 'Política de Privacidade',
    subtitle: 'Seus dados, seu brilho, sua segurança.',
    lastUpdated: '01 de Junho de 2025',
    content: (
      <div className="space-y-12">
        <section className="space-y-4">
          <h3 className="text-2xl font-black uppercase italic tracking-tight text-primary">01. Coleta de Dados</h3>
          <p className="text-lg font-medium text-near-black/70 leading-relaxed italic">
            Na Monynha Softwares, respeitamos sua existência e seus dados. Coletamos apenas o essencial para o diagnóstico: seu e-mail, nome da marca e informações de negócio que você compartilha voluntariamente no Wizard.
          </p>
        </section>
        <section className="space-y-4">
          <h3 className="text-2xl font-black uppercase italic tracking-tight text-primary">02. Uso de Informações</h3>
          <p className="text-lg font-medium text-near-black/70 leading-relaxed italic">
            Seus dados são usados exclusivamente para gerar seu Diagnóstico Estratégico AI e para nossa equipe entrar em contato caso você decida barbarizar seu negócio conosco. Jamais vendemos seus dados para terceiros.
          </p>
        </section>
        <section className="space-y-4">
          <h3 className="text-2xl font-black uppercase italic tracking-tight text-primary">03. Armazenamento Seguro</h3>
          <p className="text-lg font-medium text-near-black/70 leading-relaxed italic">
            Utilizamos infraestrutura de ponta (Supabase) para garantir que seus dados fiquem protegidos sob sete chaves digitais. Seguimos as diretrizes da LGPD brasileira e do RGPD europeu.
          </p>
        </section>
        <section className="space-y-4">
          <h3 className="text-2xl font-black uppercase italic tracking-tight text-primary">04. Seus Direitos</h3>
          <p className="text-lg font-medium text-near-black/70 leading-relaxed italic">
            Você tem o direito de solicitar a exclusão total dos seus dados de nossos servidores a qualquer momento. Basta mandar um "Mona, deleta tudo" para o nosso e-mail de contato.
          </p>
        </section>
      </div>
    )
  },
  terms: {
    title: 'Termos de Uso',
    subtitle: 'As regras do jogo para o close certo.',
    lastUpdated: '01 de Junho de 2025',
    content: (
      <div className="space-y-12">
        <section className="space-y-4">
          <h3 className="text-2xl font-black uppercase italic tracking-tight text-primary">01. Natureza do Diagnóstico</h3>
          <p className="text-lg font-medium text-near-black/70 leading-relaxed italic">
            O Wizard de Diagnóstico é uma ferramenta baseada em Inteligência Artificial para fins de consultoria inicial e marketing. As sugestões geradas não constituem um contrato de prestação de serviços final nem garantia de faturamento imediato.
          </p>
        </section>
        <section className="space-y-4">
          <h3 className="text-2xl font-black uppercase italic tracking-tight text-primary">02. Propriedade Intelectual</h3>
          <p className="text-lg font-medium text-near-black/70 leading-relaxed italic">
            Todo o design, código e a marca "Monynha Softwares" são propriedade intelectual nossa. O Diagnóstico gerado para você é de seu uso pessoal e profissional, mas a metodologia permanece nossa.
          </p>
        </section>
        <section className="space-y-4">
          <h3 className="text-2xl font-black uppercase italic tracking-tight text-primary">03. Uso Responsável</h3>
          <p className="text-lg font-medium text-near-black/70 leading-relaxed italic">
            Ao utilizar o Wizard, você se compromete a fornecer informações verídicas. Não toleramos o uso de nossa plataforma para disseminação de discurso de ódio ou atividades ilegais.
          </p>
        </section>
        <section className="space-y-4">
          <h3 className="text-2xl font-black uppercase italic tracking-tight text-primary">04. Limitação de Responsabilidade</h3>
          <p className="text-lg font-medium text-near-black/70 leading-relaxed italic">
            A Monynha Softwares não se responsabiliza por decisões de negócio tomadas exclusivamente com base no Diagnóstico AI sem uma consultoria humana personalizada subsequente.
          </p>
        </section>
      </div>
    )
  },
  cookies: {
    title: 'Política de Cookies',
    subtitle: 'Pequenos arquivos, grandes experiências.',
    lastUpdated: '01 de Junho de 2025',
    content: (
      <div className="space-y-12">
        <section className="space-y-4">
          <h3 className="text-2xl font-black uppercase italic tracking-tight text-primary">01. O que são Cookies?</h3>
          <p className="text-lg font-medium text-near-black/70 leading-relaxed italic">
            Cookies são pequenos arquivos de texto salvos no seu navegador que nos ajudam a lembrar de você e de suas preferências, como o rascunho do seu wizard.
          </p>
        </section>
        <section className="space-y-4">
          <h3 className="text-2xl font-black uppercase italic tracking-tight text-primary">02. Cookies Essenciais</h3>
          <p className="text-lg font-medium text-near-black/70 leading-relaxed italic">
            Usamos cookies técnicos necessários para o funcionamento do site, como o armazenamento local (LocalStorage) que permite que você não perca suas respostas caso a página recarregue acidentalmente.
          </p>
        </section>
        <section className="space-y-4">
          <h3 className="text-2xl font-black uppercase italic tracking-tight text-primary">03. Cookies de Performance</h3>
          <p className="text-lg font-medium text-near-black/70 leading-relaxed italic">
            Podemos utilizar ferramentas de análise (como Google Analytics) para entender como as pessoas interagem com nosso site e melhorar continuamente a experiência de uso.
          </p>
        </section>
        <section className="space-y-4">
          <h3 className="text-2xl font-black uppercase italic tracking-tight text-primary">04. Como Gerenciar</h3>
          <p className="text-lg font-medium text-near-black/70 leading-relaxed italic">
            Você pode desativar os cookies nas configurações do seu navegador a qualquer momento. Note que isso pode afetar algumas funcionalidades interativas de nossa plataforma.
          </p>
        </section>
      </div>
    )
  }
};

const LegalPages: React.FC<LegalPagesProps> = ({ type, onBack }) => {
  const content = LEGAL_CONTENT[type];

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [type]);

  return (
    <div className="min-h-screen bg-[#FAFAFC] text-near-black font-body overflow-x-hidden pt-32 pb-24">
      <style>{`
        .glass-header {
          backdrop-filter: blur(16px);
          background: rgba(250, 250, 252, 0.85);
          border-bottom: 4px solid #0B0B10;
        }
        .reveal-up {
          animation: revealUp 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
        @keyframes revealUp {
          0% { transform: translateY(40px); opacity: 0; filter: blur(5px); }
          100% { transform: translateY(0); opacity: 1; filter: blur(0px); }
        }
      `}</style>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-[100] glass-header py-4 sm:py-6 px-4 sm:px-6 md:px-16 flex justify-between items-center no-print">
        <button type="button" className="flex items-center gap-3 sm:gap-4 group cursor-none active:scale-95 transition-transform text-left" onClick={onBack}>
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-near-black text-white rounded-lg sm:rounded-xl flex items-center justify-center shadow-brutalist-sm group-hover:bg-primary transition-colors">
            <span className="font-display font-bold text-xl sm:text-2xl">M</span>
          </div>
          <div className="flex flex-col">
            <span className="font-display font-bold text-lg sm:text-xl tracking-tighter uppercase leading-none group-hover:text-primary transition-colors">Monynha</span>
            <span className="text-[10px] xs:text-xs sm:text-sm font-black tracking-widest text-primary uppercase">Legal</span>
          </div>
        </button>
        <button 
          onClick={onBack}
          className="px-6 py-2 sm:px-8 sm:py-3 bg-white text-near-black font-black text-[10px] xs:text-xs sm:text-sm uppercase tracking-widest border-2 border-near-black rounded-lg sm:rounded-xl shadow-brutalist-sm hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all active:scale-95 cursor-none"
        >
          Voltar
        </button>
      </nav>

      <main className="px-4 sm:px-6 md:px-16 max-w-4xl mx-auto space-y-16 sm:space-y-24 reveal-up">
        <header className="space-y-4 sm:space-y-6">
          <div className="inline-block px-4 py-1.5 sm:px-6 sm:py-2 border-2 border-primary text-primary font-black text-xs sm:text-sm uppercase tracking-widest rounded-full">
            Documentação Oficial
          </div>
          <h1 className="text-4xl xs:text-5xl md:text-8xl font-display font-bold leading-tight tracking-tighter">
            {content.title.split(' ').map((word, i) => (
              <span key={i} className={i % 2 !== 0 ? 'text-primary italic' : ''}>{word} </span>
            ))}
          </h1>
          <p className="text-xl sm:text-2xl md:text-4xl font-medium text-near-black/50 italic leading-tight">
            {content.subtitle}
          </p>
          <div className="pt-6 sm:pt-8 flex items-center gap-4">
            <span className="text-[10px] sm:text-xs font-black uppercase tracking-[0.2em] sm:tracking-[0.3em] text-near-black/20">Última atualização: {content.lastUpdated}</span>
            <div className="h-px flex-grow bg-near-black/10"></div>
          </div>
        </header>

        <article className="prose prose-lg sm:prose-2xl prose-slate max-w-none">
          {content.content}
        </article>

        <section className="bg-primary text-white p-8 sm:p-12 md:p-20 rounded-[40px] sm:rounded-[60px] border-[3px] sm:border-4 border-near-black shadow-brutalist space-y-6 sm:space-y-8 text-center">
          <h3 className="text-2xl sm:text-3xl md:text-5xl font-display font-bold tracking-tighter italic">Alguma dúvida, mona?</h3>
          <p className="text-lg sm:text-xl font-medium opacity-80 italic leading-relaxed">
            Se algo não ficou claro, mande um sinal pra gente. Transparência é resistência.
          </p>
          <a 
            href="mailto:hello@monynha.com"
            className="inline-block px-8 py-4 sm:px-12 sm:py-6 bg-near-black text-white text-xl sm:text-2xl font-black uppercase italic tracking-tighter rounded-2xl sm:rounded-3xl border-2 border-white shadow-brutalist-sm hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all active:scale-95 cursor-none"
          >
            Mandar E-mail
          </a>
        </section>

        <div className="text-center pt-8 sm:pt-12">
           <p className="text-[10px] sm:text-xs font-black tracking-[0.5em] sm:tracking-[1em] text-near-black/20 uppercase">
             © {new Date().getFullYear()} Monynha Softwares • All Rights Reserved
           </p>
        </div>
      </main>
    </div>
  );
};

export default LegalPages;
