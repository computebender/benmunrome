import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { LetDirective } from '@ngrx/component';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { MarkdownModule } from 'ngx-markdown';
import { BlogModule } from '../blog/blog.module';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { ArticleTableComponent } from './components/article-table/article-table.component';
import { CreateArticleButtonComponent } from './components/create-article-button/create-article-button.component';
import { CreateArticleModalComponent } from './components/create-article-modal/create-article-modal.component';
import { CreateRevisionButtonComponent } from './components/create-revision-button/create-revision-button.component';
import { CreateRevisionModalComponent } from './components/create-revision-modal/create-revision-modal.component';
import { RevisionTableComponent } from './components/revision-table/revision-table.component';
import { MaterialModule } from './material.module';
import { AdminEffects } from './store/admin.effects';
import { adminFeature, adminFeatureKey } from './store/admin.reducer';
import { ManageArticleDetailsComponent } from './view/manage-article-details/manage-article-details.component';
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
    CreateArticleModalComponent,
    CreateArticleButtonComponent,
    ArticleTableComponent,
    ManageArticleDetailsComponent,
    CreateRevisionButtonComponent,
    CreateRevisionModalComponent,
    RevisionTableComponent,
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
    MaterialModule,
    ReactiveFormsModule,
    LetDirective,
    MarkdownModule,
  ],
})
export class AdminModule {}
