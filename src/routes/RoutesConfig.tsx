import { lazy } from "react";
import { Route, Routes } from "react-router-dom";
import { RoutePages } from "./RoutePages";
import Layout from "../components/Layout";

const Home = lazy(() => import("../pages/Home"));
const Blog = lazy(() => import("../pages/Blog"));
const BlogArticle = lazy(() => import("../pages/BlogArticle"));
const Login = lazy(() => import("../pages/Login"));
const NewRecipe = lazy(() => import("../pages/NewRecipe"));
const Recipe = lazy(() => import("../pages/Recipe"));
const Recipes = lazy(() => import("../pages/Recipes"));
const Signup = lazy(() => import("../pages/Signup"));
const Contact = lazy(() => import("../pages/Contact"));
const Terms = lazy(() => import("../pages/Terms"));
const Privacy = lazy(() => import("../pages/Privacy"));
const PageNotFound = lazy(() => import("../pages/PageNotFound"));

const RoutesConfig = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path={RoutePages.Home} element={<Home />} />
        <Route path={RoutePages.Blog} element={<Blog />} />
        <Route path={RoutePages.BlogArticle} element={<BlogArticle />} />
        <Route path={RoutePages.Login} element={<Login />} />
        <Route path={RoutePages.Recipes} element={<Recipes />} />
        <Route path={RoutePages.Recipe} element={<Recipe />} />
        <Route path={RoutePages.NewRecipe} element={<NewRecipe />} />
        <Route path={RoutePages.Signup} element={<Signup />} />
        <Route path={RoutePages.Contact} element={<Contact />} />
        <Route path={RoutePages.Terms} element={<Terms />} />
        <Route path={RoutePages.Privacy} element={<Privacy />} />
        <Route path={RoutePages.PageNotFound} element={<PageNotFound />} />
      </Route>
    </Routes>
  );
};

export default RoutesConfig;
