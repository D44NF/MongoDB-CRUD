import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#7c5cff",
    },
    secondary: {
      main: "#22d3ee",
    },
    background: {
      default: "#0b0c10",
      paper: "#15171d",
    },
  },
  typography: {
    fontFamily: 'system-ui, "Segoe UI", Roboto, sans-serif',
  },
  shape: {
    borderRadius: 8,
  },
});
