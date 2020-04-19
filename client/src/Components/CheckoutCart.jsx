
import React, { useState, useEffect, useContext, useRef } from 'react'
import { Button, InputLabel, MenuItem, Select } from '@material-ui/core'
import { ItemDetailsContext } from '../Contexts/ItemDetailsContexts'
import axios from 'axios'

const CheckoutCart = () => {
    const {productId,  productIds, productQty, totalProductQty } = useContext(ItemDetailsContext)    //Acts like ItemDetailsContext.consumer but allows the entire CheckoutCart.jsx access to the state from Contexts/ItemDeatilsContext.js. 
    // ItemDetailsContext.consumer is found in the return and wraps around html tags (div, p, h1 etc.). It will only give those specific tags access to the state


    const [checkoutCart, setCheckoutCart] = useState([]) //holds and object that contains the product info in the cart and its quantity
    const [totalPrice, setTotalPrice]=useState(0)  



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
            handleGetItemById(handleGetItemById(productIds[i]));
        }
    }, [totalProductQty]) //Update the checkout when add 1 more quantity mimicking ComponentDidUpdate. 
    //Continous loop but slowly. Need to Change.




    return (

        <div className="checkoutCart-stage">
            <p>CHECKOUT  </p>
            {checkoutCart.length > 0 ? (<div>
                {checkoutCart.map((item) => {
                    return (
                        <div>
                            <p>{item.productQty}</p>
                            <img src={item.imgUrl} height="100px" />
                            <p> {item.productName}</p>
                            <p>${item.price}</p>
                        </div>
                    )
                })}
            </div>) : (<div></div>)}
            <p>TOTAL: {totalPrice}</p>
        </div>
    )
}

export default CheckoutCart



