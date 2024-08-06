import bg from "@assets/bg.svg";
import { Box } from "@mui/material";
import HeroContent from "./HeroContent";
import HeroImg from "./HeroImg";

const Hero: React.FC = () => (
  <Box
    component="section"
    sx={{
      display: "flex",
      flexDirection: { xs: "column", md: "row" },
      gap: 2,
      pt: { xs: 15, md: 20, lg: 25, xl: 30 },
      pb: 10,
      backgroundImage: `url(${bg})`,
      backgroundSize: "contain",
      backgroundPosition: "top right",
      backgroundRepeat: "no-repeat",
      zIndex: -1,
    }}
  >
    <HeroContent />
    <HeroImg />
  </Box>
);

export default Hero;
