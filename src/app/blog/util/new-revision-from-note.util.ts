import { v4 as uuidv4 } from 'uuid';
import { Revision } from '../model/revision.model';

export const newRevisionFromNote = (
  articleId: string,
  note: string,
): Revision => ({
  id: uuidv4(),
  articleId,
  createdAt: new Date(),
  markdownPath: null,
  note,
  hasPendingWrites: false,
  uploadProgress: null,
});
