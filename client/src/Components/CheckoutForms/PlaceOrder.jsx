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
    const customerObj = {
        title: 'Miss.',
        firstName: 'Audrey',
        lastName: 'Hepburn',
        phoneNumber: '3474227651',
        email: 'audrey@gmail.com',
        address: '123 5th Avenue',
        address2: '15th floor',
        city: 'New York',
        state: 'NY',
        zipCode: '10011',
        cardNumber: '**** **** **** 613',
        exp: '05/30',
        cvv: 382
    };
    return (
        <CssBaseline>
            <Container className={classes.container}>
                <Typography className={classes.typography} variant='h5'>
                    Your order number <b>#546947</b> has been placed!
            </Typography>
                <Container className={classes.innerContainer}>
                    <Typography className={classes.typography} variant='subtitle2'>
                        <b>Name:</b> {`${customerObj.title} ${customerObj.firstName} ${customerObj.lastName}`}<br />
                        <b>Address:</b> {`${customerObj.address}`} {`${customerObj.address2}`}<br />
                        <b>City:</b> {`${customerObj.city}`}<br />
                        <b>State:</b> {`${customerObj.state}`}<br />
                        <b>Zip:</b> {`${customerObj.zipCode}`}<br />
                        <b>Payment:</b> {`${customerObj.cardNumber} ${customerObj.exp} ${customerObj.cvv}`}<br />
                        <b>Shipping: </b> $15 - Rush Delivery
                </Typography>
                </Container>
            </Container>
        </CssBaseline>
    )
}
export default PlaceOrder;