import { useQuery } from "@tanstack/react-query";
import { getCommentsForRecipe } from "../firestoreServices";
import { Comment } from "../../types/documentTypes";

interface UseCommentsReturn {
  isLoading: boolean;
  comments?: Comment[];
  error: string | null;
}

export const useComments = (recipeId: string): UseCommentsReturn => {
  const { isLoading, data, error } = useQuery({
    queryKey: ["comments", recipeId],
    queryFn: () => getCommentsForRecipe(recipeId),
    enabled: !!recipeId,
  });

  return {
    isLoading,
    comments: data || [],
    error: error?.message || null,
  };
};
