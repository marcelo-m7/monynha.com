import { serve } from "https://deno.land/std@0.224.0/http/server.ts";
import { Resend } from "npm:resend@3.2.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.1";

interface ContactPayload {
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

const buildConfirmationTemplate = (data: ContactPayload) => `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <style>
    body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; color: #0B0B10; line-height: 1.6; }
    .container { max-width: 600px; margin: 0 auto; border: 4px solid #0B0B10; padding: 40px; background-color: #FAFAFC; }
    .logo { background-color: #9767e4; color: white; display: inline-block; padding: 10px 20px; font-weight: bold; font-size: 24px; border: 3px solid #0B0B10; margin-bottom: 30px; }
    .greeting { font-size: 28px; font-weight: 800; margin-bottom: 20px; }
    .content { font-size: 16px; margin: 20px 0; }
    .highlight { background: #9767e4; color: white; padding: 20px; margin: 20px 0; border: 2px solid #0B0B10; font-weight: bold; text-align: center; }
    .footer { font-size: 10px; color: #888; text-align: center; margin-top: 40px; text-transform: uppercase; }
  </style>
</head>
<body>
  <div class="container">
    <div class="logo">MONYNHA SOFTWARES</div>
    <div class="greeting">Recebemos teu contato, mona!</div>
    <div class="content">
      <p>E vamos te responder em breve. Prometemos que não vai demorar — aqui a gente não deixa ninguém no vácuo.</p>
      <p>Enquanto isso, já estamos analisando as informações que você compartilhou sobre <strong>${escapeHtml(data.brand_name || (data.no_brand ? 'seu projeto' : 'seu negócio'))}</strong>.</p>
    </div>
    <div class="highlight">
      Em até 48h úteis, nossa equipe entra em contato com próximos passos.
    </div>
    <div class="content">
      <p>Se tiver alguma urgência ou dúvida extra, pode responder este email diretamente.</p>
      <p><strong>Valeu pela confiança!</strong></p>
    </div>
    <div class="footer">Technology with Pride & Resistance • Monynha Softwares 2026</div>
  </div>
</body>
</html>
`;

const buildInternalNotificationTemplate = (data: ContactPayload, timestamp: string, userAgent: string) => `
<!DOCTYPE html>
<html lang="pt-BR">
<body>
  <div style="font-family: sans-serif; border: 10px solid #9767e4; padding: 30px;">
    <h1 style="background: #9767e4; color: white; padding: 10px;">🚨 NOVO CONTATO RECEBIDO</h1>
    <p style="font-size: 16px; font-weight: bold;">Um novo lead preencheu o formulário. Detalhes abaixo:</p>
    <hr/>
    <h3>📋 Informações do Contato:</h3>
    <ul>
      <li><strong>Email:</strong> ${escapeHtml(data.email)}</li>
      <li><strong>Marca:</strong> ${escapeHtml(data.brand_name || (data.no_brand ? 'Ainda sem nome' : 'N/A'))}</li>
      <li><strong>Modelo de Negócio:</strong> ${escapeHtml(data.revenue_model || 'N/A')}</li>
      <li><strong>Perfil de Decisão:</strong> ${escapeHtml(data.decision_profile || 'N/A')}</li>
      <li><strong>Website:</strong> ${escapeHtml(data.website || 'N/A')}</li>
      <li><strong>Instagram:</strong> ${escapeHtml(data.instagram || 'N/A')}</li>
      <li><strong>LinkedIn:</strong> ${escapeHtml(data.linkedin || 'N/A')}</li>
    </ul>
    <h3>💬 O Perrengue Relatado:</h3>
    <p style="background: #f0f0f0; padding: 15px; font-style: italic; border-left: 4px solid #9767e4;">
      "${escapeHtml(data.struggle || 'Não especificado')}"
    </p>
    <hr/>
    <p style="font-size: 11px; color: #666;">
      <strong>Data de Envio:</strong> ${escapeHtml(timestamp)}<br/>
      <strong>User Agent:</strong> ${escapeHtml(userAgent)}<br/>
      <strong>Tipo:</strong> Confirmação de Contato (Fallback)
    </p>
    <p style="background: #fff3cd; padding: 10px; border: 1px solid #ffc107; margin-top: 20px;">
      ⚠️ <strong>Atenção:</strong> Este é um email de fallback. O diagnóstico automatizado pode ter falhado ou ainda estar processando.
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
    const contactData = body?.contactData as ContactPayload | undefined;

    if (!contactData?.email || !contactData?.struggle) {
      await logEdgeCall({
        functionName: "send-contact-confirmation",
        leadEmail: contactData?.email ?? null,
        status: "error",
        errorMessage: "Missing required contact data",
      });
      return toJsonResponse({ success: false, error: "Missing required contact data" }, 400);
    }

    const resendKey = Deno.env.get("RESEND_API_KEY");
    if (!resendKey) {
      await logEdgeCall({
        functionName: "send-contact-confirmation",
        leadEmail: contactData.email ?? null,
        status: "error",
        errorMessage: "RESEND_API_KEY not configured",
      });
      return toJsonResponse({ success: false, error: "RESEND_API_KEY not configured" }, 500);
    }

    const resend = new Resend(resendKey);
    const timestamp = new Date().toLocaleString('pt-BR');
    const userAgent = req.headers.get('user-agent') || 'unknown';

    const fromEmail = Deno.env.get('RESEND_FROM_EMAIL') || 'hello@monynha.com';
    const internalEmail = Deno.env.get('MONYNHA_INTERNAL_EMAIL') || 'hello@monynha.com';

    const confirmationHtml = buildConfirmationTemplate(contactData);
    const internalHtml = buildInternalNotificationTemplate(contactData, timestamp, userAgent);

    // Send confirmation to lead
    let confirmationSent = false;
    let internalSent = false;
    const errors: string[] = [];

    try {
      await sendWithRetry(() => resend.emails.send({
        from: fromEmail,
        to: contactData.email,
        subject: "Recebemos seu contato! 💜",
        html: confirmationHtml,
      }));
      confirmationSent = true;
    } catch (error) {
      console.error("Failed to send confirmation email:", error);
      errors.push(`Confirmation: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }

    // Send internal notification
    try {
      await sendWithRetry(() => resend.emails.send({
        from: fromEmail,
        to: internalEmail,
        subject: `🚨 Novo Contato: ${contactData.email}`,
        html: internalHtml,
      }));
      internalSent = true;
    } catch (error) {
      console.error("Failed to send internal notification:", error);
      errors.push(`Internal: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }

    await logEdgeCall({
      functionName: "send-contact-confirmation",
      leadEmail: contactData.email ?? null,
      status: (confirmationSent || internalSent) ? "success" : "error",
      errorMessage: errors.length > 0 ? errors.join('; ') : null,
      metadata: { confirmationSent, internalSent },
    });

    if (!confirmationSent && !internalSent) {
      return toJsonResponse({ 
        success: false, 
        error: "Failed to send both emails",
        details: errors 
      }, 500);
    }

    return toJsonResponse({ 
      success: true, 
      message: "Contact confirmation sent",
      confirmationSent,
      internalSent,
      warnings: errors.length > 0 ? errors : undefined
    });
  } catch (error) {
    console.error("send-contact-confirmation error", error);
    await logEdgeCall({
      functionName: "send-contact-confirmation",
      status: "error",
      errorMessage: error instanceof Error ? error.message : "Unknown error",
    });
    return toJsonResponse({ success: false, error: "Failed to process contact confirmation" }, 500);
  }
});
