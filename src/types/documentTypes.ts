import { User } from "./UserTypes";

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

export interface Time {
  hours: number;
  minutes: number;
}

export interface Recipe {
  id: string;
  title: string;
  author: User;
  categories: string[];
  cookTime: Time;
  preparationTime: Time;
  createdAt: string;
  cuisine: string;
  description: string;
  image: string;
  ingredients: string[];
  instructions: string[];
  servings: number;
  nutritionInformation: NutritionInformation;
}
