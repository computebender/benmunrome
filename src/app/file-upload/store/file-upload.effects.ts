import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap } from 'rxjs/operators';
import { FileUploadService } from '../service/file-upload.service';
import { FileUploadActions } from './file-upload.actions';

@Injectable()
export class FileUploadEffects {
  constructor(
    private actions$: Actions,
    private fileUploadService: FileUploadService,
  ) {}

  uploadFile$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(FileUploadActions.uploadFile),
      mergeMap(({ id, path, file }) =>
        this.fileUploadService.uploadFile(path, file).pipe(
          map(({ progress, downloadUrl }) => {
            if (downloadUrl !== undefined) {
              return FileUploadActions.uploadFileSuccess({
                id,
                downloadUrl,
              });
            }
            return FileUploadActions.updateProgress({ id, progress });
          }),
        ),
      ),
    );
  });
}
