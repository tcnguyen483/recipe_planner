/*
 * App
 *
 * Container component for the main application.
 */

import React, { FC, ReactElement } from "react";
import {
  BrowserRouter as Router, Route, Switch
} from "react-router-dom";
import BrowsePage from "./browse/browsePage";
import HomePage from "./home/homePage";
import NoDataPage from "./utils/NoDataPage";
import RecipeBookPage from "./recipeBook/recipeBookPage";

const App: FC = (): ReactElement => {
  return (
    <Router>
      <Switch>
          <Route exact path="/" component={() => <HomePage />} />
          <Route path="/browse" component={BrowsePage} />
          <Route path="/recipeBook" component={RecipeBookPage} />
          <Route component={NoDataPage} />
      </Switch>
    </Router>
  );
};

export default App;