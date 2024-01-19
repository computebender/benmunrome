import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateArticleModalComponent } from '../create-article-modal/create-article-modal.component';

@Component({
  selector: 'app-create-article-button',
  templateUrl: './create-article-button.component.html',
  styleUrl: './create-article-button.component.scss',
})
export class CreateArticleButtonComponent {
  public dialog: MatDialog = inject(MatDialog);

  openDialog(): void {
    const dialogRef = this.dialog.open(CreateArticleModalComponent);
  }

  handleOpenModal() {
    this.openDialog();
  }
}
