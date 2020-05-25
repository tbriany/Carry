import React, { createContext, useState, useEffect } from 'react';
export const CheckoutContext = createContext();

const CheckoutContextProvider = () => {
    const [ customerInfo, setCustomerInfo ] = useState({
        name: '',
        address: '',
        city: '',
        state: '',
        zip: '',
        creditCard: '',
        cvv: '',
    });

return(
    <CheckoutContext.Provider value ={{}}>
        {props.children}
    </CheckoutContext.Provider>
)
};

export default CheckoutContextProvider;