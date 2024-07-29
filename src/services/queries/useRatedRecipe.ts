import { useQuery } from "@tanstack/react-query";
import { getDocumentsByField } from "../firestoreServices";
import { RatedRecipe } from "../../types/documentTypes";

interface UseRatedRecipeReturn {
  isLoading: boolean;
  error: string | null;
  ratedRecipe: RatedRecipe[] | undefined;
}

export const useRatedRecipe = (
  fieldName: string,
  fieldValue: string | number
): UseRatedRecipeReturn => {
  const {
    isLoading,
    data: ratedRecipe,
    error,
  } = useQuery<RatedRecipe[], Error>({
    queryKey: ["rated-recipes", fieldName, fieldValue],
    queryFn: () => getDocumentsByField("recipesRating", fieldName, fieldValue),
  });

  return { isLoading, error: error?.message || null, ratedRecipe };
};
