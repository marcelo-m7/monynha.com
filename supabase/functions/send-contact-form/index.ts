import { serve } from "https://deno.land/std@0.224.0/http/server.ts";
import { Resend } from "npm:resend@3.2.0";

interface ContactFormPayload {
  name: string;
  email: string;
  message: string;
  phone?: string;
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

const escapeHtml = (value: unknown) => {
  const text = typeof value === "string" ? value : String(value ?? "");
  return text
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
};

const buildInternalTemplate = (data: ContactFormPayload, timestamp: string) => `<!DOCTYPE html>
<html lang="pt-BR">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"></head>
<body style="font-family:monospace;background:#0B0B10;color:#FAFAFC;margin:0;padding:20px;">
  <div style="max-width:600px;margin:0 auto;background:#111;border:4px solid #9767e4;border-radius:16px;padding:32px;">
    <h1 style="color:#9767e4;font-size:22px;margin:0 0 8px;">📬 Nova Mensagem · Formulário de Contato</h1>
    <p style="color:#555;font-size:12px;margin:0 0 24px;">${escapeHtml(timestamp)}</p>
    <table style="width:100%;border-collapse:collapse;font-size:14px;">
      <tr><td style="padding:10px 0;border-bottom:1px solid #222;color:#9767e4;font-size:10px;text-transform:uppercase;letter-spacing:2px;width:110px;">Nome</td><td style="padding:10px 0;border-bottom:1px solid #222;">${escapeHtml(data.name)}</td></tr>
      <tr><td style="padding:10px 0;border-bottom:1px solid #222;color:#9767e4;font-size:10px;text-transform:uppercase;letter-spacing:2px;">E-mail</td><td style="padding:10px 0;border-bottom:1px solid #222;"><a href="mailto:${escapeHtml(data.email)}" style="color:#9767e4;">${escapeHtml(data.email)}</a></td></tr>
      ${data.phone ? `<tr><td style="padding:10px 0;border-bottom:1px solid #222;color:#9767e4;font-size:10px;text-transform:uppercase;letter-spacing:2px;">Telefone</td><td style="padding:10px 0;border-bottom:1px solid #222;">${escapeHtml(data.phone)}</td></tr>` : ""}
    </table>
    <div style="margin-top:24px;padding:20px;background:#161616;border-radius:12px;border-left:4px solid #9767e4;">
      <p style="color:#9767e4;font-size:10px;text-transform:uppercase;letter-spacing:2px;margin:0 0 12px;">Mensagem</p>
      <p style="color:#FAFAFC;line-height:1.7;margin:0;white-space:pre-wrap;">${escapeHtml(data.message)}</p>
    </div>
    <div style="margin-top:24px;text-align:center;">
      <a href="mailto:${escapeHtml(data.email)}?subject=Re:%20Mensagem%20de%20Contato%20Monynha" style="display:inline-block;padding:12px 32px;background:#9767e4;color:white;text-decoration:none;border-radius:8px;font-weight:bold;font-size:13px;text-transform:uppercase;letter-spacing:1px;">Responder</a>
    </div>
  </div>
</body>
</html>`;

const buildConfirmationTemplate = (data: ContactFormPayload) => `<!DOCTYPE html>
<html lang="pt-BR">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"></head>
<body style="font-family:'Helvetica Neue',Arial,sans-serif;background:#f0f0f0;margin:0;padding:20px;">
  <div style="max-width:600px;margin:0 auto;background:#FAFAFC;border:4px solid #0B0B10;border-radius:24px;overflow:hidden;">
    <div style="background:#9767e4;padding:36px 32px;text-align:center;">
      <div style="width:60px;height:60px;background:white;border-radius:14px;display:inline-block;line-height:60px;text-align:center;margin-bottom:16px;">
        <span style="font-size:28px;font-weight:900;color:#9767e4;">M</span>
      </div>
      <h1 style="color:white;font-size:26px;margin:0;font-weight:900;text-transform:uppercase;letter-spacing:-1px;">Mensagem recebida!</h1>
    </div>
    <div style="padding:32px;">
      <p style="font-size:20px;font-weight:700;margin:0 0 16px;">Oi, ${escapeHtml(data.name)}! 💜</p>
      <p style="font-size:15px;color:#555;line-height:1.7;margin:0 0 20px;">Recebemos a tua mensagem com sucesso. A nossa equipa vai analisá-la com atenção e retornará em <strong>até 48 horas úteis</strong>.</p>
      <div style="background:#F3EEFF;border:2px solid #9767e4;border-radius:16px;padding:20px;margin:20px 0;">
        <p style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:2px;color:#9767e4;margin:0 0 8px;">A tua mensagem</p>
        <p style="font-size:14px;color:#333;line-height:1.7;margin:0;white-space:pre-wrap;">${escapeHtml(data.message)}</p>
      </div>
      <div style="background:#9767e4;border-radius:16px;padding:24px;text-align:center;margin-top:24px;">
        <p style="color:white;font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:2px;margin:0 0 16px;opacity:0.8;">Precisas de resposta urgente?</p>
        <a href="https://wa.me/41779688872" style="display:inline-block;padding:12px 28px;background:white;color:#9767e4;text-decoration:none;border-radius:12px;font-weight:900;font-size:14px;text-transform:uppercase;letter-spacing:1px;">WhatsApp</a>
      </div>
      <p style="font-size:12px;color:#aaa;line-height:1.6;margin:24px 0 0;border-top:2px solid #eee;padding-top:20px;">
        <strong>Monynha Softwares</strong> · <a href="mailto:hello@monynha.com" style="color:#9767e4;">hello@monynha.com</a> · <a href="https://monynha.com" style="color:#9767e4;">monynha.com</a>
      </p>
    </div>
  </div>
</body>
</html>`;

serve(async (req: Request) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const body = await req.json();
    const { formData } = body as { formData: ContactFormPayload };

    if (!formData?.name?.trim() || !formData?.email?.trim() || !formData?.message?.trim()) {
      return toJsonResponse({ success: false, error: "Missing required fields" }, 400);
    }

    const apiKey = Deno.env.get("RESEND_API_KEY");
    if (!apiKey) return toJsonResponse({ success: false, error: "Missing API key" }, 500);

    const resend = new Resend(apiKey);
    const fromEmail = Deno.env.get("RESEND_FROM_EMAIL") ?? "Monynha Softwares <noreply@monynha.com>";
    const internalEmail = "hello@monynha.com";
    const timestamp = new Date().toLocaleString("pt-PT", { timeZone: "Europe/Lisbon" });

    const [internalResult, confirmResult] = await Promise.allSettled([
      resend.emails.send({
        from: fromEmail,
        to: [internalEmail],
        reply_to: formData.email,
        subject: `📬 Nova Mensagem: ${formData.name} <${formData.email}>`,
        html: buildInternalTemplate(formData, timestamp),
      }),
      resend.emails.send({
        from: fromEmail,
        to: [formData.email],
        subject: `Mensagem recebida, ${formData.name}! 💜`,
        html: buildConfirmationTemplate(formData),
      }),
    ]);

    const internalSent = internalResult.status === "fulfilled" && !internalResult.value?.error;
    const confirmationSent = confirmResult.status === "fulfilled" && !confirmResult.value?.error;

    if (!internalSent) {
      console.error("Internal email failed:", internalResult.status === "rejected" ? internalResult.reason : internalResult.value?.error);
    }

    return toJsonResponse({ success: true, internalSent, confirmationSent });
  } catch (err) {
    console.error("send-contact-form error:", err);
    return toJsonResponse({ success: false, error: err instanceof Error ? err.message : "Unknown error" }, 500);
  }
});
