import { createSelector } from '@ngrx/store';
import { selectArticleEntities } from '../../blog/store/blog.reducer';
import { selectRouteParam } from '../../store/router.selectors';

export const selectActiveArticle = createSelector(
  selectArticleEntities,
  selectRouteParam('articleId'),
  (entities, articleId) => {
    if (articleId !== undefined) {
      return entities[articleId];
    }
    return null;
  },
);
