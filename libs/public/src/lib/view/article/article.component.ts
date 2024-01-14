import { Component, Input, inject } from '@angular/core';
import { MarkdownComponent } from 'ngx-markdown';
import { BlogStore } from '../../store/blog.store';
import { CommonModule } from '@angular/common';
import { RouterLinkWithHref } from '@angular/router';

@Component({
  selector: 'app-article',
  standalone: true,
  imports: [MarkdownComponent, RouterLinkWithHref, CommonModule],
  templateUrl: './article.component.html',
  styleUrl: './article.component.scss',
})
export class ArticleComponent {
  readonly blogStore = inject(BlogStore);

  @Input()
  set articleId(articleId: string) {
    this.blogStore.setCurrentArticleId(articleId);
  }
}
