import { Component, Input, inject } from '@angular/core';
import { MarkdownComponent } from 'ngx-markdown';
import { BlogStore } from '../../store/blog.store';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { appRoutes } from '../../app.routes';

@Component({
  selector: 'app-article',
  standalone: true,
  imports: [MarkdownComponent],
  templateUrl: './article.component.html',
  styleUrl: './article.component.scss',
})
export class ArticleComponent {
  readonly blogStore = inject(BlogStore);

  @Input()
  set articleId(articleId: string) {
    console.log(articleId);
    this.blogStore.setActiveArticleId(articleId);
  }
}
