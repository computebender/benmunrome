import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { take } from 'rxjs';
import { BlogActions } from '../../../blog/store/blog.actions';
import { newRevisionFromNote } from '../../../blog/util/new-revision-from-note.util';
import { selectActiveArticle } from '../../store/admin.selectors';

@Component({
  selector: 'app-create-revision-button',
  templateUrl: './create-revision-button.component.html',
  styleUrl: './create-revision-button.component.scss',
})
export class CreateRevisionButtonComponent {
  store = inject(Store);
  article$ = this.store.select(selectActiveArticle);

  handleCreateRevision() {
    this.article$.pipe(take(1)).subscribe((article) => {
      if (!article) {
        return;
      }
      const newRevision = newRevisionFromNote(article.id, 'New revision');
      this.store.dispatch(
        BlogActions.createRevision({ revision: newRevision }),
      );
    });
  }
}
