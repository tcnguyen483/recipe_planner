/*
 * Recipe card displays data about one recipe.
 * 
 * Bootstrapped from: 
 * https://material-ui.com/components/cards/#RecipeReviewCard.tsx
 */

import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Collapse,
  IconButton, 
  Link,
  ListItem,
  ListItemText,
  Theme,
  Typography, createStyles,
  makeStyles
} from "@material-ui/core";
import { Create, ExpandMore, Favorite, Share } from "@material-ui/icons";
import React, { useState } from "react";
import { Recipe } from "../../redux/recipesSlice";
import clsx from "clsx";

const RecipeCard = (props: Recipe): JSX.Element => {
  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      root: {
        maxWidth: 345,
      },
      media: {
        height: 0,
        paddingTop: "56.25%", // 16:9
      },
      expand: {
        transform: "rotate(0deg)",
        marginLeft: "auto",
        transition: theme.transitions.create("transform", {
          duration: theme.transitions.duration.shortest,
        }),
      },
      expandOpen: {
        transform: "rotate(180deg)",
      }
    }),
  );

  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);

  const ingredientSections = Object.values(props.ingredients).map((section) => {
    const { header, ingredients } = section;
    const ingredientList = ingredients.map((name) => (
      <ListItem key={name}>
        <ListItemText primary={name} /> 
      </ListItem>)
    );
    return (
      <>
        <Typography paragraph>{header}</Typography>
        {ingredientList}
      </>
    );
  }); 

  const instructionSections = Object.values(props.instructions).map((section) => {
    const { header, instructions } = section;
    const instructionsList = instructions.map((ins) => (
      <ListItem key={ins}>
        <ListItemText primary={ins} /> 
      </ListItem>)
    );
    return (
      <>
        <Typography paragraph>{header}</Typography>
        {instructionsList}
      </>
    );
  }); 

  // const dateAdded = props.dateAdded.toLocaleDateString();

  const description = props.description ? (
    <CardContent>
      <Typography variant="body2" color="textSecondary" component="p">
        {props.description}
      </Typography>
    </CardContent>
  ) : null;

  const originalSourceLink = (
    <Link 
      href={props.sourceURL} 
      rel="noreferrer" 
      target="_blank"
      aria-label="link to recipe source"
    >
      Original Recipe
    </Link>);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card className={classes.root}>
      <CardHeader
        action={
          <IconButton aria-label="edit">
            <Create />
          </IconButton>
        }
        title={props.title}
        subheader={originalSourceLink}
      />
      {props.description && description}
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <Favorite />
        </IconButton>
        <IconButton aria-label="share">
          <Share />
        </IconButton>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMore />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          {ingredientSections}
          {instructionSections}
        </CardContent>
      </Collapse>
    </Card>
  );
};

export default RecipeCard;