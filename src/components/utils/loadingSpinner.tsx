/*
 * Loading spinner animated component from Material UI.
 */
import React, {FC, ReactElement} from "react";
import { CircularProgress, createStyles, makeStyles } from "@material-ui/core";

const LoadingSpinner: FC = (): ReactElement => {
  const useStyles = makeStyles(() =>
    createStyles({
      spinner: {
        alignSelf: "center",
        justifySelf: "center"
      }
    }),
  );

  const classes = useStyles();

  return <CircularProgress className={classes.spinner}/>;

};

export default LoadingSpinner;
