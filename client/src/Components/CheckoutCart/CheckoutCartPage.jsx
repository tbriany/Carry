import React, { useState, useEffect, useContext, useRef } from "react"
import CheckoutCartDisplay from "./CheckoutCartDisplay"
import { CheckoutCartContext } from "../../Contexts/CheckoutCartContext"
import axios from "axios";
import "./CheckoutCart.css";


const CheckoutCart = () => {
    const { getCheckout, checkoutCart, shippingOption } = useContext(CheckoutCartContext) //Grab state from context file
    const [cartTotal, setCartTotal] = useState()
    const [changeinQty, setchangeinQty] = useState(false)


    useEffect(() => {
        getCheckout()
        if (checkoutCart.length > 0) {
            handleCartTotal()
        }
    }, [changeinQty, shippingOption])


    const handleDeleteProduct = async (checkoutId) => {
        try {
            await axios.delete(`/checkoutCart/items/delete/${checkoutId}`)
            getCheckout()
            handleCartTotal()
        } catch (err) {
            console.log("ERROR", err)
        }
    }

    const handleCartTotal = async () => {
        try {
            let total = await axios.get(`/checkoutCart/items/checkoutTotal`)
            let checkoutTotal = total.data.payload.checkouttotal
            let cartTotal = parseInt(checkoutTotal) + parseInt(shippingOption)
            setCartTotal(cartTotal)
        } catch (err) {
            console.log("ERROR", err)
        }
    }

    const handleIncrementQty = async (checkoutId, prodId, prodSize, currQty) => {
        try {
            let updateQty = parseInt(currQty) + 1
            await axios.patch(`/checkoutCart/items/edit`, { product_id: prodId, size: prodSize, quantity: updateQty })
            changeinQty ? setchangeinQty(false) : setchangeinQty(true)
        } catch (err) {
            console.log("ERROR", err)
        }

    }

    const handleDecrementQty = async (checkoutId, prodId, prodSize, currQty) => {
        let updateQty = parseInt(currQty) - 1
        if (updateQty > 0) {
            try {
                let updateQty = parseInt(currQty) - 1
                await axios.patch(`/checkoutCart/items/edit`, { product_id: prodId, size: prodSize, quantity: updateQty })
                changeinQty ? setchangeinQty(false) : setchangeinQty(true)
            } catch (err) {
                console.log("ERROR", err)
            }
        }
    }


    return (
        <div >
            <p className='checkoutCart_heading' >Shopping Bag</p>
            {checkoutCart.length > 0 ? (<div>
                <CheckoutCartDisplay
                    checkoutCart={checkoutCart}
                    shippingOption={shippingOption}
                    handleDeleteProduct={handleDeleteProduct}
                    handleIncrementQty={handleIncrementQty}
                    handleDecrementQty={handleDecrementQty}
                    cartTotal={cartTotal}
                />
            </div>) : (<></>)}
        </div >
    )
}

export default CheckoutCart
