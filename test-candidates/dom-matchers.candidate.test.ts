// @vitest-environment jsdom
import '../tests/fixtures/register-dom-matchers';
import { afterEach, describe, expect, it } from 'vitest';

afterEach(() => {
  document.body.replaceChildren();
});

describe('DOM matcher compatibility (candidate)', () => {
  it('distinguishes enabled and disabled buttons', () => {
    const enabled = document.createElement('button');
    const disabled = document.createElement('button');
    disabled.disabled = true;
    document.body.append(enabled, disabled);

    expect(enabled).not.toBeDisabled();
    expect(disabled).toBeDisabled();
  });

  it('distinguishes attached visible and hidden elements', () => {
    const visible = document.createElement('div');
    const hidden = document.createElement('div');
    hidden.hidden = true;
    document.body.append(visible, hidden);

    expect(visible).toBeVisible();
    expect(hidden).not.toBeVisible();
  });

  it('throws for incorrect disabled assertions, including negation', () => {
    const enabled = document.createElement('button');
    const disabled = document.createElement('button');
    disabled.disabled = true;
    document.body.append(enabled, disabled);

    expect(() => expect(enabled).toBeDisabled()).toThrow();
    expect(() => expect(disabled).not.toBeDisabled()).toThrow();
  });

  it('throws for incorrect visibility assertions, including negation', () => {
    const visible = document.createElement('div');
    const hidden = document.createElement('div');
    hidden.hidden = true;
    document.body.append(visible, hidden);

    expect(() => expect(hidden).toBeVisible()).toThrow();
    expect(() => expect(visible).not.toBeVisible()).toThrow();
  });

  it('supports awaited resolves and negation and rejects an incorrect async assertion', async () => {
    const enabled = document.createElement('button');
    const disabled = document.createElement('button');
    const hidden = document.createElement('div');
    disabled.disabled = true;
    hidden.hidden = true;
    document.body.append(enabled, disabled, hidden);

    await expect(Promise.resolve(disabled)).resolves.toBeDisabled();
    await expect(Promise.resolve(enabled)).resolves.not.toBeDisabled();
    await expect(Promise.resolve(enabled)).resolves.toBeVisible();
    await expect(Promise.resolve(hidden)).resolves.not.toBeVisible();
    await expect(expect(Promise.resolve(enabled)).resolves.toBeDisabled()).rejects.toThrow();
  });
});
