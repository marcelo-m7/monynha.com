import React, { FormEvent, useEffect, useMemo, useState } from 'react';
import { LeadData } from './types';

// Centralized content system

type CTA = { label: string; href: string };
type SectionContent = {
  title: string;
  subtitle?: string;
  body: string;
  cta?: CTA;
  proof?: string[];
};

type ProductStatus = 'Ativo' | 'Beta' | 'P&D' | 'Em breve';

type Product = SectionContent & {
  slug: string;
  status: ProductStatus;
  description: string;
  problem: string;
  solution: string;
  benefit: string;
};

type Service = SectionContent & {
  slug: string;
  icp: string;
  problem: string;
  outcome: string;
  process: string[];
};

const brandManifesto: SectionContent = {
  title: 'Produto, engenharia e comunidade entram pela mesma porta.',
  subtitle: 'Monynha Softwares',
  body:
    'A Monynha constrói software com rigor técnico, leitura de negócio e compromisso cultural. Somos um estúdio de produto e engenharia que acredita em tecnologia acessível, inclusiva e com credibilidade real para quem precisa decidir rápido e executar melhor.',
  cta: { label: 'Falar com a Monynha', href: '/contato' },
  proof: [
    'Posicionamento LGBTQIA+ visível desde a primeira dobra.',
    'Acessibilidade, clareza e conversão como critérios de produto.',
    'Open source e comunidade como prova pública de competência.'
  ]
};

const products: Product[] = [
  {
    slug: 'boteco-pro',
    title: 'Boteco PRO',
    subtitle: 'Operação de bares e restaurantes com menos atrito.',
    body:
      'ERP e operação digital para negócios de alimentação que cresceram, mas ainda convivem com retrabalho, estoque impreciso e baixa visibilidade da operação.',
    description: 'Gestão de operação, cardápio, estoque e vendas em uma estrutura única.',
    status: 'Ativo',
    problem: 'Times perdem margem quando controle de estoque, pedidos e financeiro vivem em sistemas desconectados.',
    solution: 'Implementamos uma camada operacional integrada para salão, estoque, indicadores e fluxos críticos.',
    benefit: 'Menos perda, mais previsibilidade e uma base confiável para escalar com disciplina.',
    proof: ['Estrutura pensada para operação real.', 'Foco em rotina, dados e tomada de decisão.', 'CTA orientado para diagnóstico operacional.'],
    cta: { label: 'Ver Boteco PRO', href: 'https://boteco.pro' }
  },
  {
    slug: 'facodi',
    title: 'FACODI',
    subtitle: 'Educação aberta para tecnologia com impacto comunitário.',
    body:
      'A Faculdade Comunitária Digital organiza trilhas abertas para quem quer aprender tecnologia sem depender de portas tradicionalmente fechadas.',
    description: 'Curadoria de trilhas, playlists e materiais acessíveis para formação contínua.',
    status: 'Beta',
    problem: 'Muita gente talentosa fica fora do mercado por falta de trilha clara, repertório acessível e comunidade de apoio.',
    solution: 'Transformamos curadoria educacional em estrutura navegável, pública e orientada a autonomia.',
    benefit: 'A comunidade aprende com menos ruído e com mais contexto para avançar.',
    proof: ['Projeto alinhado à missão de acessibilidade.', 'Conecta conteúdo, comunidade e tecnologia.', 'Evidencia o lado público da marca.'],
    cta: { label: 'Explorar FACODI', href: 'https://facodi.pt' }
  },
  {
    slug: 'monynha-fun',
    title: 'Monynha Fun',
    subtitle: 'Laboratório de curadoria e distribuição de conteúdo.',
    body:
      'Um arquivo vivo para organizar vídeos, playlists e repertórios que circulam na comunidade Monynha.',
    description: 'Camada de descoberta de conteúdo para repertório aberto e reutilizável.',
    status: 'P&D',
    problem: 'Conteúdo valioso se perde quando não existe indexação, recorte temático e contexto de uso.',
    solution: 'Estruturamos um acervo navegável para transformar volume em descoberta útil.',
    benefit: 'Mais acesso ao conhecimento e mais longevidade para a produção da comunidade.',
    proof: ['Projeto real, sem linguagem falsa de “lab”.', 'Serve como ponte entre produto e comunidade.', 'Indica transparência sobre maturidade do projeto.'],
    cta: { label: 'Conhecer o projeto', href: 'https://monynha.fun' }
  }
];

