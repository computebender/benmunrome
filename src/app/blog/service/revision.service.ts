import { Injectable } from '@angular/core';
import {
  Firestore,
  addDoc,
  collection,
  collectionSnapshots,
  doc,
  updateDoc,
} from '@angular/fire/firestore';
import {
  Storage,
  fromTask,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from '@angular/fire/storage';
import { Observable, from, map, of, switchMap } from 'rxjs';
import { RevisionDTO } from '../dto/revision.dto';
import { Revision } from '../model/revision.model';

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

  uploadRevisionFile(
    revision: Revision,
    file: File,
  ): Observable<{
    progress: number;
    markdownPath?: string;
  }> {
    const filePath = `articles/revisions/${revision.articleId}/${revision.id}.md`;
    const fileRef = ref(this.storage, filePath);
    const task = uploadBytesResumable(fileRef, file);

    return fromTask(task).pipe(
      switchMap((snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        if (snapshot.state === 'success') {
          return from(getDownloadURL(fileRef)).pipe(
            map((downloadUrl) => {
              return {
                progress: progress,
                markdownPath: downloadUrl,
              };
            }),
          );
        }
        return of({ progress: progress });
      }),
    );
  }

  setRevisionMarkdownPath(revision: Revision, markdownPath: string) {
    const revisionsCollection = collection(
      this.firestore,
      'articles',
      revision.articleId,
      'revisions',
    );

    const docRef = doc(revisionsCollection, revision.id);

    return from(updateDoc(docRef, { markdownPath }));
  }
}
