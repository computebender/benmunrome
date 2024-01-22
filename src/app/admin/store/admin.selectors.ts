import { createSelector } from '@ngrx/store';
import { selectArticleEntities } from '../../blog/store/blog.reducer';
import { selectRouteParams } from '../../store/router.selectors';

export const selectActiveArticleId = createSelector(
  selectRouteParams,
  (routeParams) => {
    return routeParams['articleId'];
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
