import { Component, Input, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Article } from '../../blog/model/article.model';
import { Tag } from '../../blog/model/tag.model';

@Component({
  selector: 'app-article-card',
  templateUrl: './article-card.component.html',
  styleUrl: './article-card.component.scss',
})
export class ArticleCardComponent {
  @Input({ required: true }) article!: Article;
  @Input() tags: Tag[] = [];

  private router = inject(Router);

  imageLoaded = false;

  onCardClick() {
    this.router.navigate(['/blog', this.article.id, this.article.slug]);
  }

  onImageLoad() {
    this.imageLoaded = true;
  }
}
