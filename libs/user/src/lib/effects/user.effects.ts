import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { concatMap } from 'rxjs/operators';
import { UserActions } from '../actions/user.actions';
import { UserService } from '../services/user.service';

@Injectable()
export class UserEffects {
  loginWithGoogle$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserActions.signInWithGoogle),
      concatMap(() => this.userService.googleSignIn()),
      concatMap((user) => [UserActions.signInSuccess({ user })]),
    );
  });

  constructor(
    private actions$: Actions,
    private userService: UserService,
  ) {}
}
