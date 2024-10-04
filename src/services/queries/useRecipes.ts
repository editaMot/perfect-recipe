import { useQuery } from "@tanstack/react-query";
import { Recipe } from "../../types/documentTypes";
import { getDocuments } from "../firestoreServices";

interface UseRecipesReturn {
  isLoading: boolean;
  error: string | null;
  recipes?: Recipe[];
  totalPages: number;
  totalDocs: number;
}

export const useRecipes = (
  pageSize: number | null,
  currentPage: number,
  fieldName: string,
  selectedTags: string[]
): UseRecipesReturn => {
  const {
    isLoading,
    data: response,
    error,
  } = useQuery({
    queryKey: ["recipes", currentPage, fieldName, selectedTags, pageSize],
    queryFn: () =>
      getDocuments<Recipe>(
        "recipes",
        pageSize,
        currentPage,
        fieldName,
        selectedTags
      ),
  });

  const totalPages =
    response && pageSize ? Math.ceil(response.totalDocs / pageSize) : 1;

  return {
    isLoading,
    error: error?.message || null,
    recipes: response?.data,
    totalPages,
    totalDocs: response?.totalDocs || 0,
  };
};
