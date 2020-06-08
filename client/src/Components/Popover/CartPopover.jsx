import React, { useEffect, useContext} from "react"
import CartPopoverDisplay from "./CartPopoverDisplay"
import { CheckoutCartContext } from '../../Contexts/CheckoutCartContext'


const CartPopover = () => {
    const { getCheckout, checkoutCart } = useContext(CheckoutCartContext)
    useEffect(() => {
        getCheckout()
    }, [])


    return (
        <div >
            <h1 style={{ marginBottom: '0px', display: 'flex', justifyContent: 'flex-start', borderBottom: '1px solid black', fontSize: ' large', fontFamily: 'Arial, Helvetica, sans-serif' }} >
                Your Shopping Bag</h1>
            <CartPopoverDisplay
                checkoutCart={checkoutCart}
            />
        </div >
    )
}

export default CartPopover

