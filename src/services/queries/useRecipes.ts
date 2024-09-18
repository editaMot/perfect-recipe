import { useQuery } from "@tanstack/react-query";
import { Recipe } from "../../types/documentTypes";
import { getDocuments } from "../firestoreServices";

interface UseRecipesReturn {
  isLoading: boolean;
  error: string | null;
  recipes: Recipe[] | undefined;
  totalPages: number;
  totalDocs: number;
}

export const useRecipes = (
  pageSize: number,
  currentPage: number
): UseRecipesReturn => {
  const {
    isLoading,
    data: response,
    error,
  } = useQuery({
    queryKey: ["recipes", currentPage],
    queryFn: () => getDocuments<Recipe>("recipes", pageSize, currentPage),
  });

  const totalPages = response ? Math.ceil(response?.totalDocs / pageSize) : 0;

  return {
    isLoading,
    error: error?.message || null,
    recipes: response?.data,
    totalPages,
    totalDocs: response?.totalDocs || 0,
  };
};
