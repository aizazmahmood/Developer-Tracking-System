import { describe, expect, it } from 'vitest';
import standard from '../../vitest.config.mts';
import candidates from '../../vitest.candidates.config.mts';

describe('Default and focused test discovery', () => {
  it('keeps explicit ordinary and scaffold scope with Node and fail-on-zero defaults', () => {
    expect(standard.test).toEqual({
      environment: 'node',
      include: [
        'tests/unit/**/*.test.{ts,tsx}',
        'tests/integration/**/*.test.{ts,tsx}',
        'tests/acceptance/**/*.test.{ts,tsx}',
        'test-candidates/**/*.candidate.test.{ts,tsx}',
      ],
      exclude: ['node_modules/**', '.webpack/**', 'out/**'],
      passWithNoTests: false,
    });
  });

  it('retains the focused scaffold route and its zero-test failure', () => {
    expect(candidates.test).toEqual({
      environment: 'node',
      include: ['test-candidates/**/*.candidate.test.{ts,tsx}'],
      exclude: ['node_modules/**', '.webpack/**', 'out/**'],
      passWithNoTests: false,
    });
  });
});
