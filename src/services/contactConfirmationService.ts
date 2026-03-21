import { LeadData } from '../types';
import { supabase } from './supabaseService';

/**
 * Monynha Softwares - Fallback Contact Confirmation Service
 * Sends confirmation emails regardless of diagnosis generation status
 */

export const sendContactConfirmation = async (data: LeadData) => {
  try {
    const { data: response, error } = await supabase.functions.invoke(
      'send-contact-confirmation',
      { body: { contactData: data } }
    );

    if (error) {
      throw error;
    }

    if (!response?.success) {
      throw new Error(response?.error || 'Failed to send contact confirmation');
    }

    return { 
      success: true, 
      message: response.message || 'Contact confirmation sent',
      confirmationSent: response.confirmationSent,
      internalSent: response.internalSent,
      warnings: response.warnings
    };
  } catch (error) {
    console.error("Contact Confirmation Error:", error);
    throw new Error("Falha ao enviar e-mails de confirmação de contato. Os dados foram capturados, mas a notificação não saiu.");
  }
};
