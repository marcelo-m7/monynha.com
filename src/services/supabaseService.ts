import { createClient } from '@supabase/supabase-js';
import { Database } from '../supabase.types';
import { LeadData, DiagnosisResult } from '../types';

/**
 * Monynha Softwares - Supabase Persistence Layer
 * Manages all database interactions for leads and diagnoses
 */

// Initialize Supabase client
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error(
    'Supabase configuration is missing. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.'
  );
}

export const supabase = createClient<Database>(supabaseUrl, supabaseKey);

/**
 * Save lead with diagnosis to Supabase
 * Uses the save_lead_with_diagnosis function for atomic insertion
 */
export const saveLead = async (data: LeadData, diagnosis: DiagnosisResult) => {
  const payload = {
    p_email: data.email,
    p_brand_name: data.brand_name || (data.no_brand ? 'Ainda sem nome' : 'Não informado'),
    p_no_brand: data.no_brand,
    p_revenue_model: data.revenue_model,
    p_other_revenue_model: data.other_revenue_model || null,
    p_decision_profile: data.decision_profile,
    p_website: data.website || null,
    p_instagram: data.instagram || null,
    p_linkedin: data.linkedin || null,
    p_struggle: data.struggle,
    p_diagnosis_title: diagnosis.title,
    p_diagnosis_description: diagnosis.description,
    p_visibility_score: diagnosis.scores.visibility,
    p_conversion_score: diagnosis.scores.conversion,
    p_processes_score: diagnosis.scores.processes,
    p_recommendations: diagnosis.recommendations
  };

  const { data: result, error } = await supabase.rpc(
    'save_lead_with_diagnosis',
    payload
  );

  if (error) {
    console.error('❌ Error saving lead to Supabase:', {
      message: error.message,
      code: error.code,
      details: error.details,
      hint: error.hint,
    });
    throw error;
  }

  return { success: true, data: result };
};

/**
 * Fetch lead with diagnosis by email
 */
export const fetchLeadByEmail = async (email: string) => {
  const { data: leads, error: leadsError } = await supabase
    .from('leads')
    .select('*')
    .eq('email', email)
    .single();

  if (leadsError) {
    console.error("❌ Error fetching lead:", leadsError.message);
    throw leadsError;
  }

  if (!leads) return null;

  // Fetch associated diagnoses
  const { data: diagnoses, error: diagError } = await supabase
    .from('diagnoses')
    .select('*')
    .eq('lead_id', leads.id);

  if (diagError) {
    console.error("❌ Error fetching diagnoses:", diagError.message);
    throw diagError;
  }

  return { lead: leads, diagnoses };
};

/**
 * Fetch all leads (admin only)
 */
export const fetchAllLeads = async (limit = 50, offset = 0) => {
  const { data: leads, error, count } = await supabase
    .from('leads')
    .select('*', { count: 'exact' })
    .order('created_at', { ascending: false })
    .range(offset, offset + limit - 1);

  if (error) {
    console.error("❌ Error fetching leads:", error.message);
    throw error;
  }

  return { leads, total: count };
};

/**
 * Update lead status
 */
export const updateLeadStatus = async (leadId: string, status: string) => {
  const { data, error } = await supabase
    .from('leads')
    .update({ status })
    .eq('id', leadId)
    .select();

  if (error) {
    console.error("❌ Error updating lead status:", error.message);
    throw error;
  }

  return { success: true, data };
};

/**
 * Delete lead and associated data
 */
export const deleteLead = async (leadId: string) => {
  // Cascade delete is handled by the database foreign keys
  const { error } = await supabase
    .from('leads')
    .delete()
    .eq('id', leadId);

  if (error) {
    console.error("❌ Error deleting lead:", error.message);
    throw error;
  }

  return { success: true };
};
