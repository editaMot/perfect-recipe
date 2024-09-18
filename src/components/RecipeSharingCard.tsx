import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import shareRecipe from "../assets/share-recipe.webp";
import { RoutePages } from "../routes/RoutePages";

const RecipeSharingCard: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        alignItems: "center",
        gap: { xs: 3, md: 5 },
        mb: { xs: 12, lg: 20 },
        mt: { xs: 2, lg: 7 },
      }}
    >
      <Box
        sx={{
          width: { xs: "100%", md: "80%" },
          aspectRatio: { xs: 5 / 3, sm: 2 / 3, md: 2 / 2 },
          backgroundImage: `url(${shareRecipe})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          borderRadius: 1,
        }}
      />

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: { xs: 3, sm: 5 },
          textAlign: "center",
          alignItems: "center",
        }}
      >
        <Typography variant="h2" sx={{ fontWeight: "bold" }}>
          Share Your{" "}
          <Typography
            component="span"
            variant="h2"
            sx={{
              color: "primary.light",
              fontWeight: "bold",
            }}
          >
            {" "}
            Recipes{" "}
          </Typography>
        </Typography>
        <Typography>
          Cooked up something delicious? Don’t keep it to yourself — upload your
          recipe and let others enjoy it too!
        </Typography>
        <Button
          variant="contained"
          size="large"
          onClick={() => navigate(RoutePages.NewRecipe)}
          sx={{ backgroundColor: "primary.light" }}
        >
          Create New Recipe
        </Button>
      </Box>
    </Box>
  );
};

export default RecipeSharingCard;
