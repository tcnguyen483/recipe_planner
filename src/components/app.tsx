/*
 * App
 *
 * Container component for the main application.
 */

import { useAuth0 } from "@auth0/auth0-react";
import React, { FC, ReactElement, useEffect } from "react";
import {
  BrowserRouter as Router, Route, Switch
} from "react-router-dom";
import BrowsePage from "./browse/browsePage";
import HomePage from "./home/homePage";
import NoDataPage from "./utils/NoDataPage";
import RecipeBookPage from "./recipeBook/recipeBookPage";
import { Auth0UserData } from "../services/auth0Management";
import { PhoScopes, PHO_URL } from "../services/phoBackend";
import { createUserCollection, createUserCollectionPayload, setUserCollectionLoadingStatus, UserCollectionLoadingStatus } from "../redux/userCollectionSlice";
import { useAppDispatch } from "../app/hooks";

const App: FC = (): ReactElement => {

  const { isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0();
  const { user }: { user?: Auth0UserData } = useAuth0();

  const dispatch = useAppDispatch();

  // first time user has logged in, create a new user collection entry in the DB
  useEffect(() => {
    const createAndLoadUserCollection = async () => {
      try {
        dispatch(setUserCollectionLoadingStatus(UserCollectionLoadingStatus.LOADING));
        const phoAccessToken = await getAccessTokenSilently({
          audience: PHO_URL,
          scope: PhoScopes.CREATE_USER,
        });

        const payload = {
          auth0UserID: user && user["http://localhost:8080/user_id"],
          accessToken: phoAccessToken,
        } as createUserCollectionPayload;

        dispatch(createUserCollection(payload));
      } catch (error) {
        console.log(error.message);
      }
    };
    console.log(user);
    // fix this to check the DB to see if the entry exists    
    if (!isLoading && isAuthenticated && user && user["http://localhost:8080/logins_count"] === 1) {
      createAndLoadUserCollection();
    }
  }, [dispatch, getAccessTokenSilently, isAuthenticated, isLoading, user]);

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