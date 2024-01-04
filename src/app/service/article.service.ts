import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Article, ArticlesResponse } from '../model/article.model';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  private articlesUrl =
    'https://raw.githubusercontent.com/computebender/benmunrome-articles/main/articles.json';

  private httpClient = inject(HttpClient);

  getArticles(): Observable<Article[]> {
    return this.httpClient
      .get<ArticlesResponse>(this.articlesUrl)
      .pipe(map((response) => response.articles));
  }
}
