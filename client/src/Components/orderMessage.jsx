import axios from "axios";


const sendMessage = async (orderDetails, receipt) => {
    console.log(orderDetails)
    console.log(receipt)


    const itemsArr = receipt.map(el => `Product: ${el.product_name}, Color: ${el.colors_name}, Size: ${el.size}, Qty: ${el.cartquantity}`)

    const customerMessage = {
        number: process.env.REACT_APP_CUSTOMER_PHONE_NUMBER,
        text: `Your order #${orderDetails.order_id} has been placed and is ${orderDetails.order_status}. Items Purchased: ${itemsArr}. Delivery Fee: $${orderDetails.delivery_fee}. Total: $${orderDetails.total}`,
    }
    const storeMessage = {
        number: process.env.REACT_APP_STORE_PHONE_NUMBER,
        text: `Order #${orderDetails.order_id} has been placed. Order status is ${orderDetails.order_status}. Items Placed for order: ${itemsArr} Order to be delivered on: ${orderDetails.required_date}.`,
    }
    const courierMessage = {
        number: process.env.REACT_APP_COURIER_PHONE_NUMBER,
        text: `An order has been placed for pickup! Order #${orderDetails.order_id} status is ${orderDetails.order_status}. Items Placed for order: ${itemsArr} Order to be delivered on: ${orderDetails.required_date}.`,
    }


   const customerResponse = await axios.post('/messages/send', customerMessage)
    console.log('customerResponse', customerResponse)

    const storeResponse = await axios.post('/messages/send', storeMessage)
    console.log('storeResponse', storeResponse)

    const courierResponse = await axios.post('/messages/send', courierMessage)
    console.log('courierResponse', courierResponse)


}

export default sendMessage;