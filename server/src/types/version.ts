export type VersionId = string & { readonly __brand: 'VersionId' }
export const toVersionId = (id: string): VersionId => id as VersionId

export type VersionDatabase = {
  id: VersionId;
  text: string;
}

export type Version = string | null;
