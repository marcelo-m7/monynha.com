import { serve } from "https://deno.land/std@0.224.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.1";

interface CompanySearchPayload {
  query?: unknown;
  website?: unknown;
  instagram?: unknown;
  linkedin?: unknown;
}

const MAX_HTML_CHARS = 200_000;

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

const isPrivateOrLocalHost = (hostname: string) => {
  const host = hostname.toLowerCase();
  if (["localhost", "127.0.0.1", "::1"].includes(host)) return true;
  if (host.endsWith(".local")) return true;
  if (/^10\./.test(host)) return true;
  if (/^192\.168\./.test(host)) return true;
  if (/^172\.(1[6-9]|2[0-9]|3[0-1])\./.test(host)) return true;
  return false;
};

const normalizeWebsiteUrl = (value: string) => {
  try {
    const url = new URL(value);
    if (!/^https?:$/.test(url.protocol)) return null;
    if (isPrivateOrLocalHost(url.hostname)) return null;
    return url.toString();
  } catch {
    return null;
  }
};

const normalizeHandle = (value?: string) => {
  if (!value) return undefined;
  const trimmed = value.trim();
  if (!trimmed) return undefined;
  return trimmed.startsWith("@") ? trimmed : `@${trimmed}`;
};

const fetchWithTimeout = async (input: RequestInfo, init: RequestInit, ms: number) => {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), ms);
  try {
    return await fetch(input, { ...init, signal: controller.signal });
  } finally {
    clearTimeout(timeout);
  }
};

const extractMeta = (html: string) => {
  const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i);
  const descMatch = html.match(/<meta[^>]+name=["']description["'][^>]+content=["']([^"']+)["'][^>]*>/i);
  return {
    title: titleMatch?.[1]?.trim(),
    description: descMatch?.[1]?.trim(),
  };
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return toJsonResponse({ success: false, error: "Method not allowed" }, 405);
  }

  try {
    const body = (await req.json()) as CompanySearchPayload;
    const query = typeof body?.query === "string" ? body.query.trim() : "";
    const rawWebsite = typeof body?.website === "string" ? body.website.trim() : "";
    const instagram = typeof body?.instagram === "string" ? body.instagram.trim() : "";
    const linkedin = typeof body?.linkedin === "string" ? body.linkedin.trim() : "";
    const website = rawWebsite ? normalizeWebsiteUrl(rawWebsite) : null;

    if (!query && !website && !instagram && !linkedin) {
      return toJsonResponse({
        success: false,
        error: "Provide at least one search signal.",
      }, 400);
    }

    const warnings: string[] = [];
    let websiteTitle: string | undefined;
    let websiteDescription: string | undefined;

    if (rawWebsite && !website) {
      warnings.push("Website URL was ignored because it is invalid or not allowed.");
    }

    if (website) {
      try {
        const response = await fetchWithTimeout(
          website,
          { headers: { "User-Agent": "MonynhaBot/1.0" } },
          4000
        );

        if (!response.ok) {
          warnings.push(`Website responded with HTTP ${response.status}.`);
        }

        const html = (await response.text()).slice(0, MAX_HTML_CHARS);
        const meta = extractMeta(html);
        websiteTitle = meta.title;
        websiteDescription = meta.description;
      } catch {
        warnings.push("Website fetch failed.");
      }
    }

    const result = {
      name: query || undefined,
      website: website || undefined,
      instagram: normalizeHandle(instagram),
      linkedin: linkedin || undefined,
      summary: websiteDescription || undefined,
      signals: {
        websiteTitle: websiteTitle || "",
        websiteDescription: websiteDescription || "",
      },
      warnings,
    };

    await logEdgeCall({
      functionName: "company-search",
      status: "success",
      metadata: {
        query,
        website: website || null,
        instagram: normalizeHandle(instagram),
        linkedin: linkedin || null,
        warnings,
      },
    });

    return toJsonResponse({ success: true, data: result });
  } catch {
    await logEdgeCall({
      functionName: "company-search",
      status: "error",
      errorMessage: "Invalid request payload",
    });
    return toJsonResponse({ success: false, error: "Invalid request payload" }, 400);
  }
});
