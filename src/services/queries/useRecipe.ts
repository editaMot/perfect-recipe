import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { Recipe } from "../../types/documentTypes";
import { getDocumentById } from "../firestoreServices";

interface UseRecipeReturn {
  isLoading: boolean;
  recipe: Recipe | undefined;
  error: string | null;
}

export const useRecipe = (): UseRecipeReturn => {
  const { recipeId } = useParams<{ recipeId?: string }>();

  const { isLoading, data, error } = useQuery({
    queryKey: ["recipe", recipeId],
    queryFn: () => getDocumentById<Recipe>("recipes", recipeId || ""),
  });

  return {
    isLoading,
    recipe: data || undefined,
    error: error?.message || null,
  };
};
