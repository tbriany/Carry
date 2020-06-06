import React from 'react'
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";



const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(1),
        textAlign: 'center',
        display: "flex",
        justifyContent: "flex-start",
        flexDirection: "column",
        marginBottom: "15px",
        marginTop: "15px",
        boxShadow: " 1px 1px 1px white"
    },
}));


const CheckoutCartDisplay = ({ checkoutCart, shippingOption, handleDeleteProduct, handleIncrementQty, handleDecrementQty, cartTotal }) => {
    const classes = useStyles();

    return (
        <div >
            {checkoutCart.length > 0 ? (<div>
                {checkoutCart.map((product) => {
                    return (
                        <div key={product.checkout_items_id} className={classes.root}>
                            <Grid container spacing={2}>
                                <Grid item xs={9} >
                                    <Paper
                                        style={{ alignItems: "flex-start", padding: "0px", }}
                                        className={classes.paper} >
                                        <Grid container spacing={1} style={{ margin: '0px', width: '100%' }}>
                                            <Grid style={{ padding: "0px" }} item xs={4} >
                                                <Paper
                                                    style={{ alignItems: "center", padding: "0px", margin: '0px', height: '100%' }}
                                                    className={classes.paper}>
                                                    <img className="product_img" src={product.product_image_url} alt={product.product_name} ></img>
                                                </Paper>
                                            </Grid>

                                            <Grid item xs={8} style={{ padding: "0px" }}>
                                                <Paper
                                                    style={{ alignItems: "flex-start", textAlign: "-webkit-left", margin: '0px', padding: "0px", height: '100%', paddingLeft: "10%" }}
                                                    className={classes.paper}>
                                                    <h1 style={{fontSize:"medium"}} className="checkoutCart_product">{product.product_name}</h1>
                                                    <p className="checkoutCart_product"> Color:{product.color_name}</p>
                                                    <p className="checkoutCart_product" >Size:{product.size}</p>
                                                    <p className="checkoutCart_product" >Price:${product.product_price}</p>
                                                    <div className="checkoutCart_buttons">
                                                        <button className="decrement_button"
                                                            onClick={() => { handleDecrementQty(product.checkoutcart_id, product.product_id, product.size, product.cartquantity) }}
                                                        >-</button>
                                                        <span className="product_cartqty">{product.cartquantity} </span>
                                                        <button className="increment_button"
                                                            onClick={() => { handleIncrementQty(product.checkoutcart_id, product.product_id, product.size, product.cartquantity) }}
                                                        >+</button>
                                                    </div>
                                                    <button className="delete_product"
                                                        onClick={() => { handleDeleteProduct(product.checkout_items_id) }}
                                                    >Delete</button>
                                                </Paper>
                                            </Grid>
                                        </Grid>
                                    </Paper>
                                </Grid>
                                <Grid item xs={3} >
                                    <Paper
                                        style={{ alignItems: "flex-end" }}
                                        className={classes.paper}>
                                        <p className="checkoutCart_productTotal" > ${product.producttotal} </p>
                                    </Paper>
                                </Grid>
                            </Grid>
                        </div>
                    )
                })}

                <div className={classes.root}>
                    <Grid container spacing={1}>
                        <Grid item xs={9} >
                            <Paper style={{ alignItems: "flex-start" }} className={classes.paper}>
                                Shipping:
                             </Paper>
                        </Grid>
                        <Grid item xs={3} >
                            <Paper style={{ alignItems: "flex-end" }} className={classes.paper}>
                                <p className="shipping_option" > ${shippingOption} </p>
                            </Paper>
                        </Grid>
                    </Grid>
                </div>

                <div className={classes.root}>
                    <Grid container spacing={1}>
                        <Grid item xs={9} >
                            <Paper style={{ alignItems: "flex-start" }} className={classes.paper}>Total:</Paper>
                        </Grid>
                        <Grid item xs={3} >
                            <Paper style={{ alignItems: "flex-end" }} className={classes.paper}>
                                <p className="checkoutCart_total" >  ${cartTotal} </p>
                            </Paper>
                        </Grid>
                    </Grid>
                </div>
            </div>) : (
                    <div>
                        <h3 style={{ fontFamily: 'Arial, Helvetica, sans-serif', fontWeight: 'normal', display: 'flex'}}>Is Currently Empty</h3>
                    </div>
                )}
        </div >
    )
}

export default CheckoutCartDisplay
