import { Box, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import CommentsList from "../components/Comment/CommentsList";
import List from "../components/List";
import Newsletter from "../components/Newsletter";
import NutritionInformation from "../components/NutritionInformation";
import RateRecipe from "../components/RateRecipe";
import RecipeHeader from "../components/Recipe/RecipeHeader";
import RecipeInfo from "../components/Recipe/RecipeInfo";
import { useComments } from "../services/queries/useComments";
import { useRecipe } from "../services/queries/useRecipe";
import RecipesSection from "../components/Recipe/RecipesSection";
import { useGetRandomRecipes } from "../hooks/useGetRandomRecipes";

const Recipe: React.FC = () => {
  const DISPLAY_SIZE = 6;
  const { recipeId } = useParams<{ recipeId: string }>();
  const { isLoading, recipe, error } = useRecipe();
  const {
    isLoading: commentsLoading,
    comments,
    error: commentsError,
  } = useComments(recipeId || "");

  const {
    isLoading: isLoadingReandomRecipes,
    error: errorLoadingRandomRecipes,
    randomRecipes = [],
  } = useGetRandomRecipes(null, DISPLAY_SIZE);

  if (isLoading || commentsLoading || isLoadingReandomRecipes)
    return <p>Loading...</p>;
  if (error || commentsError || errorLoadingRandomRecipes)
    return <p>Error: {error}</p>;
  if (!recipe) return <Typography>No recipe found</Typography>;

  const {
    id,
    title,
    author,
    createdAt,
    image,
    description,
    ingredients,
    instructions,
    cookTime,
    preparationTime,
    servings,
    nutritionInformation,
  } = recipe;

  return (
    <Box sx={{ mt: 15, mb: 10 }}>
      <RecipeHeader
        title={title}
        author={author}
        recipeId={id}
        createdAt={createdAt}
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          justifyContent: "space-between",
          gap: { xs: 3, md: 4, lg: 6, xl: 8 },
          mt: 3,
        }}
      >
        <Box sx={{ width: { xs: "100%", md: "70%" } }}>
          <Box
            component="img"
            src={image}
            alt={title}
            sx={{
              aspectRatio: 6 / 4,
              width: "100%",
            }}
          />
          <RecipeInfo
            cookTime={cookTime}
            preparationTime={preparationTime}
            servings={servings}
          />
          <Typography sx={{ my: 3 }}>{description}</Typography>
          <List list={ingredients} title="Ingredients:" icon />
          <List list={instructions} title="Instruction:" />

          <CommentsList comments={comments} />
          {recipeId && <RateRecipe recipeId={recipeId} />}
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 4,
          }}
        >
          <NutritionInformation nutritionInformation={nutritionInformation} />
          <Box
            sx={{
              backgroundColor: "background.accent",
              py: 7,
              px: 3,
              borderRadius: 1,
            }}
          >
            <Newsletter
              flexDirection="column"
              heading="Stay connected"
              details="For the latest delicious recipes"
            />
          </Box>
        </Box>
      </Box>
      <RecipesSection
        title="You might like this"
        recipes={randomRecipes}
        withBtn={false}
      />
    </Box>
  );
};

export default Recipe;
