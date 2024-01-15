import { Article } from '../model/article.model';

export const filterArticlesByEveryTagIds = (
  articles: Article[],
  tagIds: string[],
): Article[] => {
  return articles.filter((article) => {
    return tagIds.every((tagId) => article.tags.includes(tagId));
  });
};
