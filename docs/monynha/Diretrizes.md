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

### 3.3 Componentes shadcn/ui

* Estender tokens via `/styles/tokens.ts`; suporte nativo descrito na doc ([ui.shadcn.com][12]).
* Botões & cards: `rounded-2xl`, `shadow-md`.
* “Badge Pride” utiliza gradiente Progress Flag, mas fallback sólido em modo high-contrast.

### 3.4 Acessibilidade & Inclusão

* Seguir W3C visão “Accessibility + Usability + Inclusion” ([W3C][13]).
* Escrever em linguagem simples, sem gíria exclusiva quando o público for internacional – IxDF define isso como pilar de *inclusive design* ([The Interaction Design Foundation][14]).
* Checklist de conteúdo inclusivo (alt-text, hierarquia, contraste) — ver guia AudioEye ([AudioEye][15]).


---

## 5 • Conteúdo & Linguagem

* **Vocabulário-ponte:** quando usar termos de *Pajubá* (ex.: *mona*, *bafón*), ofereça tooltip com significado, educando sem excluir público novo ([Wikipédia][1]).
* **Storytelling de falhas:** publicar *post-mortems* mostrando erros e aprendizados cria confiança — prática recomendada em relatórios de autenticidade de marca ([csrwindo.com][17]).
* **Imagens & ilustrações:** representar corpos racializados, afeminados, não-binários, pessoas com deficiência (Medium/YellowChalk) ([Medium][6]).

---