const services: Service[] = [
  {
    slug: 'diagnostico',
    title: 'Diagnóstico de produto e operação',
    subtitle: 'Para equipes que cresceram, mas perderam clareza.',
    body: 'Mapeamos gargalos de produto, conteúdo, jornada e operação para transformar sensação de caos em plano priorizado.',
    icp: 'Ideal para founders, operações e times que precisam decidir o próximo ciclo com base em evidência e não em achismo.',
    problem: 'A empresa sente atrito em várias frentes, mas não sabe onde atacar primeiro.',
    outcome: 'Uma leitura clara de problemas, ganhos rápidos e roadmap de ação.',
    process: ['Imersão curta para entender contexto e metas.', 'Mapeamento de riscos, fricções e oportunidades.', 'Entrega de diagnóstico com prioridades e próximos passos.'],
    proof: ['Une produto, engenharia e comunicação.', 'Ideal para pré-projeto ou reestruturação.'],
    cta: { label: 'Get a diagnosis', href: '/contato' }
  },
  {
    slug: 'engenharia',
    title: 'Arquitetura e implementação',
    subtitle: 'Para negócios que já sabem o que precisam construir.',
    body: 'Desenhamos e implementamos produtos, integrações e fluxos críticos com foco em manutenção, clareza e valor para o negócio.',
    icp: 'Times que precisam de execução sênior sem abrir mão de visão estratégica.',
    problem: 'Projetos travam quando arquitetura, UX e operação são tratadas em silos.',
    outcome: 'Produto mais robusto, decisão mais rápida e menos débito invisível.',
    process: ['Arquitetura orientada ao contexto do negócio.', 'Entrega incremental com validação contínua.', 'Documentação e handoff para continuidade.'],
    proof: ['Foco em credibilidade técnica.', 'Execução orientada a resultado e não a volume de features.'],
    cta: { label: 'Talk to Monynha', href: '/contato' }
  }
];

const openSource: SectionContent = {
  title: 'Open source como prova pública de competência.',
  subtitle: 'Confiança que pode ser auditada.',
  body: 'Na Monynha, open source não é enfeite. É um mecanismo de transparência, reputação técnica e contribuição para a comunidade que queremos fortalecer.',
  cta: { label: 'Ver GitHub da Monynha', href: 'https://github.com/Monynha-Softwares' },
  proof: ['Código público reforça confiança.', 'Compartilhamento de conhecimento reduz barreiras.', 'A comunidade vê como pensamos, estruturamos e entregamos.']
};

const community: SectionContent = {
  title: 'Comunidade, acessibilidade e orgulho fazem parte do produto.',
  subtitle: 'Não ficam escondidos no rodapé.',
  body: 'A Monynha assume uma posição clara: tecnologia melhor nasce quando diversidade, acessibilidade e acolhimento entram na arquitetura da experiência.',
  cta: { label: 'Ler sobre a Monynha', href: '/sobre' },
  proof: ['Posicionamento LGBTQIA+ explícito.', 'Tom humano e firme.', 'Acessibilidade considerada desde a navegação até as mensagens do formulário.']
};

const contentHub: SectionContent = {
  title: 'Conteúdo para quem precisa decidir melhor.',
  subtitle: 'Insights de produto, engenharia e operação.',
  body: 'Organizamos conteúdo para founders, times e comunidades que precisam entender o porquê por trás das decisões de produto e tecnologia.',
  cta: { label: 'Abrir contato', href: '/contato' },
  proof: ['Guias estratégicos.', 'Leituras sobre produto e operação.', 'Aprendizados de open source e comunidade.']
};

