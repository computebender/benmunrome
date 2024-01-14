export const addActiveTagIdToActiveTagIds = (
  activeTagIds: string[] | null,
  tagId: string,
) => {
  if (activeTagIds == null) {
    return [tagId];
  }
  return [...activeTagIds, tagId];
};
