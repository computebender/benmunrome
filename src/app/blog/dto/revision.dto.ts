import { Timestamp } from '@angular/fire/firestore';

export interface RevisionDTO {
  revisionId: string;
  publishDate: Timestamp;
  markdownPath: string;
  note: string;
}
