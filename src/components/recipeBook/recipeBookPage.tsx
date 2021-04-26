/*
 * Page with all of the recipes the user has saved.
 * 
 */
import { useAuth0 } from "@auth0/auth0-react";
import { Button, Container, createStyles, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, makeStyles, Theme } from "@material-ui/core";
import React, { FC, ReactElement, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import DataNotFound from "../../assets/undraw_page_not_found.svg";
import { loadRecipes, RecipeLoadingStatus, selectRecipes, selectRecipesLoadingStatus, setRecipesLoadingStatus, Recipe } from "../../redux/recipesSlice";
import { loadUserCollection, loadUserCollectionPayload, selectSavedRecipeIDs, selectUserCollectionLoadingStatus, setUserCollectionLoadingStatus, UserCollectionLoadingStatus } from "../../redux/userCollectionSlice";
import { Auth0UserData } from "../../services/auth0Management";
import { PhoScopes, PHO_URL } from "../../services/phoBackend";
import RecipeCard from "../recipe/recipeCard";
import Header from "../utils/header";
import Spinner from "../utils/loadingSpinner";

const RecipeBookPage: FC = (): ReactElement => {
  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      root: {
        backgroundColor: theme.palette.background.paper,
      },
      container: {
        display: "flex",
        width: "100%",
        flexWrap: "wrap",
        flexDirection: "row",
        paddingTop: 16
      },
    }),
  );

  const classes = useStyles();

  const { isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0();
  const { user }: { user?: Auth0UserData } = useAuth0();

  const dispatch = useAppDispatch();

  const savedRecipeIDs = useAppSelector(selectSavedRecipeIDs); 

  const recipeLoadingStatus = useAppSelector(selectRecipesLoadingStatus);
  const userCollectionLoadingStatus = useAppSelector(selectUserCollectionLoadingStatus);

  const recipes = useAppSelector(selectRecipes);

  const [open, setOpen] = useState(false);
  const [savedRecipes, setSavedRecipes] = useState([] as Array<Recipe>);

  const handleClose = () => {
    setOpen(false);
  };

  const getRecipesErrorDialog = (
    <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="error getting user's recipe data"
        aria-describedby="There was an error getting the user's recipe data, please try again later."
    >
        <DialogTitle id="error getting recipe user's data">{"We ran into a problem getting your recipes."}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Sorry for the inconvenience! We will work to fix this issue as soon as possible.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Dismiss
          </Button>
        </DialogActions>
    </Dialog>
  );

  const noRecipes = <img src={DataNotFound} alt="404 data not found image" aria-label="404 data not found image" />;


  const recipeCards = savedRecipes.length > 0 ? savedRecipes.map((recipe) => (
    <RecipeCard
      id={recipe.id}
      title={recipe.title}
      ingredients={recipe.ingredients} 
      instructions={recipe.instructions}
      tags={recipe.tags}
      calories={recipe.calories}
      authorID={recipe.authorID}
      dateAdded={recipe.dateAdded}
      sourceURL={recipe.sourceURL}
      description={recipe.description}
      key={recipe.id}
    />
  )) : null;

  useEffect(() => {
    console.log(savedRecipeIDs);
    setSavedRecipes(recipes.filter(recipe => savedRecipeIDs.includes(recipe.id)));
  }, [recipes, savedRecipeIDs]);

  useEffect(() => {
    if (recipeLoadingStatus === RecipeLoadingStatus.NOT_LOADED) {
      dispatch(setRecipesLoadingStatus(RecipeLoadingStatus.LOADING));
      dispatch(loadRecipes());
    } else if (recipeLoadingStatus === RecipeLoadingStatus.ERROR) {
      setOpen(true);
      console.log("There was an error while trying to fetch the recipe data.");
    }
  }, [recipeLoadingStatus, dispatch]);

  useEffect(() => {
    const loadUserCollectionState = async () => {
      if (isLoading || !isAuthenticated) {
        return;
      }
      if (userCollectionLoadingStatus === UserCollectionLoadingStatus.NOT_LOADED){
        try {
          dispatch(setUserCollectionLoadingStatus(UserCollectionLoadingStatus.LOADING));
          const phoAccessToken = await getAccessTokenSilently({
            audience: PHO_URL,
            scope: PhoScopes.READ_CURRENT_USER,
          });
  
          const payload = {
            user: user,
            phoAccessToken: phoAccessToken,
          } as loadUserCollectionPayload;
  
          dispatch(loadUserCollection(payload));
        } catch (error) {
          console.log(error.message);
        }
      } else if (userCollectionLoadingStatus === UserCollectionLoadingStatus.ERROR) {
        setOpen(true);
        console.log("There was an error while trying to fetch your app data.");
      }
    };
    loadUserCollectionState();
  
  }, [dispatch, getAccessTokenSilently, isAuthenticated, isLoading, user, userCollectionLoadingStatus]);

  return (
    <div className={classes.root}>
      <Header />
      <Container className={classes.container}>
        {recipeLoadingStatus === RecipeLoadingStatus.LOADED && recipeCards}
        {recipeLoadingStatus === RecipeLoadingStatus.LOADING && <Spinner />}
        {recipeLoadingStatus === RecipeLoadingStatus.ERROR && noRecipes}
        {open && getRecipesErrorDialog}
      </Container>
    </div>
  );
};

export default RecipeBookPage;