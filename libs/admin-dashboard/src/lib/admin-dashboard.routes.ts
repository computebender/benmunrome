import { Route } from '@angular/router';
import { AdminDashboardComponent } from './admin-dashboard.component';

export const adminDashboardRoutes: Route[] = [
  { path: '', pathMatch: 'full', component: AdminDashboardComponent },
];
