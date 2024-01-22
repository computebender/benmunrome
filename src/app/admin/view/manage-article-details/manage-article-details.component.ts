import { Component, OnInit, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { of, switchMap } from 'rxjs';
import { BlogActions } from '../../../blog/store/blog.actions';
import { selectArticleRevisionsByArticleId } from '../../../blog/store/blog.selectors';
import { selectActiveArticle } from '../../store/admin.selectors';

@Component({
  selector: 'app-manage-article-details',
  templateUrl: './manage-article-details.component.html',
  styleUrl: './manage-article-details.component.scss',
})
export class ManageArticleDetailsComponent implements OnInit {
  store = inject(Store);
  article$ = this.store.select(selectActiveArticle);
  revisions$ = this.article$.pipe(
    switchMap((article) => {
      if (!article) {
        return of([]);
      }
      const articleId = article.id;
      this.store.dispatch(BlogActions.loadRevisions({ articleId: articleId }));
      return this.store.select(selectArticleRevisionsByArticleId(articleId));
    }),
  );

  ngOnInit(): void {
    this.store.dispatch(BlogActions.loadArticles());
  }
}
