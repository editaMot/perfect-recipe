import { NavPages } from "../constants/NavPages";

export const buildPath = (page: NavPages): string => {
  switch (page) {
    case NavPages.AddRecipe:
      return "/new-recipe";
    case NavPages.AboutUs:
      return "/";
    default:
      return `/${page.toLowerCase()}`;
  }
};
