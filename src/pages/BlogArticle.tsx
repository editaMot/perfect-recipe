import { Box, Button, Typography } from "@mui/material";
import { useBlog } from "../services/queries/useBlog";
import { formatDate } from "../utils/formatDate";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";

const BlogArticle: React.FC = () => {
  const { isLoading, blog, error } = useBlog();
  const navigate = useNavigate();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!blog) return <Typography>No blog found</Typography>;

  const { title, image, fullArticle, createdAt } = blog;

  const paragraphs =
    fullArticle
      ?.replace(/\\n/g, "\n")
      .split("\n")
      .map((string) => string.replace(/\\n/g, "")) || [];

  return (
    <Box sx={{ my: { xs: 10, sm: 15, md: 17 } }}>
      <Button
        variant="text"
        startIcon={<ArrowBackIcon />}
        sx={{ mb: 1 }}
        onClick={() => navigate(-1)}
      >
        Go back
      </Button>
      <Typography variant="h1">{title}</Typography>
      <Typography sx={{ color: "secondary.main", mb: { xs: 3, md: 5 } }}>
        {formatDate(createdAt)}
      </Typography>
      <Box
        component="img"
        src={image}
        alt={title}
        sx={{
          aspectRatio: 6 / 4,
          width: "100%",
          mb: 3,
        }}
      />
      {paragraphs.map((paragraph, index) => (
        <Typography variant="body1" key={index} sx={{ mb: 2 }}>
          {paragraph}
        </Typography>
      ))}
    </Box>
  );
};

export default BlogArticle;
