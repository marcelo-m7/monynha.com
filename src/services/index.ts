export { supabase, saveLead, fetchLeadByEmail, fetchAllLeads, updateLeadStatus, deleteLead } from './supabaseService';
export { generateDiagnosis } from './geminiService';
export { sendDiagnosticEmail } from './resendService';
export { sendContactConfirmation } from './contactConfirmationService';
export { searchCompany } from './companySearchService';
