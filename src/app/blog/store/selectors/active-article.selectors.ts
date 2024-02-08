import { createSelector } from '@ngrx/store';
import { selectRouteParams } from '../../../store/router.selectors';
import {
  selectAllRevisions,
  selectArticleEntities,
} from '../blog.reducer';

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

export const selectActiveArticleActiveRevision = createSelector(
  selectActiveArticle,
  selectActiveArticleRevisions,
  (article, revisions) => {
    if (!article) {
      return null;
    }
    const activeRevisionId = article.activeRevisionId;
    if (!activeRevisionId) {
      return null;
    }
    return revisions.find((revision) => revision.id === activeRevisionId);
  },
);
