import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from "@material-ui/core/Button";
import List from '@material-ui/core/List';
import clsx from 'clsx';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import ItemPopUp from '../ItemPopUp'
import {sidePopUp} from '../styling/sidePopTheme'



const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  image: {
    height: 350,
    width: 300,
    maxHeight: '100%'
  },
}));



export default function ProductsDisplay({getProductId, products}) {
  const classes = useStyles();

  const popUp = sidePopUp();
  const [state, setState] = React.useState({
    right: false
  });

  const toggleDrawer = (right, open, prodId) => event => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
      
    ) {
      
   getProductId(prodId)
      return;
    }

   getProductId(prodId)
    setState({ ...state, right: open });
  };


  const list = (anchor) => (
    <div
      className={clsx(popUp.list, {
        [popUp.fullList]: anchor === 'top' || anchor === 'bottom',
      })}
      role="presentation"

      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <ItemPopUp />
      </List>
    </div>
  );

  
  return (
    <div className={classes.root} style={{ margin: '20px', padding: '15px' }}>
      <Grid container className={classes.root} justify='center'>
        <Grid item md={20}>
          <Grid container justify="center" spacing={5}>
            {products.map((value) => (
              <Button key = {value.product_id} onClick={toggleDrawer("right", true, value.product_id)}>
                <Grid key={value} item>
                  <img alt="backpack" src={value.product_image_url} className={classes.image}></img>
                  <Grid item>
                    <Typography gutterBottom variant="subtitle1">{value.product_name}</Typography>
                    <Typography variant="subtitle1">$ {value.product_price}</Typography>
                  </Grid>
                </Grid>
              </Button>
            ))}

            <SwipeableDrawer
              anchor={"right"}
              open={state["right"]}
              onClose={toggleDrawer("right", false, 0)}
              onOpen={toggleDrawer("right", true)}  
              classes={{paperAnchorRight : popUp.paperAnchorRight}}
            >
              {list('right')}
            </SwipeableDrawer>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}