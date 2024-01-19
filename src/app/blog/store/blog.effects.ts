import { Injectable } from '@angular/core';
import { Timestamp } from '@angular/fire/firestore';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of, switchMap } from 'rxjs';
import { BlogService } from '../service/blog.service';
import { manyArticleDtoToEntities } from '../util/article-dto-to-entities.util';
import { BlogActions } from './blog.actions';

@Injectable()
export class BlogEffects {
  createArticle$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(BlogActions.createArticle),
      mergeMap(({ article }) => {
        return this.blogService
          .createArticle({
            title: article.title,
            summary: article.summary,
            slug: article.slug,
            isActive: article.isActive,
            coverImageAsset: null,
            activeRevision: null,
            tags: {},
            createdAt: Timestamp.now(),
          })
          .pipe(
            map((_) => {
              return BlogActions.createArticleSuccess({
                article,
              });
            }),
            catchError((error) => {
              return of(
                BlogActions.createArticleFailure({
                  article,
                  error: error?.message || 'Unknown error',
                }),
              );
            }),
          );
      }),
    );
  });

  loadArticles$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(BlogActions.loadArticles),
      switchMap(() => {
        return this.blogService.getArticles().pipe(
          map((articleDtos) => {
            const { articles, tags, assets, revisions } =
              manyArticleDtoToEntities(articleDtos);
            return BlogActions.loadArticlesSuccess({
              articles,
              tags,
              assets,
              revisions,
            });
          }),
          catchError((error) => {
            return of(
              BlogActions.loadArticlesFailure({
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
