import { Box, List, ListItem, ListItemText, Typography } from "@mui/material";
import { NutritionInformation as NutritionInformationTypes } from "../types/documentTypes";
import { getNutrientUnit } from "../utils/getNutrientUnit";

const nutrientOrder = [
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
            <ListItemText
              primary={key.charAt(0).toUpperCase() + key.slice(1)}
            />
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
