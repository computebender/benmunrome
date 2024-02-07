import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ArticleCardGridComponent } from './article-card-grid/article-card-grid.component';
import { ArticleCardComponent } from './article-card/article-card.component';
import { TagPillComponent } from './tag-pill/tag-pill.component';

@NgModule({
  declarations: [
    TagPillComponent,
    ArticleCardComponent,
    ArticleCardGridComponent,
  ],
  imports: [CommonModule],
})
export class UIComponentsModule {}
