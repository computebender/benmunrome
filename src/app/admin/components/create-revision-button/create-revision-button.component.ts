import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { take } from 'rxjs';
import { selectActiveArticle } from '../../store/admin.selectors';
import { CreateRevisionModalComponent } from '../create-revision-modal/create-revision-modal.component';

@Component({
  selector: 'app-create-revision-button',
  templateUrl: './create-revision-button.component.html',
  styleUrl: './create-revision-button.component.scss',
})
export class CreateRevisionButtonComponent {
  store = inject(Store);
  article$ = this.store.select(selectActiveArticle);
  public dialog: MatDialog = inject(MatDialog);

  openDialog(): void {
    this.article$.pipe(take(1)).subscribe((article) => {
      if (!article) {
        return;
      }
      this.dialog.open(CreateRevisionModalComponent, {
        data: { article },
      });
    });
  }

  handleOpenModal() {
    this.openDialog();
  }
}
