import { Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { RoutePages } from "../../routes/RoutePages";

interface AuthButtonsProps {
  flexDirection?: "row" | "column";
  hidden?: boolean;
}

const AuthButtons = ({ flexDirection = "row", hidden }: AuthButtonsProps) => {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        display: { xs: hidden ? "none" : "flex", md: "flex" },
        flexDirection: flexDirection,
        gap: 2,
      }}
    >
      <Button
        onClick={() => navigate(RoutePages.Login)}
        variant="contained"
        sx={{
          backgroundColor: "background.lightGrey",
          "&:hover": {
            backgroundColor: "secondary.light",
          },
          color: "secondary.dark",
        }}
      >
        Login
      </Button>
      <Button
        onClick={() => navigate(RoutePages.Signup)}
        variant="contained"
        sx={{
          backgroundColor: "primary.light",
        }}
      >
        Sign Up
      </Button>
    </Box>
  );
};

export default AuthButtons;
