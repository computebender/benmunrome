import { Component, OnInit, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { BlogActions } from '../../../blog/store/blog.actions';
import {
  selectActiveArticle,
  selectActiveArticleActiveRevision,
} from '../../store/admin.selectors';

@Component({
  selector: 'app-manage-article-details',
  templateUrl: './manage-article-details.component.html',
  styleUrl: './manage-article-details.component.scss',
})
export class ManageArticleDetailsComponent implements OnInit {
  store = inject(Store);
  article$ = this.store.select(selectActiveArticle);
  activeRevision$ = this.store.select(selectActiveArticleActiveRevision);

  ngOnInit(): void {
    this.store.dispatch(BlogActions.loadArticles());
  }
}
