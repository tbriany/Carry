import React, { useState, useEffect, useContext, useRef } from "react"
import CartPopoverDisplay from "./CartPopoverDisplay"
import { CheckoutCartContext } from '../../Contexts/CheckoutCartContext'
import "../CheckoutCart/CheckoutCart.css";
import axios from "axios";



const CartPopover = () => {
  

    const { getCheckout, checkoutCart } = useContext(CheckoutCartContext) 
    const [cartTotal, setCartTotal] = useState()

   
    useEffect(() => {
        getCheckout()
        if(checkoutCart.length !== 0){
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
            <p 
            style = {{marginBottom: '0px'}}className='checkoutCart_heading'
             >Shopping Bag</p>
            {checkoutCart.length > 0 ? (<div>
                <CartPopoverDisplay
                    checkoutCart={checkoutCart}
                    cartTotal={cartTotal}
                />
            </div>) : (<></>)}
        </div >
    )
}

export default CartPopover

