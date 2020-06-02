import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const CheckoutCartContext = createContext();


const CheckoutCartContextProvider = (props) => {
    const [brandIdInCart, setBrandIdInCart] = useState(0);
    const [brandId, setBrandId] = useState(0);
    const [productId, setProductId] = useState(1);//Current Product id
    const [productQty, setProductQty] = useState(0);
    const [totalProductQty, setTotalProductQty] = useState(0); //Total of Product Qty from the itempopup page
    const [productSize, setProductSize] = useState('default');
    const [checkoutCart, setCheckoutCart] = useState([]);
    const [shippingOption, setShippingOption] = useState(15)


    const updateProductQty = (newQty) => {
        setProductQty(newQty)
    };

    const getProductSize = (prodSize) => {
        setProductSize(prodSize)
    };

    const getProductId = (newProdId) => {
        setProductId(newProdId)
    };
    const getShipping = (option) => {
        setShippingOption(option)
    }

    useEffect(() => {
        getCheckout();

    }, [])

    const getCheckout = async () => {
        let getCheckoutCart = await axios.get('/checkoutCart/session')
        let CartPayload = getCheckoutCart.data.payload
        setCheckoutCart(CartPayload)


    };

    const addToCart = async () => {
        if (productQty !== 0 && productSize !== 'default') {
            const productExistInCart = await axios.get(`/checkoutCart/items/productId/${productId}/${productSize}`)
            const productExistPayload = productExistInCart.data.payload
            if (checkoutCart.length === 0 || !productExistPayload) {
                try {
                    await axios.post('/checkoutCart/items/add', { product_id: productId, size: productSize, quantity: productQty })
                    getCheckout()
                } catch (err) {
                    console.log("ERROR", err)
                }
            } else {
                let updateQty = productExistPayload.cartquantity + parseInt(productQty)
                console.log(productExistPayload, productExistPayload.product_id, productExistPayload.size)
                try {
                    await axios.patch(`/checkoutCart/items/edit`, { product_id: productExistPayload.product_id, size: productExistPayload.size, quantity: updateQty })
                } catch (err) {
                    console.log("ERROR", err)
                }
                getCheckout()
            }
            setProductQty(0)
            setProductSize('default')
        }
    }


    return (
        // Provider accepts a value containting state and functions. This allows the components access to the state but it must be descendants of the provider.
        <CheckoutCartContext.Provider value={{ shippingOption, getShipping, getProductId, getCheckout, updateProductQty, checkoutCart, productId, productQty, totalProductQty, getProductSize, productSize, addToCart }}>
            {props.children}
        </CheckoutCartContext.Provider>
    );
}

export default CheckoutCartContextProvider;