import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import { Box, Divider, Typography } from "@mui/material";
import { User as UserType } from "../types/UserTypes";
import { formatDate } from "../utils/formatDate";
import Bookmark from "./Bookmark";
import ShareButton from "./Buttons/ShareButton";
import Rating from "./Rating";
import User from "./User";

interface RecipeHeaderProps {
  author: UserType;
  createdAt: string;
  recipeId: string;
  title: string;
}

const RecipeHeader: React.FC<RecipeHeaderProps> = ({
  author,
  recipeId,
  createdAt,
  title,
}) => (
  <Box>
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 1,
        width: "100%",
        mb: 2,
      }}
    >
      <Typography variant="h1">{title}</Typography>
      <Box sx={{ display: "flex", gap: 1 }}>
        <Bookmark recipeId={recipeId} />
        <ShareButton title="Share this recipe" />
      </Box>
    </Box>
    <Box
      sx={{
        display: "flex",
        gap: 2,
        alignItems: "center",
        flexWrap: "wrap",
      }}
    >
      <User name={author.name} image={author.image} />
      <Typography
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 0.5,
          fontSize: { md: "16px", lg: "18px" },
        }}
      >
        {<CalendarMonthOutlinedIcon />}
        {formatDate(createdAt)}
      </Typography>
      <Rating recipeId={recipeId} readOnly />
    </Box>

    <Divider sx={{ marginTop: 2, display: { xs: "none", sm: "block" } }} />
  </Box>
);

export default RecipeHeader;
