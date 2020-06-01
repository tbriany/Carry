import React, { useContext } from 'react'
import { Redirect } from 'react-router-dom';
import { Context } from '../../Contexts/CustomerContext';

const ProtectedRoute = (props) => {
    const [state] = useContext(Context);
    const Component = props.component;
    const isAuthenticated = state.user;
    return (
        isAuthenticated ? <Component /> : <Redirect to={{ pathname: '/login' }} />
    )
}

export default ProtectedRoute;