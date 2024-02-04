import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.css";
import { App } from "./components";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Provider } from "react-redux";
import { store } from "./store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter } from "react-router-dom";
import { defaultTheme } from "./utils/theme";
import { GoogleOAuthProvider } from '@react-oauth/google';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
      <GoogleOAuthProvider clientId="544789251553-0qii4frjud6uu674obslmdp6n9uaou08.apps.googleusercontent.com">
    <QueryClientProvider client={queryClient}>
      <HashRouter>
        <Provider store={store}>
          <ThemeProvider theme={defaultTheme}>
            <CssBaseline />
            <App />
          </ThemeProvider>
        </Provider>
      </HashRouter>
    </QueryClientProvider>
    </GoogleOAuthProvider>
  </React.StrictMode>
);
