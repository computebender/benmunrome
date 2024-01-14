import { User } from '@angular/fire/auth';
import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const UserActions = createActionGroup({
  source: 'User',
  events: {
    'Sign In With Google': emptyProps(),
    'Sign In Success': props<{ user: User }>(),
    'Sign In Failure': props<{ error: unknown }>(),
  },
});
