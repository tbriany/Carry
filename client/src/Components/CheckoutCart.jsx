
import React, { useState, useEffect, useContext, useRef } from 'react'
import { Button, InputLabel, MenuItem, Select } from '@material-ui/core'
import { ItemDetailsContext } from '../Contexts/ItemDetailsContexts'
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

import axios from 'axios'




const CheckoutCart = () => {

    const { productId, productIds, totalProductQty, productPrice, productSize } = useContext(ItemDetailsContext) //Grab state from context file
    const [checkoutCart, setCheckoutCart] = useState([]) //holds and object that contains the product info in the cart and its quantity
    const [totalPrice, setTotalPrice] = useState(0)


    const handleGetCart = async () => {
        try {
            let getCart = await axios.get(`/checkoutCart`)
            let cartPayload = getCart.data.payload
            setCheckoutCart(cartPayload)
        } catch (err) {
            console.log("ERROR", err)
        }
    }

    useEffect(() => {

        for (let i = 0; i < productIds.length; i++) {
            handleGetItemById(productIds[i]);
        }
    }, [totalProductQty]) //Update the checkout when the totalProductQty is updated. 



    const handleGetItemById = async (prodId) => { //Create a cart in the front end using an object. If item id exists then upload quantity. Else, insert id, product info and total quantity.
        let getCart = await axios.get(`/checkoutCart`)
        let getCartPayload = getCart.data.payload
        let itemExist = getCartPayload.find(id => parseInt(prodId) === parseInt(id.product_id)) //Check to see if product id exist in checkoutCart
        if (!itemExist) {
            let totalPricePerQty = parseInt(totalProductQty) * parseInt(productPrice)
            try {
                await axios.post('/checkoutCart/add', { product_id: prodId, size: productSize, quantity: totalProductQty, totalPrice: totalPricePerQty })
                handleGetCart()
            } catch (err) {
                console.log("ERROR", err)
            }
        } else {
            try {
                let cartId = itemExist.checkoutcart_id
                let prevQty = parseInt(itemExist.cartquantity)
                let updatedQty = prevQty + parseInt(totalProductQty)
                await axios.patch(`/checkoutCart/edit/${cartId}`, { checkoutCart_id: cartId, product_id: prodId, size: productSize, quantity: updatedQty, totalPrice: (parseInt(updatedQty) * parseInt(itemExist.product_price)) })
            } catch (err) {
                console.log("ERROR", err)
            }
        }
        handleGetCart()
    }

    



    const handleDeleteProduct = async (checkoutId) => {
        try {
            await axios.delete(`/checkoutCart/delete/${checkoutId}`)
            handleGetCart()
        } catch (err) {
            console.log("ERROR", err)
        }
    }

    return (
        <div >
            {checkoutCart.length > 0 ? (<div>
                {checkoutCart.map((product) => {
                    return (
                        <div key={product.checkoutcart_id}>
                            <h1>{product.brand_name}</h1>
                            <img src={product.product_image_url} alt={product.product_name} height="200px"></img>
                            <p>{product.product_name}</p>
                            <p> Color:{product.color_name}</p>
                            <p>QTY:{product.cartquantity}</p>
                            <p>Size:{product.size}</p>
                            <p>price:${product.product_price}</p>
                            <p> Total Price:{product.totalprice}</p>
                            <button onClick={() => { handleDeleteProduct(product.checkoutcart_id) }}>Delete</button>
                        </div>

                    )
                })}
            </div>) : (<div></div>)}

        </div>



    )
}

export default CheckoutCart




