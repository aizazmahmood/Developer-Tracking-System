import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import reactHooks from 'eslint-plugin-react-hooks';

export default tseslint.config(
  { ignores: ['node_modules/**', '.webpack/**', 'out/**', 'dist/**', 'coverage/**'] },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  { files: ['**/*.cjs', '**/*.mjs', '**/*.mts', 'test-candidates/**/*.ts'],
    languageOptions: { globals: globals.node } },
  { files: ['src/main/**/*.ts', 'src/preload/**/*.ts'],
    languageOptions: { globals: globals.node } },
  { files: ['src/renderer/**/*.{ts,tsx}', 'test-candidates/**/*.tsx'],
    languageOptions: { globals: globals.browser },
    plugins: { 'react-hooks': reactHooks },
    rules: { ...reactHooks.configs.recommended.rules } },
  { files: ['src/{core,application,contracts}/**/*.ts', 'src/renderer/**/*.{ts,tsx}'],
    rules: {
      'no-restricted-imports': ['error', { patterns: [
        'electron', 'electron/*', 'node:*', 'better-sqlite3',
        '**/main/**', '**/preload/**', '**/adapters/**', '**/platform/**', '**/workers/**',
      ] }],
      'no-restricted-globals': ['error', 'process', 'require', 'Buffer'],
    } },
);
