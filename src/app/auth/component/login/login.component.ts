import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthActions } from '../../store/auth.actions';

@Component({
  selector: 'app-auth-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  private store = inject(Store);

  handleGoogleLogin() {
    this.store.dispatch(AuthActions.signInWithGoogle());
  }
}
