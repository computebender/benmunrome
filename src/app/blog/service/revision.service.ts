import { Injectable } from '@angular/core';
import {
  Firestore,
  addDoc,
  collection,
  collectionSnapshots,
} from '@angular/fire/firestore';
import { Storage } from '@angular/fire/storage';
import { Observable, from, map } from 'rxjs';
import { RevisionDTO } from '../dto/revision.dto';

@Injectable({
  providedIn: 'root',
})
export class RevisionService {
  constructor(
    private storage: Storage,
    private firestore: Firestore,
  ) {}

  createRevision(revisionDto: RevisionDTO, articleId: string) {
    const revisionsCollection = collection(
      this.firestore,
      'articles',
      articleId,
      'revisions',
    );
    return from(addDoc(revisionsCollection, revisionDto));
  }

  getRevisions(articleId: string): Observable<RevisionDTO[]> {
    const revisionsCollection = collection(
      this.firestore,
      'articles',
      articleId,
      'revisions',
    );

    return collectionSnapshots(revisionsCollection).pipe(
      map((querySnapshot) => {
        return querySnapshot.map((doc) => {
          return {
            ...(doc.data() as RevisionDTO),
            hasPendingWrites: doc.metadata.hasPendingWrites,
            uid: doc.id,
          };
        });
      }),
    );
  }

  uploadRevision(articleId: string, revisionId: string, file: File) {}
}
