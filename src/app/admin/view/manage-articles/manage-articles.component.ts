import { Component, OnInit, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { BlogActions } from '../../../blog/store/blog.actions';
import { selectAllArticlesWithTags } from '../../../blog/store/blog.selectors';

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
}