1. Brand Identity and Narrative
1.1 Linguistic Meaning of "Monynha"
The brand name Monynha carries a playful and culturally rich connotation. In Portuguese, adding the
suffix “-inha” is a diminutive form often used to convey affection or endearment . The name
"Monynha" thus suggests something cherished or beloved, setting a warm and approachable tone for
the brand. It evokes familiarity – much like calling someone by a nickname – and signals that Monynha
1. 
2. 
3. 
4. 
5. 
1
1
Softwares is friendly, non-corporate, and community-oriented. By adopting a diminutive, the brand
positions itself as humble yet personable, distinguishing it from more impersonal tech companies. This
linguistic choice is intentional: it aligns with Monynha’s goal of making technology feel more human and
accessible. The Monynha name is meant to be easy to remember and say, inviting users from different
cultures to engage with it without intimidation.
Beyond the affectionate tone, the name may also carry personal significance within the company’s
culture. It could be a homage to a community nickname or simply a creative moniker chosen to stand
out. Regardless of origin, Monynha sets the stage for a brand identity that is welcoming and inclusive.
It   hints   at   Latin   roots   (with   the   Portuguese/Spanish-sounding   “-inha”),   reflecting   the   company’s
connection  to  Lusophone  (Portuguese-speaking)  culture.  This  resonates  especially  with  Brazilian
Portuguese speakers, where “moninha/monynha” might be interpreted as an endearing term for
someone or something cute and loved. The use of such a name underscores the brand’s commitment
to warmth and relatability – values that carry through to its design and messaging.
1.2 Community Values: LGBTQIA+ Inclusion and Class Solidarity
Monynha Softwares is not just a tech brand; it is built on a strong foundation of social and political
values. Chief among these is a deep commitment to the LGBTQIA+ community. The brand embraces
diversity and strives to be a safe, empowering presence for queer individuals in the tech space. This is
reflected in internal policies (inclusive hiring, representation) and external messaging (support for Pride
events, inclusive imagery and language). Monynha draws inspiration from the resilience and creativity
of LGBTQIA+ culture – emphasizing that technology should uplift marginalized voices rather than
exclude them. In line with this ethos, Monynha’s narrative echoes missions of organizations like LGBT
Tech, aiming to  “empower and uplift LGBTQ+ individuals, ensuring [they have] the tools, resources, and
access they need to thrive” . By aligning itself with LGBTQIA+ empowerment, Monynha positions its
platform as one where everyone, regardless of gender or sexual identity, can participate in and benefit
from technology.
Alongside queer inclusion, class solidarity is a core pillar of Monynha’s brand narrative. The company is
outspoken about the need to bridge the digital divide and ensure that working-class and disadvantaged
communities  have  equal  access  to  technological  opportunities.  In  practice,  this  means  Monynha
Softwares supports open-source projects, offers affordable (or free) services, and provides educational
resources to those who historically have been left behind by the tech industry. The name “Monynha”
itself, with its approachable vibe, signifies a break from elitist tech culture – it’s technology by the
people, for the people. The brand often highlights that technology should not be a luxury or privilege,
but a common good. This philosophy echoes the broader concept of  digital inclusion, defined as
providing access and use of digital technologies to all people regardless of socio-economic background
. Monynha actively works to  “help everyone, especially those who are disadvantaged or historically
excluded, to have the access and skills to fully participate in the digital world.”  In practical terms, this
could involve community tech workshops, sliding-scale pricing, or collaboration with non-profits to
distribute hardware and knowledge.
By fusing LGBTQIA+ advocacy with class consciousness, Monynha Softwares crafts a unique narrative of
solidarity. The company culture celebrates intersectionality – understanding that factors like class, race,
gender identity, and sexual orientation can compound to create barriers in tech. Monynha’s story is
about tearing down those barriers. Whether it’s sponsoring a hackathon for underprivileged queer
youth   or   implementing   policies   that   ensure   its   software   runs   on   low-cost   hardware,   the   brand
consistently infuses its social values into its business decisions. Inclusivity is not just a buzzword for
Monynha; it’s an operational principle. The brand’s visual identity (rainbow accents or other pride
symbolism, alongside imagery of diverse users) and content (blog posts on feminist and anti-racist tech
2
3
3
2
perspectives, for example) reinforce this stance. In summary, Monynha Softwares stands as a politically
aware tech entity – one that believes empowering marginalized communities and fostering class
solidarity will lead to richer innovation and a fairer digital future.
1.3 Mission Statement: Democratizing Access to Technology
All  the  above  elements  –  the  affectionate  name,  the  inclusive  values  –  coalesce  into  Monynha’s
overarching mission: to democratize access to technology. This mission statement is the guiding star
for the company’s projects and initiatives. Democratizing access means making technology available
and understandable to as many people as possible, removing traditional barriers such as high cost,
steep learning curves, or exclusive gatekeeping of knowledge. The company often states that high-
quality software and digital tools should not be the realm of only large corporations or wealthy
individuals, but should be within reach for the broader populace. This philosophy is in harmony with the
open-source   movement,   where   sharing   and   collaboration  “have   not   only   democratized   access   to
technology but also fostered a culture of transparency, inclusivity, and community-building.”  Monynha
leverages open-source frameworks and contributes back to the community, aligning its mission with
the idea that freely shared knowledge in tech leads to empowerment for all.
In practice, the mission of democratizing tech access manifests in several ways. First, Monynha.com
itself is envisioned as an educational and welcoming portal – featuring multilingual content (to break
language   barriers)   and   straightforward   explanations   of   technical   concepts   (to   break   knowledge
barriers). The platform might provide free resources or guides to help newcomers learn about software
development or digital literacy. There is a clear parallel to many global efforts where providing “tools,
resources, and access [for communities] to thrive” is key . For Monynha, that could mean offering a free
tier for its products, or building software specifically tailored to non-profit and community uses.
Secondly, the mission shows up in the product design: Monynha’s software prioritizes user-friendliness
and   accessibility   (as   detailed   in   later   sections   of   this   document).   The   rationale   is   that   complex,
unintuitive tools can alienate people who are new to technology. To truly democratize tech, Monynha
Softwares designs interfaces that are intuitive and inclusive for a wide range of users – from seasoned
developers to first-time internet users. This includes adhering to accessibility standards and providing
support in multiple languages, as well as ensuring performance on low-end devices. It’s about meeting
users where they are.
Finally, democratizing access also means advocacy. Monynha uses its platform to advocate for policies
and standards that keep technology open and fair. For instance, the company vocally supports  net
neutrality, open internet initiatives, and digital rights, understanding that systemic issues can
impact equal access. Internally, Monynha’s diverse team and collaborative culture reflect the belief that
innovation flourishes when everyone has a seat at the table. By emphasizing class solidarity, the company
also situates itself as an ally to labor and community movements, possibly structuring as a cooperative
or engaging in profit-sharing to live its values.
In summary, Monynha Softwares’ mission of democratizing technology is not an empty slogan – it is
evidenced   by   concrete   commitments:  open-source ethos, multilingual and accessible design,
community outreach, and advocacy for an inclusive tech ecosystem. The brand identity and
narrative all serve this mission. Monynha wants to be known as  “the people’s tech company,” where
empowerment of the many outweighs the profit of the few. Every chapter of the technical specification
that follows, from architecture choices to UX design, is influenced by this mission, ensuring that
Monynha.com is built not just as a corporate website, but as a manifestation of these deeply held
ideals.
4
2

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
