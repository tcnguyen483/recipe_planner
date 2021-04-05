// no data error screen

import { Container, createStyles, makeStyles, Theme } from "@material-ui/core";
import React from "react";
import DataNotFound from "../../assets/undraw_page_not_found.svg";
import Header from "./header";

const NoDataPage = (): JSX.Element => {
  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      root: {
        width: "100%",
        display: "flex",
        backgroundColor: theme.palette.background.paper,
        flexWrap: "wrap",
        flexDirection: "row"
      },
      image404: {
        alignSelf: "center",
        justifySelf: "center"
      }
    }),
  );

  const classes = useStyles();

  return (
    <div>
      <Header />
      <Container className={classes.root}>    
        <img 
          src={DataNotFound} 
          className={classes.image404} 
          alt="404 data not found image" 
          aria-label="404 data not found image" 
        />
      </Container>
    </div>
    
  );
};

export default NoDataPage;
