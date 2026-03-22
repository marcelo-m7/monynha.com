import { serve } from "https://deno.land/std@0.224.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.1";

interface LeadDataPayload {
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

interface DiagnosisShape {
  title: string;
  description: string;
  scores: {
    visibility: number;
    conversion: number;
    processes: number;
  };
  recommendations: string[];
  sources?: { title: string; uri: string }[];
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
  const supabaseServiceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? Deno.env.get("SUPABASE_ANON_KEY");
  if (!supabaseUrl || !supabaseServiceRoleKey) return;

  try {
    const supabase = createClient(supabaseUrl, supabaseServiceRoleKey, { auth: { persistSession: false } });
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

const clampScore = (value: unknown, fallback: number) => {
  const numeric = typeof value === "number" ? value : Number(value);
  if (!Number.isFinite(numeric)) return fallback;
  return Math.max(0, Math.min(100, Math.round(numeric)));
};

const sanitizeText = (value: unknown, fallback: string) => {
  if (typeof value !== "string") return fallback;
  const trimmed = value.trim();
  return trimmed.length ? trimmed : fallback;
};

const normalizeDiagnosis = (raw: unknown): DiagnosisShape => {
  const fallback = fallbackDiagnosis();
  const candidate = typeof raw === "object" && raw !== null ? raw as Record<string, unknown> : {};

  const recs = Array.isArray(candidate.recommendations)
    ? candidate.recommendations.filter((item): item is string => typeof item === "string").map((item) => item.trim()).filter(Boolean)
    : [];

  return {
    title: sanitizeText(candidate.title, fallback.title),
    description: sanitizeText(candidate.description, fallback.description),
    scores: {
      visibility: clampScore((candidate.scores as Record<string, unknown> | undefined)?.visibility, fallback.scores.visibility),
      conversion: clampScore((candidate.scores as Record<string, unknown> | undefined)?.conversion, fallback.scores.conversion),
      processes: clampScore((candidate.scores as Record<string, unknown> | undefined)?.processes, fallback.scores.processes),
    },
    recommendations: [...recs, ...fallback.recommendations].slice(0, 3),
    sources: [],
  };
};

const extractJsonPayload = (text: string) => {
  const cleaned = text
    .replace(/^```json\s*/i, "")
    .replace(/^```/i, "")
    .replace(/```$/i, "")
    .trim();

  return cleaned || "{}";
};

const OPENAI_URL = "https://api.openai.com/v1/chat/completions";

const buildPrompt = (leadData: LeadDataPayload) => `
Você é estrategista sênior da Monynha Softwares, com linguagem profissional, direta e orientada à execução.

Objetivo: produzir um diagnóstico acionável para este lead com base apenas nas informações fornecidas.

Contexto do lead:
- Marca: ${leadData.brand_name || (leadData.no_brand ? 'Ainda em gestação (sem nome)' : 'Não informada')}
- Site: ${leadData.website || 'N/A'}
- Instagram: ${leadData.instagram || 'N/A'}
- LinkedIn: ${leadData.linkedin || 'N/A'}
- Modelo de negócio: ${leadData.revenue_model}
- Perfil de decisão: ${leadData.decision_profile}
- Perrengue principal: "${leadData.struggle}"

Regras obrigatórias:
1. title: curto, memorável e em tom de close certo.
2. description: um parágrafo com leitura de cenário, riscos e oportunidade imediata.
3. scores: inteiros de 0 a 100.
  - visibility: presença em busca e redes.
  - conversion: clareza de proposta e facilidade de contato/compra.
  - processes: maturidade operacional e automação.
4. recommendations: exatamente 3 recomendações práticas, em formato de ação (verbos no infinitivo).

Restrições de saída:
- Retorne apenas JSON válido.
- Não use markdown, cercas de código ou texto fora do JSON.
- Não inclua chaves além de: title, description, scores, recommendations.
`;

const callOpenAIForDiagnosis = async (leadData: LeadDataPayload, apiKey: string): Promise<DiagnosisShape> => {
  const response = await fetch(OPENAI_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      temperature: 0.4,
      response_format: {
        type: "json_schema",
        json_schema: {
          name: "diagnosis",
          strict: true,
          schema: {
            type: "object",
            additionalProperties: false,
            properties: {
              title: { type: "string" },
              description: { type: "string" },
              scores: {
                type: "object",
                additionalProperties: false,
                properties: {
                  visibility: { type: "integer" },
                  conversion: { type: "integer" },
                  processes: { type: "integer" },
                },
                required: ["visibility", "conversion", "processes"],
              },
              recommendations: {
                type: "array",
                minItems: 3,
                maxItems: 3,
                items: { type: "string" },
              },
            },
            required: ["title", "description", "scores", "recommendations"],
          },
        },
      },
      messages: [
        {
          role: "system",
          content: "Você produz diagnósticos estratégicos curtos e acionáveis para PMEs.",
        },
        {
          role: "user",
          content: buildPrompt(leadData),
        },
      ],
    }),
  });

  if (!response.ok) {
    const bodyText = await response.text();
    throw new Error(`OpenAI error ${response.status}: ${bodyText.slice(0, 300)}`);
  }

  const payload = await response.json();
  const content = payload?.choices?.[0]?.message?.content;
  const jsonStr = extractJsonPayload(typeof content === "string" ? content : "{}");
  return normalizeDiagnosis(JSON.parse(jsonStr));
};

const fallbackDiagnosis = () => ({
  title: "Mona, o sistema deu uma piscada!",
  description: "Teu negócio tem potencial, mas a tecnologia aqui deu um close errado agora. Pelo que sinto na minha intuição de CEO, você precisa de estrutura e menos achismo.",
  scores: { visibility: 40, conversion: 35, processes: 25 },
  recommendations: [
    "Organizar a casa antes de querer brilhar no feed",
    "Automatizar esse atendimento que tá um caos total",
    "Chamar a Monynha pra uma conversa de gente grande",
  ],
  sources: [],
});

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return toJsonResponse({ success: false, error: "Method not allowed" }, 405);
  }

  try {
    const body = await req.json();
    const leadData = body?.leadData as LeadDataPayload | undefined;

    if (!leadData?.email || !leadData?.struggle) {
      await logEdgeCall({
        functionName: "generate-diagnosis",
        leadEmail: leadData?.email ?? null,
        status: "error",
        errorMessage: "Missing required lead data",
      });
      return toJsonResponse({ success: false, error: "Missing required lead data" }, 400);
    }

    const apiKey = Deno.env.get("OPENAI_API_KEY");
    if (!apiKey) {
      await logEdgeCall({
        functionName: "generate-diagnosis",
        leadEmail: leadData.email ?? null,
        status: "error",
        errorMessage: "OPENAI_API_KEY not configured",
      });
      return toJsonResponse({ success: false, error: "OPENAI_API_KEY not configured" }, 500);
    }

    const diagnosis = await callOpenAIForDiagnosis(leadData, apiKey);
    diagnosis.sources = [];

    await logEdgeCall({
      functionName: "generate-diagnosis",
      leadEmail: leadData.email ?? null,
      status: "success",
      metadata: {
        sources: diagnosis.sources ?? [],
        fallback: false,
      },
    });

    return toJsonResponse({ success: true, data: diagnosis });
  } catch (error) {
    console.error("generate-diagnosis error", error);
    await logEdgeCall({
      functionName: "generate-diagnosis",
      status: "error",
      errorMessage: error instanceof Error ? error.message : "Unknown error",
      metadata: { fallback: true },
    });
    return toJsonResponse({ success: true, data: fallbackDiagnosis(), warning: "fallback" });
  }
});
