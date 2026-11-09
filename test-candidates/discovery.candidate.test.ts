import { describe, expect, it } from 'vitest';
import approved from '../vitest.config.mts';
import candidates from '../vitest.candidates.config.mts';

describe('B10 explicit discovery (PROPOSED)', () => {
  it('keeps candidates out of ordinary discovery and fails on zero approved tests', () => {
    expect(approved.test?.include).toEqual([
      'tests/unit/**/*.test.{ts,tsx}',
      'tests/integration/**/*.test.{ts,tsx}',
      'tests/acceptance/**/*.test.{ts,tsx}',
    ]);
    expect(approved.test?.passWithNoTests).toBe(false);
    expect(candidates.test?.include).toEqual(['test-candidates/**/*.candidate.test.{ts,tsx}']);
    expect(candidates.test?.passWithNoTests).toBe(false);
  });
});
