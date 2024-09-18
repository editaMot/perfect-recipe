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

export interface NutritionInformation {
  calories: number;
  protein: number;
  fat: number;
  carbohydrates: number;
  fiber: number;
  cholesterol: number;
  sodium: number;
  calcium: number;
  iron: number;
  potassium: number;
}

export type nutrientsType =
  | "fat"
  | "carbohydrates"
  | "fiber"
  | "protein"
  | "cholesterol"
  | "sodium"
  | "potassium"
  | "calcium"
  | "iron"
  | "calories";

export interface Blog {
  id: string;
  title: string;
  image: string;
  createdAt: Timestamp;
  summary: string;
  fullArticle: string;
}
