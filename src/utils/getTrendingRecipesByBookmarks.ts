import { BookmarkRecipe } from "../types/documentTypes";

export const getTrendingRecipesByBookmarks = (
  bookmarks: BookmarkRecipe[],
  limit = 6
) => {
  const bookmarkCounts: Record<string, number> = bookmarks.reduce(
    (acc: Record<string, number>, { recipeId }) => {
      acc[recipeId] = (acc[recipeId] || 0) + 1;
      return acc;
    },
    {}
  );

  return Object.keys(bookmarkCounts)
    .sort((a, b) => bookmarkCounts[b] - bookmarkCounts[a])
    .slice(0, limit);
};
