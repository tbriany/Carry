import React, { useState, Fragment, useContext } from 'react';
import { TextField } from '@material-ui/core';
import { CustomerContext } from '../../Contexts/CustomerContext'

const PaymentForm = () => {
    const { customerFirstname, customerLastname} = useContext(CustomerContext);
    return (
        <Fragment>
            <TextField required variant='standard' label='Name On Card' value={customerFirstname}></TextField><br/>
            <TextField required variant='standard' label='Card Number' value={customerLastname}></TextField><br/>
            <TextField required variant='standard' label='Expiration Date' ></TextField><br/>
            <TextField required variant='standard' label='CVV' helperText='Last three or four digits on strip'></TextField><br/>
        </Fragment>
    )
};

export default PaymentForm;