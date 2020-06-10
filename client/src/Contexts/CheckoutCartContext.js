import React, { createContext, useState } from 'react';
import axios from 'axios';

export const CheckoutCartContext = createContext();

const CheckoutCartContextProvider = (props) => {
    const [productId, setProductId] = useState(1);//Current Product id
    const [checkoutCart, setCheckoutCart] = useState([]);
    const [shippingOption, setShippingOption] = useState(15) 
    const [checkoutCartId, setCheckoutCartId] = useState(null)
    const [qtyInBag, setQtyInBag] = useState(0)

    const getProductId = (newProdId) => {
        setProductId(newProdId)
    };
    const getShipping = (option) => {
        setShippingOption(option)
    }

    const getCheckoutCartId = (checkoutId) => {
        setCheckoutCartId(checkoutId)
    }

    const getCheckout = async () => {
        let allCheckoutCart = await axios.get('/checkoutCart/session')
        let allCartPayload = allCheckoutCart.data.payload
        setCheckoutCart(allCartPayload)
        let totalItem = 0
        allCartPayload.map(product =>{
            totalItem  =  totalItem + product.cartquantity   
        })
        setQtyInBag(totalItem)
    };


    return (
        // Provider accepts a value containting state and functions. This allows the components access to the state but it must be descendants of the provider.
        <CheckoutCartContext.Provider value={{
            shippingOption, getShipping, getProductId, getCheckout, checkoutCart, productId,checkoutCartId,
            getCheckoutCartId, qtyInBag, setQtyInBag
        }}>
            {props.children}
        </CheckoutCartContext.Provider>
    );
}

export default CheckoutCartContextProvider;