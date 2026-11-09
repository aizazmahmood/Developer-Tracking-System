import { resolve } from 'node:path';
import { ESLint } from 'eslint';
import { describe, expect, it } from 'vitest';

const eslint = new ESLint({ cwd: resolve('.') });
const targets = ['forge.config.cjs', 'webpack.renderer.config.cjs'];

function onlyResult(results: ESLint.LintResult[], filePath: string): ESLint.LintResult {
  expect(results).toHaveLength(1);
  const result = results[0];
  if (!result) throw new Error('Expected a real ESLint result');
  expect(result.filePath).toBe(resolve(filePath));
  expect(result.fatalErrorCount).toBe(0);
  expect(result.suppressedMessages).toEqual([]);
  return result;
}

describe('CommonJS build configuration lint scope', () => {
  it.each(targets)('lints the actual %s without errors or warnings', async (filePath) => {
    await expect(eslint.findConfigFile(resolve(filePath)))
      .resolves.toBe(resolve('eslint.config.mjs'));
    await expect(eslint.isPathIgnored(resolve(filePath))).resolves.toBe(false);
    const result = onlyResult(await eslint.lintFiles([filePath]), filePath);
    expect(result.errorCount).toBe(0);
    expect(result.warningCount).toBe(0);
    expect(result.messages).toEqual([]);
  }, 30_000);

  it.each([
    'webpack.main.config.cjs',
    'tests/fixtures/forge.config.cjs',
    'tests/fixtures/webpack.renderer.config.cjs',
  ])('rejects require at the non-exempt path %s', async (filePath) => {
    const result = onlyResult(await eslint.lintText("require('node:path');\n", {
      filePath: resolve(filePath),
    }), filePath);
    expect(result.messages).toContainEqual(expect.objectContaining({
      ruleId: '@typescript-eslint/no-require-imports', severity: 2,
    }));
  }, 30_000);

  it.each([
    'src/main/lint-probe.ts',
    'src/preload/lint-probe.ts',
    'src/renderer/lint-probe.ts',
    'src/core/lint-probe.ts',
    'test-candidates/lint-probe.ts',
  ])('retains TypeScript require discipline at %s', async (filePath) => {
    const result = onlyResult(await eslint.lintText("require('node:path');\n", {
      filePath: resolve(filePath),
    }), filePath);
    expect(result.messages).toContainEqual(expect.objectContaining({
      ruleId: '@typescript-eslint/no-require-imports', severity: 2,
    }));
  }, 30_000);

  it.each(targets)('still rejects unused variables in %s', async (filePath) => {
    const result = onlyResult(await eslint.lintText('const unused = 1;\n', {
      filePath: resolve(filePath),
    }), filePath);
    expect(result.messages).toContainEqual(expect.objectContaining({
      ruleId: '@typescript-eslint/no-unused-vars', severity: 2,
    }));
  }, 30_000);

  it.each([
    { filePath: 'src/renderer/lint-probe.ts', moduleName: 'electron' },
    { filePath: 'src/renderer/lint-probe.ts', moduleName: 'node:fs' },
    { filePath: 'src/core/lint-probe.ts', moduleName: 'electron' },
    { filePath: 'src/core/lint-probe.ts', moduleName: 'node:fs' },
  ])('retains restricted imports for $moduleName in $filePath', async ({ filePath, moduleName }) => {
    const result = onlyResult(await eslint.lintText(`import '${moduleName}';\n`, {
      filePath: resolve(filePath),
    }), filePath);
    expect(result.messages).toContainEqual(expect.objectContaining({
      ruleId: 'no-restricted-imports', severity: 2,
    }));
  }, 30_000);
});
