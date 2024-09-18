import { Box, List, ListItem, ListItemText, Typography } from "@mui/material";
import {
  nutrientsType,
  NutritionInformation as NutritionInformationTypes,
} from "../types/documentTypes";
import { capitalizeText } from "../utils/capitalizeText";
import { getNutrientUnit } from "../utils/getNutrientUnit";

const nutrientOrder: nutrientsType[] = [
  "calories",
  "carbohydrates",
  "protein",
  "fat",
  "fiber",
  "iron",
  "calcium",
  "sodium",
  "potassium",
  "cholesterol",
];

interface NutritionInformationProps {
  nutritionInformation: NutritionInformationTypes;
}

const NutritionInformation: React.FC<NutritionInformationProps> = ({
  nutritionInformation,
}) => (
  <Box sx={{ backgroundColor: "background.lightGrey", p: 3, borderRadius: 1 }}>
    <Typography variant="h6" sx={{ fontWeight: "bold" }}>
      Nutrition Facts
    </Typography>
    <List>
      {nutrientOrder.map((key, index) => {
        const value =
          nutritionInformation[key as keyof NutritionInformationTypes];
        return value !== undefined ? (
          <ListItem key={index} divider disableGutters>
            <ListItemText primary={capitalizeText(key)} />
            <Typography>
              {value} {getNutrientUnit(key)}
            </Typography>
          </ListItem>
        ) : null;
      })}
    </List>
  </Box>
);

export default NutritionInformation;
