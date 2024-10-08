import StarIcon from "@mui/icons-material/Star";
import { Rating as RatingStars } from "@mui/material";
import { SyntheticEvent } from "react";
import { useRatedRecipe } from "../services/queries/useRatedRecipe";
import { RatedRecipe } from "../types/documentTypes";

interface RatingProps {
  recipeId: string;
  readOnly?: boolean;
  userRating?: number;
  ratingChangeHandler?: (
    e: SyntheticEvent<Element, Event>,
    value: number | null
  ) => void;
  size?: "small" | "medium" | "large";
}

const Rating: React.FC<RatingProps> = ({
  readOnly = false,
  recipeId,
  userRating = 0,
  ratingChangeHandler,
  size = "small",
}) => {
  const { ratedRecipe } = useRatedRecipe("recipeId", recipeId);

  const calculateAverageRating = (recipe: RatedRecipe[]): number => {
    if (!recipe || recipe.length === 0) return 0;

    const totalRecipeRating = recipe.reduce(
      (sum, recipe) => sum + recipe.rating,
      0
    );

    const averageRating = totalRecipeRating / recipe.length;

    return averageRating;
  };

  const averageRating = ratedRecipe ? calculateAverageRating(ratedRecipe) : 0;

  return (
    <RatingStars
      size={size}
      readOnly={readOnly}
      defaultValue={0}
      value={readOnly ? averageRating : userRating}
      precision={0.5}
      onChange={ratingChangeHandler}
      emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
      sx={{
        "& .MuiRating-iconFilled": {
          color: "primary.main",
        },
      }}
    />
  );
};

export default Rating;
