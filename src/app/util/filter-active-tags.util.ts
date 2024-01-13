import { Tag } from '../model/tag.model';

export const filterActiveTags = (
  tags: Tag[],
  activeTagIds: string[] | null,
) => {
  if (activeTagIds == null) {
    return [];
  }
  return tags.filter((tag) => activeTagIds.includes(tag.id));
};
