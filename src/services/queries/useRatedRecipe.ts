import { useQuery } from "@tanstack/react-query";
import { getDocumentsByField } from "../firestoreServices";

export const useRatedRecipe = (
  fieldName: string,
  fieldValue: string | number
) => {
  const {
    isLoading,
    data: ratedRecipe,
    error,
  } = useQuery({
    queryKey: ["rated-recipes", fieldName, fieldValue],
    queryFn: () => getDocumentsByField("recipesRating", fieldName, fieldValue),
  });

  return { isLoading, error, ratedRecipe };
};
