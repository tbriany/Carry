import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const CheckoutCartContext = createContext();

const CheckoutCartContextProvider = (props) => {
    const [productId, setProductId] = useState(1);//Current Product id
    const [checkoutCart, setCheckoutCart] = useState([]);
    const [shippingOption, setShippingOption] = useState(15)
    const [checkoutCartId, setCheckoutCartId] = useState(null)
    const [qtyInBag, setQtyInBag] = useState(0)
    const [cartTotal, setCartTotal] = useState(0)

    const getProductId = (newProdId) => {
        setProductId(newProdId)
    };
    const getShipping = (option) => {
        setShippingOption(option)
    }

    useEffect(() => {
        getCheckout()
    }, [cartTotal]);

    const getCheckout = async () => {
        let allCheckoutCart = await axios.get('/checkoutCart/session')
        let allCartPayload = allCheckoutCart.data.payload
        if (allCartPayload.length > 0) {
            setCheckoutCartId(allCartPayload[0].checkout_cart_id)
            let totalItem = 0
            allCartPayload.map(product => { totalItem = totalItem + product.cartquantity })
            setQtyInBag(totalItem)
        }
        setCheckoutCart(allCartPayload)
    };


    return (
        // Provider accepts a value containting state and functions. This allows the components access to the state but it must be descendants of the provider.
        <CheckoutCartContext.Provider value={{
            shippingOption, getShipping, getProductId, getCheckout, checkoutCart, productId, checkoutCartId,
            qtyInBag, setQtyInBag, cartTotal, setCartTotal
        }}>
            {props.children}
        </CheckoutCartContext.Provider>
    );
}

export default CheckoutCartContextProvider;