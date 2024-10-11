import { useMutation, useQueryClient } from "@tanstack/react-query";
import { RecipeRating } from "../../types/documentTypes.tsx";
import { addDocument } from "../firestoreServices";

interface UseRateRecipeReturn {
  isRating: boolean;
  rateRecipe: (ratingValue: RecipeRating) => void;
}

export const useRateRecipe = (): UseRateRecipeReturn => {
  const queryClient = useQueryClient();

  const { isPending: isRating, mutate: rateRecipe } = useMutation({
    mutationFn: (ratingValue: RecipeRating) =>
      addDocument("recipesRating", ratingValue),
    onSuccess: (docId) => {
      queryClient.invalidateQueries({
        queryKey: ["rated-recipes"],
      });
      return docId;
    },
    onError: (error) => console.log(error),
  });

  return { isRating, rateRecipe };
};
