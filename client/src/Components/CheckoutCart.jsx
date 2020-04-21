
import React, { useState, useEffect, useContext, useRef } from 'react'
import { ItemDetailsContext } from '../Contexts/ItemDetailsContexts'
import axios from 'axios'


const CheckoutCart = () => {
    const { getProductSize } = useContext(ItemDetailsContext);
    const [checkoutCart, setCheckoutCart] = useState([])

    useEffect(() => {
        handleGetCart()
    }, [getProductSize])

    const handleGetCart = async () => {
        try {

            let getCart = await axios.get(`/checkoutCart`)
            let cartPayload = getCart.data.payload
            setCheckoutCart(cartPayload)
        } catch (err) {
            console.log("ERROR", err)
        }
    }

    const handleProduct = async (checkoutId) => {
        try {
            await axios.delete(`/checkoutCart/delete/${checkoutId}`)
            handleGetCart()
        } catch (err) {
            console.log("ERROR", err)
        }
    }

    return (
        <div>
            {checkoutCart.map(product => {
                return (
                    <div key={product.checkoutcart_id}>
                        <img src={product.product_image_url} alt={product.product_name} height="200px"></img>


                        <button onClick={() => { handleProduct(product.checkoutcart_id) }}>Delete</button>
                    </div>
                )
            })}


        </div>



    )
}

export default CheckoutCart



