import { createActionGroup, props } from '@ngrx/store';

export const AdminActions = createActionGroup({
  source: 'Admin',
  events: {
    'Set Page Title': props<{ title: string }>(),
  },
});
