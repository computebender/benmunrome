import { createSelector } from '@ngrx/store';
import {
  selectAllRevisions,
  selectArticleEntities,
} from '../../blog/store/blog.reducer';
import { selectRouteParams } from '../../store/router.selectors';

export const selectActiveArticleId = createSelector(
  selectRouteParams,
  (routeParams) => {
    const articleId = routeParams['articleId'];
    if (!articleId) {
      return null;
    }
    return String(articleId);
  },
);

export const selectActiveArticle = createSelector(
  selectArticleEntities,
  selectActiveArticleId,
  (entities, articleId) => {
    if (articleId) {
      return entities[articleId];
    }
    return null;
  },
);

export const selectActiveArticleRevisions = createSelector(
  selectActiveArticleId,
  selectAllRevisions,
  (articleId, revisions) => {
    if (!articleId) {
      return [];
    }
    return revisions.filter((revision) => revision.articleId === articleId);
  },
);
