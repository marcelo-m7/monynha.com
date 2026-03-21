import '@testing-library/jest-dom';
import { vi } from 'vitest';

// Mock environment variables
process.env.VITE_SUPABASE_URL = process.env.VITE_SUPABASE_URL || 'https://test.supabase.co';
process.env.VITE_SUPABASE_ANON_KEY = process.env.VITE_SUPABASE_ANON_KEY || 'test_anon_key';

// Setup global mocks
global.fetch = vi.fn();

// Suppress console.error in tests to reduce noise
global.console.error = vi.fn();
