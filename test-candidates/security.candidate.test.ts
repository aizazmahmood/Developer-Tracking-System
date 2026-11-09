import type { BrowserWindow } from 'electron';
import { readFileSync } from 'node:fs';
import { describe, expect, it, vi } from 'vitest';
import { restrictWindow, securePreferences } from '../src/main/security';

describe('B07/B09 shell hardening (PROPOSED)', () => {
  it('requires sandboxing, isolation and web security without Node or webviews', () => {
    expect(securePreferences('/bundled/preload.js')).toMatchObject({
      preload: '/bundled/preload.js', sandbox: true, contextIsolation: true,
      nodeIntegration: false, nodeIntegrationInWorker: false,
      nodeIntegrationInSubFrames: false, webviewTag: false, webSecurity: true,
      allowRunningInsecureContent: false,
    });
  });

  it('denies navigation, redirects, new windows and permissions', () => {
    const on = vi.fn();
    const open = vi.fn();
    const request = vi.fn();
    const check = vi.fn();
    restrictWindow({ webContents: {
      on, setWindowOpenHandler: open,
      session: { setPermissionRequestHandler: request, setPermissionCheckHandler: check },
    } } as unknown as BrowserWindow);
    for (const name of ['will-navigate', 'will-frame-navigate', 'will-redirect']) {
      const listener = on.mock.calls.find(([event]) => event === name)?.[1];
      expect(listener).toBeTypeOf('function');
      for (const url of ['https://untrusted.invalid/', 'file:///other.html', 'javascript:alert(1)']) {
        const event = { preventDefault: vi.fn() };
        listener(event, url);
        expect(event.preventDefault).toHaveBeenCalledOnce();
      }
    }
    expect(open.mock.calls[0]![0]({ url: 'https://untrusted.invalid/' })).toEqual({ action: 'deny' });
    const answer = vi.fn();
    request.mock.calls[0]![0]({}, 'media', answer);
    expect(answer).toHaveBeenCalledWith(false);
    expect(check.mock.calls[0]![0]({}, 'media')).toBe(false);
  });

  it('ships a restrictive CSP and external CSS without inline/eval allowances', () => {
    const html = readFileSync('src/renderer/index.html', 'utf8');
    for (const directive of [
      "default-src 'none'", "script-src 'self'", "style-src 'self'",
      "connect-src 'none'", "frame-src 'none'", "object-src 'none'",
      "base-uri 'none'", "form-action 'none'",
    ]) expect(html).toContain(directive);
    expect(html).not.toMatch(/unsafe-inline|unsafe-eval|https?:/);
  });
});