const routes = {
  '/': {
    title: 'Monynha Softwares | Produto, engenharia e comunidade',
    description: 'Monynha é um hub de decisão para produtos, serviços, open source e comunidade — com clareza, credibilidade técnica e posicionamento inclusivo.'
  },
  '/produtos': {
    title: 'Produtos | Monynha Softwares',
    description: 'Conheça os produtos da Monynha com estrutura clara de problema, solução, benefício, prova e próximo passo.'
  },
  '/servicos': {
    title: 'Serviços | Monynha Softwares',
    description: 'Diagnóstico, arquitetura e implementação para negócios que precisam de clareza, execução sênior e resultado mensurável.'
  },
  '/open-source': {
    title: 'Open Source | Monynha Softwares',
    description: 'Veja como o open source reforça a credibilidade técnica, a transparência e a contribuição comunitária da Monynha.'
  },
  '/sobre': {
    title: 'Sobre | Monynha Softwares',
    description: 'Entenda a identidade da Monynha: produto, engenharia, comunidade, acessibilidade e orgulho no centro da experiência.'
  },
  '/conteudo': {
    title: 'Conteúdo | Monynha Softwares',
    description: 'Conteúdo estratégico da Monynha sobre produto, engenharia, UX, open source e operação digital.'
  },
  '/contato': {
    title: 'Contato | Monynha Softwares',
    description: 'Fale com a Monynha para pedir um diagnóstico, discutir um projeto ou iniciar uma conversa estratégica.'
  }
} as const;

type RoutePath = keyof typeof routes;

const navItems: Array<{ label: string; href: RoutePath }> = [
  { label: 'Início', href: '/' },
  { label: 'Produtos', href: '/produtos' },
  { label: 'Serviços', href: '/servicos' },
  { label: 'Open Source', href: '/open-source' },
  { label: 'Sobre', href: '/sobre' },
  { label: 'Conteúdo', href: '/conteudo' },
  { label: 'Contato', href: '/contato' }
];

const resolveRoute = (pathname: string): RoutePath => (pathname in routes ? (pathname as RoutePath) : '/');

