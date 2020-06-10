import axios from "axios";
// require('dotenv').config();


const sendMessage = async (orderDetails) => {

    // order_id SERIAL PRIMARY KEY,
    // order_status VARCHAR ,
    // required_date DATE,
    // time_ordered TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    // receipt_id INT REFERENCES receipts(receipt_id),
    // customer_id INT REFERENCES customers(customer_id),
    // store_id INT REFERENCES stores(store_id),
    // courier_id INT REFERENCES couriers(courier_id),
    // delivery_fee INT,
    // total INT

    const customerMessage = {
        number: process.env.REACT_APP_CUSTOMER_PHONE_NUMBER,
        text: `Your order #${orderDetails.orderNum} has been placed`,
        // orderDetails: orderDetails

    }
    const storeMessage = {
        number: process.env.REACT_APP_STORE_PHONE_NUMBER,
        text: 'An order has been placed',
        // orderDetails: orderDetails

    }
    const courierMessage = {
        number: process.env.REACT_APP_COURIER_PHONE_NUMBER,
        text: 'An order has been placed for pickup at',
        // orderDetails: orderDetails
    }

    // console.log(courierMessage)
    // console.log(process.env)


   const customerResponse = await axios.post('/messages/send', customerMessage)
    console.log('customerResponse', customerResponse)

    const storeResponse = await axios.post('/messages/send', storeMessage)
    console.log('storeResponse', storeResponse)

    const courierResponse = await axios.post('/messages/send', courierMessage)
    console.log('courierResponse', courierResponse)


}

export default sendMessage;