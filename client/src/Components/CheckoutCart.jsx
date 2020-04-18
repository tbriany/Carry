import React, { useState, useEffect, useContext, useRef } from 'react'
import { Button, InputLabel, MenuItem, Select } from '@material-ui/core'
import { ItemDetailsContext } from '../Contexts/ItemDetailsContexts'
import axios from 'axios'

const CheckoutCart = () => {
    const { updateId, itemId, itemIds, qty, updateQty, totalQty } = useContext(ItemDetailsContext)
    //Acts like ItemDetailsContext.consumer but allows the entire CheckoutCart.jsx access to the state from Contexts/ItemDeatilsContext.js. 
    // ItemDetailsContext.consumer is found in the return and wraps around html tags (div, p, h1 etc.). It will only give those specific tags access to the state


    const [iteminfo, setItemInfo] = useState([]) //holds and object that contains the product info in the cart and its quantity



    // const [checkout, setCheckout] = useState([])


    const handleGetItemById = async (itemId) => { //Create a cart in the front end using an object. If item id exists then upload quantity. Else, insert id, product info and total quantity.
        const itemInfo = await axios.get(`/products/images/${itemId}`)
        let payload = itemInfo.data.payload
        let cartObj = []
        if (!cartObj[itemId]) {
            cartObj = {
                itemId: itemId,
                productName: payload.product_name,
                imgUrl: payload.product_image_url,
                price: payload.product_price,
                qty: totalQty
            }
            setItemInfo([cartObj])
        } else {
            cartObj[itemId] = totalQty

        }
    }



    useEffect(() => {
        for (let i = 0; i < itemIds.length; i++) {
            handleGetItemById(handleGetItemById(itemIds[i]));
        }
    }, [totalQty]) //Update the checkout when add 1 more quantity mimicking ComponentDidUpdate. 
    //Continous loop but slowly. Need to Change.




    return (

        <div className="checkoutCart-stage">
            <p>CHECKOUT  </p>
            {iteminfo.length > 0 ? (<div>
                {iteminfo.map((item) => {
                    return (
                        <div>
                            <p>{item.qty}</p>
                            <img src={item.imgUrl} height="100px" />
                            <p> {item.productName}</p>
                            <p>${item.price}</p>
                        </div>
                    )
                })}
            </div>) : (<div></div>)}
        </div>

    )
}

export default CheckoutCart
