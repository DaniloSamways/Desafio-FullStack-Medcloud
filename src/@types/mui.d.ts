declare module "@mui/material/styles" {
  interface Palette {
    status: {
      danger: string;
    };
  }
  // allow configuration using `createPalette`
  interface PaletteOptions {
    status?: {
      danger?: string;
    };
  }
}
