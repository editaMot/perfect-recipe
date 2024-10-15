import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Pagination from "../components/Pagination";
import RecipeCard from "../components/Recipe/RecipeCard";
import Tags from "../components/Tags";
import { RECIPES_PAGE_SIZE } from "../constants/constants";
import { getUniqueCategories } from "../services/firestoreServices";
import { useRecipes } from "../services/queries/useRecipes";

const Recipes: React.FC = () => {
  const [activeTags, setActiveTags] = useState<string[]>([]);
  const [allCategories, setAllCategories] = useState<string[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = searchParams.get("page")
    ? Number(searchParams.get("page"))
    : 1;
  const selectedCategory = searchParams.get("category") || "";

  const { isLoading, recipes, error, totalPages } = useRecipes(
    RECIPES_PAGE_SIZE,
    currentPage,
    "categories",
    activeTags
  );

  useEffect(() => {
    if (selectedCategory) {
      setActiveTags([selectedCategory]);
    }
  }, [selectedCategory]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categories = await getUniqueCategories("recipes");
        const categoryNames = categories.map((category) => category.name);
        setAllCategories(categoryNames);
      } catch (e) {
        console.error("Failed to fetch categories", e);
      }
    };
    fetchCategories();
  }, []);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    setSearchParams({ page: String(page) });
  };

  const handleActiveTags = (tag: string, action: "add" | "remove") => {
    setActiveTags((prev) => {
      if (action === "add") {
        return !prev.includes(tag) ? [...prev, tag] : prev;
      } else if (action === "remove") {
        return prev.filter((activeTag) => activeTag !== tag);
      }
      return prev;
    });
    setSearchParams({ page: String(1) });
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <Box sx={{ mt: { xs: 10, sm: 12, lg: 15 }, mb: { xs: 6, lg: 8 } }}>
      <Typography variant="h1" sx={{ mb: { xs: 3, sm: 4, lg: 5 } }}>
        Recipes
      </Typography>
      <Tags
        tags={allCategories}
        activeTags={activeTags}
        handleActiveTags={handleActiveTags}
      />
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
