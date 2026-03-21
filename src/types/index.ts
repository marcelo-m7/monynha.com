export type RevenueModel = 'Serviço' | 'Produto' | 'Assinatura' | 'Outro';
export type DecisionProfile = 'Faço tudo' | 'Prefiro contratar alguém para fazer' | 'Estou mais procupade em vender' | 'Não sei ainda, to perdide';

export interface LeadData {
  email: string;
  brand_name: string;
  no_brand: boolean;
  revenue_model: RevenueModel;
  other_revenue_model?: string;
  decision_profile: DecisionProfile;
  website?: string;
  instagram?: string;
  linkedin?: string;
  struggle: string;
}

export interface GroundingSource {
  title: string;
  uri: string;
}

export interface DiagnosisResult {
  title: string;
  description: string;
  scores: {
    visibility: number;
    conversion: number;
    processes: number;
  };
  recommendations: string[];
  sources?: GroundingSource[];
}

export interface CompanySearchRequest {
  query?: string;
  website?: string;
  instagram?: string;
  linkedin?: string;
}

export interface CompanySearchResult {
  name?: string;
  website?: string;
  instagram?: string;
  linkedin?: string;
  summary?: string;
  signals?: Record<string, string>;
  warnings?: string[];
}
