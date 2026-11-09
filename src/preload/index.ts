import { contextBridge, ipcRenderer } from 'electron';
import { METADATA_CHANNEL } from '../contracts/metadata';
import { createDesktopApi } from './api';

// Forge bundles local imports into this sandboxed preload. No Node built-ins.
contextBridge.exposeInMainWorld('desktop', createDesktopApi(
  () => ipcRenderer.invoke(METADATA_CHANNEL) as Promise<unknown>,
));
