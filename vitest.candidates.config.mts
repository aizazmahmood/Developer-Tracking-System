import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'node',
    include: ['test-candidates/**/*.candidate.test.{ts,tsx}'],
    exclude: ['node_modules/**', '.webpack/**', 'out/**'],
    passWithNoTests: false,
  },
});
