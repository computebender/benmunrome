import { Injectable } from '@angular/core';
import {
  Firestore,
  addDoc,
  collection,
  collectionData,
} from '@angular/fire/firestore';
import { Observable, from } from 'rxjs';
import { ArticleDTO } from '../dto/article.dto';

@Injectable({
  providedIn: 'root',
})
export class BlogService {
  constructor(private firestore: Firestore) {}

  getArticles() {
    const articlesCollection = collection(this.firestore, 'articles');
    return collectionData(articlesCollection) as Observable<ArticleDTO[]>;
  }

  createArticle(article: ArticleDTO) {
    const articlesCollection = collection(this.firestore, 'articles');
    return from(addDoc(articlesCollection, article));
  }
}
