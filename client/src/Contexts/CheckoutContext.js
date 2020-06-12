import React, { createContext, useState, useEffect, useContext } from 'react';
import { Context } from './CustomerContext'
export const CheckoutContext = createContext();

const CheckoutContextProvider = (props) => {
    const [customerInfo, setCustomerInfo] = useState({});
    const [state, dispatch] = useContext(Context);
    const [placedOrderDetails, setPlacedOrderDetails] = useState({});
    const setCheckoutContext = () => {
        const stateCopy = { ...state };
        setCustomerInfo(stateCopy)
    };
    useEffect(() => {
        setCheckoutContext()
    }, []);
    console.log('checkout context', customerInfo)
    return (
        <CheckoutContext.Provider value={{ customerInfo, placedOrderDetails }}>
            {props.children}
        </CheckoutContext.Provider>
    )
};

export default CheckoutContextProvider;