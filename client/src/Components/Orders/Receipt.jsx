import React, { useContext, useState, useEffect } from 'react';
import { Link, Route, useHistory } from 'react-router-dom';
import axios from 'axios'
import ReceiptDisplay from './ReceiptDisplay'




function Receipt(props) {
    let [receipt, setReceipt] = useState({})



    useEffect(() => {
        const handleReceipt= async () => {

            try {

                const getReciptByOrderId = await axios.get(`/receipts/order/${props.match.params.orders_id}`)
                const receipt = getReciptByOrderId.data.payload
                setReceipt(receipt)

            } catch (err) {
                console.log("ERROR", err)
            }
        }
        handleReceipt()
    }, [])


    return (
        <div style ={{height: '100vh', padding: '3% 6% 3% 6% '}}>
            <h1 style={{ fontWeight: 500, fontSize: '24px', lineHeight: '1.166667', fontFamily: 'Helvetica Neue ,Helvetica,Arial,sans-serif'
            }}>Order #{props.match.params.orders_id}</h1>

            <hr style={{ marginBottom: '20px', marginTop: '12px', height: "1px",  border: 'none', boxShadow: '#FAEBD7 0px 1px 0px 0px inset', }} />
       
        <ReceiptDisplay
        receipt = {receipt}
        />

       

        </div>
    )
}

export default Receipt;
