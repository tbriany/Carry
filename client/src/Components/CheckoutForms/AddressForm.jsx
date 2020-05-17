import React, { useState, Fragment, useContext } from 'react';
import { TextField } from '@material-ui/core';
import { checkoutFormStyles } from '../styling/checkoutFormStyles'

const AddressForm = () => {
    const classes = checkoutFormStyles();
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
    console.log(customerObj)
    return (
        <Fragment>
            <TextField
                required
                variant='standard'
                label='Address Line 1'
                value={customerObj.address}
                className={classes.textField}></TextField><br />
            <TextField
                variant='standard'
                label='Address Line 2'
                value={customerObj.address2}
                className={classes.textField}></TextField><br />
            <TextField
                required
                variant='standard'
                label='City'
                value={customerObj.city}
                className={classes.textField}></TextField><br />
            <TextField
                required
                variant='standard'
                label='Zip Code'
                value={customerObj.zipCode}
                className={classes.textField}></TextField>
        </Fragment>
    )
};

export default AddressForm;