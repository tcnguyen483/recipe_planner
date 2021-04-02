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

ReactDOM.render(
  <ThemeProvider theme={Theme}>
    <ReduxProvider store={ReduxStore}>
      <App />
    </ReduxProvider>
  </ThemeProvider>
  ,
  document.getElementById("root")
);