import React, { useState, useEffect, useContext, useRef } from 'react'
import { Button, InputLabel, MenuItem, Select } from '@material-ui/core'
import { ItemDetailsContext } from '../Contexts/ItemDetailsContexts'



import axios from 'axios'

const CheckoutCart = () => {

    const { updateId, itemId, itemIds, qty, updateQty, totalQty } = useContext(ItemDetailsContext)
    const [iteminfo, setItemInfo] = useState([])
    const [checkout, setCheckout] = useState([])



    const handleGetItemById = async (itemId) => {
        const itemInfo = await axios.get(`/products/images/${parseInt(itemId)}`)
        let payload = itemInfo.data.payload
        console.log()


        let cartObj = []
        if(!cartObj[itemId]){
            
            cartObj = {
                itemId :itemId,
                productName: payload.product_name,
                imgUrl : payload.product_image_url,
                price: payload.product_price,
                qty: totalQty
            }
            setItemInfo([cartObj])
        }else{
            cartObj[itemId]  = totalQty

        }
       
      
        console.log(setItemInfo, "ItemObject==========================")
        console.log("iteminfo =====", iteminfo)

    }



    useEffect(() => {

        for (let i = 0; i < itemIds.length; i++) {
            handleGetItemById(handleGetItemById(itemIds[i]));
        }



    }, [totalQty])


    return (

        <div className="checkoutCart-stage">
        <p>CHECKOUT  </p>
            {iteminfo.length > 0 ? (<div>
                {iteminfo.map((item) => {
                    return (

                        <div>
                            <p>{item.qty}</p>
                            <img src={item.imgUrl} height="100px" />
                                    <p> {item.productName}</p>
                            <p>${item.price}</p>
                        </div>
                    )
                })}
            </div>) : (<div></div>)}



        </div>
     
    )


}

export default CheckoutCart