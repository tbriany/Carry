import React, { useState, Fragment, useContext } from 'react';
import { TextField } from '@material-ui/core';
import { checkoutFormStyles } from '../styling/checkoutFormStyles';


const AddressForm = () => {
    const classes = checkoutFormStyles();
    return (
        <Fragment>
            <TextField
                required
                variant='standard'
                label='Address Line 1'
                className={classes.textField}></TextField><br />
            <TextField
                variant='standard'
                label='Address Line 2'
                className={classes.textField}></TextField><br />
            <TextField
                required
                variant='standard'
                label='City'
                className={classes.textField}></TextField><br />
            <TextField
                required
                variant='standard'
                label='Zip Code'
                className={classes.textField}></TextField>
        </Fragment>
    )
};

export default AddressForm;