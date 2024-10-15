import { Image } from "../components/ImageInput/ImageInput";

export type RecipeFormFieldNames =
  | "title"
  | "images"
  | "description"
  | "ingredients"
  | "servings"
  | "cookingTime"
  | "prepTime"
  | `ingredients.${number}`
  | `ingredients.${number}.id`
  | `ingredients.${number}.value`
  | `instructions.${number}`
  | `instructions.${number}.id`
  | `instructions.${number}.value`
  | "cookingTime.hours"
  | "cookingTime.minutes"
  | "prepTime.hours"
  | "prepTime.minutes"
  | "cuisine"
  | "categories";

export interface Ingredient {
  id: string;
  value: string;
}

export interface InstructionStep {
  id: string;
  value: string;
}

export interface Time {
  hours: number;
  minutes: number;
}

export interface RecipeFormData {
  title: string;
  description: string;
  images: Image[];
  ingredients: Ingredient[];
  instructions: InstructionStep[];
  servings: number;
  cookingTime: Time;
  prepTime: Time;
  cuisine: string;
  categories: string[];
}

export enum RecipesCategories {
  Appetizer = "Appetizer",
  Barbecue = "Barbecue",
  Beef = "Beef",
  Breakfast = "Breakfast",
  Chicken = "Chicken",
  Dessert = "Dessert",
  Dinner = "Dinner",
  Lunch = "Lunch",
  MainCourse = "Main Course",
  Pizza = "Pizza",
  Pork = "Pork",
  Salad = "Salad",
  Seafood = "Seafood",
  SideDish = "Side Dish",
  Snack = "Snack",
  Soup = "Soup",
  Vegetarian = "Vegetarian",
}

export enum RecipesCuisine {
  American = "American",
  Asian = "Asian",
  Chinese = "Chinese",
  French = "French",
  Indian = "Indian",
  Italian = "Italian",
  Japanese = "Japanese",
  Mediterranean = "Mediterranean",
  Mexican = "Mexican",
  MiddleEastern = "Middle Eastern",
  Thai = "Thai",
  Spanish = "Spanish",
  Caribbean = "Caribbean",
  Korean = "Korean",
  German = "German",
  Russian = "Russian",
}
