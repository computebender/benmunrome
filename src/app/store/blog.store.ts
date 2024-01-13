import {
  patchState,
  signalStore,
  type,
  withComputed,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import { addEntities, withEntities } from '@ngrx/signals/entities';
import { Article } from '../model/article.model';
import { computed, inject } from '@angular/core';
import { ArticleService } from '../service/article.service';
import { catchError, first } from 'rxjs';
import { withDevtools } from '@angular-architects/ngrx-toolkit';
import { Tag } from '../model/tag.model';
import { sortArticlesByDate } from '../util/sort-articles-by-date.util';
import { filterActiveArticles } from '../util/filter-active-articles.util';
import { filterArticlesByTagIds } from '../util/filter-article-by-tag-ids.util';
import { joinArticlesWithTags } from '../util/join-articles-with-tags.util';
import { filterActiveTags } from '../util/filter-active-tags.util';
import { filterInactiveTags } from '../util/filter-inactive-tags.util';
import { addActiveTagIdToActiveTagIds } from '../util/add-active-tag-id-to-active-tag-ids.util';
import { removeActiveTagIdFromActiveTagIds } from '../util/remove-active-tag-id-from-active-tag-ids.util';
import { filterArticlesByEveryTagIds } from '../util/filter-article-by-tag-ids-refine.util';

interface BlogStoreState {
  currentArticleId: string | undefined;
  featuredArticleIds: string[];
  activeTagIds: string[] | null;
}

export const BlogStore = signalStore(
  { providedIn: 'root' },
  withDevtools('BlogStore'),
  withState<BlogStoreState>({
    currentArticleId: undefined,
    featuredArticleIds: [],
    activeTagIds: null,
  }),
  withEntities({ entity: type<Article>(), collection: 'article' }),
  withEntities({ entity: type<Tag>(), collection: 'tag' }),
  withComputed(
    ({
      articleEntities,
      currentArticleId,
      featuredArticleIds,
      activeTagIds,
      tagEntities,
    }) => ({
      currentArticle: computed(() =>
        articleEntities().find((article) => article.id === currentArticleId()),
      ),
      activeArticlesByDate: computed(() =>
        joinArticlesWithTags(
          sortArticlesByDate(filterActiveArticles(articleEntities())),
          tagEntities(),
        ),
      ),
      featuredArticles: computed(() =>
        joinArticlesWithTags(
          articleEntities().filter(
            (article) =>
              featuredArticleIds().includes(article.id) && article.isActive,
          ),
          tagEntities(),
        ),
      ),
      activeTagFilteredArticlesByDate: computed(() => {
        const tagIds = activeTagIds();
        if (tagIds == null) {
          return joinArticlesWithTags(
            sortArticlesByDate(filterActiveArticles(articleEntities())),
            tagEntities(),
          );
        }
        return joinArticlesWithTags(
          filterArticlesByEveryTagIds(
            sortArticlesByDate(filterActiveArticles(articleEntities())),
            tagIds,
          ),
          tagEntities(),
        );
      }),
      activeTags: computed(() =>
        filterActiveTags(tagEntities(), activeTagIds()),
      ),
      inactiveTags: computed(() =>
        filterInactiveTags(tagEntities(), activeTagIds()),
      ),
    }),
  ),
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
          .subscribe((articles) =>
            patchState(store, addEntities(articles, { collection: 'article' })),
          );
      },
      addArticles: (articles: Article[]) => {
        patchState(store, addEntities(articles, { collection: 'article' }));
      },
      setCurrentArticleId: (articleId: string) => {
        patchState(store, {
          currentArticleId: articleId,
        });
      },
      loadFeatuedArticleIds: () => {
        articleService
          .getFeaturedArticleIds()
          .pipe(
            first(),
            catchError((error) => {
              console.log('Error loading featured articles', error);
              return [];
            }),
          )
          .subscribe((ids) => {
            patchState(store, { featuredArticleIds: ids });
          });
      },
      loadTags: () => {
        articleService
          .getTags()
          .pipe(
            first(),
            catchError((error) => {
              console.log('Error loading tags', error);
              return [];
            }),
          )
          .subscribe((tags) => {
            patchState(store, addEntities(tags, { collection: 'tag' }));
          });
      },
      addActiveTagId: (tagId: string) => {
        patchState(store, {
          activeTagIds: addActiveTagIdToActiveTagIds(
            store.activeTagIds(),
            tagId,
          ),
        });
      },
      removeActiveTagId: (tagId: string) => {
        patchState(store, {
          activeTagIds: removeActiveTagIdFromActiveTagIds(
            store.activeTagIds(),
            tagId,
          ),
        });
      },
    };
  }),
  withHooks({
    onInit: ({ loadArticles, loadTags }) => {
      loadArticles();
      loadTags();
    },
  }),
);
