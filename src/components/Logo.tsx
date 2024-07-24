import { Box, Typography } from "@mui/material";
import sponAndKnifeImage from "../assets/spoon&knife.svg";

const Logo = () => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 0.3,
      }}
    >
      <Box
        component="img"
        src={sponAndKnifeImage}
        alt="fork and knife"
        sx={{
          width: {
            xs: 22,
            sm: 25,
          },
        }}
      />
      <Typography
        component="span"
        sx={{
          fontWeight: 600,
          fontSize: {
            xs: 20,
            sm: 24,
          },
        }}
      >
        Perfect
        <Typography
          component="span"
          sx={{
            color: "primary.light",
            fontWeight: 600,
            fontSize: {
              xs: 20,
              sm: 24,
            },
          }}
        >
          Recipe
        </Typography>
      </Typography>
    </Box>
  );
};

export default Logo;
