import { useQuery } from "@tanstack/react-query";
import { Blog } from "../../types/documentTypes";
import { getDocuments } from "../firestoreServices";

interface UseBlogsReturn {
  isLoading: boolean;
  error: string | null;
  blogs: Blog[] | undefined;
  totalPages: number;
  totalDocs: number;
}

export const useBlogs = (
  pageSize: number,
  currentPage: number
): UseBlogsReturn => {
  const {
    isLoading,
    data: response,
    error,
  } = useQuery({
    queryKey: ["blogs", currentPage],
    queryFn: () => getDocuments<Blog>("blogs", pageSize, currentPage),
  });

  const totalPages = response ? Math.ceil(response?.totalDocs / pageSize) : 0;

  return {
    isLoading,
    error: error?.message || null,
    blogs: response?.data,
    totalPages,
    totalDocs: response?.totalDocs || 0,
  };
};
