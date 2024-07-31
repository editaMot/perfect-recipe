import { Avatar, Box, Card, Typography } from "@mui/material";
import { User } from "../types/UserTypes";
import Rating from "./Rating";

interface ReviewProps {
  author: User;
  comment: string;
  recipeId: string;
}

const Review: React.FC<ReviewProps> = ({ author, comment, recipeId }) => (
  <Card
    sx={{
      display: "flex",
      flexDirection: "column",
      backgroundColor: "background.default",
      p: 2,
      width: "fit-content",
      overflow: "visible",
    }}
  >
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        gap: { xs: 1.5, lg: 2 },
        mb: 1,
      }}
    >
      <Avatar
        src={author.image}
        sx={{
          width: { xs: 70, lg: 80 },
          height: { xs: 70, lg: 80 },
          mt: -4,
          boxShadow: 3,
        }}
      />
      <Box>
        <Typography
          sx={{
            fontSize: { xs: "16px", md: "20px" },
          }}
        >
          {author.name}
        </Typography>
        <Rating readOnly recipeId={recipeId} />
      </Box>
    </Box>
    <Typography sx={{ fontSize: { md: "14px", lg: "16px" }, maxWidth: 300 }}>
      {comment}
    </Typography>
  </Card>
);

export default Review;
