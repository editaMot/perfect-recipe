import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateDocumentField } from "../firestoreServices";

interface UseUpdateCommentLikesReturn {
  isLiking: boolean;
  updateCommentLikes: (args: {
    commentId: string;
    recipeId: string;
    userId: string;
    currentLikedBy: string[];
  }) => void;
}

export const useUpdateCommentLikes = (): UseUpdateCommentLikesReturn => {
  const queryClient = useQueryClient();

  const { isPending: isLiking, mutate: updateCommentLikes } = useMutation({
    mutationFn: async ({
      commentId,
      recipeId,
      userId,
      currentLikedBy,
    }: {
      commentId: string;
      recipeId: string;
      userId: string;
      currentLikedBy: string[];
    }) => {
      const newLikedBy = currentLikedBy.includes(userId)
        ? currentLikedBy.filter((id) => id !== userId)
        : [...currentLikedBy, userId];

      await updateDocumentField(`recipes/${recipeId}/comments`, commentId, {
        likedBy: newLikedBy,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["comments"],
      });
    },
    onError: (error) => console.log(error),
  });

  return { isLiking, updateCommentLikes };
};
