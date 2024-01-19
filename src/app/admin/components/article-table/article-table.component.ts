import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { BlogActions } from '../../../blog/store/blog.actions';
import { selectAllArticlesWithTags } from '../../../blog/store/blog.selectors';

@Component({
  selector: 'app-article-table',
  templateUrl: './article-table.component.html',
  styleUrl: './article-table.component.scss',
})
export class ArticleTableComponent {
  store = inject(Store);
  articles$ = this.store.select(selectAllArticlesWithTags);
  displayedColumns: string[] = ['title', 'summary', 'isActive'];

  ngOnInit(): void {
    this.store.dispatch(BlogActions.loadArticles());
  }
}
