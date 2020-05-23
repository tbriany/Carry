import React, { useState, Fragment } from 'react';
import { TextField } from '@material-ui/core';

const PaymentForm = () => {
    return (
        <Fragment>
            <TextField required variant='standard' label='Name On Card'></TextField><br/>
            <TextField required variant='standard' label='Card Number'></TextField><br/>
            <TextField required variant='standard' label='Expiration Date' ></TextField><br/>
            <TextField required variant='standard' label='CVV' helperText='Last three or four digits on strip'></TextField><br/>
        </Fragment>
    )
};

export default PaymentForm;