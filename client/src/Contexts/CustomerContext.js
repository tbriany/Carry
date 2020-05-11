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
    const [customerAvatar, setCustomeAvatar] = useState(null);

    const logUserIn = () => {
        setLogIn(true)
    };
    const logUserOut = () => {
        setLogIn(false)
    };
    const setCustomerContext = async (customerObj) => {
        const { email } = customerObj;
        setCustomerEmail(email);
        try { 
            let getCustomerInformation = await axios.get(`/customers/email/`, email);
            console.log("CUSTOMER CONTEXT RETREIEVE CUSTOMER BY EMAIL");
            console.log(getCustomerInformation)
        }
        catch(err) {
            console.log(err)
        }
    };
    return (
        <CustomerContext.Provider value={{logUserIn, logUserOut, setCustomerContext}}>
            { props.children }
            </CustomerContext.Provider >
    ) 
};
export default CustomerContextProvider;