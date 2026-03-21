import { supabase } from './supabaseService';
import { CompanySearchRequest, CompanySearchResult } from '../types';

export const searchCompany = async (payload: CompanySearchRequest) => {
  const { data, error } = await supabase.functions.invoke('company-search', {
    body: payload,
  });

  if (error) {
    throw error;
  }

  if (!data?.success) {
    throw new Error(data?.error || 'Company search failed');
  }

  return data.data as CompanySearchResult;
};
