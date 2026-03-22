import { LeadData, DiagnosisResult } from '../types';
import { supabase } from './supabaseService';

export const generateDiagnosis = async (data: LeadData): Promise<DiagnosisResult> => {
  try {
    const { data: response, error } = await supabase.functions.invoke(
      'generate-diagnosis',
      { body: { leadData: data } }
    );

    if (error) {
      throw error;
    }

    if (!response?.success || !response.data) {
      throw new Error(response?.error || 'Diagnostico indisponivel');
    }

    const result: DiagnosisResult = response.data as DiagnosisResult;
    result.sources = Array.isArray(result.sources) ? result.sources : [];

    return result;
  } catch (error) {
    console.error('AI Diagnosis Error:', error);
    return {
      title: "Mona, o sistema deu uma piscada!",
      description: "Teu negócio tem potencial, mas a tecnologia aqui deu um close errado agora. Pelo que sinto na minha intuição de CEO, você precisa de estrutura e menos achismo.",
      scores: { visibility: 40, conversion: 35, processes: 25 },
      recommendations: [
        "Organizar a casa antes de querer brilhar no feed",
        "Automatizar esse atendimento que tá um caos total",
        "Chamar a Monynha pra uma conversa de gente grande"
      ],
      sources: []
    };
  }
};
