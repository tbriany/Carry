import React, { createContext, useReducer, useEffect } from 'react';
import { LoginReducer } from '../Components/Reducers/reducers';

//listener function checks browser localStorage to see if the key 'customer' exists
//if it does, it will take the string thats saved under customer, turn it into a JSON object and return that object
//if not, it will return an empty object that we will use when we modify the state in the store
const getUser = () => {
    if (window.localStorage.getItem('customer') !== null) {
        return JSON.parse(
            window.localStorage.getItem('customer')
        )
    }
    return {}
};
//we initalize the beginning state for our context file/ hook which is an empty object
const initialState = {
    user: {}
};
export const Context = createContext(initialState);
//Store function declares the state (that will be shared amongst components) and the dispatch function (that is able to modify the state with an action and object)\
//is is made using the react hook useReducer, which takes in two arguments 
//-- a reducer, imported from another file 
//-- and an initalState, which is declared previously
export const Store = ({ children }) => {
    const [state, dispatch] = useReducer(LoginReducer, initialState);
    //the useEEffect hook here takes an object from the getUser function that can be either a user that is stored in the LocalStorage or an empty object, meaning there is no user stored / logged in and they are anonymous
    useEffect(() => {
        let user = getUser();
        if (user.email) {
            dispatch({ type: 'SET_USER', payload: user });
        }
        else {
            dispatch({ type: 'REMOVE_USER', payload: user});
        }
    }, []);
    //every time the store mounts (since it is a context wrapper, it will mount across our app) the useEffect hook will read the localStorage to see if there is a user logged it or not. it will then modify our state in the store with the action SET_USER and the objet containing user info or empty object
    return (
        <Context.Provider value={[state, dispatch]}>
            {children}
        </Context.Provider>
    )
};


//To-do:
//reset-remove user for logout route
//calls all hooks that set information to empty/null