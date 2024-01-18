import { v4 as uuidv4 } from 'uuid';
import { Article } from '../model/article.model';

export const newArticleFromTitleSlugSummary = (
  title: string,
  slug: string,
  summary: string,
): Article => ({
  id: uuidv4(),
  title,
  slug,
  summary,
  isActive: false,
  coverImageAssetId: null,
  activeRevisionId: null,
  hasPendingWrites: false,
  tagIds: [],
  assetIds: [],
  revisionIds: [],
});
