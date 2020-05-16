import React, { useState, useEffect, useContext, useRef } from 'react'
import { Button, InputLabel, MenuItem, Select } from '@material-ui/core'
import { ItemDetailsContext } from '../Contexts/ItemDetailsContexts'
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import axios from 'axios'


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(1),
        textAlign: 'center',
    },
}));

const CheckoutCart = () => {
    const classes = useStyles();
    const { getCheckout, productId, checkoutCart, productIds, shippingOption } = useContext(ItemDetailsContext) //Grab state from context file
    const [cartTotal, setCartTotal] = useState()
    const [changeinQty, setchangeinQty] = useState(false)


    useEffect(() => {
        getCheckout()
        handleCartTotal()
    }, [changeinQty])



    const handleDeleteProduct = async (checkoutId) => {
        try {
            await axios.delete(`/checkoutCart/delete/${checkoutId}`)
            getCheckout()
            handleCartTotal()
        } catch (err) {
            console.log("ERROR", err)
        }
    }

    const handleCartTotal = async () => {
        try {
            let total = await axios.get(`/checkoutCart/checkoutTotal`)
            let checkoutTotal = total.data.payload.checkouttotal
            let cartTotal = parseInt(checkoutTotal) +  parseInt(shippingOption)
            setCartTotal(cartTotal)
        } catch (err) {
            console.log("ERROR", err)
        }
    }

    const handleIncrementQty = async (checkoutId, prodId, prodSize, currQty) => {
        try {
            changeinQty ? setchangeinQty(false) : setchangeinQty(true)
            let updateQty = parseInt(currQty) + 1
            await axios.patch(`/checkoutCart/edit/${checkoutId}`, { checkoutCart_id: checkoutId, product_id: prodId, size: prodSize, quantity: updateQty })

        } catch (err) {
            console.log("ERROR", err)
        }
    }

    const handleDecrementQty = async (checkoutId, prodId, prodSize, currQty) => {
        let updateQty = parseInt(currQty) - 1
        if (updateQty > 0) {
            try {
                changeinQty ? setchangeinQty(false) : setchangeinQty(true)
                let updateQty = parseInt(currQty) - 1
                await axios.patch(`/checkoutCart/edit/${checkoutId}`, { checkoutCart_id: checkoutId, product_id: prodId, size: prodSize, quantity: updateQty })
            } catch (err) {
                console.log("ERROR", err)
            }
        }

    }


    return (
        <div >
            <p style={{
                display: "flex", justifyContent: "flex-start", borderBottom: '1px solid black', fontSize: "x-large"
            }}
            >Shopping Bag</p>
            {checkoutCart.length > 0 ? (<div>
                {checkoutCart.map((product) => {
                    return (
                        <div key={product.checkoutcart_id} className={classes.root}>
                            <Grid container spacing={1}>
                                <Grid item xs={9} >
                                    <Paper
                                        style={{ display: "flex", justifyContent: "flex-start", flexDirection: "column", alignItems: "flex-start", boxShadow: " 1px 1px 1px white", padding: "0px", marginBottom: "15px", marginTop: "15px" }}
                                        className={classes.paper} >
                                        <Grid container spacing={1}>
                                            <Grid style={{ padding: "0px" }} item xs={4} >
                                                <Paper
                                                    style={{ display: "flex", justifyContent: "flex-start", flexDirection: "column", alignItems: "center", boxShadow: " 1px 1px 1px white", padding: "0px", marginBottom: "15px", marginTop: "15px" }}
                                                    className={classes.paper}>
                                                    <img style={{ height: "12vh", margin: "0px" }} src={product.product_image_url} alt={product.product_name} ></img>
                                                </Paper>
                                            </Grid>
                                            <Grid item xs={8} >
                                                <Paper
                                                    style={{ display: "flex", justifyContent: "flex-start", flexDirection: "column", alignItems: "flex-start", boxShadow: " 1px 1px 1px white", textAlign: "-webkit-left" }}
                                                    className={classes.paper}>
                                                    <p style={{ margin: "0px", fontSize: "small" }}>{product.product_name}</p>
                                                    <p style={{ margin: "0px", fontSize: "small" }}> Color:{product.color_name}</p>
                                                    <p style={{ margin: "0px", fontSize: "small" }}>Size:{product.size}</p>
                                                    <p style={{ margin: "0px", fontSize: "small" }}>Price:${product.product_price}</p>
                                                    <div style={{ display: 'flex' }}>
                                                        <button style={{ display: 'flex', alignSelf: 'flex-end', border: ' 1px solid #eed7c1', borderRadius: '50%', margin: '2px', fontSize: 'small' }}
                                                            onClick={() => {
                                                                handleDecrementQty(product.checkoutcart_id, product.product_id, product.size, product.cartquantity)
                                                            }} >-</button>
                                                        <span style={{ marginLeft: '10px', marginRight: '10px', }}>{product.cartquantity} </span>
                                                        <button style={{ border: ' 1px solid #eed7c1', borderRadius: '50%', margin: '2px', fontSize: 'small' }}
                                                            onClick={() => {
                                                                handleIncrementQty(product.checkoutcart_id, product.product_id, product.size, product.cartquantity)
                                                            }} >+</button>
                                                    </div>
                                                    <button style={{ display: 'flex', alignSelf: 'flex-end', border: ' 1px solid #eed7c1', borderRadius: '25px' }}
                                                        onClick={() => { handleDeleteProduct(product.checkoutcart_id) }}>Delete</button>
                                                </Paper>
                                            </Grid>
                                        </Grid>
                                    </Paper>
                                </Grid>
                                <Grid item xs={3} >
                                    <Paper
                                        style={{ display: "flex", justifyContent: "flex-start", flexDirection: "column", alignItems: "flex-end", boxShadow: " 1px 1px 1px white", marginBottom: "15px", marginTop: "15px" }}
                                        className={classes.paper}>
                                        <p style={{ margin: "0px", fontSize: "small" }} > ${product.producttotal} </p>
                                    </Paper>
                                </Grid>
                            </Grid>
                        </div>
                    )
                })}



                <div className={classes.root}>
                    <Grid container spacing={1}>
                        <Grid item xs={9} >
                            <Paper
                                style={{ display: "flex", justifyContent: "flex-start", flexDirection: "column", alignItems: "flex-start", boxShadow: " 1px 1px 1px white", marginBottom: "15px", marginTop: "15px" }}
                                className={classes.paper}
                            > Shipping:
                             </Paper>
                        </Grid>
                        <Grid item xs={3} >
                            <Paper
                                style={{ display: "flex", justifyContent: "flex-start", flexDirection: "column", alignItems: "flex-end", boxShadow: " 1px 1px 1px white", marginBottom: "15px", marginTop: "15px" }}
                                className={classes.paper}
                            >
                                <p style={{ margin: "0px", fontSize: "small" }} > ${shippingOption} </p>
                            </Paper>
                        </Grid>
                    </Grid>
                </div>











                <div className={classes.root}>
                    <Grid container spacing={1}>
                        <Grid item xs={9} >
                            <Paper
                                style={{ display: "flex", justifyContent: "flex-start", flexDirection: "column", alignItems: "flex-start", boxShadow: " 1px 1px 1px white", marginBottom: "15px", marginTop: "15px" }}
                                className={classes.paper}
                            > Total:
                             </Paper>
                        </Grid>
                        <Grid item xs={3} >
                            <Paper
                                style={{ display: "flex", justifyContent: "flex-start", flexDirection: "column", alignItems: "flex-end", boxShadow: " 1px 1px 1px white", marginBottom: "15px", marginTop: "15px" }}
                                className={classes.paper}
                            >
                                <p style={{ margin: "0px", fontSize: "small" }} > ${cartTotal} </p>
                            </Paper>
                        </Grid>
                    </Grid>
                </div>
            </div>) : (<div></div>)
            }
        </div >
    )
}

export default CheckoutCart
