import { Injectable } from '@angular/core';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';

import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthError } from '../model/auth-error.model';
import { AuthService } from '../service/auth.service';
import { AuthActions } from './auth.actions';
import { selectRedirectUrl } from './auth.reducer';

@Injectable()
export class AuthEffects {
  signInWithGoogle$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.signInWithGoogle),
      mergeMap(() =>
        this.authService.signInWithGoogle().pipe(
          map((user) => AuthActions.signInSuccess({ user })),
          catchError((error) => {
            const googleAuthError: AuthError = {
              code: error.code || '',
              message: error.message || '',
            };
            return of(AuthActions.signInError({ error: googleAuthError }));
          }),
        ),
      ),
    ),
  );

  signOut$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.signOut),
      mergeMap(() =>
        this.authService.signOut().pipe(
          map(() => AuthActions.signOutSuccess()),
          catchError((error) => {
            const signOutError: AuthError = {
              code: error.code || '',
              message: error.message || '',
            };
            return of(AuthActions.signOutError({ error: signOutError }));
          }),
        ),
      ),
    ),
  );

  signInWithGoogleSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.signInSuccess),
        concatLatestFrom(() => this.store.select(selectRedirectUrl)),
        tap(([, url]) => this.router.navigateByUrl(url)),
      ),
    { dispatch: false },
  );

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router,
    private store: Store,
  ) {}
}
