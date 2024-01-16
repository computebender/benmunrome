import { Timestamp } from '@angular/fire/firestore';

export interface AssetDTO {
  assetId: string;
  title: string;
  path: string;
  createdAt: Timestamp;
}
