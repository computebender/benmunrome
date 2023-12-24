import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home',
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'article/:id/:slug',
    loadComponent: () =>
      import('./article/article.component').then((mod) => mod.ArticleComponent),
  },
];
