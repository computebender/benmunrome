import { Injectable } from '@angular/core';
import {
  Firestore,
  addDoc,
  collection,
  collectionSnapshots,
  doc,
  updateDoc,
} from '@angular/fire/firestore';
import { from, map } from 'rxjs';
import { ArticleDTO } from '../dto/article.dto';
import { RevisionDTO } from '../dto/revision.dto';

@Injectable({
  providedIn: 'root',
})
export class BlogService {
  constructor(private firestore: Firestore) {}

  getArticles() {
    const articlesCollection = collection(this.firestore, 'articles');

    return collectionSnapshots(articlesCollection).pipe(
      map((querySnapshot) => {
        return querySnapshot.map((doc) => {
          return {
            ...(doc.data() as ArticleDTO),
            hasPendingWrites: doc.metadata.hasPendingWrites,
            uid: doc.id,
          };
        });
      }),
    );
  }

  createArticle(article: ArticleDTO) {
    const articlesCollection = collection(this.firestore, 'articles');

    return from(addDoc(articlesCollection, article));
  }

  setActiveRevision(articleId: string, revision: RevisionDTO) {
    const articleDoc = doc(this.firestore, 'articles', articleId);

    return from(
      updateDoc(articleDoc, {
        activeRevision: revision,
      }),
    );
  }
}
