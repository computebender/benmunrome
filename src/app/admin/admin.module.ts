import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { BlogModule } from '../blog/blog.module';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { AdminEffects } from './store/admin.effects';
import { adminFeature, adminFeatureKey } from './store/admin.reducer';
import { ManageArticlesComponent } from './view/manage-articles/manage-articles.component';
import { ManageHomepageComponent } from './view/manage-homepage/manage-homepage.component';
import { ManagePortfolioComponent } from './view/manage-portfolio/manage-portfolio.component';
import { ManageTagsComponent } from './view/manage-tags/manage-tags.component';

@NgModule({
  declarations: [
    AdminComponent,
    ManageTagsComponent,
    ManagePortfolioComponent,
    ManageHomepageComponent,
    ManageArticlesComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    BlogModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    StoreModule.forFeature(adminFeatureKey, adminFeature.reducer),
    EffectsModule.forFeature([AdminEffects]),
  ],
})
export class AdminModule {}
