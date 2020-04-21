import React, { createContext, useState } from 'react';
export const LandingDetailsContext = createContext();


const LandingDetailsContext = (props) => {
const [zipCode, SetZipCode] = useState(0)


    return (
        // Provider accepts a value containting state and functions. This allows the components access to the state but it must be descendants of the provider.
        <LandingDetialsContext.Provider value={{ }}>
            {props.children}
        </LandingDetialsContext.Provider>
    );


}

export default LandingDetailsContext;