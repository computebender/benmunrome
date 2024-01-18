export interface Revision {
  id: string;
  createdAt: Date;
  markdownPath: string;
  note: string;
  articleId: string;
  firestoreId?: string;
}
