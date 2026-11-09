import { app, BrowserWindow, ipcMain } from 'electron';
import squirrelStartup from 'electron-squirrel-startup';
import { APP_TITLE, METADATA_CHANNEL } from '../contracts/metadata';
import { registerMetadataHandler } from './metadata';
import { restrictWindow, securePreferences } from './security';

declare const MAIN_WINDOW_WEBPACK_ENTRY: string;
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string;

app.enableSandbox();

async function openWindow(): Promise<void> {
  const documentUrl = new URL(MAIN_WINDOW_WEBPACK_ENTRY).href;
  const window = new BrowserWindow({
    title: APP_TITLE,
    width: 960,
    height: 720,
    minWidth: 640,
    minHeight: 580,
    autoHideMenuBar: true,
    backgroundColor: '#f5f6fa',
    webPreferences: securePreferences(MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY),
  });
  window.removeMenu();
  restrictWindow(window);
  registerMetadataHandler(window, documentUrl, () => app.getVersion());
  window.on('closed', () => ipcMain.removeHandler(METADATA_CHANNEL));
  await window.loadURL(documentUrl);
}

if (squirrelStartup) {
  app.quit();
} else {
  app.whenReady().then(openWindow).catch(() => {
    // A failed load is a startup failure; do not leave an invisible application.
    console.error('Developer Work Tracker could not open its static shell.');
    app.exit(1);
  });
  // No tray or background activity; closing the shell quits on every platform.
  app.on('window-all-closed', () => app.quit());
}
