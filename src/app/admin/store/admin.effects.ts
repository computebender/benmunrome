import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { routerNavigatedAction } from '@ngrx/router-store';
import { switchMap } from 'rxjs';
import { AdminActions } from './admin.actions';

@Injectable()
export class AdminEffects {
  constructor(private actions$: Actions) {}

  setTitleOnRouterNavigation$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(routerNavigatedAction),
      switchMap((action) => {
        const title = action.payload.routerState.root.firstChild?.firstChild
          ?.firstChild?.data['title'] as string | 'Admin';

        return [AdminActions.setPageTitle({ title })];
      }),
    );
  });
}
