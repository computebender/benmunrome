import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';
import { Article } from '../model/article.model';
import { BlogService } from '../service/blog.service';
import { BlogActions } from './blog.actions';

@Injectable()
export class BlogEffects {
  newArticle$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(BlogActions.newArticle),
      switchMap(({ title, slug, summary }) => {
        const newArticle: Article = {
          id: uuidv4(),
          title,
          slug,
          summary,
          isActive: false,
          coverImageAssetId: null,
          tagIds: [],
          assetIds: [],
          revisionIds: [],
        };

        return of(BlogActions.createArticle({ article: newArticle }));
      }),
    );
  });

  createArticle$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(BlogActions.createArticle),
      switchMap(({ article }) => {
        return this.blogService
          .createArticle({
            title: article.title,
            summary: article.summary,
            slug: article.slug,
            isActive: article.isActive,
            coverImageAssetId: article.coverImageAssetId,
            tags: [],
            assets: [],
            revisions: [],
          })
          .pipe(
            map((articleDocumentReference) => {
              const firestoreId = articleDocumentReference.id;
              return BlogActions.createArticleSuccess({
                id: article.id,
                firestoreId,
              });
            }),
            catchError((error) => {
              return of(
                BlogActions.createArticleFailure({
                  id: article.id,
                  error: error?.message || 'Unknown error',
                }),
              );
            }),
          );
      }),
    );
  });
  constructor(
    private actions$: Actions,
    private blogService: BlogService,
  ) {}
}
