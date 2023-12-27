import { Component, Input } from '@angular/core';
import { ArticleCardComponent } from '../article-card/article-card.component';
import { Article } from '../../model/article.model';

@Component({
  selector: 'app-article-card-grid',
  standalone: true,
  imports: [ArticleCardComponent],
  templateUrl: './article-card-grid.component.html',
  styleUrl: './article-card-grid.component.scss',
})
export class ArticleCardGridComponent {
  @Input({ required: true }) articles!: Article[];
}
