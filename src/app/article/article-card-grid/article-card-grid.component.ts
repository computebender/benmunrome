import { Component, Input } from '@angular/core';
import { Article } from '../../model/article.model';
import { ArticleCardComponent } from '../article-card/article-card.component';

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
