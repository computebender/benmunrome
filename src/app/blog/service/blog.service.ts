import { Injectable } from '@angular/core';
import {
  DocumentData,
  Firestore,
  QueryDocumentSnapshot,
  SnapshotOptions,
  addDoc,
  collection,
  collectionData,
  getDoc,
} from '@angular/fire/firestore';
import { from, map, switchMap } from 'rxjs';
import { ArticleDTO } from '../dto/article.dto';

@Injectable({
  providedIn: 'root',
})
export class BlogService {
  constructor(private firestore: Firestore) {}

  getArticles() {
    const articlesCollection = collection(
      this.firestore,
      'articles',
    ).withConverter({
      fromFirestore: (
        snapshot: QueryDocumentSnapshot<DocumentData, DocumentData>,
        options: SnapshotOptions | undefined,
      ) => {
        const data = snapshot.data(options);
        return { uid: snapshot.id, ...data } as ArticleDTO; // Include the document ID
      },
      toFirestore: (model: ArticleDTO) => model,
    });

    return collectionData(articlesCollection).pipe(
      map((articles) => articles as ArticleDTO[]),
    );
  }

  createArticle(article: ArticleDTO) {
    const articlesCollection = collection(this.firestore, 'articles');

    const article$ = from(addDoc(articlesCollection, article)).pipe(
      switchMap((docRef) =>
        from(getDoc(docRef)).pipe(
          map((docSnapshot) => {
            if (docSnapshot.exists()) {
              return {
                uid: docSnapshot.id,
                ...docSnapshot.data(),
              } as ArticleDTO;
            } else {
              throw new Error('Document not found');
            }
          }),
        ),
      ),
    );

    return article$;
  }
}
