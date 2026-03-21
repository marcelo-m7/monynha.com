import { serve } from "https://deno.land/std@0.224.0/http/server.ts";
import { Resend } from "npm:resend@3.2.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.1";

interface LeadPayload {
  email?: string;
  brand_name?: string;
  no_brand?: boolean;
  revenue_model?: string;
  decision_profile?: string;
  website?: string;
  instagram?: string;
  linkedin?: string;
  struggle?: string;
}

interface DiagnosisPayload {
  title?: string;
  description?: string;
  scores?: {
    visibility?: number;
    conversion?: number;
    processes?: number;
  };
  recommendations?: string[];
}

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const toJsonResponse = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });

const logEdgeCall = async (input: {
  functionName: string;
  leadEmail?: string | null;
  status: "success" | "error";
  errorMessage?: string | null;
  metadata?: Record<string, unknown>;
}) => {
  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const supabaseAnonKey = Deno.env.get("SUPABASE_ANON_KEY");
  if (!supabaseUrl || !supabaseAnonKey) return;

  try {
    const supabase = createClient(supabaseUrl, supabaseAnonKey, { auth: { persistSession: false } });
    await supabase.rpc("log_edge_function_call", {
      p_function_name: input.functionName,
      p_lead_email: input.leadEmail ?? null,
      p_status: input.status,
      p_error_message: input.errorMessage ?? null,
      p_metadata: input.metadata ?? {},
    });
  } catch (error) {
    console.warn("edge log failed", error);
  }
};

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const escapeHtml = (value: unknown) => {
  const text = typeof value === "string" ? value : String(value ?? "");
  return text
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
};

type LeadClassification = '🔥 High Potential' | '🟡 Medium Potential' | '⚪ Low Potential' | '🤡 Likely Joke';

const calculateLeadScore = (data: LeadPayload): { score: number; classification: LeadClassification } => {
  let score = 0;

  if (!data.no_brand && data.brand_name?.length > 2) score += 20;
  if (['Serviço', 'Produto', 'Assinatura'].includes(data.revenue_model)) score += 20;

  if (data.decision_profile === 'Prefiro contratar alguém para fazer' || data.decision_profile === 'Estou mais procupade em vender') {
    score += 30;
  } else if (data.decision_profile === 'Faço tudo') {
    score += 10;
  }

  if (data.struggle?.length > 100) score += 30;
  else if (data.struggle?.length > 50) score += 15;

  let classification: LeadClassification = '⚪ Low Potential';
  if (score >= 80) classification = '🔥 High Potential';
  else if (score >= 50) classification = '🟡 Medium Potential';
  else if (score < 20) classification = '🤡 Likely Joke';

  return { score, classification };
};

const buildLeadTemplate = (data: LeadPayload, diagnosis: DiagnosisPayload) => `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <style>
    body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; color: #0B0B10; line-height: 1.6; }
    .container { max-width: 600px; margin: 0 auto; border: 4px solid #0B0B10; padding: 40px; background-color: #FAFAFC; }
    .logo { background-color: #9767e4; color: white; display: inline-block; padding: 10px 20px; font-weight: bold; font-size: 24px; border: 3px solid #0B0B10; margin-bottom: 30px; }
    .greeting { font-size: 28px; font-weight: 800; margin-bottom: 20px; }
    .title { font-size: 22px; font-weight: 700; color: #9767e4; margin-top: 30px; }
    .score-box { background: #fff; border: 2px solid #0B0B10; padding: 20px; margin: 20px 0; box-shadow: 4px 4px 0px 0px #0B0B10; }
    .recommendation { background: #9767e4; color: white; padding: 15px; margin-bottom: 10px; border: 2px solid #0B0B10; font-weight: bold; }
    .cta { margin-top: 40px; padding: 25px; background: #0B0B10; color: white; text-align: center; font-weight: bold; }
    .footer { font-size: 10px; color: #888; text-align: center; margin-top: 40px; text-transform: uppercase; }
  </style>
</head>
<body>
  <div class="container">
    <div class="logo">MONYNHA SOFTWARES</div>
    <div class="greeting">Oi, moninha!</div>
    <p>Recebemos o seu pedido de ajuda lá no nosso Wizard e, gata, eu parei tudo pra analisar o teu império digital.</p>
    <div class="title">Seu Diagnóstico: ${escapeHtml(diagnosis.title)}</div>
    <p>${escapeHtml(diagnosis.description)}</p>
    <div class="score-box">
      <strong>Saúde do teu Império Digital:</strong><br/>
      • Visibilidade: ${escapeHtml(diagnosis.scores?.visibility ?? 0)}%<br/>
      • Conversão: ${escapeHtml(diagnosis.scores?.conversion ?? 0)}%<br/>
      • Processos: ${escapeHtml(diagnosis.scores?.processes ?? 0)}%
    </div>
    <div class="title">Roadmap para o Close Certo:</div>
    ${(diagnosis.recommendations ?? []).map((rec: string) => `<div class="recommendation">${escapeHtml(rec)}</div>`).join('')}
    <div class="cta">
      Responda a esse e-mail agora mesmo que minha equipe vai entrar em contato contigo pra fazer a mágica acontecer.
    </div>
    <div class="footer">Technology with Pride & Resistance • Monynha Softwares 2025</div>
  </div>
</body>
</html>
`;

