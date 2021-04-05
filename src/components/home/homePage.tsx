// no data error screen

import { Container, createStyles, makeStyles, Theme, Typography } from "@material-ui/core";
import React from "react";
import Header from "../utils/header";

const HomePage = (): JSX.Element => {
  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      root: {
        width: "100%",
        display: "flex",
        backgroundColor: theme.palette.background.paper,
        flexWrap: "wrap",
        flexDirection: "row",
        padding: 0
      },
    }),
  );

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Header />
      <Container>
        <Typography variant="h1" >This is the home page.</Typography>
      </Container>
    </div>
  );
};

export default HomePage;
