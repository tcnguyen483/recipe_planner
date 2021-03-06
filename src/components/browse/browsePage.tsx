/*
 * Page to browse through all of the recipe cards on the site.
 * 
 */
import { Button, Container, createStyles, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, makeStyles, Theme } from "@material-ui/core";
import React, { FC, ReactElement, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import DataNotFound from "../../assets/undraw_page_not_found.svg";
import { loadRecipes, RecipeLoadingStatus, selectRecipes, selectRecipesLoadingStatus, setRecipesLoadingStatus } from "../../redux/recipesSlice";
import RecipeCard from "../recipe/recipeCard";
import Header from "../utils/header";
import Spinner from "../utils/loadingSpinner";

const BrowsePage: FC = (): ReactElement => {
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
      }
    }),
  );

  const classes = useStyles();

  const dispatch = useAppDispatch();

  const recipes = useAppSelector(selectRecipes);
  const recipeLoadingStatus = useAppSelector(selectRecipesLoadingStatus);

  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const getRecipesErrorDialog = (
    <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="error getting recipe data"
        aria-describedby="There was an error getting the recipe data, please try again later."
    >
        <DialogTitle id="error getting recipe data">{"We ran into a problem getting the recipes."}</DialogTitle>
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

  const recipeCards = recipes.length > 0 ? recipes.map((recipe) => (
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
    if (recipeLoadingStatus === RecipeLoadingStatus.NOT_LOADED) {
      dispatch(setRecipesLoadingStatus(RecipeLoadingStatus.LOADING));
      dispatch(loadRecipes());
    } else if (recipeLoadingStatus === RecipeLoadingStatus.ERROR) {
      setOpen(true);
      console.log("There was an error while trying to fetch the recipe data.");
    }
  }, [recipeLoadingStatus, dispatch]);

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

export default BrowsePage;