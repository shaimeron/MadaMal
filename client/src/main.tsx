import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.css";
import { App } from "./components";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { Provider } from "react-redux";
import { store } from "./store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const defaultTheme = createTheme({
  direction: "rtl",
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          // overflow: "hidden",
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

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </Provider>
    </ThemeProvider>
  </React.StrictMode>
);
