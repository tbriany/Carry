
import React, { useState, useEffect, useContext, useRef } from 'react'
import { Button, InputLabel, MenuItem, Select } from '@material-ui/core'
import { ItemDetailsContext } from '../Contexts/ItemDetailsContexts'
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

import axios from 'axios'

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1
    },
    paper: {
        padding: theme.spacing(5),
        textAlign: "center",
        color: theme.palette.text.secondary
    }
}));


const CheckoutCart = () => {



    const classes = useStyles();

    const { productId, productIds, productQty, totalProductQty } = useContext(ItemDetailsContext)    //Acts like ItemDetailsContext.consumer but allows the entire CheckoutCart.jsx access to the state from Contexts/ItemDeatilsContext.js. 
    // ItemDetailsContext.consumer is found in the return and wraps around html tags (div, p, h1 etc.). It will only give those specific tags access to the state


    const [checkoutCart, setCheckoutCart] = useState([]) //holds and object that contains the product info in the cart and its quantity
    const [totalPrice, setTotalPrice] = useState(0)


    const handleGetItemById = async (productId) => { //Create a cart in the front end using an object. If item id exists then upload quantity. Else, insert id, product info and total quantity.
        const itemInfo = await axios.get(`/products/images/${productId}`)
        let payload = itemInfo.data.payload
        let cartObj = []
        if (!cartObj[productId]) {
            cartObj = {
                productId: productId,
                productName: payload.product_name,
                imgUrl: payload.product_image_url,
                price: payload.product_price,
                productQty: totalProductQty
            }
            setCheckoutCart([cartObj])
            setTotalPrice(totalPrice + (cartObj.productQty * cartObj.price))
        } else {
            cartObj[productId] = totalProductQty
            setTotalPrice(totalPrice + (totalProductQty * cartObj.price))

        }
    }



    useEffect(() => {
        for (let i = 0; i < productIds.length; i++) {
            handleGetItemById(productIds[i;
        }
    }, [totalProductQty]) //Update the checkout when add 1 more quantity mimicking ComponentDidUpdate. 
    //Continous loop but slowly. Need to Change.



    return (


        <div style={{
            margin: "35px",
            padding: "23px",
            margin: '32px',

        }} className={classes.root} >
            <p>CHECKOUT  </p>
            <Grid container spacing={4}>

                <Grid item xs={7} sm={3}>
                    <Paper className={classes.paper}
                        style={{
                            boxShadow: " 1px 1px 1px white",
                            color: "black",
                        }}
                    >

                        {checkoutCart.length > 0 ? (<div>
                            {checkoutCart.map((item) => {

                                return (


                                    <div>
                                        <img src={item.imgUrl} height="300px" />
                                        <p> {item.productName}</p>
                                        <p>${item.price}</p>
                                        <p>Qty:{item.productQty}</p>
                                    </div>

                                )
                            })}
                        </div>) : (<div></div>)}
                    </Paper>
                </Grid>
                <Grid item xs={3} sm={5}>
                    <Paper className={classes.paper} style={{
                        boxShadow: " 1px 1px 1px white",
                    }}
                    ></Paper>
                </Grid>
            </Grid>




            <Grid container
                spacing={4}
            >

                <Grid item xs={7} sm={3}>
                    <Paper className={classes.paper}
                        style={{
                            boxShadow: " 1px 1px 1px white",
                        }}>
                    </Paper>
                </Grid>
                <Grid item xs={3} sm={5}

                >
                    <Paper className={classes.paper}
                        style={{
                            boxShadow: " 1px 1px 1px white",
                            color: "black",
                        }} >
                        {totalPrice !== 0 ? (<div style={{
                            border: '1px solid #eed7c1',
                        }}
                        > <p>TOTAL: {totalPrice}</p></div>) : (<div></div>)}


                    </Paper>
                </Grid>
            </Grid>



        </div>
        // <div className="checkoutCart-stage">
        //   
        //
        //     
        // </div>
    )
}

export default CheckoutCart



