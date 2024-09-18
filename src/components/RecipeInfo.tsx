import { Box, Divider, Typography } from "@mui/material";
import { Time as TimeType } from "../types/documentTypes";
import PrintButton from "./Buttons/PrintButton";
import Time from "./Time";

interface RecipeInfoProps {
  cookTime: TimeType;
  preparationTime: TimeType;
  servings: number;
}

const RecipeInfo: React.FC<RecipeInfoProps> = ({
  cookTime,
  preparationTime,
  servings,
}) => (
  <Box
    sx={{
      display: "flex",
      gap: { sm: 2, md: 3, lg: 5 },
      my: 3,
      justifyContent: { xs: "center", sm: "flex-start" },
      width: "100%",
    }}
  >
    <Box
      sx={{
        display: "flex",
        gap: 2,
        textAlign: "center",
      }}
    >
      <Time time={preparationTime} title="Prep time" />
      <Divider orientation="vertical" flexItem />
      <Time time={cookTime} title="Cook time" />
      <Divider orientation="vertical" flexItem />
      <Box>
        <Typography sx={{ fontWeight: "bold" }}>Serving</Typography>
        <Typography>{servings} serving</Typography>
      </Box>
    </Box>
    <Box
      sx={{ alignSelf: "center", ml: 3, display: { xs: "none", sm: "block" } }}
    >
      <PrintButton />
    </Box>
  </Box>
);

export default RecipeInfo;
