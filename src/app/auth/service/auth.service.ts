import { Injectable } from '@angular/core';
import { Auth, GoogleAuthProvider, signInWithPopup } from '@angular/fire/auth';
import { from, map } from 'rxjs';
import { AuthUser } from '../model/auth-user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private auth: Auth) {}

  signInWithGoogle() {
    const provider = new GoogleAuthProvider();
    return from(signInWithPopup(this.auth, provider)).pipe(
      map((result) => {
        const displayName = result.user.displayName;
        const email = result.user.email;

        if (displayName === null || email === null) {
          throw new Error('Missing expected Google login data');
        }

        const user: AuthUser = {
          displayName: displayName,
          email: email,
        };
        return user;
      }),
    );
  }

  signOut() {
    return from(this.auth.signOut());
  }
}
