import { Injectable } from '@angular/core';
import {
  Auth,
  signInWithPopup,
  GoogleAuthProvider,
  User,
} from '@angular/fire/auth';
import { Observable, from } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private auth: Auth) {}

  googleSignIn(): Observable<User> {
    const provider = new GoogleAuthProvider();
    return from(
      signInWithPopup(this.auth, provider).then((result) => result.user),
    );
  }

  signOut(): Observable<void> {
    return from(this.auth.signOut());
  }
}
