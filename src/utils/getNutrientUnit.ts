export const getNutrientUnit = (key: string) => {
  switch (key) {
    case "fat":
    case "carbohydrates":
    case "fiber":
    case "protein":
      return "g";
    case "cholesterol":
    case "sodium":
    case "potassium":
    case "calcium":
    case "iron":
      return "mg";
    default:
      return "kcal";
  }
};
