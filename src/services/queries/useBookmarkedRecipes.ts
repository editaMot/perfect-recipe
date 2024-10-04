import { useQuery } from "@tanstack/react-query";
import { getDocuments } from "../firestoreServices";
import { BookmarkedRecipe } from "../../types/documentTypes";

interface UseBookmarkedRecipesReturn {
  isLoading: boolean;
  error?: string;
  bookmarkedRecipes?: BookmarkedRecipe[];
}

export const useBookmarkedRecipes = (): UseBookmarkedRecipesReturn => {
  const { isLoading, data, error } = useQuery({
    queryKey: ["bookmarked-recipes"],
    queryFn: () => getDocuments<BookmarkedRecipe>("bookmarkedRecipes"),
  });

  return {
    isLoading,
    error: error?.message,
    bookmarkedRecipes: data?.data,
  };
};
