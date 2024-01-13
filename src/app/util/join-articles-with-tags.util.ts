import { Article, ArticleWithTags } from '../model/article.model';
import { Tag } from '../model/tag.model';

export const joinArticlesWithTags = (
  articles: Article[],
  tags: Tag[],
): ArticleWithTags[] => {
  return articles.map((article) => {
    const articleTags = article.tags
      .map((tagId) => tags.find((tag) => tag.id === tagId))
      .filter((tag) => tag !== undefined) as Tag[];
    return { ...article, tags: articleTags };
  });
};
