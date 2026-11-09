import { readdirSync, readFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import ts from 'typescript';
import { describe, expect, it } from 'vitest';

function sources(directory: string): string[] {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = join(directory, entry.name);
    return entry.isDirectory() ? sources(path) : /\.tsx?$/.test(path) ? [path] : [];
  });
}

describe('B08 dependency boundaries (PROPOSED)', () => {
  it('keeps shared modules pure and renderer imports unprivileged', () => {
    const shared = ['src/core', 'src/application', 'src/contracts'].flatMap(sources);
    expect(shared.length).toBeGreaterThan(0);
    for (const file of [...shared, ...sources('src/renderer')]) {
      const tree = ts.createSourceFile(file, readFileSync(file, 'utf8'), ts.ScriptTarget.Latest, true);
      const inspect = (node: ts.Node): void => {
        if (ts.isImportDeclaration(node) || ts.isExportDeclaration(node)) {
          const specifier = node.moduleSpecifier;
          if (specifier && ts.isStringLiteral(specifier)) {
            const name = specifier.text;
            if (shared.includes(file)) {
              expect(name.startsWith('.'), `${file}: ${name}`).toBe(true);
              expect(resolve(file, '..', name)).toMatch(/[\\/]src[\\/](core|application|contracts)[\\/]/);
            } else if (name.startsWith('.')) {
              expect(resolve(file, '..', name)).toMatch(/[\\/]src[\\/](renderer|contracts)[\\/]/);
            } else {
              expect(['react', 'react-dom/client'], `${file}: ${name}`).toContain(name);
            }
          }
        }
        if (ts.isCallExpression(node)) {
          expect(node.expression.kind, `${file}: dynamic loading`).not.toBe(ts.SyntaxKind.ImportKeyword);
          if (ts.isIdentifier(node.expression)) expect(node.expression.text).not.toBe('require');
        }
        ts.forEachChild(node, inspect);
      };
      inspect(tree);
    }
  });
});
