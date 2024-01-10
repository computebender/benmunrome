import {
  patchState,
  signalStore,
  withComputed,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import { addEntities, withEntities } from '@ngrx/signals/entities';
import { Article } from '../model/article.model';
import { computed, inject } from '@angular/core';
import { ArticleService } from '../service/article.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { catchError, first } from 'rxjs';
import { withDevtools } from '@angular-architects/ngrx-toolkit';

interface BlogStoreState {
  currentArticleId: string | undefined;
}

export const BlogStore = signalStore(
  { providedIn: 'root' },
  withDevtools('BlogStore'),
  withState<BlogStoreState>({
    currentArticleId: undefined,
  }),
  withEntities<Article>(),
  withComputed((state) => ({
    currentArticle: computed(() =>
      state
        .entities()
        .find((article) => article.id === state.currentArticleId()),
    ),
    activeArticlesByDate: computed(() =>
      state
        .entities()
        .filter((article) => article.isActive)
        .sort((a, b) => {
          const aDate = new Date(a.date);
          const bDate = new Date(b.date);
          return bDate.getTime() - aDate.getTime();
        }),
    ),
  })),
  withMethods((store) => {
    const articleService = inject(ArticleService);

    return {
      loadArticles: () => {
        articleService
          .getArticles()
          .pipe(
            first(),
            catchError((error) => {
              console.log('Error loading articles', error);
              return [];
            }),
          )
          .subscribe((articles) => patchState(store, addEntities(articles)));
      },
      addArticles: (articles: Article[]) => {
        patchState(store, addEntities(articles));
      },
      setCurrentArticleId: (articleId: string) => {
        patchState(store, {
          currentArticleId: articleId,
        });
      },
    };
  }),
  withHooks({
    onInit: ({ loadArticles }) => {
      loadArticles();
    },
  }),
);
