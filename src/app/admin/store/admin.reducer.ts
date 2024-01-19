import { createFeature, createReducer, on } from '@ngrx/store';
import { AdminActions } from './admin.actions';

export const adminFeatureKey = 'admin';

export interface State {
  title: string;
}

export const initialState: State = {
  title: 'Admin',
};

const adminReducer = createReducer(
  initialState,
  on(AdminActions.setPageTitle, (state, { title }) => ({
    ...state,
    title,
  })),
);

export const adminFeature = createFeature({
  name: adminFeatureKey,
  reducer: adminReducer,
});

export const { reducer, selectTitle } = adminFeature;
