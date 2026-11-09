import { describe, expect, it, vi } from 'vitest';
import { createDesktopApi } from '../src/preload/api';

const electron = vi.hoisted(() => ({
  contextBridge: { exposeInMainWorld: vi.fn() },
  ipcRenderer: { invoke: vi.fn() },
}));
vi.mock('electron', () => electron);

describe('B04–B05 preload boundary (PROPOSED)', () => {
  it('exposes one frozen read-only method with a fixed IPC channel', async () => {
    electron.ipcRenderer.invoke.mockResolvedValue({ title: 'Developer Work Tracker', version: '0.1.0' });
    await import('../src/preload/index');
    const [key, api] = electron.contextBridge.exposeInMainWorld.mock.calls[0] as [
      string, ReturnType<typeof createDesktopApi>,
    ];
    expect(key).toBe('desktop');
    expect(Object.keys(api)).toEqual(['getAppMetadata']);
    expect(Object.isFrozen(api)).toBe(true);
    expect(await api.getAppMetadata()).toEqual({ title: 'Developer Work Tracker', version: '0.1.0' });
    expect(electron.ipcRenderer.invoke.mock.calls).toEqual([['app:get-metadata']]);
  });

  it('rejects unexpected arguments before invoking main', async () => {
    const invoke = vi.fn();
    const api = createDesktopApi(invoke);
    const call = api.getAppMetadata as (...args: unknown[]) => Promise<unknown>;
    await expect(call({ path: 'private' })).rejects.toThrow('Invalid metadata request');
    expect(invoke).not.toHaveBeenCalled();
  });

  it.each([
    null, [], {}, { title: 'Other app', version: '0.1.0' },
    { title: 'Developer Work Tracker', version: '' },
    { title: 'Developer Work Tracker', version: 'x'.repeat(65) },
    { title: 'Developer Work Tracker', version: 1 },
    { title: 'Developer Work Tracker', version: '0.1.0', token: 'unexpected' },
  ].map((response) => ({ response })))('rejects malformed metadata $response', async ({ response }) => {
    await expect(createDesktopApi(async () => response).getAppMetadata())
      .rejects.toThrow('Invalid app metadata');
  });

  it('propagates IPC failure without inventing a result', async () => {
    await expect(createDesktopApi(async () => { throw new Error('IPC unavailable'); })
      .getAppMetadata()).rejects.toThrow('IPC unavailable');
  });
});
