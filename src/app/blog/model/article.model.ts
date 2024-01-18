export interface Article {
  firestoreId?: string;
  id: string;
  title: string;
  summary: string;
  slug: string;
  isActive: boolean;
  coverImageAssetId: string | null;
  activeRevisionId: string | null;
  tagIds: string[];
  assetIds: string[] | null;
  revisionIds: string[] | null;
  error?: string;
  hasPendingWrites: boolean;
}
