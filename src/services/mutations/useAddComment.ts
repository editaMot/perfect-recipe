import { useMutation, useQueryClient } from "@tanstack/react-query";
import { NewComment } from "../../types/documentTypes";
import { addDocument } from "../firestoreServices";

interface UseAddCommentReturn {
  isSubmitting: boolean;
  addComment: ({
    recipeId,
    commentData,
  }: {
    recipeId: string;
    commentData: NewComment;
  }) => void;
}

export const useAddComment = (): UseAddCommentReturn => {
  const queryClient = useQueryClient();

  const { isPending: isSubmitting, mutate: addComment } = useMutation({
    mutationFn: ({
      recipeId,
      commentData,
    }: {
      recipeId: string;
      commentData: NewComment;
    }) => addDocument("comments", commentData, `recipes/${recipeId}`),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["comments"],
      });
    },
    onError: (error) => console.log(error),
  });

  return { isSubmitting, addComment };
};
