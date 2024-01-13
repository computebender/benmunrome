import { Article } from '../model/article.model';

export const filterArticlesByTagIds = (
  articles: Article[],
  tagIds: string[],
): Article[] => {
  return articles.filter((article) => {
    return article.tags.some((tag) => tagIds.includes(tag));
  });
};
