import React, { useState, Fragment } from 'react';
import { TextField } from '@material-ui/core';

const PaymentForm = () => {
    const customerObj = {
        title: 'Miss.',
        firstName: 'Audrey',
        lastName: 'Hepburn',
        phoneNumber: '3474227651',
        email: 'audrey@gmail.com',
        address: '123 5th Avenue',
        address2: '15th floor',
        city: 'New York',
        state: 'NY',
        zipCode: '10011',
        cardNumber: '**** **** **** 613',
        exp: '05/30',
        cvv: 382
    };
    return (
        <Fragment>
            <TextField required variant='standard' label='Name On Card' value={`${customerObj.firstName} ${customerObj.lastName}`}></TextField><br/>
            <TextField required variant='standard' label='Card Number' value={customerObj.cardNumber}></TextField><br/>
            <TextField required variant='standard' label='Expiration Date' value={customerObj.exp}></TextField><br/>
            <TextField required variant='standard' label='CVV' helperText='Last three or four digits on strip' value='***'></TextField><br/>
        </Fragment>
    )
};

export default PaymentForm;