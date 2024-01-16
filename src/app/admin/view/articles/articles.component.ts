import { Component, OnInit, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { BlogActions } from '../../../blog/store/blog.actions';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrl: './articles.component.scss',
})
export class ArticlesComponent implements OnInit {
  private store = inject(Store);

  ngOnInit() {}

  handleNewArticle() {
    this.store.dispatch(
      BlogActions.newArticle({
        title: 'New Article',
        slug: 'new-article',
        summary: 'New article summary',
      }),
    );
  }
}
