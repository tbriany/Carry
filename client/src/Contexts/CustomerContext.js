import React, { createContext, useState } from 'react';
export const CustomerContext = createContext();

//reset-remove user for logout route
//calls all hooks that set information to empty/null

const CustomerContextProvider = (props) => {
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

    const logCustomerIn = (customerObj) => {
        console.log("LOG CUSTOMER IN WORKING IN CONTEXT FILE");
    }
    return (
        <CustomerContext.Provider value={{logCustomerIn}}>
            { props.children }
            </CustomerContext.Provider >
    ) 
};
export default CustomerContextProvider;