const buildInternalTemplate = (data: LeadPayload, diagnosis: DiagnosisPayload, score: number, classification: string, timestamp: string, userAgent: string) => `
<!DOCTYPE html>
<html lang="pt-BR">
<body>
  <div style="font-family: sans-serif; border: 10px solid #9767e4; padding: 30px;">
    <h1 style="background: #9767e4; color: white; padding: 10px;">NOVO LEAD QUALIFICADO 💅</h1>
    <h2 style="font-size: 24px;">Classificação: ${escapeHtml(classification)} (Score: ${escapeHtml(score)}/100)</h2>
    <hr/>
    <h3>Dados do Lead:</h3>
    <ul>
      <li><strong>Email:</strong> ${escapeHtml(data.email)}</li>
      <li><strong>Marca:</strong> ${escapeHtml(data.brand_name || (data.no_brand ? 'Sem Nome' : 'N/A'))}</li>
      <li><strong>Modelo:</strong> ${escapeHtml(data.revenue_model || 'N/A')}</li>
      <li><strong>Perfil:</strong> ${escapeHtml(data.decision_profile || 'N/A')}</li>
      <li><strong>Site:</strong> ${escapeHtml(data.website || 'N/A')}</li>
      <li><strong>Insta:</strong> ${escapeHtml(data.instagram || 'N/A')}</li>
      <li><strong>LinkedIn:</strong> ${escapeHtml(data.linkedin || 'N/A')}</li>
    </ul>
    <h3>O Perrengue:</h3>
    <p style="background: #f0f0f0; padding: 15px; font-style: italic;">"${escapeHtml(data.struggle || 'N/A')}"</p>
    <h3>Diagnóstico Gerado (AI):</h3>
    <p><strong>Título:</strong> ${escapeHtml(diagnosis.title)}</p>
    <p><strong>Scores:</strong> V:${escapeHtml(diagnosis.scores?.visibility ?? 0)} | C:${escapeHtml(diagnosis.scores?.conversion ?? 0)} | P:${escapeHtml(diagnosis.scores?.processes ?? 0)}</p>
    <hr/>
    <p style="font-size: 11px; color: #666;">
      <strong>Data:</strong> ${escapeHtml(timestamp)}<br/>
      <strong>Browser:</strong> ${escapeHtml(userAgent)}
    </p>
  </div>
</body>
</html>
`;

const sendWithRetry = async (sendFn: () => Promise<unknown>, retries = 2) => {
  let lastError: unknown;
  for (let attempt = 0; attempt <= retries; attempt += 1) {
    try {
      return await sendFn();
    } catch (error) {
      lastError = error;
      if (attempt < retries) {
        await sleep(400 * (attempt + 1));
      }
    }
  }
  throw lastError;
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return toJsonResponse({ success: false, error: "Method not allowed" }, 405);
  }

  try {
    const body = await req.json();
    const leadData = body?.leadData as LeadPayload | undefined;
    const diagnosis = body?.diagnosis as DiagnosisPayload | undefined;

    if (!leadData?.email || !diagnosis?.title) {
      await logEdgeCall({
        functionName: "send-diagnostic-email",
        leadEmail: leadData?.email ?? null,
        status: "error",
        errorMessage: "Missing lead data or diagnosis",
      });
      return toJsonResponse({ success: false, error: "Missing lead data or diagnosis" }, 400);
    }

    const resendKey = Deno.env.get("RESEND_API_KEY");
    if (!resendKey) {
      await logEdgeCall({
        functionName: "send-diagnostic-email",
        leadEmail: leadData.email ?? null,
        status: "error",
        errorMessage: "RESEND_API_KEY not configured",
      });
      return toJsonResponse({ success: false, error: "RESEND_API_KEY not configured" }, 500);
    }

    const resend = new Resend(resendKey);
    const { score, classification } = calculateLeadScore(leadData);
    const timestamp = new Date().toLocaleString('pt-BR');
    const userAgent = req.headers.get('user-agent') || 'unknown';

    const fromEmail = Deno.env.get('RESEND_FROM_EMAIL') || 'hello@monynha.com';
    const internalEmail = Deno.env.get('MONYNHA_INTERNAL_EMAIL') || 'hello@monynha.com';

    const leadHtml = buildLeadTemplate(leadData, diagnosis);
    const internalHtml = buildInternalTemplate(leadData, diagnosis, score, classification, timestamp, userAgent);

    await sendWithRetry(() => resend.emails.send({
      from: fromEmail,
      to: leadData.email,
      subject: `Seu diagnóstico Monynha: ${diagnosis.title}`,
      html: leadHtml,
    }));

    await sendWithRetry(() => resend.emails.send({
      from: fromEmail,
      to: internalEmail,
      subject: `Novo lead: ${leadData.email}`,
      html: internalHtml,
    }));

    await logEdgeCall({
      functionName: "send-diagnostic-email",
      leadEmail: leadData.email ?? null,
      status: "success",
      metadata: { classification, score },
    });

    return toJsonResponse({ success: true, message: "Fluxo de emails concluído." });
  } catch (error) {
    console.error("send-diagnostic-email error", error);
    await logEdgeCall({
      functionName: "send-diagnostic-email",
      status: "error",
      errorMessage: error instanceof Error ? error.message : "Erro ao enviar emails",
    });
    return toJsonResponse({ success: false, error: "Erro ao enviar emails" }, 500);
  }
});
