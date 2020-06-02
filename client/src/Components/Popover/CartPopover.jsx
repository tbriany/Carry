import React, { useState, useEffect, useContext, useRef } from "react"
import CartPopoverDisplay from "./CartPopoverDisplay"
import { CheckoutCartContext } from '../../Contexts/CheckoutCartContext'
import axios from "axios";



const CartPopover = () => {


    const { getCheckout, checkoutCart } = useContext(CheckoutCartContext)
    const [cartTotal, setCartTotal] = useState()


    useEffect(() => {
        getCheckout()
        if (checkoutCart.length !== 0) {
            handleCartTotal()
        }
    }, [])

    const handleCartTotal = async () => {
        try {
            let total = await axios.get(`/checkoutCart/items/checkoutTotal`)
            setCartTotal(total.data.payload.checkouttotal)
            console.log(total.data.payload.checkouttotal)


        } catch (err) {
            console.log("ERROR", err)
        }
    }

    return (
        <div >
            <h1 style={{ marginBottom: '0px', display: 'flex', justifyContent: 'flex-start', borderBottom: '1px solid black', fontSize: ' large', fontFamily: 'Arial, Helvetica, sans-serif' }} >
                Your Shopping Bag</h1>
            <CartPopoverDisplay
                checkoutCart={checkoutCart}
                cartTotal={cartTotal}
            />
        </div >
    )
}

export default CartPopover

