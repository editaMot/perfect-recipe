import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import { Box, Typography } from "@mui/material";

interface CaloriesProps {
  calories: number;
}

const Calories: React.FC<CaloriesProps> = ({ calories }) => (
  <Box
    sx={{
      display: "flex",
      gap: 0.5,
      border: "1px solid",
      borderColor: "secondary.light",
      borderRadius: "8px",
      px: 1,
      py: 0.5,
      width: "fit-content",
    }}
  >
    <Box
      component="span"
      sx={{ color: "primary.main", display: "flex", alignItems: "center" }}
    >
      <LocalFireDepartmentIcon fontSize="small" />
    </Box>
    <Typography
      sx={{ color: "secondary.light", fontSize: { md: "14px", lg: "18px" } }}
    >
      {calories} cals
    </Typography>
  </Box>
);

export default Calories;
