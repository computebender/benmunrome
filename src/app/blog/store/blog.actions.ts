import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Article } from '../model/article.model';
import { Asset } from '../model/asset.model';
import { Revision } from '../model/revision.model';
import { Tag } from '../model/tag.model';

export const BlogActions = createActionGroup({
  source: 'blog',
  events: {
    loadArticles: emptyProps(),
    loadArticlesSuccess: props<{
      articles: Article[];
      tags: Tag[];
      assets: Asset[];
      revisions: Revision[];
    }>(),
    loadArticlesFailure: props<{ error: unknown }>(),
    createArticle: props<{ article: Article }>(),
    createArticleSuccess: props<{ article: Article }>(),
    createArticleFailure: props<{ article: Article; error: string }>(),
    createRevision: props<{ revision: Revision }>(),
    createRevisionSuccess: props<{ revision: Revision }>(),
    createRevisionFailure: props<{ revision: Revision; error: string }>(),
    loadRevisions: props<{ articleId: string }>(),
    loadRevisionsSuccess: props<{ revisions: Revision[] }>(),
    loadRevisionsFailure: props<{ error: string }>(),
  },
});
