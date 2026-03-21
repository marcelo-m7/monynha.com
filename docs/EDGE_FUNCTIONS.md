# Referência de Edge Functions

As Edge Functions atuais estão em `supabase/functions/`.

## Comportamento comum

- Runtime: Deno
- Métodos HTTP:
  - `OPTIONS` para preflight
  - `POST` para execução
- CORS: `Access-Control-Allow-Origin: *`
- Configuração de auth em cada `config.toml`:

```toml
[function]
verify_jwt = false
```

## 1) `company-search`

Arquivo: `supabase/functions/company-search/index.ts`

### Input

```json
{
  "query": "Nome da marca",
  "website": "https://example.com",
  "instagram": "brand_handle",
  "linkedin": "https://linkedin.com/company/example"
}
```

Pelo menos um desses sinais é obrigatório.

### Comportamento

- Normaliza instagram para `@handle`.
- Se `website` existir, faz fetch do HTML com timeout de 4s.
- Extrai `<title>` e `<meta name="description">`.
- Retorna warnings quando o fetch do website falha.

### Output (sucesso)

```json
{
  "success": true,
  "data": {
    "name": "Nome da marca",
    "website": "https://example.com",
    "instagram": "@brand_handle",
    "linkedin": "https://linkedin.com/company/example",
    "summary": "Meta description",
    "signals": {
      "websiteTitle": "Título do site",
      "websiteDescription": "Meta description"
    },
    "warnings": []
  }
}
```

## 2) `generate-diagnosis`

Arquivo: `supabase/functions/generate-diagnosis/index.ts`

### Secret obrigatório

- `GEMINI_API_KEY`

### Input

```json
{
  "leadData": {
    "email": "lead@example.com",
    "brand_name": "Marca",
    "no_brand": false,
    "revenue_model": "Servico",
    "decision_profile": "Faco tudo",
    "website": "https://example.com",
    "instagram": "@brand",
    "linkedin": "https://linkedin.com/company/brand",
    "struggle": "Perrengue principal do negócio"
  }
}
```

(`revenue_model` e `decision_profile` seguem os enums do app.)

### Comportamento

- Usa modelo: `gemini-3-flash-preview`.
- Habilita grounding com Google Search (`tools: [{ googleSearch: {} }]`).
- Força schema de resposta JSON com campos:
  - `title`
  - `description`
  - `scores.visibility|conversion|processes`
  - `recommendations[]`
- Extrai fontes de grounding dos metadados do candidato.
- Em caso de falha, retorna diagnóstico fallback (ainda com `success: true`, mais `warning: "fallback"`).

## 3) `send-contact-confirmation`

Arquivo: `supabase/functions/send-contact-confirmation/index.ts`

### Secrets obrigatórios

- `RESEND_API_KEY`
- `RESEND_FROM_EMAIL` (fallback opcional: `hello@monynha.com`)
- `MONYNHA_INTERNAL_EMAIL` (fallback opcional: `hello@monynha.com`)

### Input

```json
{
  "contactData": {
    "email": "lead@example.com",
    "brand_name": "Marca",
    "no_brand": false,
    "revenue_model": "Serviço",
    "decision_profile": "Faço tudo",
    "website": "https://example.com",
    "instagram": "@brand",
    "linkedin": "https://linkedin.com/company/brand",
    "struggle": "Perrengue principal"
  }
}
```

### Comportamento

- Disparada imediatamente ao receber o submit do wizard, antes do diagnóstico.
- Valida `contactData.email` e `contactData.struggle`.
- Envia dois e-mails com helper de retry (`sendWithRetry`):
  - confirmação ao lead
  - notificação interna
- Retorna flags `confirmationSent` e `internalSent` para logging granular.
- Sucesso parcial (apenas um dos e-mails enviado) retorna `success: true` com warnings.

### Output (sucesso)

```json
{
  "success": true,
  "message": "Contact confirmation sent",
  "confirmationSent": true,
  "internalSent": true
}
```

## 4) `send-diagnostic-email`

Arquivo: `supabase/functions/send-diagnostic-email/index.ts`

### Secrets obrigatórios

- `RESEND_API_KEY`
- `RESEND_FROM_EMAIL` (fallback opcional: `hello@monynha.com`)
- `MONYNHA_INTERNAL_EMAIL` (fallback opcional: `hello@monynha.com`)

### Input

```json
{
  "leadData": { "email": "lead@example.com", "...": "..." },
  "diagnosis": { "title": "...", "scores": { "visibility": 1, "conversion": 1, "processes": 1 }, "recommendations": [] }
}
```

### Comportamento

- Calcula score/classificação do lead.
- Envia dois e-mails:
  - e-mail de diagnóstico ao lead
  - e-mail de notificação interna
- Usa helper de retry (`sendWithRetry`).

## Uso no frontend

O frontend chama as functions via `supabase.functions.invoke(...)` em:

- `src/services/companySearchService.ts`
- `src/services/geminiService.ts`
- `src/services/resendService.ts`
- `src/services/contactConfirmationService.ts`

## Nota operacional

Como `verify_jwt=false`, esses endpoints não são protegidos por JWT pela config da function. Restrinja a exposição com política de rede e gerenciamento cuidadoso de chaves.

## Atualização recente (a11y/performance)

- Modal de time em `AboutSite` agora usa semântica de diálogo (`role="dialog"`, `aria-modal`, foco inicial no botão fechar e fechamento por `Esc`).
- Avatares remotos em componentes visuais receberam `loading="lazy"` e `decoding="async"` para reduzir custo inicial de renderização.
- Ícone decorativo de seleção no wizard recebeu `aria-hidden="true"` para evitar ruído para leitores de tela.

