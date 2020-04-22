import React, { createContext, useState } from 'react';
export const CustomerContext = createContext();

//reset-remove user for logout route
//calls all hooks that set information to empty/null

const CustomerContextProvider = (props) => {
    const noCustomer = {
        id: null,
        firstname: null,
        lastname: null,
        phone_number: null,
        email: null,
        address: null,
        city: null,
        state: null,
        zip_code: null,
        avatar_url: null,
    }
    const [customerDetails, setCustomerDetails] = useState(noCustomer);
    const logCustomerIn = (customerObj) => {
        const {id, firstname, lastname, phone_number, email, address, city, state, zip_code, avatar_url} = customerObj;
        console.log("LOG CUSTOMER IN WORKING IN CONTEXT FILE")
        setCustomerDetails({
            id,
            firstname,
            lastname,
            phone_number,
            email,
            address,
            city,
            state,
            zip_code,
            avatar_url,
        });
    } 
    return(
        <CustomerContext.Provider value={{customerDetails, logCustomerIn}}>
            {props.children}
            </CustomerContext.Provider>
    ) 
};
export default CustomerContextProvider;