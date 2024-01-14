import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './view/home/home.component';
import { PublicComponent } from './public.component';

const routes: Routes = [
  {
    path: '',
    component: PublicComponent,
    children: [
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
            (mod) => mod.ArticleComponent,
          ),
      },
      {
        path: 'about-me',
        loadComponent: () =>
          import('./view/about-me/about-me.component').then(
            (mod) => mod.AboutMeComponent,
          ),
      },
      {
        path: 'portfolio',
        loadComponent: () =>
          import('./view/portfolio/portfolio.component').then(
            (mod) => mod.PortfolioComponent,
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PublicRoutingModule {}
