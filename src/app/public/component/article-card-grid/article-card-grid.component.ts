import { Component, Input } from '@angular/core';
import { Article } from '../../../blog/model/article.model';
import { Tag } from '../../../blog/model/tag.model';
import { ArticleCardComponent } from '../article-card/article-card.component';


@Component({
  selector: 'app-article-card-grid',
  standalone: true,
  imports: [ArticleCardComponent],
  templateUrl: './article-card-grid.component.html',
  styleUrl: './article-card-grid.component.scss',
})
export class ArticleCardGridComponent {
  @Input({ required: true }) compositeArticles: (Article & { coverImageUrl?: string; tags: Tag[] })[] = [];
}
