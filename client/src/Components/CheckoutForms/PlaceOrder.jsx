import React, {useContext, useState}from 'react';
import customTheme from '../styling/customTheme';
import { makeStyles, Container, Typography, CssBaseline } from '@material-ui/core';
import { flexbox } from '@material-ui/system';
import { Context } from '../../Contexts/CustomerContext';
import CheckoutContext from '../../Contexts/CheckoutContext'

const orderStyles = makeStyles((theme) => ({
    container: {
        margin: 'auto',
        padding: theme.spacing(3),
    },
    innerContainer: {
        display: 'flex',
        flexFlow: 'column',
        justifyContent: 'center',
        alignContent: 'center',
        margin: 'auto',
        textAlign: 'center',
        padding: 'auto'
    },
    typography: {
        color: customTheme.palette.secondary.dark,
        textAlign: 'left',
        margin: 'auto'
    },
    header: {
        color: customTheme.palette.secondary.dark,
    },
}))
const PlaceOrder = (props) => {
    const classes = orderStyles();
    const [state, dispatch] = useContext(Context);
    const [userInfo, setUserInfo] = useState(state.user.info);
    let shippingInfo = props.shippingOption;

    return (
        <CssBaseline>
            <Container className={classes.container}>
                <Typography className={classes.header} variant='h5'>
                <b> Your order number: </b>{props.orderNumber}<br/><br/>
            </Typography>
                <Container className={classes.innerContainer}>
                    <Typography className={classes.typography} variant='subtitle1'>
                        <b>Name: </b>{userInfo.firstname} {userInfo.lastname} <br />
                        <b>Address: </b>{userInfo.address}<br />
                        <b>City: </b>{userInfo.city}<br />
                        <b>State: </b>{userInfo.state}<br />
                        <b>Zip: </b>{userInfo.zip_code} <br />
                        <b>Shipping: </b> {`$${shippingInfo}`}
                </Typography>
                </Container>
            </Container>
        </CssBaseline>
    )
}
export default PlaceOrder;