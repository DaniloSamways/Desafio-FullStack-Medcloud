import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#3661b2",
    },
    secondary: {
      main: "#13a8c2",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          color: "white",
          borderRadius: 8,
        },
      },
    },
  },
});
