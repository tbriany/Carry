
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

    const { productId, productIds, productQty, totalProductQty } = useContext(ItemDetailsContext) //Grab state from context file
    const [checkoutCart, setCheckoutCart] = useState([]) //holds and object that contains the product info in the cart and its quantity
    const [totalPrice, setTotalPrice] = useState(0)


    const handleGetItemById = async (prodId) => { //Create a cart in the front end using an object. If item id exists then upload quantity. Else, insert id, product info and total quantity.
        const productInfo = await axios.get(`/products/images/${prodId}`)
        let productPayload = productInfo.data.payload

        let itemExist = checkoutCart.find(id => prodId === id.productId) //Check to see if product id exist in checkoutCart

        if (!itemExist) { //If it does not exist, create a new object and push the object in the array using 
            let cartObj = {
                productId: productPayload.product_id,
                productName: productPayload.product_name,
                imgUrl: productPayload.product_image_url,
                price: parseInt(productPayload.product_price),
                productQty: parseInt(totalProductQty),
                productTotal: (parseInt(productPayload.product_price) * parseInt(totalProductQty))
            }
            setCheckoutCart([...checkoutCart, cartObj])
            setTotalPrice(totalPrice + (cartObj.productQty * cartObj.price))

        } else {
            itemExist.productQty = totalProductQty // update the quantity 
            let prevTotal = itemExist.productTotal //Create a new variable that equals to the prev product total (prev qty * product price)
            itemExist.productTotal = parseInt(totalProductQty) * parseInt(itemExist.price) //Update the product total (updated quantity * price)
            setTotalPrice((totalPrice - prevTotal) + (totalProductQty * itemExist.price)) //Update the new Total for the entire cart
        }
    }

    useEffect(() => {
        for (let i = 0; i < productIds.length; i++) {
            handleGetItemById(productIds[i]);
        }
    }, [totalProductQty]) //Update the checkout when the totalProductQty is updated. 

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
                        }}>
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



