import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.css";
import { App } from "./components";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";

const defaultTheme = createTheme({
  direction: "rtl",
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          dir: "rtl",
          overflow: "hidden",
        },
      },
    },
  },
  palette: {
    background: {
      default: "whitesmoke",
    },
  },
  typography: {
    allVariants: { textAlign: "start" },
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
