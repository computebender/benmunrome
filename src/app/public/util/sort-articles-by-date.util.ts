import { Article } from '../model/article.model';

export const sortArticlesByDate = (articles: Article[]) => {
  return articles.sort((a, b) => {
    const aDate = new Date(a.date);
    const bDate = new Date(b.date);
    return bDate.getTime() - aDate.getTime();
  });
};
