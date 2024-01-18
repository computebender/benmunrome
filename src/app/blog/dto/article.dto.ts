import { AssetDTO } from './asset.dto';
import { RevisionDTO } from './revision.dto';
import { TagDTO } from './tag.dto';

export interface ArticleDTO {
  uid?: string;
  title: string;
  summary: string;
  slug: string;
  isActive: boolean;
  coverImageAsset: Required<AssetDTO> | null;
  activeRevision: Required<RevisionDTO> | null;
  tags: Required<TagDTO>[];
}
