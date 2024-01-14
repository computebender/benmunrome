import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { UserActions } from '../../actions/user.actions';

@Component({
  selector: 'lib-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  private store = inject(Store);

  handleGoogleLogin() {
    this.store.dispatch(UserActions.signInWithGoogle());
  }
}
