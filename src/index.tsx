/*
 * Entry point for the whole application.
 */

import App from "./components/app";
import React from "react";
import ReactDOM from "react-dom";
import Theme from "./theme";
import {ThemeProvider} from "@material-ui/core";

ReactDOM.render(
  <ThemeProvider theme={Theme}>
    <App />
  </ThemeProvider>
  ,
  document.getElementById("root")
);