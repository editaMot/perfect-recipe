import { useQuery } from "@tanstack/react-query";
import { getDocuments } from "../firestoreServices";

export const useBookmarkedRecipes = () => {
  const {
    isLoading,
    data: bookmarkedRecipes,
    error,
  } = useQuery({
    queryKey: ["bookmarked-recipes"],
    queryFn: () => getDocuments("bookmarkedRecipes"),
  });

  return { isLoading, error, bookmarkedRecipes };
};
