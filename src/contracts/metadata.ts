export const APP_TITLE = 'Developer Work Tracker' as const;
export const METADATA_CHANNEL = 'app:get-metadata' as const;

export interface AppMetadata {
  readonly title: typeof APP_TITLE;
  readonly version: string;
}

export interface DesktopApi {
  getAppMetadata(): Promise<AppMetadata>;
}

export function parseAppMetadata(value: unknown): AppMetadata {
  if (typeof value !== 'object' || value === null || Array.isArray(value)) {
    throw new Error('Invalid app metadata');
  }
  const record = value as Record<string, unknown>;
  if (Object.keys(record).length !== 2 || !Object.hasOwn(record, 'title') ||
      !Object.hasOwn(record, 'version') || record.title !== APP_TITLE ||
      typeof record.version !== 'string' || record.version.length === 0 ||
      record.version.length > 64) {
    throw new Error('Invalid app metadata');
  }
  return Object.freeze({ title: APP_TITLE, version: record.version });
}
