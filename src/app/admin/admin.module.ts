import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { AdminRoutingModule } from './admin-routing.module';
import { ArticlesComponent } from './view/articles/articles.component';

@NgModule({
  declarations: [AdminComponent, ArticlesComponent],
  imports: [CommonModule, AdminRoutingModule],
})
export class AdminModule {}
