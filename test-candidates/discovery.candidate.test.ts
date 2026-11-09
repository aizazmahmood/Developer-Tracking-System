import { describe, expect, it } from 'vitest';
import standard from '../vitest.config.mts';
import candidates from '../vitest.candidates.config.mts';

describe('B10 integrated default discovery', () => {
  it('includes ordinary and scaffold tests while retaining zero-test failure', () => {
    expect(standard.test?.include).toEqual([
      'tests/unit/**/*.test.{ts,tsx}',
      'tests/integration/**/*.test.{ts,tsx}',
      'tests/acceptance/**/*.test.{ts,tsx}',
      'test-candidates/**/*.candidate.test.{ts,tsx}',
    ]);
    expect(standard.test?.exclude).toEqual(['node_modules/**', '.webpack/**', 'out/**']);
    expect(standard.test?.environment).toBe('node');
    expect(standard.test?.passWithNoTests).toBe(false);
    expect(candidates.test?.include).toEqual(['test-candidates/**/*.candidate.test.{ts,tsx}']);
    expect(candidates.test?.passWithNoTests).toBe(false);
  });
});
