import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Import your components for the child routes
import { BlogModule } from '../blog/blog.module';
import { FooterComponent } from './component/footer/footer.component';
import { NavbarComponent } from './component/navbar/navbar.component';
import { PublicComponent } from './public.component';
import { HomeComponent } from './view/home/home.component';

// Define your child routes
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
  declarations: [PublicComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NavbarComponent,
    FooterComponent,
    BlogModule,
  ],
})
export class PublicModule {}
