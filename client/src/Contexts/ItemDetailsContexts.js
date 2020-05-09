import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const ItemDetailsContext = createContext();


const ItemDetailsContextProvider = (props) => {

    const [productId, setProductId] = useState(1);//Current Product id
    const [productIds, setproductsIds] = useState([]); //Array contains all ids that was added to the checkout bag.
    const [productQty, setProductQty] = useState(0);
    const [totalProductQty, setTotalProductQty] = useState(0); //Total of Product Qty from the itempopup page
    const [productSize, setProductSize] = useState('');
    const [checkoutCart, setCheckoutCart] = useState([]);


    const updateProductQty = (newQty) => {//function the updates the quantity 
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


        console.log("productQty", productQty , "productSize", productSize)
        if (productQty !== 0 && productSize !== '') {
            setTotalProductQty(productQty)
            if (!productIds.includes(productId)) {
                setproductsIds([...productIds, productId])
            }
            let productExistInCart = checkoutCart.find(cart => parseInt(productId) === parseInt(cart.product_id))
            console.log(checkoutCart, "checkoutCart")
            if (!productExistInCart) {

                console.log("if")
         
                try {
                    await axios.post('/checkoutCart/add', { product_id: productId, size: productSize, quantity: productQty })
                    getCheckout()
                } catch (err) {
                    console.log("ERROR", err)
                }
            } else {
                console.log("else", productExistInCart)

                let prevQty = parseInt(productExistInCart.cartquantity)
                let current = parseInt(productQty)
                let totalQty = prevQty + current

                try {
                    await axios.patch(`/checkoutCart/edit/${productExistInCart.checkoutcart_id}`, { checkoutCart_id: productExistInCart.checkoutcart_id, product_id: productId, size: productSize, quantity: totalQty })
                    getCheckout()
                } catch (err) {
                    console.log("ERROR", err)
                }
            }
            // setProductQty(0)
        } else{
            alert("Missing Input")
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
