export type RecipeFormFieldNames =
  | "title"
  | "image"
  | "description"
  | "ingredients"
  | "servings"
  | "cookingTime"
  | "prepTime"
  | `ingredients.${number}`
  | `ingredients.${number}.id`
  | `ingredients.${number}.value`
  | "cookingTime.hours"
  | "cookingTime.minutes"
  | "prepTime.hours"
  | "prepTime.minutes";

export interface Ingredient {
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
  image: string;
  ingredients: Ingredient[];
  servings: number;
  cookingTime: Time;
  prepTime: Time;
}
