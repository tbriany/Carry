import React, { createContext, useState } from 'react';
export const ItemDetailsContext = createContext();


const ItemDetailsContextProvider = (props) => {

    const [productId, setProductId] = useState(1)//Current Product id
    const [productIds, setproductsIds] = useState([]) //Array contains all ids that was added to the checkout bag.
    const [productQty, setProductQty] = useState(0)
    const [totalProductQty, setTotalProductQty] = useState(0) //Total of Product Qty from the itempopup page
    const [productPrice, setProductPrice] = useState(0)
    const [productSize, setProductSize] = useState('')

    const updateProductQty = (newQty) => {//function the updates the quantity 
        setProductQty(newQty)
    }
    const getProductPrice = (currProdPrice) => {
        setProductPrice(currProdPrice)
    }

    const getProductSize = (getProductSize) => {
        setProductSize(getProductSize)
    }



    const addItemToBag = () => { //functions that updates the amount of quantity per item and which items id the user wants
        if (!productIds.includes(productId)) {
            setproductsIds([...productIds, productId])
            setTotalProductQty(parseInt(productQty))
            setProductQty(0)


        } else {
            setTotalProductQty(parseInt(productQty))
            setProductQty(0)
        }
    }


    return (
        // Provider accepts a value containting state and functions. This allows the components access to the state but it must be descendants of the provider.
        <ItemDetailsContext.Provider value={{ productId, productIds, productQty, totalProductQty, updateProductQty, addItemToBag, getProductPrice, productPrice, getProductSize, productSize }}>
            {props.children}
        </ItemDetailsContext.Provider>
    );
}

export default ItemDetailsContextProvider