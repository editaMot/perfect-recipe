import axios from "axios";
import { NutritionInformation } from "../types/documentTypes";

export const fetchNutritionData = async (
  ingredients: string[],
  servings: number
): Promise<NutritionInformation> => {
  const appId = import.meta.env.VITE_APP_EDAMAM_APP_ID;
  const appKey = import.meta.env.VITE_APP_EDAMAM_APP_KEY;

  const requestBody = {
    ingr: ingredients,
  };

  try {
    const response = await axios.post(
      `https://api.edamam.com/api/nutrition-details?app_id=${appId}&app_key=${appKey}`,
      requestBody
    );

    const {
      calories,
      totalNutrients: { PROCNT, FAT, CHOCDF, FIBTG, CHOLE, NA, CA, FE, K },
    } = response.data;

    const roundToOneDecimal = (num: number) =>
      parseFloat(num.toFixed(1)) / servings;

    const nutritionInformation: NutritionInformation = {
      calories: roundToOneDecimal(calories),
      protein: roundToOneDecimal(PROCNT.quantity),
      fat: roundToOneDecimal(FAT.quantity),
      carbohydrates: roundToOneDecimal(CHOCDF.quantity),
      fiber: roundToOneDecimal(FIBTG.quantity),
      cholesterol: roundToOneDecimal(CHOLE.quantity),
      sodium: roundToOneDecimal(NA.quantity),
      calcium: roundToOneDecimal(CA.quantity),
      iron: roundToOneDecimal(FE.quantity),
      potassium: roundToOneDecimal(K.quantity),
    };

    return nutritionInformation;
  } catch (error) {
    throw new Error("There was an error getting nutrition information");
  }
};
