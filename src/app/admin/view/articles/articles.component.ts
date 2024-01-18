import { Component, OnInit, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Article } from '../../../blog/model/article.model';
import { BlogActions } from '../../../blog/store/blog.actions';
import { selectAllArticles } from '../../../blog/store/blog.reducer';
import { newArticleFromTitleSlugSummary } from '../../../blog/util/new-article-from-title-slug-summary.util';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrl: './articles.component.scss',
})
export class ArticlesComponent implements OnInit {
  private store = inject(Store);
  articles$!: Observable<Article[]>;

  ngOnInit() {
    this.articles$ = this.store.select(selectAllArticles);
  }

  loadArticles() {
    this.store.dispatch(BlogActions.loadArticles());
  }

  handleNewArticle() {
    const newArticle = newArticleFromTitleSlugSummary(
      'New Article',
      'new-article',
      'New article summary',
    );

    this.store.dispatch(BlogActions.createArticle({ article: newArticle }));
  }
}
