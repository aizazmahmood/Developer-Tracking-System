import { parseAppMetadata, type DesktopApi } from '../contracts/metadata';

export function createDesktopApi(invokeMetadata: () => Promise<unknown>): DesktopApi {
  return Object.freeze({
    getAppMetadata: async (...args: unknown[]) => {
      if (args.length !== 0) throw new Error('Invalid metadata request');
      return parseAppMetadata(await invokeMetadata());
    },
  });
}
