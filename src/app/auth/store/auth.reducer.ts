import { createFeature, createReducer, createSelector, on } from '@ngrx/store';
import { AuthUser } from '../model/auth-user.model';
import { AuthActions } from './auth.actions';

export const authFeatureKey = 'auth';

export interface State {
  user: AuthUser | null;
  error: unknown | null;
  isLoading: boolean;
  unauthenticatedUrl: string;
  redirectUrl: string;
}

export const initialState: State = {
  user: null,
  error: null,
  isLoading: false,
  unauthenticatedUrl: '/',
  redirectUrl: '/',
};

const authReducer = createReducer(
  initialState,
  on(AuthActions.signInWithGoogle, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(AuthActions.signInError, (state, { error }) => ({
    ...state,
    error,
    isLoading: false,
  })),
  on(AuthActions.signOut, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(AuthActions.signOutError, (state, { error }) => ({
    ...state,
    error,
    isLoading: false,
  })),
  on(AuthActions.signOutSuccess, (state) => ({
    ...state,
    user: null,
    error: null,
    isLoading: false,
  })),
  on(AuthActions.setUnauthenticatedUrl, (state, { url }) => ({
    ...state,
    unauthenticatedUrl: url,
  })),
  on(AuthActions.setRedirectUrl, (state, { url }) => ({
    ...state,
    redirectUrl: url,
  })),
  on(AuthActions.getUser, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(AuthActions.getUserError, (state, { error }) => ({
    ...state,
    error,
    isLoading: false,
  })),
  on(AuthActions.getUserSuccess, (state, { user }) => ({
    ...state,
    user,
    error: null,
    isLoading: false,
  })),
);

export const authFeature = createFeature({
  name: authFeatureKey,
  reducer: authReducer,
  extraSelectors: ({ selectUser }) => ({
    selectIsAuthenticated: createSelector(selectUser, (user) => user !== null),
    selectIsAdmin: createSelector(
      selectUser,
      (user) => user?.claims.admin === true,
    ),
  }),
});

export const {
  name,
  reducer,
  selectAuthState,
  selectUser,
  selectError,
  selectIsAuthenticated,
  selectUnauthenticatedUrl,
  selectRedirectUrl,
  selectIsAdmin,
} = authFeature;
