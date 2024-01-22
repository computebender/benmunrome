import { ArticleDTO } from '../dto/article.dto';
import { AssetDTO } from '../dto/asset.dto';
import { RevisionDTO } from '../dto/revision.dto';
import { TagDTO } from '../dto/tag.dto';
import { Article } from '../model/article.model';
import { Asset } from '../model/asset.model';
import { DtoRead } from '../model/dto-read.model';
import { Revision } from '../model/revision.model';
import { Tag } from '../model/tag.model';

export const revisionDtoToRevisionEntity = (
  revisionDto: RevisionDTO,
  articleId: string,
): Revision => {
  if (revisionDto.uid === undefined)
    throw new Error('RevisionDTO must have a uid');

  if (revisionDto.hasPendingWrites === undefined)
    throw new Error('RevisionDTO must have property hasPendingWrites');

  return {
    id: revisionDto.uid,
    createdAt: revisionDto.createdAt.toDate(),
    markdownPath: revisionDto.markdownPath,
    note: revisionDto.note,
    articleId,
    firestoreId: revisionDto.uid,
    hasPendingWrites: revisionDto.hasPendingWrites,
  };
};

const assetDtoToAssetEntity = (
  assetDto: Required<AssetDTO>,
  articleId: string,
): Asset => {
  return {
    id: assetDto.uid,
    name: assetDto.name,
    path: assetDto.path,
    createdAt: assetDto.createdAt.toDate(),
    articleId,
    firestoreId: assetDto.uid,
  };
};

const tagDtoToTagEntity = (articleTagDto: Required<TagDTO>): Tag => {
  return {
    id: articleTagDto.uid,
    name: articleTagDto.name,
    colour: articleTagDto.colour,
  };
};

export const oneArticleDtoToEntities = (
  articleDto: ArticleDTO,
): {
  article: Article;
  tags: Tag[];
  coverImageAsset: Asset | null;
  activeRevision: Revision | null;
} => {
  if (articleDto.uid === undefined)
    throw new Error('ArticleDTO must have a uid');

  if (articleDto.hasPendingWrites === undefined)
    throw new Error('ArticleDTO must have property hasPendingWrites');

  const articleId = articleDto.uid;
  const tags = Object.values(articleDto.tags).map(tagDtoToTagEntity);
  const tagIds = Object.keys(articleDto.tags);
  const coverImageAsset = articleDto.coverImageAsset
    ? assetDtoToAssetEntity(articleDto.coverImageAsset, articleId)
    : null;
  const activeRevision = articleDto.activeRevision
    ? revisionDtoToRevisionEntity(articleDto.activeRevision, articleId)
    : null;

  const assetIds = coverImageAsset != null ? [coverImageAsset.id] : null;
  const revisionIds = activeRevision != null ? [activeRevision.id] : null;

  const article: Article = {
    id: articleDto.uid,
    title: articleDto.title,
    slug: articleDto.slug,
    summary: articleDto.summary,
    isActive: articleDto.isActive,
    coverImageAssetId: articleDto.coverImageAsset?.uid || null,
    activeRevisionId: articleDto.activeRevision?.uid || null,
    hasPendingWrites: articleDto.hasPendingWrites,
    tagIds,
    assetIds,
    revisionIds,
  };

  return {
    article,
    tags,
    coverImageAsset,
    activeRevision,
  };
};

export const manyArticleDtoToEntities = (
  articleDtos: (ArticleDTO & DtoRead)[],
): {
  articles: Article[];
  tags: Tag[];
  assets: Asset[];
  revisions: Revision[];
} => {
  const articles: Article[] = [];
  const assets: Asset[] = [];
  const revisions: Revision[] = [];
  const tags: Tag[] = [];

  articleDtos.forEach((articleDto) => {
    const {
      article,
      tags: newTags,
      coverImageAsset,
      activeRevision,
    } = oneArticleDtoToEntities(articleDto);
    articles.push(article);
    tags.push(...newTags);
    if (coverImageAsset) {
      assets.push(coverImageAsset);
    }
    if (activeRevision) {
      revisions.push(activeRevision);
    }
  });

  return {
    articles,
    tags,
    assets,
    revisions,
  };
};
