import { Ingredient, Time } from "./recipeFormDataTypes";

export interface ValidationRules<T = string | number> {
  required?: boolean | string;
  maxLength?: { value: number; message: string };
  minLength?: { value: number; message: string };
  pattern?: { value: RegExp; message: string };
  validate?: (value: T | Ingredient | Ingredient[] | Time) => boolean | string;
}
