export interface Revision {
  id: string;
  createdAt: Date;
  markdownPath: string | null;
  note: string;
  articleId: string;
  firestoreId?: string;
  hasPendingWrites: boolean;
}
