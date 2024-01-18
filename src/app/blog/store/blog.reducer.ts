import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { createFeature, createReducer, on } from '@ngrx/store';
import { Article } from '../model/article.model';
import { Asset } from '../model/asset.model';
import { Revision } from '../model/revision.model';
import { Tag } from '../model/tag.model';
import { BlogActions } from './blog.actions';

export const blogFeatureKey = 'blog';

export interface State {
  isLoadingArticles: boolean;
  isLoadingTags: boolean;
  isLoadingResources: boolean;
  articles: EntityState<Article>;
  tags: EntityState<Tag>;
  assets: EntityState<Asset>;
  revisions: EntityState<Revision>;
}

const articleAdapter = createEntityAdapter<Article>();
const tagAdapter = createEntityAdapter<Tag>();
const assetAdapter = createEntityAdapter<Asset>();
const revisionAdapter = createEntityAdapter<Revision>();

export const initialState: State = {
  isLoadingArticles: false,
  isLoadingTags: false,
  isLoadingResources: false,
  articles: articleAdapter.getInitialState(),
  tags: tagAdapter.getInitialState(),
  assets: assetAdapter.getInitialState(),
  revisions: revisionAdapter.getInitialState(),
};

const blogReducer = createReducer(
  initialState,
  on(BlogActions.createArticle, (state, { article }) => ({
    ...state,
    articles: articleAdapter.addOne(article, state.articles),
  })),
  on(BlogActions.createArticleSuccess, (state, { optimisticId, article }) => ({
    ...state,
    articles: articleAdapter.removeOne(optimisticId, state.articles),
  })),
  on(BlogActions.createArticleFailure, (state, { optimisticId, error }) => ({
    ...state,
    articles: articleAdapter.updateOne(
      {
        id: optimisticId,
        changes: {
          error,
        },
      },
      state.articles,
    ),
  })),
  on(BlogActions.loadArticles, (state) => ({
    ...state,
    isLoadingArticles: true,
  })),
  on(
    BlogActions.loadArticlesSuccess,
    (state, { articles, tags, assets, revisions }) => ({
      ...state,
      isLoadingArticles: false,
      articles: articleAdapter.upsertMany(articles, state.articles),
      tags: tagAdapter.upsertMany(tags, state.tags),
      assets: assetAdapter.upsertMany(assets, state.assets),
      revisions: revisionAdapter.upsertMany(revisions, state.revisions),
    }),
  ),
);

export const blogFeature = createFeature({
  name: blogFeatureKey,
  reducer: blogReducer,
});

export const {
  selectAll: selectAllArticles,
  selectEntities: selectArticleEntities,
  selectIds: selectArticleIds,
  selectTotal: selectTotalArticles,
} = articleAdapter.getSelectors(blogFeature.selectArticles);

export const {
  selectAll: selectAllTags,
  selectEntities: selectTagEntities,
  selectIds: selectTagIds,
  selectTotal: selectTotalTags,
} = tagAdapter.getSelectors(blogFeature.selectTags);

export const {
  selectAll: selectAllAssets,
  selectEntities: selectAssetEntities,
  selectIds: selectAssetIds,
  selectTotal: selectTotalAssets,
} = assetAdapter.getSelectors(blogFeature.selectAssets);

export const {
  reducer,
  selectIsLoadingArticles,
  selectIsLoadingResources,
  selectIsLoadingTags,
} = blogFeature;
