import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './auth/guard/auth.guard';
import { LoginComponent } from './view/login/login.component';

// Import your components here
// import { HomeComponent } from './home.component';
// import { AboutComponent } from './about.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./public/public.module').then((m) => m.PublicModule),
  },
  {
    path: 'admin',
    canActivate: [authGuard],
    loadChildren: () =>
      import('./admin/admin.module').then((m) => m.AdminModule),
  },
  {
    path: 'login',
    component: LoginComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
