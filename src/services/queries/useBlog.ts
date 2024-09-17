import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { Blog } from "../../types/documentTypes";
import { getDocumentById } from "../firestoreServices";

interface UseBlogReturn {
  isLoading: boolean;
  blog?: Blog;
  error: string | null;
}

export const useBlog = (): UseBlogReturn => {
  const { blogId } = useParams<{ blogId?: string }>();

  const { isLoading, data, error } = useQuery({
    queryKey: ["blog", blogId],
    queryFn: () => getDocumentById<Blog>("blogs", blogId || ""),
  });

  return {
    isLoading,
    blog: data || undefined,
    error: error?.message || null,
  };
};
