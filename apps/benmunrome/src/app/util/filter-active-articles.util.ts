import { Article } from '../model/article.model';

export const filterActiveArticles = (articles: Article[]) => {
  return articles.filter((article) => article.isActive);
};
