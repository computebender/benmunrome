import { createFeature, createReducer, createSelector, on } from '@ngrx/store';
import { AuthUser } from '../model/auth-user.model';
import { AuthActions } from './auth.actions';

export const authFeatureKey = 'auth';

export interface State {
  user: AuthUser | null;
  error: unknown | null;
  loadingSignIn: boolean;
  loadingSignOut: boolean;
  loadingUser: boolean;
  unauthenticatedUrl: string;
  redirectUrl: string;
}

export const initialState: State = {
  user: null,
  error: null,
  loadingSignIn: false,
  loadingSignOut: false,
  loadingUser: false,
  unauthenticatedUrl: '/',
  redirectUrl: '/',
};

const authReducer = createReducer(
  initialState,
  on(AuthActions.signInWithGoogle, (state) => ({
    ...state,
    loadingSignIn: true,
  })),
  on(AuthActions.signInSuccess, (state, { uid }) => ({
    ...state,
    error: null,
    loadingSignIn: false,
  })),
  on(AuthActions.signInError, (state, { error }) => ({
    ...state,
    error,
    loadingSignIn: false,
  })),
  on(AuthActions.signOut, (state) => ({
    ...state,
    loadingSignOut: true,
  })),
  on(AuthActions.signOutError, (state, { error }) => ({
    ...state,
    error,
    loadingSignOut: false,
  })),
  on(AuthActions.signOutSuccess, (state) => ({
    ...state,
    user: null,
    error: null,
    loadingSignOut: false,
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
    loadingUser: true,
  })),
  on(AuthActions.getUserError, (state, { error }) => ({
    ...state,
    error,
    loadingUser: false,
  })),
  on(AuthActions.getUserSuccess, (state, { user }) => ({
    ...state,
    user,
    error: null,
    loadingUser: false,
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
