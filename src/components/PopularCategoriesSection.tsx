import { Box, Button, Typography, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { RoutePages } from "../routes/RoutePages";
import {
  CategoryWithImage,
  getUniqueCategories,
} from "../services/firestoreServices";
import CategoryCard from "./CategoryCard";

const PopularCategoriesSection: React.FC = () => {
  const [categories, setCategories] = useState<CategoryWithImage[]>([]);
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categories = await getUniqueCategories("recipes");
        setCategories(categories);
      } catch (e) {
        throw new Error("Failed to fetch categories");
      }
    };
    fetchCategories();
  }, []);

  const categoriesToShow = useMemo(
    () =>
      isMobile
        ? categories.slice(0, 4)
        : isTablet
        ? categories.slice(0, 6)
        : categories.slice(0, 8),
    [categories, isMobile, isTablet]
  );

  return (
    <Box sx={{ my: { xs: 6, sm: 8, md: 10 } }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          mb: 6,
        }}
      >
        <Typography variant="h3" sx={{ fontWeight: "bold" }}>
          Popular Categories
        </Typography>
        <Button
          onClick={() => navigate(RoutePages.Recipes)}
          sx={{ display: { xs: "none", sm: "block" } }}
        >
          View More
        </Button>
      </Box>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr 1fr",
            sm: "repeat(3, 1fr)",
            md: "repeat(4, 1fr)",
          },
          gridTemplateRows: "1fr 1fr",
          rowGap: { xs: 4, md: 6 },
        }}
      >
        {categoriesToShow.map(({ name, imageUrl }) => (
          <CategoryCard
            categoryName={name}
            categoryImage={imageUrl}
            key={name}
          />
        ))}
      </Box>
    </Box>
  );
};

export default PopularCategoriesSection;
