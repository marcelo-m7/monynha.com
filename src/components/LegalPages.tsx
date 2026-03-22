
import React, { useEffect } from 'react';

interface LegalPagesProps {
  type: 'privacy' | 'terms' | 'cookies';
  onBack: () => void;
  onOpenContactForm: () => void;
}

const LEGAL_CONTENT = {
  privacy: {
    title: 'Política de Privacidade',
    subtitle: 'Transparência no tratamento de dados pessoais.',
    lastUpdated: '22 de Março de 2026',
    content: (
      <div className="space-y-12">
        <section className="space-y-4">
          <h3 className="text-2xl font-black uppercase italic tracking-tight text-primary">01. Escopo e dados coletados</h3>
          <p className="text-lg font-medium text-near-black/70 leading-relaxed italic">
            Esta política descreve como a Monynha Softwares trata dados pessoais no uso deste site e do formulário de diagnóstico. Coletamos, em regra, dados informados por você, como e-mail, nome da marca/projeto e informações de contexto de negócio preenchidas voluntariamente.
          </p>
        </section>
        <section className="space-y-4">
          <h3 className="text-2xl font-black uppercase italic tracking-tight text-primary">02. Finalidades e bases legais</h3>
          <p className="text-lg font-medium text-near-black/70 leading-relaxed italic">
            Os dados são tratados para: (a) gerar o diagnóstico solicitado, (b) viabilizar contato de retorno, (c) melhorar a qualidade técnica do serviço e (d) cumprir obrigações legais. As bases legais aplicáveis incluem execução de medidas pré-contratuais, consentimento quando necessário e legítimo interesse, conforme LGPD e GDPR.
          </p>
        </section>
        <section className="space-y-4">
          <h3 className="text-2xl font-black uppercase italic tracking-tight text-primary">03. Compartilhamento e transferência internacional</h3>
          <p className="text-lg font-medium text-near-black/70 leading-relaxed italic">
            Podemos utilizar operadores e provedores de infraestrutura para hospedagem, comunicação e processamento técnico. Quando houver transferência internacional de dados, adotamos mecanismos contratuais e medidas de segurança compatíveis com os requisitos legais aplicáveis.
          </p>
        </section>
        <section className="space-y-4">
          <h3 className="text-2xl font-black uppercase italic tracking-tight text-primary">04. Retenção e descarte</h3>
          <p className="text-lg font-medium text-near-black/70 leading-relaxed italic">
            Mantemos dados pessoais apenas pelo tempo necessário para cumprir as finalidades descritas nesta política, obrigações legais e exercício regular de direitos. Após o prazo aplicável, os dados são eliminados ou anonimizados de forma segura.
          </p>
        </section>
        <section className="space-y-4">
          <h3 className="text-2xl font-black uppercase italic tracking-tight text-primary">05. Direitos do titular</h3>
          <p className="text-lg font-medium text-near-black/70 leading-relaxed italic">
            Você pode solicitar confirmação de tratamento, acesso, correção, anonimização, bloqueio, eliminação, portabilidade e revisão de decisões automatizadas, quando aplicável. Também pode revogar consentimento e apresentar reclamação à autoridade competente.
          </p>
        </section>
        <section className="space-y-4">
          <h3 className="text-2xl font-black uppercase italic tracking-tight text-primary">06. Segurança e contato</h3>
          <p className="text-lg font-medium text-near-black/70 leading-relaxed italic">
            Adotamos medidas técnicas e administrativas para proteção contra acesso não autorizado, perda, alteração e vazamento. Solicitações sobre privacidade devem ser enviadas para hello@monynha.com, com prazo inicial de resposta em até 15 dias corridos.
          </p>
        </section>
      </div>
    )
  },
  terms: {
    title: 'Termos de Uso',
    subtitle: 'Condições para uso do site e do diagnóstico.',
    lastUpdated: '22 de Março de 2026',
    content: (
      <div className="space-y-12">
        <section className="space-y-4">
          <h3 className="text-2xl font-black uppercase italic tracking-tight text-primary">01. Aceite e objeto</h3>
          <p className="text-lg font-medium text-near-black/70 leading-relaxed italic">
            Ao acessar este site, você concorda com estes Termos de Uso. O serviço disponibiliza conteúdos institucionais e um diagnóstico inicial com apoio de inteligência artificial para orientação estratégica preliminar.
          </p>
        </section>
        <section className="space-y-4">
          <h3 className="text-2xl font-black uppercase italic tracking-tight text-primary">02. Natureza informativa do diagnóstico</h3>
          <p className="text-lg font-medium text-near-black/70 leading-relaxed italic">
            As recomendações geradas não constituem promessa de resultado, garantia de desempenho, parecer jurídico, contábil ou financeiro. Decisões de negócio devem considerar avaliação profissional adequada ao seu contexto.
          </p>
        </section>
        <section className="space-y-4">
          <h3 className="text-2xl font-black uppercase italic tracking-tight text-primary">03. Conduta do usuário</h3>
          <p className="text-lg font-medium text-near-black/70 leading-relaxed italic">
            Você se compromete a fornecer informações verdadeiras e a não utilizar a plataforma para finalidades ilícitas, discriminatórias, fraudulentas ou que violem direitos de terceiros.
          </p>
        </section>
        <section className="space-y-4">
          <h3 className="text-2xl font-black uppercase italic tracking-tight text-primary">04. Propriedade intelectual</h3>
          <p className="text-lg font-medium text-near-black/70 leading-relaxed italic">
            O conteúdo do site, marca, identidade visual, metodologia e código associado são protegidos por direitos de propriedade intelectual. O uso não autorizado, reprodução ou distribuição sem permissão é vedado, salvo hipóteses legais.
          </p>
        </section>
        <section className="space-y-4">
          <h3 className="text-2xl font-black uppercase italic tracking-tight text-primary">05. Limitação de responsabilidade</h3>
          <p className="text-lg font-medium text-near-black/70 leading-relaxed italic">
            Na extensão permitida pela legislação, a Monynha Softwares não se responsabiliza por perdas indiretas, lucros cessantes ou decisões tomadas exclusivamente com base no diagnóstico automatizado sem validação humana complementar.
          </p>
        </section>
        <section className="space-y-4">
          <h3 className="text-2xl font-black uppercase italic tracking-tight text-primary">06. Alterações e foro</h3>
          <p className="text-lg font-medium text-near-black/70 leading-relaxed italic">
            Estes termos podem ser atualizados periodicamente, com publicação da data de revisão nesta página. Em caso de disputa, aplica-se a legislação competente e o foro legalmente cabível, sem prejuízo de tentativas prévias de solução amigável.
          </p>
        </section>
      </div>
    )
  },
  cookies: {
    title: 'Política de Cookies',
    subtitle: 'Como utilizamos cookies e tecnologias similares.',
    lastUpdated: '22 de Março de 2026',
    content: (
      <div className="space-y-12">
        <section className="space-y-4">
          <h3 className="text-2xl font-black uppercase italic tracking-tight text-primary">01. O que são cookies</h3>
          <p className="text-lg font-medium text-near-black/70 leading-relaxed italic">
            Cookies são pequenos arquivos armazenados no navegador para permitir funcionalidades técnicas, lembrar preferências e apoiar medições de uso da plataforma.
          </p>
        </section>
        <section className="space-y-4">
          <h3 className="text-2xl font-black uppercase italic tracking-tight text-primary">02. Categorias utilizadas</h3>
          <p className="text-lg font-medium text-near-black/70 leading-relaxed italic">
            Utilizamos cookies estritamente necessários para funcionamento do site, além de tecnologias de medição de desempenho quando habilitadas. Recursos como persistência de rascunho podem usar armazenamento local do navegador.
          </p>
        </section>
        <section className="space-y-4">
          <h3 className="text-2xl font-black uppercase italic tracking-tight text-primary">03. Base legal e consentimento</h3>
          <p className="text-lg font-medium text-near-black/70 leading-relaxed italic">
            Cookies essenciais podem ser processados por necessidade técnica. Cookies não essenciais, quando utilizados, dependem de consentimento aplicável, que pode ser gerenciado pelo usuário nas configurações do navegador e em controles disponibilizados no site.
          </p>
        </section>
        <section className="space-y-4">
          <h3 className="text-2xl font-black uppercase italic tracking-tight text-primary">04. Como gerenciar cookies</h3>
          <p className="text-lg font-medium text-near-black/70 leading-relaxed italic">
            Você pode bloquear, remover ou revisar permissões de cookies a qualquer momento no navegador. A desativação de cookies essenciais pode comprometer funcionalidades centrais da experiência.
          </p>
        </section>
        <section className="space-y-4">
          <h3 className="text-2xl font-black uppercase italic tracking-tight text-primary">05. Tecnologias de terceiros</h3>
          <p className="text-lg font-medium text-near-black/70 leading-relaxed italic">
            Determinados recursos podem envolver provedores terceiros de analytics, infraestrutura ou comunicação. Esses provedores atuam conforme seus próprios termos e políticas, observados os limites contratuais e legais aplicáveis.
          </p>
        </section>
        <section className="space-y-4">
          <h3 className="text-2xl font-black uppercase italic tracking-tight text-primary">06. Contato para solicitações</h3>
          <p className="text-lg font-medium text-near-black/70 leading-relaxed italic">
            Dúvidas sobre cookies e preferências de rastreamento podem ser encaminhadas para hello@monynha.com.
          </p>
        </section>
      </div>
    )
  }
};

