import axios from "axios";


const sendMessage = async (orderDetails) => {

    const customerMessage = {
        number: process.env.REACT_APP_CUSTOMER_PHONE_NUMBER,
        text: `
        Your order #${orderDetails.orderNum} has been placed`,

    }
    const storeMessage = {
        number: process.env.REACT_APP_STORE_PHONE_NUMBER,
        text: `Order #${orderDetails.orderNum} has been placed`,

    }
    const courierMessage = {
        number: process.env.REACT_APP_COURIER_PHONE_NUMBER,
        text: `An order has been placed for pickup!`,
    }


   const customerResponse = await axios.post('/messages/send', customerMessage)
    console.log('customerResponse', customerResponse)

    const storeResponse = await axios.post('/messages/send', storeMessage)
    console.log('storeResponse', storeResponse)

    const courierResponse = await axios.post('/messages/send', courierMessage)
    console.log('courierResponse', courierResponse)


}

export default sendMessage;