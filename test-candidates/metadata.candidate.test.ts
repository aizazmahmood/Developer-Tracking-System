import type { BrowserWindow, IpcMainInvokeEvent } from 'electron';
import { describe, expect, it, vi } from 'vitest';
import { registerMetadataHandler } from '../src/main/metadata';

const ipc = vi.hoisted(() => ({ handle: vi.fn(), removeHandler: vi.fn() }));
vi.mock('electron', () => ({ ipcMain: ipc }));

function boundary() {
  const frame = { url: 'file:///application/index.html' };
  const contents = { mainFrame: frame, getURL: () => frame.url, isDestroyed: () => false };
  const window = { webContents: contents, isDestroyed: () => false };
  ipc.handle.mockClear();
  registerMetadataHandler(window as unknown as BrowserWindow, frame.url, () => '0.1.0');
  const [channel, handler] = ipc.handle.mock.calls[0] as [
    string, (event: IpcMainInvokeEvent, ...args: unknown[]) => unknown,
  ];
  const invoke = (sender: unknown = contents, senderFrame: unknown = frame, args: unknown[] = []) =>
    handler({ sender, senderFrame } as IpcMainInvokeEvent, ...args);
  return { channel, contents, window, frame, invoke };
}

describe('B06 main IPC boundary (PROPOSED)', () => {
  it('returns metadata only to the owning main frame with no payload', () => {
    const b = boundary();
    expect(b.channel).toBe('app:get-metadata');
    expect(b.invoke()).toEqual({ title: 'Developer Work Tracker', version: '0.1.0' });
  });

  it('rejects wrong senders, same-URL subframes, absent frames and all payloads', () => {
    const b = boundary();
    for (const sender of [{}, { ...b.contents }]) {
      expect(() => b.invoke(sender)).toThrow('Invalid metadata request');
    }
    for (const frame of [null, {}, { url: b.frame.url }]) {
      expect(() => b.invoke(b.contents, frame)).toThrow('Invalid metadata request');
    }
    for (const args of [[null], [{}], ['arbitrary-channel'], [1, 2]]) {
      expect(() => b.invoke(b.contents, b.frame, args)).toThrow('Invalid metadata request');
    }
  });

  it('rejects a changed document URL and a destroyed owner', () => {
    const navigated = boundary();
    navigated.frame.url = 'https://untrusted.invalid/';
    expect(() => navigated.invoke()).toThrow('Invalid metadata request');
    const destroyed = boundary();
    destroyed.window.isDestroyed = () => true;
    expect(() => destroyed.invoke()).toThrow('Invalid metadata request');
    const deadContents = boundary();
    deadContents.contents.isDestroyed = () => true;
    expect(() => deadContents.invoke()).toThrow('Invalid metadata request');
  });
});