const LegalPages: React.FC<LegalPagesProps> = ({ type, onBack, onOpenContactForm }) => {
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
          <h3 className="text-2xl sm:text-3xl md:text-5xl font-display font-bold tracking-tighter italic">Dúvidas sobre privacidade ou uso?</h3>
          <p className="text-lg sm:text-xl font-medium opacity-80 italic leading-relaxed">
            Se algo não ficou claro, fale com nossa equipe. Transparência e responsabilidade orientam nossas decisões.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={onOpenContactForm}
              className="inline-flex items-center justify-center gap-3 px-8 py-4 sm:px-12 sm:py-6 bg-near-black text-white text-xl sm:text-2xl font-black uppercase italic tracking-tighter rounded-2xl sm:rounded-3xl border-2 border-white shadow-brutalist-sm hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all active:scale-95 cursor-none"
            >
              <span className="material-icons text-2xl">mail</span>
              Abrir formulário
            </button>
            <a
              href="mailto:hello@monynha.com?subject=Solicita%C3%A7%C3%A3o%20legal%20ou%20de%20privacidade"
              className="inline-flex items-center justify-center gap-3 px-8 py-4 sm:px-12 sm:py-6 bg-transparent text-white text-xl sm:text-2xl font-black uppercase italic tracking-tighter rounded-2xl sm:rounded-3xl border-2 border-white/40 hover:border-white transition-all active:scale-95 cursor-none"
            >
              E-mail direto
            </a>
          </div>
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
