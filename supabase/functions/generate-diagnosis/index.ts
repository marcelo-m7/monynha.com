import { serve } from "https://deno.land/std@0.224.0/http/server.ts";
import { GoogleGenAI, Type } from "npm:@google/genai";
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

const buildPrompt = (leadData: LeadDataPayload) => `
Você é a CEO da Monynha Softwares, consultoria de tecnologia e branding com voz babadeira: estratégica, técnica, direta, empoderada e com leve ironia ao amadorismo.

Objetivo: produzir um diagnóstico acionável para este lead.

Use a ferramenta de busca do Google para investigar o negócio e sinais de presença digital.

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

    const apiKey = Deno.env.get("GEMINI_API_KEY");
    if (!apiKey) {
      await logEdgeCall({
        functionName: "generate-diagnosis",
        leadEmail: leadData.email ?? null,
        status: "error",
        errorMessage: "GEMINI_API_KEY not configured",
      });
      return toJsonResponse({ success: false, error: "GEMINI_API_KEY not configured" }, 500);
    }

    const ai = new GoogleGenAI({ apiKey });
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: buildPrompt(leadData),
      config: {
        tools: [{ googleSearch: {} }],
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            description: { type: Type.STRING },
            scores: {
              type: Type.OBJECT,
              properties: {
                visibility: { type: Type.INTEGER },
                conversion: { type: Type.INTEGER },
                processes: { type: Type.INTEGER },
              },
              required: ["visibility", "conversion", "processes"],
            },
            recommendations: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
            },
          },
          required: ["title", "description", "scores", "recommendations"],
        },
      },
    });

    const jsonStr = extractJsonPayload(response.text || "");
    const diagnosis = normalizeDiagnosis(JSON.parse(jsonStr));

    const sources: { title: string; uri: string }[] = [];
    const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
    if (groundingChunks) {
      for (const chunk of groundingChunks) {
        if (chunk?.web?.uri && chunk?.web?.title) {
          sources.push({ title: chunk.web.title, uri: chunk.web.uri });
        }
      }
    }

    const uniqueSources = Array.from(new Map(sources.map((source) => [source.uri, source])).values());
    diagnosis.sources = uniqueSources;

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
