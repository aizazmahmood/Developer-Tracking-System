import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'node',
    include: [
      'tests/unit/**/*.test.{ts,tsx}',
      'tests/integration/**/*.test.{ts,tsx}',
      'tests/acceptance/**/*.test.{ts,tsx}',
      'test-candidates/**/*.candidate.test.{ts,tsx}',
    ],
    exclude: ['node_modules/**', '.webpack/**', 'out/**'],
    passWithNoTests: false,
  },
});
