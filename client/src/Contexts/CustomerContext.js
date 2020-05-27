import React, { createContext,useReducer, useEffect } from 'react';
import { LoginReducer } from '../Components/Reducers/reducers';

//reset-remove user for logout route
//calls all hooks that set information to empty/null
const listener = () => {
    if(window.localStorage.getItem('customer') !== null) {
        return JSON.parse(
            window.localStorage.getItem('customer')
        )
    }
    return {}
}

const initialState = {
    user: {}
}
export const Context = createContext(initialState);

export const Store = ({children}) => {
    const [state, dispatch] = useReducer(LoginReducer, initialState);
     
    useEffect(() => { 
        let data = listener();
        dispatch({type: 'USER_CLICKED_LOGIN', payload: data});
    },[])

    return (
        <Context.Provider value={[state, dispatch]}>
            {children}
        </Context.Provider>
    )
};














// const initalState = ({
//     isLoggedIn: false,
//     customerId: null,
//     customerFirstname: null,
//     customerLastname: null,
//     customerPhoneNumber: null,
//     customerEmail: null,
//     customerAddress: null,
//     customerCity: null,
//     customerState: null,
//     customerZip: null,
//     customerAvatar: null
// });


// const CustomerContextProvider = (props) => {
//     const [logCustomerIn, setLogCustomerIn] = useState(initalState)

//     const logUserIn = (customerObj) => {
//         const { 
//             customer_id, 
//             firstname, 
//             lastname, 
//             phone_number, 
//             email, 
//             address, 
//             city, 
//             state, 
//             zip_code, 
//             avatar_url 
//         } = customerObj;

//         setLogCustomerIn({
//             isLoggedIn: true,
//             customerId: customer_id,
//             customerFirstname: firstname,
//             customerLastname: lastname,
//             customerPhoneNumber: phone_number,
//             customerEmail: email,
//             customerAddress: address,
//             customerCity: city,
//             customerZip: zip_code,
//             customerState: state,
//             customerAvatar: avatar_url
//         });
//         console.log('working in context file line 39', logCustomerIn)
//     };

//     const logUserOut = () => {
//         setLogCustomerIn(initalState)
//     };
//     const setCustomerContext = async (customerObj) => {
//         const { email } = customerObj;
//         try {
//              await axios.get(`customers/email/${email}`)
//              .then((res) => logUserIn(res.data.payload));
//         }
//         catch (err) {
//             console.log(err)
//         }
//     };
//     return (
//         <CustomerContext.Provider value={{
//             setCustomerContext,
//             logCustomerIn,
//             logUserOut
//         }}>
//             {props.children}
//         </CustomerContext.Provider >
//     )
// };
//export default CustomerContextProvider;