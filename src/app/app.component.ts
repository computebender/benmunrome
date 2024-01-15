import { Component, OnInit, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthActions } from './auth/store/auth.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'benmunrome';
  private store = inject(Store);
  ngOnInit(): void {
    this.store.dispatch(AuthActions.setUnauthenticatedUrl({ url: '/login' }));
  }
}
