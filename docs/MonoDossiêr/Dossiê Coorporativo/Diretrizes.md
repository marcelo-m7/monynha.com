**Resumo rápido —** A identidade da **Monynha Softwares** precisa unir dois eixos: (1) **design contemporâneo (shadcn/ui + Tailwind)** para entregar produtos de alto nível, e (2) **manifesto político-social** que celebra a cultura LGBTQIA+ brasileira e a criatividade popular de classes trabalhadoras. Abaixo você encontra um guia completo que amarra esses dois mundos: narrativa de marca, valores, tom de voz, diretrizes visuais (cores + tipos + ícones), acessibilidade, estratégias de inclusão e como aplicar tudo nos seus domínios.

---

## 1 • Narrativa & Manifesto

### Origem do nome

* **“Mona”** vem do dialeto *Pajubá*, gíria de resistência usada pela comunidade LGBT no Brasil para se referir de forma afetuosa a outra pessoa — “ei, mona!” ([Wikipédia][1])
* O sufixo **“-nynha”** dialoga com a prática onomástica popular de grafias criativas (Karolayne, Jhonatan etc.), comuns em camadas sociais de menor renda e vistas como marca de identidade e afirmação ([scispace.com][2]).
* A combinação reforça humildade (“diminutivo”) + orgulho periférico, assumindo a luta contra conservadorismos que tentam padronizar nomes, corpos e vozes.

### Propósito

> **“Democratizar tecnologia, combater hipocrisia e dar voz a quem cria fora do padrão.”**

* **Democratização via open-source:** projetos como **Boteco Pro** e **EcoPool** ficam abertos a contribuições e reduzem barreiras de custo, seguindo a lógica de que ecossistemas abertos aceleram inclusão ([IT Pro][3], [Forbes][4]).
* **Resistência cultural:** manter presença pública mesmo diante de reações conservadoras fortalece representatividade queer no tech — marcas globais que sustentam inclusão, mesmo sob boicotes, ampliam recall e fidelidade ([TIME][5]).

---

## 2 • Valores & Tom de Voz

| Valor           | Como aparece no conteúdo                                    |
| --------------- | ----------------------------------------------------------- |
| **Orgulho**     | Linguagem afirmativa, celebra vitórias LGBTQIA+             |
| **Honestidade** | Transparência em roadmap, pricing & dados                   |
| **Humildade**   | Humor autodepreciativo, “fala de boteco” em posts           |
| **Resiliência** | Storytelling de erros, P\&D aberto, falhas como aprendizado |
| **Acolhimento** | Tratamento neutro/inclusivo de gênero, feedback seguro      |

**Tom:** claro, didático e próximo (“fala tu, mona!”) — mistura o arquétipo **Creator** com **Everyman**, para inovar sem soar elitista ([Medium][6], [OUT loud][7]).

---

## 3 • Diretrizes Visuais

### 3.1 Cores

| Token                    | HEX Light                                                               | HEX Dark                                | Observação           |
| ------------------------ | ----------------------------------------------------------------------- | --------------------------------------- | -------------------- |
| `--primary`              | `#7C3AED`                                                               | `#C4B5FD`                               | Violeta jovem (base) |
| `--secondary`            | `#0EA5E9`                                                               | `#38BDF8`                               | Azul otimista        |
| **Faixa Pride (acento)** | Progress Pride palette (11 cores) ([flagcolorcodes.com][8])             | Usa diagonal de 16 px em CTAs especiais |                      |
| `--success / --error`    | Verde #22C55E / Vermelho #E40303 (cores da bandeira) ([kapwing.com][9]) |                                         |                      |

> **Uso estratégico:** a paleta arco-íris aparece em pequenos detalhes (badges, loader, evento). PFLAG recomenda “usar com parcimônia para evitar ruído visual” ([pflag.org][10]).

### 3.2 Tipografia

* **Inter** (texto) — alta legibilidade 
* **Space Grotesk** (títulos) — caráter geométrico diferenciado 
* **JetBrains Mono** (código) — reforça foco dev.
  Todos pesos revisados para contraste ≥ 4.5:1 conforme WCAG 2.1 ([W3C][11]).

### 3.3 Componentes shadcn /ui

* Estender tokens via `/styles/tokens.ts`; suporte nativo descrito na doc ([ui.shadcn.com][12]).
* Botões & cards: `rounded-2xl`, `shadow-md`.
* “Badge Pride” utiliza gradiente Progress Flag, mas fallback sólido em modo high-contrast.

### 3.4 Acessibilidade & Inclusão

* Seguir W3C visão “Accessibility + Usability + Inclusion” ([W3C][13]).
* Escrever em linguagem simples, sem gíria exclusiva quando o público for internacional – IxDF define isso como pilar de *inclusive design* ([The Interaction Design Foundation][14]).
* Checklist de conteúdo inclusivo (alt-text, hierarquia, contraste) — ver guia AudioEye ([AudioEye][15]).

---

## 4 • Aplicação nos Domínios

