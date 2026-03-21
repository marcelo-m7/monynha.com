import { describe, it, expect } from 'vitest';
import { LeadData, DiagnosisResult, RevenueModel, DecisionProfile } from '../../src/types';

describe('Types', () => {
  describe('LeadData', () => {
    it('should validate required fields', () => {
      const validLead: LeadData = {
        email: 'test@example.com',
        brand_name: 'Test Brand',
        no_brand: false,
        revenue_model: 'Serviço',
        decision_profile: 'Faço tudo',
        struggle: 'Digital presence'
      };

      expect(validLead.email).toBe('test@example.com');
      expect(validLead.brand_name).toBe('Test Brand');
      expect(validLead.revenue_model).toBe('Serviço');
    });

    it('should allow optional fields', () => {
      const leadWithOptional: LeadData = {
        email: 'test@example.com',
        brand_name: 'Test Brand',
        no_brand: false,
        revenue_model: 'Produto',
        decision_profile: 'Prefiro contratar alguém para fazer',
        struggle: 'Scale',
        website: 'https://example.com',
        instagram: '@example',
        linkedin: 'linkedin.com/company/example'
      };

      expect(leadWithOptional.website).toBe('https://example.com');
      expect(leadWithOptional.instagram).toBe('@example');
    });

    it('should handle no_brand flag correctly', () => {
      const noBrandLead: LeadData = {
        email: 'startup@example.com',
        brand_name: '',
        no_brand: true,
        revenue_model: 'Assinatura',
        decision_profile: 'Não sei ainda, to perdide',
        struggle: 'Market fit'
      };

      expect(noBrandLead.no_brand).toBe(true);
    });
  });

  describe('DiagnosisResult', () => {
    it('should have valid score structure', () => {
      const diagnosis: DiagnosisResult = {
        title: 'Test Diagnosis',
        description: 'Test description',
        scores: {
          visibility: 75,
          conversion: 50,
          processes: 85
        },
        recommendations: ['Rec 1', 'Rec 2', 'Rec 3']
      };

      expect(diagnosis.scores.visibility).toBeGreaterThanOrEqual(0);
      expect(diagnosis.scores.visibility).toBeLessThanOrEqual(100);
      expect(diagnosis.recommendations).toHaveLength(3);
    });
  });

  describe('Revenue Models', () => {
    it('should accept valid revenue models', () => {
      const models: RevenueModel[] = ['Serviço', 'Produto', 'Assinatura', 'Outro'];
      
      models.forEach(model => {
        expect(['Serviço', 'Produto', 'Assinatura', 'Outro']).toContain(model);
      });
    });
  });

  describe('Decision Profiles', () => {
    it('should accept valid decision profiles', () => {
      const profiles: DecisionProfile[] = ['Faço tudo', 'Prefiro contratar alguém para fazer', 'Estou mais procupade em vender', 'Não sei ainda, to perdide'];
      
      profiles.forEach(profile => {
        expect(['Faço tudo', 'Prefiro contratar alguém para fazer', 'Estou mais procupade em vender', 'Não sei ainda, to perdide']).toContain(profile);
      });
    });
  });
});
