import { Injectable } from '@angular/core';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { routerNavigatedAction } from '@ngrx/router-store';
import { Store } from '@ngrx/store';
import { EMPTY, distinctUntilChanged, of, switchMap } from 'rxjs';
import { BlogActions } from '../../blog/store/blog.actions';
import { selectRouteData } from '../../store/router.selectors';
import { AdminActions } from './admin.actions';
import { selectActiveArticleId } from './admin.selectors';

@Injectable()
export class AdminEffects {
  constructor(
    private actions$: Actions,
    private store: Store,
  ) {}

  setTitleOnRouterNavigation$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(routerNavigatedAction),
      concatLatestFrom(() => this.store.select(selectRouteData)),
      switchMap(([_, data]) => {
        const title = data['title'] || 'Admin';
        return of(AdminActions.setPageTitle({ title }));
      }),
    );
  });

  loadRevisionsOnRouterNavigation$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(routerNavigatedAction),
      concatLatestFrom(() => this.store.select(selectActiveArticleId)),
      distinctUntilChanged(
        ([, previousArticleId], [, currentArticleId]) =>
          previousArticleId === currentArticleId,
      ),
      switchMap(([_, articleId]) => {
        if (!articleId) {
          return EMPTY;
        }
        console.log('Loading revisions for ', articleId);
        return of(BlogActions.loadRevisions({ articleId }));
      }),
    );
  });
}
