import React, { useState, Fragment } from 'react';
import { TextField } from '@material-ui/core';

const AddressForm = () => {
    return (
        <Fragment>
            <TextField required variant='standard' label='Address Line 1'></TextField><br />
            <TextField variant='standard' label='Address Line 2'></TextField><br />
            <TextField required variant='standard' label='City' value='New York' disabled></TextField><br />
            <TextField required variant='standard' label='Zip Code'></TextField>
        </Fragment>
    )
};

export default AddressForm;