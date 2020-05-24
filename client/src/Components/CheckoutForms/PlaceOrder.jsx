import React from 'react';
import customTheme from '../styling/customTheme';
import { makeStyles, Container, Typography, CssBaseline } from '@material-ui/core';
import { flexbox } from '@material-ui/system';

const orderStyles = makeStyles((theme) => ({
    container: {
        margin: 'auto',
        padding: theme.spacing(3)
    },
    typography: {
        color: customTheme.palette.secondary.dark,
    },
    innerContainer: {
        display: 'flex',
        flexFlow: 'column',
        justifyContent: 'flex-start'
    }
}))
const PlaceOrder = () => {
    const classes = orderStyles();
    return (
        <CssBaseline>
            <Container className={classes.container}>
                <Typography className={classes.typography} variant='h5'>
                    Your order number <b></b>=
            </Typography>
                <Container className={classes.innerContainer}>
                    <Typography className={classes.typography} variant='subtitle2'>
                        <b>Name:</b> <br />
                        <b>Address:</b> <br />
                        <b>City:</b><br />
                        <b>State:</b><br />
                        <b>Zip:</b> <br />
                        <b>Payment:</b><br />
                        <b>Shipping: </b>
                </Typography>
                </Container>
            </Container>
        </CssBaseline>
    )
}
export default PlaceOrder;