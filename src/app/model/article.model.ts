export interface Article {
  id: string;
  title: string;
  url: string;
  date: string;
  summary: string;
  slug: string;
  isActive: boolean;
  coverImage?: string;
}

export interface ArticlesResponse {
  articles: Article[];
}
