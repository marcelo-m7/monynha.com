import { supabase } from './supabaseService';
import { ContactFormData } from '../types';

export const sendContactFormMessage = async (data: ContactFormData): Promise<{ success: boolean }> => {
  const { data: response, error } = await supabase.functions.invoke('send-contact-form', {
    body: { formData: data },
  });

  if (error) throw error;
  if (!response?.success) throw new Error(response?.error || 'Failed to send contact form');

  return { success: true };
};
