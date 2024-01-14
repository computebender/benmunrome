import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { adminDashboardRoutes } from './admin-dashboard.routes';
import { AdminDashboardComponent } from './admin-dashboard.component';

@NgModule({
  imports: [CommonModule, RouterModule.forChild(adminDashboardRoutes)],
  declarations: [AdminDashboardComponent],
})
export class AdminDashboardModule {}
