import type { DesktopApi } from '../contracts/metadata';

declare global {
  interface Window {
    readonly desktop?: DesktopApi;
  }
}
