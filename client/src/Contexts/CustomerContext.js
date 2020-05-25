import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
export const CustomerContext = createContext();

//reset-remove user for logout route
//calls all hooks that set information to empty/null

const CustomerContextProvider = (props) => {
    const initalState = ({
        isLoggedIn: false,
        customerId: null,
        customerFirstname: null,
        customerLastname: null,
        customerPhoneNumber: null,
        customerEmail: null,
        customerAddress: null,
        customerCity: null,
        customerState: null,
        customerZip: null,
        customerAvatar: null
    });
    const [logCustomerIn, setLogCustomerIn] = useState(initalState)

    const logUserIn = async (customerObj) => {
        const { customer_id, firstname, lastname, phone_number, email, address, city, state, zip_code, avatar_url } = customerObj;
        await setLogCustomerIn({
            isLoggedIn: true,
            customerId: customer_id,
            customerFirstname: firstname,
            customerLastname: lastname,
            customerPhoneNumber: phone_number,
            customerEmail: email,
            customerAddress: address,
            customerCity: city,
            customerZip: zip_code,
            customerState: state,
            customerAvatar: avatar_url
        });
    };
    const logUserOut = () => {
        setLogCustomerIn(initalState)
    };
    const setCustomerContext = async (customerObj) => {
        const { email } = customerObj;
        try {
            let customerInfo = await axios.get(`customers/email/${email}`).then(res => res.data.payload );
            await logUserIn(customerInfo).then(() => {return logCustomerIn});
        }
        catch (err) {
            console.log(err)
        }
    };
    return (
        <CustomerContext.Provider value={{
            setCustomerContext,
            logCustomerIn,
            logUserOut
        }}>
            {props.children}
        </CustomerContext.Provider >
    )
};
export default CustomerContextProvider;