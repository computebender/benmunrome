import { Injectable } from '@angular/core';
import { Timestamp } from '@angular/fire/firestore';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { routerNavigatedAction } from '@ngrx/router-store';
import { Store } from '@ngrx/store';
import { EMPTY, catchError, distinctUntilChanged, map, mergeMap, of, switchMap } from 'rxjs';
import { RevisionDTO } from '../dto/revision.dto';
import { BlogService } from '../service/blog.service';
import { manyArticleDtoToEntities } from '../util/article-dto-to-entities.util';
import { BlogActions } from './blog.actions';
import { selectActiveArticleId } from './selectors/active-article.selectors';

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

  setActiveRevision$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(BlogActions.setActiveRevision),
      mergeMap(({ article, revision }) => {
        const revisionDto: RevisionDTO = {
          uid: revision.id,
          createdAt: Timestamp.fromDate(revision.createdAt),
          markdownPath: revision.markdownPath,
          note: revision.note,
        };
        return this.blogService.setActiveRevision(article.id, revisionDto).pipe(
          map((_) => {
            return BlogActions.setActiveRevisionSuccess({
              article,
            });
          }),
          catchError((error) => {
            return of(
              BlogActions.setActiveRevisionFailure({
                article,
                error: error?.message || 'Unknown error',
              }),
            );
          }),
        );
      }),
    );
  });

  loadArticleOnRouterNavigation$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(routerNavigatedAction),
      concatLatestFrom(() => this.store.select(selectActiveArticleId)),
      distinctUntilChanged(
        ([, previousArticleId], [, currentArticleId]) =>
          previousArticleId === currentArticleId,
      ),
      switchMap(([_, articleId]) => {
        if (!articleId) {
          return EMPTY;
        }
        return of(BlogActions.loadArticles());
      }),
    );
  });

  constructor(
    private actions$: Actions,
    private blogService: BlogService,
    private store: Store
  ) {}
}
