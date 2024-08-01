import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { RoutePages } from "../../routes/RoutePages";
import AuthButtons from "../AuthButtons";

const HeroContent: React.FC = () => {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        width: { xs: "80%", sm: "60%", md: "45%" },
        display: "flex",
        flexDirection: "column",
        alignSelf: "center",
        alignItems: { xs: "center", md: "flex-start" },
        textAlign: { xs: "center", md: "left" },
        gap: 4,
      }}
    >
      <Typography variant="h1">
        Your Daily Dish A
        <Typography
          component="span"
          variant="h1"
          sx={{
            color: "primary.light",
          }}
        >
          {" "}
          Food{" "}
        </Typography>
        Journey
      </Typography>
      <Typography
        sx={{
          color: "secondary.main",
        }}
      >
        Welcome to our culinary haven, where delicious recipes and captivating
        food stories come to life! Let's cook, share, and savor the joys of food
        together!
      </Typography>

      <Box sx={{ display: { xs: "block", md: "none" } }}>
        <AuthButtons />
      </Box>
      <Box sx={{ display: { xs: "none", md: "block" } }}>
        <Button
          variant="contained"
          sx={{ px: 5, py: 1, backgroundColor: "primary.light", mb: 1 }}
          onClick={() => navigate(RoutePages.Signup)}
        >
          Sign Up
        </Button>
        <Typography
          sx={{
            color: "secondary.main",
            fontSize: { md: "16px" },
          }}
        >
          Do you have an account?{" "}
          <Typography
            component="span"
            sx={{
              color: "primary.light",
              cursor: "pointer",
              fontSize: { md: "16px" },
            }}
            onClick={() => navigate(RoutePages.Login)}
          >
            Log in
          </Typography>
        </Typography>
      </Box>
    </Box>
  );
};

export default HeroContent;
