import { Component, Input, inject } from '@angular/core';
import { MarkdownComponent } from 'ngx-markdown';
import { BlogStore } from '../../store/blog.store';
import {
  RouterLinkWithHref,
  provideRouter,
  withComponentInputBinding,
} from '@angular/router';
import { appRoutes } from '../../app.routes';

@Component({
  selector: 'app-article',
  standalone: true,
  imports: [MarkdownComponent, RouterLinkWithHref],
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
