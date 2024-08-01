import foodPlate from "@assets/food-plate.png";
import userPhoto from "@assets/sarah.jpg";
import { Box } from "@mui/material";
import React from "react";
import Review from "../Review";

const HeroImg: React.FC = () => (
  <Box
    sx={{
      display: { xs: "none", md: "flex" },
      flexDirection: "column",
      width: "50%",
      alignItems: "center",
    }}
  >
    <Box
      component="img"
      src={foodPlate}
      alt="A plate of food"
      sx={{
        alignSelf: "flex-end",
        mr: { md: 2, lg: 7, xl: 10 },
        width: "auto",
        height: { md: 280, lg: 300 },
      }}
    />
    <Box
      sx={{
        maxWidth: { md: "60%", lg: "55%" },
        mt: -10,
        ml: { md: -15, lg: -20, xl: -25 },
      }}
    >
      <Review
        author={{ name: "Sarah Johnson", image: userPhoto }}
        recipeId="fd4drfgz"
        comment="Wow, this recipe is a flavor explosion in my mouth! Very delicious."
      />
    </Box>
  </Box>
);

export default HeroImg;
