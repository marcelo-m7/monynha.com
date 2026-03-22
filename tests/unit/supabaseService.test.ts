import { beforeEach, describe, expect, it, vi } from 'vitest';
import type { LeadData, DiagnosisResult } from '../../src/types';

// Hoist mock functions to avoid TDZ issues
const { rpcMock, singleMock, rangeMock, orderMock, selectMock, eqMock, updateMock, deleteMock, fromMock } = vi.hoisted(() => {
  const singleMock = vi.fn();
  const eqMock = vi.fn();
  const rangeMock = vi.fn();
  const orderMock = vi.fn();
  const selectMock = vi.fn();
  const updateMock = vi.fn();
  const deleteMock = vi.fn();
  const rpcMock = vi.fn();
  const fromMock = vi.fn();

  return {
    rpcMock,
    singleMock,
    rangeMock,
    orderMock,
    selectMock,
    eqMock,
    updateMock,
    deleteMock,
    fromMock,
  };
});

// Mock Supabase client
vi.mock('@supabase/supabase-js', () => ({
  createClient: vi.fn(() => ({
    rpc: rpcMock,
    from: fromMock,
  })),
}));

import {
  deleteLead,
  fetchAllLeads,
  fetchLeadByEmail,
  saveLead,
  updateLeadStatus,
} from '../../src/services/supabaseService';

const leadData: LeadData = {
  email: 'test@monynha.com',
  brand_name: 'Monynha',
  no_brand: false,
  revenue_model: 'Serviço',
  decision_profile: 'Faço tudo',
  struggle: 'Preciso escalar processos',
  website: 'https://monynha.com',
  instagram: '@marcelo.santos.027',
  linkedin: 'https://www.linkedin.com/in/marcelo-m7/',
};

const diagnosisData: DiagnosisResult = {
  title: 'Diagnóstico Inicial',
  description: 'Há oportunidades claras de otimização.',
  scores: {
    visibility: 70,
    conversion: 65,
    processes: 55,
  },
  recommendations: ['Mapear funil', 'Automatizar follow-up'],
};

describe('supabaseService', () => {
  beforeEach(() => {
    vi.clearAllMocks();

    // Default mock setup
    orderMock.mockReturnValue({ range: rangeMock });
    rangeMock.mockResolvedValue({ data: [], error: null, count: 0 });
    singleMock.mockResolvedValue({ data: null, error: null });
    rpcMock.mockResolvedValue({ data: [{ lead_id: 'lead-1', diagnosis_id: 'diag-1' }], error: null });

    // Setup fromMock to return different chains based on the table
    fromMock.mockImplementation((table: string) => {
      if (table === 'leads') {
        return {
          select: selectMock,
          update: updateMock,
          delete: deleteMock,
        };
      }
      if (table === 'diagnoses') {
        return {
          select: selectMock,
        };
      }
      return { select: selectMock };
    });

    // Setup selectMock to handle different query patterns
    selectMock.mockImplementation((...args: unknown[]) => {
      const hasCount = args.length > 1 && typeof args[1] === 'object' && (args[1] as any)?.count === 'exact';
      
      if (hasCount) {
        // Pagination: .select('*', { count: 'exact' }).order().range()
        return { order: orderMock };
      }
      // Normal query: .select('*').eq().single()
      return { eq: eqMock };
    });

    // Setup eqMock to return chainable objects
    eqMock.mockImplementation(() => ({
      single: singleMock,
      select: selectMock,
    }));

    // Setup updateMock chain
    updateMock.mockImplementation(() => ({
      eq: vi.fn(() => ({
        select: () => Promise.resolve({ data: null, error: null }),
      })),
    }));

    // Setup deleteMock chain
    deleteMock.mockImplementation(() => ({
      eq: vi.fn(() => Promise.resolve({ data: null, error: null })),
    }));
  });

  it('saveLead should call RPC and return success payload', async () => {
    const result = await saveLead(leadData, diagnosisData);

    expect(rpcMock).toHaveBeenCalledWith(
      'save_lead_with_diagnosis',
      expect.objectContaining({
        p_email: leadData.email,
        p_diagnosis_title: diagnosisData.title,
      })
    );
    expect(result.success).toBe(true);
    expect(result.data?.[0].lead_id).toBe('lead-1');
  });

  it('saveLead should throw when RPC returns error', async () => {
    rpcMock.mockResolvedValueOnce({ data: null, error: { message: 'boom' } });

    await expect(saveLead(leadData, diagnosisData)).rejects.toBeTruthy();
  });

  it('fetchLeadByEmail should return lead with diagnoses', async () => {
    // First call: fetch lead by email
    singleMock.mockResolvedValueOnce({
      data: { id: 'lead-1', email: leadData.email, brand_name: leadData.brand_name },
      error: null,
    });

    // Second call: fetch diagnoses - need to mock the second select chain
    selectMock
      .mockReturnValueOnce({ eq: eqMock }) // First call to .select() for leads
      .mockReturnValueOnce({ 
        eq: vi.fn(() => 
          Promise.resolve({
            data: [{ id: 'diag-1', lead_id: 'lead-1', title: 'x' }],
            error: null,
          })
        ) 
      }); // Second call to .select() for diagnoses

    const result = await fetchLeadByEmail(leadData.email);

    expect(result?.lead.email).toBe(leadData.email);
    expect(result?.diagnoses).toHaveLength(1);
  });

  it('fetchLeadByEmail should return null when lead is missing', async () => {
    // Mock .single() to return null data
    singleMock.mockResolvedValueOnce({ data: null, error: null });

    const result = await fetchLeadByEmail('missing@monynha.com');

    expect(result).toBeNull();
    // Verify only one call was made (to fetch lead, not diagnoses)
    expect(fromMock).toHaveBeenCalledTimes(1);
    expect(fromMock).toHaveBeenCalledWith('leads');
  });

  it('fetchAllLeads should return paginated result', async () => {
    rangeMock.mockResolvedValueOnce({
      data: [{ id: 'lead-1' }],
      error: null,
      count: 1,
    });

    const result = await fetchAllLeads(10, 0);

    expect(result.leads).toHaveLength(1);
    expect(result.total).toBe(1);
  });

  it('updateLeadStatus should update and return success', async () => {
    // Mock the update().eq().select() chain
    updateMock.mockReturnValueOnce({
      eq: vi.fn().mockReturnValueOnce({
        select: vi.fn().mockResolvedValueOnce({ 
          data: [{ id: 'lead-1', status: 'contacted' }], 
          error: null 
        }),
      }),
    });

    const result = await updateLeadStatus('lead-1', 'contacted');

    expect(result.success).toBe(true);
    expect(result.data?.[0].status).toBe('contacted');
  });

  it('deleteLead should delete and return success', async () => {
    eqMock.mockResolvedValueOnce({ error: null });

    const result = await deleteLead('lead-1');

    expect(result.success).toBe(true);
  });
});
