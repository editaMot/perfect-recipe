import { Image } from "../components/ImageInput/ImageInput";
import { RecipeFormData } from "../types/recipeFormDataTypes";

export const emailPattern = {
  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  message: "Please enter a valid email address",
};

export const recipeFormValidationPattern = {
  title: {
    required: "Recipe Title is required",
    maxLength: {
      value: 50,
      message: "Title cannot exceed 50 characters",
    },
  },
  images: {
    validate: (value: Image[]) =>
      value.length > 0 || "At least one image is required",
  },
  description: {
    required: "Description is required",
    maxLength: {
      value: 100,
      message: "Description cannot exceed 100 characters",
    },
  },
  ingredients: {
    validate: (value: RecipeFormData["ingredients"]) =>
      value.length > 0 || "At least one ingredient is required",
  },
  instructions: {
    validate: (value: RecipeFormData["instructions"]) =>
      value.length > 0 || "At least one step is required",
  },
  servings: {
    required: "Number of servings is required",
    min: {
      value: 1,
      message: "Serving should be at least 1",
    },
    validate: (value: string | number | unknown) => {
      if (typeof value !== "number" && typeof value !== "string") {
        return true;
      }
      const numberValue = Number(value);
      if (isNaN(numberValue)) return "Serving must be a number";
      return true;
    },
  },
  hours: {
    required: "Hours are required",
    min: {
      value: 0,
      message: "Hours cannot be negative",
    },
    validate: (value: string | number | unknown) => {
      if (typeof value !== "number" && typeof value !== "string") {
        return true;
      }
      const numberValue = Number(value);
      if (isNaN(numberValue)) return "Hours must be a number";
      if (numberValue < 0) return "Hours cannot be negative";
      return true;
    },
  },
  minutes: {
    required: "Minutes are required",
    min: {
      value: 0,
      message: "Minutes cannot be negative",
    },
    max: {
      value: 59,
      message: "Minutes must be between 0 and 59",
    },
    validate: (value: string | number | unknown) => {
      if (typeof value !== "number" && typeof value !== "string") {
        return true;
      }
      const numberValue = Number(value);
      if (isNaN(numberValue)) return "Minutes must be a number";
      if (numberValue < 0 || numberValue > 59)
        return "Minutes must be between 0 and 59";
      return true;
    },
  },
  cuisine: {
    required: "Cuisine is required",
  },
  categories: {
    required: "At least one category is required",
  },
};
