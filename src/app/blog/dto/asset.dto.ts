import { Timestamp } from '@angular/fire/firestore';

export interface AssetDTO {
  uid?: string;
  name: string;
  path: string;
  createdAt: Timestamp;
  hasPendingWrites?: boolean;
}
