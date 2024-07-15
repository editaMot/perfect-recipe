import { createTheme, responsiveFontSizes } from "@mui/material";

const baseTheme = createTheme({
  palette: {
    primary: {
      main: "#974e44",
      light: "#b55d51",
      dark: "#793e37",
      contrastText: "#fff",
    },
    secondary: {
      main: "#878787",
      light: "#a5a5a5",
      dark: "#4c4c4c",
      contrastText: "#fff",
    },
    background: {
      default: "#fff",
      lightGrey: "#ebebeb",
      accent: "#fff0ed",
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
  shape: {
    borderRadius: 8,
  },
});

let theme = createTheme({
  ...baseTheme,
  typography: {
    h1: {
      fontSize: 56,
      fontWeight: 700,
    },
    h2: {
      fontSize: 48,
      fontWeight: 500,
    },
    h3: {
      fontSize: 40,
      fontWeight: 500,
    },
    h4: {
      fontSize: 32,
      fontWeight: 500,
    },
    h5: {
      fontSize: 24,
      fontWeight: 500,
    },
    h6: {
      fontSize: 20,
      fontWeight: 500,
    },
    body1: {
      fontSize: 14,
      fontWeight: 400,
      [baseTheme.breakpoints.up("sm")]: {
        fontSize: 16,
      },
      [baseTheme.breakpoints.up("md")]: {
        fontSize: 18,
      },
      [baseTheme.breakpoints.up("lg")]: {
        fontSize: 20,
      },
      [baseTheme.breakpoints.up("xl")]: {
        fontSize: 24,
      },
    },
    body2: {
      fontSize: 14,
      fontWeight: 500,
      [baseTheme.breakpoints.up("sm")]: {
        fontSize: 16,
      },
      [baseTheme.breakpoints.up("md")]: {
        fontSize: 18,
      },
      [baseTheme.breakpoints.up("lg")]: {
        fontSize: 20,
      },
      [baseTheme.breakpoints.up("xl")]: {
        fontSize: 24,
      },
    },
  },
});

theme = responsiveFontSizes(theme);

export default theme;
