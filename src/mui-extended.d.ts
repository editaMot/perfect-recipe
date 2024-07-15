import {
  Palette as MuiPallete,
  PaletteOptions as MuiPaletteOptions,
} from "@mui/material/styles/createPalette";

declare module "@mui/material/styles/createPalette" {
  interface Palette extends MuiPallete {
    accent: { main: string };
    lightGrey: { main: string };
  }

  interface PaletteOptions extends MuiPaletteOptions {
    accent?: { main: string };
    lightGrey?: { main: string };
  }

  interface TypeBackground {
    accent: string;
    lightGrey: string;
  }
}
