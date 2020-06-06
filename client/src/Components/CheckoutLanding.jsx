import React, { useState, Fragment, useContext } from 'react';
import { makeStyles, AppBar, Toolbar, Paper, Stepper, Step, StepLabel, Typography, CssBaseline, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { CheckoutCartContext } from '../Contexts/CheckoutCartContext';
import Checkout from './Checkout'
import CheckoutCart from './CheckoutCart/CheckoutCartPage'
import Grid from '@material-ui/core/Grid';




const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

const CheckoutLanding = () => {
  const { shippingOption, getShipping } = useContext(CheckoutCartContext);
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={1}>
        <Grid item xs={8}>
          <Paper className={classes.paper}
            style={{
              boxShadow: " 1px 1px 1px white",
              color: "black",
            }}>
            <Checkout
              getShipping={getShipping}
              shippingOption={shippingOption}
            />
          </Paper>
        </Grid>
        <Grid style={{
          height: "auto",
          borderLeft: '1px solid  #eed7c1'

        }}
          item xs={4}>
          <Paper className={classes.paper}
            style={{
              boxShadow: " 1px 1px 1px white",
              color: "black",
              height: '100vh'
            }}>
            <CheckoutCart
              getShipping={getShipping}
              shippingOption={shippingOption} />
          </Paper>
        </Grid>
      </Grid>
    </div>





  )




}


export default CheckoutLanding;