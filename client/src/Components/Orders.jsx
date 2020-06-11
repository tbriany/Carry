import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios'


function Orders() {
    let [orders, setOrders] = useState({})


    useEffect(() => {
        const handleCustomerOrders = async () => {

            //USER MUST BE LOGIN IN TO SEE ORDERS
            try {
                const getAllOrders = await axios.get(`/orders/receipts/${2}`)
                const orders = getAllOrders.data.payload
                setOrders(orders)
                console.log(getAllOrders.data.payload, "getAllOrdersByCustomerId")
            } catch (err) {
                console.log("ERROR", err)
            }
        }
        handleCustomerOrders()
    }, [])


    return (
        <div>
            {orders.length > 0 ? (<div>

                {orders.map(function (order, i) {
                    return (
                        <div >
                            {/* Orders */}
                            {order.firstname}

                            {/* Receipt */}
                            {order.reciept.map(function (products, i) {
                                return (
                                    <div>{products.product_name}</div>
                                )
                            })}

                        </div>


                    )
                })}

            </div>) : (<div>EMPTY</div>)
            }


        </div>
    )
}

export default Orders;
