import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';
import { BlogService } from '../service/blog.service';
import {
  manyArticleDtoToEntities,
  oneArticleDtoToEntities,
} from '../util/article-dto-to-entities.util';
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
            tags: [],
          })
          .pipe(
            map((articleDto) => {
              const { article: createdArticle } =
                oneArticleDtoToEntities(articleDto);
              return BlogActions.createArticleSuccess({
                optimisticId: article.id,
                article: createdArticle,
              });
            }),
            catchError((error) => {
              return of(
                BlogActions.createArticleFailure({
                  optimisticId: article.id,
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
      mergeMap(() => {
        return this.blogService.getArticles().pipe(
          map((articleDtos) => {
            console.log(articleDtos);
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
            console.log(error);
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
