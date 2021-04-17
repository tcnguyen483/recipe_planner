/*
 * Entry point for the whole application.
 */

import App from "./components/app";
import React from "react";
import ReactDOM from "react-dom";
import Theme from "./theme";
import {ThemeProvider} from "@material-ui/core";
import ReduxStore from "./app/store";
import { Provider as ReduxProvider } from "react-redux";
import CssBaseline from "@material-ui/core/CssBaseline";
import { Auth0Provider } from "@auth0/auth0-react";

ReactDOM.render(
  <Auth0Provider
    domain="recipe-planner.us.auth0.com"
    clientId="HuARKX156NMQJX4qD0cfzVuCMPllZXMb"
    redirectUri="http://localhost:8080/browse"
    audience="https://recipe-planner-pho.herokuapp.com/"
    scope="read:current_user update:current_user create:user"
  >
    <ThemeProvider theme={Theme}>
      <ReduxProvider store={ReduxStore}>
        <CssBaseline />
        <App />
      </ReduxProvider>
    </ThemeProvider>
  </Auth0Provider>
  ,
  document.getElementById("root")
);