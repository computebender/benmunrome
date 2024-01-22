import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { createFeature, createReducer, on } from '@ngrx/store';
import { FileUpload } from '../model/file-upload.model';
import { FileUploadActions } from './file-upload.actions';

export const fileUploadFeatureKey = 'fileUpload';

export interface State extends EntityState<FileUpload> {}

const fileUploadAdapter = createEntityAdapter<FileUpload>();

export const initialState: State = {
  ...fileUploadAdapter.getInitialState(),
};

const fileUploadReducer = createReducer(
  initialState,
  on(FileUploadActions.uploadFile, (state, { id }) => ({
    ...fileUploadAdapter.addOne({ id, progress: 0 }, state),
  })),
  on(FileUploadActions.uploadFileSuccess, (state, { id, downloadUrl }) => ({
    ...fileUploadAdapter.updateOne(
      {
        id,
        changes: {
          downloadUrl,
        },
      },
      state,
    ),
  })),
  on(FileUploadActions.uploadFileFailure, (state, { id, error }) => ({
    ...fileUploadAdapter.updateOne(
      {
        id,
        changes: {
          error,
        },
      },
      state,
    ),
  })),
  on(FileUploadActions.updateProgress, (state, { id, progress }) => ({
    ...fileUploadAdapter.updateOne(
      {
        id,
        changes: {
          progress,
        },
      },
      state,
    ),
  })),
);

export const fileUploadFeature = createFeature({
  name: fileUploadFeatureKey,
  reducer: fileUploadReducer,
  extraSelectors: ({ selectFileUploadState }) => ({
    ...fileUploadAdapter.getSelectors(selectFileUploadState),
  }),
});

export const {
  reducer,
  selectFileUploadState,
  selectAll: selectAllFileUploads,
  selectEntities: selectFileUploadEntities,
  selectIds: selectFileUploadIds,
  selectTotal: selectFileUploadTotal,
} = fileUploadFeature;
