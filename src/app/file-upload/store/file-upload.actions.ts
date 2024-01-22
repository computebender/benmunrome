import { createActionGroup, props } from '@ngrx/store';

export const FileUploadActions = createActionGroup({
  source: 'FileUpload',
  events: {
    uploadFile: props<{ id: string; path: string; file: File }>(),
    uploadFileSuccess: props<{ id: string; downloadUrl: string }>(),
    uploadFileFailure: props<{ id: string; error: string }>(),
    updateProgress: props<{ id: string; progress: number }>(),
  },
});
