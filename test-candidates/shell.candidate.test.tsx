// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest';
import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { App } from '../src/renderer/App';

afterEach(() => {
  cleanup();
  Reflect.deleteProperty(window, 'desktop');
});

describe('B01–B03 static shell (PROPOSED)', () => {
  it('shows honest unavailable states and disabled controls without a bridge', async () => {
    render(<App />);
    expect(screen.getByRole('heading', { name: 'Developer Work Tracker' })).toBeVisible();
    for (const state of [
      'Tracking not implemented', 'Capture off', 'AI not configured',
      'Local-only / not connected',
    ]) expect(screen.getByText(state)).toBeVisible();
    for (const action of ['Start', 'Pause', 'Resume', 'Stop']) {
      expect(screen.getByRole('button', { name: `${action} — unavailable` })).toBeDisabled();
    }
    expect(await screen.findByText('App information unavailable')).toBeVisible();
    expect(screen.queryByText(/saved session|synced successfully|recording active/i)).toBeNull();
  });

  it('displays metadata from the typed read-only bridge', async () => {
    Object.defineProperty(window, 'desktop', { configurable: true, value: {
      getAppMetadata: vi.fn().mockResolvedValue({
        title: 'Developer Work Tracker', version: '0.1.0',
      }),
    } });
    render(<App />);
    expect(await screen.findByText('Version 0.1.0')).toBeVisible();
  });

  it('keeps unavailable states visible when IPC rejects', async () => {
    Object.defineProperty(window, 'desktop', { configurable: true, value: {
      getAppMetadata: vi.fn().mockRejectedValue(new Error('Unavailable')),
    } });
    render(<App />);
    expect(await screen.findByText('App information unavailable')).toBeVisible();
    expect(screen.getByText('Tracking not implemented')).toBeVisible();
  });
});
