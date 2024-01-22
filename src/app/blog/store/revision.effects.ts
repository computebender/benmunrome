import { Injectable } from '@angular/core';
import { Timestamp } from '@angular/fire/firestore';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';
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
      mergeMap(({ articleId }) => {
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
}
