import { Injectable } from '@angular/core';
import { Timestamp } from '@angular/fire/firestore';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of, switchMap } from 'rxjs';
import { RevisionDTO } from '../dto/revision.dto';
import { RevisionService } from '../service/revision.service';
import { revisionDtoToRevisionEntity } from '../util/article-dto-to-entities.util';
import { BlogActions } from './blog.actions';

@Injectable()
export class RevisionEffects {
  constructor(
    private actions$: Actions,
    private revisionService: RevisionService,
  ) {}

  createRevision$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(BlogActions.createRevision),
      mergeMap(({ revision }) => {
        const revisionDto: RevisionDTO = {
          createdAt: Timestamp.now(),
          markdownPath: revision.markdownPath,
          note: revision.note,
        };
        return this.revisionService
          .createRevision(revisionDto, revision.articleId)
          .pipe(
            map((_) => {
              return BlogActions.createRevisionSuccess({
                revision,
              });
            }),
            catchError((error) => {
              return of(
                BlogActions.createRevisionFailure({
                  revision,
                  error: error?.message || 'Unknown error',
                }),
              );
            }),
          );
      }),
    );
  });

  loadRevisions$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(BlogActions.loadRevisions),
      switchMap(({ articleId }) => {
        return this.revisionService.getRevisions(articleId).pipe(
          map((revisions) => {
            const newRevisions = revisions.map((revision) =>
              revisionDtoToRevisionEntity(revision, articleId),
            );
            return BlogActions.loadRevisionsSuccess({
              revisions: newRevisions,
            });
          }),
          catchError((error) => {
            return of(
              BlogActions.loadRevisionsFailure({
                error: error?.message || 'Unknown error',
              }),
            );
          }),
        );
      }),
    );
  });

  uploadRevisionFile$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(BlogActions.uploadRevisionFile),
      mergeMap(({ revision, file }) => {
        return this.revisionService.uploadRevisionFile(revision, file).pipe(
          map((progress) => {
            if (progress.markdownPath !== undefined) {
              return BlogActions.uploadRevisionFileSuccess({
                revision,
                markdownPath: progress.markdownPath,
              });
            }
            return BlogActions.uploadRevisionFileProgress({
              revision,
              progress: progress.progress,
            });
          }),
          catchError((error) => {
            return of(
              BlogActions.uploadRevisionFileFailure({
                revision,
                error: error?.message || 'Unknown error',
              }),
            );
          }),
        );
      }),
    );
  });

  setRevisionMarkdownPath$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(BlogActions.uploadRevisionFileSuccess),
      mergeMap(({ revision, markdownPath }) => {
        return this.revisionService
          .setRevisionMarkdownPath(revision, markdownPath)
          .pipe(
            map((_) => {
              return BlogActions.setRevisionMarkdownPathSuccess({
                revision,
              });
            }),
            catchError((error) => {
              return of(
                BlogActions.setRevisionMarkdownPathFailure({
                  revision,
                  error: error?.message || 'Unknown error',
                }),
              );
            }),
          );
      }),
    );
  });
}
