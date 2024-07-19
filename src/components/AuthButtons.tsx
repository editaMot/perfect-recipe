import { Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

type AuthButtonsProps = {
  flexDirection?: "row" | "column";
  hidden?: boolean;
};

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
        onClick={() => navigate("/login")}
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
        onClick={() => navigate("/signup")}
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
