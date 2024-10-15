import { useEffect, useState } from "react";
import BlogSection from "../components/BlogSection";
import Hero from "../components/Hero/Hero";
import NewsletterSection from "../components/NewsletterSection";
import Partners from "../components/Partners";
import PopularCategoriesSection from "../components/PopularCategoriesSection";
import RecipeSharingCard from "../components/Recipe/RecipeSharingCard";
import RecipesSection from "../components/Recipe/RecipesSection";
import { useGetRandomRecipes } from "../hooks/useGetRandomRecipes";
import { getDocumentById } from "../services/firestoreServices";
import { useBookmarkedRecipes } from "../services/queries/useBookmarkedRecipes";
import { Recipe } from "../types/documentTypes";
import { getTrendingRecipesByBookmarks } from "../utils/getTrendingRecipesByBookmarks";

const Home: React.FC = () => {
  const DISPLAY_SIZE = 6;

  const {
    isLoading,
    error,
    randomRecipes = [],
  } = useGetRandomRecipes(null, DISPLAY_SIZE);

  const {
    isLoading: isLoadingBookmarkedRecipes,
    error: bookmarkedRecipesError,
    bookmarkedRecipes = [],
  } = useBookmarkedRecipes();
  const [trendingRecipes, setTrendingRecipes] = useState<Recipe[]>([]);

  const fetchTrendingRecipes = async () => {
    try {
      const trendingRecipeIds = getTrendingRecipesByBookmarks(
        bookmarkedRecipes || []
      );

      const trendingRecipesData = await Promise.all(
        trendingRecipeIds.map((recipeId) =>
          getDocumentById<Recipe>("recipes", recipeId)
        )
      );

      const validTrendingRecipes = trendingRecipesData.reduce<Recipe[]>(
        (acc, recipe) => {
          if (recipe !== null) {
            acc.push(recipe);
          }
          return acc;
        },
        []
      );

      setTrendingRecipes(validTrendingRecipes);
    } catch (e) {
      console.error("Error fetching trending recipes");
    }
  };

  useEffect(() => {
    if (bookmarkedRecipes) {
      fetchTrendingRecipes();
    }
  }, [bookmarkedRecipes]);

  if (isLoading || isLoadingBookmarkedRecipes) return <p>Loading...</p>;
  if (error || bookmarkedRecipesError) return <p>Error: {error}</p>;

  return (
    <>
      <Hero />
      <RecipeSharingCard />
      <RecipesSection title="Trending Recipes" recipes={trendingRecipes} />
      <RecipesSection title="Explore Recipes" recipes={randomRecipes} />
      <BlogSection />
      <NewsletterSection />
      <PopularCategoriesSection />
      <Partners />
    </>
  );
};

export default Home;
