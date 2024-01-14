export const removeActiveTagIdFromActiveTagIds = (
  activeTagIds: string[] | null,
  tagId: string,
) => {
  if (activeTagIds == null) {
    return null;
  }
  const filteredActiveTagIds = activeTagIds.filter((id) => id !== tagId);
  if (filteredActiveTagIds.length === 0) {
    return null;
  }
  return filteredActiveTagIds;
};
