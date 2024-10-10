import { Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { RoutePages } from "../routes/RoutePages";

interface CategoryCardProps {
  categoryName: string;
  categoryImage: string;
}

const CategoryCard: React.FC<CategoryCardProps> = ({
  categoryName,
  categoryImage,
}) => {
  const navigate = useNavigate();

  const handleCategoryClick = () => {
    navigate({
      pathname: RoutePages.Recipes,
      search: `?category=${categoryName}`,
    });
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: { xs: 1, sm: 2 },
        alignItems: "center",
        textAlign: "center",
        cursor: "pointer",
      }}
      onClick={handleCategoryClick}
    >
      <Box
        sx={{
          width: { xs: 100, sm: 120, md: 150 },
          height: { xs: 100, sm: 120, md: 150 },
          borderRadius: "50%",
          backgroundImage: `url(${categoryImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />
      <Typography>{categoryName} recipes</Typography>
    </Box>
  );
};

export default CategoryCard;
