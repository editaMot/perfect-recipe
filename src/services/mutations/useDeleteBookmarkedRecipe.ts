import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteDocument } from "../firestoreServices";

export const useDeleteBookmarkedRecipe = () => {
  const queryClient = useQueryClient();

  const { isPending: isDeleting, mutate: deleteBookmarkedRecipe } = useMutation(
    {
      mutationFn: (recipeId: string) =>
        deleteDocument("bookmarkedRecipes", recipeId),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["bookmarked-recipes"] });
      },
      onError: (error) => console.log(error),
    }
  );

  return { isDeleting, deleteBookmarkedRecipe };
};
