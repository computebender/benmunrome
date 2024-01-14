import { Route } from '@angular/router';
import { AdminDashboardComponent } from './admin-dashboard.component';
import { ArticleComponent } from './view/article/article.component';

export const adminDashboardRoutes: Route[] = [
  {
    path: '',
    component: AdminDashboardComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'article',
      },
      {
        path: 'article',
        component: ArticleComponent,
      },
    ],
  },
];
