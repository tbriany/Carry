import React, { createContext, useState } from 'react';
import axios from 'axios';
export const CustomerContext = createContext();

//reset-remove user for logout route
//calls all hooks that set information to empty/null

const CustomerContextProvider = (props) => {
    const [isLoggedIn, setLogIn] = useState(false);
    const [customerId, setCustomerId] = useState(null);
    const [customerFirstname, setCustomerFirstname] = useState(null);
    const [customerLastname, setCustomerLastname] = useState(null);
    const [customerPhoneNumber, setCustomerPhoneNumber] = useState(null);
    const [customerEmail, setCustomerEmail] = useState(null);
    const [customerAddress, setCustomerAddress] = useState(null);
    const [customerCity, setCustomerCity] = useState(null);
    const [customerState, setCustomerState] = useState(null);
    const [customerZip, setCustomerZip] = useState(null);
    const [customerAvatar, setCustomerAvatar] = useState(null);

    const logUserIn = (customerObj) => {
        console.log("customer object in context file", customerObj)
        const { customer_id, firstname, lastname, phone_number, email, address, city, state, zip_code, avatar_url } = customerObj;

        setLogIn(true);
        setCustomerId(parseInt(customer_id))
        setCustomerFirstname(firstname);
        setCustomerLastname(lastname);
        setCustomerPhoneNumber(phone_number);
        setCustomerEmail(email);
        setCustomerAddress(address);
        setCustomerCity(city);
        setCustomerState(state);
        setCustomerZip(parseInt(zip_code));
        setCustomerAvatar(avatar_url);
    };
    const logUserOut = () => {
        setLogIn(false);
        setLogIn(null);
        setCustomerId(null)
        setCustomerFirstname(null);
        setCustomerLastname(null);
        setCustomerPhoneNumber(null);
        setCustomerEmail(null);
        setCustomerAddress(null);
        setCustomerCity(null);
        setCustomerState(null);
        setCustomerZip(null);
        setCustomerAvatar(null);
    };
    const setCustomerContext = async (customerObj) => {
        const { email } = customerObj;
        try {
            let customerContextInfo = await axios.get(`customers/email/${email}`).then(res => res.data.payload);
            await logUserIn(customerContextInfo);
        }
        catch(err){
            console.log(err)
        }
    };
    return (
        <CustomerContext.Provider value={{ logUserIn, logUserOut, setCustomerContext, isLoggedIn, customerId, customerFirstname, customerLastname, customerPhoneNumber, customerEmail, customerAddress, customerCity, customerState, customerZip, customerAvatar }}>
            {props.children}
        </CustomerContext.Provider >
    )
};
export default CustomerContextProvider;