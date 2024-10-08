import {
  MutateOptions,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { addDocument } from "../firestoreServices";
import { BookmarkedRecipes } from "../../types/documentTypes.tsx";

interface UseBookmarkRecipeReturn {
  isSaving: boolean;
  bookmarkRecipe: (
    newBookmarkedRecipe: BookmarkedRecipes,
    options?: MutateOptions<string, Error, BookmarkedRecipes>
  ) => void;
}

export const useBookmarkRecipe = (): UseBookmarkRecipeReturn => {
  const queryClient = useQueryClient();

  const { isPending: isSaving, mutate: bookmarkRecipe } = useMutation({
    mutationFn: (newBookmarkedRecipe: BookmarkedRecipes) =>
      addDocument("bookmarkedRecipes", newBookmarkedRecipe),
    onSuccess: (docId) => {
      queryClient.invalidateQueries({
        queryKey: ["bookmarked-recipes"],
      });
      return docId;
    },
    onError: (error) => console.log(error),
  });

  return { isSaving, bookmarkRecipe };
};
