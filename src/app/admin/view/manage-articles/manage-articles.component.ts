import { Component, OnInit, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { BlogActions } from '../../../blog/store/blog.actions';
import { selectAllArticlesWithTags } from '../../../blog/store/blog.selectors';
import { newArticleFromTitleSlugSummary } from '../../../blog/util/new-article-from-title-slug-summary.util';

@Component({
  selector: 'app-manage-articles',
  templateUrl: './manage-articles.component.html',
  styleUrl: './manage-articles.component.scss',
})
export class ManageArticlesComponent implements OnInit {
  store = inject(Store);
  articles$ = this.store.select(selectAllArticlesWithTags);
  displayedColumns: string[] = ['title', 'summary', 'isActive'];

  ngOnInit(): void {
    this.store.dispatch(BlogActions.loadArticles());
  }

  handleCreateArticle() {
    const article = newArticleFromTitleSlugSummary(
      'Article Title',
      'some-slug',
      'Some summary',
    );
    this.store.dispatch(BlogActions.createArticle({ article }));
  }
}
