import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Paper, Grid, Divider} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: 'black',
        boxShadow: 'white 1px 1px 1px',
        display:'flex',
        flexDirection : 'column',
        display: 'flex',
        textAlign: 'start',
 
    },
}));

function ReceiptDisplay({ receipt }) {

    const classes = useStyles();

    return (
        <div className={classes.root}>
            {receipt.length > 0 ? (<div>

                {receipt.map(function (order, i) {
                    return (
                        <Grid container spacing={3}>


                            <Grid item xs={12} sm={8}>
                                <Paper className={classes.paper}>
                                {order.reciept.map(function (products, i) {
                                      return (
                                        <div>
                                            <Grid container spacing={2}>
                                                <Grid item xs={12} sm={6}>
                                                    <Paper className={classes.paper}>
                                                        <img src={products.product_image_url} alt={products.product_name} style={{height:'auto',   width: '10em', display: 'flex' , alignSelf: 'center' }} ></img>
                                                    </Paper>
                                                </Grid>
                                                <Grid item xs={12} sm={6}>
                                                    <Paper className={classes.paper}>
                                                        <h2 style = {{marginTop: '0px'}}>{products.brands_name}'s' </h2>
                                                        <h3 style = {{marginTop: '0px'}} >{products.product_name}</h3>
                                                        <p style = {{marginTop: '0px'}} >Size: {products.size}</p>
                                                        <p style = {{marginTop: '0px'}}>QTY:{products.cartquantity}</p>
                                                        <p style = {{marginTop: '0px'}}>Total:{products.producttotal}</p>
                                                    </Paper>
                                                </Grid>
                                            </Grid>
                                        </div>
                                    )
                                })}
                                </Paper>
                            </Grid>








                            <Grid item xs={8} sm={4}>
                                <Paper className={classes.paper}>
                                <Grid container spacing={2}>
                                        <Grid item xs={12} sm={6}>
                                            <Paper className={classes.paper}>
                                                <h3 style = {{marginTop: '0px'}}>CustomerInfo</h3>
                                            </Paper>
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <Paper className={classes.paper}>
                                                <p style = {{marginTop: '0px'}}> {order.firstname} {order.lastName}</p>
                                                <p > {order.address}</p>
                                                <p > {order.city}, {order.state}</p>
                                                <p> {order.zip_code}</p>
                                            </Paper>
                                        </Grid>
                                    </Grid>

                                    <Divider variant="inset" component="li" style = {{  margin: '0px', backgroundColor: '#FAEBD7'}} />
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} sm={6}>
                                            <Paper className={classes.paper}>
                                                <h3  style = {{marginTop: '0px'}} >Payment</h3>
                                            </Paper>
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <Paper className={classes.paper}>W/P</Paper>
                                        </Grid>
                                    </Grid>


                                    <Divider variant="inset" component="li" style = {{  margin: '0px', backgroundColor: '#FAEBD7'}} />
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} sm={6}>
                                            <Paper className={classes.paper}>  <h3 style = {{marginTop: '0px'}}>Summary</h3>
                                                <p>SubTotal</p>
                                                <p>Delivery Fee</p>
                                                <p>Total</p>
                                            </Paper>
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <Paper className={classes.paper}>
                                                <h3 style={{ color: "white" , marginTop: '0px'}} >-</h3>
                                                <p>${order.total - order.delivery_fee}</p>
                                                <p>${order.delivery_fee} </p>
                                                <p>${order.total}</p>
                                            </Paper>
                                        </Grid>
                                    </Grid>


                                </Paper>
                            </Grid>



                        </Grid>
                    )
                })}

            </div>) : (<div> Loading ...</div>)}
        </div>
    );
}

export default ReceiptDisplay;