import { expect, expectTypeOf } from 'vitest';
import './register-dom-matchers';

// Compiled by the unchanged aggregate typecheck; never invoked as a runtime test.
export function checkDomMatcherTypes(button: HTMLButtonElement): void {
  expectTypeOf(expect(button).toBeDisabled()).toEqualTypeOf<void>();
  expectTypeOf(expect(button).not.toBeVisible()).toEqualTypeOf<void>();
  expectTypeOf(expect(Promise.resolve(button)).resolves.toBeDisabled())
    .toEqualTypeOf<Promise<void>>();
  expectTypeOf(expect(Promise.resolve(button)).resolves.not.toBeVisible())
    .toEqualTypeOf<Promise<void>>();

  expect(button).toHaveAttribute('disabled');
  expect(button).toHaveAttribute('aria-label', 'Example');
  expect(button).toHaveClass('primary', /active/);
  expect(button).toHaveClass('primary active', { exact: true });
  expect(button).toHaveAccessibleName(expect.stringContaining('Example'));

  // @ts-expect-error -- A misspelled matcher must be rejected, without an index signature.
  expect(button).toBeVisble();
  // @ts-expect-error -- toBeDisabled does not accept arguments.
  expect(button).toBeDisabled(true);
  // @ts-expect-error -- The attribute name must be a string.
  expect(button).toHaveAttribute(3);
  // @ts-expect-error -- The exact class option must be boolean.
  expect(button).toHaveClass('primary', { exact: 'yes' });
}
