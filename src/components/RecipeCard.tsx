import { Box, Card, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { RoutePages } from "../routes/RoutePages";
import { User as UserType } from "../types/UserTypes";
import Bookmark from "./Bookmark";
import Calories from "./Calories";
import Rating from "./Rating";
import User from "./User";

interface RecipeCardProps {
  recipeId: string;
  title: string;
  calories: number;
  image: string;
  author: UserType;
}

const RecipeCard: React.FC<RecipeCardProps> = ({
  recipeId,
  title,
  image,
  calories,
  author,
}) => {
  const navigate = useNavigate();

  const handleTitleClick = (): void =>
    navigate(RoutePages.Recipe.replace(":recipeId", recipeId));

  return (
    <Card
      sx={{
        borderColor: "secondary.light",
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      <Box
        sx={{
          aspectRatio: 9 / 6,
          p: 1,
          display: "flex",
          alignItems: "baseline",
          justifyContent: "flex-end",
          backgroundImage: `url(${image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <Bookmark recipeId={recipeId} />
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          gap: 1,
          px: 2,
          py: 1.5,
          flexGrow: 1,
        }}
      >
        <Rating recipeId={recipeId} readOnly />
        <Typography
          variant="h5"
          onClick={handleTitleClick}
          sx={{
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          {title}
        </Typography>

        <Box
          sx={{
            display: {
              xs: "none",
              md: "flex",
            },
            justifyContent: "space-between",
            mt: 2,
          }}
        >
          <User name={author.name} image={author.image} />
          <Calories calories={calories} />
        </Box>
      </Box>
    </Card>
  );
};

export default RecipeCard;
