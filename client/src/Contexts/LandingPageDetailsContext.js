import React, { createContext, useState } from 'react';
export const LandingContext = createContext();


const LandingContextProvider = (props) => {
const [Latitude, SetLatitude] = useState('')
const [Longitude, SetLongitude] = useState('')


    return (
        // Provider accepts a value containting state and functions. This allows the components access to the state but it must be descendants of the provider.
        <LandingContext.Provider value={{ Latitude, Longitude, SetLatitude,SetLongitude }}>
            {props.children}
        </LandingContext.Provider>
    );


}

export default LandingContextProvider;