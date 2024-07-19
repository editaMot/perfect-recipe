import { lazy } from "react";
import { Route, Routes } from "react-router-dom";

const Home = lazy(() => import("../pages/Home"));
const Blog = lazy(() => import("../pages/Blog"));
const Login = lazy(() => import("../pages/Login"));
const NewRecipe = lazy(() => import("../pages/NewRecipe"));
const Recipe = lazy(() => import("../pages/Recipe"));
const Recipes = lazy(() => import("../pages/Recipes"));
const Signup = lazy(() => import("../pages/Signup"));
const PageNotFound = lazy(() => import("../pages/PageNotFound"));

const RoutesConfig = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="blog" element={<Blog />} />
      <Route path="login" element={<Login />} />
      <Route path="recipes" element={<Recipes />} />
      <Route path="recipe/:recipeId" element={<Recipe />} />
      <Route path="new-recipe" element={<NewRecipe />} />
      <Route path="signup" element={<Signup />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

export default RoutesConfig;
