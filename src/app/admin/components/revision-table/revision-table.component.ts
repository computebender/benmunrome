import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectActiveArticleRevisions } from '../../store/admin.selectors';

@Component({
  selector: 'app-revision-table',
  templateUrl: './revision-table.component.html',
  styleUrl: './revision-table.component.scss',
})
export class RevisionTableComponent {
  store = inject(Store);
  revisions$ = this.store.select(selectActiveArticleRevisions);
  displayedColumns: string[] = ['note', 'createdAt'];
}
