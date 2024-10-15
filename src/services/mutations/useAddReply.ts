import { useMutation, useQueryClient } from "@tanstack/react-query";
import { NewComment } from "../../types/documentTypes";
import { addDocument } from "../firestoreServices";

interface UseAddReplyReturn {
  isSubmitting: boolean;
  addReply: ({
    recipeId,
    commentId,
    replyData,
  }: {
    recipeId: string;
    commentId: string;
    replyData: NewComment;
  }) => void;
}

export const useAddReply = (): UseAddReplyReturn => {
  const queryClient = useQueryClient();

  const { isPending: isSubmitting, mutate: addReply } = useMutation({
    mutationFn: ({
      recipeId,
      commentId,
      replyData,
    }: {
      recipeId: string;
      commentId: string;
      replyData: NewComment;
    }) =>
      addDocument(
        "replies",
        replyData,
        `recipes/${recipeId}/comments/${commentId}`
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["comments"],
      });
    },
    onError: (error) => console.log(error),
  });

  return { isSubmitting, addReply };
};
