import { Component, Input } from '@angular/core';
import { RouterLinkWithHref } from '@angular/router';
import { Article } from '../../model/article.model';

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
