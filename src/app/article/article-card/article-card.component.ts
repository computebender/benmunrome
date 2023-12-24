import { Component, Input } from '@angular/core';
import { Article } from '../../model/article.model';
import { RouterLinkWithHref } from '@angular/router';

@Component({
  selector: 'app-article-card',
  standalone: true,
  imports: [RouterLinkWithHref],
  templateUrl: './article-card.component.html',
  styleUrl: './article-card.component.scss',
})
export class ArticleCardComponent {
  @Input({ required: true }) article!: Article;
}
