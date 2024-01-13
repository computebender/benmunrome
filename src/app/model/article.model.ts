import { Tag } from './tag.model';

interface ArticleBase {
  id: string;
  title: string;
  url: string;
  date: Date;
  summary: string;
  slug: string;
  isActive: boolean;
  coverImage?: string;
}

export interface Article extends ArticleBase {
  tags: string[];
}

export interface ArticleWithTags extends ArticleBase {
  tags: Tag[];
}
