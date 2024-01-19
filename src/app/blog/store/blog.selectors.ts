import { createSelector } from '@ngrx/store';
import { selectAllArticles, selectTagEntities } from './blog.reducer';

export const selectAllArticlesWithTags = createSelector(
  selectAllArticles,
  selectTagEntities,
  (articles, tagEntities) => {
    return articles.map((article) => ({
      ...article,
      tags: article.tagIds.map((tagId) => tagEntities[tagId]),
    }));
  },
);
