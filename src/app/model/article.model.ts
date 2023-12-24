export interface Article {
  id: string;
  title: string;
  url: string;
  date: string;
  summary: string;
  slug: string;
}

export interface ArticlesResponse {
  articles: Article[];
}
