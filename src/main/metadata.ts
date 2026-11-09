import { ipcMain, type BrowserWindow, type IpcMainInvokeEvent } from 'electron';
import { APP_TITLE, METADATA_CHANNEL, parseAppMetadata } from '../contracts/metadata';

export function registerMetadataHandler(
  window: BrowserWindow,
  documentUrl: string,
  getVersion: () => string,
): void {
  ipcMain.removeHandler(METADATA_CHANNEL);
  ipcMain.handle(METADATA_CHANNEL, (event: IpcMainInvokeEvent, ...args: unknown[]) => {
    if (args.length !== 0 || window.isDestroyed() || window.webContents.isDestroyed() ||
        event.sender !== window.webContents ||
        event.senderFrame === null || event.senderFrame !== window.webContents.mainFrame ||
        event.senderFrame.url !== documentUrl || window.webContents.getURL() !== documentUrl) {
      throw new Error('Invalid metadata request');
    }
    return parseAppMetadata({ title: APP_TITLE, version: getVersion() });
  });
}
