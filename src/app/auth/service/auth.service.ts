import { Injectable } from '@angular/core';
import { Auth, GoogleAuthProvider, signInWithPopup } from '@angular/fire/auth';
import { Firestore, doc, docData } from '@angular/fire/firestore';
import { Observable, from, map } from 'rxjs';
import { AuthUser } from '../model/auth-user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private auth: Auth,
    private firestore: Firestore,
  ) {}

  signInWithGoogle() {
    const provider = new GoogleAuthProvider();
    return from(signInWithPopup(this.auth, provider)).pipe(
      map((result) => {
        console.log(result);
        const uid = result.user.uid;
        return uid;
      }),
    );
  }

  getUser(userId: string) {
    const userDoc = doc(this.firestore, `users/${userId}`);
    return docData(userDoc) as Observable<AuthUser>;
  }

  signOut() {
    return from(this.auth.signOut());
  }
}
