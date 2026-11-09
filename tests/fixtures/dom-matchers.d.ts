import 'vitest';
import type { TestingLibraryMatchers } from '@testing-library/jest-dom/matchers';

declare module 'vitest' {
  interface Matchers<R extends void | Promise<void>, T>
    extends TestingLibraryMatchers<unknown, R> {
    // Retain the upstream overload set, including regex classes and exact options.
    toHaveClass: TestingLibraryMatchers<T, R>['toHaveClass'];
  }
}