const useRoute = () => {
  const [route, setRoute] = useState<RoutePath>(resolveRoute(window.location.pathname));

  useEffect(() => {
    const onPopState = () => setRoute(resolveRoute(window.location.pathname));
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  useEffect(() => {
    const meta = routes[route];
    document.title = meta.title;
    document.querySelector('meta[name="description"]')?.setAttribute('content', meta.description);
    document.querySelector('link[rel="canonical"]')?.setAttribute('href', `https://monynha.com${route === '/' ? '/' : route}`);
  }, [route]);

  const navigate = (href: string) => {
    if (href.startsWith('http')) {
      window.open(href, '_blank', 'noopener,noreferrer');
      return;
    }
    const next = resolveRoute(href);
    window.history.pushState({}, '', next);
    setRoute(next);
    window.scrollTo({ top: 0, behavior: 'auto' });
  };

  return { route, navigate };
};

const AppLink: React.FC<React.PropsWithChildren<{ href: string; className?: string; onNavigate: (href: string) => void }>> = ({ href, className, onNavigate, children }) => (
  <a
    href={href}
    className={className}
    onClick={(event) => {
      if (href.startsWith('http')) return;
      event.preventDefault();
      onNavigate(href);
    }}
  >
    {children}
  </a>
);

const Shell: React.FC<React.PropsWithChildren<{ route: RoutePath; navigate: (href: string) => void }>> = ({ route, navigate, children }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => setMenuOpen(false), [route]);

  return (
    <div className="bg-[#f7f5fb] text-near-black min-h-screen">
      <div className="h-2 bg-[linear-gradient(90deg,#ff335f,#ff8a00,#ffd500,#00b894,#0984e3,#6c5ce7)]" aria-hidden="true" />
      <header className="sticky top-0 z-50 border-b border-near-black/10 bg-[#f7f5fb]/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-4 py-4 sm:px-6 lg:px-8">
          <AppLink href="/" onNavigate={navigate} className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-near-black text-white font-black">M</span>
            <span>
              <strong className="block text-lg leading-none">Monynha</strong>
              <span className="text-xs uppercase tracking-[0.25em] text-primary">Softwares</span>
            </span>
          </AppLink>

          <button className="rounded-xl border border-near-black/20 px-3 py-2 font-semibold lg:hidden" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-controls="mobile-nav">
            Menu
          </button>

          <nav className="hidden items-center gap-5 lg:flex" aria-label="Principal">
            {navItems.map((item) => (
              <AppLink key={item.href} href={item.href} onNavigate={navigate} className={`text-sm font-semibold ${route === item.href ? 'text-primary' : 'text-near-black/70 hover:text-near-black'}`}>
                {item.label}
              </AppLink>
            ))}
          </nav>
        </div>
        {menuOpen && (
          <nav id="mobile-nav" className="border-t border-near-black/10 px-4 py-4 lg:hidden" aria-label="Principal móvel">
            <div className="flex flex-col gap-3">
              {navItems.map((item) => (
                <AppLink key={item.href} href={item.href} onNavigate={navigate} className={`rounded-xl px-3 py-2 text-sm font-semibold ${route === item.href ? 'bg-primary text-white' : 'bg-white text-near-black'}`}>
                  {item.label}
                </AppLink>
              ))}
            </div>
          </nav>
        )}
      </header>
      <main id="main-content">{children}</main>
      <footer className="border-t border-near-black/10 bg-white">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[2fr,1fr,1fr] lg:px-8">
          <div className="space-y-3">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-primary">Monynha Softwares</p>
            <p className="max-w-xl text-sm text-near-black/70">Produto, engenharia e comunidade entram pela mesma porta — com orgulho, acessibilidade e credibilidade técnica.</p>
          </div>
          <div>
            <h2 className="mb-3 text-sm font-bold">Explorar</h2>
            <ul className="space-y-2 text-sm text-near-black/70">
              {navItems.slice(0, 5).map((item) => <li key={item.href}><AppLink href={item.href} onNavigate={navigate}>{item.label}</AppLink></li>)}
            </ul>
          </div>
          <div>
            <h2 className="mb-3 text-sm font-bold">Provas públicas</h2>
            <ul className="space-y-2 text-sm text-near-black/70">
              <li><a href="https://github.com/Monynha-Softwares" target="_blank" rel="noreferrer">GitHub</a></li>
              <li><a href="https://www.instagram.com/monynha_softwares/" target="_blank" rel="noreferrer">Instagram</a></li>
              <li><a href="mailto:hello@monynha.com">hello@monynha.com</a></li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
};

const SectionBlock: React.FC<React.PropsWithChildren<{ content: SectionContent; navigate: (href: string) => void; className?: string }>> = ({ content, navigate, className, children }) => (
  <section className={`mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 ${className ?? ''}`}>
    <div className="max-w-3xl space-y-4">
      {content.subtitle && <p className="text-sm font-semibold uppercase tracking-[0.25em] text-primary">{content.subtitle}</p>}
      <h1 className="text-4xl font-black tracking-tight sm:text-5xl">{content.title}</h1>
      <p className="text-lg leading-8 text-near-black/72">{content.body}</p>
      {content.cta && (
        <AppLink href={content.cta.href} onNavigate={navigate} className="inline-flex rounded-2xl bg-near-black px-5 py-3 font-semibold text-white hover:bg-primary">
          {content.cta.label}
        </AppLink>
      )}
    </div>
    {children}
  </section>
);

const HomePage: React.FC<{ navigate: (href: string) => void }> = ({ navigate }) => (
  <>
    <SectionBlock content={brandManifesto} navigate={navigate}>
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {brandManifesto.proof?.map((item) => <div key={item} className="rounded-3xl border border-near-black/10 bg-white p-5 text-sm text-near-black/72">{item}</div>)}
      </div>
    </SectionBlock>

    <section className="mx-auto max-w-7xl px-4 pb-8 sm:px-6 lg:px-8">
      <div className="rounded-[2rem] border border-near-black/10 bg-white p-6 sm:p-8">
        <div className="mb-6 max-w-2xl space-y-3">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-primary">Choose your path</p>
          <h2 className="text-3xl font-black tracking-tight sm:text-4xl">Em menos de 10 segundos, você entende por onde começar.</h2>
          <p className="text-near-black/72">A homepage agora funciona como um roteador de decisão: produto, serviços, open source ou comunidade.</p>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {[
            { title: 'Produtos', body: 'Conheça o que já existe, seu estágio e o próximo passo.', href: '/produtos' },
            { title: 'Serviços', body: 'Descubra quando pedir diagnóstico ou implementação.', href: '/servicos' },
            { title: 'Open Source', body: 'Veja como a confiança técnica aparece em público.', href: '/open-source' },
            { title: 'Community', body: 'Entenda a dimensão cultural, inclusiva e educacional da marca.', href: '/sobre' }
          ].map((item) => (
            <AppLink key={item.href} href={item.href} onNavigate={navigate} className="rounded-3xl border border-near-black/10 bg-[#f7f5fb] p-5 transition hover:border-primary hover:bg-white">
              <h3 className="mb-2 text-xl font-bold">{item.title}</h3>
              <p className="text-sm leading-7 text-near-black/72">{item.body}</p>
            </AppLink>
          ))}
        </div>
      </div>
    </section>

    <SectionBlock navigate={navigate} content={{ title: 'Valor para quem precisa decidir, não apenas admirar.', body: 'A Monynha organiza sua oferta como um sistema: produtos claros, serviços orientados a problema, prova pública de competência e uma identidade cultural visível.', subtitle: 'Value proposition', proof: ['Home pensada para conversão.', 'Estrutura editorial mais preparada para SEO.', 'Conteúdo centralizado e escalável.'] }}>
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        <div className="rounded-3xl bg-near-black p-6 text-white"><h3 className="font-bold">Clareza</h3><p className="mt-2 text-sm text-white/80">Cada rota responde “o que é”, “para quem é” e “qual o próximo passo”.</p></div>
        <div className="rounded-3xl bg-white p-6"><h3 className="font-bold">Credibilidade</h3><p className="mt-2 text-sm text-near-black/72">Open source, serviços e produtos conversam entre si como prova de maturidade.</p></div>
        <div className="rounded-3xl bg-white p-6"><h3 className="font-bold">Posicionamento</h3><p className="mt-2 text-sm text-near-black/72">Orgulho LGBTQIA+, acessibilidade e comunidade aparecem no topo da experiência.</p></div>
      </div>
    </SectionBlock>

    <SectionBlock content={{ title: 'Proof', subtitle: 'Por que confiar', body: 'Transformamos o site em uma interface de decisão, apoiada por narrativa de produto, estrutura semântica e microcopy objetiva.', cta: { label: 'Ver serviços', href: '/servicos' }, proof: ['Produtos com status real.', 'Serviços com ICP, problema, resultado e processo.', 'Navegação consistente e linkável.'] }} navigate={navigate}>
      <ul className="mt-8 grid gap-3 md:grid-cols-3">
        {['Produtos com status visível e CTA.', 'Serviços com ICP, problema, outcome e processo.', 'Contato com validação e mensagem de sucesso humana.'].map((item) => <li key={item} className="rounded-2xl border border-near-black/10 bg-white p-4 text-sm">{item}</li>)}
      </ul>
    </SectionBlock>
  </>
);

const ProductsPage: React.FC<{ navigate: (href: string) => void }> = ({ navigate }) => (
  <SectionBlock navigate={navigate} content={{ title: 'Produtos com estrutura real, status real e próximo passo claro.', subtitle: 'Produtos', body: 'Cada produto responde ao problema que ataca, à solução que oferece, ao benefício esperado, às provas disponíveis e ao CTA apropriado.' }}>
    <div className="mt-10 grid gap-6 lg:grid-cols-2">
      {products.map((product) => (
        <article key={product.slug} className="rounded-[2rem] border border-near-black/10 bg-white p-6 shadow-sm">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-2xl font-black tracking-tight">{product.title}</h2>
              <p className="text-sm font-medium text-primary">{product.subtitle}</p>
            </div>
            <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.2em] text-primary">{product.status}</span>
          </div>
          <p className="text-sm leading-7 text-near-black/72">{product.description}</p>
          <dl className="mt-6 space-y-4 text-sm">
            <div><dt className="font-bold">Problema</dt><dd className="text-near-black/72">{product.problem}</dd></div>
            <div><dt className="font-bold">Solução</dt><dd className="text-near-black/72">{product.solution}</dd></div>
            <div><dt className="font-bold">Benefício</dt><dd className="text-near-black/72">{product.benefit}</dd></div>
            <div><dt className="font-bold">Proof</dt><dd className="text-near-black/72"><ul className="mt-2 list-disc pl-5">{product.proof?.map((item) => <li key={item}>{item}</li>)}</ul></dd></div>
          </dl>
          <div className="mt-6 flex flex-wrap gap-3">
            <AppLink href={product.cta!.href} onNavigate={navigate} className="rounded-2xl bg-near-black px-4 py-3 text-sm font-semibold text-white">{product.cta!.label}</AppLink>
            <AppLink href="/contato" onNavigate={navigate} className="rounded-2xl border border-near-black/20 px-4 py-3 text-sm font-semibold">Falar sobre este produto</AppLink>
          </div>
        </article>
      ))}
    </div>
  </SectionBlock>
);

const ServicesPage: React.FC<{ navigate: (href: string) => void }> = ({ navigate }) => (
  <SectionBlock navigate={navigate} content={{ title: 'Serviços desenhados para decisões sérias.', subtitle: 'Serviços', body: 'Em vez de descrições genéricas, mostramos para quem cada serviço serve, qual problema resolve, o resultado esperado e como conduzimos o processo.', cta: { label: 'Get a diagnosis', href: '/contato' } }}>
    <div className="mt-10 grid gap-6 lg:grid-cols-2">
      {services.map((service) => (
        <article key={service.slug} className="rounded-[2rem] border border-near-black/10 bg-white p-6">
          <h2 className="text-2xl font-black tracking-tight">{service.title}</h2>
          <p className="mt-1 text-sm font-medium text-primary">{service.subtitle}</p>
          <div className="mt-5 space-y-4 text-sm leading-7 text-near-black/72">
            <p><strong className="text-near-black">ICP:</strong> {service.icp}</p>
            <p><strong className="text-near-black">Problema:</strong> {service.problem}</p>
            <p><strong className="text-near-black">Outcome:</strong> {service.outcome}</p>
            <div>
              <strong className="text-near-black">Processo:</strong>
              <ol className="mt-2 list-decimal pl-5">{service.process.map((step) => <li key={step}>{step}</li>)}</ol>
            </div>
          </div>
          <div className="mt-6 flex gap-3">
            <AppLink href="/contato" onNavigate={navigate} className="rounded-2xl bg-primary px-4 py-3 text-sm font-semibold text-white">{service.cta?.label}</AppLink>
            <AppLink href="/contato" onNavigate={navigate} className="rounded-2xl border border-near-black/20 px-4 py-3 text-sm font-semibold">Talk to Monynha</AppLink>
          </div>
        </article>
      ))}
    </div>
  </SectionBlock>
);

const OpenSourcePage: React.FC<{ navigate: (href: string) => void }> = ({ navigate }) => (
  <SectionBlock content={openSource} navigate={navigate}>
    <div className="mt-8 grid gap-4 md:grid-cols-3">{openSource.proof?.map((item) => <div key={item} className="rounded-3xl bg-white p-6 text-sm text-near-black/72">{item}</div>)}</div>
  </SectionBlock>
);

const AboutPage: React.FC<{ navigate: (href: string) => void }> = ({ navigate }) => (
  <>
    <SectionBlock content={community} navigate={navigate}>
      <div className="mt-8 grid gap-4 md:grid-cols-2">
        <div className="rounded-3xl bg-white p-6"><h2 className="text-xl font-bold">Inclusividade que não pede licença</h2><p className="mt-3 text-sm leading-7 text-near-black/72">A presença LGBTQIA+ da Monynha é parte da promessa da marca. Não é um detalhe decorativo: informa linguagem, acesso e prioridades.</p></div>
        <div className="rounded-3xl bg-white p-6"><h2 className="text-xl font-bold">Acessibilidade como regra de projeto</h2><p className="mt-3 text-sm leading-7 text-near-black/72">Hierarquia clara, contraste, semântica e links reais sustentam uma experiência mais inclusiva e mais eficiente.</p></div>
      </div>
    </SectionBlock>
    <SectionBlock navigate={navigate} content={{ title: 'Quem lidera a experiência Monynha', subtitle: 'Brand + engineering', body: 'A marca existe para unir profundidade técnica, leitura de produto e compromisso comunitário. Isso vale tanto para cliente quanto para quem acompanha a comunidade e os projetos abertos.' }} />
  </>
);

const ContentPage: React.FC<{ navigate: (href: string) => void }> = ({ navigate }) => {
  const articles = useMemo(() => [
    { title: 'Como diagnosticar gargalos antes de contratar desenvolvimento', summary: 'Uma leitura prática para founders e operações que precisam clareza antes de investir em execução.', href: '/contato' },
    { title: 'Quando open source aumenta confiança comercial', summary: 'O papel da transparência técnica na construção de autoridade e prova.', href: '/open-source' },
    { title: 'Produto, conteúdo e comunidade: por que separar demais enfraquece a marca', summary: 'A visão da Monynha sobre alinhamento entre oferta, experiência e posicionamento.', href: '/sobre' }
  ], []);
  return (
    <SectionBlock navigate={navigate} content={contentHub}>
      <div className="mt-10 grid gap-4 lg:grid-cols-3">
        {articles.map((article) => (
          <article key={article.title} className="rounded-3xl border border-near-black/10 bg-white p-6">
            <h2 className="text-xl font-bold">{article.title}</h2>
            <p className="mt-3 text-sm leading-7 text-near-black/72">{article.summary}</p>
            <AppLink href={article.href} onNavigate={navigate} className="mt-5 inline-flex text-sm font-semibold text-primary">Continuar</AppLink>
          </article>
        ))}
      </div>
    </SectionBlock>
  );
};

const ContactPage: React.FC = () => {
  const [form, setForm] = useState({ name: '', email: '', company: '', interest: 'diagnostic', message: '' });
  const [errors, setErrors] = useState<Partial<Record<keyof typeof form, string>>>({});
  const [success, setSuccess] = useState('');

  const validate = () => {
    const nextErrors: Partial<Record<keyof typeof form, string>> = {};
    if (!form.name.trim()) nextErrors.name = 'Conta pra gente como você prefere ser chamade.';
    if (!form.email.trim()) nextErrors.email = 'Precisamos de um e-mail para responder.';
    else if (!/^\S+@\S+\.\S+$/.test(form.email)) nextErrors.email = 'Esse e-mail parece incompleto.';
    if (!form.message.trim()) nextErrors.message = 'Descreva o contexto para prepararmos a conversa.';
    return nextErrors;
  };

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      setSuccess('');
      return;
    }
    const payload: LeadData = {
      email: form.email,
      brand_name: form.company || form.name,
      no_brand: !form.company,
      revenue_model: 'Serviço',
      decision_profile: 'Prefiro contratar alguém para fazer',
      struggle: form.message,
      website: '',
      instagram: '',
      linkedin: ''
    };
    console.info('contact-submit', payload);
    setSuccess('Mensagem recebida. A Monynha responde com clareza e próximos passos — sem enrolação.');
    setErrors({});
    setForm({ name: '', email: '', company: '', interest: 'diagnostic', message: '' });
  };

  return (
    <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="max-w-3xl space-y-4">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-primary">Contato</p>
        <h1 className="text-4xl font-black tracking-tight sm:text-5xl">Peça um diagnóstico ou inicie uma conversa séria.</h1>
        <p className="text-lg leading-8 text-near-black/72">A microcopy deste formulário foi reescrita para ser humana, inclusiva e clara. Sem rótulos vagos. Sem mensagem robótica.</p>
      </div>
      <form className="mt-10 rounded-[2rem] border border-near-black/10 bg-white p-6 sm:p-8" onSubmit={onSubmit} noValidate>
        <div className="grid gap-5 md:grid-cols-2">
          <label className="text-sm font-medium" htmlFor="contact-name">Nome
            <input id="contact-name" className="mt-2 w-full rounded-2xl border border-near-black/15 px-4 py-3" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} aria-invalid={!!errors.name} aria-describedby={errors.name ? 'name-error' : undefined} />
            {errors.name && <span id="name-error" className="mt-2 block text-sm text-red-700">{errors.name}</span>}
          </label>
          <label className="text-sm font-medium" htmlFor="contact-email">E-mail
            <input id="contact-email" className="mt-2 w-full rounded-2xl border border-near-black/15 px-4 py-3" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} aria-invalid={!!errors.email} aria-describedby={errors.email ? 'email-error' : undefined} />
            {errors.email && <span id="email-error" className="mt-2 block text-sm text-red-700">{errors.email}</span>}
          </label>
          <label className="text-sm font-medium" htmlFor="contact-company">Empresa ou projeto
            <input id="contact-company" className="mt-2 w-full rounded-2xl border border-near-black/15 px-4 py-3" value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} />
          </label>
          <label className="text-sm font-medium" htmlFor="contact-interest">Como podemos ajudar?
            <select id="contact-interest" className="mt-2 w-full rounded-2xl border border-near-black/15 px-4 py-3" value={form.interest} onChange={(e) => setForm({ ...form, interest: e.target.value })}>
              <option value="diagnostic">Quero um diagnóstico</option>
              <option value="build">Quero discutir implementação</option>
              <option value="product">Quero falar sobre um produto</option>
            </select>
          </label>
        </div>
        <label className="mt-5 block text-sm font-medium" htmlFor="contact-message">Contexto
          <textarea id="contact-message" className="mt-2 min-h-40 w-full rounded-2xl border border-near-black/15 px-4 py-3" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} aria-invalid={!!errors.message} aria-describedby={errors.message ? 'message-error' : undefined} placeholder="Conte o problema, o momento do negócio e o que precisa destravar." />
          {errors.message && <span id="message-error" className="mt-2 block text-sm text-red-700">{errors.message}</span>}
        </label>
        <div className="mt-6 flex flex-wrap gap-3">
          <button className="rounded-2xl bg-near-black px-5 py-3 font-semibold text-white" type="submit">Get a diagnosis</button>
          <a className="rounded-2xl border border-near-black/20 px-5 py-3 font-semibold" href="mailto:hello@monynha.com?subject=Talk%20to%20Monynha">Talk to Monynha</a>
        </div>
        {success && <p role="status" className="mt-4 rounded-2xl bg-green-50 px-4 py-3 text-sm text-green-800">{success}</p>}
      </form>
    </section>
  );
};

const App: React.FC = () => {
  const { route, navigate } = useRoute();

  return (
    <Shell route={route} navigate={navigate}>
      {route === '/' && <HomePage navigate={navigate} />}
      {route === '/produtos' && <ProductsPage navigate={navigate} />}
      {route === '/servicos' && <ServicesPage navigate={navigate} />}
      {route === '/open-source' && <OpenSourcePage navigate={navigate} />}
      {route === '/sobre' && <AboutPage navigate={navigate} />}
      {route === '/conteudo' && <ContentPage navigate={navigate} />}
      {route === '/contato' && <ContactPage />}
    </Shell>
  );
};

export default App;
