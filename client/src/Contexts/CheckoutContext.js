import React, { createContext, useState, useEffect } from 'react';
import { Context } from './CustomerContext'
export const CheckoutContext = createContext();

const CheckoutContextProvider = () => {
    const [customerInfo, setCustomerInfo] = useState({});
    const [state, dispatch] = useContext(Context);
    const setCheckoutContext = () => {
        const stateCopy = { ...state };
        setCustomerInfo(stateCopy)
    };
    useEffect(() => {
        setCheckoutContext()
    }, []);
    console.log('checkout context', customerInfo)
    return (
        <CheckoutContext.Provider value={{ customerInfo }}>
            {props.children}
        </CheckoutContext.Provider>
    )
};

export default CheckoutContextProvider;