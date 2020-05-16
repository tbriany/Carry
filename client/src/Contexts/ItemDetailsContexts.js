import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const ItemDetailsContext = createContext();


const ItemDetailsContextProvider = (props) => {

    const [productId, setProductId] = useState(1);//Current Product id
    const [productIds, setproductsIds] = useState([]); //Array contains all ids that was added to the checkout bag.
    const [productQty, setProductQty] = useState(0);
    const [totalProductQty, setTotalProductQty] = useState(0); //Total of Product Qty from the itempopup page
    const [productSize, setProductSize] = useState('default');
    const [checkoutCart, setCheckoutCart] = useState([]);

    const updateProductQty = (newQty) => {
        setProductQty(newQty)
    };

    const getProductSize = (prodSize) => {
        setProductSize(prodSize)
    };

    const getProductId = (newProdId) => {
        setProductId(newProdId)
    };


    useEffect(() => {
        getCheckout();
    }, [])

    const getCheckout = async () => {
        let getCart = await axios.get(`/checkoutCart`)
        setCheckoutCart(getCart.data.payload)
    };


    const addToCart = async () => {
        if (productQty !== 0 && productSize !== 'default') {
            setTotalProductQty(productQty)

            if (!productIds.includes(productId)) {
                setproductsIds([...productIds, productId])
                try {
                    await axios.post('/checkoutCart/add', { product_id: productId, size: productSize, quantity: productQty })
                    getCheckout()
                } catch (err) {
                    console.log("ERROR", err)
                }
            } else {
                try {
                    let productInCart = await axios.get(`/checkoutCart/productId/${productId}`)
                    let productPayload = productInCart.data.payload
                    let totalQty = parseInt(productPayload.cartquantity) + parseInt(productQty)
                    handleUpdateQuantity(productPayload.checkoutcart_id, productId, productSize, totalQty)
                    getCheckout()
                } catch (err) {
                    console.log("ERROR", err)
                }
            }
            setProductQty(0)
            setProductSize('default')
        } else {
            alert("Missing Input")
        }
    }


    const handleUpdateQuantity = async (checkoutId, currProductId, currSize, updatedQty) => {
        try {
            await axios.patch(`/checkoutCart/edit/${checkoutId}`, { checkoutCart_id: checkoutId, product_id: currProductId, size: currSize, quantity: updatedQty })
        } catch (err) {
            console.log("ERROR", err)
        }
    }

    return (
        // Provider accepts a value containting state and functions. This allows the components access to the state but it must be descendants of the provider.
        <ItemDetailsContext.Provider value={{ getProductId, getCheckout, updateProductQty, checkoutCart, productId, productIds, productQty, totalProductQty, getProductSize, productSize, addToCart }}>
            {props.children}
        </ItemDetailsContext.Provider>
    );
}

export default ItemDetailsContextProvider;