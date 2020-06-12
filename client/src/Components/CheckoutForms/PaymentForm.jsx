import React, { useState, Fragment, useContext } from 'react';
import { TextField } from '@material-ui/core';
import { Context } from '../../Contexts/CustomerContext';


const PaymentForm = () => {
    const [state, dispatch] = useContext(Context);
    const [userInfo, setUserInfo] = useState(state.user.info);
    return (
        <Fragment>
            <TextField required variant='standard' label='Name On Card' value={`${userInfo.firstname} ${userInfo.lastname}`}></TextField><br/>
            <TextField required variant='standard' label='Card Number'></TextField><br/>
            <TextField required variant='standard' label='Expiration Date' ></TextField><br/>
            <TextField required variant='standard' label='CVV' helperText='Last three/four digits on strip'></TextField><br/>
        </Fragment>
    )
};

export default PaymentForm;