| Domínio              | Identidade específica                                                                                                                                               |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **monynha.com**      | Hub institucional; hero com gradiente Violeta→Azul + micro-rainbow na logo.                                                                                         |
| **monynha.tech**     | Blog técnico; “Badge Open Source” + comentários destacando diversidade de autores.                                                                                  |
| **monynha.store**    | Fichas de produto mostram selos “feito por devs queer & periféricos”.                                                                                               |
| **monynha.online**   | Dashboard default dark-mode; tokens Pride usados nos gráficos de métrica.                                                                                           |
| **monynha.me**       | UI clean; cadastro inclui pronome livre; barra de progresso colorida em Pride.                                                                                      |
| **monynha.website**  | Ambiente de demos; banner que explica “por que demos públicas importam para democratização” com link para Forbes/ITPro sobre OSS ([IT Pro][3]).                     |
| **monynha.pt / .eu** | Conteúdo bilíngue (PT/EN) com ênfase em impacto social na Europa; página “Resistência” cita exemplos internacionais de inclusão de marcas ([brand the change][16]). |

---

## 5 • Conteúdo & Linguagem

* **Vocabulário-ponte:** quando usar termos de *Pajubá* (ex.: *mona*, *bafón*), ofereça tooltip com significado, educando sem excluir público novo ([Wikipédia][1]).
* **Storytelling de falhas:** publicar *post-mortems* mostrando erros e aprendizados cria confiança — prática recomendada em relatórios de autenticidade de marca ([csrwindo.com][17]).
* **Imagens & ilustrações:** representar corpos racializados, afeminados, não-binários, pessoas com deficiência (Medium/YellowChalk) ([Medium][6]).

---

[1]: https://en.wikipedia.org/wiki/Pajub%C3%A1?utm_source=chatgpt.com "Pajubá"
[2]: https://scispace.com/pdf/analise-fonologica-de-nomes-proprios-de-origem-estrangeira-e-2g5y1uxqf5.pdf?utm_source=chatgpt.com "[PDF] Análise fonológica de nomes próprios de origem ... - SciSpace"
[3]: https://www.itpro.com/technology/artificial-intelligence/open-source-why-open-ecosystems-matter?utm_source=chatgpt.com "Open source: Why open ecosystems matter"
[4]: https://www.forbes.com/sites/laurencebradford/2018/03/26/how-open-source-development-is-democratizing-the-tech-industry/?utm_source=chatgpt.com "How Open-Source Development Is Democratizing The Tech Industry"
[5]: https://time.com/6269728/trans_representation_nike-budlight-backlash/?utm_source=chatgpt.com "From Bud Light to Nike, Brands Are Facing Conservative Backlash for Featuring Trans People. Why They're Sticking to Their Decisions"
[6]: https://yellowchalkuiux.medium.com/designing-with-pride-inclusive-design-experiences-for-all-efc18b4c35b?utm_source=chatgpt.com "Designing with Pride: Inclusive Design Experiences for All"
[7]: https://outloud.lgbt/case-studies/?utm_source=chatgpt.com "LGBT Inclusive Marketing Case Studies - OUT loud"
[8]: https://www.flagcolorcodes.com/progress-pride?utm_source=chatgpt.com "Progress Pride Flag Color Codes with HEX, RGB, CMYK & Pantone"
[9]: https://www.kapwing.com/resources/official-pride-colors-2021-exact-color-codes-for-15-pride-flags/?utm_source=chatgpt.com "Official Pride Colors 2025: Exact Color Codes for 15 Pride Flags"
[10]: https://pflag.org/wp-content/uploads/2023/01/PFLAG-BrandGuide-National-2024.pdf?utm_source=chatgpt.com "[PDF] Brand Style Guide | PFLAG"
[11]: https://www.w3.org/TR/WCAG21/?utm_source=chatgpt.com "Web Content Accessibility Guidelines (WCAG) 2.1 - W3C"
[12]: https://ui.shadcn.com/docs/theming?utm_source=chatgpt.com "Theming - shadcn/ui"
[13]: https://www.w3.org/WAI/fundamentals/accessibility-usability-inclusion/?utm_source=chatgpt.com "Accessibility, Usability, and Inclusion - W3C"
[14]: https://www.interaction-design.org/literature/topics/inclusive-design?srsltid=AfmBOooBP7IGdnknJg0SUBm-SeTT6eImBOwjVPFTObkP_jyGUVdGKC1L&utm_source=chatgpt.com "What is Inclusive Design? — updated 2025 | IxDF"
[15]: https://www.audioeye.com/post/9-ways-to-design-inclusive-content/?utm_source=chatgpt.com "9 Ways to Design Inclusive Content - AudioEye"
[16]: https://brandthechange.org/blog/pride-amsterdam-lgbt-brand-case-study?srsltid=AfmBOoo_gC3qcyui7eV3-QcFKCtqmHKA7GYhPubaRPxT70jTO1K6y0IQ&utm_source=chatgpt.com "New in the library: the Pride Amsterdam Brand Case Study 2024"
[17]: https://csrwindo.com/insights-new/from-ad-to-action/?utm_source=chatgpt.com "From Ad to Action: LGBTQ+ Brand Authenticity Examined - Windō"
