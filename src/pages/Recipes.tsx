import { Box, Typography } from "@mui/material";
import { useSearchParams } from "react-router-dom";
import Pagination from "../components/Pagination";
import RecipeCard from "../components/RecipeCard";
import { RECIPES_PAGE_SIZE } from "../constants/constants";
import { useRecipes } from "../services/queries/useRecipes";

const Recipes: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = searchParams.get("page")
    ? Number(searchParams.get("page"))
    : 1;

  const { isLoading, recipes, error, totalPages } = useRecipes(
    RECIPES_PAGE_SIZE,
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
    <Box sx={{ mt: { xs: 10, sm: 12, lg: 15 }, mb: { xs: 6, lg: 8 } }}>
      <Typography variant="h1" sx={{ mb: { xs: 3, sm: 4, lg: 5 } }}>
        Recipes
      </Typography>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", md: "1fr 1fr 1fr" },
          gap: { xs: 3, lg: 4 },
          mb: { xs: 5, md: 6, lg: 8 },
        }}
      >
        {recipes?.map(({ id, title, author, image, nutritionInformation }) => (
          <RecipeCard
            recipeId={id}
            title={title}
            author={author}
            image={image}
            key={id}
            calories={nutritionInformation.calories}
          />
        ))}
      </Box>
      {totalPages > 1 && (
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onChange={handlePageChange}
        />
      )}
    </Box>
  );
};

export default Recipes;
