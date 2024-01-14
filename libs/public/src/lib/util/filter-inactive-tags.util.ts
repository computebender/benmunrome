import { Tag } from '../model/tag.model';

export const filterInactiveTags = (
  tags: Tag[],
  activeTagIds: string[] | null,
) => {
  if (activeTagIds == null) {
    return tags;
  }
  return tags.filter((tag) => !activeTagIds.includes(tag.id));
};
