import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Subject, takeUntil } from 'rxjs';
import { BlogActions } from '../../../blog/store/blog.actions';
import { newArticleFromTitleSlugSummary } from '../../../blog/util/new-article-from-title-slug-summary.util';

@Component({
  selector: 'app-create-article-modal',
  templateUrl: './create-article-modal.component.html',
  styleUrl: './create-article-modal.component.scss',
})
export class CreateArticleModalComponent implements OnInit, OnDestroy {
  public dialogRef = inject(MatDialogRef<CreateArticleModalComponent>);
  store = inject(Store);

  onDestroy$ = new Subject<void>();

  articleForm = new FormGroup({
    title: new FormControl('', Validators.required),
    slug: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[a-z0-9-]+$/),
    ]),
    summary: new FormControl('', Validators.required),
  });

  ngOnInit(): void {
    const slugControl = this.articleForm.get('slug');
    if (slugControl) {
      slugControl.valueChanges
        .pipe(takeUntil(this.onDestroy$))
        .subscribe((value) => {
          if (!value) {
            return;
          }
          this.updateSlug(value);
        });
    }
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  private updateSlug(value: string) {
    const transformedValue = value.replace(/\s+/g, '-').toLowerCase();
    this.articleForm
      .get('slug')!
      .setValue(transformedValue, { emitEvent: false });
  }

  handleClose(): void {
    this.dialogRef.close();
  }

  handleSubmit() {
    const { title, slug, summary } = this.articleForm.value;

    if (!title || !slug || !summary) {
      return;
    }

    const article = newArticleFromTitleSlugSummary(title, slug, summary);
    this.store.dispatch(BlogActions.createArticle({ article }));
    this.handleClose();
  }

  handleCreateArticle() {
    const article = newArticleFromTitleSlugSummary(
      'Article Title',
      'some-slug',
      'Some summary',
    );
    this.store.dispatch(BlogActions.createArticle({ article }));
  }
}
