import { Timestamp } from '@angular/fire/firestore';

export interface RevisionDTO {
  uid?: string;
  createdAt: Timestamp;
  markdownPath: string | null;
  note: string;
  hasPendingWrites?: boolean;
}
