import { Timestamp } from "firebase/firestore";

export interface BookmarkedRecipes {
  userId: string;
  recipeId: string;
}

export interface Newsletter {
  email: string;
}

export interface RecipeRating {
  recipeId: string;
  rating: number;
  userId: string;
}

export interface RatedRecipe extends RecipeRating {
  id: string;
}

export interface Blog {
  id: string;
  title: string;
  image: string;
  createdAt: Timestamp;
  summary: string;
  fullArticle: string;
}
