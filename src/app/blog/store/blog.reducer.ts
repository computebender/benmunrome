import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { createFeature, createReducer, on } from '@ngrx/store';
import { Article } from '../model/article.model';
import { Asset } from '../model/asset.model';
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
}

const articleAdapter = createEntityAdapter<Article>();
const tagAdapter = createEntityAdapter<Tag>();
const assetAdapter = createEntityAdapter<Asset>();

export const initialState: State = {
  isLoadingArticles: false,
  isLoadingTags: false,
  isLoadingResources: false,
  articles: articleAdapter.getInitialState(),
  tags: tagAdapter.getInitialState(),
  assets: assetAdapter.getInitialState(),
};

const blogReducer = createReducer(
  initialState,
  on(BlogActions.createArticle, (state, { article }) => ({
    ...state,
    articles: articleAdapter.addOne(article, state.articles),
  })),
  on(BlogActions.createArticleSuccess, (state, { id, firestoreId }) => ({
    ...state,
    articles: articleAdapter.updateOne(
      {
        id,
        changes: {
          firestoreId,
        },
      },
      state.articles,
    ),
  })),
  on(BlogActions.createArticleFailure, (state, { id, error }) => ({
    ...state,
    articles: articleAdapter.updateOne(
      {
        id,
        changes: {
          error,
        },
      },
      state.articles,
    ),
  })),
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
