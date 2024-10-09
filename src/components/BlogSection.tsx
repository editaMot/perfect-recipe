import { Box } from "@mui/material";
import { RoutePages } from "../routes/RoutePages";
import { useBlogs } from "../services/queries/useBlogs";
import { formatDate } from "../utils/formatDate";
import BlogCard from "./BlogCard";
import Section from "./Section";

const BlogSection: React.FC = () => {
  const BLOG_SECTION_SIZE = 2;
  const { isLoading, blogs, error } = useBlogs(BLOG_SECTION_SIZE, 1);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <Section title="Blog" navigateTo={RoutePages.Blog}>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, 1fr)",
          },
          gap: { xs: 2, sm: 3, lg: 4 },
        }}
      >
        {blogs?.map(({ id, title, image, createdAt, summary }) => (
          <BlogCard
            key={id}
            blogId={id}
            title={title}
            image={image}
            createdAt={formatDate(createdAt)}
            summary={summary}
          />
        ))}
      </Box>
    </Section>
  );
};

export default BlogSection;
