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
    const { getCheckout, productId, checkoutCart, productIds,  } = useContext(ItemDetailsContext) //Grab state from context file
    const [cartTotal, setCartTotal] = useState()


    useEffect(() => {
        getCheckout()
        handleCartTotal()
    }, [])



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
            setCartTotal(total.data.payload.checkouttotal)
        } catch (err) {
            console.log("ERROR", err)
        }
    }

    const handleUpdateQty = async (checkoutId, prodId, prodSize, currQty) => {
        let updateQty = parseInt(currQty) + 1
        try {
            await axios.patch(`/checkoutCart/edit/${checkoutId}`, { checkoutCart_id: checkoutId, product_id: prodId, size: prodSize, quantity: updateQty })

        } catch (err) {
            console.log("ERROR", err)
        }
        getCheckout()
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
                                        className={classes.paper}
                                    >
                                        <Grid container spacing={1}>
                                            <Grid style={{ padding: "0px" }} item xs={4} >
                                                <Paper
                                                    style={{display: "flex", justifyContent: "flex-start", flexDirection: "column", alignItems: "center", boxShadow: " 1px 1px 1px white", padding: "0px", marginBottom: "15px", marginTop: "15px"}}
                                                    className={classes.paper}>
                                                    <img style={{ height: "12vh", margin: "0px" }} src={product.product_image_url} alt={product.product_name} ></img>
                                                </Paper>
                                            </Grid>
                                            <Grid item xs={8} >
                                                <Paper
                                                    style={{display: "flex", justifyContent: "flex-start", flexDirection: "column", alignItems: "flex-start", boxShadow: " 1px 1px 1px white", textAlign: "-webkit-left"}}
                                                    className={classes.paper}>
                                                    <p style={{ margin: "0px", fontSize: "small" }}>{product.product_name}</p>
                                                    <p style={{ margin: "0px", fontSize: "small" }}> Color:{product.color_name}</p>
                                                    <p style={{ margin: "0px", fontSize: "small" }}>Size:{product.size}</p>
                                                    <p style={{ margin: "0px", fontSize: "small" }}>Price:${product.product_price}</p>
                                                    <div>
                                                        <label htmlFor="updateQtyInput" style={{ marginRight: "6px" }}>QTY:</label>
                                                        <input

                                                            className="updateQtyInput"
                                                            type="number" placeholder="0"
                                                            min="0" max="100"
                                                            style={{    border:' 1px solid #eed7c1', padding: '1px'}}
                                                            value={product.cartquantity}
                                                            onClick={() => {
                                                                handleUpdateQty(product.checkoutcart_id, productId, product.size, product.cartquantity)}}>
                                                        </input>
                                                    </div>
                                                    <button style={{ display: 'flex', alignSelf: 'flex-end' }} onClick={() => { handleDeleteProduct(product.checkoutcart_id) }}>Delete</button>
                                                </Paper>
                                            </Grid>
                                        </Grid>
                                    </Paper>
                                </Grid>
                                <Grid item xs={3} >
                                    <Paper
                                        style={{display: "flex", justifyContent: "flex-start", flexDirection: "column", alignItems: "flex-end", boxShadow: " 1px 1px 1px white", marginBottom: "15px", marginTop: "15px"}}
                                        className={classes.paper}>
                                        <p style={{ margin: "0px", fontSize: "small" }} > {product.producttotal} </p>
                                    </Paper>
                                </Grid>
                            </Grid>
                        </div>
                    )})}
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
            </div>) : (<div></div>)}
        </div>
    )
}

export default CheckoutCart


