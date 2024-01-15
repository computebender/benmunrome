import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, of, switchMap } from 'rxjs';
import { AuthActions } from '../../store/auth.actions';
import {
  selectIsAdmin,
  selectUnauthenticatedUrl,
} from '../../store/auth.reducer';

export const adminGuard: CanActivateFn = (route, state) => {
  const store = inject(Store);
  const router = inject(Router);

  store.dispatch(AuthActions.setRedirectUrl({ url: state.url }));

  return store.select(selectIsAdmin).pipe(
    switchMap((isAdmin) => {
      if (isAdmin) {
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
