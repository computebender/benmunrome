import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Article } from '../model/article.model';

export const BlogActions = createActionGroup({
  source: 'blog',
  events: {
    loadArticles: emptyProps(),
    loadArticlesSuccess: props<{ articles: Article[] }>(),
    loadArticlesFailure: props<{ error: unknown }>(),
    newArticle: props<{ title: string; slug: string; summary: string }>(),
    createArticle: props<{ article: Article }>(),
    createArticleSuccess: props<{ id: string; firestoreId: string }>(),
    createArticleFailure: props<{ id: string; error: string }>(),
  },
});
