export interface Article {
  firestoreId?: string;
  id: string;
  title: string;
  summary: string;
  slug: string;
  isActive: boolean;
  coverImageAssetId: string | null;
  tagIds: string[];
  assetIds: string[];
  revisionIds: string[];
  error?: string;
}
