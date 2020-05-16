import React, { createContext, useState } from 'react';
export const LandingContext = createContext();

//const LandingContextConsumer = LandingContext.Consumer

const LandingContextProvider = (props) => {
const [Latitude, SetLatitude] = useState('')
const [Longitude, SetLongitude] = useState('')
const [categories, setCategories] = useState([])

    return (
        // Provider accepts a value containting state and functions. This allows the components access to the state but it must be descendants of the provider.
        <LandingContext.Provider value={{ Latitude, Longitude, categories, SetLatitude,SetLongitude, setCategories}}>
            {props.children}
        </LandingContext.Provider>
    );


}

export default LandingContextProvider;