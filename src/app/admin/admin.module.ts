import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BlogModule } from '../blog/blog.module';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { ArticlesComponent } from './view/articles/articles.component';

@NgModule({
  declarations: [AdminComponent, ArticlesComponent],
  imports: [CommonModule, AdminRoutingModule, BlogModule],
})
export class AdminModule {}
