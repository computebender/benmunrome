import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { AuthError } from '../model/auth-error.model';
import { AuthUser } from '../model/auth-user.model';

export const AuthActions = createActionGroup({
  source: 'Auth',
  events: {
    'Set Unauthenticated Url': props<{ url: string }>(),
    'Set Redirect Url': props<{ url: string }>(),
    'Sign In With Google': emptyProps(),
    'Sign In Error': props<{ error: AuthError }>(),
    'Sign In Success': props<{ uid: string }>(),
    'Sign Out': emptyProps(),
    'Sign Out Error': props<{ error: AuthError }>(),
    'Sign Out Success': emptyProps(),
    'Get User': props<{ userId: string }>(),
    'Get User Error': props<{ error: AuthError }>(),
    'Get User Success': props<{ user: AuthUser }>(),
    'User Authenticated': props<{ uid: string }>(),
    'User Unauthenticated': emptyProps(),
  },
});
