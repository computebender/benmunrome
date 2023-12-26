import {
  patchState,
  signalStore,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import { addEntities, withEntities } from '@ngrx/signals/entities';
import { Article } from '../model/article.model';
import { inject } from '@angular/core';
import { ArticleService } from '../service/article.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { catchError, first } from 'rxjs';
import { withDevtools } from '@angular-architects/ngrx-toolkit';

export const BlogStore = signalStore(
  { providedIn: 'root' },
  withDevtools('BlogStore'),
  withState({}),
  withEntities<Article>(),
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
            })
          )
          .subscribe((articles) => patchState(store, addEntities(articles)));
      },
      addArticles: (articles: Article[]) => {
        patchState(store, addEntities(articles));
      },
    };
  }),
  withHooks({
    onInit: ({ loadArticles }) => {
      loadArticles();
    },
  })
);
