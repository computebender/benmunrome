import { createSelector } from '@ngrx/store';
import { Tag } from '../../model/tag.model';
import {
  selectAllArticles,
  selectAssetEntities,
  selectTagEntities
} from '../blog.reducer';

export const selectAllUIArticles = createSelector(
  selectAllArticles,
  selectTagEntities,
  selectAssetEntities,
  (articles, tagEntities, assetEntities) => {
    return articles.map((article) => ({
      ...article,
      coverImageUrl: article.coverImageAssetId
        ? assetEntities[article.coverImageAssetId]?.path
        : undefined,
      tags: article.tagIds.reduce((tags: Tag[], tagId) => {
        const tag = tagEntities[tagId];
        if (tag) {
          tags.push(tag);
        }
        return tags;
      }, [])
    }));
  },
);

