import { nutrientsType } from "../types/documentTypes";

export const nutrientsUnits: Record<nutrientsType, string> = {
  calories: "kcal",
  fat: "g",
  carbohydrates: "g",
  fiber: "g",
  protein: "g",
  cholesterol: "mg",
  sodium: "mg",
  potassium: "mg",
  calcium: "mg",
  iron: "mg",
};

export const getNutrientUnit = (key: nutrientsType): string =>
  nutrientsUnits[key];
