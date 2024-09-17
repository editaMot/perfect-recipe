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
  image: {
    required: "Image URL is required",
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
  servings: {
    required: "Number of servings is required",
    min: {
      value: 1,
      message: "Serving is required",
    },
  },
  cookingTime: {
    hours: {
      validate: (value: number) => value >= 0 || "Hours must be 0 or greater",
    },
    minutes: {
      validate: (value: number) => value >= 0 || "Minutes must be 0 or greater",
    },
  },
  prepTime: {
    hours: {
      validate: (value: number) => value >= 0 || "Hours must be 0 or greater",
    },
    minutes: {
      validate: (value: number) => value >= 0 || "Minutes must be 0 or greater",
    },
  },
};
