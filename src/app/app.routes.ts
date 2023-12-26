import { Routes } from '@angular/router';
import { HomeComponent } from './view/home/home.component';

export const appRoutes: Routes = [
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
    path: 'blog',
    loadComponent: () =>
      import('./view/blog/blog.component').then((mod) => mod.BlogComponent),
  },
  {
    path: 'blog/:articleId/:slug',
    loadComponent: () =>
      import('./view/article/article.component').then(
        (mod) => mod.ArticleComponent
      ),
  },
  {
    path: 'about-me',
    loadComponent: () =>
      import('./view/about-me/about-me.component').then(
        (mod) => mod.AboutMeComponent
      ),
  },
  {
    path: 'portfolio',
    loadComponent: () =>
      import('./view/portfolio/portfolio.component').then(
        (mod) => mod.PortfolioComponent
      ),
  },
  {
    path: '404',
    loadComponent: () =>
      import('./view/page-not-found/page-not-found.component').then(
        (mod) => mod.PageNotFoundComponent
      ),
  },
  {
    path: '**',
    redirectTo: '404',
  },
];
