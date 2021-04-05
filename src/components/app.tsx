/*
 * App
 *
 * Container component for the main application.
 */

import React from "react";
import {
  BrowserRouter as Router, Route, Switch
} from "react-router-dom";
import BrowsePage from "./browse/browsePage";
import HomePage from "./home/homePage";
import NoDataPage from "./utils/NoDataPage";

const App = (): JSX.Element => {
  return (
    <Router>
      <Switch>
          <Route exact path="/" component={() => <HomePage />} />
          <Route path="/browse" component={BrowsePage} />
          <Route component={NoDataPage} />
      </Switch>
    </Router>
  );
};

export default App;