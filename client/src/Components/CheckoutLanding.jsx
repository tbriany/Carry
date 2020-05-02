import React, { useState, Fragment } from 'react';
import { makeStyles, AppBar, Toolbar, Paper, Stepper, Step, StepLabel, Typography, CssBaseline, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';

import Checkout from './Checkout'
import CheckoutCart from './CheckoutCart'
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

const  CheckoutLanding = () => {
    const classes = useStyles();

    return (
        <div className={classes.root}>

        <Grid container spacing={3}>
       
        <Grid item xs={8}>
        <Paper className={classes.paper}
                        style={{
                            boxShadow: " 1px 1px 1px white",
                            color: "black",
                        }}>
          <Checkout/>
          </Paper>
        </Grid>
        <Grid style ={{
            
           height: "100%",
           borderLeft: '1px solid beige'
        
        }}
        item xs={4}>
         <Paper className={classes.paper}
                        style={{
                            boxShadow: " 1px 1px 1px white",
                            color: "black",
                        }}>
          <CheckoutCart/>
          </Paper>
        </Grid>
      </Grid>
    </div>




      
    )




}


export default CheckoutLanding;