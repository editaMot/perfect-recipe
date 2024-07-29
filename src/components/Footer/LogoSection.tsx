import { Box, Typography } from "@mui/material";
import Logo from "../Logo";

const LogoSection: React.FC = () => (
  <Box
    sx={{
      maxWidth: { sm: "40%", md: "50%", lg: "30%", xl: "40%" },
      display: "flex",
      flexDirection: "column",
      gap: 2,
    }}
  >
    <Logo />
    <Typography variant="body1">
      Welcome to our culinary haven, where delicious recipes and captivating
      food stories come to life! Let's cook, share, and savor the joys of food
      together!
    </Typography>
  </Box>
);

export default LogoSection;
