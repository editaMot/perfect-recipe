import { Box, Card, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

type BlogCardProps = {
  blogId: string;
  createdAt: string;
  title: string;
  summary: string;
  image: string;
};

const BlogCard = ({
  blogId,
  createdAt,
  title,
  summary,
  image,
}: BlogCardProps) => {
  const navigate = useNavigate();
  return (
    <Card
      onClick={() => navigate(`/blog/${blogId}`)}
      sx={{
        cursor: "pointer",
      }}
    >
      <Box
        sx={{
          width: "100%",
          height: { xs: 200, sm: 250, md: 300 },
          backgroundImage: `url(${image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: { xs: 0.5, md: 1 },
          p: { xs: "10px 15px", md: "15px 20px", xl: "20px 30px" },
        }}
      >
        <Typography component="span" sx={{ color: "secondary.main" }}>
          {createdAt}
        </Typography>
        <Typography variant="h5" sx={{ fontWeight: 600 }}>
          {title}
        </Typography>
        <Typography variant="body1" sx={{ color: "secondary.main" }}>
          {summary}
        </Typography>
      </Box>
    </Card>
  );
};

export default BlogCard;
