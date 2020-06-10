import React, {useContext, useState}from 'react';
import customTheme from '../styling/customTheme';
import { makeStyles, Container, Typography, CssBaseline } from '@material-ui/core';
import { flexbox } from '@material-ui/system';
import { Context } from '../../Contexts/CustomerContext';


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
    const [state, dispatch] = useContext(Context);
    const [userInfo, setUserInfo] = useState(state.user.info);
    return (
        <CssBaseline>
            <Container className={classes.container}>
                <Typography className={classes.typography} variant='h5'>
                    Your order number: <b></b> 
            </Typography>
                <Container className={classes.innerContainer}>
                    <Typography className={classes.typography} variant='subtitle2'>
                        <b>Name:</b>{userInfo.firstname} {userInfo.lastname} <br />
                        <b>Address:</b>{userInfo.address}<br />
                        <b>City:</b>{userInfo.city}<br />
                        <b>State:</b>{userInfo.state}<br />
                        <b>Zip:</b>{userInfo.zip_code} <br />
                        <b>Payment:</b><br />
                        <b>Shipping: </b>
                </Typography>
                </Container>
            </Container>
        </CssBaseline>
    )
}
export default PlaceOrder;