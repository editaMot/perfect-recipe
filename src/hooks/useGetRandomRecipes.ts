import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { getDocuments } from "../services/firestoreServices";
import { Recipe } from "../types/documentTypes";

interface UseGetRandomRecipesReturn {
  isLoading: boolean;
  error: string | null;
  randomRecipes?: Recipe[];
}

export const useGetRandomRecipes = (
  pageSize: number | null,
  displaySize: number
): UseGetRandomRecipesReturn => {
  const {
    isLoading,
    error,
    data: response,
  } = useQuery({
    queryKey: ["randomRecipes", pageSize],
    queryFn: () => getDocuments<Recipe>("recipes", null, 1, "", []),
  });

  const randomRecipes = useMemo(() => {
    if (!response?.data) return [];
    return response.data.sort(() => Math.random() - 0.5).slice(0, displaySize);
  }, [response, displaySize]);

  return {
    isLoading,
    error: error?.message || null,
    randomRecipes,
  };
};
