import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, of, switchMap } from 'rxjs';
import { AuthActions } from '../../store/auth.actions';
import {
  selectIsAuthenticated,
  selectUnauthenticatedUrl,
} from '../../store/auth.reducer';

export const authGuard: CanActivateFn = (route, state) => {
  const store = inject(Store);
  const router = inject(Router);

  store.dispatch(AuthActions.setRedirectUrl({ url: state.url }));

  return store.select(selectIsAuthenticated).pipe(
    switchMap((isAuthenticated) => {
      if (isAuthenticated) {
        return of(true);
      }
      return store.select(selectUnauthenticatedUrl).pipe(
        map((url) => {
          return router.parseUrl(url);
        }),
      );
    }),
  );
};
