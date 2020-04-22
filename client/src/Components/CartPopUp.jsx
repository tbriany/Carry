
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


const CartPopUp = () => {
    const classes = useStyles();
    const { productId, productIds, totalProductQty, productPrice, productSize } = useContext(ItemDetailsContext) //Grab state from context file
    const [checkoutCart, setCheckoutCart] = useState([]) //holds and object that contains the product info in the cart and its quantity
    const [totalPrice, setTotalPrice] = useState(0)


    const handleGetItemById = async (prodId) => { //Create a cart in the front end using an object. If item id exists then upload quantity. Else, insert id, product info and total quantity.

        let itemExist = checkoutCart.find(id => parseInt(prodId) === parseInt(id.product_id)) //Check to see if product id exist in checkoutCart

        if (!itemExist) {
            let totalPricePerQty = parseInt(totalProductQty) * parseInt(productPrice)
            try {
                await axios.post('/checkoutCart/add', { product_id: prodId, size: productSize, quantity: totalProductQty, totalPrice: totalPricePerQty })
            } catch (err) {
                console.log("ERROR", err)
            }

        } else {
            try{
            let cartId = itemExist.checkoutcart_id
            let prevQty = parseInt(itemExist.cartquantity)
            let updatedQty = prevQty + parseInt(totalProductQty)
            await axios.patch(`/checkoutCart/edit/${cartId}`, { checkoutCart_id: cartId, product_id: prodId, size: productSize, quantity: updatedQty, totalPrice: (parseInt(updatedQty) * parseInt(itemExist.product_price)) })
            }catch(err){
                console.log("ERROR",err)
            }
        }
        getAllCart()
    }

    useEffect(() => {
        getAllCart()
        for (let i = 0; i < productIds.length; i++) {
            handleGetItemById(productIds[i]);
        }
    }, [totalProductQty]) //Update the checkout when the totalProductQty is updated. 


    const getAllCart = async () => {
        try {
            let getCart = await axios.get(`/checkoutCart`)
            let cartPayload = getCart.data.payload
            setCheckoutCart(cartPayload)

        } catch (err) {
            console.log("ERROR", err)

        }

    }



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
                                        <img src={item.product_image_url} height="300px" />
                                        <p> {item.brand_name}</p>
                                        <p>${item.product_price}</p>
                                        <p>Qty:{item.cartquantity}</p>

                                        <p>{item.totalprice}</p>
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



    )
}

export default CartPopUp


