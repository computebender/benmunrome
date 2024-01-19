import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectActiveArticle } from '../../store/admin.selectors';

@Component({
  selector: 'app-manage-article-details',
  templateUrl: './manage-article-details.component.html',
  styleUrl: './manage-article-details.component.scss',
})
export class ManageArticleDetailsComponent {
  store = inject(Store);
  article$ = this.store.select(selectActiveArticle);
}
