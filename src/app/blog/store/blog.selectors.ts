import { createSelector } from '@ngrx/store';
import {
  selectAllArticles,
  selectAllRevisions,
  selectTagEntities,
} from './blog.reducer';

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

export const selectArticleRevisionsByArticleId = (activeArticleId: string) =>
  createSelector(selectAllRevisions, (revisions) => {
    return revisions.filter(
      (revision) => revision.articleId === activeArticleId,
    );
  });
