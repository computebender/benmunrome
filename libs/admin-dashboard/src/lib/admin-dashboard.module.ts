import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { adminDashboardRoutes } from './admin-dashboard.routes';
import { AdminDashboardComponent } from './admin-dashboard.component';
import { ArticleComponent } from './view/article/article.component';

@NgModule({
  imports: [CommonModule, RouterModule.forChild(adminDashboardRoutes)],
  declarations: [AdminDashboardComponent, ArticleComponent],
})
export class AdminDashboardModule {}
