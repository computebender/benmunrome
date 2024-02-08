import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { take } from 'rxjs';
import { Revision } from '../../../blog/model/revision.model';
import { BlogActions } from '../../../blog/store/blog.actions';
import {
  selectActiveArticle,
  selectActiveArticleRevisions,
} from '../../../blog/store/selectors/active-article.selectors';

@Component({
  selector: 'app-revision-table',
  templateUrl: './revision-table.component.html',
  styleUrl: './revision-table.component.scss',
})
export class RevisionTableComponent {
  store = inject(Store);
  revisions$ = this.store.select(selectActiveArticleRevisions);
  article$ = this.store.select(selectActiveArticle);
  displayedColumns: string[] = ['note', 'createdAt', 'active', 'actions'];

  handleFileSelected(revision: Revision, event: Event): void {
    const element = event.currentTarget as HTMLInputElement;
    const file: File | null = element.files ? element.files[0] : null;

    if (file) {
      this.store.dispatch(BlogActions.uploadRevisionFile({ revision, file }));
    }
  }

  handleSetActiveRevision(revision: Revision): void {
    this.article$.pipe(take(1)).subscribe((article) => {
      if (!article) {
        return;
      }
      this.store.dispatch(BlogActions.setActiveRevision({ article, revision }));
    });
  }
}
