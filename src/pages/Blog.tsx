import { Box, Typography } from "@mui/material";
import { useSearchParams } from "react-router-dom";
import BlogCard from "../components/BlogCard";
import Pagination from "../components/Pagination";
import { BLOG_PAGE_SIZE } from "../constants/constants";
import { useBlogs } from "../services/queries/useBlogs";
import { formatDate } from "../utils/formatDate";

const Blog: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = searchParams.get("page")
    ? Number(searchParams.get("page"))
    : 1;

  const { isLoading, blogs, error, totalPages } = useBlogs(
    BLOG_PAGE_SIZE,
    currentPage
  );

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    setSearchParams({ page: String(page) });
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <Box sx={{ mt: 15, pb: { xs: 8, sm: 10 } }}>
      <Typography variant="h1" sx={{ my: 5 }}>
        Blog
      </Typography>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
          gap: 4,
          mb: { xs: 5, md: 10 },
        }}
      >
        {blogs?.map(({ id, title, createdAt, summary, image }) => {
          const formattedDate = formatDate(createdAt);
          return (
            <BlogCard
              blogId={id}
              title={title}
              createdAt={formattedDate}
              summary={summary}
              image={image}
              key={id}
            />
          );
        })}
      </Box>

      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        onChange={handlePageChange}
      />
    </Box>
  );
};

export default Blog;
