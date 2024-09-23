import { Box } from "@mui/material";
import { RoutePages } from "../../routes/RoutePages";
import { Recipe } from "../../types/documentTypes";
import Section from "../Section";
import RecipeCard from "./RecipeCard";

interface RecipesSectionProps {
  recipes: Recipe[];
  title: string;
  withBtn?: boolean;
}

const RecipesSection: React.FC<RecipesSectionProps> = ({
  recipes,
  title,
  withBtn,
}) => {
  return (
    <Section title={title} navigateTo={RoutePages.Recipes} withBtn={withBtn}>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, 1fr)",
            md: "repeat(3, 1fr)",
          },
          gridTemplateRows: "1fr 1fr",
          gap: { xs: 2, sm: 3, lg: 4 },
        }}
      >
        {recipes.map(({ id, title, author, nutritionInformation, image }) => (
          <RecipeCard
            key={id}
            recipeId={id}
            title={title}
            author={author}
            calories={nutritionInformation.calories}
            image={image}
          />
        ))}
      </Box>
    </Section>
  );
};

export default RecipesSection;
