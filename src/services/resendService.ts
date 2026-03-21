import { LeadData, DiagnosisResult } from '../types';
import { supabase } from './supabaseService';

/**
 * Monynha Softwares - Lead Intelligence & Email Service
 */

export const sendDiagnosticEmail = async (data: LeadData, diagnosis: DiagnosisResult) => {
  try {
    const { data: response, error } = await supabase.functions.invoke(
      'send-diagnostic-email',
      { body: { leadData: data, diagnosis } }
    );

    if (error) {
      throw error;
    }

    if (!response?.success) {
      throw new Error(response?.error || 'Falha no envio do email');
    }

    return { success: true, message: response.message || 'Fluxo de emails concluido.' };
  } catch (error) {
    console.error("Critical Resend Error:", error);
    throw new Error("Mona, deu pane no envio duplo. Os dados foram logados, mas o e-mail não saiu.");
  }
};
