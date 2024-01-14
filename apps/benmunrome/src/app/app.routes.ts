import { Routes } from '@angular/router';

export const appRoutes: Routes = [
  {
    path: 'admin',
    loadChildren: () =>
      import('@benmunrome/admin-dashboard').then((m) => m.AdminDashboardModule),
  },
  {
    path: '',
    loadChildren: () =>
      import('@benmunrome/public').then((m) => m.PublicModule),
  },
];
