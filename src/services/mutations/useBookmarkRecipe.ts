import {
  MutateOptions,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { addDocument } from "../firestoreServices";
import { BookmarkRecipe } from "../../types/documentTypes.tsx";

interface UseBookmarkRecipeReturn {
  isSaving: boolean;
  bookmarkRecipe: (
    newBookmarkedRecipe: BookmarkRecipe,
    options?: MutateOptions<string, Error, BookmarkRecipe>
  ) => void;
}

export const useBookmarkRecipe = (): UseBookmarkRecipeReturn => {
  const queryClient = useQueryClient();

  const { isPending: isSaving, mutate: bookmarkRecipe } = useMutation({
    mutationFn: (newBookmarkedRecipe: BookmarkRecipe) =>
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
