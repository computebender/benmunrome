export interface Asset {
  id: string;
  name: string;
  path: string;
  createdAt: Date;
  articleId: string;
  firestoreId?: string;
}
