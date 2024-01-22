import { Component, OnDestroy, inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { Article } from '../../../blog/model/article.model';
import { BlogActions } from '../../../blog/store/blog.actions';
import { newRevisionFromNote } from '../../../blog/util/new-revision-from-note.util';

@Component({
  selector: 'app-create-revision-modal',
  templateUrl: './create-revision-modal.component.html',
  styleUrl: './create-revision-modal.component.scss',
})
export class CreateRevisionModalComponent implements OnDestroy {
  public dialogRef = inject(MatDialogRef<CreateRevisionModalComponent>);
  data = inject<{ article: Article }>(MAT_DIALOG_DATA);
  store = inject(Store);

  onDestroy$ = new Subject<void>();

  revisionForm = new FormGroup({
    note: new FormControl(''),
  });

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  handleClose(): void {
    this.dialogRef.close();
  }

  handleSubmit() {
    const { note } = this.revisionForm.value;
    if (!note) {
      return;
    }
    const revision = newRevisionFromNote(this.data.article.id, note);
    this.store.dispatch(
      BlogActions.createRevision({
        revision,
      }),
    );
    this.dialogRef.close();
  }
}
