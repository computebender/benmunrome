import { CommonModule } from '@angular/common';
import { Component, Input, inject } from '@angular/core';
import {
  RouterLinkWithHref
} from '@angular/router';
import { LetDirective } from '@ngrx/component';
import { Store } from '@ngrx/store';
import { MarkdownComponent } from 'ngx-markdown';
import { selectActiveArticle, selectActiveArticleActiveRevision } from '../../../blog/store/selectors/active-article.selectors';
import { BlogStore } from '../../store/blog.store';

@Component({
  selector: 'app-article',
  standalone: true,
  imports: [MarkdownComponent, RouterLinkWithHref, CommonModule, LetDirective],
  templateUrl: './article.component.html',
  styleUrl: './article.component.scss',
})
export class ArticleComponent {
  readonly blogStore = inject(BlogStore);
  private readonly store = inject(Store);
  activeArticle$ = this.store.select(selectActiveArticle);
  activeRevision$ = this.store.select(selectActiveArticleActiveRevision);

  @Input()
  set articleId(articleId: string) {
    this.blogStore.setCurrentArticleId(articleId);
  }
}
