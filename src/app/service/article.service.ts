import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Article } from '../model/article.model';
import { FeaturedArticlesResponse } from '../model/featuredArticles.model';
import { Tag } from '../model/tag.model';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  private articlesUrl =
    'https://raw.githubusercontent.com/computebender/benmunrome-articles/main/articles.json';

  private featuredArticlesUrl =
    'https://raw.githubusercontent.com/computebender/benmunrome-articles/main/featuredArticles.json';

  private tagsUrl =
    'https://raw.githubusercontent.com/computebender/benmunrome-articles/main/tags.json';

  private httpClient = inject(HttpClient);

  getArticles(): Observable<Article[]> {
    return this.httpClient
      .get<{ articles: Article[] }>(this.articlesUrl)
      .pipe(map((response) => response.articles));
  }

  getFeaturedArticleIds(): Observable<string[]> {
    return this.httpClient
      .get<FeaturedArticlesResponse>(this.featuredArticlesUrl)
      .pipe(map((response) => response.featuredArticles));
  }

  getTags(): Observable<Tag[]> {
    return this.httpClient
      .get<{ tags: Tag[] }>(this.tagsUrl)
      .pipe(map((response) => response.tags));
  }
}
